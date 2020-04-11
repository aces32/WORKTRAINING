import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-show-hide-password",
  templateUrl: "./show-hide-password.component.html",
  styleUrls: ["./show-hide-password.component.css"]
})
export class ShowHidePasswordComponent implements OnInit {
  showPassword: boolean = false;
  passwordType: string = "password";
  constructor() {}

  ngOnInit() {}

  hideShowPassword() {
    if (this.showPassword) {
      this.showPassword = false;
      this.passwordType = "password";
    } else {
      this.showPassword = true;
      this.passwordType = "text";
    }
  }
}
