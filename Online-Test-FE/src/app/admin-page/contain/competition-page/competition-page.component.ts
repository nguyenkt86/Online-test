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


  ngOnInit() {
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
  onClose(){
    this.deleteMessage=false;
  }

}

