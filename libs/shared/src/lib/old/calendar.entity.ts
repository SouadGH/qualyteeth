export type CalendarStatus = 'REQUESTED' | 'VALIDATED' | 'REJECTED' | 'CANCELLED' | 'MISSED';

export interface CalendarEvent {
    id: number,
    dentistId: number,
    serviceDefinitionId?: number,
    patientId?: number,
    status: CalendarStatus,
    startDate: Date,
    endDate: Date,
    allDay?: boolean,
    location?: string,
    url?: string,
    notes?: string,
    reminders?: string,
    rrule?: string,
    createdOn: Date,
}

export interface FullCalendarEvent {
    id?: number,
    groupId?: number,
    allDay?: boolean,
    start?: Date,
    end?: Date,
    startStr?: string,
    endStr?: string,
    title?: string,
    url?: string,
    classNames?: Array<string>,
    editable?: boolean,
    startEditable?: boolean,
    durationEditable?: boolean,
    resourceEditable?: boolean,
    display?: string,
    overlap?: any,
    constraint?: any,
    backgroundColor?: any,
    borderColor?: any,
    textColor?: any,
    extendedProps?: any,
    source?: any,
    resourceId?: string,
}