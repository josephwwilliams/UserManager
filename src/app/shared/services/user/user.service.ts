import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Prisma, User } from '@prisma/client';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Inject HttpClient
  private http = inject(HttpClient);

  // Fetch all users
  loadUsers() {
    return this.http.get<User[]>(environment.baseUrl + '/api/v1/users/all');
  }

  // Create User
  createUser(user: Prisma.UserCreateInput) {
    return this.http.post<User>(
      environment.baseUrl + '/api/v1/users/create',
      user
    );
  }

  // Delete User
  deleteUser(id: string) {
    return this.http.delete<User>(environment.baseUrl + '/api/v1/users/' + id);
  }

  // Fetch Single User
  fetchUser(id: string) {
    return this.http.get<User>(environment.baseUrl + '/api/v1/users/' + id);
  }
}
