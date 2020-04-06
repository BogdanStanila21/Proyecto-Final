import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Registro } from '../models/registro';


@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private url= "http://localhost:3000/user"

  constructor(private http:HttpClient) { }

  //1. POST PARA CREAR UN USUARIO
  postUser(nuevoUsuario:Registro)
  {
    return this.http.post(this.url, nuevoUsuario)
  }





}
