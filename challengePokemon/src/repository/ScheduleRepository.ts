import schedule from "../database/schemas/schedule";
import { Schedule } from "../model/Schedule";

class ScheduleRepository{
    static async create(params:Schedule){
        const session = new schedule(params)
        const newSchedule=await session.save()

        return newSchedule
    }
}

export { ScheduleRepository }