import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from  '@angular/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent}  from './app.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from "./home.component";
import {SearchComponent} from './search.component';
import {ArtistComponent} from "./artists/artist.component";
import {spotRouterProviders, routing} from './spot-routers';
import {RelatedAlbumsComponent} from "./artists/related-albums.component";
import {RelatedTracksComponent} from "./artists/related-tracks.component";
import {RelatedArtistsComponent} from "./artists/related-artists.component";
import {SearchResultsComponent} from "./search-results.component";
import {ArtistComponentResolve} from "./services/artist-component-resolve.service";
import {ArtistService} from "./services/artist.service";
import {ArtistTileComponent} from "./artists/artist-tile.component";
import {ArtistProfileComponent} from "./artists/artist-profile.component"
import {PlaylistListComponent} from "./playlists/playlist-list.compoenent";
import {PlaylistTileComponent} from "./playlists/playlists-tile.component";
import {PlaylistBannerComponent} from "./playlists/playlist-banner.component";
import {AlbumComponentResolve} from "./services/album-component-resolve.service";
import {AlbumService} from "./services/album.service";
import {AlbumComponent} from "./albums/album.component";
import {AlbumListComponent} from "./albums/albums-list.component";
import {AlbumTileComponent} from "./albums/album-tile.component";
import {ArtistListComponent} from "./artists/artist-list.component";
import {LoginComponent} from "./login.component";
import {HomeBrowseComponent} from "./home-browse.component";
import {AuthGuard} from "./services/auth.guard";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {DragDirective} from "./tools/drag-directive";
import {DropDirective} from "./tools/drop-directive";
import {HomeMyMusicComponent} from "./home-mymusic.component";
import {MyPlaylistsComponent} from "./mymusic/my-playlists.component";
import {FollowedArtistsComponent} from "./mymusic/followed-artists.component";
import {SavedAlbumsComponent} from "./mymusic/saved-albums.component";
import {SavedTracksComponent} from "./mymusic/saved-tracks.component";
import {MyTopItems} from "./mymusic/my-topitems.component";
import {BrowseService} from "./services/browse.service";
import {CategoryListComponent} from "./playlists/categories-list.component";
import {PlaylistComponentResolve} from "./services/playlist-component-resolve.service";
import {PlaylistService} from "./services/playlist.service";
import {PlaylistComponent} from "./playlists/playlist.component";
import {PlaylistBuilderComponent} from "./playlists/playlist-builder.component";
import {BuilderSearchTracks} from "./builder/builder-search-tracks.component";
import {BuilderSearchPlaylists} from "./builder/builder-search-playlists.component";
import {BuilderRecommendations} from "./builder/builder-recommendations.component";
import {TrackInfo} from "./builder/track-info.component";
import {SearchService} from "./services/search.service";
import {NavbarComponent} from "./navbar.component";
import {CategoryTileComponent} from "./playlists/category-tile.component";
import {FormatGenres, SanitizeTrackUrl} from "./pipes";

@NgModule({
    imports: [ BrowserModule, 
        FormsModule, 
        RouterModule,
        HttpModule,
        ReactiveFormsModule, 
        routing ]
    ,
    declarations: [
        ArtistProfileComponent,
        FormatGenres,
        SanitizeTrackUrl,
        NavbarComponent,
        SearchComponent,
        AppComponent,
        HomeComponent,
        ArtistComponent,
        AlbumComponent,
        AlbumTileComponent,
        PlaylistComponent,
        PlaylistTileComponent,
        LoginComponent,
        HomeBrowseComponent,
        HomeMyMusicComponent,
        MyPlaylistsComponent,
        CategoryListComponent,
        CategoryTileComponent,
        FollowedArtistsComponent,
        PlaylistBuilderComponent,
        BuilderSearchTracks,
        BuilderSearchPlaylists,
        BuilderRecommendations,
        TrackInfo,
        SavedAlbumsComponent,
        SavedTracksComponent,
        MyTopItems,
        RelatedAlbumsComponent,
        RelatedTracksComponent,
        RelatedArtistsComponent,
        SearchResultsComponent,
        ArtistTileComponent, 
        AlbumListComponent,
        PlaylistListComponent,
        PlaylistBannerComponent,
        DragDirective,
        DropDirective,
        ArtistListComponent
        
    ],
    providers: [
        spotRouterProviders, 
        ArtistService, 
        AlbumService,
        AuthGuard,
        AuthService,
        UserService,
        BrowseService,
        PlaylistService,
        SearchService,
        ArtistComponentResolve, 
        AlbumComponentResolve, 
        PlaylistComponentResolve,
        HttpModule],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }