import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  slide:boolean = false;
  display:boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("isLogin")==null){
      this.router.navigate(['/Login']);
    }
  }

  menu(){
    this.slide = !this.slide;
    this.display = true;
  }

  wrapper(){
    if(this.slide){
      this.display = !this.display;
      this.slide = !this.slide;
    }

  }
}
