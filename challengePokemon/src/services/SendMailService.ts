import nodemailer, { Transporter }from 'nodemailer'
import handlebars from "handlebars"
import { config } from "dotenv";

import fs from "fs"

class SendMailService{
    private client:Transporter

    constructor(){
        config()

        if(process.env.NODE_ENV === 'production') {

            const host: string = process.env.SMTP_HOST ?? ''
            const port: number = parseInt(process.env.SMTP_PORT)  ?? 587
            const user: string = process.env.SMTP_USER ?? ''
            const password: string = process.env.SMTP_PASS ?? ''
            const transporter = nodemailer.createTransport({
                host: host,
                port: port,
                secure: false, 
                auth: {
                    user: user,
                    pass: password
                }
            })

            this.client= transporter
        } else {
            nodemailer.createTestAccount().then(account =>{

                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass
                    }
                });
    
                this.client = transporter
            }) 
        }
    }

    async send(to:string[],subject:string,variables:object,path:string){
        const templateFileContest = fs.readFileSync(path).toString("utf-8")
        const mailTemplateParse = handlebars.compile(templateFileContest)
        const html = mailTemplateParse(variables)

        const message =  await this.client.sendMail({
            to,
            subject: `Seus pokémons do tipo ${subject}`,
            html,
            from:"Pokédex<noreplay@pokemons.com.br>"
        })
        
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}

export default new SendMailService()