// @flow

import { Backendable } from "./backends/backendable"
import AccountModel from "../models/account"

export default class AccountBackend {
  token: string
  backend: Backendable

  constructor(token: string, backend: Backendable) {
    this.token = token
    this.backend = backend
  }

  updateAccount(
    account: AccountModel,
    stripePlan: string,
    paymentMethodId: string
  ) {
    return this.backend.apiRequest("api/v1/account", "PUT", this.token, {
      stripe_plan: stripePlan,
      payment_method_id: paymentMethodId,
      account
    })
  }

  getAccount() {
    return this.backend.apiRequest("/api/v1/account", "GET", this.token)
  }
}
