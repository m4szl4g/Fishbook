import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MyProfile } from '../models/my-profile.model';

@Injectable({
  providedIn: 'root',
})
export class MyProfileService {
  constructor(private firestore: AngularFirestore) {}

  public get(userId: string): Observable<MyProfile> {
    console.log(userId, 'USERID');
    return this.firestore
      .collection('users')
      .doc<MyProfile>(userId)
      .snapshotChanges()
      .pipe(
        map((doc) => {
          let mappedObject: MyProfile = { name: doc.payload.get('name') };
          return mappedObject;
        })
      );
  }
}
