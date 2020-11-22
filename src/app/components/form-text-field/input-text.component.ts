import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractInputComponent } from '../../abstracts/input.component';

@Component({
  selector: 'app-input-text',
  template: `
  <input 
        [id]="cid"
        [type]="type"
        [placeholder]="placeholder"
        [readonly]="inputReadonly"
        [required]="inputRequired"
        (blur)="onBlur.next()"
        (focus)="onFocus.next()"
        [(ngModel)]="value">
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputTextComponent extends AbstractInputComponent {}
