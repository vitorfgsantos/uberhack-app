import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalsService } from '../../services/modals.service';

@Component({
  selector: 'page-route-finished',
  templateUrl: 'route-finished.html'
})
export class RouteFinishedPage {

  mapsRouters = {
    walking: undefined,
    bicycling: undefined,
    transit: undefined
  };
  uberRouters = undefined;
  coordinates = undefined;

  constructor(
    public navCtrl: NavController,
    public modalsService: ModalsService
  ) {
    this.coordinates = {
      origin: '-23.507172, -46.645806',
      destination: '-23.513232, -46.670955'
    };

    this.loadMapsModals();
    this.loadUberModals();
  }

  loadMapsModals() {
    this.loadMapsRoutersByModal('walking', this.coordinates);
    this.loadMapsRoutersByModal('bicycling', this.coordinates);
    this.loadMapsRoutersByModal('transit', this.coordinates);
  }

  loadMapsRoutersByModal(modalMode, params) {
    this.modalsService.loadMapsModals(modalMode, params)
      .subscribe(response => {
        this.mapsRouters[modalMode] = response;
        console.log(this.mapsRouters)
      });
  }

  loadUberModals() {
    this.modalsService.loadUberModals(this.coordinates)
      .subscribe(response => {
        this.uberRouters = response;
        console.log(this.uberRouters)
      });
  }

}
