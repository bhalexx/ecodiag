import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { CriterionValue } from '../../categories/components/show/show.component';

@Injectable({providedIn: 'root'})
export class ReportService {
    private endpoint: string;

    export(id: number): Observable<void> {
        return this.http.get(`${this.endpoint}/export/${id}`).pipe(take(1)) as Observable<void>;
    }

    validate(data: { criteria: Array<CriterionValue>; website: string; }): Observable<number> {
        return this.http.post(`${this.endpoint}/validate`, data).pipe(take(1)) as Observable<number>;
    }

    constructor(
        private http: HttpClient,
    ) {
        this.endpoint = 'api/report';
    }
}
