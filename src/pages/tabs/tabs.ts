import { Component } from '@angular/core';

import { DestinationPage } from '../destination/destination';
import { ParkingsPage } from '../parkings/parkings';
import { RoutePage } from '../route/route';
import { RouteFinishedPage } from '../route-finished/route-finished';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DestinationPage;
  tab2Root = ParkingsPage;
  tab3Root = RoutePage;
  tab4Root = RouteFinishedPage;

  constructor() {

  }
}
