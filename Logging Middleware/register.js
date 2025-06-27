// Logging Middleware/register.js

const payload = {
  email: "jatin.22gcebcs050@galgotiacollege.edu",
  name: "Jatin Kumar",
  mobileNo: "8192826978",
  githubUsername: "heyoojatinhere",
  rollNo: "2200970100080",
  accessCode: "Muagvq"
};

fetch('http://20.244.56.144/evaluation-service/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
  .then(res => res.json())
  .then(data => {
    console.log('\n✅ REGISTER RESPONSE:\n');
    console.log(data);
  })
  .catch(err => {
    console.error('\n❌ Error during registration:', err);
  });
