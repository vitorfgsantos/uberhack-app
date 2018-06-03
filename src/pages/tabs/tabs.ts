import { Component } from '@angular/core';

import { DestinationPage } from '../destination/destination';
import { ParkingsPage } from '../parkings/parkings';
import { RoutePage } from '../route/route';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DestinationPage;
  tab2Root = ParkingsPage;
  tab3Root = RoutePage;

  constructor() {

  }
}
