import { userConstants } from "../constants/user.constants";

export function users(state = { items: [] }, action) {
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
      console.log(items);
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
    default:
      return state;
  }
}
