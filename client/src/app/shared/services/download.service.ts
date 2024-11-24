import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { HttpParams } from '../model/http/http-params';

@Injectable({providedIn: 'root'})
export abstract class DownloadService {
    save(url: string, params: Record<string, any> = {}, newTab = false): Observable<void> {
        const httpParams = new HttpParams(params);

        return this.http.head(url, {params: httpParams.getParams()})
            .pipe(
                take(1),
                catchError(response => {
                    console.log(response.headers.get('error') || `${response.status} ${response.statusText}`);

                    return EMPTY;
                }),
                tap(() => {
                    const href = `${url}?${httpParams.toString()}`;
                    if (newTab) {
                        window.open(href, '_blank');
                    } else {
                        window.location.href = href;
                    }
                }),
            ) as Observable<void>;
    }

    protected constructor(
        protected http: HttpClient,
    ) {}
}
