export default function register(user) {
  const request = new Request('http://localhost:3000/users', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ auth: user })
  });
  return fetch(request).then((response) => response.json()).catch((error) => error);
}
