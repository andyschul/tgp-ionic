/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    name
    description
  }
}
`;
export const listTodos = `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser {
  getUser {
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
export const getGroup = `query GetGroup($id: ID!) {
  getGroup(id: $id) {
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
