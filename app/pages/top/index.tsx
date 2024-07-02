import type { Content } from '../../types'

type Props = {
  contents: Content[]
}

export const TopPage = ({ contents }: Props) => {
  return (
    <div className="font-sans p-4">
      {contents.map((content) => (
        <div key={content.id}>
          <h2>{content.title}</h2>
        </div>
      ))}
    </div>
  )
}
