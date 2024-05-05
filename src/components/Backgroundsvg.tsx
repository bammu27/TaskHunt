

const BackgroundSVG = () => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"   style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        pointerEvents: 'none', // Ensure SVG doesn't intercept mouse events
        zIndex: -1, // Place behind the form
      }}>
    <path fill="#A3FFD6" d="M40.8,-69.2C50.6,-57.3,54.4,-42,58.9,-28.1C63.4,-14.2,68.5,-1.8,71.2,13.4C73.9,28.6,74.2,46.5,66,58.9C57.9,71.3,41.4,78.1,25.7,78.6C10,79.2,-5,73.5,-17.2,66.3C-29.4,59.2,-38.9,50.5,-51.2,41.5C-63.6,32.4,-78.8,23,-82.7,10.6C-86.5,-1.9,-79,-17.3,-71.2,-31.8C-63.4,-46.2,-55.3,-59.8,-43.4,-70.8C-31.5,-81.7,-15.7,-90,-0.1,-89.9C15.6,-89.7,31.1,-81.2,40.8,-69.2Z" transform="translate(100 100)" />
  </svg>
);

export default BackgroundSVG;
