import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {PlaylistService} from "./playlist.service";

/**
 * Not currently used as there seems to be a problem with the Resolve continuing to page
 * when chaining Observations.
 */
@Injectable()
export class PlaylistComponentResolve implements Resolve<any> {

    constructor(private playlistService: PlaylistService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        let id = route.params['id'];
        let ownerId = route.params['ownerId'];
        return this.playlistService.playlistFromId(ownerId, id).mergeMap(res => res);
    }
}