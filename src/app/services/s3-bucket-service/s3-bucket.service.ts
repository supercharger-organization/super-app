import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';

declare var TextDecoder;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class S3BucketService implements OnInit {
  title = 'app';

  ngOnInit() {
    // Set up credentials
    AWS.config.credentials = new AWS.Credentials({
      accessKeyId: 'YOURKEY', secretAccessKey: 'YOURSECRET'
    });

    const params = {
      Bucket: 'https://supercharger-prod.s3.us-east-2.amazonaws.com/',
      Key: '0chain/0Chain_Logo.png '
    };

    let s3 = new AWS.S3();

    s3.getObject(params, function(err, data) {
      if (err) {
        console.error(err); // an error occurred
      } else {
        const string = new TextDecoder('utf-8').decode(data.Body);
        console.log(string);
      }
    });
  }

}