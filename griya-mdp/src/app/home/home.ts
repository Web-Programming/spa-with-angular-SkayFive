import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <- Untuk Search
import { LokasiPerumahan } from '../lokasi-perumahan/lokasi-perumahan';
import { Housing } from '../lokasi-perumahan/housing.model';
import { HousingService } from '../services/housing'; // <- tambahkan import service
import { CommonModule } from '@angular/common';
// import { HOUSING_DATA } from '../data/housing-data';


@Component({
  selector: 'app-home',
  imports: [LokasiPerumahan, CommonModule, RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  // Data arrays
  housingList: Housing[] = []; //Data dari backend
  filteredList: Housing[] = []; //Data setelah filter/search
  selectedFilter: string = 'all'; //filter aktif

   //Search
  searchQuery: string = ''; //Query pencarian

    // pagination
  currentPage: number = 1; //Halaman saat ini
  itemsPerPage: number = 6; //Items per halaman

  //Loading and erro state
  isLoading: boolean = false; //Loading State
  errorMessage: string = '';  //Error message

  // Fallback data (jika backend tidk tersedia)
  private fallbackData: Housing[] = [
    {
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
    },
    {
      id: 2,
      title: 'Cendana Green Living',
      location: 'Bekasi',
      price: 650000000,
      bedrooms: 2,
      bathrooms: 1,
      area: 90,
      image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&h=400&fit=crop',
      rating: 4.2,
      status: 'Available',
      type: 'rumah',
      description: 'Rumah asri dengan lingkungan hijau, cocok untuk keluarga kecil.',
      postedDays: 5
    },
    {
      id: 3,
      title: 'Asteria Residence',
      location: 'Bandung',
      price: 1200000000,
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.8,
      status: 'Available',
      type: 'rumah',
      description: 'Hunian elegan dengan pemandangan pegunungan dan udara sejuk khas Bandung.',
      postedDays: 1
    },
    {
      id: 4,
      title: 'Permata Indah Residence',
      location: 'Surabaya',
      price: 950000000,
      bedrooms: 3,
      bathrooms: 2,
      area: 130,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
      rating: 4.4,
      status: 'Sold',
      type: 'rumah',
      description: 'Rumah bergaya modern di kawasan berkembang Surabaya Barat.',
      postedDays: 7
    },
    {
      id: 5,
      title: 'Taman Sakura Hills',
      location: 'Bogor',
      price: 780000000,
      bedrooms: 3,
      bathrooms: 2,
      area: 110,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop',
      rating: 4.6,
      status: 'Available',
      type: 'rumah',
      description: 'Hunian nyaman dengan suasana sejuk dan dekat kawasan wisata Bogor.',
      postedDays: 3
    },
    {
      id: 6,
      title: 'Seruni Lakeview',
      location: 'Depok',
      price: 720000000,
      bedrooms: 2,
      bathrooms: 2,
      area: 100,
      image: 'https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?q=80&w=1128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.3,
      status: 'Available',
      type: 'rumah',
      description: 'Rumah minimalis dekat danau dengan akses mudah ke pusat kota Depok.',
      postedDays: 4
    },
    {
      id: 7,
      title: 'Villa Sunrise Hills',
      location: 'Bandung',
      price: 1850000000,
      bedrooms: 3,
      bathrooms: 3,
      area: 220,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      rating: 4.8,
      status: 'Available',
      type: 'villa',
      description: 'Villa mewah dengan pemandangan pegunungan dan udara sejuk khas Bandung.',
      postedDays: 2
    },
    {
      id: 8,
      title: 'Villa Bali Harmoni',
      location: 'Bali',
      price: 2650000000,
      bedrooms: 4,
      bathrooms: 4,
      area: 300,
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200',
      rating: 4.9,
      status: 'Available',
      type: 'villa',
      description: 'Villa eksklusif dengan kolam renang pribadi dan suasana tropis khas Bali.',
      postedDays: 5
    },
    {
      id: 9,
      title: 'Villa Ocean Breeze',
      location: 'Lombok',
      price: 2100000000,
      bedrooms: 3,
      bathrooms: 3,
      area: 250,
      image: 'https://plus.unsplash.com/premium_photo-1682377521625-c656fc1ff3e1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.7,
      status: 'Available',
      type: 'villa',
      description: 'Villa modern dekat pantai dengan pemandangan laut sepanjang hari.',
      postedDays: 1
    },
    {
      id: 10,
      title: 'Apartemen Sky Residence',
      location: 'Jakarta',
      price: 950000000,
      bedrooms: 2,
      bathrooms: 1,
      area: 60,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200',
      rating: 4.5,
      status: 'Available',
      type: 'appartement',
      description: 'Apartemen modern dengan fasilitas lengkap dan akses langsung ke pusat bisnis.',
      postedDays: 3
    },
    {
      id: 11,
      title: 'Apartemen Green Park Tower',
      location: 'Surabaya',
      price: 780000000,
      bedrooms: 2,
      bathrooms: 2,
      area: 55,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.2,
      status: 'Available',
      type: 'appartement',
      description: 'Apartemen nyaman dengan pemandangan kota Surabaya dan fasilitas gym.',
      postedDays: 6
    },
    {
      id: 12,
      title: 'Apartemen Lagoon Suites',
      location: 'Bekasi',
      price: 650000000,
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      rating: 4.1,
      status: 'Available',
      type: 'appartement',
      description: 'Apartemen minimalis dekat mall dan stasiun LRT untuk mobilitas harian.',
      postedDays: 7
    }
  ];

  constructor (private housingService: HousingService) {}

  ngOnInit(): void {
    this.loadHousingData();
  }

  loadHousingData() {
    this.isLoading = true;
    this.errorMessage = '';

    this.housingService.getAllHousing().subscribe({
      next: (data) => {
        this.housingList = data;
        this.filteredList = data;
        this.isLoading = false;
        console.log('Data Berhasil Dimuat dari Beackend: ',data);
      },
      error: (err) => {
        console.error('Error loading housing data: ',err);
        //Gunakan data fallback
        this.housingList = this.fallbackData;
        this.filteredList = this.fallbackData;
        this.isLoading = false;
        this.errorMessage = 'Menggunakan data demo (backend tidak tersedia)';
      }
    });
  }

    filterByType(type: string) {
    this.selectedFilter = type;
    this.currentPage = 1; // Reset ke halaman pertama
    this.isLoading = true;
    this.errorMessage = '';
    
    if (type === 'all') {
      // Load semua data dari backend
      this.housingService.getAllHousing().subscribe({
        next: (data) => {
          this.housingList = data;
          this.filteredList = data;
          this.isLoading = false;
          
          // Terapkan search jika ada query
          if (this.searchQuery) {
            this.applySearch();
          }
        },
        error: (err) => {
          console.error('Error loading all housing data:', err);
          // Fallback ke filter lokal
          this.filteredList = [...this.housingList];
          this.isLoading = false;
          
          // Terapkan search jika ada query
          if (this.searchQuery) {
            this.applySearch();
          }
        }
      });
    } else {
      // Filter berdasarkan type dari backend
      this.housingService.filterHousingByType(type).subscribe({
        next: (data) => {
          this.filteredList = data;
          this.isLoading = false;
          
          // Terapkan search jika ada query
          if (this.searchQuery) {
            this.applySearch();
          }
        },
        error: (err) => {
          console.error('Error filtering housing by type:', err);
          // Fallback ke filter lokal
          this.filteredList = this.housingList.filter(h => h.type === type);
          this.isLoading = false;
          
          // Terapkan search jika ada query
          if (this.searchQuery) {
            this.applySearch();
          }
        }
      });
    }
  }

  isFilterActive(type: string): boolean {
    return this.selectedFilter === type;
  }

  // Method yang dipanggil saat user mengetik
  searchHousing() {
    this.currentPage = 1; // Reset ke halaman pertama
    this.applySearch();
  }

  // Logic search sebenarnya
  private applySearch() {
    const query = this.searchQuery.toLowerCase().trim();
    
    // Jika search kosong, kembalikan ke filter saat ini
    if (!query) {
      this.filterByType(this.selectedFilter);
      return;
    }

    // Base list berdasarkan filter
    let baseList = this.selectedFilter === 'all' 
      ? this.housingList 
      : this.housingList.filter(h => h.type === this.selectedFilter);

    // Apply search pada base list
    this.filteredList = baseList.filter(house => 
      house.title.toLowerCase().includes(query) ||
      house.location.toLowerCase().includes(query) ||
      house.description?.toLowerCase().includes(query) ||
      house.status.toLowerCase().includes(query)
    );
  }

  // Clear search
  clearSearch() {
    this.searchQuery = '';
    this.filterByType(this.selectedFilter);
  }

  //Pagination functionality
  get paginatedList(): Housing[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredList.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredList.slice.length / this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages}, (_, i) => i + 1);
  }

  goToPage (page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // Smooth scroll ke section
      document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Halaman berikutnya
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredList.length);
  }
}

  // //Array untuk data perumahan (bisa di isi dari backend nanti)
  // housingList: Housing[] = HOUSING_DATA;

  // // housingList: Housing = [...];
  // filteredList: Housing[] = [];
  // selectedFilter: string = 'all';

  // ngOnInit() {
  //   // Initialize filtered list with all housing
  //   this.filteredList = [...this.housingList];
  // }

  // filterByType(type: string) {
  //   this. selectedFilter = type;
  //   if (type === 'all') {
  //     this.filteredList = [...this.housingList];
  //   }else{
  //     this.filteredList = this.housingList.filter(h => h.type === type);
  //   }
  // }

  // isFilterActive(type: string): boolean {
  //   return this.selectedFilter === type;
  // }