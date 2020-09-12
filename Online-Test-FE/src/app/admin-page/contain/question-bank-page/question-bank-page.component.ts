import { Questionbank } from './../../../models/questionbank';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/api.service';
import { Subject, Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-question-bank-page',
  templateUrl: './question-bank-page.component.html',
  styleUrls: ['./question-bank-page.component.css']
})
export class QuestionBankPageComponent implements OnInit {
  confirm: BsModalRef;
  modalref: BsModalRef;
  constructor(private apiService: ApiService, private modal: BsModalService) { }

  accountsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();

  questions: Observable<Questionbank[]>;
  questionbank : Questionbank=new Questionbank();
  deleteMessage=false;
  questionBankList:any;
  isupdated = false;


  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
    this.apiService.getQuestionsBankList().subscribe(data =>{
    this.questions =data;
    this.dtTrigger.next();
    })
  }
  Confirm(template: TemplateRef<any>){
    this.modalref = this.modal.show(template, {class: 'notify'});
  }

  deleteQuestionBank(id: number) {
    this.apiService.deleteQuestionBankById(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.apiService.getQuestionsBankList().subscribe(data =>{
            this.questions =data
            })
        },
        error => console.log(error));
  }

  updateQuestionBank(id: number){
    this.apiService.getQuestionBankById(id)
      .subscribe(
        data => {
          this.questionBankList=[data]
        },
        error => console.log(error));
  }

  changeisUpdate(){
    this.isupdated=false;
  }

}
