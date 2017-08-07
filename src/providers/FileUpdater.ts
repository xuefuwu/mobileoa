import { Component } from '@angular/core';
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs";
import { LoadingController, Loading, ToastController } from "ionic-angular";
import { File, FileEntry } from "@ionic-native/file";
import { Camera } from '@ionic-native/camera';

//http://blog.csdn.net/cuishunjian/article/details/71170075
@Component({
    selector: 'page-home',
    templateUrl: 'FileUPdater.html'
})
export class FileUpdater{
    public myPhoto: any;
    public myPhotoURL: any;
    public error: string;
    private loading: Loading;
    constructor(
        private readonly http: Http,
        private readonly loadingCtrl: LoadingController,
        private readonly toastCtrl: ToastController,
        private readonly camera: Camera,
        private readonly file: File
    ) {
    }
    takePhoto() {
        this.camera.getPicture({
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.PNG,
            saveToPhotoAlbum: true
        }).then(imageData => {
            this.myPhoto = imageData;
            this.uploadPhoto(imageData);
        }, error => {
            this.error = JSON.stringify(error);
        });
    }

    selectPhoto(): void {
        this.camera.getPicture({
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.FILE_URI,
            quality: 100,
            encodingType: this.camera.EncodingType.PNG,
        }).then(imageData => {
            this.myPhoto = imageData;
            this.uploadPhoto(imageData);
        }, error => {
            this.error = JSON.stringify(error);
        });
    }
    private uploadPhoto(imageFileUri: any): void {
        this.error = null;
        this.loading = this.loadingCtrl.create({
            content: 'Uploading...'
        });

        this.loading.present();

        this.file.resolveLocalFilesystemUrl(imageFileUri)
            .then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
            .catch(err => console.log(err));
    }
    private readFile(file: any) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const formData = new FormData();
            const imgBlob = new Blob([reader.result], { type: file.type });
            formData.append('file', imgBlob, file.name);
            this.postData(formData);
        };
        reader.readAsArrayBuffer(file);
    }
    private postData(formData: FormData) {
        this.http.post("http://192.168.1.137/api/img/save.jsp", formData)
            .catch((e) => this.handleError(e))
            .map(response => response.text())
            .finally(() => this.loading.dismiss())
            .subscribe(ok => this.showToast(ok));
    }
    private showToast(ok: boolean) {
        if (ok) {
            const toast = this.toastCtrl.create({
                message: 'Upload successful',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
        else {
            const toast = this.toastCtrl.create({
                message: 'Upload failed',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        this.error = errMsg;
        return Observable.throw(errMsg);
    }

}