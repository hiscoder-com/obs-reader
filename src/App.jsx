import { Route, Routes } from 'react-router-dom';
import ChooseLanguagePage from './pages/language';
import ErrorPage from './pages/error';
import SettingsPage from './pages/settings/index';
import StoryPage from './pages/story';
import StoryLayout from './layout/Story';
import LanguagePage from './pages/settings/language';
import FontPage from './pages/settings/font';
import SettingsLayout from './layout/Settings';
import MainLayout from './layout/Main';
import LoadResourcePage from './pages/load';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route index element={<ChooseLanguagePage />} />
        <Route path=":lang" element={<LoadResourcePage />} />
      </Route>
      <Route path=":lang/:story" element={<StoryLayout />}>
        <Route index element={<StoryPage />} />
      </Route>
      <Route path="/settings" element={<SettingsLayout />}>
        <Route index element={<SettingsPage />} />
        <Route path="/settings/language" element={<LanguagePage />} />
        <Route path="/settings/font" element={<FontPage />} />
      </Route>
      <Route path="/settings/*" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
