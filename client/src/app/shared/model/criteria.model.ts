import { CriteriaStatus } from './criteria-status.model';

export class Criteria {
    comment?: string|null;
    description: string;
    label: string;
    link: string;
    status: CriteriaStatus;
}
