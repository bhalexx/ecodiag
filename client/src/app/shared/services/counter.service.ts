import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CounterService {
    categories(): Observable<number> {
        return this.http.get('api/categories/count').pipe(take(1)) as Observable<number>;
    }

    criteria(): Observable<number> {
        return this.http.get('api/criteria/count').pipe(take(1)) as Observable<number>;
    }

    constructor(
        private http: HttpClient,
    ) {
    }
}
