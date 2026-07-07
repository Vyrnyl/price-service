import { apiFetch } from "../../../../lib/api";
import type { AddUserForm, User } from "../types/users.types";

export async function getUsers() {
  return apiFetch<User[]>("/api/users", {
    method: "GET",
    credentials: "include",
  });
}

export async function createUser(payload: AddUserForm) {
  return apiFetch<User>("/api/users", {
    method: "POST",
    body: payload,
    credentials: "include",
  });
}

export async function updateUserStatus(userId: string, isActive: boolean) {
  return apiFetch<User>(`/api/users/${userId}`, {
    method: "PUT",
    body: { isActive },
    credentials: "include",
  });
}
