export enum Gender {
  Male = 'm',
  Female = 'z',
}

export enum Menopause {
  None = 0,
  Pre = 1,
  Post = 2,
  Peri = 3,
}

export enum TStage {
  Type0 = '1',
  Type1 = '1a',
  Type2 = '1b',
  Type3 = '1c',
  Type4 = '2',
  Type5 = '3',
  Type6 = '4',
  Type7 = '4a',
  Type8 = '4b',
  Type9 = '4c',
  Type10 = '4d',
}

export enum NStage {
  Type0 = 0,
  Type1 = 1,
  Type2 = 2,
  Type3 = 3,
}

export enum MStage {
  Type0 = 0,
  Type1 = 1,
}

export enum ClinicalStage {
  Type0 = 'IA',
  Type1 = 'IIA',
  Type2 = 'IIB',
  Type3 = 'IIIA',
  Type4 = 'IIIB',
  Type5 = 'IIIC',
}

export class Patient {
  public _id: string = ''; // mora zato sto server salje i _id iz baze

  // deo koji se odnosi na karton i ne popunjava se eksplicitno vec u zahtevu
  public date: Date = new Date();
  public index: Number = 0;
  public _biopsyIds: string[] = [];
  public _tumorIds: string[] = [];
  public _therapyIds: string[] = [];

  // deo koji se odnosi na klicnicko stanje i popunjava se eksplicitno tek nakon otvaanja kartona i slanja patch zahteva
  // treba da se prikaze na ekranu tek kada je isClinicalStateSet = true, tj posle patch zahteva
  public isClinicalStateSet = false;
  public tStage: TStage = TStage.Type0;
  public nStage: NStage = NStage.Type0;
  public mStage: MStage = MStage.Type0;
  public tnmStage: string =
    'T' + this.tStage + 'N' + this.nStage + 'M' + this.mStage;
  public clinicalStage: ClinicalStage = ClinicalStage.Type0;

  // konstruktor treba da se korsiti samo prilikom slanja zahteva za ubacivanje pacijenta u bazu, u svim ostalim situacijama
  // koristimo objekte koji pristizu koji imaju popunjena i ona polja iznad
  constructor(
    public jmbg: string,
    public name: string,
    public parentName: string,
    public surname: string,
    public yearOfBirth: number,
    public gender: Gender,
    public menopause: Menopause,
    public address: string,
    public city: string,
    public contact: string,
    public email: string,
    public tumorDateDiagnosis: Date, // mozda da se ovo izbaci iz formulara za unos pacijenta i da se stavi u okviru clinical state-a, tj da se unosi tokom patch zahteva (?)
    public familyAnamnesis: string
  ) {}
}

/* Ako je u pitanju pacijentkinja, potrebno je 
 uneti informacije o menopauzi - podržati radio 
 dugmiće sa opcijama 1: pre, 2: post, 3: peri 
 (prva vrednost predstavlja vrednost opcije, a druga labelu) */

/* Promeniti da adresa boravka bude opciona. 
	Postaviti da Beograd bude podrazumevani grad. */

export interface PatientPagination {
  docs: Patient[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
