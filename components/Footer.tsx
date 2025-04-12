import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { ContactInfo } from "../types";
import { scrollToSection } from "../utils/scroll";

interface FooterProps {
  contactInfo: ContactInfo;
}

export function Footer({ contactInfo }: FooterProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <footer className="bg-[#333333] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6">ELITPETRA</h3>
            <p className="text-white/70 mb-6">
              Artă premium în piatră și meșteșug pentru monumente și sculpturi
              care rezistă trecerii timpului.
            </p>
            <div className="flex space-x-4">
              <a
                href={contactInfo.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#D6A461] transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#D6A461] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#D6A461] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#D6A461] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Link-uri Rapide</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleClick(e, "home")}
                  className="text-white/70 hover:text-[#D6A461] transition-colors cursor-pointer"
                >
                  Acasă
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleClick(e, "about")}
                  className="text-white/70 hover:text-[#D6A461] transition-colors cursor-pointer"
                >
                  Despre Noi
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => handleClick(e, "gallery")}
                  className="text-white/70 hover:text-[#D6A461] transition-colors cursor-pointer"
                >
                  Galerie
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleClick(e, "contact")}
                  className="text-white/70 hover:text-[#D6A461] transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Servicii</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleClick(e, "services")}
                  className="text-white/70 hover:text-[#D6A461] transition-colors cursor-pointer"
                >
                  Monumente Funerare
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleClick(e, "services")}
                  className="text-white/70 hover:text-[#D6A461] transition-colors cursor-pointer"
                >
                  Sculpturi Religioase
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleClick(e, "services")}
                  className="text-white/70 hover:text-[#D6A461] transition-colors cursor-pointer"
                >
                  Artă Memorială
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleClick(e, "services")}
                  className="text-white/70 hover:text-[#D6A461] transition-colors cursor-pointer"
                >
                  Cruci din Piatră
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#D6A461]" />
                <span className="text-white/70">{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#D6A461]" />
                <span className="text-white/70">{contactInfo.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#D6A461]" />
                <span className="text-white/70">{contactInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50 text-sm">
          <p>© 2024 ELITPETRA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
