import { Component, OnInit } from '@angular/core';
import { PagoService } from '../../Service/pago.service';
import { ProductoService, Producto } from '../../Service/producto.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css',
})
export class PagoComponent implements OnInit {
  codigoPostal: string = '';
  mensaje: string = '';
  stripe: Stripe | null = null;
  cardElement: any;
  error: string = '';

  productos: Producto[] = [];
  carrito: Producto[] = [];
  total: number = 0;

  constructor(
    private pagoService: PagoService,
    private productoService: ProductoService
  ) {}

  async ngOnInit() {
    this.stripe = await loadStripe(
      'pk_test_51OqTwwJ5bCJjLaWJRYviZMsKdA0ArSX6TH6NZ8TxaQiWey6TKzJdgXZrKtW9FqDBuLvx8PYVmLMoEdu9iNYEbXuf009soPlNub'
    );

    if (!this.stripe) {
      console.error('Stripe no se pudo inicializar.');
      return;
    }

    const elements = this.stripe.elements();
    this.cardElement = elements.create('card');
    this.cardElement.mount('#card-element');

    this.productoService.obtenerProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  agregarAlCarrito(producto: Producto) {
    this.carrito.push(producto);
    this.total += producto.precio;
  }

  eliminarDelCarrito(index: number) {
    this.total -= this.carrito[index].precio;
    this.carrito.splice(index, 1);
  }
  async realizarPago() {
    if (!this.stripe || !this.cardElement) {
      this.error = 'Stripe no está cargado correctamente.';
      return;
    }

    if (this.carrito.length === 0) {
      this.error = 'El carrito está vacío.';
      return;
    }

    const { token, error } = await this.stripe.createToken(this.cardElement);

    if (error) {
      this.error = error.message ?? 'Error desconocido';
      return;
    }

    const tokenId: string = token?.id ?? '';

    this.pagoService.procesarPago(tokenId, this.total).subscribe(
      () => {
        this.mensaje = 'Pago realizado con éxito';
        this.error = '';
        this.carrito = [];
        this.total = 0;
      },
      (err) => {
        this.error =
          'Error en el pago: ' + (err.error?.message ?? 'Intente nuevamente');
      }
    );
  }
}
