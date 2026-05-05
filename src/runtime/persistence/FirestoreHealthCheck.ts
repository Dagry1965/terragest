import {
  RuntimeEventRepository
}
from "./events/RuntimeEventRepository";

export async function
firestoreHealthCheck() {

  const repository =
    new RuntimeEventRepository();

  const events =
    await repository.getAll();

  console.log(
    "[Firestore Health]",
    events.length
  );
}
