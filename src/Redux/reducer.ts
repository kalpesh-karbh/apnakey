// reducer.ts

import {
  ActionTypes,
  SET_USER_DETAILS,
  SET_USER_TYPE,
  SET_BASE_URL,
  SET_SERVICE_TYPE,
  SET_USER_PERMISSION,
  SET_AUTH,
  SET_AVATAR,
  SET_COMPANY_DETAILS,
} from "./actions";

interface AppState {
  user: {
    user: any;
    company: any;
    userType: string;
    baseUrl: string;
    serviceType: string;
    userPermission: any;
    auth: boolean;
    avatar: string;
  };
}

const domain = localStorage.getItem("domain");
const initialState: AppState = {
  user: {
    user: [],
    company: [],
    userType: "",
    baseUrl: domain ?? "",
    serviceType: "",
    userPermission: [],
    auth: false,
    avatar: "",
  },
};

const reducer = (state = initialState, action: ActionTypes): AppState => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        user: {
          ...state.user,
          user: action.payload.user,
        },
      };
    case SET_COMPANY_DETAILS:
      return {
        ...state,
        user: {
          ...state.user,
          company: action.payload.company,
        },
      };
    case SET_USER_TYPE:
      return {
        ...state,
        user: {
          ...state.user,
          userType: action.payload.userType,
        },
      };
    case SET_BASE_URL:
      return {
        ...state,
        user: {
          ...state.user,
          baseUrl: action.payload.baseUrl,
        },
      };
    case SET_SERVICE_TYPE:
      return {
        ...state,
        user: {
          ...state.user,
          serviceType: action.payload.serviceType,
        },
      };
    case SET_USER_PERMISSION:
      return {
        ...state,
        user: {
          ...state.user,
          userPermission: action.payload.userPermission,
        },
      };
    case SET_AUTH:
      return {
        ...state,
        user: {
          ...state.user,
          auth: action.payload.auth,
        },
      };
    case SET_AVATAR:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload.avatar,
        },
      };
    default:
      return state;
  }
};

export default reducer;
