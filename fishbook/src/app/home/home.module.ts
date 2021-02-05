import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './container/home.component';
import { FishTileComponent } from './components/fish-tile/fish-tile.component';

@NgModule({
  declarations: [HomeComponent, FishTileComponent],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class HomeModule {}
