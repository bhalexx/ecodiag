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
        $categories = $repository->findAll();

        return $this->json($categories, Response::HTTP_OK, [], ['groups' => 'categories.list']);
    }

    #[Route(path: '/{id}', name: 'category_get', requirements: ['id' => ParamRequirements::INTEGER], methods: 'GET')]
    public function get(Category $category): JsonResponse
    {
        return $this->json($category, Response::HTTP_OK, [], [
            'groups' => ['categories.list', 'categories.show'],
        ]);
    }
}
