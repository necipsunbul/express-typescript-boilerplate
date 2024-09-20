import BaseApplicationLoader from "../../base/BaseApplicationLoader";
import IRabbitMQConsumer from "./RabbitMqManager";

export default class RabbitEventLoader extends BaseApplicationLoader {
    private readonly eventList: IRabbitMQConsumer[];
    constructor(events : IRabbitMQConsumer[]) {
        super();
        this.eventList = events;
    }
    async build() {
        for (let event of this.eventList) {
            await event.start();
        }
    }
}