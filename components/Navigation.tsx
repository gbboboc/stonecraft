import Link from "next/link";
import { Menu } from "lucide-react";
import { NavigationItem } from "../types";
import { scrollToSection } from "../utils/scroll";

interface NavigationProps {
  items: NavigationItem[];
  isScrolled: boolean;
}

export function Navigation({ items, isScrolled }: NavigationProps) {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const sectionId = href.replace("/#", "");
    scrollToSection(sectionId);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/#home"
            onClick={(e) => handleNavClick(e, "/#home")}
            className="text-2xl font-bold text-[#333333]"
          >
            ELITPETRA
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-[#666666] hover:text-[#333333] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <button className="p-2 hover:bg-[#F5F5F5] rounded-sm transition-colors md:hidden">
              <Menu className="w-5 h-5 text-[#666666]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
