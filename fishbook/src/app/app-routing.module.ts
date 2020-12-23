import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { MyProfileComponent } from './my-profile/components/my-profile/my-profile.component';
import { NewFishComponent } from './new-fish/components/new-fish/new-fish.component';

const routes: Routes = [ 
    { path: '', component: HomeComponent },
    { path: 'my-profile', component: MyProfileComponent },
    { path: 'new-fish', component: NewFishComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
