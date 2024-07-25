import { inject } from "@angular/core";
import { CanActivateFn, Route, Router, UrlSegment } from "@angular/router";
import { SpotifyService } from "../services/spotify.service";


export const canMatch: CanActivateFn = (route, state) => {

    const router = inject(Router);
    const spotifyService = inject(SpotifyService);

    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');

    
    if (!!token && !!usuario){
        spotifyService.usuario = JSON.parse(usuario);
        return true;
    }
        

    else {
        localStorage.clear();
        router.navigate(['/login'])
        return false;
    }


    
}