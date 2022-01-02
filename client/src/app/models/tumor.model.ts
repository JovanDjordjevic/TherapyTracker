export enum Gradus {
    Type1 = '1',
    Type2 = '2',
    Type3 = '3',
    Unknown = 'Nepoznato'
}

export enum HER2_FISH_SICH {
    Positive = "Pozitivno",
    Negative = "Negativno",
    Unusable = "Nije primenljivo",
}

export enum Her2Status {
    Zero = 0,
    One = 1,
}

export class Tumor {
    public _id = '';

    // NOTE: Er status: 0 ako je vrednost Er skora izražena u procentima strogo manja od 1, inače 1 (ako je gradus nepoznato vrednost treba da bude 0)
    // ovu vrednost računati i prikazivati na osnovu korisničkog unosa npr. u nekom polju koje je disejblovano
    // NOTE: Pgr status: 0 ako je vrednost Pgr skora izražena u procentima strogo manja od 1, inače 1 (ako je gradus nepoznato vrednost treba da bude 0)
    // ovu vrednost računati i prikazivati na osnovu korisničkog unosa npr. u nekom polju koje je disejblovano
    constructor(
        public date : Date,
        public name : string,
        public biopsyIndex : string,
        public gradus : Gradus, 
        public erScore : number, 
        public erScorePercent : number,
        public erStatus : number, 
        public pgrScore : number,
        public pgrScorePercent : number,
        public pgrStatus : number,
        public her2INC : number,
        public her2INCPercent : number,
        public her2_FISH_SICH : HER2_FISH_SICH,     // ne razumem zahtev u dokumentu, koja funkcija (?)
        public her2Status : Her2Status,             // ne razumem zahtev u dokumentu, koja funkcija (?)
        public ki67 : string,               // jer kaze vrednost u procentima ili nepoznato
        public molecularSubtype : number,
    ) {}
}

export interface TumorPagination {
    docs: Tumor[],
    totalDocs: number,
    limit: number,
    totalPages: number,
    page: number,
    pagingCounter: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    prevPage: number | null,
    nextPage: number | null,
  };