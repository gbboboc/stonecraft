import Link from "next/link";
import { services } from "../data/services";

interface Service {
  id: string;
  title: string;
  description: string;
  link: string;
}

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-[#333333] mb-4">{service.title}</h3>
      <p className="text-[#666666] mb-6 min-h-[72px]">{service.description}</p>
      <Link
        href={service.link}
        className="inline-block text-[#D6A461] hover:text-[#333333] transition-colors"
      >
        Learn More
        <span className="ml-2">→</span>
      </Link>
    </div>
  );
}
