import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category.model';
import { AbstractListService } from '../../shared/services/api/abstract-list-service';

@Injectable({providedIn: 'root'})
export class CategoryListService extends AbstractListService<Category> {
    constructor(
        http: HttpClient,
    ) {
        super('/api/categories', http);
    }
}
