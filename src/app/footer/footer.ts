import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'] 
})
export class Footer {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Data:', this.contactForm.value);
      alert(`Thank you for contacting us!\n\nEmail: ${this.contactForm.value.email}\nMessage: ${this.contactForm.value.message}`);
      this.contactForm.reset();
    }
  }
}
