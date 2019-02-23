import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  baseUrl = 'http://localhost:3000/users/';
  private messageSource = new BehaviorSubject(false);
  currentStatus = this.messageSource.asObservable();


  getUsers() {
    return this.http.get<IUser[]>(this.baseUrl);
  }

  deleteUsers(id: number) {
    return this.http.delete<IUser[]>(this.baseUrl + id);
  }

  createUser(user: IUser) {
    return this.http.post(this.baseUrl, user);

  }

  getUserById(id: number) {
    return this.http.get<IUser>(this.baseUrl + '/' + id);
  }

  updateUser(user: IUser) {
    return this.http.put(this.baseUrl + '/' + user.id, user);
  }

  changeMessage(addOrEditMode: boolean) {
    this.messageSource.next(addOrEditMode);
  }
}
