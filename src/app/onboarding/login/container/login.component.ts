import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  PasswordValidator,
} from "src/app/Utilities/CustomValidators";
import { LoginServiceService } from "../../../services/Login-Service/login-service.service";
import { LoginRequest, LoginResponse } from "../../../Utilities/APIFramework";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  passwordType: string = "password";
  showLoader: boolean;
  request: LoginRequest;
  loginResponse: LoginResponse;
  form: FormGroup;

  constructor(
    private toastr: ToastrService,
    private service: LoginServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    // checks if user has logged in before
    // if (this.service.isAuthenticated) {
    //   this.router.navigate(["dashboard"]);
    // }
    this.form = new FormGroup({
      passWord: new FormControl("", [Validators.required]),
      emailAdd: new FormControl("", [Validators.required, Validators.email])
    });
  }

  get emailAdd() {
    return this.form.get("emailAdd");
  }

  get passWord() {
    return this.form.get("passWord");
  }

  hideShowPassword() {
    if (this.showPassword) {
      this.showPassword = false;
      this.passwordType = "password";
    } else {
      this.showPassword = true;
      this.passwordType = "text";
    }
  }

  SubmitForm(request: LoginRequest) {
    console.log("working");
    if (this.form.invalid) {
      PasswordValidator.validateAllFormFields(this.form);
      return;
    }
    request = {
      email: this.form.value.emailAdd,
      password: this.form.value.passWord
    };
    console.log(JSON.stringify(request));
    this.showLoader = true;

    this.service.submitLoginForm(request).subscribe(
      response => {
        this.loginResponse = response;
        if (this.loginResponse.status === 200) {
          const user = this.loginResponse.CustomerDetails[0];
          this.showLoader = false;
          // stores user data in localstorage
          this.service.storeUser(
            user.CustomerID,
            user.FirstName,
            user.LastName,
            user.Username,
            user.MobileNumber,
            user.EmailAddress,
            user.Country,
            user.Address_1,
            user.Address_2
          );
          this.router.navigate(["/portal/dashboard"]);
          this.toastr.success(this.loginResponse.description, "Success!", {
            positionClass: "toast-bottom-right"
          });
        } else {
          this.toastr.error(this.loginResponse.description, "Failed!", {
            positionClass: "toast-bottom-right"
          });
          this.showLoader = false;
        }
      },
      (error: Response) => {
        if (error.status === 404) {
          this.toastr.error(
            "An error occured : please contact support@sharpgas.com",
            "Failed!",
            { positionClass: "toast-bottom-right" }
          );
          console.log(error);
          this.showLoader = false;
        } else {
          this.toastr.error(
            "An error occured : please contact support@sharpgas.com",
            "Failed!",
            { positionClass: "toast-bottom-right" }
          );
          console.log(error);
          this.showLoader = false;
        }
      }
    );
  }
}
