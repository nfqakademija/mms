import { membershipConstants } from "../constants/membership.constants";
export function memberships(state = { items: [] }, action) {
  switch (action.type) {
    case membershipConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case membershipConstants.GETALL_SUCCESS:
      return {
        items: action.memberships
      };
    case membershipConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case membershipConstants.CREATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case membershipConstants.CREATE_SUCCESS:
      let items = state.items;
      items.push(action.membership);
      return {
        ...state,
        items: items
      };
    case membershipConstants.CREATE_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case membershipConstants.DELETE_REQUEST:
      // add 'deleting:true' property to membership being deleted
      return {
        ...state,
        items: state.items.map(membership =>
          membership.id === action.id
            ? { ...membership, deleting: true }
            : membership
        )
      };
    case membershipConstants.DELETE_SUCCESS:
      // remove deleted membership from state
      return {
        items: state.items.filter(membership => membership.id !== action.id)
      };
    case membershipConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to membership
      return {
        ...state,
        items: state.items.map(membership => {
          if (membership.id === action.id) {
            // make copy of membership without 'deleting:true' property
            const { deleting, ...membershipCopy } = membership;
            // return copy of membership with 'deleteError:[error]' property
            return { ...membershipCopy, deleteError: action.error };
          }

          return membership;
        })
      };
    default:
      return state;
  }
}
