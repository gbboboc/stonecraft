"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Plus, Phone, Mail, MapPin } from "lucide-react";
import { Navigation } from "./components/Navigation";
import { SculptureCard } from "./components/SculptureCard";
import { Gallery } from "./components/Gallery";
import { Services } from "./components/Services";
import { Footer } from "./components/Footer";
import { navigationItems } from "./data/navigation";
import { sculptures } from "./data/sculptures";
import { contactInfo } from "./data/contact";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navigation items={navigationItems} isScrolled={isScrolled} />

      {/* Hero Section - Minimalist and Elegant */}
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
                <button className="bg-[#333333] text-white px-8 py-3 rounded-sm font-medium hover:bg-[#222222] transition-colors">
                  Explorează Colecția
                </button>
                <button className="border border-[#333333] text-[#333333] px-8 py-3 rounded-sm font-medium hover:bg-[#333333] hover:text-white transition-colors flex items-center justify-center gap-2">
                  <span>Procesul Nostru</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#F5F5F5] rounded-full -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#F5F5F5] rounded-full -z-10"></div>

              <div className="relative h-[500px] rounded-sm overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Premium stone sculpture"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Floating info card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-sm shadow-md max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-[2px] bg-[#D6A461]"></div>
                  <p className="text-sm font-medium text-[#333333]">
                    Lucrare Recomandată
                  </p>
                </div>
                <h3 className="text-lg font-bold mb-1 text-[#333333]">
                  Memorial Înger
                </h3>
                <p className="text-sm text-[#666666]">
                  Marmură italiană sculptată manual
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
            <button className="whitespace-nowrap bg-[#D6A461] hover:bg-[#C89551] text-[#333333] font-medium py-3 px-8 rounded-sm transition-colors">
              Programează Acum
            </button>
          </div>
        </div>
      </section>

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

          {/* Featured Sculpture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <SculptureCard sculpture={sculptures[0]} variant="featured" />
            <div className="flex flex-col justify-center">
              <span className="text-[#D6A461] text-sm uppercase tracking-wider mb-3">
                Capodopera Noastră
              </span>
              <h3 className="text-3xl font-bold mb-4 text-[#333333]">
                {sculptures[0].title}
              </h3>
              <p className="text-[#666666] mb-8 leading-relaxed">
                {sculptures[0].description}
              </p>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                {sculptures[0].features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#D6A461] rounded-full"></div>
                    <span className="text-[#666666]">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-light text-[#333333]">
                  $<span className="font-bold">{sculptures[0].price}</span>
                </span>
                <button className="bg-[#333333] text-white py-2 px-6 rounded-sm font-medium flex items-center gap-2 hover:bg-[#222222] transition-colors">
                  <span>Cere Ofertă</span>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
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
              Our Story
            </span>
            <h2 className="text-3xl font-light text-[#333333] mb-4">
              The <span className="font-bold">Legacy</span> of Our Craft
            </h2>
            <p className="text-[#666666] leading-relaxed">
              For over three generations, our family has been creating beautiful
              stone sculptures and monuments that honor memories and celebrate
              artistry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-[#D6A461]/20 -z-10"></div>
              <div className="relative h-[500px] rounded-sm overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Stone sculptor at work"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#D6A461]/20 -z-10"></div>

              {/* Experience badge */}
              <div className="absolute -bottom-5 -right-5 bg-white p-4 rounded-sm shadow-md">
                <p className="text-[#333333] font-bold text-xl">30+</p>
                <p className="text-sm text-[#666666]">Years of Excellence</p>
              </div>
            </div>

            <div>
              <div className="border-l-2 border-[#D6A461] pl-6 py-2 mb-8">
                <h3 className="text-2xl font-bold mb-4 text-[#333333]">
                  Craftsmanship & Tradition
                </h3>
                <p className="text-[#666666] leading-relaxed">
                  We combine traditional craftsmanship with modern techniques to
                  create timeless pieces. Each sculpture is meticulously crafted
                  by our master stone artisans, who bring decades of experience
                  to every project.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-white rounded-sm transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-10 h-[2px] bg-[#D6A461] mb-4"></div>
                  <h3 className="font-bold text-lg mb-2 text-[#333333]">
                    Monumente Personalizate
                  </h3>
                  <p className="text-[#666666] mb-4">
                    Monumente din piatră personalizate conform specificațiilor
                    dumneavoastră, care onorează pe cei dragi cu designuri unice
                    și pline de sens.
                  </p>
                  <button className="text-[#D6A461] font-medium flex items-center gap-2 hover:gap-3 transition-all">
                    <span>Află Mai Multe</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-6 bg-white rounded-sm transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-10 h-[2px] bg-[#D6A461] mb-4"></div>
                  <h3 className="font-bold text-lg mb-2 text-[#333333]">
                    Sculpturi Religioase
                  </h3>
                  <p className="text-[#666666] mb-4">
                    Opere de artă sacră pentru biserici, temple și spații
                    spirituale, create cu respect și excelență artistică.
                  </p>
                  <button className="text-[#D6A461] font-medium flex items-center gap-2 hover:gap-3 transition-all">
                    <span>Află Mai Multe</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-6 bg-white rounded-sm transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-10 h-[2px] bg-[#D6A461] mb-4"></div>
                  <h3 className="font-bold text-lg mb-2 text-[#333333]">
                    Artă Memorială
                  </h3>
                  <p className="text-[#666666] mb-4">
                    Piese artistice memoriale care sărbătoresc viața și creează
                    omagii durabile pentru cei dragi.
                  </p>
                  <button className="text-[#D6A461] font-medium flex items-center gap-2 hover:gap-3 transition-all">
                    <span>Află Mai Multe</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="p-6 bg-white rounded-sm transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-10 h-[2px] bg-[#D6A461] mb-4"></div>
                  <h3 className="font-bold text-lg mb-2 text-[#333333]">
                    Cruci din Piatră
                  </h3>
                  <p className="text-[#666666] mb-4">
                    Cruci tradiționale și moderne din piatră pentru memoriale și
                    spații religioase, disponibile în diverse stiluri și
                    materiale.
                  </p>
                  <button className="text-[#D6A461] font-medium flex items-center gap-2 hover:gap-3 transition-all">
                    <span>Află Mai Multe</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block text-[#D6A461] text-sm tracking-wider uppercase mb-3">
              Get In Touch
            </span>
            <h2 className="text-3xl font-light text-[#333333] mb-4">
              Contact <span className="font-bold">Us</span>
            </h2>
            <p className="text-[#666666] leading-relaxed">
              We're here to help you create a beautiful memorial or sculpture.
              Reach out to discuss your project or schedule a consultation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="space-y-8 mb-12">
                <div className="flex items-center gap-6">
                  <div className="p-3 bg-[#F5F5F5] rounded-full">
                    <Phone className="h-5 w-5 text-[#333333]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666666] mb-1">Phone</p>
                    <p className="font-medium text-[#333333]">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="p-3 bg-[#F5F5F5] rounded-full">
                    <Mail className="h-5 w-5 text-[#333333]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666666] mb-1">Email</p>
                    <p className="font-medium text-[#333333]">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="p-3 bg-[#F5F5F5] rounded-full">
                    <MapPin className="h-5 w-5 text-[#333333]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666666] mb-1">Address</p>
                    <p className="font-medium text-[#333333]">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="h-[300px] bg-[#F5F5F5] rounded-sm flex items-center justify-center">
                <p className="text-[#666666]">Map will be displayed here</p>
              </div>
            </div>

            <div>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-[#666666] mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      className="w-full px-4 py-3 border border-[#EEEEEE] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#D6A461] focus:border-[#D6A461] bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-[#666666] mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      className="w-full px-4 py-3 border border-[#EEEEEE] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#D6A461] focus:border-[#D6A461] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#666666] mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-[#EEEEEE] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#D6A461] focus:border-[#D6A461] bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[#666666] mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-[#EEEEEE] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#D6A461] focus:border-[#D6A461] bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#666666] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-[#EEEEEE] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#D6A461] focus:border-[#D6A461] bg-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#333333] text-white py-3 px-6 rounded-sm font-medium hover:bg-[#222222] transition-colors"
                >
                  Send Message
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
