import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [];
  usersUpdated = new EventEmitter<any[]>(); // Event emitter to notify when users are updated

  getUsers(): any[] {
    return this.users;
  }

  addUser(user: any) {
    this.users.push(user);
    this.emitUsersUpdated();
  }

  deleteUser(userId: number): void {
    const index = this.users.findIndex(user => user.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.emitUsersUpdated();
    }
  }

  getUserByName(name: string): any | undefined {
    return this.users.find(user => user.name === name);
  }

  updateUser(updatedUser: any): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.emitUsersUpdated();
    }
  }

  private emitUsersUpdated(): void {
    this.usersUpdated.emit([...this.users]);
  }
}
