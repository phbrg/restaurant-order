import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Customer } from '../../types/home/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class SendFormService {
  protected http = inject(HttpClient);
  
  sendForm(body: string) {
    return this.http.post<Customer>(`${environment.api}register`, body);
  }
}
