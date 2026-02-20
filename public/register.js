document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    uid: document.getElementById('uid').value,
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    phone: document.getElementById('phone').value
  };
  
  const messageDiv = document.getElementById('message');
  
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      messageDiv.className = 'message success';
      messageDiv.textContent = 'Registration successful! Redirecting to login...';
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } else {
      messageDiv.className = 'message error';
      messageDiv.textContent = data.message || 'Registration failed';
    }
  } catch (error) {
    messageDiv.className = 'message error';
    messageDiv.textContent = 'An error occurred. Please try again.';
  }
});
