<?php

namespace App\Criterion;

readonly class CriterionStatus
{
    // Must be synced with client/src/app/shared/model/criterion-status.model.ts
    private const int COMPLIANT = 10;
    private const int NOT_APPLICABLE = 1;
    private const int PENDING = 5;
    private const int UNCOMPLIANT = 0;

    private function __construct(
        public int $value,
        public string $label,
        public string $color = 'black',
    ) {
    }

    public function equals(?self $status): bool
    {
        return null !== $status && $this->value === $status->value;
    }

    public static function compliant(): self
    {
        return new self(self::COMPLIANT, 'Conforme', 'success');
    }

    public static function notApplicable(): self
    {
        return new self(self::NOT_APPLICABLE, 'Non applicable');
    }

    public static function pending(): self
    {
        return new self(self::PENDING, 'En cours', 'warning');
    }

    public static function uncompliant(): self
    {
        return new self(self::UNCOMPLIANT, 'Non conforme', 'danger');
    }

    public static function fromValue(?int $value): ?self
    {
        return match ($value) {
            null => null,
            self::COMPLIANT => self::compliant(),
            self::NOT_APPLICABLE => self::notApplicable(),
            self::PENDING => self::pending(),
            self::UNCOMPLIANT => self::uncompliant(),
            default => throw new \InvalidArgumentException(sprintf('CriterionStatus %d is not a valid status.', $value)),
        };
    }
}
