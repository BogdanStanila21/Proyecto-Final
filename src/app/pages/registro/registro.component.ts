import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { passValidation } from './custom-validator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  styles:['input.ng-invalid{border-left: 4px solid red;border-right: 4px solid red} input.ng-valid{border-left:4px solid green;border-right: 4px solid green}']
})
export class RegistroComponent implements OnInit {
 
  registroForm:FormGroup;
  
  constructor(private fb:FormBuilder) {
    this.buildForm();
    
   }
   buildForm(){
   this.registroForm= this.fb.group({
    nickname:new FormControl(null,[Validators.minLength(4),Validators.maxLength(12)]),
    name: new FormControl(null,[Validators.minLength(4),Validators.maxLength(20)]),
    sexo:new FormControl(null,Validators.required),
    email:new FormControl(null,[Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}')]),
    pass:new FormControl('',[Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),Validators.required]),
    pass2:new FormControl('',[Validators.required])
    },{validators:passValidation.matchPass});
  } 

  onSubmit(){
     console.log(this.registroForm.value)
  }

  ngOnInit():void{ }
}
