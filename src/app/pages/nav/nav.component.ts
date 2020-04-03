import { Component, OnInit } from "@angular/core";
import { LoginService } from './../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})

export class NavComponent implements OnInit {

  public dropdown: string = "nav-dropdown-hidden";
  public navList: string = "nav-list-hidden"
  public hamburguer: string;

  constructor( private out:LoginService, private router:Router) {}

    dropdownToggle(){
      if (this.dropdown === "nav-dropdown-hidden"){
        this.dropdown = "nav-dropdown-toggle"
      }

      else {
        this.dropdown = "nav-dropdown-hidden"
      }
    }

    dropdownMobile(){
      if (this.navList === "nav-list-hidden"){
        this.navList = "nav-list-toggle";
        this.hamburguer = "active"
      }

      else {
        this.navList = "nav-list-hidden";
        this.hamburguer = ""
      }
    }


    cerrarSesion(){
      this.router.navigate(['/login'])
      return this.out.logOut()
    }

  ngOnInit(): void {}
}