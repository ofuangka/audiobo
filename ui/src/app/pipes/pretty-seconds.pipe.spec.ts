import { PrettySecondsPipe } from './pretty-seconds.pipe';

describe('PrettySecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new PrettySecondsPipe();
    expect(pipe).toBeTruthy();
  });
});
