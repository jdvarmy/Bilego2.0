import { Users } from '../typeorm';
import { UserDto } from './UserDto';

export class UserDtoMeta extends UserDto {
  status: number;
  access: { ip: string; device: string; update: Date }[];

  constructor(user: Users) {
    super(user);
    this.status = user.status;
    this.access = user.userAccess.map(({ ip, device, updateDateTime }) => ({
      ip,
      device,
      update: updateDateTime,
    }));
  }
}
