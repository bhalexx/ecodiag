import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CriteriaStatusComponent } from '../../../shared/components/criteria-status.component';
import { AbstractFormBuilderComponent } from '../../../shared/components/form/abstract-form-builder.component';
import { Category } from '../../../shared/model/category.model';
import { Criterion } from '../../../shared/model/criterion.model';
import { LocalStorageService } from '../../../shared/services/localstorage.service';
import { CategoryListService } from '../../services/category-list.service';

export class CriterionValue { id: number; status: null|number; }

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
    categoryStorageKey: string;
    criteriaValues: Array<CriterionValue> = [];
    form: FormGroup;

    get progress(): number {
        return this.criteriaValues.filter((criterionValue: CriterionValue) => null !== criterionValue.status).length / this.criteriaValues.length * 100;
    }

    change(criterion: CriterionValue): void {
        if (0 === this.criteriaValues.length) {
            this.criteriaValues.push({ id: criterion.id, status: criterion.status });
        } else {
            this.criteriaValues = this.criteriaValues.map((value: CriterionValue) => value.id === criterion.id
                ? {...value, status: criterion.status }
                : value,
            );
        }

        this.saveChanges();
    }

    createForm(): object {
        let criteria = {};
        this.criteriaValues.forEach((criterionValue: CriterionValue) => {
            criteria = {...criteria, [`criterion_${[criterionValue.id]}`]: criterionValue.status };
        });

        return criteria;
    }

    ngOnInit(): void {
        this.category$ = this.service.get(parseInt(this.route.snapshot.params.id, 10))
            .pipe(tap((category: Category): void => {
                this.categoryStorageKey = `ECO_cat_${category.id}`;
                this.criteriaValues = category.criteria.map((criterion: Criterion) => ({ id: criterion.id, status: null }));

                if (null !== this.storage.getItem(this.categoryStorageKey)) {
                    this.criteriaValues = JSON.parse(this.storage.getItem(this.categoryStorageKey));
                }

                this.saveChanges();
                super.ngOnInit();
            }));
    }

    onSubmit(): void {
        console.log(this.getFormData());
    }

    saveChanges(): void {
        this.storage.setItem(this.categoryStorageKey, JSON.stringify(this.criteriaValues));
    }

    constructor(
        private service: CategoryListService,
        fb: FormBuilder,
        private route: ActivatedRoute,
        private storage: LocalStorageService,
    ) {
        super(fb);
    }
}
