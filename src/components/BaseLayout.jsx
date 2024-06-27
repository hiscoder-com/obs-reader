import { getTheme, isRTL } from '../helper'
import { App, Page } from 'konsta/react'
import { useRecoilValue } from 'recoil';
import { darkModeState, subtitleState } from '../atoms';
import { useEffect } from 'react';

function BaseLayout({ children }) {
  const subtitle = useRecoilValue(subtitleState);
  useEffect(() => {
    const isRtl = isRTL(subtitle);
    console.log({ isRtl, subtitle })
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    return () => {
      document.documentElement.dir = 'ltr';
    }
  }, [subtitle])

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
