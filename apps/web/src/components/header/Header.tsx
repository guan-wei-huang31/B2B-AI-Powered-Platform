'use client';

import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from '@/components/ui/sheet';

// import { ModeToggle } from '../ui/mode-toggle';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 py-3 md:px-12 px-5 ${
          isScrolled ? 'bg-white/30 backdrop-blur-sm shadow-sm dark:bg-black/30' : 'bg-background'
        }`}
      >
        <div className="container flex items-center justify-between min-w-full">
          {/* Logo */}
          <NavLink to="/">
            <img src="/logo.png" alt="logo" className="h-10" />
          </NavLink>

          {/* Desktop Navigation - on the right side */}
          <nav className="hidden md:flex items-center gap-10 relative">
            <NavLink
              to="/about"
              className="text-md font-medium transition-colors hover:text-primary"
            >
              About Bites
            </NavLink>
            <NavLink
              to="/contact-us"
              className="text-md font-medium transition-colors hover:text-primary"
            >
              Contact Us
            </NavLink>
            {/* <ModeToggle /> */}
          </nav>

          {/* Mobile Menu - Only visible on mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] flex flex-col h-full">
              {/* Mobile Search */}
              {/* <div className="mt-6 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="text" placeholder="Search..." className="pl-9 pr-4" />
                </div>
              </div> */}
              <nav className="flex flex-col gap-4">
                {/* <div className="flex items-center"><ModeToggle /></div> */}
                {/* <NavLink
                  to="/ai-chat"
                  className="text-md font-medium transition-colors hover:text-primary"
                >
                  Ask AI
                </NavLink> */}
                <NavLink
                  to="/about"
                  className="text-md font-medium transition-colors hover:text-primary"
                >
                  About Bites
                </NavLink>
                <NavLink
                  to="/contact-us"
                  className="text-md font-medium transition-colors hover:text-primary"
                >
                  Contact Us
                </NavLink>
              </nav>
              <div className="flex-grow"></div>
              <SheetFooter className="mt-auto" />
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
