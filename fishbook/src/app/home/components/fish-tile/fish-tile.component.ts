import { Component, Input, OnInit } from '@angular/core';
import { Catch } from 'src/app/shared/models/catch.model';

@Component({
  selector: 'fish-tile',
  templateUrl: './fish-tile.component.html',
  styleUrls: ['./fish-tile.component.sass'],
})
export class FishTileComponent implements OnInit {
  @Input()
  public data: Catch;

  constructor() {}

  public ngOnInit(): void {}
}
