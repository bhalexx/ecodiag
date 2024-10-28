import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ENVIRONMENT } from '../../../environment/environment.config';
import { Environment } from '../../../environment/environment.model';
import { ReportComponent } from '../../../report/components/report.component';
import { Category } from '../../../shared/model/category.model';
import { USE_GENERIC_LIST_CACHE } from '../../../shared/services/api/abstract-list-service';
import { LocalStorageService } from '../../../shared/services/localstorage.service';
import { ScoringService } from '../../../shared/services/scoring.service';
import { CategoryListService } from '../../services/category-list.service';
import { CriterionValue } from '../show/show.component';

@Component({
    templateUrl: './list.template.html',
    standalone: true,
    imports: [
        RouterLink,
        AsyncPipe,
        DecimalPipe,
        ReportComponent,
    ],
    providers: [
        CategoryListService,
        USE_GENERIC_LIST_CACHE,
    ],
})
export class ListComponent implements OnInit {
    answers: Array<CriterionValue> = [];
    categories$: Observable<Array<Category>>;
    globalProgression: number;
    globalScore: number;

    getCriteriaValue(category: number): Array<CriterionValue> {
        return JSON.parse(this.storage.getItem(`${this.environment.storage.category}_${category}`));
    }

    ngOnInit(): void {
        this.categories$ = this.service.getList()
            .pipe(tap((categories: Array<Category>): void => {
                this.globalProgression = 0;
                this.globalScore = 0;
                categories.forEach((category: Category): void => {
                    category.progression = this.progress(category.id);
                    this.globalProgression += category.progression;

                    category.score = this.score(category.id);
                    this.globalScore += category.score;

                    const categoryAnswers = this.getCriteriaValue(category.id);
                    if (null !== categoryAnswers) {
                        this.answers.push(...categoryAnswers);
                    }
                });

                this.globalProgression = (this.globalProgression / (categories.length * 100)) * 100;
                this.globalScore = (this.globalScore / (categories.length * 100)) * 100;
            }));
    }

    progress(category: number): number {
        const criteriaValues = this.getCriteriaValue(category);

        if (null === criteriaValues) {
            return 0;
        }

        return criteriaValues.filter((criterionValue: CriterionValue) =>
            null !== criterionValue.status).length / criteriaValues.length * 100;
    }

    score(category: number): number {
        return this.scoring.compute(this.getCriteriaValue(category));
    }

    constructor(
        protected service: CategoryListService,
        private storage: LocalStorageService,
        private scoring: ScoringService,
        @Inject(ENVIRONMENT) private environment: Environment,
    ) {
    }
}
