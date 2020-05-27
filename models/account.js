// @flow

type ConstructorArgs = {
  status?: string,
  freeTrialEndsAt?: string,
  inviteCode?: string,
  errors?: string,
  cancelled_at?: string
}

export default class Account {
  status: string
  freeTrialEndsAt: string
  inviteCode: string
  errors: string
  cancelledAt: string

  constructor(args: ConstructorArgs) {
    this.status = args.status || ""
    this.freeTrialEndsAt = args.freeTrialEndsAt || ""
    this.inviteCode = args.inviteCode || ""
    this.errors = args.errors || ""
    this.cancelledAt = args.cancelled_at || ""
  }

  toJSON() {
    return {
      status: this.status,
      freeTrialEndsAt: this.freeTrialEndsAt,
      inviteCode: this.inviteCode,
      errors: this.errors,
      cancelledAt: this.cancelledAt
    }
  }
}

export const createAccountFromBackend = (backendJSON: Object) => {
  return new Account({
    status: backendJSON.status,
    freeTrialEndsAt: backendJSON.free_trial_ends_at,
    inviteCode: backendJSON.invite_code,
    errors: backendJSON.errors,
    cancelledAt: backendJSON.cancelled_at
  })
}
