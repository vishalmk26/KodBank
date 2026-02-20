document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  };
  
  const messageDiv = document.getElementById('message');
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      messageDiv.className = 'message success';
      messageDiv.textContent = 'Login successful! Redirecting...';
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } else {
      messageDiv.className = 'message error';
      messageDiv.textContent = data.message || 'Login failed';
    }
  } catch (error) {
    messageDiv.className = 'message error';
    messageDiv.textContent = 'An error occurred. Please try again.';
  }
});
