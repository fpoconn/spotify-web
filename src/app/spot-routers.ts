@Injectable()
import {provideRoutes, Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {SearchResultsComponent} from './search-results.component';
import {ArtistComponent} from './artists/artist.component';
import {RelatedTracksComponent} from './artists/related-tracks.component';
import {RelatedAlbumsComponent} from './artists/related-albums.component';
import {RelatedArtistsComponent} from './artists/related-artists.component';
import {ArtistComponentResolve} from "./services/artist-component-resolve.service";
import {AlbumComponentResolve} from "./services/album-component-resolve.service";
import {AlbumComponent} from "./albums/album.component";
import {AuthGuard} from './services/auth.guard';
import {HomeBrowseComponent} from "./home-browse.component";
import {LoginComponent} from "./login.component";
import {HomeMyMusicComponent} from "./home-mymusic.component";
import {SavedTracksComponent} from "./mymusic/saved-tracks.component";
import {SavedAlbumsComponent} from "./mymusic/saved-albums.component";
import {FollowedArtistsComponent} from "./mymusic/followed-artists.component";
import {MyPlaylistsComponent} from "./mymusic/my-playlists.component";
import {PlaylistComponent} from "./playlists/playlist.component";
import {PlaylistComponentResolve} from "./services/playlist-component-resolve.service";
import {PlaylistBuilderComponent} from "./playlists/playlist-builder.component";
import {BuilderSearchTracks} from "./builder/builder-search-tracks.component";
import {BuilderSearchPlaylists} from "./builder/builder-search-playlists.component";
import {BuilderRecommendations} from "./builder/builder-recommendations.component";

const spotRouters: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard], 
        children: [
            { path: 'searchResults/:str', component: SearchResultsComponent},
            { path: 'playlistBuilder', component: PlaylistBuilderComponent,
                children: [
                    {path: '', redirectTo: 'builderTracks', pathMatch: 'full'},
                    {path: 'builderTracks', component: BuilderSearchTracks},
                    {path: 'builderPlaylists', component: BuilderSearchPlaylists},
                    {path: 'builderRecommendations', component: BuilderRecommendations}
                ]
            },
            { path: 'artist/:id', component: ArtistComponent,
                children: [
                    {path: '', redirectTo: 'tracks', pathMatch: 'full'},
                    {path: 'tracks', component: RelatedTracksComponent},
                    {path: 'albums', component: RelatedAlbumsComponent},
                    {path: 'relatedArtists', component: RelatedArtistsComponent}
                ]
            },
            {
                path: 'album/:id', component: AlbumComponent
            },
            { path: 'playlist/:ownerId/:id', component: PlaylistComponent
                
            },
            { path: 'homeMyMusic', component: HomeMyMusicComponent,
                children: [
                    {path: '', redirectTo: 'myPlaylists', pathMatch: 'full'},
                    {path: 'savedTracks', component: SavedTracksComponent},
                    {path: 'savedAlbums', component: SavedAlbumsComponent},
                    {path: 'followedArtists', component: FollowedArtistsComponent},
                    {path: 'myPlaylists', component: MyPlaylistsComponent}
                ]
            },
            { path: 'homeBrowse', component: HomeBrowseComponent},
            { path: '', redirectTo: 'homeMyMusic', pathMatch: 'full'}
        ] 
    },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'}

];

export const spotRouterProviders = [
    provideRoutes(spotRouters)
];

export const routing = RouterModule.forRoot(spotRouters);
