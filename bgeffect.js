let lastTime = 0;
let trailElements = []; // Array to store the trail elements
const trailContainer = document.createElement('div');
trailContainer.className = 'trail-container';
document.body.appendChild(trailContainer);

document.addEventListener('mousemove', (event) => {
  // Add a class to change text color when the mouse moves
  document.body.classList.add('text-white');

  const currentTime = performance.now();
  const timeInterval = -1; // Minimum time interval between trail updates (in milliseconds)

  if (currentTime - lastTime >= timeInterval) {
    lastTime = currentTime;

    // Create a new trail segment
    const trailSegment = document.createElement('div');
    trailSegment.className = 'trail-segment';
    trailSegment.style.left = `${event.pageX}px`;
    trailSegment.style.top = `${event.pageY}px`;

    // Append to the container and add to the array
    trailContainer.appendChild(trailSegment);
    trailElements.push(trailSegment);

    if (trailElements.length > 50) { // Adjust the number based on the desired length of the trail
      const oldSegment = trailElements.shift();
      oldSegment.remove();
    }
  }
});
