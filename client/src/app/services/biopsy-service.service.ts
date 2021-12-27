import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Biopsy, BiopsyPagination } from '../models/biopsy.model';

@Injectable({
  providedIn: 'root'
})
export class BiopsyService {

  private readonly urls = {
    getAllBiopsies: "http://localhost:5000/api/biopsy",
    getAllBiopsiesForPatient: "http://localhost:5000/api/biopsy/getBiopsiesForPatient",
    addNewBiopsyForPatient: "http://localhost:5000/api/biopsy/",
    updateBiopsyInfo: "http://localhost:5000/api/biopsy/",
    deleteBiopsyForPatient: "http://localhost:5000/api/biopsy/",  // na ovo se nadoveze patientId i biopsyId u zahtevu, kaos to se zahteva u ruteru
  }

  constructor(private http: HttpClient) { }

  public getAllBiopsies(page : number = 1, limit: number = 20) : Observable<Biopsy[]>{
    const params: HttpParams = new HttpParams().append('page', page).append('limit', limit);
    const obs: Observable<Biopsy[]> = this.http.get<BiopsyPagination>(this.urls.getAllBiopsies, {params})
                                               .pipe( map( (pagination : BiopsyPagination) => {return pagination.docs}) );
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }
  
  public getAllBiopsiesForPatient(patientId : string, page : number = 1, limit: number = 20) : Observable<Biopsy[]>{
    const params: HttpParams = new HttpParams().append('_id', patientId).append('page', page).append('limit', limit);
    const obs: Observable<Biopsy[]> = this.http.get<BiopsyPagination>(this.urls.getAllBiopsiesForPatient, {params: params})
                                               .pipe( map( (pagination : BiopsyPagination) => {return pagination.docs}) );
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }

  public addNewBiopsyForPatient(patientId : string, biopsy : Biopsy) : Observable<Biopsy>{
    const obs: Observable<Biopsy> = this.http.post<Biopsy>(this.urls.addNewBiopsyForPatient, {patientId, biopsy});
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }

  public updateBiopsyInfo(biopsy : Biopsy) : Observable<Biopsy>{
    const obs: Observable<Biopsy> = this.http.put<Biopsy>(this.urls.updateBiopsyInfo, {biopsy});
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }

  public deleteBiopsyForPatient(patientId : string, biopsyId : string) : Observable<Biopsy>{
    const obs: Observable<Biopsy> = this.http.delete<Biopsy>(this.urls.deleteBiopsyForPatient + '/' + patientId + '/' + biopsyId);
    //obs.subscribe((data)=>console.log(data));
    return obs;
  }
}
