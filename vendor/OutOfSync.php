<?php

class OutOfSync
{
    public function loadDataFromCache()
    {
        if (!file_exists(CACHE_FILE_NAME)) {
            return false;
        }

        $results = file_get_contents(CACHE_FILE_NAME);
        $results = json_decode($results, true);

        if (time() - $results['t'] > CACHE_TIMEOUT) {
            return false;
        }

        $results['cache'] = true;
        return $results;
    }

    public function loadDataViaAPI()
    {
        $results = file_get_contents(API_SERVER);
        $results = json_decode($results, true);

        $results = array('data' => $results, 't' => time());
        file_put_contents(CACHE_FILE_NAME, json_encode($results, true));

        $results['cache'] = false;
        return $results;
    }

    public function responseJson($data)
    {
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function run() {
        $data = $this->loadDataFromCache();

        if ($data === false) {
            $data = $this->loadDataViaAPI();
        }

        $this->responseJson($data);
    }
}