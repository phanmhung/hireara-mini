import { useRotation } from './hooks/useRotation';
import { ReactIcon } from './components/ReactIcon';

function App() {
  const { rotationState, toggleDirection } = useRotation({ enabled: true });

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh' 
    }}>
      <ReactIcon
        size={100}
        rotationState={rotationState}
        onClick={toggleDirection}
      />
    </div>
  );
}

export default App;
