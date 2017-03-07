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

Run 'npm install' to install required packages listed in package.json.

Login to the [Spotify Developer site](https://developer.spotify.com) and create an Application.  This will supply the properties 
needed for the spotify app:

* client id
* client secret
* redirect URL

(for now, copy these values into their respective properties in auth.service.ts.  hackish, i know.)

Run 'ng build -bh /spotify --watch'
(defaults to dev, sets basehref, watches for changes)

The build will output to the 'dist' directory, by default.  From here, run 'lite-server'