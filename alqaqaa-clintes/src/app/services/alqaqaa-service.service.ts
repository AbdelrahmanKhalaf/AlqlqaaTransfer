import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlqaqaaServiceService {

  constructor(private http : HttpClient) { }
  getBusines(){
  return this.http.get('http://localhost:5000/api/business' ,)
  }
  getBusinesDetails(id){
    return this.http.get(`http://localhost:5000/api/business/${id}` ,)
    }
  getRentals(){
    return this.http.get('http://localhost:5000/api/rentals' ,)

  } 
  getServicesPre(id){
    return this.http.get(`http://localhost:5000/api/myservices/${id}`)

  } 
  getServices(){
    return this.http.get(`http://localhost:5000/api/myservices`)

  } 
  getServicesDetails(id){
    return this.http.get(`http://localhost:5000/api/myservices/${id}`)

  } 
  getOffersPro(id){
    return this.http.get(`http://localhost:5000/api/offers/${id}`)

  }
  getOffers(){
    return this.http.get(`http://localhost:5000/api/offers`)

  }
  getDetailsCatgServices(id){
    return this.http.get(`http://localhost:5000/api/service/${id}`)
  } 
  getComments(){
    return this.http.get(`http://localhost:5000/api/evaluation`)

  }
  getUserById(id){
    return this.http.get(`http://localhost:5000/api/users/adminusers/${id}`)

  }
  getCatgServices(){
    return this.http.get(`http://localhost:5000/api/service`)
  }
}
