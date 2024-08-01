import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-banner',

  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

@Input()
ImagemUrl = '';

@Input()
Text = '';


}
