// @flow
import { Storeable } from "./storeable"
import utils from "../utils"

export default class SlackStorage {
  storage: Storeable

  constructor(storage: Storeable) {
    this.storage = storage
  }

  clearSlackAuthParams() {
    this.storage.unset("slack_auth_params")
  }

  getSlackAuthParams(): Object {
    return this.storage.load("slack_auth_params") || {}
  }

  setSlackAuthParams() {
    this.storage.save("slack_auth_params", {
      userAuth: utils.getUrlParam("slack_user_auth") === "true",
      user_id: utils.getUrlParam("slack_user_id"),
      user_name: utils.getUrlParam("slack_user_name"),
      team_id: utils.getUrlParam("slack_team_id"),
      team_domain: utils.getUrlParam("slack_team_domain")
    })
  }
}
