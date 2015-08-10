<?php

if (php_sapi_name() != "cli") {
    echo 'No permission';
}

require_once 'config/config.php';
require_once 'vendor/OutOfSync.php';

$oos = new OutOfSync();
$oos->initTable();