import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {AddUserComponent} from './add-user/add-user.component';
import {UsersListComponent} from './users-list/users-list.component';

export const routes: Routes = [
  {path: '', component: UsersListComponent, pathMatch: 'full'},
  {path: 'users-list', component: UsersListComponent},
  {path: 'add-user', component: AddUserComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
