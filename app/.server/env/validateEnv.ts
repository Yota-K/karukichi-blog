import { z } from 'zod'

import type { ZodFormattedError } from 'zod'

const envSchema = z.object({
  CMS_API_KEY: z.string().uuid().nonempty(),
  RECAPTCHA_KEY: z.string().nonempty(),
})

export const validateEnv = (env: Env): z.infer<typeof envSchema> => {
  const parseEnv = envSchema.safeParse(env)

  const formatErrors = (
    errors: ZodFormattedError<Map<string, string>, string>
  ) =>
    Object.entries(errors)
      .map(([name, value]) => {
        if (value && '_errors' in value)
          return `${name}: ${value._errors.join(', ')}\n`
      })
      .filter(Boolean)

  if (parseEnv.success === false) {
    console.error(
      '❌ Invalid environment variables:\n',
      ...formatErrors(parseEnv.error.format())
    )

    throw new Error('Invalid environment variables')
  }

  return { ...parseEnv.data }
}
