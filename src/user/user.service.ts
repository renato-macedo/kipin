import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        email: 'john@john.com',
        password: 'changeme',
      },
      {
        userId: 2,
        email: 'chris@chris.com',
        password: 'secret',
      },
      {
        userId: 3,
        email: 'maria@maria.com',
        password: 'guess',
      },
    ];
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
}
