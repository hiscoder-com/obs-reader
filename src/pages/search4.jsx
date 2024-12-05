import { useEffect, useRef, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Block, Link, Searchbar, Icon, Navbar } from 'konsta/react';
import { langList } from '../constants';
import MdToJson from '@texttree/obs-format-convert-rcl/dist/components/MdToJson';
import flexsearch from 'flexsearch';
import { useRecoilValue } from 'recoil';
import { subtitleState } from '../atoms';
import LeftMenu from '../components/LeftMenu';
import { useTranslation } from 'react-i18next';
import { MdMenu, MdSettings } from 'react-icons/md';
import { GearAlt, Menu } from 'framework7-icons/react';
import BaseLayout from '../components/BaseLayout';
import axios from 'axios';


const getHighlightedText = (text, query) => {
  if (!query) return text;

  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return text;

  let parts = [];
  let lastIndex = 0;

  // Находим все совпадения для каждого слова
  const matches = [];
  words.forEach(word => {
    const pattern = new RegExp(word, 'gi');
    let match;
    while ((match = pattern.exec(text.toLowerCase())) !== null) {
      matches.push([match.index, match.index + word.length - 1]);
    }
  });

  // Сортируем совпадения по начальному индексу
  matches.sort((a, b) => a[0] - b[0]);

  // Объединяем пересекающиеся совпадения
  const mergedMatches = matches.reduce((acc, match) => {
    if (acc.length === 0) return [match];
    const lastMatch = acc[acc.length - 1];
    if (match[0] <= lastMatch[1] + 1) {
      lastMatch[1] = Math.max(lastMatch[1], match[1]);
    } else {
      acc.push(match);
    }
    return acc;
  }, []);

  // Создаем подсвеченный текст
  mergedMatches.forEach(([start, end]) => {
    if (start > lastIndex) {
      parts.push(text.substring(lastIndex, start));
    }
    parts.push(
      <span key={start} className="font-bold bg-yellow-200 dark:bg-yellow-800">
        {text.substring(start, end + 1)}
      </span>
    );
    lastIndex = end + 1;
  });

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
};

export default function SearchPage() {
  const subtitle = useRecoilValue(subtitleState);
  const { t } = useTranslation();
  const [leftPanelOpened, setLeftPanelOpened] = useState(false);

  const { lang } = useParams();
  const [search, setSearch] = useState('');
  const [stories, setStories] = useState([]);
  const index = useRef(
    new flexsearch.Index({
      tokenize: 'full',
      split: /\s+/,
      encode: false,
      cache: true,
      language: lang,
    })
  );

  useEffect(() => {
    for (let story = 1; story < 50; story++) {
      const baseUrl = lang.startsWith('user-')
        ? 'https://git.door43.org/bsa/'
        : 'https://git.door43.org/';
      axios
        .get(
          baseUrl +
            (langList[lang] ?? lang + '/') +
            String(story).padStart(2, '0') +
            '.md'
        )
        .then((res) => {
          const jsonData = MdToJson(res.data);
          setStories((prev) => ({ ...prev, [story]: jsonData }));
          jsonData.verseObjects.forEach(verse => {
            index.current.add(story + ':' + verse.verse, verse.text.toLowerCase());
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [lang]);

  const result = index.current.search(search.toLowerCase(), 50);

  return (
    <BaseLayout>
      <Navbar
        title={t('OpenBibleStories')}
        subtitle={subtitle}
        titleFontSizeMaterial="17"
        titleClassName="truncate !static !transform-none"
        subtitleClassName="truncate"
        subnavbarClassName=""
        subnavbar={
          <Searchbar
            onInput={(e) => setSearch(e.target.value)}
            value={search}
            onClear={() => setSearch('')}
            colors={{
              inputBgIos: 'bg-figma-bg-card-light dark:bg-figma-bg-card-dark',
              inputBgMaterial: 'bg-figma-bg-card-light dark:bg-figma-bg-card-dark',
              placeholderIos: 'text-figma-text-light dark:text-figma-text-dark',
              placeholderMaterial: 'text-figma-text-light dark:text-figma-text-dark',
            }}
          />
        }
        className="top-0 sticky border-b border-figma-border-light dark:border-figma-border-dark"
        colors={{
          bgIos: 'bg-figma-bg-light dark:bg-figma-bg-dark',
          bgMaterial: 'bg-figma-bg-light dark:bg-figma-bg-dark',
        }}
        innerClassName="my-0 mx-auto max-w-4xl"
        left={
          <Link navbar onClick={() => setLeftPanelOpened(true)}>
            <Icon
              ios={<Menu className="w-7 h-7" />}
              material={<MdMenu className="w-6 h-6" />}
            />
          </Link>
        }
        right={
          <Link navbar component={RouterLink} to={'/settings'}>
            <Icon
              ios={<GearAlt className="w-7 h-7" />}
              material={<MdSettings className="w-6 h-6" />}
            />
          </Link>
        }
      />
      <LeftMenu
        leftPanelOpened={leftPanelOpened}
        setLeftPanelOpened={setLeftPanelOpened}
      />
      <Block className="mt-5 mx-auto max-w-4xl">
        <div>
          {result && search && result
            .sort((a, b) => {
              const [a1, a2] = a.split(':');
              const [b1, b2] = b.split(':');
              return a1 === b1 ? a2 - b2 : a1 - b1;
            })
            .map((el) => (
              <p key={el} className="mb-3">
                <Link
                  component={RouterLink}
                  to={`/${lang}/${String(el.split(':')[0]).padStart(2, '0')}#v${el.split(':')[1]}`}
                >
                  {el}
                </Link>{' '}
                {getHighlightedText(
                  stories[el.split(':')[0]]?.verseObjects[parseInt(el.split(':')[1]) - 1]?.text || '',
                  search
                )}
              </p>
            ))}
        </div>
      </Block>
    </BaseLayout>
  );
}
