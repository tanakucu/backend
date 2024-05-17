import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: 'item_collection'
})
export class TableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @Column({ nullable: true })
    owner: string;

    @Column({ nullable: true })
    department: string;

    @Column({ nullable: true })
    complain: string;

    @Column({ nullable: true })
    barcode: string;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    model: string;

    @Column({ nullable: true })
    serviceTag: string;

    @Column({ nullable: true })
    storage: string;

    @Column({ nullable: true })
    ram: string;

    @Column({ nullable: true })
    cpu: string;

    @Column({ nullable: true })
    mac: string;

    @Column({ nullable: true })
    os: string;

    @Column({ nullable: true })
    pcName: string;

    @Column({ nullable: true })
    powerSupply: string;

    @Column({ nullable: true })
    user: string;

    @Column({ nullable: true })
    operation: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    demand: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;
}