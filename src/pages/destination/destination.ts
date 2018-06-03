import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HeatAreasService } from './../../services/heatareas.service';

import { ParkingsPage } from './../parkings/parkings';
import { AddressModalPage } from './address-modal/address-modal.component';

declare var google;

@Component({
  selector: 'page-destination',
  templateUrl: 'destination.html'
})
export class DestinationPage {

  map: any;
  coordinates: any;
  originCoordinates: any;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public modalCtrl: ModalController,
    public heatAreasService: HeatAreasService,
    public toastCtrl: ToastController
  ) { }

  ionViewDidLoad() {
    this.loadUserPosition();
  }

  loadUserPosition() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        this.originCoordinates = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        };
        this.initMap(position);
      })
      .catch((error) => {
        const position = new google.maps.LatLng(-23.508647, -46.651857);
        this.originCoordinates = {
          lat: -23.508647,
          lng: -46.651857
        };
        this.initMap(position);
      });
  }

  initMap(position) {
    this.coordinates = {
      lat: position.lat(),
      lng: position.lng()
    };

    const mapOptions = {
      zoom: 14,
      center: position
    }
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    new google.maps.Marker({
      position: position,
      map: this.map
    });

    setTimeout(() => {
      const toast = this.toastCtrl.create({
        message: 'Seja bem-vindo! Você está no ponto indicado no mapa.',
        duration: 3000,
        position: 'bottom',
      });
      toast.present();
    }, 500);

    setTimeout(() => {
      this.initHeatMap(mapOptions);
    }, 5000);
  }

  initHeatMap(mapOptions) {
    const toast = this.toastCtrl.create({
      message: 'Dê um zoom-out para ver o mapa de calor que já mapeamos. Se desejar, inicie uma viagem ao clicar em Escolher destino',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();

    this.heatAreasService.loadHeatAreas()
      .subscribe(response => {
        let map, heatmap;
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        heatmap = new google.maps.visualization.HeatmapLayer({
          data: response.map(area => new google.maps.LatLng(area[0], area[1])),
          map: map
        });
        heatmap.set('radius', 60);
        heatmap.set('gradient', [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]);
      });
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }


  openAddressModal() {
    const modal = this.modalCtrl.create(AddressModalPage);
    modal.onDidDismiss(data => {
      if (data) {

        const toast = this.toastCtrl.create({
          message: 'Aqui está o local que você escolheu: ' + data.name,
          duration: 3000,
          position: 'bottom',
        });
        toast.present();

        const position = new google.maps.LatLng(data.coordinates[0], data.coordinates[1]);
        const mapOptions = {
          zoom: 14,
          center: position
        }
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        new google.maps.Marker({
          position: position,
          map: this.map
        });

        this.coordinates = {
          lat: position.lat(),
          lng: position.lng()
        };

        setTimeout(() => {
          this.continue();
        }, 3000)

      }
    });
    modal.present();
  }

  continue() {
    this.navCtrl.push(ParkingsPage, {
      coordinates: this.coordinates,
      originCoordinates: this.originCoordinates
    });
  }

}
