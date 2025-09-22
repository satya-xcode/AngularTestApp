import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  protected username: string = '';
  protected password: string = '';

  protected onSubmit(): void {
    console.log('Login submitted:', this.username, this.password);
    // Here you would typically handle authentication logic
  }
}
