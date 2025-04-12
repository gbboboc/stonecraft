import { Sculpture } from "../types";

export const sculptures: Sculpture[] = [
  {
    id: "1",
    title: "Statuie Memorială Înger",
    description: "Această excepțională statuie de înger reprezintă cel mai bun meșteșug al nostru. Sculptată manual dintr-un singur bloc de marmură italiană premium, această piesă combină tehnici clasice cu sensibilități moderne.",
    price: 2400,
    imageUrl: "/placeholder.svg?height=600&width=500",
    category: "Monumente din Piatră",
    features: [
      "Marmură Italiană Premium",
      "Detalii Sculptate Manual",
      "Rezistentă la Intemperii",
      "Opțiuni Personalizabile"
    ],
    dimensions: {
      height: 180,
      width: 60,
      depth: 60
    },
    material: "Marmură Italiană"
  },
  {
    id: "2",
    title: "Monument Familial Personalizat",
    description: "Design personalizat pentru familia dumneavoastră, realizat cu grijă și atenție la detalii.",
    price: 3500,
    imageUrl: "/placeholder.svg?height=600&width=450",
    category: "Monumente Personalizate",
    features: [
      "Design Personalizat",
      "Gravare Nume de Familie",
      "Rezistent la Intemperii",
      "Mai Multe Opțiuni de Piatră"
    ],
    dimensions: {
      height: 150,
      width: 100,
      depth: 30
    },
    material: "Granit"
  },
  {
    id: "3",
    title: "Sculptură Religioasă",
    description: "Artă sacră pentru spații spirituale, creată cu respect și excelență artistică.",
    price: 2800,
    imageUrl: "/placeholder.svg?height=600&width=450",
    category: "Sculpturi Religioase",
    features: [
      "Design Tradițional",
      "Sculptură Detaliată",
      "Materiale Durabile",
      "Dimensiuni Personalizabile"
    ],
    dimensions: {
      height: 200,
      width: 80,
      depth: 80
    },
    material: "Marmură"
  },
  {
    id: "4",
    title: "Cruce din Piatră",
    description: "Designuri tradiționale și moderne pentru memoriale și spații religioase.",
    price: 1200,
    imageUrl: "/placeholder.svg?height=600&width=450",
    category: "Cruci din Piatră",
    features: [
      "Design Clasic",
      "Rezistentă la Intemperii",
      "Mai Multe Opțiuni de Dimensiuni",
      "Gravare Personalizată"
    ],
    dimensions: {
      height: 180,
      width: 90,
      depth: 15
    },
    material: "Granit"
  }
]; 