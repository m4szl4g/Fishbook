import { Component, Input, OnInit } from '@angular/core';
import { Equipment } from 'src/app/shared/models/equipment.model';

@Component({
  selector: 'equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.sass'],
})
export class EquipmentComponent implements OnInit {
  @Input()
  public data: Equipment[];

  constructor() {}

  public ngOnInit(): void {}
}
