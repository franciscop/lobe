import lobe from './lobe';
const mockFetch = ret => () => Promise.resolve({ json: () => Promise.resolve(ret) });

describe('lobe.js', () => {
  beforeEach(() => {
    delete lobe.key;
    delete lobe.model;
  });

  it('throws without key', async () => {
    const message = 'Please make sure to add your Lobe key like `lobe.key = \'abc\'`';

    const rejected = lobe();
    expect (rejected instanceof Promise).toBe(true);
    await expect(rejected).rejects.toMatchObject({ message });
  });

  it('throws without model', async () => {
    const message = 'Please make sure to add your model id as the second parameter or globally';

    lobe.key = 'test';
    const rejected = lobe();
    expect (rejected instanceof Promise).toBe(true);
    await expect(rejected).rejects.toMatchObject({ message });
  });

  it('throws without input', async () => {
    const message = 'Please make sure to pass some inputs as the first parameter lobe(inputs)';

    lobe.key = 'test';
    const rejected = lobe(undefined, 'abc');
    expect (rejected instanceof Promise).toBe(true);
    await expect(rejected).rejects.toMatchObject({ message });
  });

  it('accepts the model as an argument', async () => {
    lobe.key = 'abc';
    lobe.fetch = mockFetch({ output: [['a', 0.9], ['b', 0.1]] });

    const out = await lobe({}, 'cde');
    expect(out).toEqual([['a', 0.9], ['b', 0.1]]);
  });

  it('will perform a request with a key and a model', async () => {
    lobe.key = 'abc';
    lobe.model = 'def';
    lobe.fetch = mockFetch({ output: [['a', 0.9], ['b', 0.1]] });

    const out = await lobe({});
    expect(out).toEqual([['a', 0.9], ['b', 0.1]]);
  });
});
