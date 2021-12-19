export enum TherapyType {
    AC = "AC",
    FAC = "FAC",
    EC = "EC"
}

export enum TherapyResponse {
    CR = "CR",
    DCIS = "DCIS",
    MCG = "Grupe malignih celija",  // (nije najjasnije iz dokumenta ?)
    pPR = "pPR",
    NoChange = "Nema promene"
}

export class Therapy {
    public _id = '';
    public _patientId = '';

    // odgovor na terapiju ce moci da se unese naknadno preko patch zahteva
    public isTherapyResponseSet : boolean = false;
    public therapyResponse : TherapyResponse = TherapyResponse.NoChange;

    // za slanje zahteva za ubacivanje u bazu
    constructor(
        public numCycles : number,
        public usingNeoadjuvant : boolean,  // (?)
        public numTaxol : number,
        public numTxtr : number,
        public herceptinTherapy : string,  // jer hoce numericku vrednost ili 'nije primenljivo'
        public comment : string,
    ) {}
}