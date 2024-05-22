import { Entity , PrimaryGeneratedColumn , Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity({
    name : 'users'
})
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({nullable : true})
    username : string;

    @Column({nullable : true})
    password : string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    modifiedDate: Date;

    @Column({nullable: true})
    role: string;
}