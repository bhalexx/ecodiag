<?php

namespace App\Service;

interface PdfGeneratorInterface
{
    public function output(string $html): string;
}
