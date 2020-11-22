import { Injectable } from '@angular/core';
import S3 from 'aws-sdk/clients/s3';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';

/// HOW TO USE ///
/*
  upload() {
    const file = this.selectedFiles.item(0);
    this.uploadService.uploadStartupImg(startup._id, file).then(res=>{
      console.log(res)
    })
  }
    
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  <label class="btn btn-default">
    <input type="file" (change)="selectFile($event)">
  </label>
    
  <button class="btn btn-success" [disabled]="!selectedFiles" (click)="upload()">Upload</button> 
*/

//TODO: change structure to support multiple buckets... put in env file
const S3_BUCKET ={
  name: "supercharger-prod",
} 

enum STARTUP_FOLDER {
  STARTUP = "/startup/",
  PITCHDECK = "/pitch-deck/",
  PAGER = "/pager/",
  HISTORY = "/history/",
  CUSTOMER = "/customer/"
}

@Injectable({
  providedIn: 'root'
})
export class S3BucketService {

  //TODO: move bucket creds to env file
  bucket = new S3(
    {
        accessKeyId: 'AKIA6PWYHLHCSE35SWOE',
        secretAccessKey: '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',
        region: 'us-east-2'
    }
  );

  constructor(private toastr: ToastrService){}

  uploadStartupImg(startupId: string, file: File): Promise<any>{
    let folder = STARTUP_FOLDER.STARTUP;
    return this.uploadFile(startupId, folder, file)
  }

  uploadPagerImg(startupId: string, file: File): Promise<any>{
    let folder = STARTUP_FOLDER.PAGER;
    return this.uploadFile(startupId, folder, file)
  }

  uploadHistoryImg(startupId: string, file: File): Promise<any>{
    let folder = STARTUP_FOLDER.HISTORY;
    return this.uploadFile(startupId, folder, file)
  }

  uploadCustomerImgs(startupId: string, files: File[]){
    files.forEach(file=>{
      let folder = STARTUP_FOLDER.CUSTOMER;
      this.uploadFile(startupId, folder, file)
    })
  }

  uploadPitchDeckImgs(startupId: string, files: File[]){
    files.forEach(file=>{
      let folder = STARTUP_FOLDER.PITCHDECK;
      this.uploadFile(startupId, folder, file)
    })
  }

  uploadFile(startupId: string, folder: STARTUP_FOLDER, file: File): Promise<any> {

    let folderName = startupId + folder

    let contentType = file.type;

    let params = {
        Bucket: S3_BUCKET.name,
        Key: folderName + file.name,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType
    };

    return this.bucket.upload(params).promise().then(data =>{
      this.toastr.success("Successfully uploaded " + file.name)
      return data
    })
    .catch(e=>{
      this.toastr.error("Could not upload " + file.name);
      return e
    })

    //for upload progress   
    /*bucket.upload(params).on('httpUploadProgress', function (evt) {
          console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
      }).send(function (err, data) {
          if (err) {
              console.log('There was an error uploading your file: ', err);
              return false;
          }
          console.log('Successfully uploaded file.', data);
          return true;
      });*/
  }

  getFullUrl(url: string){
    let params = {
      Bucket: S3_BUCKET.name,
      Key: url,
      Expires: 3600
    };
    return this.bucket.getSignedUrl('getObject', params);
  }

}