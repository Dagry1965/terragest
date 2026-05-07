type CircuitState =
  | "closed"
  | "open"
  | "half-open";

type CircuitBreaker = {
  failures: number;

  threshold: number;

  timeoutMs: number;

  lastFailure?: number;

  state: CircuitState;
};

const circuits:
  Record<
    string,
    CircuitBreaker
  > = {};

function getCircuit(
  key: string
) {
  if (!circuits[key]) {
    circuits[key] = {
      failures: 0,

      threshold: 3,

      timeoutMs: 10000,

      state: "closed",
    };
  }

  return circuits[key];
}

export function canExecuteCircuit(
  key: string
) {
  const circuit =
    getCircuit(key);

  if (
    circuit.state === "open"
  ) {
    const now =
      Date.now();

    if (
      circuit.lastFailure &&
      now -
        circuit.lastFailure >
        circuit.timeoutMs
    ) {
      circuit.state =
        "half-open";

      return true;
    }

    return false;
  }

  return true;
}

export function registerFailure(
  key: string
) {
  const circuit =
    getCircuit(key);

  circuit.failures += 1;

  circuit.lastFailure =
    Date.now();

  if (
    circuit.failures >=
    circuit.threshold
  ) {
    circuit.state = "open";
  }
}

export function registerSuccess(
  key: string
) {
  const circuit =
    getCircuit(key);

  circuit.failures = 0;

  circuit.state = "closed";
}

export function getCircuits() {
  return circuits;
}
