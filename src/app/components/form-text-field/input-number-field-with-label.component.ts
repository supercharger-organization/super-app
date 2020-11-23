import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import { AbstractInputComponent } from '../../abstracts/input.component';

@Component({
    selector: 'app-input-number-area-with-label',
    template: `
    <mat-form-field appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <input matInput [id]="cid"
      [type]="type"
      [placeholder]="placeholder"
      [readonly]="inputReadonly"
      [required]="inputRequired"
      (blur)="onBlur.next()"
      (focus)="onFocus.next()"
      [(ngModel)]="value">
    </mat-form-field>
    `,
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputNumberAreaWithLabelComponent),
        multi: true,
      },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class InputNumberAreaWithLabelComponent extends AbstractInputComponent {
    @Input()
    label: string = '';
  
    get asterix(): string {
      return this.inputRequired ? ' *' : '';
    }
  }