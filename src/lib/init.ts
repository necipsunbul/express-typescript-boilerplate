import Application from "./Bootstrap";
import appConfigs from "./core/config/config";

const mainF = async () => {
    await appConfigs();
    const app = new Application();
    app.loadFeatures();
    app.configureSocket();
    app.configureCatchingResponseError();
    app.listen();
    return app.server;
}

export default mainF;