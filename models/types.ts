export interface User {
    name: string;
    email: string;
    password: string;
};

export interface CalendarEvent {
    title: string;
    start: Date;
    endDate: Date;
    notes: string;
    user: User
};