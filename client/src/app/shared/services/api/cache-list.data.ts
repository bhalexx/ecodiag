import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CacheListData {
    private static list: Record<string, BehaviorSubject<Array<any>>> = {};

    get(key: string): BehaviorSubject<Array<any>> {
        return CacheListData.list[key];
    }

    hit(key: string): boolean {
        return CacheListData.list[key] && 0 < CacheListData.list[key].value.length;
    }

    init(key: string): void {
        if (!CacheListData.list[key]) {
            CacheListData.list[key] = new BehaviorSubject([]);
        }
    }

    store(key: string, result: Array<any>): void {
        CacheListData.list[key].next(result);
    }
}
