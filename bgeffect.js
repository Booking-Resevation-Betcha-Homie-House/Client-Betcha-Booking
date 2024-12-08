let lastTime = 0;
let trailElements = []; 
const trailContainer = document.createElement('div');
trailContainer.className = 'trail-container';
document.body.appendChild(trailContainer);

document.addEventListener('mousemove', (event) => {

  document.body.classList.add('text-white');

  const currentTime = performance.now();
  const timeInterval = -1; 

  if (currentTime - lastTime >= timeInterval) {
    lastTime = currentTime;

    const trailSegment = document.createElement('div');
    trailSegment.className = 'trail-segment';
    trailSegment.style.left = `${event.pageX}px`;
    trailSegment.style.top = `${event.pageY}px`;

    trailContainer.appendChild(trailSegment);
    trailElements.push(trailSegment);

    if (trailElements.length > 50) { 
      const oldSegment = trailElements.shift();
      oldSegment.remove();
    }
  }
});
