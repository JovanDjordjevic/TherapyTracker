export enum BiopsyType {
    AxillaBiopsy = "Biopsija aksile",
    BreastBiopsy = "Biopsija dojke",
    SkinBiopsy = "Biopsija koze"
}

export enum BiopsySide {
    Left = "Leva",
    Right = "Desna",
    Both = "Obe"
}

export enum BiopsyHistotype {
    Type0 = "Ca mammae metastaticum lymphonodorum", 
    Type1 = "CDI", 
    Type2 = "LIC", 
    Type3 = "invasivni Ca", 
    Type4 = "mesoviti Ca", 
    Type5 = "drugi morfoloski podtipovi CA", 
    Type6 = "infiltratio carcinomatosis cutis", 
    Type7 = "DIN(atypia, ADH, DCIS)", 
    Type8 = "LIN", 
    Type9 = "Displasia"
}

export class Biopsy {
    public _id : string = '';

    // numLeft i numRight string jer hoce u obliku broj/godina (?) 
    // multifocalityLeft i multifocalityRight isto string jer hoce da bude broj ili 'ne' (?)
    constructor(
        public date : Date,
        public side : BiopsySide,
        public biopsyTypeLeft : BiopsyType,
        public numLeft : string, 
        public histotypeLeft : BiopsyHistotype,
        public multifocalityLeft : string,
        public biopsyTypeRight : BiopsyType,
        public numRight : string,   
        public histotypeRight : BiopsyHistotype,
        public multifocalityRight : string,  
        public comment : string,
    ) {}
}
  
export interface BiopsyPagination {
    docs: Biopsy[],
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
