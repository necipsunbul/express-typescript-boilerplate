import {CronJob, CronTime} from "cron";
import {timeZone} from "../../contants/SystemContants";

export default abstract class IBaseCronEvent {
    abstract start(): void;

    protected readonly cronTime: string;
    protected job?: CronJob;
    protected constructor(cronTime: string) {
        this.cronTime = cronTime;
    }

    protected build(onTickFunction: Function) {
        this.job = new CronJob(
            this.cronTime,
            function (){
                onTickFunction();
            },
            null,
            false, // start
            timeZone
        );
        this.job.start();
    }

    protected stop(){
        this.job?.stop();
    }

    protected setTime(cronTime:CronTime){
        this.job?.setTime(cronTime)
    }
}