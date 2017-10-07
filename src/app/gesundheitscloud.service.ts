
import { Injectable } from '@angular/core';
import { Food } from './food';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogHostComponent } from './dialog-host.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface User {
  user_name: string,
  user_id: string,
}

declare var healthcloud_sdk: any;

@Injectable()
export class GesundheitscloudService {

  private hc = new healthcloud_sdk({
    "clientId":1
  });

  public readonly user: BehaviorSubject<User|null> = new BehaviorSubject(null);

  constructor(public dialog: MatDialog) {
    this.updateUser();
  }

  private withDialog<T>(fn: (dialogRef: MatDialogRef<DialogHostComponent>) => T) {
    let dialogRef = this.dialog.open(DialogHostComponent, {
      width: '80%',
      data: {  }
    });
    return fn(dialogRef);
  }

  login(): Promise<User> {
    var p = new Promise<User>((resolve, reject) =>
      this.withDialog((dialogRef) => {
        this.hc.getLoginForm(dialogRef.componentInstance.getElement(), (err, success) => {
          if(err) {
            reject(err.error.error);
          }
          else {
            dialogRef.close();
            this.updateUser();
            resolve(success);
          }
        });
      })
    );
    return p;
  }


  registration(): Promise<User> {
    var p = new Promise<User>((resolve, reject) => {
      this.withDialog((dialogRef) => {
        this.hc.getRegistrationForm(dialogRef.componentInstance.getElement(), (err, success) => {
          if (err) {
            reject(err.error.error);
          }
          else {
            dialogRef.close();
            this.updateUser();
            resolve(success);
          }
        });
      });
    });
    return p;
  }


  public submit(food: Food): Promise<any> {
    if (this.user.getValue()) {
      return this.hc.uploadDocument(this.user.getValue().user_id, JSON.stringify(food));
    }
  }

  private updateUser(): void {
    const u = this.hc.getUser();
    if (u === 'User not logged in') {
      this.user.next(null);
    }
    else {
      this.user.next(u);
    }
  }
}
