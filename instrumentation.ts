export async function onRequestError(err: any, request: any, context: any) {
console.error(
"[onRequestError] FULL ERROR DETAIL >>>",
JSON.stringify(
{
path: request && request.path,
method: request && request.method,
message: err && err.message,
digest: err && err.digest,
stack: err && err.stack,
cause: err && err.cause && err.cause.message ? { message: err.cause.message, stack: err.cause.stack } : (err && err.cause),
context: context,
},
null,
2
)
);
}
