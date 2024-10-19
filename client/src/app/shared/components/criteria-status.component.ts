import { NgClass } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CriterionValue } from '../../categories/components/show/show.component';
import { CriterionStatus } from '../model/criterion-status.model';
import { AbstractValueAccessorComponent } from './form/abstract-value-accessor.component';

@Component({
    selector: 'criteria-status',
    standalone: true,
    template: `
        <!-- <div role="group"> -->
            @for (status of statuses; track status.value) {
                <!-- <button [ngClass]="status.value === value ? status.color : 'outline'"> -->
                <label [for]="groupName + '.' + status.value">
                    <input type="radio"
                           [name]="groupName"
                           [id]="groupName + '.' + status.value"
                           [value]="status.value"
                           (change)="onChange($event.target.value)"
                           [checked]="value === status.value"
                    />
                    {{ status.label }}</label>
                <!-- </button> -->
            }
        <!-- </div> -->`,
    imports: [
        NgClass,
        FormsModule,
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => CriteriaStatusComponent),
    }],
})
export class CriteriaStatusComponent extends AbstractValueAccessorComponent {
    @Input({required: true}) criterion: CriterionValue;
    @Input() groupName: null|string = null;
    @Output() valueChange: EventEmitter<CriterionValue> = new EventEmitter<CriterionValue>();

    statuses = [
        {value: CriterionStatus.COMPLIANT, label: 'Conforme', color: 'success'},
        {value: CriterionStatus.PENDING, label: 'En cours', color: 'warning'},
        {value: CriterionStatus.UNCOMPLIANT, label: 'Non conforme', color: 'danger'},
        {value: CriterionStatus.NOT_APPLICABLE, label: 'Non applicable', color: 'primary'},
    ];
    value: number = null;

    registerOnChange(fn: any): void {
        this.onChange = (value: string) => {
            this.value = parseInt(value);
            fn(this.value);
            this.valueChange.emit({ id: this.criterion.id, status: this.value});
        };
    }

    writeValue(value): void {
        this.value = value;
    }
}
