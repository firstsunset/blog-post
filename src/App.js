import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import MainPage from './pages/mainPage/MainPage';
import MainLayout from './layouts/MainLayout';
import AboutPage from './pages/aboutPage/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />} >
          <Route path="/" element={<MainPage /> } />
          <Route path="/about" element={<AboutPage /> } />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
