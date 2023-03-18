import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class Base {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @CreateDateColumn({ select: true, type: 'timestamptz', precision: 3 })
    public creationDate!: Date;

    @UpdateDateColumn({ select: false, type: 'timestamptz', precision: 3 })
    @Exclude()
    public updateDate!: Date;

    @DeleteDateColumn({ nullable: true, type: 'timestamptz', precision: 3 })
    public deletedDate?: Date;

    @VersionColumn({ nullable: true, select: false })
    @Exclude()
    public version?: number;
}