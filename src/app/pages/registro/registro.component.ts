import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { passValidation } from "./custom-validator";
import { Registro } from './../../models/registro';
import { ApisService } from './../../service/apis.service';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private fb: FormBuilder, private ApiUser: ApisService, private api:ApisService, private router:Router, private toastr: ToastrService) {
    this.buildForm();
    this.getUsers();
  }

  showSuccess() {
    this.toastr.success('¡Usuario registrado exitosamente!');
  }
  showWarningNickname() {
    this.toastr.error('¡Nickname ya existe!');
  }
  showWarningEmail() {
    this.toastr.error('¡Email ya registrado!');
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
        place: new FormControl("", Validators.required),
        pass: new FormControl("", [
          Validators.pattern("(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}"),
          Validators.required
        ]),
        pass2: new FormControl("", [Validators.required])
        
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
    
    for(let i=0;i<this.users.length;i++){
      if(this.users[i].nickname==nick){
        check=true
      }if(this.users[i].email==email){
        check2=true
      }
    }
    if (check===true){
      this.showWarningNickname();
    }
    if (check2===true){
      this.showWarningEmail();
    }
    if((check==false)&&(check2==false)){
      return this.ApiUser.postUser(user).subscribe((data)=>{
        console.log(data);
        this.router.navigate(['/login'])
        this.showSuccess();
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
