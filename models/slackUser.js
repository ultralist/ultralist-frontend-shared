// @flow

type ConstructorArgs = {
  id: string,
  slackUserId: string,
  slackUserName: string,
  slackTeamId: string,
  slackTeamDomain: string,
  todoListID: string,
  receivesAgenda: boolean
}

export default class SlackUser {
  id: string
  slackUserId: string
  slackUserName: string
  slackTeamId: string
  slackTeamDomain: string
  todoListID: string
  receivesAgenda: boolean

  constructor(args: ConstructorArgs) {
    this.id = args.id
    this.slackUserId = args.slackUserId
    this.slackUserName = args.slackUserName
    this.slackTeamId = args.slackTeamId
    this.slackTeamDomain = args.slackTeamDomain
    this.todoListID = args.todoListID
    this.receivesAgenda = args.receivesAgenda
  }

  toJSON() {
    return {
      id: this.id,
      slackUserId: this.slackUserId,
      slackUserName: this.slackUserName,
      slackTeamId: this.slackTeamId,
      slackTeamDomain: this.slackTeamDomain,
      todoListID: this.todoListID,
      receivesAgenda: this.receivesAgenda
    }
  }
}

export const createSlackUserFromBackend = (backendJSON: Object) => {
  return new SlackUser({
    id: backendJSON.id,
    slackUserId: backendJSON.slack_user_id,
    slackUserName: backendJSON.slack_user_name,
    slackTeamId: backendJSON.slack_team_id,
    slackTeamDomain: backendJSON.slack_team_domain,
    todoListID: backendJSON.todo_list_id,
    receivesAgenda: backendJSON.receives_agenda
  })
}
