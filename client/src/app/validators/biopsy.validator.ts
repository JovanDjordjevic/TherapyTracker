import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const BiopsyNumberValidator : ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {

    const data : string = control.value.trim();

    if (!data.match(new RegExp("^[0-9]+/[0-9]+$"))) {
        return {
            biopsyNumber: {
                message: "Broj biopsije mora biti u formatu: broj/godina!"
            }
        };
    }

    return null;
}

export const BiopsyMultifocalityValidator : ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {

    const data : string = control.value.trim();

    if (!data.match(new RegExp("^ne|[0-9]+"))) {
        return {
            biopsyNumber: {
                message: "Vrednost za multifokalnost moze biti 'ne' ili neki broj!"
            }
        };
    }

    return null;
}