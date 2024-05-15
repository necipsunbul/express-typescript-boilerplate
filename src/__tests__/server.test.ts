import { agent as request } from "supertest";
import server from "../lib/init";
import {Server} from "http";
import DefaultApiResponseEntity from "../lib/app/entities/response/appDefault/DefaultApiResponseEntity";
import SuccessResponse from "../lib/core/response/SuccessResponse";
import {closeDataBase} from "../lib/core/config/config";
import {AppDefaultControllerKeys} from "../lib/app/controllers/AppDefaultController";

describe("Default endpoint => '/' tests",  () => {
    let app : Server;
    beforeAll(async() => {
        app = await server();
    });
    test("Catch default route", async () => {
        const res = await request(app).get("/");
        const responseBody = new DefaultApiResponseEntity(
            AppDefaultControllerKeys.index.version,
            AppDefaultControllerKeys.index.status
        );
        const response = new SuccessResponse<DefaultApiResponseEntity>(responseBody);
        expect(res.body).toStrictEqual(response.toJson());
    });

    afterAll(() => {
       closeDataBase().then(() =>  app.close());
    });
});