import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private router = inject(Router);
  protected username: string = '';
  protected password: string = '';

  protected onSubmit(): void {
    if (this.username === 'admin' && this.password === 'password') {
      this.router.navigate(['/dashboard']);
      alert('Login successful!');
    } else {
      alert('Please enter botsh username and password.');
      return;
    }

    // Here you would typically handle authentication logic
  }
}
