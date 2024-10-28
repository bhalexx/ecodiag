<?php

namespace App\Entity;

use App\Repository\ReportRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReportRepository::class)]
class Report
{
    #[ORM\Column(name: 'id', type: Types::INTEGER)]
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    private ?int $id = null;

    #[ORM\Column(name: 'website', type: Types::STRING)]
    private string $website;

    #[ORM\Column(name: 'criteria', type: Types::JSON)]
    private array $criteria = [];

    public function __construct(
        string $website, array $criteria,
    ) {
        $this->website = $website;
        $this->criteria = $criteria;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getWebsite(): string
    {
        return $this->website;
    }

    public function getCriteria(): array
    {
        return $this->criteria;
    }
}
