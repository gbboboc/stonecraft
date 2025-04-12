import { ServiceCard } from "./ServiceCard";
import { services } from "../data/services";

export function Services() {
  return (
    <section id="services" className="py-24 bg-[#F5F5F5]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[#D6A461] text-sm tracking-wider uppercase mb-3">
            Serviciile Noastre
          </span>
          <h2 className="text-3xl font-light text-[#333333] mb-4">
            Ce <span className="font-bold">Oferim</span>
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto">
            De la monumente personalizate la sculpturi religioase, oferim o gamă
            largă de servicii pentru a satisface nevoile dumneavoastră memoriale
            și artistice.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
