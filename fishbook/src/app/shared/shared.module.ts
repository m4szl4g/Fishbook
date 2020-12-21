import { NgModule } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [
      MenuComponent],
    imports: [
      MatToolbarModule,
      MatIconModule
    ],  
    exports: [
    ],
    providers: [],
    bootstrap: []
  })
export class SharedModule
{
}