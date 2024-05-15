import AppError from "../error/AppError";
export const whitelist = ["*"];
 const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (whitelist.indexOf(origin) !== -1 || whitelist.indexOf("*") !== -1) {
            callback(null, true);
        } else {
            callback(new AppError("Not allowed by CORS"));
        }
    },
};
 export default corsOptions;