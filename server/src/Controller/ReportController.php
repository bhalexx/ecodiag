<?php

namespace App\Controller;

use App\Entity\Report;
use App\Report\Builder;
use App\Repository\CriterionRepository;
use App\Service\PdfGenerator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\Exception\NotNormalizableValueException;
use Symfony\Component\Serializer\SerializerInterface;

#[Route(path: '/report', name: 'api_report_')]
class ReportController extends AbstractController
{
    #[Route(path: '/validate', name: 'validate', methods: 'POST')]
    public function validate(
        Request $request,
        EntityManagerInterface $entityManager,
        SerializerInterface $serializer,
        CriterionRepository $criterionRepository,
    ): JsonResponse {
        try {
            $report = $serializer->deserialize($request->getContent(), Report::class, 'json');
            if ($criterionRepository->count() !== \count($report->getCriteria())) {
                throw new BadRequestHttpException('Le nombre de critères n\'est pas correct.');
            }
            $entityManager->persist($report);
            $entityManager->flush();

            return new JsonResponse($report->getId(), Response::HTTP_OK);
        } catch (NotNormalizableValueException $e) {
            return new JsonResponse(['message' => 'Le nom de votre site est requis'], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route(path: '/export/{report}', name: 'export', methods: 'GET')]
    public function export(
        Report $report,
        Builder $builder,
        PdfGenerator $exporter,
    ): Response {
        return new Response(
            $exporter->output($this->renderView('report/report.html.twig', [
                'report' => $builder->build($report),
            ])),
            Response::HTTP_OK,
            ['Content-Type' => 'application/pdf'],
        );
    }
}
