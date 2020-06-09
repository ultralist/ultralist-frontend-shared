// @flow

type ConstructorArgs = {
  id: string,
  slackUserId: string,
  slackUserName: string,
  slackTeamId: string,
  slackTeamDomain: string
}

export default class SlackUser {
  id: string
  slackUserId: string
  slackUserName: string
  slackTeamId: string
  slackTeamDomain: string

  constructor(args: ConstructorArgs) {
    this.id = args.id
    this.slackUserId = args.slackUserId
    this.slackUserName = args.slackUserName
    this.slackTeamId = args.slackTeamId
    this.slackTeamDomain = args.slackTeamDomain
  }

  toJSON() {
    return {
      id: this.id,
      slackUserId: this.slackUserId,
      slackUserName: this.slackUserName,
      slackTeamId: this.slackTeamId,
      slackTeamDomain: this.slackTeamDomain
    }
  }
}
