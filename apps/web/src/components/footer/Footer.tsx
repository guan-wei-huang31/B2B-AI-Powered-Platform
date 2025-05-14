import { NavLink } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-background mt-5 p-6 border-t-1">
      <div className="container mx-auto flex sm:flex-row flex-col">
        <div className="flex md:flex-col md:w-3/4 justify-evenly gap-3 md:items-start items-center">
          <NavLink to="/">
            <img src="/logo.png" alt="logo" className="h-12" />
          </NavLink>
          <p className="text-lg font-semibold text-balance">
            Bites Team – Harvesting Innovation, Cultivating the Future.
          </p>
        </div>

        <div className="flex sm:flex-row md:w-1/4 justify-evenly">
          <div>
            <h3 className="text-border font-bold">Information</h3>
            <ul>
              <li>
                <NavLink to="/" className="text-primary hover:underline text-sm">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="text-primary hover:underline text-sm">
                  About Bites
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact-us" className="text-primary hover:underline text-sm">
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-border font-bold">Support</h3>
            <ul>
              <li>
                <NavLink to="/faq" className="text-primary hover:underline text-sm">
                  FAQ
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/shipping" className="text-primary hover:underline text-sm">
                  Shipping & Returns
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/privacy-policy" className="text-primary hover:underline text-sm">
                  Privacy Policy
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-2 text-center">
        © 2025 Bites Team. All rights reserved.
      </p>
    </footer>
  );
}
