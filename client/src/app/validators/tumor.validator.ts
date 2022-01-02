import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const Ki67Validator : ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {

    const data : string = control.value.trim();

    if (data !== 'nepoznato') {
        const asNumber : number = parseFloat(data);
        if (Number.isNaN(asNumber) || asNumber < 0 || asNumber > 100) {
            return {
                ki67: {
                    message: "Ki67 mora biti numericka vrednost izmedju 0 i 100"
                }
            };
        }
    }

    return null;
}

// TODO: proveriti da li uneseni broj biopsije zapravo postoji u sivm biopsijama za datog pacijenta
// i razdvojiti na 2 poruke
export const BiopsyNumberInTumorForm : ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {

    const data : string = control.value.trim();

    if (!data.match(new RegExp("^[0-9]+/[0-9]+$"))) {
        return {
            biopsyIndex: {
                message: "Broj biopsije mora biti u formatu \n'broj/godina'\n i mora biti medju biopsijama unetim za ovog pacijenta"
            }
        };
    }

    return null;
}