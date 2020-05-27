// @flow

import AccountModel, { createAccountFromBackend } from "./account"

type ConstructorArgs = {
  name?: string,
  token?: string,
  email?: string,
  imageUrl?: string,
  uuid?: string,
  status?: string,
  account?: AccountModel
}

export default class User {
  name: string
  token: string
  email: string
  imageUrl: string
  uuid: string
  status: string
  account: AccountModel
  isAccountAdmin: boolean

  constructor(args: ConstructorArgs) {
    this.name = args.name || ""
    this.token = args.token || ""
    this.email = args.email || ""
    this.imageUrl = args.imageUrl || ""
    this.status = args.status || ""
    this.uuid = args.uuid || ""
    this.account = args.account
    this.isAccountAdmin = args.isAccountAdmin || false
  }

  toJSON() {
    return {
      name: this.name,
      token: this.token,
      email: this.email,
      uuid: this.uuid,
      status: this.status,
      imageUrl: this.imageUrl,
      isAccountAdmin: this.isAccountAdmin,
      account: this.account.toJSON()
    }
  }
}

export const createUserFromBackend = (backendJSON: Object) => {
  return new User({
    name: backendJSON.name,
    token: backendJSON.token,
    email: backendJSON.email,
    uuid: backendJSON.uuid,
    status: backendJSON.status,
    imageUrl: backendJSON.image_url,
    isAccountAdmin: backendJSON.is_account_admin,
    account: createAccountFromBackend(backendJSON.account)
  })
}
