import Link from "next/link";
import { services } from "../data/services";
import { ArrowRight, Truck, Cross, Church, Palette } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  link: string;
  icon?: string;
}

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const getIcon = (serviceId: string) => {
    switch (serviceId) {
      case "1":
        return <Cross className="h-5 w-5" />;
      case "2":
        return <Church className="h-5 w-5" />;
      case "3":
        return <Palette className="h-5 w-5" />;
      case "4":
        return <Cross className="h-5 w-5" />;
      case "5":
        return <Truck className="h-5 w-5" />;
      default:
        return <ArrowRight className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow border-l-4 border-[#D6A461]">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-[2px] bg-[#D6A461]"></div>
        <h3 className="text-xl font-bold text-[#333333]">{service.title}</h3>
      </div>
      <p className="text-[#666666] leading-relaxed mb-6">
        {service.description}
      </p>
      <Link
        href={service.link}
        className="inline-flex items-center text-[#D6A461] hover:text-[#333333] transition-colors"
      >
        {getIcon(service.id)}
      </Link>
    </div>
  );
}
