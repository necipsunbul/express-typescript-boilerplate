import { Express } from "express";
export default abstract class BaseApplicationLoader {
    abstract app : Express;
    abstract build() : void;
}