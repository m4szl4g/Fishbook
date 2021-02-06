import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { MyProfileModule } from './my-profile/my-profile.module';
import { NewFishModule } from './new-fish/new-fish.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    MyProfileModule,
    NewFishModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
