import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AccountPageComponent } from './admin-page/contain/account-page/account-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddAccountComponent } from './admin-page/contain/add-account/add-account.component';
import { CompetitionPageComponent } from './admin-page/contain/competition-page/competition-page.component';
import { AddCompetitionComponent } from './admin-page/contain/add-competition/add-competition.component';
import { QuestionBankPageComponent } from './admin-page/contain/question-bank-page/question-bank-page.component';
import { UpdateAccountComponent } from './admin-page/contain/update-account/update-account.component';
const routes: Routes = [
  {path:'', redirectTo: "Login" , pathMatch: "full" },
  {path: 'Login', component: LoginPageComponent},
	{path:'admin', redirectTo: "admin" , pathMatch: "full" },
  {
    path: "admin" ,component: AdminPageComponent , children:[
      { path:'', redirectTo: "account" , pathMatch: "full" },
      { path: 'account', component: AccountPageComponent },
      { path: 'add-account', component: AddAccountComponent },
      { path: 'competition', component: CompetitionPageComponent },
      { path: 'add-competition', component: AddCompetitionComponent },
      { path: 'question-bank', component: QuestionBankPageComponent },
      { path: 'update-account', component: UpdateAccountComponent },
    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
