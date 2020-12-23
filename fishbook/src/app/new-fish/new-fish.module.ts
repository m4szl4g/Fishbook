import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewFishComponent } from './components/new-fish/new-fish.component';



@NgModule({
  declarations: [NewFishComponent],
  imports: [
    CommonModule
  ],
  exports: [NewFishComponent]
})
export class NewFishModule { }
