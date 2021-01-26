import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { MyProfileModule } from './my-profile/my-profile.module';
import { NewFishModule } from './new-fish/new-fish.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { reducers, metaReducers } from '../app/core/store/index';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers: metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !environment.production,
    }),
    EffectsModule.forRoot([]),

    AuthModule,
    HomeModule,
    MyProfileModule,
    ProfileModule,
    NewFishModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
