import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { finalize, switchMap } from 'rxjs';
import { CriterionValue } from '../../categories/components/show/show.component';
import { AbstractFormBuilderComponent } from '../../shared/components/form/abstract-form-builder.component';
import { ReportService } from '../services/report.service';

@Component({
    selector: 'report',
    templateUrl: './report.template.html',
    standalone: true,
    imports: [
        DecimalPipe,
        ReactiveFormsModule,
    ],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => ReportComponent),
    }],
})
export class ReportComponent extends AbstractFormBuilderComponent implements OnInit {
    @Input({required: true}) score: number;
    @Input({required: true}) answers: Array<CriterionValue>;
    @Output() formReset: EventEmitter<void> = new EventEmitter<void>();
    loading = false;

    onReset(): void {
        this.formReset.emit();
    }

    onSubmit(): void {
        this.loading = true;
        this.service.validate(this.getFormData() as unknown as { criteria: Array<CriterionValue>; website: string; })
            .pipe(
                finalize(() => this.loading = false),
                switchMap((id: number) => this.service.export(id)),
            )
            .subscribe((data) =>console.log(data));
    }

    protected createForm(): object {
        return {
            criteria: this.answers,
            website: null,
        };
    }

    constructor(
        fb: FormBuilder,
        private service: ReportService,
    ) {
        super(fb);
    }
}
