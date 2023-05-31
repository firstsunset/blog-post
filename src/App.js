import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import MainPage from './pages/mainPage/MainPage';
import MainLayout from './layouts/MainLayout';
import AboutPage from './pages/aboutPage/AboutPage';
import store from './store';

function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />} >
            <Route path="/" element={<MainPage /> } />
            <Route path="/about" element={<AboutPage /> } />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
