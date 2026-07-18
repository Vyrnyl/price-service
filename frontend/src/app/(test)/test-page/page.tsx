
const TestPage = () => {
  const users = async () => {
    const response = await fetch('http://localhost:3000/api/users', {
      credentials: 'include',
    });
    const data = await response.json();
    console.log(data);
  }
  // users();

  const login = async () => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'vern@gmail.com',
        password: 'vern12345'
      })
    });
    const data = await response.json();
    console.log(data)
  }
  // login();

  const testValue = process.env.NEXT_PUBLIC_API_BASE_URL ?? "not set";
  // console.log("NEXT_PUBLIC_API_BASE_URL:", testValue);

  return <div>TestPage - {testValue}</div>;
};

export default TestPage