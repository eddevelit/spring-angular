import { Component} from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent{
  constructor() { }
  listaCurso: string[] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];

  habilitar = true;

  setHabilitar(): void{this.habilitar = (this.habilitar == true)? false:true;}
}
