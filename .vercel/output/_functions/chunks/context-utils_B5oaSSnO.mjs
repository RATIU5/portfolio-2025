import { Effect, Data, Schema } from 'effect';

class AstroAPIContextError extends Data.TaggedError("AstroAPIContextError") {
}
const readAPIContextJson = ({ request }) => Effect.tryPromise({
  try: () => request.json(),
  catch: (cause) => new AstroAPIContextError({ message: "Failed to parse JSON from Request", cause })
});
const parseAPIContextJson = (context, schema) => Effect.gen(function* () {
  const json = yield* readAPIContextJson(context);
  if (schema) return yield* Schema.decodeUnknown(schema)(json);
  return json;
}).pipe(
  Effect.catchAll((error) => {
    console.error("Failed to read JSON:", error);
    return Effect.fail(
      new AstroAPIContextError({ message: "Failed to read JSON", cause: error })
    );
  })
);
const readAPIContextFormData = ({
  request
}) => Effect.tryPromise({
  try: () => request.formData(),
  catch: (cause) => new AstroAPIContextError({ message: "Failed to parse formData from Request", cause })
});
const parseFormDataEntryToString = (formData, key) => Effect.try({
  try: () => {
    const value = formData.get(key);
    if (typeof value !== "string") {
      return null;
    }
    return value;
  },
  catch: (cause) => new AstroAPIContextError({
    message: `Failed to parse FormData entry for key: ${key}`,
    cause
  })
});

export { parseFormDataEntryToString as a, readAPIContextFormData as b, parseAPIContextJson as p, readAPIContextJson as r };
