import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Registro } from './../models/registro';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private url="http://localhost:3000/user";
  private url2="http://localhost:3000/favorites"
  constructor(private http:HttpClient) { }

  postUser(nuevoUser:Registro){
    return this.http.post(this.url,nuevoUser)
  }

  getFavorites(user:number){
    return this.http.get(this.url2+"/"+user)
  }
  deleteFavorites(favId:any){
    const options={headers:new HttpHeaders({
      'Content-Type':'application/json'
    }),
    body:{favorites_id:favId},
  }
    return this.http.delete(this.url2,options)
  }
}
