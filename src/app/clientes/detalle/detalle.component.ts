import {Component, Input, OnInit} from '@angular/core';
import {Cliente} from '../cliente';
import {ClienteService} from '../cliente.service';
import {ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

 @Input() cliente: Cliente;
titulo = 'Detalle del cliente';
private fotoSeleccionada: File;
progreso = 0;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);

    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire('Error seleccionar imagen: ', 'El archivo debe ser de tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {

    if (!this.fotoSeleccionada){
      swal.fire('Error:', 'Debe subir una foto', 'error' );
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            const response: any = event.body;
            this.cliente = response.cliente as Cliente;
            swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
          }
        });
    }
  }

}
