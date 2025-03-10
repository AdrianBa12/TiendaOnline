import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
}
@Injectable({
  providedIn: 'root',
})
export class PagoService {
  private apiUrl = 'http://localhost:5000/api/pago';

  constructor(private http: HttpClient) {}

  procesarPago(token: string, monto: number) {
    return this.http.post(this.apiUrl, {
      token,
      amount: monto,
      currency: 'usd',
    });
  }
}
