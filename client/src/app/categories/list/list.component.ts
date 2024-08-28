import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../shared/model/category.model';
import * as categoriesData from '../../../client-assets/data/categories.json';

@Component({
    templateUrl: './list.template.html',
    standalone: true,
    imports: [
        RouterLink,
    ],
})
export class ListComponent {
    categories: Array<Category> = (categoriesData as any).default;
}
