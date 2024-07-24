import { Component } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { newArtista } from 'src/app/common/factories';
import { IArtista } from 'src/app/interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrl: './top-artista.component.scss'
})
export class TopArtistaComponent {
  faPlay = faPlay;

topArtista: IArtista = newArtista();

  constructor(private spotifyService: SpotifyService){}

  ngOnInit(): void {
    this.buscarArtista();
  }

  async buscarArtista() {
    const artistas = await this.spotifyService.buscarTopArtistas(1);
    
    if(!!artistas)
      this.topArtista = artistas.pop();

    console.log(this.topArtista);
  }
 
}

