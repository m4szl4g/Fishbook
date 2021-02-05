import { Component, OnInit } from '@angular/core';
import { FishTile } from 'src/app/shared/models/fish-tile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  public dummyData1: FishTile = {
    fishImgUrl: '../../../assets/images/dummy_pike.jpg',
    commentCount: 10,
    name: 'John',
    rod: 'Shimano Beast Master 270',
    reel: 'Spro Blue Arc',
    profileImgUrl: '../../../assets/images/default_profile.png',
    where: 'Danube',
  };

  public dummyData2: FishTile = {
    fishImgUrl: '../../../assets/images/dummy_pike2.jpg',
    commentCount: 4,
    name: 'Steve',
    rod: 'Spro Spinner 230',
    reel: 'Shimano Ultegra',
    profileImgUrl: '../../../assets/images/default_profile.png',
    where: 'Balaton Lake',
  };

  constructor() {}

  ngOnInit(): void {}
}
