// @flow

import AccountModel, { createAccountFromBackend } from "./account"
import ApiKeyModel from "./apiKey"
import WebhookModel from "./webhook"
import FilterModel, { createFilterFromBackend } from "./filter"
import SlackUserModel, { createSlackUserFromBackend } from "./slackUser"
import TodoListModel, { createTodoListFromBackend } from "./todoList"

type ConstructorArgs = {
  name?: string,
  token?: string,
  email?: string,
  imageUrl?: string,
  uuid?: string,
  account?: AccountModel,
  isAccountAdmin?: boolean,
  lastLoginAt: string,
  timeZone: string
}

export default class User {
  account: AccountModel
  apiKeys: Array<ApiKeyModel>
  webhooks: Array<WebhookModel>
  views: Array<FilterModel>
  slackUsers: Array<SlackUserModel>
  todoLists: Array<TodoListModel>

  name: string
  token: string
  email: string
  imageUrl: string
  uuid: string
  isAccountAdmin: boolean
  lastLoginAt: string
  timeZone: string

  constructor(args: ConstructorArgs) {
    this.account = args.account
    this.apiKeys = args.apiKeys || []
    this.webhooks = args.webhooks || []
    this.views = args.views || []
    this.slackUsers = args.slackUsers || []
    this.todoLists = args.todoLists || []

    this.name = args.name || ""
    this.token = args.token || ""
    this.email = args.email || ""
    this.imageUrl = args.imageUrl || ""
    this.uuid = args.uuid || ""
    this.isAccountAdmin = args.isAccountAdmin || false
    this.lastLoginAt = args.lastLoginAt || ""
    this.timeZone = args.timeZone
  }

  defaultFilter() {
    const defaultView = this.views.find(v => v.isDefault)
    return defaultView ? defaultView : {}
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
      timeZone: this.timeZone,
      apiKeys: this.apiKeys.map(key => new ApiKeyModel(key).toJSON()),
      webhooks: this.webhooks.map(hook => new WebhookModel(hook).toJSON()),
      views: this.views.map(view => new FilterModel(view).toJSON()),
      slackUsers: this.slackUsers.map(slackUser =>
        new SlackUserModel(slackUser).toJSON()
      ),
      todoLists: this.todoLists.map(todoList =>
        new TodoListModel(todoList).toJSON()
      )
    }
    if (this.account) ret.account = new AccountModel(this.account).toJSON()

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
    timeZone: backendJSON.time_zone,
    apiKeys: (backendJSON.api_keys || []).map(attrs => new ApiKeyModel(attrs)),
    webhooks: (backendJSON.webhooks || []).map(
      attrs => new WebhookModel(attrs)
    ),
    views: (backendJSON.views || []).map(attrs =>
      createFilterFromBackend(attrs)
    ),
    slackUsers: (backendJSON.slack_users || []).map(attrs =>
      createSlackUserFromBackend(attrs)
    ),
    account: createAccountFromBackend(backendJSON.account || {}),
    todoLists: (backendJSON.todo_lists || []).map(attrs =>
      createTodoListFromBackend(attrs)
    )
  })
}
