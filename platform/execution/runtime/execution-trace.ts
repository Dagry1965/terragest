export function traceExecution(
  stage: string,
  value: string
) {

  console.log(

    "[TRACE]",

    {
      stage,
      value,
      timestamp: new Date(),
    }
  );
}