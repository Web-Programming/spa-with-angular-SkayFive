import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Housing } from "../lokasi-perumahan/housing.model";
import { Observable } from "rxjs";


@Injectable ({
  providedIn: 'root'
})
export class HousingService {
  private apiUrl = 'http://localhost:3000/housing';

  constructor(private http: HttpClient) {}

  getAllHousing(): Observable<Housing[]> {
    return this.http.get<Housing[]>(this.apiUrl);
  }

  getAllHousingById(id: number): Observable<Housing> {
    return this.http.get<Housing>(`${this.apiUrl}/${id}`);
  }

  filterHousingByType(type: string): Observable<Housing[]> {
    return this.http.get<Housing[]>(`${this.apiUrl}?type=${type}`);
  }
}
