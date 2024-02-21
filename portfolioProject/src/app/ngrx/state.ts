export interface AppState {
    jobId: String;
    customer: {
        firstName: String;
        lastName: String;
    }
    appointment: {
        date: String;
        timeSlot: number;
    }
}

export const InitialState: AppState = {
    jobId: '',
    customer: {
        firstName: '',
        lastName: '',
    },
    appointment: {
        date: '',
        timeSlot: 0,
    }
};
