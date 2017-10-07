import { Injectable } from '@angular/core';
import { Food } from './food';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

export class Restaurant {
  constructor(public name: string, public menu: Food[]) {}
}

@Injectable()
export class RestaurantService {

  private restaurants: Restaurant[];

  constructor() {
      this.restaurants = [
          new Restaurant("Sakura Sushi Bar", [
            { date: 0, description: "Gebratenes Gemüse mit Tofu", answers: [0,0,0], picture: null },
            { date: 0, description: "Gebratene Hähnchenkeule mit Sauce", answers: [0,0,0], picture: null },
            { date: 0, description: "Maki Set", answers: [0,1,0], picture: null },
            { date: 0, description: "Sushi Set", answers: [0,1,0], picture: null },
            { date: 0, description: "Shabu Shabu Menü", answers: [0,0,0], picture: null },
            { date: 0, description: "Sakura Menü", answers: [0,0,0], picture: null },
            { date: 0, description: "Miso Suppe", answers: [1,1,0], picture: null },
            { date: 0, description: "Sashimi Moriwase", answers: [0,0,0], picture: null },
          ]),
          new Restaurant("Burger & Lobster Bank", [
            { date: 0, description: "The Classic One", answers: [0,0,0], picture: null },
            { date: 0, description: "The American", answers: [0,0,0], picture: null },
            { date: 0, description: "The Surf & Turf", answers: [0,0,0], picture: null },
            { date: 0, description: "The BLB", answers: [0,0,0], picture: null },
            { date: 0, description: "The HULK", answers: [0,0,0], picture: null },
            { date: 0, description: "The Yakuza", answers: [0,0,0], picture: null },
            { date: 0, description: "BLB`s best Salad 2017", answers: [1,0,0], picture: null },
          ]),
          new Restaurant("Oskar Maria Brasserie", [
            { date: 0, description: "Fenchel-Kartoffel-Rösti", answers: [0,0,0], picture: null },
            { date: 0, description: "Poisson du Jour", answers: [0,0,0], picture: null },
            { date: 0, description: "Beuf en Danube", answers: [0,0,0], picture: null },
            { date: 0, description: "Kurzgebratenes & Ragout", answers: [0,0,0], picture: null },
            { date: 0, description: "Bouillabaisse", answers: [0,0,0], picture: null },
            { date: 0, description: "Kichererbsen Socca", answers: [1,0,0], picture: null },
            { date: 0, description: "Rinderfilet", answers: [0,0,0], picture: null },
            { date: 0, description: "Parmesanknödel", answers: [0,0,0], picture: null },
            { date: 0, description: "Rucola Salat", answers: [1,1,0], picture: null },
          ]),
      ];
  }

  public getRestaurants(): Observable<Restaurant[]> {
    return Observable.of(this.restaurants).delay(3300);
  }

}
