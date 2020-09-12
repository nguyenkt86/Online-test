import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NavbarComponent } from './admin-page/navbar/navbar.component';
import { SidebarComponent } from './admin-page/sidebar/sidebar.component';
import { MenuComponent } from './admin-page/menu/menu.component';
import { AccountPageComponent } from './admin-page/contain/account-page/account-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddAccountComponent } from './admin-page/contain/add-account/add-account.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CompetitionPageComponent } from './admin-page/contain/competition-page/competition-page.component';
import { AddCompetitionComponent } from './admin-page/contain/add-competition/add-competition.component';
import { QuestionBankPageComponent } from './admin-page/contain/question-bank-page/question-bank-page.component';
import { SessionModule } from 'src/app/models/session/session.module';
import { UpdateAccountComponent } from './admin-page/contain/update-account/update-account.component';
import { AddQuestionbankComponent } from './admin-page/contain/add-questionbank/add-questionbank.component';
import { QuestionlistComponent } from './admin-page/contain/questionlist/questionlist.component';
@NgModule({
  declarations: [
    AppComponent,
	AdminPageComponent,
	NavbarComponent,
	SidebarComponent,
	MenuComponent,
  AccountPageComponent,
  LoginPageComponent,
  AddAccountComponent,
  CompetitionPageComponent,
  AddCompetitionComponent,
  QuestionBankPageComponent,
  UpdateAccountComponent,
  AddQuestionbankComponent,
  QuestionlistComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    ModalModule.forRoot(),
    RouterModule,
    ProgressbarModule.forRoot(),
    SessionModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
