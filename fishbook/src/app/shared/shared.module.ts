import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [
      MenuComponent],
    imports: [
      BrowserAnimationsModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule
    ],  
    exports: [
      MenuComponent,
    ],
    providers: [],
    bootstrap: []
  })
export class SharedModule
{
}