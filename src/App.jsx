import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main';
import ErrorPage from './pages/error';
import SettingsPage from './pages/settings/index';
import StoryPage from './pages/story';
import Layout from './components/Layout';
import LanguagePage from './pages/settings/language';
import FontPage from './pages/settings/font';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/language" element={<LanguagePage />} />
        <Route path="/settings/font" element={<FontPage />} />
        <Route path=":lang/:story" element={<StoryPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
