import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.component.html',
  styleUrls: ['./new-equipment.component.sass'],
})
export class NewEquipmentComponent implements OnInit {
  public newEquipmentForm: FormGroup;

  constructor() {}

  public ngOnInit(): void {
    this.newEquipmentForm = new FormGroup({
      rod: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      reel: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      line: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
    });
  }

  get rod() {
    return this.newEquipmentForm.get('rod');
  }

  get reel() {
    return this.newEquipmentForm.get('reel');
  }

  get line() {
    return this.newEquipmentForm.get('line');
  }

  public create(): void {}
}
