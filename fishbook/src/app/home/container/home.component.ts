import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Catch } from 'src/app/shared/models/new-fish.model';
import * as fromCatchActions from '../../core/store/catch/catch.actions';
import * as fromCatchSelectors from '../../core/store/catch/catch.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  public catches$: Observable<Catch[]>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.catches$ = this.store.select(fromCatchSelectors.getCatches);
    this.store.dispatch(new fromCatchActions.GetAll());
  }
}
