import { Request, Response } from 'express'
import { ScheduleRepository } from '../repository/ScheduleRepository'
import { Schedule } from "../model/Schedule";
import { sendMailHelper } from "../helpers/sendMailHelper";

class TypesPokemonController{

    async search (req:Request,res:Response){
        const { type, emails, date } = req.body

        if(!isNaN(new Date(date).getTime())) {
            const scheduleDate = new Date(date)

            if(scheduleDate >= new Date()) {
                try {
                    const params: Schedule = {
                        type, 
                        emails,
                        date,
                        send: false
                    }
                    const newSchedule =await ScheduleRepository.create(params)

                    return res.status(201).send({message: 'Scheduled email sending'})
                } catch (error) {
                    res.status(500).send({message:"Internal Server Error"})
                }
            } else {
                res.status(400).send({message:"Date is not a valid "})
            }

        } else {
            sendMailHelper(type, emails)

            return res.json({
                message: 'Emails sent successfully'
            })
        }        
    }

}
export { TypesPokemonController }
