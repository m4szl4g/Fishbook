import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MyProfileEffects } from './store/my-profile.effects';
import * as fromMyProfile from './store/my-profile.reducer';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { MyProfileComponent } from './container/my-profile.component';
import { SharedModule } from '../shared/shared.module';
import { NewEquipmentComponent } from './components/new-equipment/new-equipment.component';

@NgModule({
  declarations: [MyProfileComponent, EquipmentComponent, UserInfoComponent, NewEquipmentComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('myProfile', fromMyProfile.myProfileReducer),
    EffectsModule.forFeature([MyProfileEffects]),
  ],
  exports: [MyProfileComponent],
})
export class MyProfileModule {}
