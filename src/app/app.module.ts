import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {UserService} from './service/user.service';
import {AppRoutingModule} from './app-routing.module';
import {AddUserComponent} from './add-user/add-user.component';
import {UsersListComponent} from './users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

