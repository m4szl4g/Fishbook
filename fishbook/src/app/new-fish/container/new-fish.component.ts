import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Equipment } from 'src/app/shared/models/equipment.model';

@Component({
  selector: 'app-new-fish',
  templateUrl: './new-fish.component.html',
  styleUrls: ['./new-fish.component.sass'],
})
export class NewFishComponent implements OnInit {
  public newFishForm: FormGroup;
  public myEquipments: Equipment[] = [
    {
      line: 'Spro 20mm',
      name: 'Stuff 1',
      reel: 'Reel 111',
      rod: 'Rod 1',
    },
    {
      line: 'Spro 30mm',
      name: 'Stuff 2',
      reel: 'Reel 2',
      rod: 'Rod 2',
    },
  ];

  constructor() {}

  public ngOnInit(): void {
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
}
