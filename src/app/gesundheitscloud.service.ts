
import { Injectable } from '@angular/core';
import { Food } from './food';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DialogHostComponent } from './dialog-host.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/forkJoin';
//import 'rxjs/add/observable/map';
import 'rxjs/add/observable/zip';


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
  public readonly documents: BehaviorSubject<Food[]> = new BehaviorSubject([]);

  constructor(public dialog: MatDialog) {
    this.updateUser();
    /*this.user.subscribe(user => {
        Observable.fromPromise(this.hc.searchRecords({ user_ids: [user.user_id] }))
          .map((recs: any[]) => Observable.zip(recs.map(rec =>
            this.hc.downloadDocument(user.user_id, rec.record_id)))
          )
          .map(recs => recs.map(r => JSON.parse(r)))
          .subscribe(recs => this.documents.next(recs));
    });*/
    this.documents.next([
      { date: 0, description: "Big Burger", answers: [0,0,0], picture: null },
      { date: 0, description: "Small Salad", answers: [1,1,0], picture: null },
      { date: 0, description: "Jogurt", answers: [1,1,1], picture: null },
    ]);
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
    const user = this.user.getValue();
    if (user) {
      return this.hc.uploadDocument(user.user_id, JSON.stringify(food));
    }
    return Promise.reject("not logged in");
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
