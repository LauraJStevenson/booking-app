import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPasswordForm: FormGroup;
  email: any;

  constructor(
    public authService: AuthenticationService,
    public route: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
        ],
      ],
    });
  }

  async resetPassword() {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.value.email;
      this.authService
        .resetPassword(email)
        .then(() => {
          console.log('reset link sent');
          this.route.navigate(['/login']);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
