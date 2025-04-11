"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Menu,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Plus,
  ArrowRight,
  Calendar,
  ChevronRight,
} from "lucide-react"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation - Simplified and more elegant */}
      <header
        className={`sticky top-0 z-50 ${isScrolled ? "bg-white/95 shadow-sm" : "bg-transparent"} transition-all duration-300 backdrop-blur-sm`}
      >
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#333333]">
            StoneCraft
          </Link>
          <nav className="hidden md:flex items-center space-x-10">
            <Link href="/" className="font-medium text-[#333333] hover:text-[#D6A461] transition-colors">
              Home
            </Link>
            <Link href="/about" className="font-medium text-[#333333] hover:text-[#D6A461] transition-colors">
              About
            </Link>
            <Link href="/gallery" className="font-medium text-[#333333] hover:text-[#D6A461] transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="font-medium text-[#333333] hover:text-[#D6A461] transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-6">
            <button aria-label="Search" className="text-[#333333] hover:text-[#D6A461] transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Menu" className="md:hidden text-[#333333]">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Minimalist and Elegant */}
      <section className="py-20 md:py-28 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <span className="inline-block text-[#D6A461] text-sm tracking-wider uppercase mb-3">
                Premium Stone Artistry
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 text-[#333333]">
                Timeless <span className="font-bold">Craftsmanship</span> in Stone
              </h1>
              <p className="text-lg text-[#666666] mb-10 max-w-lg leading-relaxed">
                Where artistry meets emotion, creating monuments and sculptures that stand the test of time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#333333] text-white px-8 py-3 rounded-sm font-medium hover:bg-[#222222] transition-colors">
                  Explore Collection
                </button>
                <button className="border border-[#333333] text-[#333333] px-8 py-3 rounded-sm font-medium hover:bg-[#333333] hover:text-white transition-colors flex items-center justify-center gap-2">
                  <span>Our Process</span>
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
                  <p className="text-sm font-medium text-[#333333]">Featured Work</p>
                </div>
                <h3 className="text-lg font-bold mb-1 text-[#333333]">Angel Memorial</h3>
                <p className="text-sm text-[#666666]">Hand-carved Italian marble</p>
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
                  Would you like a <span className="font-bold">free consultation</span>?
                </h3>
                <p className="text-white/70 mt-1">Speak with our expert craftsmen about your memorial needs</p>
              </div>
            </div>
            <button className="whitespace-nowrap bg-[#D6A461] hover:bg-[#C89551] text-[#333333] font-medium py-3 px-8 rounded-sm transition-colors">
              Schedule Now
            </button>
          </div>
        </div>
      </section>

      {/* Category Navigation - Simplified */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-light text-center mb-12 text-[#333333]">
            Our <span className="font-bold">Monument Collection</span>
          </h2>

          <div className="flex justify-center mb-4 overflow-x-auto">
            <div className="inline-flex border-b border-[#EEEEEE] whitespace-nowrap">
              <button className="px-6 py-3 font-medium border-b-2 border-[#D6A461] text-[#333333]">
                Stone Memorials
              </button>
              <button className="px-6 py-3 font-medium text-[#666666] hover:text-[#333333] transition-colors">
                Custom Monuments
              </button>
              <button className="px-6 py-3 font-medium text-[#666666] hover:text-[#333333] transition-colors">
                Memorial Art
              </button>
              <button className="px-6 py-3 font-medium text-[#666666] hover:text-[#333333] transition-colors">
                Religious Sculptures
              </button>
              <button className="px-6 py-3 font-medium text-[#666666] hover:text-[#333333] transition-colors">
                Stone Crosses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sculptures - Minimalist Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <span className="inline-block text-[#D6A461] text-sm tracking-wider uppercase mb-3">Our Masterpieces</span>
            <h2 className="text-3xl font-light text-[#333333]">
              Featured <span className="font-bold">Sculptures</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <div className="relative h-[500px] rounded-sm overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Angel Memorial Statue"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                <span className="text-white/80 text-sm uppercase tracking-wider mb-2">Featured Work</span>
                <h3 className="text-white text-2xl font-bold mb-2">Angel Memorial Statue</h3>
                <p className="text-white/90 mb-6">Hand-carved from premium Italian marble</p>
                <button className="bg-white text-[#333333] py-2 px-6 rounded-sm font-medium w-max hover:bg-[#F5F5F5] transition-colors">
                  View Details
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <span className="text-[#D6A461] text-sm uppercase tracking-wider mb-3">Our Masterpiece</span>
              <h3 className="text-3xl font-bold mb-4 text-[#333333]">Angel Memorial Statue</h3>
              <p className="text-[#666666] mb-8 leading-relaxed">
                This exquisite angel statue represents our finest craftsmanship. Hand-carved from a single block of
                premium Italian marble, this piece combines classical techniques with modern sensibilities.
              </p>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D6A461] rounded-full"></div>
                  <span className="text-[#666666]">Premium Italian Marble</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D6A461] rounded-full"></div>
                  <span className="text-[#666666]">Hand-Carved Details</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D6A461] rounded-full"></div>
                  <span className="text-[#666666]">Weather-Resistant</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#D6A461] rounded-full"></div>
                  <span className="text-[#666666]">Customizable Options</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-light text-[#333333]">
                  $<span className="font-bold">2,400</span>
                </span>
                <button className="bg-[#333333] text-white py-2 px-6 rounded-sm font-medium flex items-center gap-2 hover:bg-[#222222] transition-colors">
                  <span>Request Quote</span>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Secondary sculptures - Clean Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Item 1 */}
            <div className="group">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=600&width=450"
                  alt="Custom Family Monument"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-[#333333] py-2 px-6 rounded-sm font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#333333] mb-1">Custom Family Monument</h3>
              <div className="flex justify-between items-center">
                <p className="text-[#666666]">Premium Granite</p>
                <p className="font-medium text-[#D6A461]">$3,800</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="group">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=600&width=450"
                  alt="Elegant Stone Cross"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-[#333333] py-2 px-6 rounded-sm font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#333333] mb-1">Elegant Stone Cross</h3>
              <div className="flex justify-between items-center">
                <p className="text-[#666666]">Limestone</p>
                <p className="font-medium text-[#D6A461]">$1,950</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="group">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=600&width=450"
                  alt="Celtic Memorial Stone"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-[#333333] py-2 px-6 rounded-sm font-medium transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#333333] mb-1">Celtic Memorial Stone</h3>
              <div className="flex justify-between items-center">
                <p className="text-[#666666]">Sandstone</p>
                <p className="font-medium text-[#D6A461]">$2,250</p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-[#333333] font-medium hover:text-[#D6A461] transition-colors"
            >
              <span>View All Sculptures</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section - Minimalist */}
      <section className="py-24 bg-[#F5F5F5]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block text-[#D6A461] text-sm tracking-wider uppercase mb-3">Our Story</span>
            <h2 className="text-3xl font-light text-[#333333] mb-4">
              The <span className="font-bold">Legacy</span> of Our Craft
            </h2>
            <p className="text-[#666666] leading-relaxed">
              For over three generations, our family has been creating beautiful stone sculptures and monuments that
              honor memories and celebrate artistry.
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
                <h3 className="text-2xl font-bold mb-4 text-[#333333]">Craftsmanship & Tradition</h3>
                <p className="text-[#666666] leading-relaxed">
                  We combine traditional craftsmanship with modern techniques to create timeless pieces. Each sculpture
                  is meticulously crafted by our master stone artisans, who bring decades of experience to every
                  project.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-white rounded-sm transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-10 h-[2px] bg-[#D6A461] mb-4"></div>
                  <h3 className="font-bold text-lg mb-2 text-[#333333]">Master Craftsmanship</h3>
                  <p className="text-[#666666]">Our sculptors have decades of experience working with stone</p>
                </div>

                <div className="p-6 bg-white rounded-sm transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-10 h-[2px] bg-[#D6A461] mb-4"></div>
                  <h3 className="font-bold text-lg mb-2 text-[#333333]">Premium Materials</h3>
                  <p className="text-[#666666]">We source the finest stone from quarries around the world</p>
                </div>

                <div className="p-6 bg-white rounded-sm transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-10 h-[2px] bg-[#D6A461] mb-4"></div>
                  <h3 className="font-bold text-lg mb-2 text-[#333333]">Custom Designs</h3>
                  <p className="text-[#666666]">We work closely with clients to create personalized monuments</p>
                </div>

                <div className="p-6 bg-white rounded-sm transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-10 h-[2px] bg-[#D6A461] mb-4"></div>
                  <h3 className="font-bold text-lg mb-2 text-[#333333]">Crafted with Care</h3>
                  <p className="text-[#666666]">Every piece receives our full attention and artistic dedication</p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-[#333333] font-medium hover:text-[#D6A461] transition-colors"
                >
                  <span>Learn More About Our Process</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Minimalist */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-block text-[#D6A461] text-sm tracking-wider uppercase mb-3">Get In Touch</span>
            <h2 className="text-3xl font-light text-[#333333] mb-4">
              Contact <span className="font-bold">Us</span>
            </h2>
            <p className="text-[#666666] leading-relaxed">
              We're here to help you create a beautiful memorial or sculpture. Reach out to discuss your project or
              schedule a consultation.
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
                    <p className="font-medium text-[#333333]">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="p-3 bg-[#F5F5F5] rounded-full">
                    <Mail className="h-5 w-5 text-[#333333]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666666] mb-1">Email</p>
                    <p className="font-medium text-[#333333]">info@stonecraft.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="p-3 bg-[#F5F5F5] rounded-full">
                    <MapPin className="h-5 w-5 text-[#333333]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666666] mb-1">Address</p>
                    <p className="font-medium text-[#333333]">123 Sculpture Lane, Stone City, SC 12345</p>
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
                    <label htmlFor="first-name" className="block text-sm font-medium text-[#666666] mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      className="w-full px-4 py-3 border border-[#EEEEEE] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#D6A461] focus:border-[#D6A461] bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-[#666666] mb-2">
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
                  <label htmlFor="email" className="block text-sm font-medium text-[#666666] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-[#EEEEEE] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#D6A461] focus:border-[#D6A461] bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#666666] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-[#EEEEEE] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#D6A461] focus:border-[#D6A461] bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#666666] mb-2">
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

      {/* Footer - Minimalist */}
      <footer className="bg-[#333333] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6">StoneCraft</h3>
              <p className="text-white/70 leading-relaxed mb-8">
                We create beautiful stone sculptures and monuments that honor memories and celebrate artistry, combining
                traditional craftsmanship with modern techniques.
              </p>
              <div>
                <h4 className="font-medium mb-4 text-white/80">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="p-2 border border-white/20 rounded-full hover:border-[#D6A461] hover:text-[#D6A461] transition-colors"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="p-2 border border-white/20 rounded-full hover:border-[#D6A461] hover:text-[#D6A461] transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="p-2 border border-white/20 rounded-full hover:border-[#D6A461] hover:text-[#D6A461] transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="p-2 border border-white/20 rounded-full hover:border-[#D6A461] hover:text-[#D6A461] transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Our Products</h3>
              <ul className="space-y-3 text-white/70">
                <li>
                  <a href="#" className="hover:text-[#D6A461] transition-colors">
                    Stone Memorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D6A461] transition-colors">
                    Custom Monuments
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D6A461] transition-colors">
                    Gravestones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D6A461] transition-colors">
                    Religious Sculptures
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D6A461] transition-colors">
                    Stone Crosses
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Our Company</h3>
              <ul className="space-y-3 text-white/70">
                <li>
                  <a href="#" className="hover:text-[#D6A461] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D6A461] transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D6A461] transition-colors">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#D6A461] transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6">Newsletter</h3>
              <p className="text-white/70 mb-4">Subscribe to get updates on new sculptures and special offers</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="flex-1 bg-white/10 border border-white/20 rounded-l-sm px-4 py-2 focus:outline-none focus:border-[#D6A461] text-white"
                />
                <button className="bg-[#D6A461] text-[#333333] px-4 py-2 rounded-r-sm hover:bg-[#C89551] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50 text-sm">
            <p>© {new Date().getFullYear()} StoneCraft. All rights reserved. Crafted with artistic precision.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

