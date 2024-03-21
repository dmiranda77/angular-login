import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  login(): void {
    if (this.username === 'admin' && this.password === 'password') {
      // Redirect to home page (assuming '/home' is your home page route)
      this.router.navigate(['/blog']);
    } else {
      // Handle invalid credentials (show error message, etc.)
      alert('Invalid username or password. Please try again.');
    }
  }

}
