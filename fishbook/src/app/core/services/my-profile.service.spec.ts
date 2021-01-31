import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyProfile } from 'src/app/shared/models/my-profile.model';
import { MyProfileService } from './my-profile.service';

const input: MyProfile = {
  name: 'John Doe',
};

describe('MyProfileService tests', () => {
  // let service: MyProfileService;
  // let angularFirestore: AngularFirestore;
  // let fireStorySpy = jasmine.createSpyObj('angularFireStore', [
  //   'collection',
  //   'doc',
  // ], {
  //   valueChanges: new Promise
  // });
  // beforeEach(() => {
  //   spyOn(fireStorySpy, 'collection').and.callThrough();
  //   spyOn(fireStorySpy, 'valueChanges').and.returnValue({
  //     payload: {
  //       name: 'hello',
  //     },
  //   });
  //   Object.getOwnPropertyDescriptor(fireStorySpy, 'doc');
  //   TestBed.configureTestingModule({
  //     providers: [
  //       MyProfileService,
  //       AngularFirestore,
  //       { provide: AngularFirestore, useValue: fireStorySpy },
  //     ],
  //   });
  //   service = TestBed.inject(MyProfileService);
  //   angularFirestore = TestBed.get(AngularFirestore);
  // });
  // fit('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
  // fit('gets hierarchy path', () => {
  //   service.get('testUserId');
  //   expect(fireStorySpy.collection).toHaveBeenCalled();
  // });
});
