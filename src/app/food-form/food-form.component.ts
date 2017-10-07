import { Component, OnInit } from '@angular/core';
import { Food } from '../food';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.css']
})
export class FoodFormComponent implements OnInit {

  model = new Food((new Date()).getTime() / 1000, null, null, [0, 0, 0]);

  constructor() { }

  ngOnInit() {
  }

  pictureChanged(ev) {
    console.log(ev);

    if(ev.target.files.length) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      const model = this.model;

      reader.addEventListener("load", function () {
        model.picture = this.result;
      }, false);

      reader.readAsDataURL(file);
    }
  }
}
