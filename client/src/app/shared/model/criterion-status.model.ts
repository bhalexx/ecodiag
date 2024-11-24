export class CriterionStatus {
    // Must be synced with server/src/Criterion/CriterionStatus.php
    static readonly COMPLIANT = 10 as const;
    static readonly NOT_APPLICABLE = 1 as const;
    static readonly PENDING = 5 as const;
    static readonly UNCOMPLIANT  = 0 as const;

    label: string;
    value: number;
}
