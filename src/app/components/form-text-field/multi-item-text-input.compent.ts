import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import { AbstractInputComponent } from '../../abstracts/input.component';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'multi-item-text-input',
  template: `
  <mat-form-field style="width: 50%; padding-right: 2%; overflow-y: scroll;" appearance="outline">
  <mat-label>{{ label }}</mat-label>
  <mat-chip-list #chipList>
    <mat-chip *ngFor="let val of values" [selectable]="selectable"
             [removable]="removable" (removed)="remove(val)">
      {{ val }}
      <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
    </mat-chip>
    <input placeholder=""
           [matChipInputFor]="chipList"
           [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
           [matChipInputAddOnBlur]="addOnBlur"
           (matChipInputTokenEnd)="add($event)">
  </mat-chip-list>
</mat-form-field>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultipleTextInputWithLabelComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleTextInputWithLabelComponent implements OnInit{
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  ngOnInit(): void {
  }

  @Input()
  label: string = '';

  @Input()
  id: string = '';

  @Input()
  values: string[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.values.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(val: string): void {
    const index = this.values.indexOf(val);

    if (index >= 0) {
      this.values.splice(index, 1);
    }
  }
}