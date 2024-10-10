import { HttpParams as AngularHttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

export class HttpParams {
    private readonly params: AngularHttpParams;

    getParams(): AngularHttpParams {
        return this.params;
    }

    toString(): string {
        return this.params.toString();
    }

    private filter(queryParams: Params): Params {
        let params = {};
        Object.keys(queryParams).forEach(p => {
            if (queryParams[p]) {
                const key = p + (Array.isArray(queryParams[p]) ? '[]' : '');
                params = {
                    ...params,
                    [key]: queryParams[p],
                };
            }
        });

        return params;
    }

    constructor(params: object) {
        params = this.filter(params);

        this.params = new AngularHttpParams({
            fromObject: {...params},
        });
    }
}
