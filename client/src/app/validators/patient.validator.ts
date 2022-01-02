import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const JMBGValidator : ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {

    const data : string = control.value.trim();

    // TODO: ako ostane vremena, implementirati detaljno ispitivanje formata jmbga sa kontrolnom cifrom,
    // vidi na wiki
    if (!data.match(new RegExp("^[0-9]{13}"))) {
        return {
            jmbg: {
                message: "JMBG mora biti u validnom formatu"
            }
        };
    }

    return null;
}