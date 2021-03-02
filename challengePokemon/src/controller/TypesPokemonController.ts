import { Request, Response } from 'express'
import { ScheduleRepository } from '../repository/ScheduleRepository'
import { Schedule } from "../model/Schedule";
import { sendMailHelper } from "../helpers/sendMailHelper";
import * as yup from 'yup'

class TypesPokemonController{

    async search (req:Request,res:Response){
        const { type, emails, date } = req.body

        const schema = yup.object().shape({
            type : yup.string().required("don't forget to provide the type of pokemon"),
            emails: yup.array().of(
                yup.string().email().required("enter a valid email so we can send the pokemons")
            )
        })

        try {
            await schema.validate(req.body,{abortEarly:false})
         } catch (err) {
            return res.status(400).json({error: err})
        }


        if(!isNaN(new Date(date).getTime())) {
            const scheduleDate = new Date(date + ' GMT-0300')

            if(scheduleDate >= new Date()) {
                try {
                    const params: Schedule = {
                        type, 
                        emails,
                        date: scheduleDate,
                        send: false
                    }
                    await ScheduleRepository.create(params)

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
