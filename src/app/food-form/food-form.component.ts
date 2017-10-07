import { Component, OnInit } from '@angular/core';
import { Food } from '../food';
import { GesundheitscloudService } from '../gesundheitscloud.service';

enum FormState {
  EDITING = 0,
  SUBMITTING = 1,
  SUBMITTED = 2,
}

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.css']
})
export class FoodFormComponent implements OnInit {

  FormState = FormState;
  state: FormState;
  model: Food;


  constructor(private cloud: GesundheitscloudService) {
    this.reset();
  }

  ngOnInit() {
  }

  reset() {
    this.model = new Food(Math.round(Date.now()/ 1000), null, null, [0, 0, 0]);
    this.state = FormState.EDITING;
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

  onSubmit() {
    this.state = FormState.SUBMITTING;

    this.cloud.submit(this.model)
      .then(() => this.state = FormState.SUBMITTED)
      .catch((err) => {
        console.log("nope", err);
        this.state = FormState.EDITING;
      });
  }
}
