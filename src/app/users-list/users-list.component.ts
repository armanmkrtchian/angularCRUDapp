import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

import {IUser} from '../model/user.model';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: IUser[];
  addOrEditMode: boolean;

  constructor(private userService: UserService, private router: Router,) {
  }

  ngOnInit() {
    this.userService.currentStatus.subscribe(addOrEditMode => this.addOrEditMode = addOrEditMode);
    this.userService.getUsers()
      .subscribe((data: IUser[]) => {
        this.users = data;
      });
  }

  deleteEmp(user: IUser): void {
    this.userService.deleteUsers(user.id)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== user);
      });
  }

  editEmp(user: IUser): void {
    localStorage.removeItem('editUserId');
    localStorage.setItem('editUserId', user.id.toString());
    this.router.navigate(['add-user']);
    this.userService.changeMessage(false);
  }

  newUser(): void {

    this.router.navigate(['add-user']);
    this.userService.changeMessage(true);
  }


}
