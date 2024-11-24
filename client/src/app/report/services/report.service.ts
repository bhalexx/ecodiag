import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { CriterionValue } from '../../categories/components/show/show.component';
import { DownloadService } from '../../shared/services/download.service';

@Injectable({providedIn: 'root'})
export class ReportService extends DownloadService {
    private endpoint: string;

    export(id: number): Observable<void> {
        return this.save(`${this.endpoint}/export/${id}`, {}, true) as Observable<void>;
    }

    validate(data: { criteria: Array<CriterionValue>; website: string; }): Observable<number> {
        return this.http.post(`${this.endpoint}/validate`, data).pipe(take(1)) as Observable<number>;
    }

    constructor(
        http: HttpClient,
    ) {
        super(http);
        this.endpoint = 'api/report';
    }
}
