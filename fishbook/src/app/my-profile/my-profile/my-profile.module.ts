import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from '../components/my-profile/my-profile.component';



@NgModule({
  declarations: [MyProfileComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MyProfileComponent
  ]
})
export class MyProfileModule { }
