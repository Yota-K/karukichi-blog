export async function onRequest({ env, next, request }) {
  try {
    const authHeader = request?.headers?.get('authorization');

    if (!authHeader?.includes('Basic')) {
      return new Response('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic' },
      });
    }

    const base64Credentials = authHeader?.split(' ')[1];
    const [username, password] = atob(base64Credentials).split(':');

    if (username !== env?.BASIC_USER || password !== env?.BASIC_PASS) {
      return new Response('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic' },
      });
    }

    return await next();
  } catch (error) {
    console.error(error);
    return new Response(`Server Error`, { status: 500 });
  }
}
