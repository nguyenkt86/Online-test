import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {ApiService} from 'src/app/api.service';
import { from, Observable } from 'rxjs';
import {Account} from 'src/app/models/account';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css'],
  providers: [ ApiService ]
})
export class AddAccountComponent implements OnInit {

  confirm: BsModalRef;
  modalref: BsModalRef;
  title = 'Upload Accounts';
  selectedFile: File;
  error: string;
  fileUpload = { status: '', message: 0, filePath: '' };

  constructor(private apiService: ApiService, private modal: BsModalService, private router: Router) { }

  ngOnInit(): void {
  }
  Confirm(template: TemplateRef<any>){
    this.modalref = this.modal.show(template, {class: 'notify'});
  }
  onFileSelected(event) {
    console.log('File Changed: ', event);
    if (event) {
      this.selectedFile = event.target.files[0] as File;
    } else {
      this.selectedFile = null;
    }
  }
  onUpload() {
    console.log(this.selectedFile);
    if (this.selectedFile == null) {
      console.log('You not Choose file.');
      // todo: check name file, check type file.
      // } else if (this.uploadService.checkName(this.selectedFile)) {
      //   console.log('Invalid file name. [' + this.selectedFile.name + ']');
      // } else if (this.uploadService.checkType(this.selectedFile)) {
      //   console.log('Invalid file type. [' + this.selectedFile.type + ']');
    } else if (this.apiService.checkSize(this.selectedFile)) {
      console.log('File size larger than ' + this.apiService.maxSize + ' bytes. [' + (this.selectedFile.size) + ']');
    } else {
      console.log('Event: upload file start.');
      const fd = new FormData();
      fd.append('file', this.selectedFile, this.selectedFile.name);
      this.apiService.postUploadFile(fd)
        .subscribe(res => {
          console.log('success component', res);
          this.fileUpload = res;
        }, err => {
          console.log('error component', err);
          this.error = err;
        });
    }
  }

}
