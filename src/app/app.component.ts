import { Component } from '@angular/core';
import { GesundheitscloudService, User } from './gesundheitscloud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public cloud: GesundheitscloudService) {
  }

  public login() {
    this.cloud.login()
      .then((res) => {
        console.log("login success", res);
      })
      .catch((err) => alert(err));
  }

  public registration() {
    this.cloud.registration()
      .then((res) => {
        console.log("login success", res);
      })
      .catch((err) => alert(err));
  }
}
