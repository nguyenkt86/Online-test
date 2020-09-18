import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Account } from 'src/app/models/account';
import { Subject, Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  confirm: BsModalRef;
  modalref: BsModalRef;
  constructor(private apiService: ApiService, private modal: BsModalService, private router : Router) { }

  accountsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();

  accounts: Observable<Account[]>;
  account : Account=new Account();
  deleteMessage=false;
  accountList:any;
  isupdated = false;


  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
    this.apiService.getAccountList().subscribe(data =>{
    this.accounts =data;
    this.dtTrigger.next();
    })
  }
  Confirm(template: TemplateRef<any>){
    this.modalref = this.modal.show(template, {class: 'notify'});
  }

  deleteStudent(id: number) {
    this.apiService.deleteAccountById(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.apiService.getAccountList().subscribe(data =>{
            this.accounts =data
            })
        },
        error => console.log(error));
  }

  updateAccount(id: number){
    sessionStorage.removeItem("accountId");
    sessionStorage.setItem("accountId",id+"");
    this.router.navigate(['/admin/update-account']);
  }
}
