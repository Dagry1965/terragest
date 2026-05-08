interface OfflineAction {
  type: string;

  payload: any;
}

const queue: OfflineAction[] = [];

export function enqueueOfflineAction(
  action: OfflineAction
) {
  queue.push(action);
}

export function getOfflineQueue() {
  return queue;
}

export async function processOfflineQueue(
  processor: (
    action: OfflineAction
  ) => Promise<void>
) {
  while (queue.length > 0) {
    const action = queue.shift();

    if (!action) {
      continue;
    }

    await processor(action);
  }
}
