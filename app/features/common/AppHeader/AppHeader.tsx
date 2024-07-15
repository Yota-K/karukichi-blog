import { Heading, Header as UiHeader } from '../../../components'
import { Config } from '../../../config'

export const AppHeader = () => {
  return (
    <UiHeader>
      <Heading as="h1" size="xl" className="text-white">
        {Config.siteTitle}
      </Heading>
    </UiHeader>
  )
}
