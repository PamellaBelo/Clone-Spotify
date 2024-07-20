import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-botao-menu',
  templateUrl: './botao-menu.component.html',
  styleUrls: ['./botao-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BotaoMenuComponent {


 @Input() 
descricao = '';

@Input() 
icon: string;

@Input() 
selecionado = false;

@Output()
click = new EventEmitter<void>();

  constructor(){}

  onClick(){
    this.click.emit();
  }

}
