import schedule from "../database/schemas/schedule";
import { Schedule, ScheduleDocument } from "../model/Schedule";

class ScheduleRepository{
    static async create(params:Schedule){
        const session = new schedule(params)
        const newSchedule=await session.save()

        return newSchedule
    }

    static async filter(query: any) {
        const documents = <ScheduleDocument[]> await schedule.find(query)
        return documents
    }
}

export { ScheduleRepository }