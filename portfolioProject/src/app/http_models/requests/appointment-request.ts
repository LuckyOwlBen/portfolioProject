export interface ScheduleAppointmentRequest {
    year: bigint,
    month: bigint,
    day: bigint,
    timeslot: bigint,
    jobId: String
}