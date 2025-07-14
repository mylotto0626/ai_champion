import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 medical-gradient rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MedNuri</h1>
              <p className="text-xs text-gray-600">by Mediums</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/symptom-consultation"
              className="text-gray-700 hover:text-medical-primary transition-colors"
            >
              증상 상담
            </Link>
            <Link
              to="/checkup-analysis"
              className="text-gray-700 hover:text-medical-primary transition-colors"
            >
              검진 결과
            </Link>
            <a
              href="#medicine"
              className="text-gray-700 hover:text-medical-primary transition-colors"
            >
              처방약 정보
            </a>
            <a
              href="#senior"
              className="text-gray-700 hover:text-medical-primary transition-colors"
            >
              시니어 케어
            </a>
            <a
              href="#counseling"
              className="text-gray-700 hover:text-medical-primary transition-colors"
            >
              마음 상담
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100 focus:text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-100">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/symptom-consultation"
                className="text-gray-700 hover:text-medical-primary transition-colors"
              >
                증상 상담
              </Link>
              <Link
                to="/checkup-analysis"
                className="text-gray-700 hover:text-medical-primary transition-colors"
              >
                검진 결과
              </Link>
              <a
                href="#medicine"
                className="text-gray-700 hover:text-medical-primary transition-colors"
              >
                처방약 정보
              </a>
              <a
                href="#senior"
                className="text-gray-700 hover:text-medical-primary transition-colors"
              >
                시니어 케어
              </a>
              <a
                href="#counseling"
                className="text-gray-700 hover:text-medical-primary transition-colors"
              >
                상담
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
