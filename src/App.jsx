import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main';
import ErrorPage from './pages/error';
import SettingsPage from './pages/settings/index';
import StoryPage from './pages/story';
import Layout from './components/Layout';
import LanguagePage from './pages/settings/language';
import FontPage from './pages/settings/font';
import Settings from './components/Settings';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path=":lang/:story" element={<StoryPage />} />
      </Route>
      <Route path="/settings" element={<Settings />}>
        <Route index element={<SettingsPage />} />
        <Route path="/settings/language" element={<LanguagePage />} />
        <Route path="/settings/font" element={<FontPage />} />
      </Route>
      <Route path="/settings/*" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
