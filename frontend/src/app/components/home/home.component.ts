import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SendFormService } from '../../services/home/send-form.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  formGroup!: FormGroup;

  protected formBuilder = inject(FormBuilder);
  protected sendFormService = inject(SendFormService);
  protected router = inject(Router);
  
  constructor() {
    this.formGroup = this.formBuilder.group({
      name: '',
      table: ''
    });
  }

  submitForm(): void {
    this.sendFormService.sendForm(this.formGroup.value)
      .subscribe(data => console.log(data));

    this.router.navigate(['/menu']);
  }
}
