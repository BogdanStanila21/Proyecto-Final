import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})

export class NavComponent implements OnInit {

  public dropdown: string = "nav-dropdown-hidden";

  constructor() {}

    dropdownToggle(){
      if (this.dropdown === "nav-dropdown-hidden"){
        this.dropdown = "nav-dropdown-toggle"
      }

      else {
        this.dropdown = "nav-dropdown-hidden"
      }
    }

  ngOnInit(): void {}
}