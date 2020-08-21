import { User } from "../models/user.model";
import {Subject} from "rxjs/Subject";

export class UserService{
    private users: User[] = [{
        firstName: 'Jamdes',
        lastName: 'Smidth',
        email: 'james.smith@yahoo.fr',
        drinkPreference: 'Coca Zero',
        hobbies: ['Natation', 'Musculation']

    }]
    userSubject = new Subject<User[]>();

    emitUsers(){
        this.userSubject.next(this.users.slice());
    }

    addUser(user:User){
        this.users.push(user);
        this.emitUsers();
    }
}