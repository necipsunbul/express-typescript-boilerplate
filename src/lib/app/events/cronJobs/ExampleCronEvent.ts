import IBaseCronEvent from "../../../core/notifiers/cronJobs/BaseCronEvent";

export default class ExampleCronEvent extends IBaseCronEvent {
    constructor() {
        super( '* * * * * *');
    }
    start(): void {
        this.build(() => {
            console.log('ExampleCronEvent',Math.random())
        })
    }
}