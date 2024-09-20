import {CronJob} from "cron";
import {timeZone} from "../../contants/SystemContants";

export default abstract class IBaseCronEvent {
    abstract start(): void;

    protected readonly cronTime: string;

    protected constructor(cronTime: string) {
        this.cronTime = cronTime;
    }

    protected build(onTickFunction: Function) {
        return new CronJob(
            this.cronTime,
            function (){
                onTickFunction();
            },
            null,
            false, // start
            timeZone
        ).start();
    }
}