import { Component, ViewChild, ElementRef } from '@angular/core';
import { Http, Response } from "@angular/http";
import { FormBuilder, Validators } from '@angular/forms';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { LoadingController, Loading, ToastController, NavParams } from "ionic-angular";
import { HttpServiceProvider } from "./http-service";

//http://blog.csdn.net/cuishunjian/article/details/71170075
@Component({
    selector: 'page-home',
    templateUrl: 'FileUPdater.html'
})
export class FileUpdater {
    @ViewChild('uploadimg') container: ElementRef;//与html中div #container1对应
    imageUrl: any;
    public myPhoto: any;
    public myPhotoURL: any;
    public error: string;
    private loading: Loading;
    fileid: string;
    uploadForm = this.formBuilder.group({
        'action': [],
        "files": [],
        "filepath": []
    });
    constructor(
        private formBuilder: FormBuilder,
        public navParams: NavParams,
        private httpService: HttpServiceProvider
    ) {
        this.fileid = navParams.get("fileid");
    }

    fileChanged(event) {
        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].size > 512000) {
                console.log('the file size more than 500kb');
                //this.fileValid = false;
            } else {
                console.log('the file size less than 500kb');
                //this.fileValid = true;
            }
            let reader = new FileReader();
            //get the selected file from event
            let file = event.target.files[0];
            reader.onloadend = function(e) {
                //Assign the result to variable for setting the src of image element
                
                //var the_file = new Blob([e.target.result ], { type: "image/jpeg" } );
            }
            reader.readAsDataURL(file);
        }
    }

    submit(formdata, _event) {
        let fi = this.container.nativeElement;
        if (fi.files && fi.files[0]) {
            var input = new FormData();
            input.append("file",fi.files[0]);
            input.append("action", this.uploadForm.get("action").value);
            input.append("filepath", this.uploadForm.get("filepath").value);
            input.append("filename", "1.png");
            this.httpService.post1("/api/upload.jsp", input).subscribe(res => {
                console.log(res);
            });
        }
        console.log(formdata + _event);
    }
}