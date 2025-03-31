
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "#", dropdown: true, items: [
      { name: "Weddings", path: "/events/wedding" },
      { name: "Birthdays", path: "/events/birthday" },
      { name: "Corporate", path: "/events/corporate" },
      { name: "Anniversaries", path: "/events/anniversary" },
    ]},
    { name: "Services", path: "/services" },
    { name: "Booking", path: "/booking" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-display font-bold text-primary">Eventure</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <DropdownMenu key={link.name}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="font-medium">
                        {link.name} <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
                      {link.items?.map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                          <Link to={item.path} className="w-full cursor-pointer">
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`font-medium hover:text-primary transition-colors ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="font-medium">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="font-medium">Get Started</Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="py-2 px-3">
                  <div className="font-medium text-gray-900 mb-2">{link.name}</div>
                  <div className="pl-4 space-y-2 border-l-2 border-gray-200">
                    {link.items?.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block text-sm text-gray-700 hover:text-primary"
                        onClick={toggleMobileMenu}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block py-2 px-3 text-base font-medium text-gray-900 hover:text-primary"
                  onClick={toggleMobileMenu}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4 px-4">
              <Link to="/login" className="w-full" onClick={toggleMobileMenu}>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/register" className="w-full" onClick={toggleMobileMenu}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
