import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userFormlabel = 'Add User';
  userformbtn = 'Save';

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {
  }

  addForm: FormGroup;
  btnvisibility = true;
  addOrEditMode: boolean;

  ngOnInit() {
    this.userService.currentStatus.subscribe(addOrEditMode => this.addOrEditMode = addOrEditMode);

    if (!this.addOrEditMode) {
      const userId = localStorage.getItem('editUserId');
      if (+userId > 0) {
        this.userService.getUserById(+userId).subscribe(data => {
          this.addForm.patchValue(data);
        });
        this.btnvisibility = false;
        this.userFormlabel = 'Edit User';
        this.userformbtn = 'Update';
      }
    }

    this.addForm = this.formBuilder.group({
      id: [],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_email: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')
      ]],
      user_age: ['', [Validators.required, Validators.pattern('^(100|[1-9][0-9]?)$')]],
      user_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]

    }, {validator: this.checkIfMatchingPasswords('user_password', 'confirm_password')});
  }
  
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
  
  onSubmit() {
    this.userService.createUser(this.addForm.value)
      .subscribe(data => {
          this.router.navigate(['users-list']);
        },
        error => {
          alert(error);
        });
  }

  onUpdate() {
    this.userService.updateUser(this.addForm.value).subscribe(() => {
        this.router.navigate(['users-list']);
      },
      error => {
        alert(error);
      });
  }
}
