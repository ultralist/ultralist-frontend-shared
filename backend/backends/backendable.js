// @flow

export interface Backendable {
  apiRequest(path: string, method: string, token: string, params: object): any;
}
