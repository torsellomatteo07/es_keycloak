import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpesaService {
  private http = inject(HttpClient);
  private keycloak = inject(Keycloak);
  private baseUrl = 'https://glorious-spoon-7vqqvjjwqpq9fp7gw-5000.app.github.dev';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `Bearer ${this.keycloak.token}` });
  }

  // Metodi per il Registro Elettronico
  getVoti(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/voti`, { headers: this.getHeaders() });
  }
  aggiungiVoto(voto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/voti`, voto, { headers: this.getHeaders() });
  }

  // Metodi per la vecchia Lista Spesa (per non far crashare l'app)
  getItems(): Observable<any> { return this.getVoti(); }
  addItem(item: any): Observable<any> { return this.aggiungiVoto({nome: item, materia: 'Generale', voto: 0, username_studente: 'test'}); }
  deleteItem(id: number): Observable<any> { return this.http.delete(`${this.baseUrl}/items/${id}`, { headers: this.getHeaders() }); }
}
