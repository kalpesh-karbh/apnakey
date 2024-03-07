//export const BASE_URL = "https://www.giantft.com/projectx783rhe78ed/"
//export const BASE_URL = "https://www.m.apnakey.com/projectx783rhe78ed/"
export const BASE_URL = 'https://www.m.apnakey.com/public/'
export const PUBLIC_BASE_URL = 'https://m.apnakey.com/public/dashboardApi/'
export const RETREIVE_BRANCH_INFO = `${BASE_URL}getBranchInformation.php` //--
export const API_URL = 'https://api.apnakey.com/partner-staging/v1/api/'
export const PROFILE = `${API_URL}Profile`
export const CONTACTS = `${API_URL}Profile/Contacts`
export const PAYMENT = `${API_URL}Profile/Payment`
export const BOOKING = `${API_URL}Booking`
export const EVENT = `${API_URL}Event`
export const INVENTORY = `${API_URL}Inventory`
export const REPORT = `${API_URL}Report`
export const CALENDAR = `${API_URL}Calendar`
export const CALENDAR_Activity_Groups = `${API_URL}Calendar/options`
export const ACTIVITY = `${API_URL}Activity`
export const BRANCH_DATA = `${BASE_URL}get_branch_report.php`

export const GET_ACTIVITY_GROUP = `${BASE_URL}get_branch_activity_groups.php`
export const ACTIVITY_GROUP = `${ACTIVITY}/ActivityGroups`
export const ADD_ACTIVITY_GROUP = `${BASE_URL}create_activity_group.php`
export const ACTIVITY_DATA = `${BASE_URL}get_activity_list.php`
export const GET_TIMESLOTS = `${BASE_URL}get_activity_time_slots.php`
export const UPDATE_ACTIVITY = `${BASE_URL}update_activity.php`

// IGNORE FOR NOW
export const DELETE_ACTIVIVTY = `${BASE_URL}delete_activity.php`

// REMOVE cancel activity and ADD_ACTIVITY - (DOES NOT WORK SINCE CHAT HAS CHANGED SYSTEMS)
export const ADD_ACTIVITY = `${BASE_URL}create_activity.php`
export const CANCEL_ACTIVITY = `${BASE_URL}remove_supervisored_activity.php`
export const REFUND_ACTIVITY = `${BASE_URL}refund_activity.php`

export const UPDATE_BRANCH_ADDRESS = `${BASE_URL}update_branch_address.php`
export const UPDATE_CONTACT = `${BASE_URL}update_contact_info.php`

export const CHAT_MESSAGES = `${BASE_URL}get_messages.php`
export const SEND_MESSAGE = `${BASE_URL}send_message.php`
export const UPDATE_FCM = `${BASE_URL}update_supervisor_fcm.php`
export const PRIVATE_MESSAGE_USERS = `${BASE_URL}getPrivateUsersList.php`
export const SEND_PRIVATE_MESSAGE = `${BASE_URL}sendSingleMessage.php`

export const BOOK_MANUALLY = `${BASE_URL}book_manually.php`
export const UPDATE_NOTES = `${BASE_URL}update_note.php`

export const KANBAN_BOOKING = `${PUBLIC_BASE_URL}field_name`
export const UPDATE_FIELD_NAME = `${PUBLIC_BASE_URL}field_names`
export const UPDATE_BOOKING_TO_FIELD = `${PUBLIC_BASE_URL}update_booking_for_field`

export const FIELD = `${API_URL}field`
export const GET_FIELDS = `${BASE_URL}get_branch_fields.php`
export const ADD_FIELD = `${BASE_URL}add_branch_field.php`
export const UPDATE_FIELD = ``
export const BLOCK_FIELD = ``
export const EDIT_EVENT_REQUEST = `${BASE_URL}submit_event_request.php`

export const CREATE_INSTANT_EVENTS = `${BASE_URL}create_single_event.php`
export const GET_EVENT_USER_LIST = `${BASE_URL}get_event_user_list.php`

export const VERIFY_EVENT = `${BASE_URL}verify_event_code.php`

export const ADD_TASK = `${BASE_URL}add_calendar_task.php`
export const DONE_TASK = `${BASE_URL}done_calendar_note.php`
export const DELETE_TASK = `${BASE_URL}delete_calendar_task.php`

export const GET_CALENDAR_EVENTS = `${BASE_URL}get_calendar_events.php`
export const GET_CALENDAR_DATES = `${BASE_URL}get_calendar_dates.php`
export const GET_CALENDAR_ACTIVITY_DATES = `${BASE_URL}get_calendar_activity_dates.php`

export const GET_CARD = `${BASE_URL}retrieve_sup_connect_card.php`
export const ADD_CARD = `${BASE_URL}add_connected_card.php`

export const SIGN_OUT = `${BASE_URL}sign_out_supervisor.php`

export const SHOWN_INTEREST = `${BASE_URL}submit_shown_interest.php`
export const GOOGLE_CALENDAR_ACCESS = `${BASE_URL}google_calendar_access.php`
