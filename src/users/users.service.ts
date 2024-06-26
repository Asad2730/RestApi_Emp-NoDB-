import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            role: "INTERN"
        },
        {
            id: 2,
            name: "Bob Smith",
            email: "bob.smith@example.com",
            role: "ENGINEER"
        },
        {
            id: 3,
            name: "Charlie Brown",
            email: "charlie.brown@example.com",
            role: "ADMIN"
        },
        {
            id: 4,
            name: "Diana Ross",
            email: "diana.ross@example.com",
            role: "ENGINEER"
        },
        {
            id: 5,
            name: "Ethan Hunt",
            email: "ethan.hunt@example.com",
            role: "INTERN"
        }
    ];


    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolsesArray = this.users.filter(i => i.role === role)
            if(!rolsesArray.length) throw new NotFoundException('user role not found') 
            return rolsesArray
        }

        return this.users
    }


    findOne(id: number) {
        const user = this.users.find(i => i.id === id)
        if(!user) throw new NotFoundException('user not found')
        return user
    }

    create(user: CreateUserDto) {
        const userByHighestId = [...this.users].sort((a: any, b: any) => b.id - a.id)
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }


    update(id: number, updatedUser: UpdateUserDto) {
        this.users = this.users.map((user)=>{
            if(user.id === id){
                return {...user,...updatedUser}
            }
            return user
        })

        return this.findOne(id)
    }


    delete(id:number){
        const removedUser = this.findOne(id)
        this.users.filter(i=>i.id !== id)
        return removedUser
    }
}
