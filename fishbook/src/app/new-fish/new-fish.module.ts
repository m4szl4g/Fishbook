import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewFishComponent } from './container/new-fish.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NewFishComponent],
  imports: [CommonModule, SharedModule],
  exports: [NewFishComponent],
})
export class NewFishModule {}
