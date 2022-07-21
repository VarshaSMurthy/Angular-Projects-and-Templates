import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      //username: ['', Validators.email],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.formSubmitAttempt = true;
    if ((this.form.value.username == "admin") && (this.form.value.password == "admin")) {
      this.router.navigate(['/home']);
    }
    else {
      this.loginInvalid = true;
      this.router.navigate(['/home']);
    }
    console.log(this.form.value.username);
  }
}
