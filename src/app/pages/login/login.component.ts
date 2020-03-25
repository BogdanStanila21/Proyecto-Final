import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles:['input.ng-valid{border:2px solid white;}']
  
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  constructor(private fb:FormBuilder) {
    this.buildForm();
   }

   buildForm(){
     this.loginForm=this.fb.group({
      nickname:new FormControl(null,Validators.required),
      pass:new FormControl(null,Validators.required)
     })
   }

   onSubmit(){
    console.log(this.loginForm.value)
 }

  ngOnInit(): void {
  }

}
