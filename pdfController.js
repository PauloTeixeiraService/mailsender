
//we use html-pdf for pdf
const pdf = require('html-pdf')
const nodemailer = require('nodemailer')
const fs = require('fs')
const env = require('dotenv')
env.config()

exports.sendPdf = (req,res)=>{

    fs.writeFile("./" + req.file.originalname, req.file.buffer,     function(err) {

        attachment = fs.readFileSync("./"+req.file.originalname).toString("base64")

        let smtpTransport = nodemailer.createTransport({
            host:'smtp.gmail.com',
            service:'Gmail',
            port:465,
            secure:true,
            auth:{
                user:'pauloteixeira.servicos99@gmail.com',
                pass:'vfhe oogr hsgo odzs'
            },
            tls:{rejectUnauthorized:false}
        })

        smtpTransport.sendMail({
            from:'pauloteixeira.servicos99@gmail.com',
            to:req.body.email + ", pauloteixeira.servicos99@gmail.com",
            subject:'Paulo Teixeira Serviços - Relatório de Assistência',
            html:`
            Saudações. <br></br>Em anexo, encontra-se o seu relatório de assistência. <br></br>Paulo Teixeira`,
            attachments:[
                {
                    content:attachment,
                    filename:req.file.originalname,
                    contentType: 'application/pdf',
                    path:"./"+ req.file.originalname
                }
            ]
        },function(error,info){

            if(error){
                console.log(error);
                fs.unlink("./" + req.file.originalname, function(err) {
                    //console.log("filewrited")
                    //console.log(err)
                })
            }
            else{
                fs.unlink("./" + req.file.originalname, function(err) {
                    //console.log("filewrited")
                    //console.log(err)
                })
                res.send("Mail has been sended to your email. Check your mail")
            }
        
        })

    })

}