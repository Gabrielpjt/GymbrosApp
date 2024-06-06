export async function register(akun) {
  const body = {
    username: akun.username,
    password: akun.password,
    gender: akun.gender,
    age: akun.age,
    address: akun.alamat,
    bloodType: akun.golDarah,
    occupation: akun.occupation
  };

  console.log(body);

  const response = await fetch('https://gymbrosbeapp-production-b2f2.up.railway.app/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Tambahkan header untuk menentukan bahwa isi adalah JSON
    },
    body: JSON.stringify(body) // Konversi objek JavaScript menjadi string JSON
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return;
}

export async function login(akun) {
  const body = {
    username: akun.username,
    password: akun.password
  };

  console.log(body);

  const response = await fetch('https://gymbrosbeapp-production-b2f2.up.railway.app/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Tambahkan header untuk menentukan bahwa isi adalah JSON
    },
    body: JSON.stringify(body) // Konversi objek JavaScript menjadi string JSON
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const res = await response.json();
  return body;
}
