import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';  // <- Pastikan ada

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
  imports: [CommonModule, RouterLink],  // <- RouterLink import
  templateUrl: './lokasi-perumahan.html',
  styleUrl: './lokasi-perumahan.css',
})

export class LokasiPerumahan {
  @Input() housing: Housing = { 
    id: 0,
      title: '',
      location: '',
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      area: 0,
      image: '',
      rating: 0,
      status: '',
      type: '',
      description: '',
      postedDays: 0
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
