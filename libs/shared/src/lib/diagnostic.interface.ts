export interface Diagnostic {
    id: number,
    definitionId: number,
    dentistId: number,
    patientId: number,
    startDate: Date,
    endDate?: Date,
    comment?: string,
    teeth?: Array<DiagnosticTooth>,
    createdOn: Date,
}

export interface DiagnosticTooth {
    toothFdiNumber: number,
    toothParts?: Array<string>,
}