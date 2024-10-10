<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
class Category
{
    #[ORM\Column(name: 'id', type: Types::INTEGER)]
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[Groups(['categories.list'])]
    private ?int $id = null;

    #[ORM\Column(name: 'name', type: Types::STRING)]
    #[Groups(['categories.list'])]
    private string $name;

    #[ORM\Column(name: 'description', type: Types::TEXT)]
    #[Groups(['categories.list'])]
    private string $description;

    #[ORM\Column(name: 'icon', type: Types::STRING)]
    #[Groups(['categories.list'])]
    private string $icon;

    #[ORM\OneToMany(targetEntity: Criterion::class, mappedBy: 'category', orphanRemoval: true)]
    #[ORM\OrderBy(value: ['id' => 'ASC'])]
    #[Groups(['categories.show'])]
    private Collection $criteria;

    public function __construct()
    {
        $this->criteria = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getIcon(): string
    {
        return $this->icon;
    }

    public function getCriteria(): Collection
    {
        return $this->criteria;
    }
}
