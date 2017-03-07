import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AlbumService} from "./album.service";

@Injectable()
export class AlbumComponentResolve implements Resolve<any> {

    constructor(private albumService: AlbumService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {

        let id = route.params['id'];
        return this.albumService.albumFromId(id);

    }
}