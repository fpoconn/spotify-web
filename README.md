# SpotifyWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.31.

## Spotify API

Playing around with spotify developer API.  API features used include:

* login to spotify using Oath 2
* search artists, playlists, albums
* display user playlists, followed artists, saved albums
* custom playlist builder to search tracks, then add / remove tracks from user playlists
* show recommended playlists and new albums based on user history

## Angular 2

Uses Angular 2 (2.4.0) framework.  Features include:

* angular services
* angular with Oath2
* Route resolves (Resolve) to ensure data has loaded before page is displayed
* Route guards (CanActivate) to ensure page is not displayed without permission
* custom Pipes
* http get and post

## Build and run

Prerequisites:

* npm
* angular CLI
* spotify account

After cloning the git repository into a project directory, run 'npm install' to install required packages listed in package.json.

Login to the [Spotify Developer site](https://developer.spotify.com) to create an Application.  This will supply the properties 
needed for the spotify app:

* client_id
* client_secret
* redirect_uri

(copy these values into their respective properties in auth.service.ts.  hackish, i know.)

> Note: redirect_uri should correspond to how you build and run the spotify app.

### Build with Angular CLI, Run with lite-server

The Spotify app has the lite-server port configured to 8080 but this can be changed in bs-config.json. 

With a redirect URI of 'http://localhost:8080', you can simply run these 2 commands:

```
> ng build --watch  
> cd dist
> lite-server 
```

If redirect URI has a base href, for example 'http://localhost:8080/spotify', use the base href option.
```
> ng build -bh /spotify --watch
```

### Serve with Angular CLI

Alternatively, you can have angular CLI build (in memory) and server the app.

Assuming a redirect URI of 'http://localhost:4200',  simply run:
```
> ng serve 
```