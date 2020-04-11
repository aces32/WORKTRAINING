import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app.routing";
import { BrowserModule } from "@angular/platform-browser";
import { LandingPageModule } from './onboarding/landing-page/landing-page.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { ResetPasswordModule } from './onboarding/reset-password/reset-password.module';
import { PortalModule } from './portal/portal.module';
import { DashboardModule } from './portal/dashboard/dashboard.module';
import { PortalComponent } from './portal/container/portal.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    OnboardingModule,
    ResetPasswordModule,
    PortalModule,
    DashboardModule,
  ],
  exports: [
    ReactiveFormsModule
  ],
  declarations: [AppComponent, PortalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
