export interface AppState {
    jobId: String;
    customer: {
        firstName: String;
        lastName: String;
    }
    appointment: {
        date: String;
        timeSlot: BigInteger;
    }
}