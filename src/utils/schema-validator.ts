
import Ajv from 'ajv';

const ajv = new Ajv({
  allErrors: true,
});

export function validateSchema<T>(
  schema: object,
  data: unknown,
): string[] {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (valid) {
    return [];
  }

  return (validate.errors ?? []).map((error) => {
    const path = error.instancePath || '/';
    return `${path} ${error.message ?? 'is invalid'}`;
  });
}
