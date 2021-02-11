import { CommentPipe } from './comment.pipe';

describe('CommentPipe tests', () => {
  let commentPipe: CommentPipe = new CommentPipe();

  it('comment is undefined, returns with no comment text', () => {
    const comment = undefined;
    const convertedValue = commentPipe.transform('', comment);
    expect('There is no comment yet').toEqual(convertedValue);
  });

  it('comment is null, returns with no comment text', () => {
    const comment = null;
    const convertedValue = commentPipe.transform('', comment);
    expect('There is no comment yet').toEqual(convertedValue);
  });

  it('comment is 0, returns with no comment text', () => {
    const comment = 0;
    const convertedValue = commentPipe.transform('', comment);
    expect('There is no comment yet').toEqual(convertedValue);
  });

  it('comment has a valid integer which is bigger than 0, returns converted comment contains the number', () => {
    const comment = 5;
    const convertedValue = commentPipe.transform('', 5);
    expect(`comments(${comment}`).toEqual(convertedValue);
  });
});
