import { BrowserRouter, Route, Routes } from 'react-router';

import { HomePage } from '@/pages/home';
import NotFound from '@/pages/NotFound';

import { HomeLayout } from './components/layout/HomeLayout';
import About from './pages/about/about';
import ContactUs from './pages/contact-us';
import ProductPage from './pages/product';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
