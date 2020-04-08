import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Registro } from './../models/registro';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private url="http://localhost:3000/user";
  private url2="http://localhost:3000/favorites"
  private url3="http://localhost:3000/requested"
  constructor(private http:HttpClient) { }

  postUser(nuevoUser:Registro){
    return this.http.post(this.url,nuevoUser)
  }

  getFavorites(user:any){
    return this.http.get(this.url2+"/"+user)
  }


  getRequest(user_idRequest: number){
    return this.http.get(this.url3+"/"+user_idRequest)
  }
  
}
