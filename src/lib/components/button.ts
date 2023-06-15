import {
  NgClass,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  NgTemplateOutlet,
} from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  OnChanges,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
import { LoadingIconComponent } from '../icons/loading';
import twJoin from '../utils/twJoin';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      (click)="onClick()"
      [disabled]="isLoading || disabled"
      [type]="buttonType"
      [ngClass]="buttonClass"
      [ngSwitch]="isLoading"
    >
      <!-- Default button state when not loading -->
      <ng-container *ngSwitchDefault>
        <div class="flex justify-center items-center">
          <p class="text-sm">{{ buttonText }}</p>
          <!-- If icon is defined, then display it -->
          <div *ngIf="icon" [ngClass]="iconStyles">
            <ng-container [ngTemplateOutlet]="icon"></ng-container>
          </div>
        </div>
      </ng-container>
      <!-- When loading, show a loading icon -->
      <loading-icon *ngSwitchCase="true" styles="h-5 w-5"></loading-icon>
    </button>
  `,
  imports: [
    NgTemplateOutlet,
    NgClass,
    LoadingIconComponent,
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    NgIf,
  ],
})
export class ButtonComponent implements OnChanges {
  // Inject ChangeDetectorRef service
  private cdr = inject(ChangeDetectorRef);

  // Define the component's @Input properties
  @Input() isLoading: boolean | null = false;
  @Input() disabled: boolean | null = false;
  @Input() buttonText: string = '';
  @Input() buttonType: 'button' | 'submit' = 'button';
  @Input() icon: TemplateRef<SVGElement> | null = null;
  @Input() iconStyles: string = '';
  @Input() styles: string = '';
  @Input() variant: 'delete' | 'submit' | 'default' = 'default';

  // Define the component's @Output properties
  @Output() onButtonClick = new EventEmitter<void>();

  public buttonClass: string = '';

  // Life-cycle hook that is called when any data-bound property of a directive changes
  ngOnChanges() {
    this.buttonClass = twJoin(
      // Use twJoin utility function to join class names
      'text-white px-4 py-2 rounded-md shadow-md transition duration-300 focus:ring-4 focus:outline-none font-medium text-sm text-center',
      this.styles,
      this.isLoading && 'cursor-not-allowed',
      {
        // Different button styles for different variants
        delete:
          'bg-red-600 hover:bg-red-800 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-400',
        submit:
          'bg-green-600 hover:bg-green-800 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-400',
        default:
          'bg-slate-600 hover:bg-slate-800 focus:ring-slate-300 dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-400',
      }[this.variant]
    );
    this.cdr.detectChanges(); // Detect changes to update the view
  }

  // Click handler for the button
  onClick() {
    if (!this.isLoading) {
      this.onButtonClick.emit(); // Emit click event if not loading
    }
  }
}
