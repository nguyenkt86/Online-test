import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [ ApiService ]
})
export class LoginPageComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: string;
  constructor(
    private apiService : ApiService,
    private router : Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });


  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }
  form = new FormGroup({
    username : new FormControl('' , Validators.required),
    password : new FormControl('' , Validators.required)
  });

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  Login(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.apiService.checkLogin(this.f.username.value, this.f.password.value).subscribe(
          data=>{
            sessionStorage.setItem("isLogin",this.f.username.value);
            this.router.navigate(['/admin']);
          },
          error => {
            this.error = "Wrong password, please try again";
            this.loading = false;
        });
  }
}
