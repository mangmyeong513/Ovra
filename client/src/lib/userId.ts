// src/lib/userId.ts
export function toUserKey(
  user: string | { id?: string; username?: string } | null | undefined
) {
  if (!user) return "";
  if (typeof user === "string") return user;
  return user.id ?? user.username ?? "";
}
