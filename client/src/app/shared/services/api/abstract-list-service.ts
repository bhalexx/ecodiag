import { HttpClient } from '@angular/common/http';
import { inject, InjectionToken, Provider } from '@angular/core';
import { Observable, take } from 'rxjs';
import { HttpParams } from '../../model/http/http-params';
import { CacheListData } from './cache-list.data';

const GENERIC_LIST_USE_CACHE = new InjectionToken<boolean>('GENERIC_LIST_USE_CACHE');

export const USE_GENERIC_LIST_CACHE: Provider = {
    provide: GENERIC_LIST_USE_CACHE,
    useValue: true,
};

export abstract class AbstractListService<T> {
    static requestingList: Record<string, boolean> = {};

    private cache = inject(CacheListData);
    private useCache = inject(GENERIC_LIST_USE_CACHE, {host: true, optional: true}) || false;

    get(id: string|number): Observable<T> {
        return this.http.get(`${this.endpoint}/${id}`).pipe(take(1)) as Observable<T>;
    }

    getList(params: Record<string, any> = {}): Observable<Array<T>> {
        const httpParams = new HttpParams({...params});
        if (!this.useCache) {
            return this.http.get(`${this.endpoint}/list`,
                {params: httpParams.getParams()})
                .pipe(take(1)) as Observable<Array<T>>;
        }

        const cacheKey = `${this.endpoint}/list?${httpParams.toString()}`;
        this.cache.init(cacheKey);
        if (
            !AbstractListService.requestingList[cacheKey]
            && !this.cache.hit(cacheKey)
        ) {
            AbstractListService.requestingList[cacheKey] = true;

            const list = this.http.get(`${this.endpoint}/list`,
                {params: httpParams.getParams()})
                .subscribe((result: Array<T>) => {
                    this.cache.store(cacheKey, result);
                    delete AbstractListService.requestingList[cacheKey];
                    list.unsubscribe();
                });
        }

        return this.cache.get(cacheKey);
    }

    protected get endpoint(): string {
        return this.endpointValue;
    }

    constructor(
        protected endpointValue: string,
        protected http: HttpClient,
    ) {
    }
}
