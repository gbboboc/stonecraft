export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export interface Sculpture {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  features: string[];
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  material: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
} 