import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { switchMap } from 'rxjs/operators';

export interface FilesUploadMetadata {
  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storagePath = 'fishbook';

  constructor(private storage: AngularFireStorage) {}

  public upload(file: File): Observable<string> {
    const filePath = `${this.storagePath}/catch/${file.name}`;
    const uploadTask: AngularFireUploadTask = this.storage.upload(
      filePath,
      file
    );

    return from(uploadTask).pipe(
      switchMap(() => this.storage.ref(filePath).getDownloadURL())
    );
  }
}
