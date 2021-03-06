import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from "./auth.service";
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class SearchService {

    constructor(private _http: HttpClient, private _authService: AuthService) {}

    search(searchStr, type, limit) {

        let localLimit = limit ? limit : 30;
        let localType = type ? type : 'artist,track,album,playlist';

        if(searchStr) {
            return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
                 this._http.get('https://api.spotify.com/v1/search?type=' + localType + '&q=' + searchStr.trim().replace(' ', '+') + '&limit=' + localLimit, 
                    {headers: headers})
                        .pipe(map(res => res))));
        }
    }

    searchRecommendations(searchModel){
     

        let searchURL = "https://api.spotify.com/v1/recommendations";
        let hasParams = false;

        if(searchModel.seedTrack && searchModel.seedArtist){
            searchURL = searchURL.concat('?seed_tracks=' + searchModel.seedTrack + '&seed_artists=' + searchModel.seedArtist);
            hasParams = true;
        }

        if(searchModel.includeAcousticness){
            let acousticness = (searchModel.acousticness / 100).toString();
            searchURL = hasParams ? searchURL.concat('&target_acousticness=' + acousticness) : searchURL.concat('?target_acousticness=' + acousticness);
            hasParams = true;
        }
        if(searchModel.includeCheerfulness){
            let cheerfulness = (searchModel.cheerfulness / 100).toString();
            searchURL = hasParams ? searchURL.concat('&target_valence=' + cheerfulness) : searchURL.concat('?target_valence=' + cheerfulness);
            hasParams = true;
        }
        if(searchModel.includeDanceability){
            let danceability = (searchModel.danceability / 100).toString();
            searchURL = hasParams ? searchURL.concat('&target_danceability=' + danceability) : searchURL.concat('?target_danceability=' + danceability);
            hasParams = true;
        }
        if(searchModel.includeLiveness){
            let liveness = (searchModel.liveness / 100).toString();
            searchURL = hasParams ? searchURL.concat('&target_liveness=' + liveness) : searchURL.concat('?target_liveness=' + liveness);
            hasParams = true;
        }

        if(hasParams) {
            
            return this._authService.getEndPointHeaders().pipe(mergeMap( (headers: HttpHeaders) =>
                    this._http.get(searchURL,{headers: headers})
                .pipe(map(res => res))));
        }
        
    }

}