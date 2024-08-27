import { CriteriaStatus } from './criteria-status.model';

export class Criteria {
    comment?: string|null;
    implementation: string;
    label: string;
    link: string;
    purpose: string;
    status: CriteriaStatus;
    testing: string;
}
