import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-fish',
  templateUrl: './new-fish.component.html',
  styleUrls: ['./new-fish.component.sass'],
})
export class NewFishComponent implements OnInit {
  public newFishForm: FormGroup;

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
