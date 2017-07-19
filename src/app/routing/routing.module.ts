import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from '../home/home.component';
import { MemberComponent }   from '../member/member.component';
import { MemberFormComponent }   from '../member-form/member-form.component';
import { WellnesseventComponent }   from '../wellnessevent/wellnessevent.component';
import { WellnesseventFormComponent }   from '../wellnessevent-form/wellnessevent-form.component';
import { AdminComponent }   from '../admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'member',  component: MemberComponent },
  { path: 'member/edit/:id', component: MemberFormComponent },
  { path: 'member/add', component: MemberFormComponent },
  { path: 'wellnessevent',  component: WellnesseventComponent },
  { path: 'wellnessevent/edit/:id', component: WellnesseventFormComponent },
  { path: 'wellnessevent/add', component: WellnesseventFormComponent },
  { path: 'admin',  component: AdminComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}