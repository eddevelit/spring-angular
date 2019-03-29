import { Component, OnInit } from '@angular/core';
import { Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import Swal from 'sweetalert2';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  constructor(private clienteService: ClienteService ) { }

  ngOnInit() {
    this.clienteService.getclientes().pipe(
      tap(clientes => {
        this.clientes = clientes;
        console.log('ClientesComponent: tap 3');
        clientes.forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    ).subscribe(
    );
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-light',
        cancelButton: 'btn btn-light'
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `Se eliminará el cliente ${cliente.nombre} ${cliente.apellido}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Borrar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `Cliente ${cliente.nombre} ${cliente.apellido} eliminado con éxito`,
              'success'
            );
          }
        );
      }
    });
  }

}
