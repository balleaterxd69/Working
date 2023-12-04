document.addEventListener('DOMContentLoaded', function () {
  const ship = document.getElementById('ship');
  const gameContainer = document.getElementById('game-container');

  let shipHealth = 100;

  gameContainer.addEventListener('mousemove', function (event) {
    const x = event.clientX - gameContainer.getBoundingClientRect().left;
    const y = event.clientY - gameContainer.getBoundingClientRect().top;

    ship.style.left = `${x}px`;
    ship.style.top = `${y}px`;
  });

  setInterval(function () {
    shipHealth -= 1;

    document.title = `Space Ship Game | Health: ${shipHealth}%`;

    if (shipHealth <= 0) {
      alert('Your spaceship tore in half! Game over.');
      shipHealth = 100;
    }
  }, 1000);
});
