import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { passValidation } from "./custom-validator";
import { Registro } from './../../models/registro';
import { ApisService } from './../../service/apis.service';

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
  styles: ["input.ng-valid{border:2px solid #38a9b8;}"]
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  public miRegistro: Registro;
  constructor(private fb: FormBuilder, private ApiUser: ApisService) {
    this.buildForm();
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
          Validators.pattern("(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}"),
          Validators.required
        ]),
        pass2: new FormControl("", [Validators.required]),
        place: new FormControl("", Validators.required)
      },
      { validators: passValidation.matchPass }
    );
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
    return this.ApiUser.postUser(user).subscribe((data)=>{
      console.log(data);
    })
  }
// Cojer los datos de registro y ver por consola
  onSubmit() {
    console.log(this.registroForm.value);
  }

  ngOnInit(): void { }
}
