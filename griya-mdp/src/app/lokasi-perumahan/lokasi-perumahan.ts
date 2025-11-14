import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Housing {
    id: number,
    title: string,
    location: string,
    price: number,
    bedrooms: number,
    bathrooms: number,
    area: number,
    image: string,
    rating: number,
    status: string,
    type?: string,
    description?: string,
    postedDays?: number 
}

@Component({
  selector:'app-lokasi-perumahan',
  imports: [CommonModule],
  templateUrl: './lokasi-perumahan.html',
  styleUrl: './lokasi-perumahan.css',
})

export class LokasiPerumahan {
  @Input() housing: Housing = { 
    id: 1,
      title: 'Griya Asri Residence',
      location: 'Jakarta Selatan',
      price: 850000000,
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
      rating: 4.5,
      status: 'Available',
      type: 'rumah',
      description: 'Hunian modern dengan desain minimalis di kawasan Jakarta Selatan yang strategis.',
      postedDays: 2
   };

  getStars(): number[] {
    return Array(Math.floor(this.housing.rating)).fill(0);
  }

  hasHalfStars(): boolean {
    return this.housing.rating % 1 >= 0.5;
  }

  getEmptyStars(): number[] {
    const fullStars = Math.floor(this.housing.rating);
    const hasHalf = this.hasHalfStars() ? 1 : 0;
    const EmptyStars = 5 - fullStars - hasHalf;
    return Array (EmptyStars).fill(0);
  }

  //Format harga ke Rupiah
  formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  }
}
