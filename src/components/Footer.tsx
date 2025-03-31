
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-2xl font-display font-bold text-white">Eventure</h3>
            </Link>
            <p className="text-gray-400 mb-6">
              Creating unforgettable moments for every special occasion. Your vision, our expertise.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events/wedding" className="text-gray-400 hover:text-white transition-colors">
                  Weddings
                </Link>
              </li>
              <li>
                <Link to="/events/birthday" className="text-gray-400 hover:text-white transition-colors">
                  Birthdays
                </Link>
              </li>
              <li>
                <Link to="/events/corporate" className="text-gray-400 hover:text-white transition-colors">
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link to="/events/anniversary" className="text-gray-400 hover:text-white transition-colors">
                  Anniversaries
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services#decoration" className="text-gray-400 hover:text-white transition-colors">
                  Decoration Services
                </Link>
              </li>
              <li>
                <Link to="/services#catering" className="text-gray-400 hover:text-white transition-colors">
                  Catering & Food
                </Link>
              </li>
              <li>
                <Link to="/services#transport" className="text-gray-400 hover:text-white transition-colors">
                  Transportation
                </Link>
              </li>
              <li>
                <Link to="/services#photography" className="text-gray-400 hover:text-white transition-colors">
                  Photography & Video
                </Link>
              </li>
              <li>
                <Link to="/services#entertainment" className="text-gray-400 hover:text-white transition-colors">
                  Entertainment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                <span className="text-gray-400">
                  123 Event Plaza, Suite 500<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <a href="mailto:info@eventure.com" className="text-gray-400 hover:text-white transition-colors">
                  info@eventure.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} Eventure. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-gray-500 hover:text-white text-sm transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
