import { createAction, props } from "@ngrx/store";
import { ScheduleAppointmentRequest } from "../../http_models/requests/appointment-request";
import { ScheduleAppointmentResponse } from "../../http_models/responses/appointment-response";

export const scheduleAppointment =
    createAction('[Appointment Component] Add Appointment',
    props<{request: ScheduleAppointmentRequest}>()
);

export const scheduleAppointmentSuccess = createAction('[Appointment Component] Add Appointment Success',
    props<{response: ScheduleAppointmentResponse}>()
);

export const scheduleAppointmentFailure = createAction('[Appointment Component] Add Appointment Failure',
    props<{error: any}>()
);
