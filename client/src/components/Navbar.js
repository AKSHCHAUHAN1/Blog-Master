import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Articles", path: "/articles-list" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="backdrop-blur-md bg-white/70 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-2xl px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
          MERN.PRO
        </Link>
        <ul className="flex gap-8">
          {navLinks.map((link) => (
            <li key={link.path} className="relative">
              <Link to={link.path} className={`text-sm font-medium transition-colors ${location.pathname === link.path ? "text-green-600" : "text-slate-500 hover:text-green-500"}`}>
                {link.name}
              </Link>
              {location.pathname === link.path && (
                <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-500" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;