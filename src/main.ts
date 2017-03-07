import {spotRouterProviders} from './app/spot-routers';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import {enableProdMode} from '@angular/core';

import {AppModule} from './app/app.module';
import {AuthService} from "./app/services/auth.service";


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, [spotRouterProviders, AuthService]);