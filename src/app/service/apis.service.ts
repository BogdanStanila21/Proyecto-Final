import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Registro, Libro } from './../models/registro';
import { Title } from '@angular/platform-browser';
import { Peticiones } from '../models/peticiones';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private url="http://localhost:3000/user";
  private url2="http://localhost:3000/favorites";
  private url4="http://localhost:3000/mybook";
  private url5 = "http://localhost:3000/petition";
  private url6="http://localhost:3000/book";

  
  constructor(private http: HttpClient) { }

  postUser(nuevoUser: Registro) {
    return this.http.post(this.url, nuevoUser)
  }

  getFavorites(user: any) {
    return this.http.get(this.url2 + "/" + user)
  }
  deleteFavorites(favId:any){
    const options={headers:new HttpHeaders({
      'Content-Type':'application/json'
    }),
    body:{favorites_id:favId},
  }
    return this.http.delete(this.url2,options)
  }
  
//Mis-Libros
  getBook(user_id:number){
    return this.http.get(this.url4+"/"+user_id)
  }
  
  postBook(nuevoLibro:Libro) {
  return this.http.post(this.url6, nuevoLibro)
  }

  getModifica(book_id:number){
    return this.http.get(this.url6+"/"+book_id)
  }

  putBook(libModificado:Libro)
  {
    return this.http.put(this.url6,libModificado)
  }

  deleteBook(bookId:number)
  {
    const options={headers:new HttpHeaders({
      'Content-Type':'application/json'
    }),
    body:{book_id:bookId},
    }
  return this.http.delete(this.url5, options)
  }

//Peticiones

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

  //mostrar libro

  getLibro(id: Number) {
    return this.http.get(this.url6 + "/" + id);
  }
  getLibros() {
    console.log(this.http.get(this.url));
    return this.http.get(this.url6);
  }
  gettype(type) {
    console.log(this.http.get(this.url6 + "/" + type));
    return this.http.get(this.url6 + "/" + type);
  }
}


