import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment.prod';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/IUsuario';
import { SpotifyArtistaParaArtista, SpotifyPlaylistParaPlaylist, SpotifyTrackParaMusica, SpotifyUserParaUsuario } from '../common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtista } from '../interfaces/IArtista';
import { IMusica } from '../interfaces/IMusica';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  getPlaylists() {
    throw new Error('Method not implemented.');
  }

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }



  async inicializarServico() {
    if (!!this.usuario)
      return true;

    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      this.definirAccessToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;
    } catch (ex) {
      return false;
    }
  }

  obterUsuario(): IUsuario {
    let userLocal = localStorage.getItem('usuario');
    if (!userLocal) {
      console.log('usuario nao encontrado');
      const spotifyUser = this.obterSpotifyUsuario();
      console.log(spotifyUser);
    }else{
      console.log('A variável userLocal tem um valor:', userLocal);
    }

    this.usuario = JSON.parse(userLocal);

    return this.usuario;
  }
   async obterSpotifyUsuario() {
    const userInfo = await this.spotifyApi.getMe();
    let user = SpotifyUserParaUsuario(userInfo);
    localStorage.setItem('usuario', JSON.stringify(user));

    this.usuario = user;

    return user;}

  obterUrllogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback() {
    if (!window.location.hash)
      return '';


    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1]
  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);

    localStorage.setItem('token', token);
    this.obterSpotifyUsuario();

  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const idUser = this.obterUsuario().id.toString();

    const playlist = await this.spotifyApi.getUserPlaylists(idUser, { offset, limit });
    return playlist.items.map(SpotifyPlaylistParaPlaylist);
  }

  async buscarTopArtistas(limit = 10): Promise<IArtista[]> {
    const artistas = await this.spotifyApi.getMyTopArtists({ limit });
    console.log(artistas)
    return artistas?.items?.map(SpotifyArtistaParaArtista)
  }

async buscarMusicas(offset = 0, limit= 50): Promise<IMusica[]> {
  const musicas = await this.spotifyApi.getMySavedTracks({offset, limit});
  //console.log(musicas.items.map(x => x.track));
return musicas.items.map( x=> SpotifyTrackParaMusica(x.track));
}

async executarMusica(musicaId: string){
await this.spotifyApi.queue(musicaId);
await this.spotifyApi.skipToNext();
  this.spotifyApi.search
}

async obterMusicaAtual(): Promise<IMusica>{
  const musicaSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
  return SpotifyTrackParaMusica(musicaSpotify.item);
}

async voltarMusica(){
  this.spotifyApi.skipToPrevious();
}
async proximaMusica(){
  await this.spotifyApi.skipToNext();
}

// async alternarPlayPause(){
//   this.spotifyApi.play();
//   this.spotifyApi.pause();
// }

async playMusica(){
  await this.spotifyApi.play();
}
async pauseMusica(){
  await this.spotifyApi.pause();
}


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
