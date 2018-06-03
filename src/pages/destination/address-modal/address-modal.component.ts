import { Component } from '@angular/core';
import { NavParams, ViewController, NavController } from 'ionic-angular';
import { ParkingsPage } from '../../parkings/parkings';

@Component({
  templateUrl: 'address-modal.component.html'
})
export class AddressModalPage {

  searchQuery: string = '';
  items: any[];

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.initializeItems();
  }

  initializeItems() {
    this.items = [
      { name: 'Mercado Municipal de São Paulo', coordinates: [-23.542465, -46.629892] },
      { name: 'Banespa - Edifício Altino Arantes' },
      { name: 'MASP - Museu de Arte Moderna de São Paulo' },
      { name: 'Allianz Parque' }
    ];
  }

  dismiss(address) {
    this.viewCtrl.dismiss(address);
  }

  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  goToParkings(address) {
    this.dismiss(address);
  }
}
