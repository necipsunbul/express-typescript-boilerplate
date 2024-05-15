import { Express } from "express";
export default abstract class BaseFeatureLoader {
    abstract app: Express;
    abstract build(): void;
}