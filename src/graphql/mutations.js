/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = `mutation CreateTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const updateTodo = `mutation UpdateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const deleteTodo = `mutation DeleteTodo($input: DeleteTodoInput!) {
  deleteTodo(input: $input) {
    id
    name
    description
  }
}
`;
export const createGroup = `mutation CreateGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
    id
    groupName
    owner
    invites
    users {
      firstName
      lastName
      role
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    email
    firstName
    lastName
    groups {
      id
      groupName
      role
      teamName
      users {
        firstName
        lastName
        role
      }
    }
  }
}
`;
export const inviteToGroup = `mutation InviteToGroup($input: InviteToGroupInput!) {
  inviteToGroup(input: $input) {
    response
    msg
    success
  }
}
`;
export const joinGroup = `mutation JoinGroup($input: JoinGroupInput!) {
  joinGroup(input: $input) {
    response
    msg
    success
  }
}
`;
export const updatePicks = `mutation UpdatePicks($input: UpdatePicksInput!) {
  updatePicks(input: $input) {
    response
    msg
    success
  }
}
`;
