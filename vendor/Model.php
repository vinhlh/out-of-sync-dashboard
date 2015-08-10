<?php

require_once 'config/config.php';

class Model extends SQLite3
{
    public function __construct()
    {
        $this->open(SQLITE_DB_FILE);
    }

    public function init()
    {
        $this->exec('DROP TABLE IF EXISTS logs');
        $this->exec('CREATE TABLE logs (id INTEGER PRIMARY KEY AUTOINCREMENT, country VARCHAR(2), stock INTEGER NOT NULL, status INTEGER NOT NULL, updated_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP); CREATE INDEX updated_time ON logs (updated_time)');
    }

    public function getAllLogsToday()
    {
        $results = $this->query('SELECT *, DATETIME(updated_time, "localtime") as updated_time FROM logs WHERE DATE("updated_time") >= DATE("now", "localtime") ORDER BY updated_time DESC, country ASC');

        $logs = ['datas' => [], 'series' => [], 'labels' => [], 'overral' => []];
        while ($data = $results->fetchArray()) {
            if (!isset($logs['overral'][$data['country']])) {
                $logs['overral'][$data['country']] = ['stock' => $data['stock'], 'status' => $data['status'], 't' => $data['updated_time']];
                $logs['labels'][$data['country']] = [];
            }

            $logs['series'][$data['country'] . '.stock'] = true;
            $logs['series'][$data['country'] . '.status'] = true;
            $logs['labels'][$data['country']][] = $data['updated_time'];

            $logs['data'][$data['country'] . '.stock'][] = $data['stock'];
            $logs['data'][$data['country'] . '.status'][] = $data['status'];
        }
        if (count($logs['series']) > 0) {
            $logs['series'] = array_keys($logs['series']);
            $logs['labels'] = array_values(reset($logs['labels']));
            $logs['data'] = array_values($logs['data']);
        }

        return $logs;
    }

    public function save($results)
    {
        if (is_array($results) && count($results) > 0) {
            foreach ($results as $country => $data) {
                $this->exec('INSERT INTO logs (country, stock, status) VALUES (' . implode(',', ["'$country'", $data[0], $data[1]]) . ')');
            }
        }
    }
}