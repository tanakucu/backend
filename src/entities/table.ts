import { Entity , PrimaryGeneratedColumn , Column} from "typeorm";

@Entity({
    name : 'table'
})
export class TableEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({nullable : true})
    date : Date;

    @Column({nullable : true})
    owner : string;

    @Column({nullable : true})
    department : string;

    @Column({nullable : true})
    complain : string;

    @Column({nullable : true})
    barcode : string;

    @Column({nullable : true})
    type : string;

    @Column({nullable : true})
    model : string;

    @Column({nullable : true})
    serviceTag : string;

    @Column({nullable : true})
    storage : string;

    @Column({nullable : true})
    ram : string;

    @Column({nullable : true})
    cpu : string;

    @Column({nullable : true})
    mac : string;

    @Column({nullable : true})
    os : string;

    @Column({nullable : true})
    pcName : string;

    @Column({nullable : true})
    powerSupply : string;

    @Column({nullable : true})
    user : string;

    @Column({nullable : true})
    operation: string;

    @Column({nullable : true})
    description : string;

    @Column({nullable : true})
    demand : string;

    @Column({nullable: true })
    deletedAt: Date;

    @Column({ nullable: true })
    deletedBy: string;

    @Column({ nullable: true })
    updatedAt: Date;
  
    @Column({ nullable: true })
    updatedBy: string;
}