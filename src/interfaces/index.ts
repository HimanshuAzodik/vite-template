import { ElementType } from 'react';

export interface BaseDocument {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface PricingPageProps {
  searchParams: {
    currency?: string;
    billing_cycle?: string;
    app_id?: string;
  };
}
export interface InputField {
  id: string;
  icon: ElementType;
  placeholder: string;
  type: string;
}

export interface Campaigns {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  customerName: string;
  totalAmount: number;
  status: string;
  createdAt: Date;
}

export interface OrderState {
  search: string;
  selectedStatus: string;
  currentPage: number;
  selectedItems: number[];
  isModalOpen: boolean;
  date: { from: Date | undefined; to: Date | undefined };
}

export interface Product {
  id: number;
  price: number;
  weight: number;
  length: number;
  breadth: number;
  name: string;
  category: string;
  brand: string;
  description: string;
  width: number;
  sellingOption: 'in-store' | 'online' | 'both';
  images: File[];
  scheduledDate?: Date;
}
