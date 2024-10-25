import { Injectable } from '@angular/core';
import { CriterionValue } from '../../categories/components/show/show.component';
import { CriterionStatus } from '../model/criterion-status.model';

@Injectable({providedIn: 'root'})
export class ScoringService {
    compute(criteria: Array<CriterionValue>): number {
        if (null === criteria || 0 === criteria.length) {
            return 0;
        }

        criteria = criteria.filter((criterion: CriterionValue) => CriterionStatus.NOT_APPLICABLE !== criterion.status);

        return (
            criteria.reduce((acc, criterion) => acc + criterion.status, 0)
            / (criteria.length * CriterionStatus.COMPLIANT)
        ) * 100;
    }
}
