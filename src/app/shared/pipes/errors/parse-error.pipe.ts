import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'parseError', standalone: true })
export class ParseErrorPipe implements PipeTransform {
  transform(error: any): string {
    if (error?.error?.message) {
      if (
        error.error.message.includes('Unique constraint failed on the fields')
      ) {
        return 'The provided email is already registered.';
      }
      return error.error.message;
    }
    return 'An unknown error occurred.';
  }
}
