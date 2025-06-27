// Logging Middleware/logger.js

export async function Log(stack, level, pkg, message) {
  const payload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: pkg.toLowerCase(),
    message,
  };

  try {
    const response = await fetch('http://20.244.56.144/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJqYXRpbi4yMmdjZWJjczA1MEBnYWxnb3RpYWNvbGxlZ2UuZWR1IiwiZXhwIjoxNzUxMDE5ODAzLCJpYXQiOjE3NTEwMTg5MDMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzYWFhNDA3Zi05NzM5LTQ3YzYtYjlkNC00Yzg2YzMxYzBhOTUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJqYXRpbiBrdW1hciIsInN1YiI6IjQzMmM3ZmJjLWQ5N2ItNGY3Zi1hOGUyLWI5ZGI1MDkwYTU5MSJ9LCJlbWFpbCI6ImphdGluLjIyZ2NlYmNzMDUwQGdhbGdvdGlhY29sbGVJjLWQ5N2ItNGY3Zi1hOGUyLWI5ZGI1MDkwYTU5MSJ9LCJlbWFpbCI6ImphdGluLjIyZ2NlYmNzMDUwQGdhbGdvdGlhY29sbGVnZS5lZHUiLCJuYW1lIjoiamF0aW4ga3VtYXIiLCJyb2xsTm8iOiIyMjAwOTcwMTAwMDgwIiwiYWNjZXNpZW50U2VjcmV0IjoiU3FTYVZ0QWNoeXNYd05lWCJ9.P46MBtW6LtMMe020jQemQPoljy3SF3z3-pArlx3CsQM'
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log("Logged:", result.message);
  } catch (error) {
    console.error("Log Failed:", error);
  }
}
