import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Direccion } from '../model/direccion.model';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  //direccionAPI = 'http://www.citasmedicaspepitas.info/api/public/direccion';
  direccionAPI = 'http://citaback-env.eba-gmp35wab.sa-east-1.elasticbeanstalk.com/api/public/direccion';
  constructor(
    private http: HttpClient
  ) { }

    saveDireccion(direccion: Direccion): Observable<any>{
      return this.http.post(this.direccionAPI, direccion);
    }

}
