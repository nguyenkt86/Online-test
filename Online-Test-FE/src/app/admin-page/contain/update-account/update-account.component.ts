import { Component, OnInit } from '@angular/core';
import {Account} from 'src/app/models/account';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    this.id = this.route.snapshot.params['id'];
    this.apiService.getAccountById(this.id)
      .subscribe(data => {
        console.log(data)
        this.account = data;
      }, error => console.log(error));
  }
  updateAccount() {
    this.apiService.updateAccount(this.id, this.account)
      .subscribe(data => {
        console.log(data);
        this.account = new Account();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateAccount();
  }

  gotoList() {
    this.router.navigate(['/account']);
  }

}
