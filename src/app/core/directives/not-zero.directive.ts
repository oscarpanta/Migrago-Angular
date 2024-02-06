import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

export function notZeroValidator(): Validator {
  return new NotZeroDirective();
}

@Directive({
  selector: '[appNotZero]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NotZeroDirective, multi: true }]
})
export class NotZeroDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value === 0 ? { notZero: true } : null;
  }

}
