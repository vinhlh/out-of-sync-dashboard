<!DOCTYPE html>
<html>
<head>
    <title>Out of Sync Dashboard</title>
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/flag-icon.min.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <h3><center>Out of Sync Dashboard</center></h3>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Stock</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>

                <p class="update-info pull-right hidden">Last update: <span>12:00:00 12/02/2015</span></p>
                <p class="loading pull-right hidden"><i class="glyphicon glyphicon-refresh"></i> Updating data..</p>
            </div>
        </div>
    </div>
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>