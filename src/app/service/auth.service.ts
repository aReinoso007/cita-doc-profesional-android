import { ApplicationServiceBase } from './aplication-base.service';
import { Jwt } from './../model/jwt.model';
import { Observable, throwError } from 'rxjs';
import { Login } from './../model/login.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../model/medico.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApplicationServiceBase {

  authURL = '/auth/';
  constructor() {
    super();
  }

  public login(login: Login): Observable<Jwt> {
    return this.http.post<Jwt>(this.apiBackendSite + this.authURL + 'medico_login', login);
  }

  public signUp(medico: Medico): Observable<any> {
    return this.http.post(this.apiBackendSite + this.authURL + 'medico_registro', medico);
  }

}
