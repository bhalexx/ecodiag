import { Component } from '@angular/core';
import { Category } from '../shared/model/category.model';
import * as categoriesData from './../../client-assets/data/categories.json';

@Component({
    templateUrl: './categories.template.html',
    standalone: true,
})
export class CategoriesComponent {
    categories: Array<Category> = (categoriesData as any).default;
}
