import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AuthEffects } from './store/auth/auth.effects';
import { CatchEffects } from './store/catch/catch.effects';
import { metaReducers, reducers } from './store/index';
import { MyProfileEffects } from './store/my-profile/my-profile.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !environment.production,
    }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([CatchEffects, MyProfileEffects, AuthEffects]),
  ],
  providers: [],
  bootstrap: [],
})
export class CoreModule {}
