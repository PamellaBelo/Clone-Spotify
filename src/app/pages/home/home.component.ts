import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/common/factories';
import { IMusica } from 'src/app/interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  musicas: IMusica[]= []
  musicaAtual: IMusica = newMusica();
  musicaTocando: any = null;

subs: Subscription[] = [];

  faPlay = faPlay; // icone play
  faPause = faPause;



constructor(
  private spotifyService: SpotifyService, 
  private playerService: PlayerService
){}
  

ngOnInit(): void{
  this.obterMusicas();
  this.obterMusicaAtual();
}

ngOnDestroy(): void {
this.subs.forEach(sub => sub.unsubscribe());
}

 async obterMusicas(){
 this.musicas =  await this.spotifyService.buscarMusicas()
}

obterMusicaAtual(){
 const sub = this.playerService.musicaAtual.subscribe(musica => {
    this.musicaAtual = musica;
  //  console.log('musica atualll:',this.musicaAtual);
  });

  this.subs.push(sub);
}

obterArtistas(musica: IMusica){
return musica.artistas.map(artista => artista.nome).join(',');
}

async executarMusica(musica: IMusica){
 await this.spotifyService.executarMusica(musica.id);
 this.playerService.definirMusicaAtual(musica);
 this.musicaTocando = musica;

 }
//executarMusica(musica: any): void {
 // this.musicaTocando = musica;
 // this.playerService.definirMusicaAtual(musica);
  // Lógica para tocar a música
//}

isTocando(musica: any): boolean {
  return this.musicaTocando === musica;
}

}





