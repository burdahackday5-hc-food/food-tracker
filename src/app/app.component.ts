import { Component } from '@angular/core';
import { GesundheitscloudService, User } from './gesundheitscloud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  user: User|null;

  constructor(private cloud: GesundheitscloudService) {
    this.user = cloud.getUser();
  }

  public login() {
    this.cloud.login()
      .then((res) => {
        console.log("login success", res);
        this.user = this.cloud.getUser();
      })
      .catch((err) => alert(err));
  }

  public registration() {
    this.cloud.registration()
      .then((res) => {
        console.log("login success", res);
        this.user = this.cloud.getUser();
      })
      .catch((err) => alert(err));
  }
}
