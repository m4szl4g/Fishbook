import { Component, Input, OnInit } from '@angular/core';
import { FishTile } from 'src/app/shared/models/fish-tile.model';

@Component({
  selector: 'fish-tile',
  templateUrl: './fish-tile.component.html',
  styleUrls: ['./fish-tile.component.sass'],
})
export class FishTileComponent implements OnInit {
  @Input()
  public data: FishTile = {
    fishImgUrl: '',
    commentCount: 10,
    name: 'John',
    rod: 'Shimano Beast Master 270',
    reel: 'Spro Blue Arc',
    profileImgUrl: '',
    where: 'Danube',
  };

  constructor() {}

  public ngOnInit(): void {}
}
