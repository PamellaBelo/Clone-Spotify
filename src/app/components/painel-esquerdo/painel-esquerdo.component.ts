import { Component } from '@angular/core';
import { faG, faGuitar, faHome, faMusic, faSearch, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from '../../interfaces/IPlaylist';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent  {


  menuSelecionado = 'Home';
  playlists: IPlaylist[] = [];

  // Icones
  faHome = faHome;
  faSearch = faSearch;
  faGuitar = faGuitar;
  faMusic = faMusic;

  constructor(private spotifyService: SpotifyService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarPlaylist();
  }

  botaoClick(evento: string) {
    this.menuSelecionado = evento;
    this.router.navigateByUrl('player/home');
  }

  async buscarPlaylist() {
    
    this.playlists = await this.spotifyService.buscarPlaylistUsuario();
  }
}