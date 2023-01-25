import { ApplicationServiceBase } from './aplication-base.service';
import { FormularioUpdateMedico } from './../model/formularioMedicoUpdate.model';
import { Horario } from './../model/horario.model';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medico } from '../model/medico.model';
import { Clinica } from '../model/clinica.model';
import { Cita } from '../model/cita.model';
import { FormularioRegistroClinica } from '../model/formularioRegistroClinica.model';

@Injectable({
  providedIn: 'root'
})



export class MedicoService extends ApplicationServiceBase {
  protected medicoApi: string = '/private/medico';
  protected registroApi: string = '/private/registro_clinica';
  protected clinicasApi: string = '/private/clinica';
  protected horariosApi: string = '/private/horario';
  protected citaApi: string = '/private/cita';

  constructor(private tokenService: TokenService) {
    super();
  }

  headers_obj = new HttpHeaders().set("Authorization", "Bearer " + this.tokenService.getToken());
  getMedico(): Observable<Medico> {
    return this.http.get<Medico>(this.apiBackendSite + this.medicoApi + '/' + this.tokenService.getUserId(), { headers: this.headers_obj });
  }

  postEditMedico(form: FormularioUpdateMedico): Observable<any> {
    return this.http.post(this.apiBackendSite + this.medicoApi + '/update/' + this.tokenService.getUserId(), form, { headers: this.headers_obj });
  }

  /*Devuelve el id del registro con el id del medico y la clinica
    esto sirve para poder listar los horarios de esa clinica, agregar, editar o borrar */
  getRegistroPorMedicoYClinica(medicoId: number, clinicaId: number): Observable<number> {
    return this.http.get<number>(this.apiBackendSite + this.registroApi + '/buscar/' + medicoId + '/' + clinicaId, { headers: this.headers_obj })
  }
  /*Esta funcion es la pepa */
  getRegistroByMedicoYClinica(medicoId: number, clinicaId: number): Observable<number> {
    return this.http.get<number>(this.apiBackendSite + this.registroApi + '/buscar2/' + medicoId + '/' + clinicaId, { headers: this.headers_obj })
  }

  getClinicasMedico(): Observable<Clinica> {
    return this.http.get<Clinica>(this.apiBackendSite + this.clinicasApi + '/medico_clinica/?idMedico=' + this.tokenService.getUserId(), { headers: this.headers_obj });
  }

  getHistorialCitas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiBackendSite + this.citaApi + '/historial/' + this.tokenService.getUserId(), { headers: this.headers_obj });
  }

  postRegistroClinicaMedico(registro: FormularioRegistroClinica): Observable<any> {
    return this.http.post(this.apiBackendSite + this.registroApi, registro, { headers: this.headers_obj });
  }

  /*Esta seccion esta dedicada a los horarios */
  saveHorario(registroId: number, horario: Horario): Observable<any> {
    return this.http.post<any>(this.apiBackendSite + this.horariosApi + '/guardar/' + registroId, horario, { headers: this.headers_obj });
  }

  getHorariosOrdenados(registroId: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.apiBackendSite + this.horariosApi + '/horario_ordenado/' + registroId, { headers: this.headers_obj });
  }

  deleteHorario(horarioId: number): Observable<any> {
    return this.http.post(this.horariosApi + '/delete', horarioId, { headers: this.headers_obj });
  }

  deleteRegistroClinica(regId: number): Observable<any> {
    return this.http.post(this.apiBackendSite + this.registroApi + '/delete', regId, { headers: this.headers_obj });
  }

  /*Seccion de citas */
  getTodayCitasMedico(): Observable<any[]> {
    return this.http.get<any[]>(this.apiBackendSite + this.citaApi + '/hoy/' + this.tokenService.getUserId(), { headers: this.headers_obj });
  }

}
