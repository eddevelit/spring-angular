import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {Region} from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: []
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  regiones: Region[];
  private titulo = 'Crear Cliente';
  private errores: string[];

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
      }
    });

    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }
  public create(): void {
    console.log(this.cliente);
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo Cliente', `El cliente ${cliente.nombre} ${cliente.apellido} ha sido creado con éxito`, 'success');
      },
        err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo de error dese el backend: ' + err.status);
        console.error(err.error.errors);
        }
    );
  }

  update(): void {
    console.log(this.cliente);
    this.clienteService.update(this.cliente)
      .subscribe( json => {
          this.router.navigate(['/clientes'])
          swal.fire('Cliente Actualiado', `${json.mensaje}: ${json.cliente.nombre} ${json.cliente.apellido}`, 'success');
        },
        err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
        }
      );
  }

  compararRegion(o1: Region, o2: Region ): boolean {
    return o1 === null || o2 === null || o1 == null || o2 == null ? false : o1.id === o2.id;
  }
}
