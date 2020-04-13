// @flow

export interface LocalStoreable {
  load(key: string): any;
  save(key: string, value: any): ?null;
}
