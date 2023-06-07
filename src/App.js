import {
  Routes,
  Route,
  HashRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import MainPage from './pages/mainPage/MainPage';
import MainLayout from './layouts/MainLayout';
import AboutPage from './pages/aboutPage/AboutPage';
import UserPage from './pages/userPage/UserPage';
import store from './store';

function App() {
  return (
    <Provider store={store} >
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />} >
            <Route path="/" element={<MainPage /> } />
            <Route path="/about" element={<AboutPage /> } />
            <Route path="/users/:id" element={<UserPage /> } />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
