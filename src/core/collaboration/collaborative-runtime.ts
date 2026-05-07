export type RuntimePresence = {
  userId: string;

  userName: string;

  module: string;

  entityId?: string;

  joinedAt: string;

  activity?: string;
};

const activeUsers:
  RuntimePresence[] = [];

export function joinRuntime(
  presence: RuntimePresence
) {
  const exists =
    activeUsers.find(
      (user) =>
        user.userId ===
        presence.userId
    );

  if (exists) {
    return;
  }

  activeUsers.push(
    presence
  );

  console.log(
    "ERP USER JOINED RUNTIME",
    presence.userName
  );
}

export function leaveRuntime(
  userId: string
) {
  const index =
    activeUsers.findIndex(
      (user) =>
        user.userId ===
        userId
    );

  if (index >= 0) {
    activeUsers.splice(
      index,
      1
    );
  }

  console.log(
    "ERP USER LEFT RUNTIME",
    userId
  );
}

export function updateRuntimeActivity(
  userId: string,
  activity: string
) {
  const user =
    activeUsers.find(
      (item) =>
        item.userId ===
        userId
    );

  if (!user) {
    return;
  }

  user.activity =
    activity;
}

export function getRuntimePresence() {
  return activeUsers;
}
