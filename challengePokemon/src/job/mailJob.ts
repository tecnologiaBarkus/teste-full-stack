import * as schedule from "node-schedule";
import { ScheduleRepository } from "../repository/ScheduleRepository";
import { sendMailHelper } from "../helpers/sendMailHelper";

class MailJob {

    static checkMailsToSend() {

        schedule.scheduleJob('30 * * * * *', async ()=>{
            const documents = await ScheduleRepository.filter({
                date: {
                    $lte: new Date()
                },
                send: false
            })

            for (const document of documents) {
                sendMailHelper(document.type, document.emails)
                document.send = true
                document.save()
            }

        });
    }
}

export { MailJob }