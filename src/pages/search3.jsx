import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Block, Link, Searchbar, Icon, Navbar } from 'konsta/react';
import { langList } from '../constants';
import MdToJson from '@texttree/obs-format-convert-rcl/dist/components/MdToJson';
import Fuse from 'fuse.js';
import { useRecoilValue } from 'recoil';
import { subtitleState } from '../atoms';
import LeftMenu from '../components/LeftMenu';
import { useTranslation } from 'react-i18next';
import { MdMenu, MdSettings } from 'react-icons/md';
import { GearAlt, Menu } from 'framework7-icons/react';
import BaseLayout from '../components/BaseLayout';
// TODO wip
const highlightMatches = ({ value: text, indices }) => {
  let highlightedText = [];
  let lastIndex = 0;

  indices.forEach(([start, end]) => {
    // Extracting the text before the match, the match itself, and after the match
    // if (start > 0 && text[start - 1].match(/\S/)) {
    //   return;
    // }
    // if (end - start < 2) {
    //   return;
    // }

    // Add the text before the match
    highlightedText.push(text.slice(lastIndex, start));
    // Add the highlighted match
    highlightedText.push(
      <span key={start} className="bg-yellow-200 dark:bg-yellow-800">
        {text.slice(start, end + 1)}
      </span>
    );
    // Update the lastIndex
    lastIndex = end + 1;
  });

  // Add the remaining part of the text after the last match
  highlightedText.push(text.slice(lastIndex));

  return <>{highlightedText}</>;
};

export default function SearchPage() {
  const subtitle = useRecoilValue(subtitleState);
  const { t } = useTranslation();
  const [leftPanelOpened, setLeftPanelOpened] = useState(false);

  const { lang } = useParams();
  const [search, setSearch] = useState('');
  const [result, setResult] = useState('');
  // const [stories, setStories] = useState([]);
  const index = useRef();
  useEffect(() => {
    const storiesUrl = [];
    const searchData = [];
    const baseUrl = lang.startsWith('user-')
      ? 'https://git.door43.org/bsa/'
      : 'https://git.door43.org/';
    for (let story = 1; story < 50; story++) {
      storiesUrl.push(
        axios.get(
          baseUrl +
            (langList[lang] ?? lang + '/') +
            String(story).padStart(2, '0') +
            '.md'
        )
      );
    }
    axios
      .all(storiesUrl)
      .then((results) => {
        results.map((res) => {
          const jsonData = MdToJson(res.data);
          for (const verse of jsonData.verseObjects) {
            const story = res.config.url.split('/').pop().split('.')[0];
            searchData.push({ id: story + ':' + verse.verse, content: verse.text });
          }
        });
        index.current = new Fuse(searchData, {
          keys: ['content'],
          includeMatches: true,
          threshold: 0.3, // Adjust as needed for fuzziness
          location: 0, // Only match at the start of words
          distance: 100, // Adjust as needed for fuzziness
          minMatchCharLength: 2, // Adjust as needed for fuzziness
          maxPatternLength: 32, // Adjust as needed for fuzziness
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [lang]);
  useEffect(() => {
    if (search) {
      const result = index.current.search(`${search}`);
      setResult(result);
      console.log({ result });
    } else {
      setResult([]);
    }
  }, [search]);
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
            result.map(({ item, matches }) => (
              <p key={item.id} className="mb-3">
                <Link
                  component={RouterLink}
                  to={`/${lang}/${String(item.id.split(':')[0]).padStart(2, '0')}#v${item.id.split(':')[1]}`}
                >
                  {item.id}
                </Link>
                {highlightMatches(matches[0])}
              </p>
            ))}
        </div>
      </Block>
    </BaseLayout>
  );
}
