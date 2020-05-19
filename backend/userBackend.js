// @flow

import { Backendable } from "./backends/backendable"
import UserModel from "../models/user"

export default class UserBackend {
  token: string
  backend: Backendable

  constructor(token: string, backend: Backendable) {
    this.token = token
    this.backend = backend
  }

  updateUser(user: UserModel, stripePlan: string, paymentMethodId: string) {
    return this.backend.apiRequest("api/v1/user", "PUT", this.token, {
      stripe_plan: stripePlan,
      payment_method_id: paymentMethodId,
      user
    })
  }

  getUser() {
    return this.backend.apiRequest("/api/v1/user", "GET", this.token)
  }
}
