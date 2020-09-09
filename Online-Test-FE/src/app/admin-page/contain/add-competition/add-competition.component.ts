import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {ApiService} from 'src/app/api.service';
import { from, Observable } from 'rxjs';
import { Competition} from 'src/app/models/competition';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-competition',
  templateUrl: './add-competition.component.html',
  styleUrls: ['./add-competition.component.css']
})
export class AddCompetitionComponent implements OnInit {

  confirm: BsModalRef;
  modalref: BsModalRef;
  constructor(private modal: BsModalService, private apiService: ApiService ) { }
  competition : Competition=new Competition();

  ngOnInit(): void {
  }
  Confirm(template: TemplateRef<any>){
    this.modalref = this.modal.show(template, {class: 'notify'});
  }
  competitionsaveform=new FormGroup({
    competition_name:new FormControl()
  });
  saveCompetition(){
    this.competition=new Competition();
    this.competition.competitionName=this.competitionName.value;
    this.save();

  }
  save() {
    this.apiService.createCompetition(this.competition)
      .subscribe(data => console.log(data), error => console.log(error));
    this.competition = new Competition();
  }
  get competitionName(){
    return this.competitionsaveform.get('competitionName');
  }

}
