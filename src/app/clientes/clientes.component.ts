import { Component, OnInit } from '@angular/core';
import { Cliente} from './cliente';
import { CLIENTES} from './clientes.json';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  constructor() { }
  clientes: Cliente[] = [];

  ngOnInit() {
    this.clientes = CLIENTES;
  }

}
