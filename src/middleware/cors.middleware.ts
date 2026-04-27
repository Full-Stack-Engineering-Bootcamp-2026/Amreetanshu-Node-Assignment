import cors , {CorsOptions}  from "cors";
import { error } from "node:console";

const allowedOrigin = "http://localhost:5173";

const corsOptions: CorsOptions = {
    origin: (origin,callback) =>{

        if(!origin){
            return callback(null,true);
        }

        if(origin==allowedOrigin){
            return callback(null,true);
        }

        return callback(new Error("Cors Error"))
    },
    methods:["Get","Post","Post","Delete"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials:true
};

export const corsMiddleware = cors(corsOptions);
