import { ApplicationServiceBase } from './aplication-base.service';
import { FormularioDireccionClinica } from './../model/FormularioDireccionClinica.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clinica } from '../model/clinica.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicaService extends ApplicationServiceBase {

  protected clinicasApi: string = '/private/clinica';
  registroDireccionAPI = '/public/direccion_clinica';

  constructor(private tokenService: TokenService) {
    super()
  }
  headers_obj = new HttpHeaders().set("Authorization", "Bearer " + this.tokenService.getToken());
  /*Lista todas las clinicas */
  getAllClinicas(): Observable<Clinica> {
    return this.http.get<Clinica>(this.apiBackendSite + this.clinicasApi, { headers: this.headers_obj });
  }

  getClinicasDisponibles(medicoId: number): Observable<Clinica[]> {
    return this.http.get<Clinica[]>(this.apiBackendSite + this.clinicasApi + '/disponibles/' + medicoId, { headers: this.headers_obj });
  }

  addClinica(clinica: Clinica): Observable<any> {
    return this.http.post(this.apiBackendSite + this.clinicasApi, clinica, { headers: this.headers_obj });
  }

  addRegistroDireccion(registro: FormularioDireccionClinica): Observable<any> {
    return this.http.post(this.apiBackendSite + this.registroDireccionAPI, registro);
  }

}
