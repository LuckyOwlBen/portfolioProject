export interface AvailabilityResponse {
    calendarEntries: CalendarEntry[];
}

export interface CalendarEntry {
    date: String;
    availabilityMap: Map<number, number>;
}