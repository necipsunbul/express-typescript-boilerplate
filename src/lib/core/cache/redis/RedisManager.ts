import { RedisClientType } from 'redis';
import { redisClient, isReady } from '../../config/redisConfig';
import { PositionType, zAddItem } from '../../contants/RedisContants';

export default class RedisManager {
  protected client?: RedisClientType;
  constructor() {
    if (isReady) this.client = redisClient;
  }
  protected get(key: string) {
    return this.client?.get(key);
  }
  protected jsonGet(key: string) {
    return this.client?.json.get(key);
  }
  protected set(key: string, value: string, options?: any) {
    return this.client?.set(key, value, options);
  }
  protected jsonSet(key: string, value: string) {
    return this.client?.json.set(key, '$', value);
  }
  protected setEx(key: string, value: string, seconds: number) {
    return this.client?.setEx(key, seconds, value);
  }
  protected lPush(key: string, value: Array<any> = []) {
    return this.client?.lPush(key, value);
  }
  protected lRange(key: string, start: number = 0, stop: number = -1) {
    return this.client?.lRange(key, start, stop);
  }
  protected lInsert(key: string, beforeValue: any, data: any, type: PositionType = PositionType.BEFORE) {
    return this.client?.lInsert(key, type, beforeValue, data);
  }
  protected rPop(key: string) {
    return this.client?.rPop(key);
  }
  protected lPop(key: string) {
    return this.client?.lPop(key);
  }
  protected lPopCount(key: string, count: number) {
    return this.client?.lPopCount(key, count);
  }
  protected rPopCount(key: string, count: number) {
    return this.client?.rPopCount(key, count);
  }
  protected lRem(key: string, count: number, removeValue: any) {
    return this.client?.lRem(key, count, removeValue);
  }
  protected del(key: string) {
    return this.client?.del(key);
  }
  protected hSet(key: string, field: string, value: string) {
    return this.client?.hSet(key, field, value);
  }
  protected hGet(key: string, field: string) {
    return this.client?.hGet(key, field);
  }
  protected hDel(key: string, field: string) {
    return this.client?.hDel(key, field);
  }
  protected sMembers(key: string) {
    return this.client?.sMembers(key);
  }
  protected sAdd(key: string, arrayValue: Array<any>) {
    return this.client?.sAdd(key, arrayValue);
  }
  protected zAdd(key: string, arrayValue: Array<zAddItem>) {
    return this.client?.zAdd(key, arrayValue);
  }
  protected zRange(key: string, start: number = 0, stop: number = -1) {
    return this.client?.zRange(key, start, stop);
  }
  protected flush() {
    return this.client?.flushAll();
  }
}
