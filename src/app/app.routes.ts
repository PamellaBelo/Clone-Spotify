import { Routes } from "@angular/router";
import { canMatch } from "./guards/autenticado.guard";

export const AppRotas: Routes = [
    {
        path: '',
        redirectTo: 'player',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module')
            .then(c => c.LoginModule)
    },
    {
        path: 'player',
        loadChildren: () => import('./pages/player/player.module')
            .then(c => c.PlayerModule),
        canActivate: [canMatch]
    }
]