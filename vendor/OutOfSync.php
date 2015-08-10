<?php

require_once 'Model.php';

class OutOfSync
{
    private $_model = null;

    public function __construct()
    {
        $this->_model = new Model();
    }

    public function responseJson($data)
    {
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function runAPI() {
        $data = $this->_model->getAllLogsToday();

        $this->responseJson($data);
    }

    public function runCron()
    {
        $results = file_get_contents(API_SERVER);
        $results = json_decode($results, true);

        $this->_model->save($results);
    }

    public function initTable()
    {
        $this->_model->init();
    }
}