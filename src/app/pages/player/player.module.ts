import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayerComponent } from './player.component';
import { PlayerRotas } from './player.routes';
import { PainelEsquerdoComponent } from 'src/app/components/painel-esquerdo/painel-esquerdo.component';
import { BotaoMenuComponent } from 'src/app/components/botao-menu/botao-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from '../home/home.component';
import { RodapeUsuarioComponent } from 'src/app/components/rodape-usuario/rodape-usuario.component';
import { TopArtistaComponent } from 'src/app/components/top-artista/top-artista.component';
import { PainelDireitoComponent } from 'src/app/components/painel-direito/painel-direito.component';
import { BuscasRecentesComponent } from 'src/app/components/buscas-recentes/buscas-recentes.component';
import { FormsModule } from '@angular/forms';
import { TopArtistasComponent } from 'src/app/components/top-artistas/top-artistas.component';
import { ArtistaItemImagemComponent } from 'src/app/components/artista-item-imagem/artista-item-imagem.component';
import { PlayerCardComponent } from 'src/app/components/player-card/player-card.component';
import { ListaMusicaComponent } from '../lista-musica/lista-musica.component';
import { BannerComponent } from 'src/app/components/banner/banner.component';

@NgModule({
  declarations: [//componentes
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    HomeComponent,
    RodapeUsuarioComponent,
    TopArtistaComponent,
    PainelDireitoComponent,
    BuscasRecentesComponent,
    TopArtistasComponent,
    ArtistaItemImagemComponent,
    PlayerCardComponent,

    ListaMusicaComponent,
    BannerComponent
    
    
  ],
  imports: [//modulos
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(PlayerRotas),
    FormsModule
  ]
})
export class PlayerModule { 
  constructor() {
    library.add(fas);
  }

}
