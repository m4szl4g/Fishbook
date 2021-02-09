import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from '../core/services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [RouterModule, SharedModule],
  declarations: [RegisterComponent, LoginComponent],
  exports: [RegisterComponent],
  providers: [AuthService],
})
export class AuthModule {}
