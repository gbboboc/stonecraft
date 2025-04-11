import { Sculpture } from "../types";

export const sculptures: Sculpture[] = [
  {
    id: "1",
    title: "Angel Memorial Statue",
    description: "This exquisite angel statue represents our finest craftsmanship. Hand-carved from a single block of premium Italian marble, this piece combines classical techniques with modern sensibilities.",
    price: 2400,
    imageUrl: "/placeholder.svg?height=600&width=500",
    category: "Stone Memorials",
    features: [
      "Premium Italian Marble",
      "Hand-Carved Details",
      "Weather-Resistant",
      "Customizable Options"
    ],
    dimensions: {
      height: 180,
      width: 60,
      depth: 60
    },
    material: "Italian Marble"
  },
  {
    id: "2",
    title: "Custom Family Monument",
    description: "Personalized design for your family, crafted with care and attention to detail.",
    price: 3500,
    imageUrl: "/placeholder.svg?height=600&width=450",
    category: "Custom Monuments",
    features: [
      "Custom Design",
      "Family Name Engraving",
      "Weather-Resistant",
      "Multiple Stone Options"
    ],
    dimensions: {
      height: 150,
      width: 100,
      depth: 30
    },
    material: "Granite"
  },
  {
    id: "3",
    title: "Religious Sculpture",
    description: "Sacred art for spiritual spaces, created with reverence and artistic excellence.",
    price: 2800,
    imageUrl: "/placeholder.svg?height=600&width=450",
    category: "Religious Sculptures",
    features: [
      "Traditional Design",
      "Detailed Carving",
      "Durable Materials",
      "Custom Sizing"
    ],
    dimensions: {
      height: 200,
      width: 80,
      depth: 80
    },
    material: "Marble"
  },
  {
    id: "4",
    title: "Stone Cross",
    description: "Traditional and modern designs for memorials and religious spaces.",
    price: 1200,
    imageUrl: "/placeholder.svg?height=600&width=450",
    category: "Stone Crosses",
    features: [
      "Classic Design",
      "Weather-Resistant",
      "Multiple Size Options",
      "Custom Engraving"
    ],
    dimensions: {
      height: 180,
      width: 90,
      depth: 15
    },
    material: "Granite"
  }
]; 