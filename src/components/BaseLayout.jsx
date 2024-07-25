import { getTheme } from '../helper'
import { App, Page } from 'konsta/react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { darkModeState, directionAppState, languageAppState } from '../atoms';
import { useEffect } from 'react';
import { rtlLanguages } from '../constants';

// TODO надо добавить перевод на арабский, персидский, хинди

function BaseLayout({ children }) {
  const [directionApp, setDirectionApp] = useRecoilState(directionAppState);
  const languageApp = useRecoilValue(languageAppState);

  useEffect(() => {
    setDirectionApp(rtlLanguages.includes(languageApp) ? 'rtl' : 'ltr');
  }, [languageApp, setDirectionApp])

  useEffect(() => {
    document.documentElement.dir = directionApp;
  }, [directionApp])

  const darkMode = useRecoilValue(darkModeState);
  return (
    <App theme={getTheme()} safeAreas className={darkMode === '1' ? 'dark theme-dark' : ''}>
      <Page colors={{ bgIos: 'bg-figma-bg-light dark:bg-figma-bg-dark', bgMaterial: 'bg-figma-bg-light dark:bg-figma-bg-dark' }}>
        {children}
      </Page>
    </App>
  )
}

export default BaseLayout
