// @flow

export interface Storeable {
  load(key: string): any;
  save(key: string, value: any): ?null;
  unset(key: string): ?null;
  clear(): ?null;
}
