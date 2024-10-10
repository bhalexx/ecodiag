import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../../../shared/model/category.model';
import { USE_GENERIC_LIST_CACHE } from '../../../shared/services/api/abstract-list-service';
import { CategoryListService } from '../../services/category-list.service';

@Component({
    templateUrl: './list.template.html',
    standalone: true,
    imports: [
        RouterLink,
        AsyncPipe,
    ],
    providers: [
        CategoryListService,
        USE_GENERIC_LIST_CACHE,
    ],
})
export class ListComponent implements OnInit {
    categories$: Observable<Array<Category>>;

    ngOnInit(): void {
        this.categories$ = this.service.getList();
    }

    constructor(
        protected service: CategoryListService,
    ) {
    }
}
