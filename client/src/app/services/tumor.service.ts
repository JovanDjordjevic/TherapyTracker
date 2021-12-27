import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Tumor, TumorPagination } from '../models/tumor.model';

@Injectable({
  providedIn: 'root'
})
export class TumorService {
  private readonly urls = {
    getAllTumors: "http://localhost:5000/api/tumor",
    getAllTumorsForPatient: "http://localhost:5000/api/tumor/getTumorsForPatient",
    addNewTumorForPatient: "http://localhost:5000/api/tumor/",
    updateTumorInfo: "http://localhost:5000/api/tumor/",
    deleteTumorForPatient: "http://localhost:5000/api/tumor/",  // na ovo se nadoveze patientId i tumorId u zahtevu, kaos to se zahteva u ruteru
  }

  constructor(private http: HttpClient) { }

  public getAllTumors(page : number = 1, limit: number = 20) : Observable<Tumor[]>{
    const params: HttpParams = new HttpParams().append('page', page).append('limit', limit);
    const obs: Observable<Tumor[]> = this.http.get<TumorPagination>(this.urls.getAllTumors, {params})
                                              .pipe( map( (pagination : TumorPagination) => {return pagination.docs}) );
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }
  
  public getAllTumorsForPatient(patientId : string, page : number = 1, limit: number = 20) : Observable<Tumor[]>{
    const params: HttpParams = new HttpParams().append('_id', patientId).append('page', page).append('limit', limit);
    const obs: Observable<Tumor[]> = this.http.get<TumorPagination>(this.urls.getAllTumorsForPatient, {params: params})
                                              .pipe( map( (pagination : TumorPagination) => {return pagination.docs}) );
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }

  public addNewTumorForPatient(patientId : string, tumor : Tumor) : Observable<Tumor>{
    const obs: Observable<Tumor> = this.http.post<Tumor>(this.urls.addNewTumorForPatient, {patientId, tumor});
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }

  public updateTumorInfo(tumor : Tumor) : Observable<Tumor>{
    const obs: Observable<Tumor> = this.http.put<Tumor>(this.urls.updateTumorInfo, {tumor});
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }

  public deleteTumorForPatient(patientId : string, tumorId : string) : Observable<Tumor>{
    const obs: Observable<Tumor> = this.http.delete<Tumor>(this.urls.deleteTumorForPatient + '/' + patientId + '/' + tumorId);
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }
}
