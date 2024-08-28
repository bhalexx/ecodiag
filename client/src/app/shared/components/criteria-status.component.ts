import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { CriteriaStatus } from '../model/criteria-status.model';

@Component({
    selector: 'criteria-status',
    standalone: true,
    template: `
        <div role="group">
            @for (status of statuses; track status.value) {
                <button [ngClass]="value === status.value ? status.color : 'outline'"
                        (click)="update(status.value)">{{ status.label }}
                </button>
            }
        </div>`,
    imports: [
        NgClass,
    ],
})
export class CriteriaStatusComponent {
    statuses = [
        {value: CriteriaStatus.COMPLIANT, label: 'Conforme', color: 'success'},
        {value: CriteriaStatus.PENDING, label: 'En cours', color: 'warning'},
        {value: CriteriaStatus.UNCOMPLIANT, label: 'Non conforme', color: 'danger'},
        {value: CriteriaStatus.NOT_APPLICABLE, label: 'Non applicable', color: 'primary'},
    ];
    value: number;

    update(value: number) {
        this.value = value;
    }
}
