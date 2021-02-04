import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Equipment } from 'src/app/shared/models/equipment.model';
import * as fromActions from '../../store/my-profile.actions';

@Component({
  selector: 'app-new-equipment',
  templateUrl: './new-equipment.component.html',
  styleUrls: ['./new-equipment.component.sass'],
})
export class NewEquipmentComponent implements OnInit {
  public newEquipmentForm: FormGroup;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.newEquipmentForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
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

  get name() {
    return this.newEquipmentForm.get('name');
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

  public create(): void {
    const equipment: Equipment = {
      name: this.name.value,
      rod: this.rod.value,
      reel: this.reel.value,
      line: this.line.value,
    };
    this.store.dispatch(new fromActions.CreateEquipment(equipment));
  }
}
