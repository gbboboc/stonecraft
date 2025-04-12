import { ServiceCard } from "./ServiceCard";
import { services } from "../data/services";

export function Services() {
  const allServices = [
    ...services,
    {
      id: "5",
      title: "Livrare & Instalare",
      description:
        "Oferim servicii complete de livrare și instalare pentru toate lucrările noastre. Echipa noastră de specialiști se asigură că fiecare piesă este transportată și instalată cu grijă și profesionalism.",
      link: "/services/delivery-installation",
    },
  ];

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
