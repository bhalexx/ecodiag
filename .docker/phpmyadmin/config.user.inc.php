<?php

$cfg['Servers'][1]['auth_type'] = 'config';
$cfg['Servers'][1]['host'] = getenv('PMA_HOST');
$cfg['Servers'][1]['user'] = getenv('MYSQL_USER');
$cfg['Servers'][1]['password'] = getenv('MYSQL_PASSWORD');
