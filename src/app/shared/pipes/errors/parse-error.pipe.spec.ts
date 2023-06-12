import { ParseErrorPipe } from './parse-error.pipe';

describe('ParseErrorPipe', () => {
  let pipe: ParseErrorPipe;

  beforeEach(() => {
    pipe = new ParseErrorPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "The provided email is already registered." when the error message includes "Unique constraint failed on the fields"', () => {
    const mockError = {
      error: {
        message: 'Unique constraint failed on the fields: (`email`)',
      },
    };
    expect(pipe.transform(mockError)).toEqual(
      'The provided email is already registered.'
    );
  });

  it('should return the error message when it does not include "Unique constraint failed on the fields"', () => {
    const mockError = {
      error: {
        message: 'Another error occurred',
      },
    };
    expect(pipe.transform(mockError)).toEqual('Another error occurred');
  });

  it('should return "An unknown error occurred." when there is no error message', () => {
    const mockError = {
      error: {},
    };
    expect(pipe.transform(mockError)).toEqual('An unknown error occurred.');
  });

  it('should return "An unknown error occurred." when error object is null', () => {
    const mockError = null;
    expect(pipe.transform(mockError)).toEqual('An unknown error occurred.');
  });
});
