<?php

namespace App\Entity;

use App\Repository\CriterionRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CriterionRepository::class)]
class Criterion
{
    #[ORM\Column(name: 'id', type: Types::INTEGER)]
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[Groups(['categories.show'])]
    private ?int $id = null;

    #[ORM\Column(name: 'label', type: Types::TEXT)]
    #[Groups(['categories.show'])]
    private string $label;

    #[ORM\Column(name: 'purpose', type: Types::TEXT)]
    #[Groups(['categories.show'])]
    private string $purpose;

    #[ORM\Column(name: 'implementation', type: Types::TEXT)]
    #[Groups(['categories.show'])]
    private string $implementation;

    #[ORM\Column(name: 'testing', type: Types::TEXT)]
    #[Groups(['categories.show'])]
    private string $testing;

    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: 'criteria')]
    #[ORM\JoinColumn(name: 'category_id', referencedColumnName: 'id', nullable: false)]
    private Category $category;

    #[ORM\Column(name: 'number', type: Types::STRING, length: 5)]
    #[Groups(['categories.show'])]
    private string $number;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function getPurpose(): string
    {
        return $this->purpose;
    }

    public function getImplementation(): string
    {
        return $this->implementation;
    }

    public function getTesting(): string
    {
        return $this->testing;
    }

    public function getCategory(): Category
    {
        return $this->category;
    }

    public function getNumber(): string
    {
        return $this->number;
    }
}
