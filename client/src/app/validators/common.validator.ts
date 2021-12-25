import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const MustBeNumber : ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {

    const data : string = control.value.trim();

    if (!data.match(new RegExp("^[0-9]+|[0-9]+.[0-9]+"))) {
        return {
            message: "Polje mora sadrzati numericku vrednost!"
        };
    }

    return null;
}