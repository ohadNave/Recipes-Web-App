<template>
  <div class="container">
    <br><br>
    <!-- <h3> About the app </h3> -->
    <h4>Our website presents half million recipes info around the world from a whole bunch of different cusines.<br>
        Search for your desired recipe, filter results by popularity and cooking time.<br>
        Plan your own meal and comeback to the page at any time you would like.</h4>

    <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">

    <h4>Our previous project files</h4>
    <a href="https://app.swaggerhub.com/apis/BGU-University/3.2_API/1.0.0"> Swagger API - 3.1</a>
    <br>
    <a href="https://github.com/SISE-Web-Development-Environments/assignment-3-2-ohad_gal_ass3-1.git">Backend - 3.2</a>
    <br>
    <link href='https://fonts.googleapis.com/css?family=Cormorant Infant' rel='stylesheet'>
  <div id="card_con">
  <img id="way" src="../assets/way.png">

<section id="team" class="pb-5">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-4">
                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                    <div class="mainflip">
                        <div class="frontside">
                            <div class="card">
                                <div class="card-body text-center">
                                    <p><img class=" img-fluid" src="https://res.cloudinary.com/dqtqktfwv/image/upload/v1594747345/10628311_10204795213263787_7337883519745779748_n_lrf2ba.jpg" alt="card image"></p>
                                    <h4 class="card-title">Ohad Nave</h4>
                                    <a href="#" class="btn btn-primary btn-sm">Contact Me <i class="fa fa-plus"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="backside">
                            <div class="card">
                                <div class="card-body text-center mt-4">
                                    <h4 class="card-title">About Me</h4>
                                    <p class="card-text">Originally from Lehavim residence.<br>
                                       3rd year Student at BGU university.<br>
                                      Specialist on Java,C++,Node.js
                                    </p>                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <a class="social-icon text-xs-center" target="_blank" href="https://www.facebook.com/OhadNave/">
                                                <i class="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a class="social-icon text-xs-center" target="_blank" href="www.linkedin.com/in/ohad-nave-5a8447148">
                                                <i class="fa fa-linkedin"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a class="social-icon text-xs-center" target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=ohadnav@post.bgu.ac.il">
                                                <i class="fa fa-google"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4">
                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                    <div class="mainflip">
                        <div class="frontside">
                            <div class="card">
                                <div class="card-body text-center">
                                    <p><img class=" img-fluid" src="https://res.cloudinary.com/dqtqktfwv/image/upload/v1594796606/45463042_10217848757279436_2348773913166610432_o_xkacr3.jpg" alt="card image"></p>
                                    <h4 class="card-title">Gal Atedgi</h4>
                                    <a href="#" class="btn btn-primary btn-sm">Contact Me <i class="fa fa-plus"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="backside">
                            <div class="card">
                                <div class="card-body text-center mt-4">
                                    <h4 class="card-title">About Me</h4>
                                    <p class="card-text">Originally from Beer-Sheva.<br>
                                       3rd year Student at BGU university.<br>
                                       Backend programmer mainly,skilled on Java,C,Node.js</p>
                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <a class="social-icon text-xs-center" target="_blank" href="https://www.facebook.com/gal.atedgi">
                                                <i class="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                             <li class="list-inline-item">
                                            <a class="social-icon text-xs-center" target="_blank" href="https://www.linkedin.com/in/gal-atedgi-9644111a7/">
                                                <i class="fa fa-linkedin"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a class="social-icon text-xs-center" target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=galated@post.bgu.ac.il">
                                                <i class="fa fa-google"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           

        </div>
    </div>
</section>
  </div>
    <router-link to="/" exact>Go To Home Page</router-link>
    
  </div>
</template>

<script>
import postscribe from 'postscribe'
export default {  
  name: 'about',
  mounted: function () {
    postscribe('#card', `<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"><\/script>`);
    postscribe('#card', `<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"><\/script>`);
  }
}
</script>

<style scoped>

.container{
  /* font-family: 'Cormorant Infant'; */
}

@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
#team {
    background: transparent !important;
}

.btn-primary:hover,
.btn-primary:focus {
    background-color: black;
    border-color: black;
    box-shadow: none;
    outline: none;
}

.btn-primary {
    color: #fff;
    background-color: black;
    border-color: black;
}

section {
    padding: 60px 0;
}

section .section-title {
    text-align: center;
    color: red;
    margin-bottom: 50px;
    text-transform: uppercase;
}

#team .card {
    border: none;
    background: #ffffff;
}

.image-flip:hover .backside,
.image-flip.hover .backside {
    -webkit-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
    -o-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    transform: rotateY(0deg);
    border-radius: .25rem;
}

.image-flip:hover .frontside,
.image-flip.hover .frontside {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    transform: rotateY(180deg);
}

.mainflip {
    -webkit-transition: 1s;
    -webkit-transform-style: preserve-3d;
    -ms-transition: 1s;
    -moz-transition: 1s;
    -moz-transform: perspective(1000px);
    -moz-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    transition: 1s;
    transform-style: preserve-3d;
    position: relative;
}

.frontside {
    position: relative;
    -webkit-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    z-index: 2;
    margin-bottom: 30px;
}

.backside {
    position: absolute;
    top: 0;
    left: 0;
    background: white;
    -webkit-transform: rotateY(-180deg);
    -moz-transform: rotateY(-180deg);
    -o-transform: rotateY(-180deg);
    -ms-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
    -webkit-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
    -moz-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
    box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
}

.frontside,
.backside {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: 1s;
    -webkit-transform-style: preserve-3d;
    -moz-transition: 1s;
    -moz-transform-style: preserve-3d;
    -o-transition: 1s;
    -o-transform-style: preserve-3d;
    -ms-transition: 1s;
    -ms-transform-style: preserve-3d;
    transition: 1s;
    transform-style: preserve-3d;
}

.frontside .card,
.backside .card {
    min-height: 312px;
}

.backside .card a {
    font-size: 18px;
    color: #F08080 !important;
}

.frontside .card .card-title,
.backside .card .card-title {
    color: #F08080 !important;
}

.frontside .card .card-body img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

#card_con{
  position: relative;
  left: 10%;
}

#way{
   position: relative;
  left: 25%;
  width: 150px;
}
</style>