<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use App\Rest\ParamRequirements;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route(path: '/categories', name: 'api_categories_')]
class CategoryController extends AbstractController
{
    #[Route(path: '/list', name: 'list', methods: 'GET')]
    public function list(CategoryRepository $repository): JsonResponse
    {
        return $this->json($repository->findAll(), Response::HTTP_OK, [], ['groups' => 'categories.list']);
    }

    #[Route(path: '/count', name: 'count', methods: 'GET')]
    public function count(CategoryRepository $repository): JsonResponse
    {
        return $this->json($repository->count(), Response::HTTP_OK);
    }

    #[Route(path: '/{id}', name: 'category_get', requirements: ['id' => ParamRequirements::INTEGER], methods: 'GET')]
    public function get(Category $category): JsonResponse
    {
        return $this->json($category, Response::HTTP_OK, [], [
            'groups' => ['categories.list', 'categories.show'],
        ]);
    }
}
