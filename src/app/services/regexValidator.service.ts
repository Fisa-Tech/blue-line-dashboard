import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

export function regexValidator(regex: RegExp): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const field = control.value;
    if (!field) {
      return of(null);
    }
    const isValid = regex.test(field);

    return of(isValid ? null : { passwordInvalid: true }).pipe(
      map(result => (isValid ? null : result))
    );
  };
}
