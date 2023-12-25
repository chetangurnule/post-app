// Header.js
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Post",
      slug: "/all-post",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const handleNavigation = (slug) => {
    navigate(slug);
  };

  return (
    <header className="bg-gray-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Link
            to="/"
            className="text-white font-bold text-lg hover:text-gray-300 transition duration-300"
          >
            Your Logo
          </Link>
        </div>
        <nav className="space-x-4 flex items-center">
          {navItems.map((item) =>
            item.active ? (
              <button
                key={item.slug}
                onClick={() => handleNavigation(item.slug)}
                className="text-white hover:text-gray-300 transition duration-300 px-3 py-2 rounded"
              >
                {item.name}
              </button>
            ) : null
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
