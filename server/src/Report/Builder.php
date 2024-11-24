<?php

namespace App\Report;

use App\Criterion\CriterionStatus;
use App\Entity\Report;
use App\Repository\CategoryRepository;
use App\Repository\CriterionRepository;
use App\Service\Scoring;

readonly class Builder
{
    public function __construct(
        private CriterionRepository $criterionRepository,
        private CategoryRepository $categoryRepository,
    ) {
    }

    public function build(Report $report): array
    {
        return [
            'website' => $report->getWebsite(),
            'categories' => $categories = $this->categories($report),
            'score' => Scoring::total($categories),
        ];
    }

    private function criteria(array $reportCriteria): array
    {
        $criteria = [];
        foreach ($reportCriteria as $criterion) {
            $criteria[$criterion['id']] = [
                'criterion' => $this->criterionRepository->find($criterion['id']),
                'status' => CriterionStatus::fromValue($criterion['status']),
            ];
        }

        return $criteria;
    }

    private function categories(Report $report): array
    {
        $categories = [];
        foreach ($this->categoryRepository->findAll() as $category) {
            $categories[] = [
                'category' => $category,
                'criteria' => $criteria = array_filter(
                    $this->criteria($report->getCriteria()),
                    fn (array $criteria) => $category->getId() === $criteria['criterion']->getCategory()->getId(),
                ),
                'score' => Scoring::compute($criteria),
            ];
        }

        return $categories;
    }
}
