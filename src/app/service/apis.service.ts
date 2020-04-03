import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Registro } from './../models/registro';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private url="http://localhost:3000/user"
  constructor(private http:HttpClient) { }

  postUser(nuevoUser:Registro){
    return this.http.post(this.url,nuevoUser)
  }
}
