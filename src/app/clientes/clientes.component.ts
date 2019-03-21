import { Component, OnInit } from '@angular/core';
import { Cliente} from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  constructor() { }
  clientes: Cliente[] = [
    {id: 1, nombre: 'Edu', apellido: 'Awesome', email: 'edd.develit@gmail.com', createAt: '2019-03-21'},
    {id: 2, nombre: 'Eddo', apellido: 'Lagunas', email: 'edd.deve@gmail.com', createAt: '2019-03-10'},
    {id: 3, nombre: 'Jorge', apellido: 'Ocampo', email: 'jorge.develit@gmail.com', createAt: '2019-08-11'},
    {id: 4, nombre: 'George', apellido: 'Waters', email: 'george.develit@gmail.com', createAt: '2019-06-08'},
    {id: 5, nombre: 'Lalo', apellido: 'Lennon', email: 'lalo.landa@gmail.com', createAt: '2019-04-15'}
  ];

  ngOnInit() {
  }

}
