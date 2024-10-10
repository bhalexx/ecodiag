import { Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { isArray } from '../../pipe/utils';
import { AbstractValueAccessorComponent } from './abstract-value-accessor.component';

@Directive()
export abstract class AbstractCheckboxesComponent extends AbstractValueAccessorComponent {
    protected static PARSE_VALUE = true;
    protected static WITH_ID = true;

    @Input() allowCheckAll = false;
    @Input() groupName: null|string = null;
    @Input() multiple = false;

    @ViewChild('checkAllLabel', {static: false}) set content(content: ElementRef) {
        this.checkAllLabel = content;
    }

    get isAllChecked(): boolean|null {
        if (this.allowCheckAll) {
            throw new Error('isAllChecked must be implemented ' + this.constructor);
        }

        return null;
    }

    protected checkAllLabel: ElementRef;

    // @ts-ignore
    'constructor': typeof AbstractCheckboxesComponent;
    values: any|Array<any>|null = this.multiple ? [] : null;

    change(event: Event): void {
        const input = event.target as HTMLInputElement;
        const inputValue = this.constructor.PARSE_VALUE
            ? parseInt(input.value, 10)
            : input.value;
        if (this.multiple) {
            if (Array.isArray(this.values)) {
                this.values = input.checked ? [...this.values, inputValue] : this.values.filter((v: number) => v !== inputValue);
            } else {
                this.values = input.checked ? [inputValue] : [];
            }
        } else {
            this.values = input.checked ? inputValue : null;
        }
        this.onChange(this.values);
    }

    checkAll(): void {
        if (this.allowCheckAll) {
            throw new Error('checkAll must be implemented for ' + this.constructor);
        }
    }

    checked(object: any): boolean {
        if (this.multiple && isArray(this.values) && 0 === this.values.length) {
            return false;
        } else if (null === this.values) {
            return false;
        }

        return this.multiple && isArray(this.values)
            ? this.values.includes(this.constructor.WITH_ID ? object.id : object)
            : !isArray(this.values) && (this.constructor.WITH_ID ? object.id : object) === this.values;
    }

    writeValue(value: any): void {
        if (!Array.isArray(value)) {
            value = value ? [] : null;
        } else {
            value = value.map(v => this.constructor.PARSE_VALUE ? parseInt(v, 10) : v);
        }

        this.values = value;

        if (this.multiple) {
            if (this.isAllChecked) {
                this.setCheckAllLabel('Tout décocher');
            } else {
                this.setCheckAllLabel('Tout cocher');
            }
        }
    }

    protected setCheckAllLabel(label: string): void {
        if (this.checkAllLabel) {
            this.checkAllLabel.nativeElement.innerText = label;
        }
    }
}
