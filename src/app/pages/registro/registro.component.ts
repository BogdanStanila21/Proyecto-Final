import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { passValidation } from "./custom-validator";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.scss"],
  styles: ["input.ng-valid{border:2px solid #38a9b8;}"]
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
          Validators.minLength(4),
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

  ngOnInit(): void {}
}
