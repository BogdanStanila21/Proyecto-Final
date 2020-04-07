import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Registro } from './../models/registro';
import { Peticiones } from '../models/peticiones';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private url = "http://localhost:3000/user";
  private url2 = "http://localhost:3000/favorites";
  private url5 = "http://localhost:3000/petition";
  constructor(private http: HttpClient) { }

  postUser(nuevoUser: Registro) {
    return this.http.post(this.url, nuevoUser)
  }

  getFavorites(user: any) {
    return this.http.get(this.url2 + "/" + user)
  }




  getPetition(user_id: number) {
    return this.http.get(this.url5 + "/" + user_id)
  };

  postPetition(peticion: Peticiones){
    return this.http.post(this.url5, peticion)
  };

  deletePetition(id: number) {

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { requested_id: id },
    }

    return this.http.delete(this.url5, options);
  };

}


