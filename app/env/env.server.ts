import { z, ZodFormattedError } from 'zod'

// 参考: https://stackoverflow.com/questions/75485109/not-able-to-access-env-variables-in-remix-even-in-a-server-file
//
// nonemptyで環境変数がセットされていない場合は例外を投げる
const serverSchema = z.object({
  CMS_API_KEY: z.string().uuid().nonempty(),
  RECAPTCHA_KEY: z.string().nonempty(),
})

const _serverEnv = serverSchema.safeParse(process.env)

const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value)
        return `${name}: ${value._errors.join(', ')}\n`
    })
    .filter(Boolean)

if (_serverEnv.success === false) {
  // eslint-disable-next-line no-console
  console.error(
    '❌ Invalid environment variables:\n',
    ...formatErrors(_serverEnv.error.format())
  )

  throw new Error('Invalid environment variables')
}

export const env = { ..._serverEnv.data }
