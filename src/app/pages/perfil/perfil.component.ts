import { Component, OnInit } from "@angular/core";
import { LoginService } from "./../../service/login.service";
import { Registro } from "src/app/models/registro";
import { ApisService } from "src/app/service/apis.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from "@angular/forms";
@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.scss"],
})
export class PerfilComponent implements OnInit {
  public userData: any;
  public registroForm: FormGroup;
  constructor(
    private valor: LoginService,
    private Api: ApisService,
    private fb: FormBuilder
  ) {
    // this.buildForm();
    this.getUser();
  }

  buildForm() {
    this.registroForm = this.fb.group({
      nickname: new FormControl(null, [
        Validators.minLength(4),
        Validators.maxLength(12),
        Validators.required,
      ]),
      name: new FormControl(null, [
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.required,
      ]),
      sexo: new FormControl(),
      email: new FormControl(null, [
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}"),
        Validators.required,
      ]),
      password1: new FormControl("", [Validators.required]),
      password2: new FormControl("", [
        Validators.minLength(8),
        Validators.required,
      ]),
      place: new FormControl("", Validators.required),
      aboutYou: new FormControl("", [Validators.required]),
    });
  }

  getValor() {
    return this.valor.getUser();
  }

  getUser() {
    return this.Api.getUser(this.getValor()[0].user_id).subscribe((data) => {
      this.userData = data[0];
      console.log(this.userData);
    });
  }

  editUser(
    name: string,
    nickname: string,
    sex: string,
    place: string,
    password: string,
    email: string,
    aboutYou: string
  ) {
    let edit = new Registro();
    edit.name = name;
    edit.nickname = nickname;
    edit.sex = sex;
    edit.place = place;
    edit.password = password;
    edit.email = email;
    edit.aboutYou = aboutYou;
    edit.user_id = this.getValor()[0].user_id;
    console.log(edit);
    return this.Api.putUser(edit).subscribe((data) => {
      alert("Modificado");
    });
  }

  ngOnInit(): void {}
}
