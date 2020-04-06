import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { passValidation } from "./custom-validator";
import { Registro } from 'src/app/models/registro';
import { ApisService } from 'src/app/service/apis.service';
import { useAnimation } from '@angular/animations';

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
  styles: ["input.ng-valid{border:2px solid #38a9b8;}"]
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;

  public miRegistro: Registro

  constructor(private fb: FormBuilder, private ApiUser: ApisService) {
    this.buildForm();
  }
  buildForm() {
    this.registroForm = this.fb.group(
      {
        nickname: new FormControl(null, [
          Validators.minLength(4),
          Validators.maxLength(12)
        ]),
        name: new FormControl(null, [
          Validators.minLength(2),
          Validators.maxLength(20)
        ]),
        sexo: new FormControl(),
        email: new FormControl(null, [
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}")
        ]),
        pass: new FormControl("", [
          Validators.pattern("(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}"),
          Validators.required
        ]),
        pass2: new FormControl("", [Validators.required])
      },
      { validators: passValidation.matchPass }
    );
  }

  onSubmit() {
    console.log(this.registroForm.value);
    console.log();
  }

  //CREAR UN  NUEVO USUARIO
  addUser(nick:string,name:string,sex:string,email:string,place:string,pass:string)
  {
    let nuevoUser=new Registro;
    nuevoUser.nickname=nick;
    nuevoUser.name=name;
    nuevoUser.sex=sex;
    nuevoUser.email=email;
    nuevoUser.place=place;
    nuevoUser.password=pass;
    
    this.ApiUser.postUser(nuevoUser).subscribe((data)=>
    {
      console.log(data);
    })
  }

  ngOnInit(): void { }
}
