import { ApplicationServiceBase } from './aplication-base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Direccion } from '../model/direccion.model';

@Injectable({
  providedIn: 'root'
})
export class DireccionService extends ApplicationServiceBase {
  //direccionAPI = 'http://www.citasmedicaspepitas.info/api/public/direccion';
  protected direccionAPI: string = '/public/direccion';
  constructor() {
    super();
  }

  saveDireccion(direccion: Direccion): Observable<any> {
    return this.http.post(this.apiBackendSite + this.direccionAPI, direccion);
  }

}
