import { ApplicationServiceBase } from './aplication-base.service';
import { RegistroEspecialidad } from './../model/registroEspecialidad.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { RegistroSubespecialidad } from '../model/RegistroSubespecialidad.model';

@Injectable({
  providedIn: 'root'
})
export class AcademiaService extends ApplicationServiceBase {

  protected especialidadAPI: string = '/private/especialidad';
  protected subespecialidadAPI: string = '/public/subespecialidad';
  protected registroEspeAPI: string = '/private/medico_especialidad';
  protected registroSubEsAPI: string = '/private/medico_subespecialidad';

  constructor(
    private tokenService: TokenService,
  ) {
    super();
  }

  headers_obj = new HttpHeaders().set("Authorization", "Bearer " + this.tokenService.getToken());

  /*Se muestran las especialidades que no han sido registradas por el medico */
  getEspecialidadesDisponibles(): Observable<any> {
    return this.http.get(this.apiBackendSite + this.especialidadAPI + '/disponibles/' + this.tokenService.getUserId(), { headers: this.headers_obj });
  }
  /*Esto es para guardar el registro de especialidad */
  postRegistroEspecialidad(registro: RegistroEspecialidad): Observable<any> {
    return this.http.post(this.apiBackendSite + this.registroEspeAPI, registro, { headers: this.headers_obj });
  }

  /*Obtener las especialidades registradas por el medico */
  getEspecialidadesRegistradas(): Observable<any> {
    return this.http.get(this.apiBackendSite + this.especialidadAPI + '/registradas/' + this.tokenService.getUserId(), { headers: this.headers_obj })
  }


  /*Obtiene las subespecialidades no registradas por el medico */
  getSubespecialidades(espId: string): Observable<any> {
    return this.http.get(this.apiBackendSite + this.subespecialidadAPI + '/disponibles/' + this.tokenService.getUserId() + '/' + Number(espId), { headers: this.headers_obj })
  }

  getSubespecialidadesRegistradasPorEspecialidad(espId: string): Observable<any> {
    return this.http.get(this.apiBackendSite + this.subespecialidadAPI + '/registradas/' + this.tokenService.getUserId() + '/' + Number(espId), { headers: this.headers_obj })
  }

  postRegistroSubespecialidad(formulario: RegistroSubespecialidad): Observable<any> {
    return this.http.post(this.apiBackendSite + this.registroSubEsAPI, formulario, { headers: this.headers_obj });
  }

  postDeleteRegistroSubEspecialidad(regId: number): Observable<any> {
    return this.http.post(this.apiBackendSite + this.registroSubEsAPI + '/delete', regId, { headers: this.headers_obj });
  }

  getSubespecialidadRegistroId(subId: number): Observable<any> {
    return this.http.get(this.apiBackendSite + this.registroSubEsAPI + '/registro/' + this.tokenService.getUserId() + '/' + subId, { headers: this.headers_obj });
  }

  getEspecialidadRegistroId(espId: number): Observable<any> {
    return this.http.get(this.apiBackendSite + this.registroEspeAPI + '/registro/' + this.tokenService.getUserId() + '/' + espId, { headers: this.headers_obj });
  }

  postDeleteRegistroEsp(regId: number): Observable<any> {
    return this.http.post(this.apiBackendSite + this.registroEspeAPI + '/delete', regId, { headers: this.headers_obj });
  }

}
