import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ArtistService } from './artist.service';

@Injectable()
export class ArtistComponentResolve implements Resolve<any> {

    constructor(private artistService: ArtistService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

        let id = route.params['id'];
        return this.artistService.artistFromId(id);
        
    }
}