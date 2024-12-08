/* 

let lastTime = 0;
let trailElements = [];
const trailContainer = document.createElement('div');
trailContainer.className = 'trail-container';
document.body.appendChild(trailContainer);

document.addEventListener('mousemove', (event) => {
    const currentTime = performance.now();
    const timeInterval = 25; // Create a trail segment every 20ms

    if (currentTime - lastTime >= timeInterval) {
        lastTime = currentTime;

        const trailSegment = document.createElement('div');
        trailSegment.className = 'trail-segment';
        trailSegment.style.left = `${event.pageX}px`;
        trailSegment.style.top = `${event.pageY}px`;

        // Randomize the size slightly for variation
        const size = Math.random() * 20 + 35;
        trailSegment.style.width = `${size}px`;
        trailSegment.style.height = `${size}px`;

        trailContainer.appendChild(trailSegment);
        trailElements.push(trailSegment);

        if (trailElements.length > 100) {
            const oldSegment = trailElements.shift();
            oldSegment.remove();
        }

        setTimeout(() => {
            trailSegment.remove();
        }, 1500); 
    }
});
copy me then paste unitl the end*/