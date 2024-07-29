import { Express } from "express";
export default abstract class BaseApplicationLoader {
    abstract build() : void;
}