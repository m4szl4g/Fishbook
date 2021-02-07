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
          let mappedObject: MyProfile = {
            firstName: doc.payload.get('firstName'),
            lastName: doc.payload.get('lastName'),
            aboutMe: doc.payload.get('aboutMe'),
            email: doc.payload.get('email'),
          };
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

  public update(profile: MyProfile, user: User): Observable<void> {
    return from(
      this.firestore.collection(this.userCollection).doc(user.uid).update({
        firstName: profile.firstName,
        lastName: profile.lastName,
        aboutMe: profile.aboutMe,
      })
    );
  }
}
