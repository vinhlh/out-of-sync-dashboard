<?php

class OutOfSync
{
    const API_SERVER = false;
    const CACHE_TIME = 300; // 30 mins
    const CACHE_FILE_NAME = 'data.json';

    public function loadDataFromCache()
    {
        if (!file_exists(static::CACHE_FILE_NAME)) {
            return false;
        }

        $results = file_get_contents(static::CACHE_FILE_NAME);
        $results = json_decode($results, true);

        if (time() - $results['t'] > static::CACHE_TIME) {
            return false;
        }

        $results['cache'] = true;
        return $results;
    }

    public function loadDataViaAPI()
    {
        if (!static::API_SERVER) {
            $results = [ // JSON format
                'VN' => [100, 20],
                'SG' => [6, 11],
                'TH' => [4, time()]
            ];
        } else {
            $results = file_get_contents(static::API_SERVER);
        }

        $results = array('data' => $results, 't' => time());
        file_put_contents(static::CACHE_FILE_NAME, json_encode($results, true));

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