<?php

namespace App\Rest;

class ParamRequirements
{
    public const string BOOLEAN = '^(0|1)$';
    public const string DATE = '^\d{4}-\d{2}-\d{2}$';
    public const string INTEGER = '^\d+$';
}
