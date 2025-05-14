import { Link, Outlet } from 'react-router';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="links">
          <Link to="/">Home</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
