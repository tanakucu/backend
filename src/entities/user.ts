import { Entity , PrimaryGeneratedColumn , Column} from "typeorm";

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

      @Column({nullable : true})
    created_date : Date;
    
      @Column({nullable : true})
    modified_date : Date

    @Column({nullable: true})
    role: string;
}