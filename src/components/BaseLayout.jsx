import { getTheme } from '../helper'
import { App, Page } from 'konsta/react'
import { useRecoilValue } from 'recoil';
import { darkModeState, isRtlState } from '../atoms';
import { useEffect } from 'react';

// TODO надо глобальный стейт завести isRTL потому что сейчас дергается экран при перелистывании, и нужна нам эта проверка в нескольких местах
// TODO подумать о том, как лучше определять направление текста. Вынести это в конфиг (см. constants.js) и при добавлении новых языков сделать чекбокс isRTL.

// TODO надо добавить перевод на арабский, персидский, хинди

function BaseLayout({ children }) {
  const isRtl = useRecoilValue(isRtlState);
  useEffect(() => {
    document.documentElement.dir = isRtl === '1' ? 'rtl' : 'ltr';
  }, [isRtl])

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
