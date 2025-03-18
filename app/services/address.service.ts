import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://localhost:8080/api/addressbook';

  constructor(private http: HttpClient) {}

  getAddresses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAddressById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addAddress(address: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, address);
  }

  updateAddress(id: number, address: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, address);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}