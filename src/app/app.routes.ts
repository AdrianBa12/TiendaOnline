import { Routes } from '@angular/router';
import { PagoComponent } from './Core/pago/pago.component';

export const routes: Routes = [
  { path: 'pago', component: PagoComponent }, // Agrega la ruta aquí
  { path: '', redirectTo: '/pago', pathMatch: 'full' }, // Redirige a pago automáticamente
];
