import axios from 'axios';
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
// TODO wip
const getHighlightedText = (text, query) => {
  const tokens = query.toLowerCase().split(' ').filter(Boolean);

  if (!tokens.length) {
    return text;
  }

  let parts = [];
  let lastIndex = 0;

  for (let i = 0; i < text.length; i++) {
    for (const token of tokens) {
      // Проверяем, начинается ли часть текста с токена
      const substring = text.slice(i, i + token.length).toLowerCase();
      if (substring === token) {
        // Проверяем, находится ли совпадение в начале слова
        if (i === 0 || /\s/.test(text[i - 1])) {
          if (i > lastIndex) {
            parts.push(text.substring(lastIndex, i));
          }
          parts.push(
            <span key={i} className="font-bold bg-yellow-200">
              {text.substring(i, i + token.length)}
            </span>
          );
          i += token.length - 1;
          lastIndex = i + 1;
          break;
        }
      }
    }
  }

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
      tokenize: 'forward',
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
          for (const verse of jsonData.verseObjects) {
            index.current.add(story + ':' + verse.verse, verse.text);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [lang]);
  const result = index.current.search(search, 50, { suggest: true });
  console.log({ result });
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
          {result &&
            result
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
                    stories[el.split(':')[0]].verseObjects[parseInt(el.split(':')[1]) - 1]
                      .text,
                    search
                  )}
                </p>
              ))}
        </div>
      </Block>
    </BaseLayout>
  );
}
