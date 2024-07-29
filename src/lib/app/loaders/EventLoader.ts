import BaseApplicationLoader from "../../core/base/BaseApplicationLoader";
import IRabbitMQConsumer from "../../core/notifiers/rabbitMq/RabbitMqManager";

export default class EventLoader extends BaseApplicationLoader {
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