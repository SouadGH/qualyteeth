export interface ServiceDefinition {
    id: number;
    name: string;
    category: string;
    deleted?: boolean,
    createdBy: number,
    createdOn: Date
}