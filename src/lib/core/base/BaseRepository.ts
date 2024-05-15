import BaseService from "./BaseService";

export default abstract class BaseRepository<T extends BaseService>{
    protected abstract dbService: T;
}