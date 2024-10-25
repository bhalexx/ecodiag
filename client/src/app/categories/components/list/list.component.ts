import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ENVIRONMENT } from '../../../environment/environment.config';
import { Environment } from '../../../environment/environment.model';
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
    ],
    providers: [
        CategoryListService,
        USE_GENERIC_LIST_CACHE,
    ],
})
export class ListComponent implements OnInit {
    categories$: Observable<Array<Category>>;
    globalProgression: number;
    globalScore: number;

    export(): void {
        console.log('export');
    }

    ngOnInit(): void {
        this.categories$ = this.service.getList()
            .pipe(tap((categories: Array<Category>): void => {
                this.globalProgression = 0;
                this.globalScore = 0;
                categories.forEach((category: Category): void => {
                    category.progression = this.progress(category);
                    this.globalProgression += category.progression;
                    category.score = this.score(category);
                    this.globalScore += category.score;
                });

                this.globalProgression = (this.globalProgression / (categories.length * 100)) * 100;
                this.globalScore = (this.globalScore / (categories.length * 100)) * 100;
            }));
    }

    progress(category: Category): number {
        const criteriaValues = JSON.parse(this.storage.getItem(`${this.environment.storage.category}_${category.id}`));

        if (null === criteriaValues) {
            return 0;
        }

        return criteriaValues.filter((criterionValue: CriterionValue) =>
            null !== criterionValue.status).length / criteriaValues.length * 100;
    }

    score(category: Category): number {
        const criteriaValues = JSON.parse(this.storage.getItem(`${this.environment.storage.category}_${category.id}`));

        return this.scoring.compute(criteriaValues);
    }

    constructor(
        protected service: CategoryListService,
        private storage: LocalStorageService,
        private scoring: ScoringService,
        @Inject(ENVIRONMENT) private environment: Environment,
    ) {
    }
}
