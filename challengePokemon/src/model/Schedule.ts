
import { Document } from "mongoose";

export interface Schedule{
    type: string,
    emails: [],
    date: Date,
    send: Boolean
}

export type ScheduleDocument = Schedule & Document