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

interface FooterProps {
  contactInfo: ContactInfo;
}

export function Footer({ contactInfo }: FooterProps) {
  return (
    <footer className="bg-[#333333] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6">StoneCraft</h3>
            <p className="text-white/70 mb-6">
              Premium stone artistry and craftsmanship for monuments and
              sculptures that stand the test of time.
            </p>
            <div className="flex space-x-4">
              <a
                href={contactInfo.socialMedia.facebook}
                className="text-white/70 hover:text-[#D6A461] transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.socialMedia.twitter}
                className="text-white/70 hover:text-[#D6A461] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.socialMedia.instagram}
                className="text-white/70 hover:text-[#D6A461] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.socialMedia.linkedin}
                className="text-white/70 hover:text-[#D6A461] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-white/70 hover:text-[#D6A461] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-[#D6A461] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-white/70 hover:text-[#D6A461] transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-[#D6A461] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/custom-monuments"
                  className="text-white/70 hover:text-[#D6A461] transition-colors"
                >
                  Custom Monuments
                </Link>
              </li>
              <li>
                <Link
                  href="/services/religious-sculptures"
                  className="text-white/70 hover:text-[#D6A461] transition-colors"
                >
                  Religious Sculptures
                </Link>
              </li>
              <li>
                <Link
                  href="/services/memorial-art"
                  className="text-white/70 hover:text-[#D6A461] transition-colors"
                >
                  Memorial Art
                </Link>
              </li>
              <li>
                <Link
                  href="/services/stone-crosses"
                  className="text-white/70 hover:text-[#D6A461] transition-colors"
                >
                  Stone Crosses
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#D6A461] mt-1" />
                <span className="text-white/70">{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#D6A461]" />
                <span className="text-white/70">{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#D6A461]" />
                <span className="text-white/70">{contactInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50 text-sm">
          <p>© 2024 StoneCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
