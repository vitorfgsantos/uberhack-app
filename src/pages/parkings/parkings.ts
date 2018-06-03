import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ParkingsService } from './../../services/parkings.service';
import { LaunchNavigatorOptions, LaunchNavigator } from '@ionic-native/launch-navigator';
import { RouteFinishedPage } from '../route-finished/route-finished';

@Component({
  selector: 'page-parkings',
  templateUrl: 'parkings.html'
})
export class ParkingsPage {

  coordinates: any;
  originCoordinates: any
  parkings = undefined;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public parkingsService: ParkingsService,
    public alertCtrl: AlertController,
    public launchNavigator: LaunchNavigator
  ) {
    this.coordinates = navParams.get('coordinates');
    this.originCoordinates = navParams.get('originCoordinates');
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

  showPopup(parking) {
    const confirm = this.alertCtrl.create({
      title: 'Boa escolha! ;)',
      message: 'Vamos iniciar sua rota e você será redirecionado para o seu app de navegação.',
      buttons: [{
        text: 'Cancelar',
      }, {
        text: 'Ok, vamos lá!',
        handler: () => {
          let options: LaunchNavigatorOptions = {
            start: parking.address.street + ', ' + parking.address.number + ' - ' + parking.address.district + ', ' + parking.address.city + ' - ' + parking.address.state,
          };

          this.launchNavigator.navigate(parking.address.street + ', ' + parking.address.number + ' - ' + parking.address.district + ', ' + parking.address.city + ' - ' + parking.address.state, options)
            .then(success => {
            }, error => {
            });

          setTimeout(() => {
            this.navCtrl.push(RouteFinishedPage, {
              coordinates: this.coordinates,
              originCoordinates: this.originCoordinates,
              parking: parking
            });
          }, 1000)
        }
      }]
    });
    confirm.present();
  }

}
