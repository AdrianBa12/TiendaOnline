import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
}
@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private productos: Producto[] = [
    { id: 1, nombre: 'Auriculares Bluetooth', precio: 40 },
    { id: 2, nombre: 'Teclado Mecánico', precio: 60 },
    { id: 3, nombre: 'Mouse Gamer', precio: 30 },
    { id: 4, nombre: 'MausePad', precio: 10 },
  ];

  obtenerProductos(): Observable<Producto[]> {
    return of(this.productos);
  }
}
