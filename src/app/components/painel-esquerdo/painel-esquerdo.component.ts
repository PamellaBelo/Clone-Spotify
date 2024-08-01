import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit{
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
  irParaPlaylist(playlistId: string){
    this.menuSelecionado = playlistId;
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`)
  }
}



