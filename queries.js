import gql from "graphql-tag";

export const ALL_TODOS = gql`
  {
    todos {
      id
      title
      completed
    }
  }
`;

export const ADD = gql`
  mutation add($title: String!) {
    add(id: $id, title: $title, completed: $completed) {
      id,
      title,
      completed
    }
  }
`;

export const REMOVE = gql`
  mutation remove($id: String!) {
    remove(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`;

