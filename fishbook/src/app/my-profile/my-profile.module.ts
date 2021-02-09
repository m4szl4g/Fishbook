import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { MyProfileComponent } from './container/my-profile.component';
import { SharedModule } from '../shared/shared.module';
import { NewEquipmentComponent } from './components/new-equipment/new-equipment.component';

@NgModule({
  declarations: [
    MyProfileComponent,
    EquipmentComponent,
    UserInfoComponent,
    NewEquipmentComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [MyProfileComponent],
})
export class MyProfileModule {}
