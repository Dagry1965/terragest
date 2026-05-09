import { runtimeDeadLetterQueue } from "./RuntimeDeadLetterQueue";

export function getRuntimeDeadLetters() {
  return runtimeDeadLetterQueue.getEvents();
}
