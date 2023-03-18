import { Act } from "./act.entity";

export interface TreatmentDefinition {
    id: number,
    acts: Array<Act>,
    name: string,
    deleted?: boolean,
    createdBy: number,
    createdOn: Date,
}