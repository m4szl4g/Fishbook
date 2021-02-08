import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './container/home.component';
import { FishTileComponent } from './components/fish-tile/fish-tile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, FishTileComponent],
  imports: [CommonModule, SharedModule],
  exports: [HomeComponent],
})
export class HomeModule {}
