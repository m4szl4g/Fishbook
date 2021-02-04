import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { USER_RUNTIME_CHECKS } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { CreateEquipment } from 'src/app/my-profile/store/my-profile.actions';
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
}
