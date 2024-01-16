
for (let i = 0; i < 200; i++) {
  let payload = {
    data: {
      name: "hotal" + i,
      business_category: 1,
      star: Math.trunc(Math.random() * 5),
    },
  };
  fetch(`http://localhost:1337/api/businesses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => err);
}
