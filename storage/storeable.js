// @flow

export interface Storeable {
  load(key: string): any;
  save(key: string, value: any): ?null;
  clear(): ?null;
}
