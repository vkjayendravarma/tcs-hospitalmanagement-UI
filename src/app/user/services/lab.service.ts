import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor(private http: HttpClient) { }

  getInventory(): Observable <any>{
    return this.http.get(`${environment.api}/lab/inventory/manageinventory`)
  }

  newTest(newTest): Observable <any>{
    return this.http.post(`${environment.api}/lab/inventory/manageinventory`, newTest)
  }
  getPatientData(patientId): Observable<any>{
    return this.http.get(`${environment.api}/lab/patient/getpatientdata/${patientId}`)
  }

  newInvoice(patientId, items): Observable <any>{
    return this.http.post(`${environment.api}/lab/patient/newinvoice/${patientId}`, {items: items})
  }
}