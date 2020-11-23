import { ChangeDetectionStrategy, Component, forwardRef, Input,  OnInit, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { S3BucketService } from 'src/app/services/s3-bucket-service/s3-bucket.service';

@Component({
  selector: 'app-input-multi-file-with-label',
  styleUrls: ['./field-styles.component.scss'],
  template: `
  <mat-form-field class='w-100' appearance="outline">
    <mat-label>{{ label }}</mat-label>
    <input matInput *ngIf="currentImgURLs.length == 0;" [value]="emptyVal" readonly>
    <input matInput *ngFor="let url of currentImgURLs" [value]="url" readonly #elseBlock>
      <div class="mt-3">
        <input id="cid" type="file" (change)="selectFile($event)" multiple>
      </div>
      <div class="mt-3 w-100 text-right">
        <button mat-flat-button [disabled]="!selectedFiles" (click)="uploadNextFile()">
          Upload
        </button> 
        <button mat-flat-button (click)="clearAllFiles()">
          Clear All Files
        </button> 
      </div>
  </mat-form-field>
  
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMultiFileWithLabelComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputMultiFileWithLabelComponent implements OnInit {
    @Input()
    label: string = '';
    @Input()
    startUpID: string = '';
    @Input()
    currentImgURLs: string[] = [];
    @Input()
    targetFolder: string = '';

    emptyVal: string = 'Empty';

    /*@Output('update')
    outImgURL: EventEmitter<string> = new EventEmitter<string>();*/

    selectedFiles: any;
    currentFileToUpload: number = 0;
    filesSelected: number = 0;
    constructor(private uploadService: S3BucketService){
        
    }
    ngOnInit(): void { } 

    //Sets parent array to empty array. Stil must save on parents end
    clearAllFiles(){
        var len = this.currentImgURLs.length;
        for(var i = 0; i < len;  i++){
            this.currentImgURLs.pop(); 
        }
    }

    uploadNextFile() {
        //console.log("Uploading file: " + this.currentFileToUpload);
        const file = this.selectedFiles.item(this.currentFileToUpload);
        this.uploadService.uploadFile(this.startUpID, this.targetFolder ,file).then(res=>{
            //console.log(res);
            //console.log("Location!: " + res.Location);
            this.currentImgURLs.push(res.Location);
            if (this.currentFileToUpload == this.selectedFiles.length - 1)
            {
                // Reset counter to 0 for next upload
                this.currentFileToUpload = 0;
            }
            else{
                // If not done uploading, recursively call next upload
                this.currentFileToUpload++;
                this.uploadNextFile();
            }
          })
      }
        
      selectFile(event) {
        this.selectedFiles = event.target.files;
      }
    
}