import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ENVIRONMENT } from '../../../environment/environment.config';
import { Environment } from '../../../environment/environment.model';
import { Category } from '../../../shared/model/category.model';
import { USE_GENERIC_LIST_CACHE } from '../../../shared/services/api/abstract-list-service';
import { LocalStorageService } from '../../../shared/services/localstorage.service';
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

    ngOnInit(): void {
        this.categories$ = this.service.getList()
            .pipe(tap((categories: Array<Category>) => {
                this.storage.setItem(this.environment.storage.categories, categories.length.toString(10));
                categories.forEach((category: Category) => {
                    category.progression = this.progress(category);
                });
            }));
    }

    progress(category: Category): number {
        const criteriaValues = JSON.parse(this.storage.getItem(`${this.environment.storage.category}${category.id}`));

        if (null === criteriaValues) {
            return 0;
        }

        return criteriaValues.filter((criterionValue: CriterionValue) => null !== criterionValue.status).length / criteriaValues.length * 100;
    }

    constructor(
        protected service: CategoryListService,
        private storage: LocalStorageService,
        @Inject(ENVIRONMENT) private environment: Environment,
    ) {
    }
}
