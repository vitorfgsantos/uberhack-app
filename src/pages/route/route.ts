import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-route',
  templateUrl: 'route.html'
})
export class RoutePage {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: any;
  startPosition: any;
  originPosition: string;
  destinationPosition: string;

  parking: any;
  coordinates: any;

  constructor(public navParams: NavParams) {
    this.coordinates = navParams.get('coordinates');
    this.parking = navParams.get('parking');

    this.initializeMap();
  }

  initializeMap() {
    this.startPosition = new google.maps.LatLng(this.coordinates.lat, this.coordinates.lng);
    const mapOptions = {
      zoom: 18,
      center: this.startPosition,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.directionsDisplay.setMap(this.map);
    debugger
    const marker = new google.maps.Marker({
      position: this.startPosition,
      map: this.map,
    });


    // this.calculateRoute();
  }

  calculateRoute() {
    const request = {
      // origin: String(this.coordinates.lat) + ', ' + this.coordinates.lng,
      origin: 'Av. Paulista, 1374 - Bela Vista, São Paulo - SP, 01310-100',
      destination: this.parking.address.street + ', ' + this.parking.address.number + ' - ' + this.parking.address.district + ', ' + this.parking.address.city + ' - ' + this.parking.address.state,
      travelMode: 'DRIVING'
    };
    this.traceRoute(this.directionsService, this.directionsDisplay, request);
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }
}
