import Application from "./Bootstrap";
import appConfigs from "./core/config/config";

const mainF = async () => {
    await appConfigs();
    const app = new Application();
    await app.loadQueueEvents();
    await app.loadCronEvents();
    app.loadFeatures();
    app.configureSocket();
    app.configureCatchingResponseError();
    app.listen();
    return app.server;
}

export default mainF;