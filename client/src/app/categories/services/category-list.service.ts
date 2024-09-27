import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Category } from '../../shared/model/category.model';

@Injectable({providedIn: 'root'})
export class CategoryListService {
    private endpoint: string;

    list(): Observable<Array<Category>> {
        return this.http.get(`${this.endpoint}/list`).pipe(take(1)) as Observable<Array<Category>>;
    }

    constructor(
        protected http: HttpClient,
    ) {
        this.endpoint = '/api/categories';
    }
}
