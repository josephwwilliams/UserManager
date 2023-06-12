import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  template: `
    <div class="flex flex-col mb-4">
      <label [for]="label" class="mb-2 text-gray-700 dark:text-gray-300">
        {{ label }}
        <span class="text-red-500" *ngIf="required">*</span>
      </label>

      <input
        [id]="label"
        [type]="type"
        [placeholder]="placeholder"
        [readonly]="readonly"
        [formControl]="control"
        class="border-2 border-gray-300 p-2 rounded outline-none focus:border-blue-500 transition-colors duration-300"
      />

      <div
        *ngIf="displayErrors()"
        class="mt-2 text-sm text-red-500 dark:text-red-300"
      >
        <div *ngIf="control.errors?.['required']">This field is required.</div>
        <div *ngIf="control.errors?.['email']">Please enter a valid email.</div>
      </div>
    </div>
  `,
  imports: [ReactiveFormsModule, FormsModule, NgIf],
})
export class AppInputComponent {
  @Input() control!: FormControl;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;

  displayErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
