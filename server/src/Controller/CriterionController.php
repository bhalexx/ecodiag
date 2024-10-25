<?php

namespace App\Controller;

use App\Repository\CriterionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route(path: '/criteria', name: 'api_criteria_')]
class CriterionController extends AbstractController
{
    #[Route(path: '/count', name: 'count', methods: 'GET')]
    public function count(CriterionRepository $repository): JsonResponse
    {
        return $this->json($repository->count(), Response::HTTP_OK);
    }
}
