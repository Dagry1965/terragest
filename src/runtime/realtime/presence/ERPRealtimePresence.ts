export type ERPRealtimePresence = {
  id: string;
  name: string;
  role: string;
  status: "online" | "idle" | "offline";
  module?: string;
  updatedAt: string;
};

class ERPRealtimePresenceStoreClass {
  private users: ERPRealtimePresence[] = [];

  upsert(user: ERPRealtimePresence) {
    const existing =
      this.users.some((item) => item.id === user.id);

    if (existing) {
      this.users = this.users.map((item) =>
        item.id === user.id ? user : item
      );
    } else {
      this.users.unshift(user);
    }

    this.users = this.users.slice(0, 100);
  }

  all() {
    return this.users;
  }
}

export const ERPRealtimePresenceStore =
  new ERPRealtimePresenceStoreClass();