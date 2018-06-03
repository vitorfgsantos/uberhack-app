import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

/**
 * https://developers.google.com/maps/documentation/static-maps/intro
 */
@Component({
  selector: 'page-parkings',
  templateUrl: 'parkings.html'
})
export class ParkingsPage {
  estacionamentos: Array<Estacionamento>;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.getEstacionamentos();
  }

  getEstacionamentos() {
    this.estacionamentos = [
      new Estacionamento('Estacionamento Anhanguera', 32, 'Rua Eduardo Viviani', '400', 'Boa Vista', 'Juiz de Fora', 'MG'),
      new Estacionamento('Campinas Estacionamentos', 15, 'Avenida Garcia Rodrigues Paes', '0', 'Jóckey Club', 'Juiz de Fora', 'MG'),
      new Estacionamento('Estacionamento Central', 58, 'Rua Aurora Tôrres', '10', 'Santa Luzia', 'Juiz de Fora', 'MG')];
  }}

export class Estacionamento {
  nome: string;
  vagas: number;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string
  mapa: string;

  constructor(nome: string, vagas: number, logradouro: string, numero: string, bairro: string, cidade: string, estado: string) {
    this.nome = nome;
    this.vagas = vagas;
    this.logradouro = logradouro;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.mapa = this.getMapa();
  }

  private getEndereco() {
    return this.logradouro + ', ' + this.numero + ' - ' + this.bairro + ', ' + this.cidade + ' - ' + this.estado;
  }

  private getMapa() {
    return 'https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=400x400&markers=color:red|' + this.getEndereco() + '&key=AIzaSyCXvmVx1Px1Gpv8yKWQzW1N3ySfjyoFIEs'
  }
}
