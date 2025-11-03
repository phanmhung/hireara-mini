import { useRotation } from './hooks/useRotation';
import { useScaling } from './hooks/useScaling';
import { ReactIcon } from './components/ReactIcon';

function App() {
  const { rotationState, toggleDirection } = useRotation({ enabled: true });
  const { iconSize } = useScaling({ enabled: true });

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh' 
    }}>
      <ReactIcon
        size={iconSize}
        rotationState={rotationState}
        isScalingEnabled={true}
        onClick={toggleDirection}
      />
    </div>
  );
}

export default App;
