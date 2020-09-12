import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Competition } from 'src/app/models/competition';
import { Subject, Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-competition-page',
  templateUrl: './competition-page.component.html',
  styleUrls: ['./competition-page.component.css']
})
export class CompetitionPageComponent implements OnInit {

  confirm: BsModalRef;
  modalref: BsModalRef;
  constructor(private apiService: ApiService, private modal: BsModalService) { }

  competitionsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();

  competitions: Observable<Competition[]>;
  competition : Competition=new Competition();
  deleteMessage=false;
  competitionList:any;
  isupdated = false;


  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
    this.apiService.getCompetitionList().subscribe(data =>{
    this.competitions =data;
    this.dtTrigger.next();
    })
  }
  Confirm(template: TemplateRef<any>){
    this.modalref = this.modal.show(template, {class: 'notify'});
  }

  deleteCompetition(id: number) {
    this.apiService.deleteCompetitionById(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.apiService.getCompetitionList().subscribe(data =>{
            this.competitions =data
            })
        },
        error => console.log(error));
  }

  updateAccount(id: number){
    this.apiService.getAccountById(id)
      .subscribe(
        data => {
          this.competitionList=data
        },
        error => console.log(error));
  }

  accountUpdateform=new FormGroup({
    student_id:new FormControl(),
  });

  updateAcc(updAcc){
    this.competition=new Competition();
    this.competition.id=this.competitionName.value;




   this.apiService.updateAccount(this.competition.id,this.competition).subscribe(
    data => {
      this.isupdated=true;
      this.apiService.getAccountList().subscribe(data =>{
        this.competitions =data
        })
    },
    error => console.log(error));
  }

  get competitionName(){
    return this.accountUpdateform.get('competition_name');
  }
  changeisUpdate(){
    this.isupdated=false;
  }
  onClose(){
    this.deleteMessage=false;
  }

}

