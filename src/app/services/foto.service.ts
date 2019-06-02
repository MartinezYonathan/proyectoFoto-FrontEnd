import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Foto } from '../model/foto';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  private baseUrl = 'http://localhost:8080';
  private baseUrlHeroku = 'https://api-foto-uacm.herokuapp.com';
  private Url = this.baseUrlHeroku +'/api/foto';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor( private http: HttpClient ) {
    console.log('Servicio Customer Funcionando');
  }

  getFoto(): Observable<Foto[]> {
    return this.http.get(this.Url).pipe(
      map(data => data as Foto[])
    );
  }

  postFoto(foto: Foto): Observable<Foto> {
    return this.http.post<Foto>(this.Url, foto, {headers: this.httpHeaders});
  }

  updateFoto(foto: Foto): Observable<Foto> {
    return this.http.put<Foto>(this.Url, foto, {headers: this.httpHeaders});
  }

  deleteFoto(id: number): Observable<Foto> {
    return this.http.delete<Foto>(`${this.Url}/${id}`, {headers: this.httpHeaders});
  }

}
