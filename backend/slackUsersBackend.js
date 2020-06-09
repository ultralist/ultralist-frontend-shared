// @flow

import { Backendable } from "./backends/backendable"

import SlackUser from "../models/slackUser"

export default class SlackUsersBackend {
  token: string
  backend: Backendable

  constructor(token: string, backend: Backendable) {
    this.token = token
    this.backend = backend
  }

  getSlackUsers() {
    return this.backend.apiRequest("api/v1/user/slack_users", "GET", this.token)
  }

  updateSlackUser(slackUser: SlackUser) {
    return this.backend.apiRequest(
      `api/v1/user/slack_users/${slackUser.id}`,
      "PUT",
      this.token,
      slackUser.toJSON()
    )
  }

  createSlackUser(slackUser: SlackUser) {
    return this.backend.apiRequest(
      "api/v1/user/slack_users",
      "POST",
      this.token,
      {
        slack_user_id: slackUser.slackUserId,
        slack_user_name: slackUser.slackUserName,
        slack_team_id: slackUser.slackTeamId,
        slack_team_domain: slackUser.slackTeamDomain
      }
    )
  }

  deleteSlackUser(slackUser: SlackUser) {
    return this.backend.apiRequest(
      `api/v1/user/slack_users/${slackUser.id}`,
      "DELETE",
      this.token,
      slackUser.toJSON()
    )
  }
}
