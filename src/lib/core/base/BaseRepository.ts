import BaseDbService from "./BaseDbService";

export default abstract class BaseRepository<T extends BaseDbService>{
    protected abstract dbService: T;
}