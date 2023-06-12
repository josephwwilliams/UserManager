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
      <ng-container *ngSwitchDefault>
        <div class="flex justify-center items-center">
          <p class="text-sm">{{ buttonText }}</p>
          <div *ngIf="icon" [ngClass]="iconStyles">
            <ng-container [ngTemplateOutlet]="icon"></ng-container>
          </div>
        </div>
      </ng-container>
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
  private cdr = inject(ChangeDetectorRef);

  @Input() isLoading: boolean | null = false;
  @Input() disabled: boolean | null = false;
  @Input() buttonText: string = '';
  @Input() buttonType: 'button' | 'submit' = 'button';
  @Input() icon: TemplateRef<SVGElement> | null = null;
  @Input() iconStyles: string = '';
  @Input() styles: string = '';
  @Input() variant: 'delete' | 'submit' | 'default' = 'default';

  @Output() onButtonClick = new EventEmitter<void>();

  public buttonClass: string = '';

  ngOnChanges() {
    this.buttonClass = twJoin(
      'text-white px-4 py-2 rounded-md shadow-md transition duration-300 focus:ring-4 focus:outline-none font-medium text-sm text-center',
      this.styles,
      this.isLoading && 'cursor-not-allowed',
      {
        delete:
          'bg-red-600 hover:bg-red-800 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-400',
        submit:
          'bg-green-600 hover:bg-green-800 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-400',
        default:
          'bg-slate-600 hover:bg-slate-800 focus:ring-slate-300 dark:bg-slate-500 dark:hover:bg-slate-700 dark:focus:ring-slate-400',
      }[this.variant]
    );
    this.cdr.detectChanges();
  }

  onClick() {
    if (!this.isLoading) {
      this.onButtonClick.emit();
    }
  }
}
