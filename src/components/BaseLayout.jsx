import { getTheme } from '../helper'
import { App, Page } from 'konsta/react'
import { useRecoilValue } from 'recoil';
import { darkModeState } from '../atoms';

function BaseLayout({ children }) {
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
