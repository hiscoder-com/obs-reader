import { Route, Routes } from 'react-router-dom';
import FromInternetPage from './pages/fromInternet';
import FromDevicePage from './pages/fromDevice';
import LanguageAppPage from './pages/languageApp';
import ErrorPage from './pages/error';
import SettingsPage from './pages/settings/index';
import StoryPage from './pages/story';
import StoryLayout from './layout/Story';
import LanguagePage from './pages/settings/language';
import FontPage from './pages/settings/font';
import SettingsLanguageAppPage from './pages/settings/languageApp';
import SettingsLayout from './layout/Settings';
import MainLayout from './layout/Main';
import LoadFromPage from './pages/loadFrom';
import { useRecoilValue } from 'recoil';
import { languageAppState } from './atoms';
import { useEffect } from 'react';
export default function App() {
  const languageApp = useRecoilValue(languageAppState)

  useEffect(() => {
    document.documentElement.lang = languageApp
  }, [languageApp])

  return (
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route index element={<LanguageAppPage />} />
        <Route path='app/' element={<LoadFromPage />} />
        <Route path='app/internet' element={<FromInternetPage />} />
        <Route path='app/device' element={<FromDevicePage />} />
      </Route>
      <Route path=":lang/:story" element={<StoryLayout />}>
        <Route index element={<StoryPage />} />
      </Route>
      <Route path="/settings" element={<SettingsLayout />}>
        <Route index element={<SettingsPage />} />
        <Route path="/settings/language-app" element={<SettingsLanguageAppPage />} />
        <Route path="/settings/language" element={<LanguagePage />} />
        <Route path="/settings/font" element={<FontPage />} />
      </Route>
      <Route path="/settings/*" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
