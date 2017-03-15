<section id="contact" class="section-padding wow fadeInUp delay-05s">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center white">
            <h2 class="service-title pad-bt15">Keep in touch with us</h2>
                <hr class="bottom-line white-bg">
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12">
            <div class="loction-info white">
                  <p><i class="fa fa-map-marker fa-fw pull-left fa-2x"></i>Rue Ahmed Aloulou<br>Imm. Esia 9eme etage Apt. 1
Sfax</p>
                  <p><i class="fa fa-envelope-o fa-fw pull-left fa-2x"></i>info@takween.online</p>
                  <p><i class="fa fa-phone fa-fw pull-left fa-2x"></i>+216 74 400 205</p>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.776318446766!2d10.749986497541537!3d34.736032194258016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQ0JzEwLjUiTiAxMMKwNDUnMDYuMyJF!5e0!3m2!1sfr!2sfr!4v1488188255446"  frameborder="0" style="border:0" allowfullscreen></iframe> 
              </div>
          </div>
          
             

          <div class="col-md-6 col-sm-6 col-xs-12">
            <div class="contact-form">
                <div id="sendmessage">Your message has been sent. Thank you!</div>
                <div id="errormessage"></div>
                <form action="" method="post" role="form" class="contactForm">
                  {{ csrf_field() }}
                    <div class="col-md-6 padding-right-zero">
                        <div class="form-group">
                            <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                            <div class="validation"></div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                            <div class="validation"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                            <div class="validation"></div>
                        </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                            <textarea class="form-control" name="message" rows="7" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                            <div class="validation"></div>
                        </div>
                      <button type="submit" class="btn btn-primary btn-submit">SEND NOW</button>
                    </div>
                </form>
            </div>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
             </div>
        </div>
      </div>
    </section>
    <!---->
    <!---->
    
    <!---->
  