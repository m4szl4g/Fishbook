import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Catch } from 'src/app/shared/models/new-fish.model';

@Injectable({
  providedIn: 'root',
})
export class CatchService {
  private catchesCollection = 'catches';

  constructor(private firestore: AngularFirestore) {}

  public create(data: Catch): Observable<void> {
    return from(
      this.firestore.collection(this.catchesCollection).doc().set(data)
    );
  }

  public getAll(): Observable<Catch[]> {
    return this.firestore
      .collection(this.catchesCollection)
      .valueChanges()
      .pipe(
        map((data) => {
          return data as Catch[];
        })
      );
  }
}
