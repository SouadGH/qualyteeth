import { Act } from "./act.interface";

export interface TreatmentDefinition {
    id: number,
    acts: Array<Act>,
    name: string,
    deleted?: boolean,
    createdBy: number,
    createdOn: Date,
}