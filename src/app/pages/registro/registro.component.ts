import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { passValidation } from "./custom-validator";
import { Registro } from './../../models/registro';
import { ApisService } from './../../service/apis.service';
import {  Router } from '@angular/router';

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
  styles: ["input.ng-valid{border:2px solid #38a9b8;}"]
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  public miRegistro: Registro;
  public users:Registro[];
  constructor(private fb: FormBuilder, private ApiUser: ApisService, private api:ApisService, private router:Router) {
    this.buildForm();
    this.getUsers();
  }
  // Validadores front
  buildForm() {
    this.registroForm = this.fb.group(
      {
        nickname: new FormControl(null, [
          Validators.minLength(4),
          Validators.maxLength(12),
          Validators.required
        ]),
        name: new FormControl(null, [
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.required
        ]),
        sexo: new FormControl(),
        email: new FormControl(null, [
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}"),
          Validators.required
        ]),
        pass: new FormControl("", [
          Validators.minLength(8),
          Validators.required
        ]),
        pass2: new FormControl("", [Validators.required]),
        place: new FormControl("", Validators.required)
      },
      { validators: passValidation.matchPass }
    );
  }

  getUsers(){
    return this.api.getUsers().subscribe((data:Registro[])=>{
      this.users=data;
      console.log(data)
    })
  }

// Añadir usuario
  addUser(nick:string,name:string,sexo:string,email:string,place:string,pass:string){
    let user=new Registro;
    user.nickname=nick;
    user.name=name;
    user.sex=sexo;
    user.email=email;
    user.place=place;
    user.password=pass;
    console.log(user)
    let check=false
    let check2=false
    let check3=false
    for(let i=0;i<this.users.length;i++){
      if(this.users[i].nickname==nick){
        check=true
      }if(this.users[i].name==name){
        check2=true
      }if(this.users[i].email==email){
        check3=true
      }
    }
    if (check===true){
      alert("Nickname no valido")
    }
    if (check2===true){
      alert("Name no valido")
    }
    if (check3===true){
      alert("Email no valido")
    }
    if((check==false)&&(check2==false)&&(check3==false)){
      return this.ApiUser.postUser(user).subscribe((data)=>{
        console.log(data);
        this.router.navigate(['/login'])
        alert("Usuario registrado satisfactoriamente")
      })
    }else{
      console.log("Error desconocido")
    }    
  }
// Cojer los datos de registro y ver por consola
  onSubmit() {
    console.log(this.registroForm.value);
  }

  ngOnInit(): void { }
}
