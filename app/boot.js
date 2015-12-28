import {enableProdMode} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {HTTP_PROVIDERS} from 'angular2/http';
import 'reflect-metadata';
import 'zone.js';

bootstrap(AppComponent, [HTTP_PROVIDERS]);

