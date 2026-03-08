import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}
  baseURl = 'https://localhost:7046/api/V1/User';
  createUser(formData: any) {
    return this.http.post(this.baseURl+'/Create', formData);
  }
}
