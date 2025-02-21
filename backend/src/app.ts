import fastify, { FastifyInstance } from "fastify"
import cors from "@fastify/cors";
import { webhookRoutes } from "./routes/ webhook.router";
import { userRoutes } from "./routes/user.router";
import { adminRoutes } from "./routes/adimin.router";


export class App {
    private app: FastifyInstance;

    constructor() {
        this.app = fastify();
    }


    listen(){
        this.app.listen({
            host: '0.0.0.0',
            port: process.env.PORT ? Number(process.env.PORT) : 3333,
        }).then(()=>console.log("HTTP Server running..."));
    };

    register(){
        this.app.register(cors, {
            origin: "*",
            methods: ['POST', 'DELETE', 'GET']
        });

        this.app.register(webhookRoutes);
        this.app.register(userRoutes);
        this.app.register(adminRoutes);
    }
}