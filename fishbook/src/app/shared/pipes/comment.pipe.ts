import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'comment' })
export class CommentPipe implements PipeTransform {
  transform(value: string, comment: number): string {
    if (!comment || comment === 0) {
      value = 'There is no comment yet';
    } else {
      value = `comments(${comment}`;
    }
    return value;
  }
}
