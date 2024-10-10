import { Directive, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export abstract class AbstractValueAccessorComponent implements ControlValueAccessor {
    @Input() readonly = false;

    onChange: (_: any) => void;
    onTouched: () => void;

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    abstract writeValue(obj: any): void;
}
