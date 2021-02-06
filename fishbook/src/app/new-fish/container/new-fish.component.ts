import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { NewCatch } from 'src/app/shared/models/new-fish.model';
import * as fromCatchActions from '../../core/store/catch/catch.actions';
import * as fromEquipmentActions from '../../my-profile/store/my-profile.actions';
import * as fromEquipmentSelectors from '../../my-profile/store/my-profile.selectors';

@Component({
  selector: 'app-new-fish',
  templateUrl: './new-fish.component.html',
  styleUrls: ['./new-fish.component.sass'],
})
export class NewFishComponent implements OnInit {
  public newFishForm: FormGroup;
  public myEquipments$: Observable<Equipment[]>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new fromEquipmentActions.GetEquipment());
    this.myEquipments$ = this.store.select(
      fromEquipmentSelectors.getEquipments
    );

    this.newFishForm = new FormGroup({
      fish: new FormControl('', [Validators.required]),
      where: new FormControl('', [Validators.required]),
      equipment: new FormControl('', [Validators.required]),
      details: new FormControl('', [Validators.required]),
    });
  }

  get fish() {
    return this.newFishForm.get('fish');
  }

  get where() {
    return this.newFishForm.get('where');
  }

  get equipment() {
    return this.newFishForm.get('equipment');
  }

  get details() {
    return this.newFishForm.get('details');
  }

  public upload(): void {
    const equipment: Equipment = this.equipment.value;
    const newCatch: NewCatch = {
      details: this.details.value,
      fishType: this.details.value,
      location: this.where.value,
      reel: equipment.reel,
      rod: equipment.rod,
    };

    this.store.dispatch(new fromCatchActions.Create(newCatch));
  }
}
