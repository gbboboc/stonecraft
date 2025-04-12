import { ContactInfo } from "../types";
import { Phone, Mail, MapPin } from "lucide-react";

interface ContactProps {
  contactInfo: ContactInfo;
}

export function Contact({ contactInfo }: ContactProps) {
  return (
    <section id="contact" className="py-24 bg-[#F5F5F5]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[#D6A461] text-sm tracking-wider uppercase mb-3">
            Contact
          </span>
          <h2 className="text-3xl font-light text-[#333333] mb-4">
            Suntem <span className="font-bold">Aici</span>
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto">
            Pentru orice întrebări sau pentru a discuta despre proiectul
            dumneavoastră, nu ezitați să ne contactați.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-sm shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#F5F5F5] rounded-full">
                    <Phone className="h-5 w-5 text-[#D6A461]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#333333]">Telefon</h3>
                    <p className="text-[#666666]">{contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#F5F5F5] rounded-full">
                    <Mail className="h-5 w-5 text-[#D6A461]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#333333]">Email</h3>
                    <p className="text-[#666666]">{contactInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#F5F5F5] rounded-full">
                    <MapPin className="h-5 w-5 text-[#D6A461]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#333333]">Adresă</h3>
                    <p className="text-[#666666]">{contactInfo.address}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F5F5F5] p-8 rounded-sm">
                <h3 className="text-xl font-bold text-[#333333] mb-6">
                  Trimite-ne un mesaj
                </h3>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nume"
                      className="w-full px-4 py-2 border border-[#E5E5E5] rounded-sm focus:outline-none focus:border-[#D6A461]"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-2 border border-[#E5E5E5] rounded-sm focus:outline-none focus:border-[#D6A461]"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Mesaj"
                      rows={4}
                      className="w-full px-4 py-2 border border-[#E5E5E5] rounded-sm focus:outline-none focus:border-[#D6A461]"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#D6A461] text-white py-3 rounded-sm hover:bg-[#C89551] transition-colors"
                  >
                    Trimite
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
