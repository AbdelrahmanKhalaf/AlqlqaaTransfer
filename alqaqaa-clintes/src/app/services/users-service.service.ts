import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EvaluationI } from './models/evaluation';
import { Iuser } from './models/Iuser';
import { IUserLogin } from './models/IUserLogin';
import { ActivatedRoute, Router } from '@angular/router';
import { dataSocial } from './models/dataSocial';
import { dataAvatar } from './models/dataAvatar';
import { IdataOffers } from './models/IdataOffer';
import { IdataBusiness } from './models/dataBusiness';
import { Email } from './models/email';
import { NewPass } from './models/newPass';
import { ChangePassword } from './models/ChangePassword';
import { IFeedback } from './models/feedback';
import { UpdateInfo } from './models/updateInfo';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  constructor(private http: HttpClient) {}
  addCommment(data: EvaluationI) {
    return this.http.post('http://localhost:5000/api/evaluation', data);
  }
  PostUser(DataUser: Iuser) {
    return this.http.post('http://localhost:5000/api/users', DataUser);
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  loguotuser() {
    localStorage.removeItem('token');
  }
  makeUserLogin(login: IUserLogin) {
    return this.http.post('http://localhost:5000/api/login', login);
  }
  getUserInf() {
    return this.http.get('http://localhost:5000/api/users/me');
  }
  UpdateUserScoial(Id, dataSocial: dataSocial) {
    return this.http.put(
      `http://localhost:5000/api/users/social/${Id}`,
      dataSocial
    );
  }
  UpdateUserAvatar(Id, dataAvatar) {
    return this.http.put(
      `http://localhost:5000/api/users/avatar/${Id}`,
      dataAvatar
    );
  }
  getOrdersOffers() {
    return this.http.get('http://localhost:5000/api/rentalsOffers/orders');
  }
  getOrdersOffersDetails(id) {
    return this.http.get(`http://localhost:5000/api/rentalsOffers/${id}`);
  }
  AddOrdersOffers(dataOffers: IdataOffers) {
    return this.http.post(
      `http://localhost:5000/api/rentalsOffers`,
      dataOffers
    );
  }
  AddOrdersBusiness(dataBusiness: IdataBusiness) {
    return this.http.post(
      `http://localhost:5000/api/rentalsBusiness`,
      dataBusiness
    );
  }
  deletOrdersOffers(id) {
    return this.http.delete(`http://localhost:5000/api/rentalsOffers/${id}`);
  }
  getOrdersBusiness() {
    return this.http.get('http://localhost:5000/api/rentalsBusiness/orders');
  }
  deletOrdersBusiness(id) {
    return this.http.delete(`http://localhost:5000/api/rentalsBusiness/${id}`);
  }
  getOrdersBusinessDetails(id) {
    return this.http.get(`http://localhost:5000/api/rentalsBusiness/${id}`);
  }
  forgetPassword(email: Email) {
    return this.http.put(
      `http://localhost:5000/api/users/forget-password/`,
      email
    );
  }
  RestPassword(resetLink, newPass: NewPass) {
    return this.http.put(
      `http://localhost:5000/api/users/reset-password/${resetLink}`,
      newPass
    );
  }
  ChangePassword(ChangePassword: ChangePassword) {
    return this.http.put(
      `http://localhost:5000/api/users/change-password`,
      ChangePassword
    );
  }
  resendMessageActivation(Email: Email) {
    return this.http.post(
      `http://localhost:5000/api/users/resendMessage`,
      Email
    );
  }
  activatedEmail(token) {
    return this.http.put(
      `http://localhost:5000/api/users/activate/${token}`,
      token
    );
  }
  feedback(feedback: IFeedback) {
    return this.http.post(`http://localhost:5000/api/users/feedback`, feedback);
  }
  updateInfo(dataUser: UpdateInfo) {
    return this.http.put('http://localhost:5000/api/users/me', dataUser);
  }
  getUserById(id) {
    return this.http.get(`http://localhost:5000/api/users/adminusers/${id}`);
  }
}
