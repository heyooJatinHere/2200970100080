// Logging Middleware/get-token.js

const payload = {
  email: 'jatin.22gcebcs050@galgotiacollege.edu',
  name: 'Jatin Kumar',
  rollNo: '2200970100080',
  accessCode: 'Muagvq',
  clientID: '432c7fbc-d97b-4f7f-a8e2-b9db5090a591',
  clientSecret: 'SqSaVtAchysXwNeX'
};

fetch('http://20.244.56.144/evaluation-service/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
  .then(res => res.json())
  .then(data => {
    if (data.access_token) {
      console.log('\n✅ ACCESS TOKEN:\n');
      console.log('Bearer ' + data.access_token);
    } else {
      console.error('\n❌ Failed to get token:\n', data);
    }
  })
  .catch(err => {
    console.error('\n❌ Error during token fetch:', err);
  });
