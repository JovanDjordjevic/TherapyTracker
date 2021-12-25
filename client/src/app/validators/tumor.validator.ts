import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const Ki67Validator : ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {

    const data : string = control.value.trim();

    if (data !== 'nepoznato') {
        const asNumber : number = parseFloat(data);
        if (asNumber === NaN || asNumber < 0 || asNumber > 100) {
            return {
                message: "Ki67 mora biti numericka vrednost izmedju 0 i 100"
            };
        }
    }

    return null;
}
