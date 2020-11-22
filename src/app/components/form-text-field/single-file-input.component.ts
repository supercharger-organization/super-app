import { ChangeDetectionStrategy, Component, forwardRef, Input,  OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { S3BucketService } from 'src/app/services/s3-bucket-service/s3-bucket.service';

@Component({
  selector: 'app-input-file-with-label',
  styleUrls: ['./field-styles.component.scss'],
  template: `
  <div class="single-file-sel-input">
    <h2 class="single-file-sel-input-lbl">{{ label }}</h2>
    <input class="single-file-sel-input-btn" id="cid"
    type="file">
    <button class="btn btn-success" [disabled]="!selectedFiles" (click)="upload()">Upload</button> 
  </div>
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
    startUpID: string = '';
    selectedFiles: any;
    constructor(private uploadService: S3BucketService){
        
    }
    ngOnInit(): void {
        
    } 

    upload() {
        const file = this.selectedFiles.item(0);
        this.uploadService.uploadStartupImg(this.startUpID, file).then(res=>{
          console.log(res)
        })
      }
        
      selectFile(event) {
        this.selectedFiles = event.target.files;
      }
    
}