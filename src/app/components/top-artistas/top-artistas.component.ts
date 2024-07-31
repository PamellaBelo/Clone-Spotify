import { Component } from '@angular/core';
import { IArtista } from 'src/app/interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artistas',
  
  templateUrl: './top-artistas.component.html',
  styleUrl: './top-artistas.component.scss'
})
export class TopArtistasComponent {

artistas: IArtista[]= [];


constructor(private spotifyService: SpotifyService){

}

ngOnInit():void{
  this.buscarTopArtistas();
}

async buscarTopArtistas(){
this.artistas = await this.spotifyService.buscarTopArtistas(5);
console.log(this.artistas);
}
}
