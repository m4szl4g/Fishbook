import { Component, Input, OnInit } from '@angular/core';
import { Equipment } from 'src/app/shared/models/equipment.model';

@Component({
  selector: 'equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.sass'],
})
export class EquipmentComponent implements OnInit {
  
  @Input()
  public equipments: Equipment[] = [
    {
      rod: 'Shimano Beast Master 270',
      reel: 'Spro Bluarc',
      line: 'Trabucco 20mm',
    },
    {
      rod: 'Shimano Beast Master 300',
      reel: 'Spro Bluarc',
      line: 'Trabucco 16mm',
    },
  ];

  constructor() {}

  public ngOnInit(): void {}
}
