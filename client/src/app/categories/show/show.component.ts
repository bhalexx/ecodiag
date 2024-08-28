import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import * as categoriesData from '../../../client-assets/data/categories.json';
import * as criteriasData from '../../../client-assets/data/criteria.json';
import { CriteriaStatusComponent } from '../../shared/components/criteria-status.component';
import { Category } from '../../shared/model/category.model';
import { Criteria } from '../../shared/model/criteria.model';

@Component({
    templateUrl: './show.template.html',
    standalone: true,
    imports: [
        RouterLink,
        CriteriaStatusComponent,
    ],
})
export class ShowComponent implements OnInit {
    categories: Array<Category> = (categoriesData as any).default;
    category: Category = null;
    categoryCriteria: Array<Criteria> = [];
    criterias: Array<{id: Array<Criteria>;}> = (criteriasData as any).default;

    ngOnInit(): void {
        this.category = this.categories.filter((cat: Category) => parseInt(this.route.snapshot.params.id, 10) === cat.id)[0];
        this.categoryCriteria = this.criterias[0][this.category.id];
    }

    constructor(
        private route: ActivatedRoute,
    ) {
    }
}
