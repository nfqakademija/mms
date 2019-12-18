import { userConstants } from "../constants/user.constants";
import { membershipActions } from "../actions/membership.actions";

export function users(
  state = { items: [], requests: [], requestsCount: 0 },
  action
) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };

    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        items: []
      };
    case userConstants.CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.CREATE_SUCCESS:
      let items = state.items;
      items.push(action.user);
      return {
        ...state,
        items: items
      };
    case userConstants.CREATE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.UPDATE_SUCCESS:
      items = state.items;
      let id = items.findIndex(x => x.id === action.user.id);
      items[id] = action.user;
      return {
        ...state,
        items: items
      };
    case userConstants.UPDATE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id ? { ...user, deleting: true } : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        ...state,
        requests: state.requests.filter(user => user.id !== action.id),
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    case userConstants.USERS_COMMENT_ADD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.USERS_COMMENT_ADD_SUCCESS:
      items = state.items;
      let userId = items.findIndex(x => x.id === action.comment.user.id);
      items[userId].comments.push(action.comment);

      return {
        ...state,
        items: items
      };
    case userConstants.USERS_COMMENT_ADD_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case userConstants.REQUESTS_GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };

    case userConstants.REQUESTS_GETALL_SUCCESS:
      return {
        ...state,
        requests: action.requests,
        requestsCount: action.requests.length
      };
    case userConstants.REQUESTS_GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        requests: []
      };
    case userConstants.REMOVE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter(user => user.id !== action.id),
        requestsCount: state.requests.length - 1
      };
    default:
      return state;
  }
}
