import * as schedule from "node-schedule";

class MailJob {

    static checkMailsToSend() {

        schedule.scheduleJob('30 * * * * *', function(){
        });
    }

}

export { MailJob }