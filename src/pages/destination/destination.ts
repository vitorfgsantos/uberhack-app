import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { ParkingsPage } from './../parkings/parkings';

declare var google;

@Component({
  selector: 'page-destination',
  templateUrl: 'destination.html'
})
export class DestinationPage {

  map: any;
  coordinates: any;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation) { }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        const mapOptions = {
          zoom: 18,
          center: position
        }
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        const marker = new google.maps.Marker({
          position: position,
          map: this.map
        });

        this.coordinates = {
          lat: position.lat(),
          lng: position.lng()
        }
      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }

  continue() {
    this.navCtrl.push(ParkingsPage, {
      coordinates: this.coordinates
    });
  }

}
