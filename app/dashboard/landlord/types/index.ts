export interface Category {
  id: string;
  name: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerMonth: number;
  amenities: string[];
  isAvailable: boolean;
  categoryId: string;
  category?: { name: string };
  imageUrl?: string;
}

export interface RentalRequest {
  id: string;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  tenant: {
    name: string;
    email: string;
  };
  property: {
    title: string;
    pricePerMonth: number;
  };
}