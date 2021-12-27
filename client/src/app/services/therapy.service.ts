import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Therapy, TherapyPagination } from '../models/therapy.model';

@Injectable({
  providedIn: 'root'
})
export class TherapyService {
  private readonly urls = {
    getAllTherapies: "http://localhost:5000/api/therapy",
    getAllTherapiesForPatient: "http://localhost:5000/api/therapy/getTherapiesForPatient",
    addNewTherapyForPatient: "http://localhost:5000/api/therapy/",
    updateTherapyInfo: "http://localhost:5000/api/therapy/",
    deleteTherapyForPatient: "http://localhost:5000/api/therapy/",  // na ovo se nadoveze patientId i therapyId u zahtevu, kaos to se zahteva u ruteru
  }

  constructor(private http: HttpClient) { }

  public getAllTherapies(page : number = 1, limit: number = 20) : Observable<Therapy[]>{
    const params: HttpParams = new HttpParams().append('page', page).append('limit', limit);
    const obs: Observable<Therapy[]> = this.http.get<TherapyPagination>(this.urls.getAllTherapies, {params})
                                                .pipe( map( (pagination : TherapyPagination) => {return pagination.docs}) );
    //obs.subscribe((data : Therapy[])=>console.log(data));
    return obs;
  }
  
  public getAllTherapiesForPatient(patientId : string, page : number = 1, limit: number = 20) : Observable<Therapy[]>{
    const params: HttpParams = new HttpParams().append('_id', patientId).append('page', page).append('limit', limit);
    const obs: Observable<Therapy[]> = this.http.get<TherapyPagination>(this.urls.getAllTherapiesForPatient, {params: params})
                                                .pipe( map( (pagination : TherapyPagination) => {return pagination.docs}) );
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }

  public addNewTherapyForPatient(patientId : string, therapy : Therapy) : Observable<Therapy>{
    const obs: Observable<Therapy> = this.http.post<Therapy>(this.urls.addNewTherapyForPatient, {patientId, therapy});
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }

  public updateTherapyInfo(therapy : Therapy) : Observable<Therapy>{
    const obs: Observable<Therapy> = this.http.put<Therapy>(this.urls.updateTherapyInfo, {therapy});
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }

  public deleteTherapyForPatient(patientId : string, therapyId : string) : Observable<Therapy>{
    const obs: Observable<Therapy> = this.http.delete<Therapy>(this.urls.deleteTherapyForPatient + '/' + patientId + '/' + therapyId);
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }
}
