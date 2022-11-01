export interface Treatment {
    id: number,
    definitionId: number,
    dentistId: number,
    patientId: number,
    teeth?: Array<TreatmentTooth>,
    comment?: string,
    startDate: Date,
    endDate?: Date,
    createdOn: Date,
}

export interface TreatmentTooth {
    toothFdiNumber: number,
    toothParts?: Array<string>,
}