import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: []
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo = 'Crear Cliente';

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }
  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activateRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
      }
    });
  }

  public create(): void {
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo Cliente', `Cliente ${cliente.nombre} ${cliente.apellido} creado con exito`, 'success');
      }
    );
  }

  update(): void{
    this.clienteService.update(this.cliente)
      .subscribe( cliente =>{
        this.router.navigate(['/clientes'])
        swal.fire('Cliente Actualiado', `Cliente ${cliente.nombre} actualizado con exito`, 'success');
      })
  }
}
