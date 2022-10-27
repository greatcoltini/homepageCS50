<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>League of Legends - Quiz</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>
    <link href="style.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet">
    <link href="styles.css" rel="stylesheet">
    <link href="quiz_style.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <title>Trivia!</title>

</head>

<body>

    <!-- NAVBAR SECTION-->
    <nav class="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.html">
                <img class="brand" src="brand.png" alt="L">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a href="main.html" class="btn btn-outline-primary">HOME</a>
                    </li>
                    <li class="nav-item">
                        <a href="quiz.html" class="btn btn-primary disabled">QUIZ</a>
                    </li>
                    <li class="nav-item">
                        <a href="summoner_info.html" class="btn btn-outline-primary">RANKINGS</a>
                    </li>
                    <li class="nav-item">
                        <a href="personal_history.html" class="btn btn-outline-primary">SUMMONER SEARCH</a>
                    </li>
                    <li class="nav-item">
                        <a href="contact.html" class="btn btn-outline-primary">CONTACT</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="header">
        <h1>League of Legends -- Trivia!</h1>
    </div>

    <!-- QUESTIONNAIRE CONTAINER -->
    <div class="mc_container" id="mc_container">
    </div>
    <div class="container">
        <div id="answer_cont" class="container" hidden>
            <div class="section">
                <h2> RESULTS </h2>
                <hr>
                <button id="refresh" onclick="refreshButtons()" hidden> Refresh </button>
                <h4 id="answers" hidden></h4>
            </div>
        </div>
    </div>

<script src="quiz.js"></script>

</body>


</html>