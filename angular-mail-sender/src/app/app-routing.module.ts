import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailSendingFormComponent } from './features/components/email-sending-form/email-sending-form.component';

const routes: Routes = [
  {
    path: '',
    component: EmailSendingFormComponent
  },
  {
    path: '**',
    component: EmailSendingFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
