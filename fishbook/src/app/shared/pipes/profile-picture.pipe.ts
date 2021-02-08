import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'profilePicture' })
export class ProfilePicturePipe implements PipeTransform {
  transform(value: any, pictureUrl: string) {
    if (!pictureUrl) {
      console.log('null pipe');
      pictureUrl = '../../../assets/images/default_profile.png';
    }
    return pictureUrl;
  }
}
