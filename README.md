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
* Route guards (CanActivate) to ensure page is displayed with permission
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

(copy these values into their respective properties in auth.service.ts and api.js.)

> Note: redirect_uri should correspond to how you build and run the spotify app.

### Build with Angular CLI, Run with Express

The Spotify app uses Express as a way to allow Cross-Origin requests.

With a redirect URI of 'http://localhost:4200', simply run these commands after cloning the repository:

(before building, copy the spotify id and secret into the auth service and api.js)

```
> npm install
> ng build --watch  
> node server
```

If redirect URI includes a base href, for example 'http://localhost:8080/spotify', use the base href option.
```
> ng build -bh /spotify --watch