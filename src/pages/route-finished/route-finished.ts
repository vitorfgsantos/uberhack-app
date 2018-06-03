import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
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
    public modalsService: ModalsService,
    public toastCtrl: ToastController,
    public navParams: NavParams,
  ) {
    let destinationCoordinates = navParams.get('coordinates');
    let originCoordinates = navParams.get('originCoordinates');

    this.coordinates = {
      origin: originCoordinates.lat + ', ' + originCoordinates.lng,
      destination: destinationCoordinates.lat + ', ' + destinationCoordinates.lng
    };

    this.loadMapsModals();
    this.loadUberModals();
    this.releasePaymentToastr();
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

  releasePaymentToastr() {
    const toast = this.toastCtrl.create({
      message: 'O pagamento no valor de R$ 8,00 foi efetuado no seu cartão de crédito.',
      duration: 6000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }

  loadUberModals() {
    this.modalsService.loadUberModals(this.coordinates)
      .subscribe(response => {
        this.uberRouters = response;
        console.log(this.uberRouters)
      });
  }

}
