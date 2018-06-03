import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HeatAreasService } from './../../services/heatareas.service';

import { ParkingsPage } from './../parkings/parkings';

declare var google;

@Component({
  selector: 'page-destination',
  templateUrl: 'destination.html'
})
export class DestinationPage {

  map: any;
  coordinates: any;

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  startPosition: any;
  originPosition: string;
  destinationPosition: string;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public modalCtrl: ModalController,
    public heatAreasService: HeatAreasService
  ) { }

  ionViewDidLoad() {
    this.loadUserPosition();
  }

  initHeatMap(mapOptions) {
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

        // setTimeout(() => {
        //   console.log('AQEE')

        //   this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        //   this.directionsDisplay.setMap(this.map);

        //   const marker = new google.maps.Marker({
        //     // position: this.startPosition,
        //     map: this.map,
        //   });

        //     const request = {
        //       // Pode ser uma coordenada (LatLng), uma string ou um lugar
        //       origin: '-23.542308, -46.632372',
        //       destination: '-23.542351, -46.651552',
        //       travelMode: 'DRIVING'
        //     };
        //     this.traceRoute(this.directionsService, this.directionsDisplay, request);
        // }, 2000);

      });
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }

  loadUserPosition() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        const mapOptions = {
          zoom: 18,
          center: position,
          // disableDefaultUI: true
        }
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        const marker = new google.maps.Marker({
          position: position,
          map: this.map
        });

        this.coordinates = {
          lat: position.lat(),
          lng: position.lng()
        };

        this.initHeatMap(mapOptions);
      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }

  continue() {
    this.navCtrl.push(ParkingsPage, {
      coordinates: this.coordinates
    });
  }

  openAddressModal() {
    // const modal = this.modalCtrl.create(ModalPage);
    // modal.present();
  }

}
