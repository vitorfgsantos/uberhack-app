import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { ParkingsService } from './../../services/parkings.service';
import { RoutePage } from './../route/route';

@Component({
  selector: 'page-parkings',
  templateUrl: 'parkings.html'
})
export class ParkingsPage {

  coordinates: any;
  parkings = undefined;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public parkingsService: ParkingsService
  ) {
    this.coordinates = navParams.get('coordinates');
    this.loadParkings();
  }

  loadParkings() {
    this.parkingsService.loadParkings(this.coordinates)
      .subscribe(response => {
        this.parkings = response;
        this.parkings.forEach((parking, parkingIndex) => {
          this.parkings[parkingIndex].map = this.getParkingMap(parking.address);
        });
      });
  }

  getParkingMap(address) {
    const formattedAddress = address.street + ', ' + address.number + ' - ' + address.district + ', ' + address.city + ' - ' + address.state;
    return 'https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=400x150&markers=color:red|' + formattedAddress + '&key=AIzaSyCXvmVx1Px1Gpv8yKWQzW1N3ySfjyoFIEs'
  }

  next(parking) {
    this.navCtrl.push(RoutePage, {
      coordinates: this.coordinates,
      parking: parking
    });
  }

}
