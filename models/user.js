// @flow

import AccountModel, { createAccountFromBackend } from "./account"

type ConstructorArgs = {
  name?: string,
  token?: string,
  email?: string,
  imageUrl?: string,
  uuid?: string,
  account?: AccountModel,
  isAccountAdmin?: boolean,
  lastLoginAt: string
}

export default class User {
  name: string
  token: string
  email: string
  imageUrl: string
  uuid: string
  account: AccountModel
  isAccountAdmin: boolean
  lastLoginAt: string

  constructor(args: ConstructorArgs) {
    this.name = args.name || ""
    this.token = args.token || ""
    this.email = args.email || ""
    this.imageUrl = args.imageUrl || ""
    this.uuid = args.uuid || ""
    this.account = args.account
    this.isAccountAdmin = args.isAccountAdmin || false
    this.lastLoginAt = args.lastLoginAt || ""
  }

  toJSON() {
    const ret = {
      name: this.name,
      token: this.token,
      email: this.email,
      uuid: this.uuid,
      imageUrl: this.imageUrl,
      isAccountAdmin: this.isAccountAdmin,
      lastLoginAt: this.lastLoginAt
    }
    if (this.account) ret.account = this.account.toJSON()

    return ret
  }
}

export const createUserFromBackend = (backendJSON: Object) => {
  return new User({
    name: backendJSON.name,
    token: backendJSON.token,
    email: backendJSON.email,
    uuid: backendJSON.uuid,
    imageUrl: backendJSON.image_url,
    isAccountAdmin: backendJSON.is_account_admin,
    lastLoginAt: backendJSON.last_login_at,
    account: createAccountFromBackend(backendJSON.account || {})
  })
}
