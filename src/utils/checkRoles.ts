import { IUser } from "./../models/IUser";
export function checkRoles(user: IUser, role: string): boolean {
  const rolesArr = user.roles.map((r) => r.code_name);

  return rolesArr.includes(role);
}
