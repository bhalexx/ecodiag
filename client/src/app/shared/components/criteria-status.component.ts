import { NgClass } from '@angular/common';
import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CriteriaStatus } from '../model/criteria-status.model';
import { AbstractCheckboxesComponent } from './form/abstract-checkboxes.component';

@Component({
    selector: 'criteria-status',
    standalone: true,
    template: `
        <div role="group">
            @for (status of statuses; track status.value) {
                <button role="button" [ngClass]="status.value === value ? status.color : 'outline'">
                    <input type="radio"
                           [name]="groupName + '.' + status.value"
                           [id]="groupName + '.' + status.value"
                           [value]="status.value"
                           (change)="change($event)"
                           [checked]="checked(status.value)"
                    />
                    <label [for]="groupName + '.' + status.value">{{ status.label }}</label>
                </button>
            }
        </div>`,
    imports: [
        NgClass,
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => CriteriaStatusComponent),
    }],
})
export class CriteriaStatusComponent extends AbstractCheckboxesComponent {
    protected static WITH_ID = false;
    @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

    statuses = [
        {value: CriteriaStatus.COMPLIANT, label: 'Conforme', color: 'success'},
        {value: CriteriaStatus.PENDING, label: 'En cours', color: 'warning'},
        {value: CriteriaStatus.UNCOMPLIANT, label: 'Non conforme', color: 'danger'},
        {value: CriteriaStatus.NOT_APPLICABLE, label: 'Non applicable', color: 'primary'},
    ];
    value: number = null;

    registerOnChange(fn: any): void {
        this.onChange = (value: any) => {
            this.valueChange.emit(value);
            this.value = value;
            fn(value);
        };
    }

    // update(value: number): void {
    //     this.value = value;
    //     this.valueChange.emit(value);
    // }
}
