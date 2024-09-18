import { Directive, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Directive()
export abstract class AbstractFormBuilderComponent implements OnInit {
    form: UntypedFormGroup;

    ngOnInit(): void {
        this.form = this.buildForm(this.createForm());
        this.afterFormBuilt();
    }

    protected afterFormBuilt(): void { /* nothing to do */ }

    protected buildForm(form: object|Array<any>): UntypedFormGroup {
        const formGroup = {};

        for (const input in form) {
            if (!form.hasOwnProperty(input)) {
                continue;
            }
            if (form[input] instanceof UntypedFormControl) {
                formGroup[input] = form[input];
            } else if (null !== form[input] && 'object' === typeof form[input] && !Array.isArray(form[input])) {
                formGroup[input] = this.buildForm(form[input]);
            } else if (null !== form[input] && 'object' === typeof form[input] && Array.isArray(form[input])) {
                let array: Array<AbstractControl> = [];
                for (const subInput of form[input]) {
                    if (null !== subInput && 'object' === typeof subInput) {
                        array = [...array, this.buildForm(subInput)];
                    } else {
                        array = [...array, this.fb.control(subInput)];
                    }
                }
                formGroup[input] = this.fb.array(array);
            } else {
                formGroup[input] = form[input];
            }
        }

        return this.fb.group(formGroup);
    }

    protected getFormData(): object {
        return this.form.value;
    }

    protected abstract createForm(): object;

    protected constructor(protected fb: UntypedFormBuilder) {}
}
