import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

import ChatSupport from '@/components/chat/ChatSupport';
import Footer from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';

export function HomeLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="w-screen flex flex-col">
      <Header />
      <main>
        <Outlet />
        <ChatSupport />
      </main>
      <Footer />
    </div>
  );
}
