import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/auth/models/user.model';
import { MyProfile } from '../../shared/models/my-profile.model';

@Injectable({
  providedIn: 'root',
})
export class MyProfileService {
  private userCollection = 'users';

  constructor(private firestore: AngularFirestore) {}

  public get(userId: string): Observable<MyProfile> {
    return this.firestore
      .collection(this.userCollection)
      .doc<MyProfile>(userId)
      .snapshotChanges()
      .pipe(
        map((doc) => {
          let mappedObject: MyProfile = { name: doc.payload.get('name') };
          return mappedObject;
        })
      );
  }

  public create(user: User): Observable<void> {
    return from(
      this.firestore
        .collection(this.userCollection)
        .doc(user.uid)
        .set({
          firstName: user.displayName ?? null,
          lastName: user.displayName ?? null,
        })
    );
  }

  public update(profile: MyProfile): Observable<void> {
    return from(
      this.firestore
        .collection(this.userCollection)
        .doc('fix_id_should_replace')
        .update(profile)
    );
  }
}
