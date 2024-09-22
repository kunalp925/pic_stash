import express from "express";
import { 
    HttpResponseMessage,
    StringContent,
    controller,
    httpGet,
} from "inversify-express-utils";

@controller('/pics')
export class PicsController
{
    constructor(){}

    @httpGet('/')
    TestRoute()
    {
        const response = new HttpResponseMessage(200);
        response.content = new StringContent("Pics Endpoints");
        return response;
    }
}