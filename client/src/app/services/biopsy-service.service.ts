import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Biopsy } from '../models/biopsy.model';

@Injectable({
  providedIn: 'root'
})
export class BiopsyService {

  private readonly urls = {
    getAllBiopsies: "http://localhost:5000/api/biopsy",
    getAllBiopsiesForPatient: "http://localhost:5000/api/biopsy/:name",
    addNewBiopsyForPatient: "http://localhost:5000/api/biopsy/",
    deleteBiopsyForPatient: "http://localhost:5000/api/biopsy/",
  }

  constructor(private http: HttpClient) { }

  public getAllBiopsies() : Observable<Biopsy[]>{
    const obs: Observable<Biopsy[]> = this.http.get<Biopsy[]>(this.urls.getAllBiopsies, {});
    return obs;
  }
  
  public getAllBiopsiesForPatient() : Observable<Biopsy[]>{
    const obs: Observable<Biopsy[]> = this.http.get<Biopsy[]>(this.urls.getAllBiopsiesForPatient, {});
    return obs;
  }

  public addNewBiopsyForPatient() : Observable<Biopsy>{
    const obs: Observable<Biopsy> = this.http.post<Biopsy>(this.urls.addNewBiopsyForPatient, {});
    return obs;
  }

  public deleteBiopsyForPatient() : Observable<Biopsy>{
    const obs: Observable<Biopsy> = this.http.delete<Biopsy>(this.urls.deleteBiopsyForPatient, {});
    return obs;
  }
}
