import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SendFormService } from './services/home/send-form.service';

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
  protected sendFormService = inject(SendFormService);
  
  constructor() {
    this.formGroup = this.formBuilder.group({
      name: '',
      table: ''
    });
  }

  submitForm(): void {
    this.sendFormService.sendForm(this.formGroup.value)
      .subscribe(data => console.log(data));
  }
}
