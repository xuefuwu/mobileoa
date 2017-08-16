import { Component } from "@angular/core";

@Component({
    selector:"input-file",
    template:'<input type="file" #uploadimg (change)="fileChanged($event)" />'
})
export class FileInput{
    private _file:any;
    constructor(){}
    fileChanged(event) {
        if (event.target.files && event.target.files[0]) {
            this._file = event.target.files[0];
            console.log(event.target.files[0].size);
        }
    }
    get File(){
        return this._file;
    }
}