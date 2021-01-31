import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MyProfileEffects } from './store/my-profile.effects';
import * as fromMyProfile from './store/my-profile.reducer';
import { EquipmentComponent } from './components/equipment/equipment.component';

@NgModule({
  declarations: [MyProfileComponent, EquipmentComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('myProfile', fromMyProfile.myProfileReducer),
    EffectsModule.forFeature([MyProfileEffects]),
  ],
  exports: [MyProfileComponent],
})
export class MyProfileModule {}
