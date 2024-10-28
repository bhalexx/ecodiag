import { AsyncPipe, DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Observable, tap } from 'rxjs';
import { ENVIRONMENT } from '../../../environment/environment.config';
import { Environment } from '../../../environment/environment.model';
import { CriteriaStatusComponent } from '../../../shared/components/criteria-status.component';
import { AbstractFormBuilderComponent } from '../../../shared/components/form/abstract-form-builder.component';
import { Category } from '../../../shared/model/category.model';
import { CriterionStatus } from '../../../shared/model/criterion-status.model';
import { Criterion } from '../../../shared/model/criterion.model';
import { LocalStorageService } from '../../../shared/services/localstorage.service';
import { ScoringService } from '../../../shared/services/scoring.service';
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
        NgTemplateOutlet,
        DecimalPipe,
    ],
    providers: [
        CategoryListService,
    ],
})
export class ShowComponent extends AbstractFormBuilderComponent implements OnInit {
    private categoryStorageKey: string;
    private criteriaValues: Array<CriterionValue> = [];
    private id: number;

    category$: Observable<Category>;
    form: FormGroup;
    hasNext: boolean;
    previous: number;
    score: number;

    get progress(): number {
        return this.criteriaValues.filter((criterionValue: CriterionValue) =>
            null !== criterionValue.status).length / this.criteriaValues.length * 100;
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

        this.score = this.scoring.compute(this.criteriaValues);
        this.saveChanges();
    }

    createForm(): object {
        let criteria = {};
        this.criteriaValues.forEach((criterionValue: CriterionValue) => {
            criteria = {...criteria, [`criterion_${[criterionValue.id]}`]: criterionValue.status };
        });

        return criteria;
    }

    fetch(): void {
        this.category$ = this.service.get(parseInt(this.route.snapshot.params.id, 10))
            .pipe(tap((category: Category): void => {
                this.id = category.id;
                this.hasNext = this.id < parseInt(this.storage.getItem(this.environment.storage.count.categories));
                this.previous = 1 < this.id ? this.id - 1 : null;
                this.categoryStorageKey = `${this.environment.storage.category}_${this.id}`;
                this.criteriaValues = category.criteria.map((criterion: Criterion) => ({ id: criterion.id, status: null }));

                if (null !== this.storage.getItem(this.categoryStorageKey)) {
                    this.criteriaValues = JSON.parse(this.storage.getItem(this.categoryStorageKey));
                }

                this.score = this.scoring.compute(this.criteriaValues);
                this.saveChanges();
                super.ngOnInit();
            }));
    }

    // Delete
    forceCompletion(): void {
        this.criteriaValues.forEach((criterion: CriterionValue) => {
            criterion.status = CriterionStatus.COMPLIANT;
            this.form.controls['criterion_' + criterion.id].setValue(criterion.status);
        });
        this.saveChanges();
    }

    ngOnInit(): void {
        this.fetch();

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => this.fetch());
    }

    onSubmit(): void {
        if (this.hasNext) {
            this.router.navigate([`/categorie/${this.id + 1}`]);

            return;
        }
        this.router.navigate(['/']);
    }

    saveChanges(): void {
        this.storage.setItem(this.categoryStorageKey, JSON.stringify(this.criteriaValues));
    }

    constructor(
        fb: FormBuilder,
        private service: CategoryListService,
        private route: ActivatedRoute,
        private router: Router,
        private storage: LocalStorageService,
        private scoring: ScoringService,
        @Inject(ENVIRONMENT) private environment: Environment,
    ) {
        super(fb);
    }
}
