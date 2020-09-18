import { Component, OnInit } from '@angular/core';
import {Account} from 'src/app/models/account';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {

  id: number;
  account: Account;
  constructor(private apiService: ApiService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.account= new Account();
    this.id= parseInt( sessionStorage.getItem("accountId"),10);
    console.log(this.id);
    this.apiService.getAccountById(this.id)
      .subscribe(data => {
        console.log(data)
        this.account = data;
      }, error => console.log(error));
  }
  accountUpdateform=new FormGroup({
    fullName:new FormControl(),
    email:new FormControl(),
  });

  updateAcc(){
    this.account.fullName=this.fullName.value;
    this.account.email=this.email.value;
    this.account.id=this.id;
   this.apiService.updateAccount(this.account).subscribe(
    data => {
        this.account = new Account();
        this.gotoList();
    },
    error => console.log(error));
  }

  get fullName(){
    return this.accountUpdateform.get('fullName');
  }

  get email(){
    return this.accountUpdateform.get('email');
  }

  gotoList() {
    this.router.navigate(['admin/account']);
  }

}
