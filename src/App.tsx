import { useRotation } from './hooks/useRotation';
import { useScaling } from './hooks/useScaling';
import { useIdleTimer } from './hooks/useIdleTimer';
import { ReactIcon } from './components/ReactIcon';
import { IdleTimerHeader } from './components/IdleTimerHeader';

function App() {
  const { rotationState, toggleDirection } = useRotation({ enabled: true });
  const { iconSize } = useScaling({ enabled: true });
  const { idleState } = useIdleTimer({ enabled: true });

  return (
    <>
      <IdleTimerHeader idleTime={idleState.idleTime} isEnabled={true} />
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
    </>
  );
}

export default App;
