import { UserMeta, Users } from '../typeorm';

export class UserDto {
  uid: string;
  email: string;
  name: string;
  surname: string;
  birthdate: string;
  phone: string;

  constructor(user: Users & { userMeta: UserMeta }) {
    this.uid = user.uid;
    this.email = user.email;
    this.name = user.userMeta.name;
    this.surname = user.userMeta.surname;
    this.birthdate = user.userMeta.birthdate;
    this.phone = user.userMeta.phone;
  }
}
