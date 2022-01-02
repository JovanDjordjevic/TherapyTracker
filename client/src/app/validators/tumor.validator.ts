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
