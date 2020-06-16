// @flow

import AccountModel, { createAccountFromBackend } from "./account"
import ApiKeyModel from "./apiKey"
import WebhookModel from "./webhook"
import ViewModel, { createViewFromBackend } from "./view"

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
  account: AccountModel
  apiKeys: Array<ApiKeyModel>
  webhooks: Array<WebhookModel>
  views: Array<ViewModel>

  name: string
  token: string
  email: string
  imageUrl: string
  uuid: string
  isAccountAdmin: boolean
  lastLoginAt: string

  constructor(args: ConstructorArgs) {
    this.account = args.account
    this.apiKeys = args.apiKeys || []
    this.webhooks = args.webhooks || []
    this.views = args.views || []

    this.name = args.name || ""
    this.token = args.token || ""
    this.email = args.email || ""
    this.imageUrl = args.imageUrl || ""
    this.uuid = args.uuid || ""
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
      lastLoginAt: this.lastLoginAt,
      apiKeys: this.apiKeys.map(key => key.toJSON()),
      webhooks: this.webhooks.map(hook => hook.toJSON()),
      views: this.views.map(view => view.toJSON())
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
    apiKeys: (backendJSON.api_keys || []).map(attrs => new ApiKeyModel(attrs)),
    webhooks: (backendJSON.webhooks || []).map(
      attrs => new WebhookModel(attrs)
    ),
    views: (backendJSON.views || []).map(attrs => createViewFromBackend(attrs)),
    account: createAccountFromBackend(backendJSON.account || {})
  })
}
