import { CriterionStatus } from './criterion-status.model';

export class Criterion {
    comment?: string|null;
    id: number;
    implementation: string;
    label: string;
    purpose: string;
    status: CriterionStatus;
    testing: string;
}
