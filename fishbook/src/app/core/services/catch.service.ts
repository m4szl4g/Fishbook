import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { NewCatch } from 'src/app/shared/models/new-fish.model';

@Injectable({
  providedIn: 'root',
})
export class CatchService {
  private catchesCollection = 'catches';

  constructor(private fireStore: AngularFirestore) {}

  public create(data: NewCatch): Observable<void> {
    return from(
      this.fireStore.collection(this.catchesCollection).doc().set(data)
    );
  }
}
