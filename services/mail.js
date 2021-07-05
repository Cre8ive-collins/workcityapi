const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport')
const bcrypt = require('bcryptjs');
require('dotenv').config()



async function membershipmail(params) {
    let transporter = nodemailer.createTransport(smtpTransport({
        host: "webmail.workcityafrica.com",
        tls:{
            rejectUnauthorized: false
        },
        port: 465,
        secure: true,
        auth: {
            user: 'noreply@workcityafrica.com',
            pass: process.env.MAIL_PASSWORD 
        },
    }));

    let info = await transporter.sendMail({
        from: '"Workcity Africa" <noreply@workcityafrica.com>', // sender address
        to: params.email, // list of receivers
        subject: "Welcome to our Community", // Subject line
        html: `
        <!DOCTYPE html>
        <html>
        
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        
            <title>Workcity Africa</title>
        
            <style>
        
                body {margin:0; padding:0; -webkit-text-size-adjust:none; -ms-text-size-adjust:none;} img{line-height:100%; outline:none; text-decoration:none; -ms-interpolation-mode: bicubic;} a img{border: none;} #backgroundTable {margin:0; padding:0; width:100% !important; } a, a:link{color:#2A5DB0; text-decoration: underline;} table td {border-collapse:collapse;} span {color: inherit; border-bottom: none;} span:hover { background-color: transparent; }
        
            </style>
        
            <style>
         .scalable-image img{max-width:100% !important;height:auto !important}.button a{transition:background-color .25s, border-color .25s}.button a:hover{background-color:#e1e1e1 !important;border-color:#0976a5 !important}@media only screen and (max-width: 400px){.preheader{font-size:12px !important;text-align:center !important}.header--white{text-align:center}.header--white .header__logo{display:block;margin:0 auto;width:118px !important;height:auto !important}.header--left .header__logo{display:block;width:118px !important;height:auto !important}}@media screen and (-webkit-device-pixel-ratio), screen and (-moz-device-pixel-ratio){.sub-story__image,.sub-story__content{display:block
         !important}.sub-story__image{float:left !important;width:200px}.sub-story__content{margin-top:30px !important;margin-left:200px !important}}@media only screen and (max-width: 550px){.sub-story__inner{padding-left:30px !important}.sub-story__image,.sub-story__content{margin:0 auto !important;float:none !important;text-align:center}.sub-story .button{padding-left:0 !important}}@media only screen and (max-width: 400px){.featured-story--top table,.featured-story--top td{text-align:left}.featured-story--top__heading td,.sub-story__heading td{font-size:18px !important}.featured-story--bottom:nth-child(2) .featured-story--bottom__inner{padding-top:10px
         !important}.featured-story--bottom__inner{padding-top:20px !important}.featured-story--bottom__heading td{font-size:28px !important;line-height:32px !important}.featured-story__copy td,.sub-story__copy td{font-size:14px !important;line-height:20px !important}.sub-story table,.sub-story td{text-align:center}.sub-story__hero img{width:100px !important;margin:0 auto}}@media only screen and (max-width: 400px){.footer td{font-size:12px !important;line-height:16px !important}}
             @media screen and (max-width:600px) {
            table[class="columns"] {
                margin: 0 auto !important;float:none !important;padding:10px 0 !important;
            }
            td[class="left"] {
             padding: 0px 0 !important;
            </style>
        
        </head>
        
        <body style="background: #e1e1e1;font-family:Arial, Helvetica, sans-serif; font-size:1em;"><style type="text/css">
        div.preheader 
        { display: none !important; } 
        </style>
        <div class="preheader" style="font-size: 1px; display: none !important;">Mute videos until you’re ready</div>
            <table id="backgroundTable" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#e1e1e1;">
                <tr>
                    <td class="body" align="center" valign="top" style="background:#e1e1e1;" width="100%">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td width="640">
                                    </td>
                            </tr>
                            <tr>
                                <td class="main" width="640" align="center" style="padding: 0 10px;">
                                    <table style="min-width: 100%; " class="stylingblock-content-wrapper" width="100%" cellspacing="0" cellpadding="0"><tr><td class="stylingblock-content-wrapper camarker-inner"><table cellspacing="0" cellpadding="0">
         <tr>
          <td width="640" align="left">
           <table width="100%" cellspacing="0" cellpadding="0">
            <tr>
             <td class="header header--left" style="padding: 20px 10px;" align="left">
              <a href="https://workcityafrica.com" ><img class="header__logo" src="https://workcityafrica.com/wp-content/uploads/2021/04/workcitycoworkinglightlogo-1-e1619004588343.png" alt="Workcity" style="display: block; border: 0;" width="158" height="59"></a>
             </td>
            </tr>
           </table>
          </td>
         </tr>
        </table></td></tr></table><table style="min-width: 100%; " class="stylingblock-content-wrapper" width="100%" cellspacing="0" cellpadding="0"><tr><td class="stylingblock-content-wrapper camarker-inner"><table class="featured-story featured-story--top" cellspacing="0" cellpadding="0">
         <tr>
          <td style="padding-bottom: 20px;">
           <table cellspacing="0" cellpadding="0">
            <tr>
             <td class="featured-story__inner" style="background: #fff;">
              <table cellspacing="0" cellpadding="0">
               <tr>
               
               </tr>
               <tr>
                <td class="featured-story__content-inner" style="padding: 32px 30px 45px;">
                 <table cellspacing="0" cellpadding="0">
                  <tr>
                   <td class="featured-story__heading featured-story--top__heading" style="background: #fff;" width="640" align="left">
                    <table cellspacing="0" cellpadding="0">
                     <tr>
                      <td style="font-family: Geneva, Tahoma, Verdana, sans-serif; font-size: 22px; color: #464646;" width="400" align="left">
                       <a href="https://workcityafrica.com"  style="text-decoration: none; color: #464646;">Welcome to the future of work</a>
                      </td>
                     </tr>
                    </table>
                   </td>
                  </tr>
                  <tr>
                   <td class="featured-story__copy" style="background: #fff;" width="640" align="center">
                    <table cellspacing="0" cellpadding="0">
                     <tr>
                      <td style="font-family: Geneva, Tahoma, Verdana, sans-serif; font-size: 16px; line-height: 22px; color: #555555; padding-top: 16px;" align="left">
                        Websites that autoplay video can be super annoying. You didn't select the video to play &mdash; it was started for you. <i>Hurumph!</i> Firefox will now stop that from happening, putting you in control. If you'd like to hear or see a video, just click on the play button to watch it.<br><br>
                         We have Community communications on <a href="#" style="text-decoration: underline; color: #0c99d5; display: inline-block;" >WhatsApp</a>: Click the link below to join.
                      </td>
                      <td style="font-family: Geneva, Tahoma, Verdana, sans-serif; font-size: 16px; line-height: 22px; color: #555555; padding-top: 16px;" align="left">
                        LINK
                      </td>
                     </tr>
                    </table>
                   </td>
                  </tr>
                  <tr>
                         <td class="button" style="font-family: Geneva, Tahoma, Verdana, sans-serif; font-size: 16px; padding-top: 26px;" width="640" align="left">
                          <a href="#"  style="background: #0c99d5; color: #fff; text-decoration: none; border: 14px solid #0c99d5; border-left-width: 50px; border-right-width: 50px; text-transform: uppercase; display: inline-block;">
                           Join us on WhatsApp
                          </a>
                   </td>
                        </tr>
                 </table>
                </td>
               </tr>
              </table>
             </td>
            </tr>
           </table>
          </td>
         </tr>
        </table></td></tr></table></td>
                            </tr>
                            <tr>
                             <td class="footer" width="640" align="center" style="padding-top: 10px;">
                              <table cellspacing="0" cellpadding="0">
                               <tr>
                                <td align="center" style="font-family: Geneva, Tahoma, Verdana, sans-serif; font-size: 14px; line-height: 18px; color: #738597; padding: 0 20px 40px;">
                                              <br>      <br>
        <strong>Thanks for reading!</strong>
        
        <br> 
        
        You're receiving this email because you joined us at Workcity, and you subscribed to hear from us. If you liked the services we provided leave us a <a href="#"  style="color: #0c99d5;"> review on Google.</a>
        
        <br>
        <br>
        <br>
        
        
        
                                 <br>
        
        
        
                                 Workcity, Polystar Building Marwa Bus-Stop Second Roundabout Lekki Lagos
                                 <br>
                                 <a href="https://workcityafrica.com"  style="color: #0c99d5;">Legal</a> • <a href="https://workcityafrica.com"  style="color: #0c99d5;">Privacy</a>
        
                                </td>
                               </tr>
                              </table>
                             </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        
            <!-- Exact Target tracking code -->
           
          
        </custom></body>
        </html>
        `
      });
    
    //   console.log("Message sent: %s", info.messageId);

}

module.exports = {membershipmail}