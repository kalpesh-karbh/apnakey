// actions.ts

export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const SET_USER_TYPE = "SET_USER_TYPE";
export const SET_BASE_URL = "SET_BASE_URL";
export const SET_SERVICE_TYPE = "SET_SERVICE_TYPE";
export const SET_USER_PERMISSION = "SET_USER_PERMISSION";
export const SET_AUTH = "SET_AUTH";
export const SET_AVATAR = "SET_AVATAR";
export const SET_COMPANY_DETAILS = "SET_COMPANY_DETAILS";

interface SetUserDetailsAction {
  type: typeof SET_USER_DETAILS;
  payload: { user: any };
}

interface SetCompanyDetailsAction {
  type: typeof SET_COMPANY_DETAILS;
  payload: { company: any };
}

interface SetUserTypeAction {
  type: typeof SET_USER_TYPE;
  payload: { userType: string };
}

interface SetBaseUrlAction {
  type: typeof SET_BASE_URL;
  payload: { baseUrl: string };
}

interface SetServiceTypeAction {
  type: typeof SET_SERVICE_TYPE;
  payload: { serviceType: string };
}

interface SetUserPermissionAction {
  type: typeof SET_USER_PERMISSION;
  payload: { userPermission: string };
}

interface SetAuthAction {
  type: typeof SET_AUTH;
  payload: { auth: boolean };
}

interface SetAvatarAction {
  type: typeof SET_AVATAR;
  payload: { avatar: string };
}

export type ActionTypes =
  | SetUserDetailsAction
  | SetCompanyDetailsAction
  | SetUserTypeAction
  | SetBaseUrlAction
  | SetServiceTypeAction
  | SetUserPermissionAction
  | SetAuthAction
  | SetAvatarAction;

export const setUserDetails = (user: any): SetUserDetailsAction => ({
  type: SET_USER_DETAILS,
  payload: { user },
});

export const setCompanyDetails = (company: any): SetCompanyDetailsAction => ({
  type: SET_COMPANY_DETAILS,
  payload: { company },
});

export const setUserType = (userType: string): SetUserTypeAction => ({
  type: SET_USER_TYPE,
  payload: { userType },
});

export const setBaseUrl = (baseUrl: string): SetBaseUrlAction => ({
  type: SET_BASE_URL,
  payload: { baseUrl },
});

export const setServiceType = (serviceType: string): SetServiceTypeAction => ({
  type: SET_SERVICE_TYPE,
  payload: { serviceType },
});

export const setAuth = (auth: boolean): SetAuthAction => ({
  type: SET_AUTH,
  payload: { auth },
});

export const setAvatar = (avatar: string): SetAvatarAction => ({
  type: SET_AVATAR,
  payload: { avatar },
});

export const setUserPermission = (
  userPermission: string
): SetUserPermissionAction => ({
  type: SET_USER_PERMISSION,
  payload: { userPermission },
});
