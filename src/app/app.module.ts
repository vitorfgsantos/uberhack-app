import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MyApp } from './app.component';

import { DestinationPage } from '../pages/destination/destination';
import { ParkingsPage } from '../pages/parkings/parkings';
import { RoutePage } from '../pages/route/route';
import { RouteFinishedPage } from '../pages/route-finished/route-finished';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ModalsService } from '../services/modals.service';
import { ParkingsService } from '../services/parkings.service';
import { HeatAreasService } from './../services/heatareas.service';

import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';


@NgModule({
  declarations: [
    MyApp,
    DestinationPage,
    ParkingsPage,
    RoutePage,
    RouteFinishedPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DestinationPage,
    ParkingsPage,
    RoutePage,
    RouteFinishedPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ModalsService,
    ParkingsService,
    HeatAreasService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    LaunchNavigator
  ]
})
export class AppModule {}
