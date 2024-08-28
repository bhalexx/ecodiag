import { CriteriaStatus } from './criteria-status.model';

export class Criteria {
    comment?: string|null;
    implementation: string;
    label: string;
    purpose: string;
    status: CriteriaStatus;
    testing: string;
}
