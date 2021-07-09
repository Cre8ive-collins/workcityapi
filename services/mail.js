const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport')
const bcrypt = require('bcryptjs');
require('dotenv').config()
const path = require('path')

async function password(name, email , password){
    let transporter = nodemailer.createTransport(smtpTransport({
        host: "webmail.workcityafrica.com",
        tls:{
            rejectUnauthorized: false
        },
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.MAIL_PASSWORD 
        },
    }));

    let info = await transporter.sendMail({
        from: '"Workcity Africa" <noreply@workcityafrica.com>', // sender address
        to: email, // list of receivers
        subject: "Welcome to Workcity", // Subject line
        html:`
            <h2> Welcome ${name} </h2> <br><br>
            <h3> Please find your credentiails for Workcity portal below </h3>

            <h3> Email : ${email} <br><br>
                 Password : ${password}</h3>
        `

    })
    console.log("Message sent: %s", info.messageId);

}

async function accesspass(email){
        let transporter = nodemailer.createTransport(smtpTransport({
            host: "webmail.workcityafrica.com",
            tls:{
                rejectUnauthorized: false
            },
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.MAIL_PASSWORD 
            },
        }));

        let info = await transporter.sendMail({
            from: '"Workcity Africa" <noreply@workcityafrica.com>', // sender address
            to: email, // list of receivers
            subject: "Welcome to Workcity", // Subject line
            html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <head>
                <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="format-detection" content="date=no" />
                <meta name="format-detection" content="address=no" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="x-apple-disable-message-reformatting" />
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i|Roboto+Slab:400,700" rel="stylesheet" />
                
            
                <style type="text/css" media="screen">
                    body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#777171; -webkit-text-size-adjust:none }
                    a { color:#e85853; text-decoration:none }
                    p { padding:0 !important; margin:0 !important } 
                    img { -ms-interpolation-mode: bicubic;}
                    .mcnPreviewText { display: none !important; }
            
                    @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
                        .mobile-shell { width: 100% !important; min-width: 100% !important; }
            
                        .text-header,
                        .m-center { text-align: center !important; }
                        .holder { padding: 0 10px !important; }
                        .text-nav { font-size: 10px !important; }
                        .center { margin: 0 auto !important; }
                        .td { width: 100% !important; min-width: 100% !important; }
                            
                        .text-header .link-white { text-shadow: 0 3px 4px rgba(0,0,0,09) !important; }
            
                        .m-br-15 { height: 15px !important; }
                        .bg { height: auto !important; } 
            
                        .h0 { height: 0px !important; }
            
                        .m-td,
                        .m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }
                        .m-block { display: block !important; }
            
                        .p30-15 { padding: 30px 15px !important; }
                        .p15-15 { padding: 15px 15px !important; }
                        .p30-0 { padding: 30px 0px !important; }
                        .p0-0-30 { padding: 0px 0px 30px 0px !important; }
                        .p0-15-30 { padding: 0px 15px 30px 15px !important; }
                        .p0-15 { padding: 0px 15px 0px 15px !important; }
                        .mp0 { padding: 0px !important; }
                        .mp20-0-0 { padding: 20px 0px 0px 0px !important }
                        .mp30 { padding-bottom: 30px !important; }
                        .container { padding: 20px 0px !important; }
                        .outer { padding: 0px !important }
                        .brr0 { border-radius: 0px !important; }
            
                        .fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }
            
                        .column,
                        .column-top,
                        .column-dir,
                        .column-empty,
                        .column-empty2,
                        .column-empty3,
                        .column-bottom,
                        .column-dir-top,
                        .column-dir-bottom { float: left !important; width: 100% !important; display: block !important; }
            
                        .column-empty { padding-bottom: 10px !important; }
                        .column-empty2 { padding-bottom: 25px !important; }
                        .column-empty3 { padding-bottom: 45px !important; }
            
                        .content-spacing { width: 15px !important; }
                        .content-spacing2 { width: 25px !important; }
                    }
                </style>
            </head>
            <body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#777171; -webkit-text-size-adjust:none;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#777171">
                    <tr>
                        <td align="center" valign="top" style="padding-top: 30px;" class="mp0">
                            <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                                <tr>
                                    <td class="td" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td>
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td class="brr0 p0-15" style="padding: 0px 30px; border-radius: 4px 4px 0px 0px;" bgcolor="#ffffff">
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td style="padding: 15px 0px 15px 0px;" class="mp0">
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td class="p30-15">
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                            <tr>
                                                                                                <th class="column" width="260" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                        <tr>
                                                                                                            <td class="text-header m-center" style="color:#999999; font-family:'Open Sans', Arial, sans-serif; font-size:12px; line-height:16px; text-align:left; text-transform:uppercase;">
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </th>
                                                                                                <th class="column-empty" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;"></th>
                                                                                                <th class="column" width="197" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                        <tr>
            
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </th>
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
                                                    </table>
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                        <tr>
                                                            <td class="p30-15">
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" dir="rtl" style="direction: rtl;">
                                                                    <tr>
                                                                        <th class="column-dir" dir="ltr" width="325" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; direction:ltr;">
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;"><img style="margin-right: 4px;" src="https://workcityafrica.com/code/workcity.png" width="325" height="490" border="0" alt="" /></td>
                                                                                </tr>
                                                                            </table>
                                                                        </th>
                                                                        <th class="column-empty" width="35" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;"></th>
                                                                        <th class="column-dir" dir="ltr" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; direction:ltr;">
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td class="mp20-0-0" style="padding: 20px 0px 20px 50px;">
                                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                            <tr>
                                                                                                <td class="h2 pb20" style="color:#090808; font-family:'Roboto Slab', Georgia, serif; font-size:35px; line-height:40px; text-align:left; padding-bottom:20px;"><multiline>The way the world works is changing</multiline></td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td class="text pb30" style="color:#777777; font-family:Arial, sans-serif; font-size:16px; line-height:30px; text-align:left; padding-bottom:30px;"><multiline>flexibility is top of mind and productivity is a must. Businesses needs safe spaces that foster collaboration. Companies need offices that flex to evolving demands..</multiline></td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td align="left">
                                                                                                    <table border="0" cellspacing="0" cellpadding="0">
                                                                                                        <tr>
                                                                                                            <td class="text-button" style="background:#0a0a09; color:#ffffff; font-family:'Roboto Slab', Georgia, serif; font-size:16px; line-height:20px; text-align:center; font-weight:bold; padding:14px 20px; text-transform:uppercase;"><multiline><a href="#" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none;"><span class="link-white" style="color:#ffffff; text-decoration:none;">Welcome to Workcity</span></a></multiline></td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </th>
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
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            
            `
        })

        console.log("Message sent: %s", info.messageId);
}

async function membershipmail(params) {
    let transporter = nodemailer.createTransport(smtpTransport({
        host: "webmail.workcityafrica.com",
        tls:{
            rejectUnauthorized: false
        },
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
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
        <div class="preheader" style="font-size: 1px; display: none !important;">Welcome to the future of Work</div>
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
                      Here you are part of a Family and we are all genuinely here to support your business growth, because your success directly impacts ours.  
                      <br><br>
                      Our Community Associate will onboard you and enlighten you on the house rules.
                      <br><br>
                         We have Community communications on <a href="https://chat.whatsapp.com/JFUQRgZEABj2gS7JkI2VWp" style="text-decoration: underline; color: #0c99d5; display: inline-block;" >WhatsApp</a>: Click the link below to join.
                      </td>
                      <td style="font-family: Geneva, Tahoma, Verdana, sans-serif; font-size: 16px; line-height: 22px; color: #555555; padding-top: 16px;" align="left">

                      </td>
                     </tr>
                    </table>
                   </td>
                  </tr>
                  <tr>
                         <td class="button" style="font-family: Geneva, Tahoma, Verdana, sans-serif; font-size: 16px; padding-top: 26px;" width="640" align="left">
                          <a href="https://chat.whatsapp.com/JFUQRgZEABj2gS7JkI2VWp"  style="background: #0c99d5; color: #fff; text-decoration: none; border: 14px solid #0c99d5; border-left-width: 50px; border-right-width: 50px; text-transform: uppercase; display: inline-block;">
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
        
           
          
        </custom></body>
        </html>
        `
      });
    
      console.log("Message sent: %s", info.messageId);

}

module.exports = {
    membershipmail,
    accesspass,
    password
}