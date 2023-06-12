import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Prisma, User } from '@prisma/client';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  loadUsers() {
    return this.http.get<User[]>(environment.baseUrl + '/api/v1/users/all');
  }

  createUser(user: Prisma.UserCreateInput) {
    return this.http.post<User>(
      environment.baseUrl + '/api/v1/users/create',
      user
    );
  }

  deleteUser(id: string) {
    return this.http.delete<User>(environment.baseUrl + '/api/v1/users/' + id);
  }

  fetchUser(id: string) {
    return this.http.get<User>(environment.baseUrl + '/api/v1/users/' + id);
  }
}
