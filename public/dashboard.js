document.getElementById('checkBalanceBtn').addEventListener('click', async () => {
  const balanceDisplay = document.getElementById('balanceDisplay');
  const celebrationDiv = document.getElementById('celebration');
  
  try {
    const response = await fetch('/api/user/balance', {
      method: 'GET',
      credentials: 'include'
    });
    
    const data = await response.json();
    
    if (data.success) {
      balanceDisplay.className = 'balance-display show';
      balanceDisplay.textContent = `Your balance is: ₹${parseFloat(data.balance).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      
      // Create party popper animation
      createConfetti(celebrationDiv);
    } else {
      balanceDisplay.textContent = data.message || 'Failed to fetch balance';
      if (response.status === 401) {
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    }
  } catch (error) {
    balanceDisplay.textContent = 'An error occurred. Please try again.';
  }
});

function createConfetti(container) {
  container.innerHTML = '';
  const colors = ['#1a1a1a', '#666666', '#999999', '#cccccc'];
  const shapes = ['circle', 'square', 'triangle'];
  
  // Create confetti bursts from multiple points
  const burstPoints = [
    { x: 20, y: 30 },
    { x: 50, y: 20 },
    { x: 80, y: 30 }
  ];
  
  burstPoints.forEach(point => {
    for (let i = 0; i < 40; i++) {
      const confetti = document.createElement('div');
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      confetti.className = `confetti ${shape}`;
      
      // Random size
      const size = Math.random() * 8 + 6;
      confetti.style.width = size + 'px';
      confetti.style.height = size + 'px';
      
      // Start position
      confetti.style.left = point.x + '%';
      confetti.style.top = point.y + '%';
      
      // Random color
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Random animation properties
      const angle = Math.random() * 360;
      const velocity = Math.random() * 100 + 50;
      const rotation = Math.random() * 720 - 360;
      const duration = Math.random() * 1.5 + 2;
      
      confetti.style.setProperty('--angle', angle + 'deg');
      confetti.style.setProperty('--velocity', velocity + 'px');
      confetti.style.setProperty('--rotation', rotation + 'deg');
      confetti.style.animationDuration = duration + 's';
      confetti.style.animationDelay = Math.random() * 0.2 + 's';
      
      container.appendChild(confetti);
    }
  });
  
  // Add some floating particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 50 + '%';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDelay = Math.random() * 0.5 + 's';
    particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
    container.appendChild(particle);
  }
  
  setTimeout(() => {
    container.innerHTML = '';
  }, 5000);
}
