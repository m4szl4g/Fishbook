import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './home/components/home/home.component';
import { MyProfileComponent } from './my-profile/components/my-profile/my-profile.component';
import { NewFishComponent } from './new-fish/components/new-fish/new-fish.component';
import { ProfileComponent } from './profile/components/profile/profile.component';

const routes: Routes = [ 
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'my-profile', component: MyProfileComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'new-fish', component: NewFishComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
