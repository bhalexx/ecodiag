<?php

namespace App\Service;

use App\Criterion\CriterionStatus;

class Scoring
{
    public static function compute(array $criteria): float
    {
        if (empty($criteria)) {
            return 0.;
        }

        $criteria = array_filter($criteria, fn (array $criterion) => CriterionStatus::notApplicable()->value !== $criterion['status']->value);

        return (
            array_reduce($criteria, fn ($score, array $criterion) => $score + $criterion['status']->value, 0)
            / (\count($criteria) * CriterionStatus::compliant()->value)
        ) * 100;
    }

    public static function total(array $categories): float
    {
        return array_reduce($categories, fn ($score, array $category) => $score + $category['score'], 0)
        / \count($categories);
    }
}
