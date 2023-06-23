"use clinet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import Button from "../formElements/Button";
import { productNav, userNav, mainNav } from "@/data/navItems";
import "./DesktopNav.scss";

const DesktopNav = ({ user, setIsCreateOpen, setIsNavOpen }) => {
  const pathname = usePathname();
  const isProductPage = pathname?.includes("products");
  const isUserPage = pathname?.includes("user");

  const handleCreateOpen = () => {
    setIsCreateOpen(true);
  };

  const handleNavOpen = () => {
    setIsNavOpen("login");
  };

  let navItems = mainNav; 

  if (isProductPage) {
    navItems = productNav;
  } else if (isUserPage) {
    navItems = userNav;
  } else if (pathname === "/") {
    navItems = mainNav;
  }

  return (
    <nav className="desktop-nav">
      <ul className="desktop-nav__list">
        {navItems.map((item) => (
          <li key={item.name}>
            {item.url.startsWith("#") ? (
              <Link
                href={`${pathname}${item.url}`}
                className="desktop-nav__link"
                scroll={false}
              >
                {item.name}
              </Link>
            ) : (
              <Link
                href={`${item.url}`}
                className="desktop-nav__link"
                scroll={false}
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
        {user && !isUserPage && (
          <li>
            <button
              onClick={handleCreateOpen}
              className="desktop-nav__link"
              aria-label="Go to create page"
            >
              create
            </button>
          </li>
        )}
        <li>
          {user ? (
            <Button
              to={`/user/${user._id}`}
              outline
              ariaLabel="Go to your profile"
            >
              <FaUser size={20} />
              my account
            </Button>
          ) : (
            <Button
              onClick={handleNavOpen}
              outline
              ariaLabel="Go to login page"
            >
              login
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;
