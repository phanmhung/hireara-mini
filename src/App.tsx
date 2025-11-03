import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { SidebarToggle } from './components/SidebarToggle';
import { IdleTimerHeader } from './components/IdleTimerHeader';
import { MainContent } from './components/MainContent';
import { useRotation } from './hooks/useRotation';
import { useScaling } from './hooks/useScaling';
import { useIdleTimer } from './hooks/useIdleTimer';
import './App.css';

function App() {
  const [rotation, setRotation] = useState(true);
  const [scaling, setScaling] = useState(true);
  const [idle, setIdle] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { rotationState, toggleDirection } = useRotation({ enabled: rotation });
  const { iconSize } = useScaling({ enabled: scaling });
  const { idleState } = useIdleTimer({ enabled: idle });

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleIconClick = () => {
    toggleDirection();
  };

  const handleToggleFeature = (key: 'rotation' | 'scaling' | 'idle') => {
    switch (key) {
      case 'rotation':
        setRotation((prev) => !prev);
        break;
      case 'scaling':
        setScaling((prev) => !prev);
        break;
      case 'idle':
        setIdle((prev) => !prev);
        break;
    }
  };

  return (
    <>
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        rotation={rotation}
        scaling={scaling}
        idle={idle}
        onToggle={handleToggleFeature}
      />
      <SidebarToggle isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      <IdleTimerHeader idleTime={idleState.idleTime} isEnabled={idle} />
      <MainContent
        iconSize={iconSize}
        rotationState={rotationState}
        isRotationEnabled={rotation}
        isScalingEnabled={scaling}
        onIconClick={handleIconClick}
      />
    </>
  );
}

export default App;
