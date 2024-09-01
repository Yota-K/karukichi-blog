import { Heading, Text } from '../../components';

type Props = {
  statusCode?: number;
};

const errorMessages = {
  notFoundError: 'お探しのページが見つかりませんでした。',
  serverError: 'サーバーでエラーが発生しました。',
  unexpectedError: '予期せぬエラーが発生しました。',
} as const;

export const DisplayErrorMessage = ({ statusCode }: Props) => {
  const generateErrorMessage = () => {
    const { notFoundError, serverError, unexpectedError } = errorMessages;

    if (statusCode) {
      if (statusCode >= 500 && statusCode <= 599) {
        return serverError;
      }

      if (statusCode === 404) {
        return notFoundError;
      }
    }

    return unexpectedError;
  };

  const message = generateErrorMessage();

  return (
    <div>
      <Heading as="h1" size="xl" className="mb-2">
        {message}
      </Heading>
      <Text>お探しのページは一時的にアクセスができない状況にあるか、移動または削除された可能性があります。 </Text>
      <Text>URL、ファイル名にタイプミスがないかもご確認ください。</Text>
    </div>
  );
};
