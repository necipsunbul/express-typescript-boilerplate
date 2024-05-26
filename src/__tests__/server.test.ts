import { agent as request } from "supertest";
import server from "../lib/init";
import {Server} from "http";
import DefaultApiResponseDTO from "../lib/app/dtos/response/DefaultApiResponseDTO";
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
        const responseBody = new DefaultApiResponseDTO(
            AppDefaultControllerKeys.index.version,
            AppDefaultControllerKeys.index.status
        );
        const response = new SuccessResponse<DefaultApiResponseDTO>(responseBody);
        expect(res.body).toStrictEqual(response.toJson());
    });

    afterAll(() => {
       closeDataBase().then(() =>  app.close());
    });
});