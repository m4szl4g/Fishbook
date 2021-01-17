import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { reducers, metaReducers} from './store';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      !environment.production ? StoreDevtoolsModule.instrument() : [],
      EffectsModule.forRoot([])
    ],
    exports: [],
    providers: [],
    bootstrap: []
  })
export class CoreModule
{
}