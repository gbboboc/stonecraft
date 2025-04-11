import { ServiceCard } from "./ServiceCard";
import { services } from "../data/services";

export function Services() {
  return (
    <section id="services" className="py-24 bg-[#F5F5F5]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[#D6A461] text-sm tracking-wider uppercase mb-3">
            Our Services
          </span>
          <h2 className="text-3xl font-light text-[#333333] mb-4">
            What We <span className="font-bold">Offer</span>
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto">
            From custom monuments to religious sculptures, we offer a wide range
            of services to meet your memorial and artistic needs.
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
