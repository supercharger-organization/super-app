import { ChangeDetectionStrategy, Component, forwardRef, Input,  OnInit, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { S3BucketService } from 'src/app/services/s3-bucket-service/s3-bucket.service';

@Component({
  selector: 'app-input-file-with-label',
  styleUrls: ['./field-styles.component.scss'],
  template: `

  <mat-form-field class='w-100' appearance="outline">
    <mat-label>{{ label }}</mat-label>
    <input matInput [value]='currentImgURL' readonly>

      <div class="mt-3">
        <input id="cid" type="file" (change)="selectFile($event)">
      </div>

      <div class="mt-3 w-100 text-right">
        <button mat-flat-button [disabled]="!selectedFiles" (click)="upload()">
          Upload
        </button> 
      </div>

  </mat-form-field>
  
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileWithLabelComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFileWithLabelComponent implements OnInit {
    @Input()
    label: string = '';
    @Input()
    startUpID: string = '';
    @Input()
    currentImgURL: string = '';

    @Output('update')
    outImgURL: EventEmitter<string> = new EventEmitter<string>();

    selectedFiles: any;

    constructor(private uploadService: S3BucketService){
        
    }
    ngOnInit(): void {
        
    } 

    upload() {
        const file = this.selectedFiles.item(0);
        this.uploadService.uploadStartupImg(this.startUpID, file).then(res=>{
          console.log(res);
          console.log("Location!: " + res.Location);
          this.currentImgURL = res.Location;
          this.outImgURL.emit(this.currentImgURL);
        })
      }
        
      selectFile(event) {
        this.selectedFiles = event.target.files;
      }
    
}