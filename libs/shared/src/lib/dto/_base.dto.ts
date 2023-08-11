export abstract class BaseDto {
    id?: string
    creationDate?: Date;
    updateDate?: Date;
    deletedDate?: Date;
    version?: number;
}