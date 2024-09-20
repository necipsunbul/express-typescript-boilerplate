import IBaseCronEvent from "./BaseCronEvent";
import BaseApplicationLoader from "../../base/BaseApplicationLoader";

export default class CronEventLoader  extends BaseApplicationLoader{
    constructor(private readonly cronEvents : IBaseCronEvent[]) {
        super();
    }

    build(): void {
        for (const event of this.cronEvents){
            event.start();
        }
    }
}