import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Equipment } from 'src/app/shared/models/equipment.model';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private userCollection = 'users';
  private equipmentCollection = 'equipments';

  constructor(private firestore: AngularFirestore) {}

  public create(newEquipment: Equipment, userId: string): Observable<void> {
    return from(
      this.firestore
        .collection(this.userCollection)
        .doc(userId)
        .collection(this.equipmentCollection)
        .doc()
        .set(newEquipment)
    );
  }

  public getAll(userId: string): Observable<Equipment[]> {
    return from(
      this.firestore
        .collection(this.userCollection)
        .doc(userId)
        .collection(this.equipmentCollection)
        .snapshotChanges()
        .pipe(
          map((actions) =>
            actions.map((document) => {
              const equipment = document.payload.doc.data() as Equipment;
              return equipment;
            })
          )
        )
    );
  }
}
