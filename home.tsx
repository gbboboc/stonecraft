"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Plus,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Navigation } from "./components/Navigation";
import { SculptureCard } from "./components/SculptureCard";
import { Gallery } from "./components/Gallery";
import { Services } from "./components/Services";
import { Footer } from "./components/Footer";
import { navigationItems } from "./data/navigation";
import { sculptures } from "./data/sculptures";
import { contactInfo } from "./data/contact";
import { categories } from "./data/categories";
import CategoriesGrid from "./components/CategoriesGrid";
import { ConsultationModal } from "./components/ConsultationModal";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSculptureIndex, setCurrentSculptureIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSculptureIndex((prevIndex) =>
          prevIndex === sculptures.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 500); // Half of the transition duration
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const currentSculpture = sculptures[currentSculptureIndex];

  const handleExploreClick = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProcessClick = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navigation items={navigationItems} isScrolled={isScrolled} />

      {/* Hero Section - Rotating Sculpture Gallery */}
      <section id="home" className="py-20 md:py-28 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <span className="inline-block text-[#D6A461] text-sm tracking-wider uppercase mb-3">
                Artă Premium în Piatră
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 text-[#333333]">
                Meșteșug <span className="font-bold">Etern</span> în Piatră
              </h1>
              <p className="text-lg text-[#666666] mb-10 max-w-lg leading-relaxed">
                Unde arta întâlnește emoția, creând monumente și sculpturi care
                rezistă trecerii timpului.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleExploreClick}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="group relative bg-[#333333] text-white px-8 py-3 rounded-sm font-medium hover:bg-[#222222] transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explorează Colecția
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D6A461] to-[#C89551] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button
                  onClick={handleProcessClick}
                  className="group relative border border-[#333333] text-[#333333] px-8 py-3 rounded-sm font-medium hover:bg-[#333333] hover:text-white transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Procesul Nostru
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-[#333333] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#F5F5F5] rounded-full -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#F5F5F5] rounded-full -z-10"></div>

              <div className="relative h-[600px] rounded-sm overflow-hidden shadow-lg">
                <div
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <Image
                    src={currentSculpture.imageUrl}
                    alt={currentSculpture.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating info card */}
              <div
                className={`absolute -bottom-6 -left-6 bg-white p-5 rounded-sm shadow-md max-w-xs transition-opacity duration-1000 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-[2px] bg-[#D6A461]"></div>
                  <p className="text-sm font-medium text-[#333333]">
                    {currentSculpture.category}
                  </p>
                </div>
                <h3 className="text-lg font-bold mb-1 text-[#333333]">
                  {currentSculpture.title}
                </h3>
                <p className="text-sm text-[#666666]">
                  {currentSculpture.material}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Consultation CTA - Simplified */}
      <section className="py-10 bg-[#333333] text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-white/10 rounded-full">
                <Calendar className="h-6 w-6 text-[#D6A461]" />
              </div>
              <div>
                <h3 className="text-xl font-light">
                  Doriți o{" "}
                  <span className="font-bold">consultație gratuită</span>?
                </h3>
                <p className="text-white/70 mt-1">
                  Discutați cu experții noștri despre nevoile dumneavoastră
                  pentru un memorial
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative whitespace-nowrap bg-[#D6A461] hover:bg-[#C89551] text-[#333333] font-medium py-3 px-8 rounded-sm transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Programează Acum
                <Calendar className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#D6A461] to-[#C89551] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Services Section */}
      <Services />

      {/* Gallery Section - Merged with Featured Sculptures */}
      <section id="gallery" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-[#D6A461] text-sm tracking-wider uppercase mb-3">
              Ce Oferim
            </span>
            <h2 className="text-3xl font-light text-[#333333] mb-4">
              Serviciile <span className="font-bold">Noastre</span>
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              De la monumente personalizate la sculpturi religioase, oferim o
              gamă largă de servicii pentru a satisface nevoile dumneavoastră
              memoriale și artistice.
            </p>
          </div>

          {/* Gallery Grid */}
          <Gallery sculptures={sculptures.slice(1)} />
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-[#F5F5F5]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block text-[#D6A461] text-sm tracking-wider uppercase mb-3">
              Despre Noi
            </span>
            <h2 className="text-3xl font-light text-[#333333] mb-4">
              <span className="text-2xl font-bold">ELITPETRA</span> - Meșteșug
              în Piatră
            </h2>
            <p className="text-[#666666] leading-relaxed">
              La ELITPETRA realizăm lucrări din piatră naturală – monumente
              funerare, troițe, răstigniri și alte creații personalizate,
              conform dorințelor dumneavoastră. Cu o experiență de peste 10 ani
              în domeniu, oferim, de-asemenea, servicii complete de livrare și
              instalare, asigurând calitate.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block text-[#D6A461] text-sm tracking-wider uppercase mb-2">
              Contact
            </span>
            <h2 className="text-3xl font-light text-[#333333] mb-3">
              Să <span className="font-bold">Discutăm</span> Despre Proiectul
              Dvs.
            </h2>
            <p className="text-[#666666] leading-relaxed">
              Suntem aici pentru a vă ajuta să creați un memorial personalizat
              sau o sculptură care să reflecte perfect viziunea dumneavoastră.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="p-3 bg-[#F5F5F5] rounded-full">
                    <Phone className="h-5 w-5 text-[#D6A461]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666666] uppercase tracking-wider mb-1">
                      Phone
                    </p>
                    <p className="font-medium text-[#333333] text-lg">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="p-3 bg-[#F5F5F5] rounded-full">
                    <Mail className="h-5 w-5 text-[#D6A461]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666666] uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <p className="font-medium text-[#333333] text-lg">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="p-3 bg-[#F5F5F5] rounded-full">
                    <MapPin className="h-5 w-5 text-[#D6A461]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666666] uppercase tracking-wider mb-1">
                      Address
                    </p>
                    <p className="font-medium text-[#333333] text-lg">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm text-[#666666] uppercase tracking-wider mb-2"
                    >
                      Prenume
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      placeholder="Prenumele dvs."
                      className="w-full px-4 py-3 bg-[#F9F9F9] border-b-2 border-[#EEEEEE] focus:outline-none focus:border-[#D6A461] text-[#333333] transition-all duration-300 placeholder:text-[#999999]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm text-[#666666] uppercase tracking-wider mb-2"
                    >
                      Nume
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      placeholder="Numele dvs."
                      className="w-full px-4 py-3 bg-[#F9F9F9] border-b-2 border-[#EEEEEE] focus:outline-none focus:border-[#D6A461] text-[#333333] transition-all duration-300 placeholder:text-[#999999]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-[#666666] uppercase tracking-wider mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Adresa dvs. de email"
                    className="w-full px-4 py-3 bg-[#F9F9F9] border-b-2 border-[#EEEEEE] focus:outline-none focus:border-[#D6A461] text-[#333333] transition-all duration-300 placeholder:text-[#999999]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm text-[#666666] uppercase tracking-wider mb-2"
                  >
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Numărul dvs. de telefon"
                    className="w-full px-4 py-3 bg-[#F9F9F9] border-b-2 border-[#EEEEEE] focus:outline-none focus:border-[#D6A461] text-[#333333] transition-all duration-300 placeholder:text-[#999999]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-[#666666] uppercase tracking-wider mb-2"
                  >
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Scrieți mesajul dvs. aici..."
                    className="w-full px-4 py-3 bg-[#F9F9F9] border-b-2 border-[#EEEEEE] focus:outline-none focus:border-[#D6A461] text-[#333333] transition-all duration-300 placeholder:text-[#999999] resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="group relative mt-8 w-full py-5 bg-[#D6A461] text-white text-base overflow-hidden rounded-sm uppercase tracking-wider font-medium transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[0px]"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Trimite Mesajul
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D6A461] via-[#E3B171] to-[#D6A461] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer contactInfo={contactInfo} />
    </div>
  );
}
