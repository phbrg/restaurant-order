import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formGroup!: FormGroup;

  protected formBuilder = inject(FormBuilder);
  
  constructor() {
    this.formGroup = this.formBuilder.group({
      name: '',
      table: ''
    });
  }

  sendForm(): void {
    console.log(this.formGroup.value);
  }
}
