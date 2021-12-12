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
    public date : Date;
    public side : BiopsySide;
    public comment : string;

    public biopsyTypeLeft : BiopsyType;
    public numLeft : string;   // string posto se trazi u obliku  broj/godina (?)
    public histotypeLeft : BiopsyHistotype;
    public multifocalityLeft : string;  // jer hoce da bude broj ili podrazumevano 'ne'

    public biopsyTypeRight : BiopsyType;
    public numRight : string;   
    public histotypeRight : BiopsyHistotype;
    public multifocalityRight : string;  

    constructor(date : Date, side : BiopsySide, 
        biopsyTypeLeft : BiopsyType, numLeft : string, histotypeLeft : BiopsyHistotype, multifocalityLeft : string,
        biopsyTypeRight : BiopsyType, numRight : string, histotypeRight : BiopsyHistotype, multifocalityRight : string,
        comment : string) {
        this.date = date
        this.side = side;
        this.comment = comment;
        
        this.biopsyTypeLeft = biopsyTypeLeft;
        this.numLeft = numLeft;
        this.histotypeLeft = histotypeLeft;
        this.multifocalityLeft = multifocalityLeft;
        
        this.biopsyTypeRight = biopsyTypeRight;
        this.numRight = numRight;
        this.histotypeRight = histotypeRight;
        this.multifocalityRight = multifocalityRight;
    }
  }
  