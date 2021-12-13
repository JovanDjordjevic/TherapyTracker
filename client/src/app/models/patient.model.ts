export enum Gender {
  Male = 'M',
  Female = 'Z',
}

export class Patient {
  constructor(
    public JMBG: string,
    public name: string,
    public parentName: string,
    public lastName: string,
    public birthYear: number,
    public gender: Gender,
    public adress: string,
    public city: string,
    public phone: string,
    public email: string,
    public dateOfDiagnosis: Date,
    public medicalHistory: string
  ) {}
}

/* Ako je u pitanju pacijentkinja, potrebno je 
 uneti informacije o menopauzi - podržati radio 
 dugmiće sa opcijama 1: pre, 2: post, 3: peri 
 (prva vrednost predstavlja vrednost opcije, a druga labelu) */

/* Promeniti da adresa boravka bude opciona. 
	Postaviti da Beograd bude podrazumevani grad. */
