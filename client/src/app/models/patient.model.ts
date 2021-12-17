export enum Gender {
  Male = 'm',
  Female = 'z',
}

export class Patient {
  constructor(
    public jmbg: string,
    public name: string,
    public parentName: string,
    public surname: string,
    public yearOfBirth: number,
    public gender: Gender,
    public menopause: number,
    public address: string,
    public city: string,
    public contact: string,
    public email: string,
    public tumorDateDiagnosis: Date,
    public familyAnamnesis: string
  ) {}
}

/* Ako je u pitanju pacijentkinja, potrebno je 
 uneti informacije o menopauzi - podržati radio 
 dugmiće sa opcijama 1: pre, 2: post, 3: peri 
 (prva vrednost predstavlja vrednost opcije, a druga labelu) */

/* Promeniti da adresa boravka bude opciona. 
	Postaviti da Beograd bude podrazumevani grad. */
