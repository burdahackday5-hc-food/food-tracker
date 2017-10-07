
import { Injectable } from '@angular/core';
import { Food } from './food';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogHostComponent } from './dialog-host.component';

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

  constructor(public dialog: MatDialog) {

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
            resolve(success);
          }
        });
      });
    });
    return p;
  }


  public submit(food: Food): Promise<any> {
    return this.hc.uploadDocument(this.getUser().user_id, JSON.stringify(food));
  }

  public getUser(): User|null {
    const u = this.hc.getUser();
    if(u == "User not logged in") {
      return null;
    }
    return u;
  }
}
