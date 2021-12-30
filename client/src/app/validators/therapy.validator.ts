import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const HerceptinTherapyValidator : ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {

    const data : string = control.value.trim();
    
    if (data !== 'nije primenljivo') {
        const asNumber : number = parseFloat(data);
        if (Number.isNaN(asNumber)) {
            return {
                herceptinTherapy: {
                    message: "Vrednost ovog polja moze biti numericka vrednost ili \'nije primenljivo\'"
                }
            };
        }
    }

    return null;
}
