async function test() {
  const url = 'http://localhost:3000/api/english-world/runtime?nodeId=aaaaaaaa-aaaa-aaaa-aaaa-0000ea030101';
  try {
    const res = await fetch(url, {
      headers: {
        // Need to simulate a session or it will return 401
        // Actually, we can just run the logic directly using Supabase client to see what throws.
      }
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch (e) {
    console.error(e);
  }
}
test();
