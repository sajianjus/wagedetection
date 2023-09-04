export const BACKEND_URL = "_env_" in window ? window._env_.BACKEND_URL : "http://localhost:8000/";

export const REGISTERATION_ENDPOINT = BACKEND_URL + "api/users/register/";

export const VERIFY_EMAIL_ENDPOINT = BACKEND_URL + "api/users/email/verify/";

export const LOGIN_ENDPOINT = BACKEND_URL + "api/users/token/";

export const PROFILE_ENDPOINT = BACKEND_URL + "api/users/profile/";
export const PROFILE_UPDATE_ENDPOINT = BACKEND_URL + "api/users/profile/update/";

export const FORGOT_PASSWORD_ENDPOINT = BACKEND_URL + "api/users/password/forgot/";

export const RESET_PASSWORD_ENDPOINT = BACKEND_URL + "api/users/password/reset/";




export const TIMEPERIOD_ENDPOINT = BACKEND_URL + "api/timeperiod/";

export const SLOTS_ENDPOINT = BACKEND_URL + "api/slots/";
export const SLOT_ENDPOINT = BACKEND_URL + "api/slot/";



export const AGREEMENT_DETAIL_ENDPOINT = BACKEND_URL + "api/agreementdetail/";



export const AWARD_ENDPOINT = BACKEND_URL + "api/awards/";
export const AWARD_CLASSIFICATION_ENDPOINT = BACKEND_URL + "api/awardClassifications/";