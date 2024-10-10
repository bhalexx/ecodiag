import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CriteriaStatusComponent } from '../../../shared/components/criteria-status.component';
import { AbstractFormBuilderComponent } from '../../../shared/components/form/abstract-form-builder.component';
import { Category } from '../../../shared/model/category.model';
import { Criteria } from '../../../shared/model/criteria.model';
import { CategoryListService } from '../../services/category-list.service';

export class CriteriaValue { id: number; status: null|number };

@Component({
    templateUrl: './show.template.html',
    standalone: true,
    imports: [
        RouterLink,
        CriteriaStatusComponent,
        ReactiveFormsModule,
        AsyncPipe,
    ],
    providers: [
        CategoryListService,
    ],
})
export class ShowComponent extends AbstractFormBuilderComponent implements OnInit {
    category$: Observable<Category>;
    criteriaValues: Array<CriteriaValue> = [];

    form: UntypedFormGroup;

    change(criteria: { criteria: Criteria, value: number }): void {
        this.criteriaValues = this.criteriaValues.map((value: CriteriaValue) => value.id === criteria.criteria.id
            ? {...value, status: criteria.value }
            : value
        );
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.category$ = this.service.get(parseInt(this.route.snapshot.params.id, 10))
            .pipe(tap((category: Category) => {
                this.criteriaValues = category.criteria.map((criteria: Criteria) => ({ id: criteria.id, status: null }));
            }));
    }

    onSubmit(): void {
        console.log(this.form.value());
    }

    protected createForm(): object {
        return {
            criterias: this.fb.control([]),
        };
    }

    constructor(
        protected service: CategoryListService,
        fb: FormBuilder,
        private route: ActivatedRoute,
    ) {
        super(fb);
    }
}
