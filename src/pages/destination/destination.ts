import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-destination',
  templateUrl: 'destination.html'
})
export class DestinationPage {

  name: string;

  constructor(public navCtrl: NavController) {

  }

  continue() {
    this.navCtrl.setRoot(DestinationPage)
  }

  buscarLocal() {
    
  }

}
