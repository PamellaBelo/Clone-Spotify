import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrls: ['./rodape-usuario.component.scss']
})
export class RodapeUsuarioComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  
  usuario: IUsuario = null;

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.spotifyService.obterSpotifyUsuario()
    this.usuario = this.spotifyService.usuario;
  }

  logout() {
    this.spotifyService.logout();
    console.log('Logout realizado');

  }
}