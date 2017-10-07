import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-host',
  template: '<div></div>',
})
export class DialogHostComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogHostComponent>,
    public element: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  getElement() {
    return this.element.nativeElement.children[0];
  }

}
