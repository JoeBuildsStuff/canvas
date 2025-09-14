'use client';

import React, { useEffect } from 'react';
import Canvas from './canvas/components/Canvas';
import Toolbar from './canvas/components/ui/Toolbar';
import SideControls from './canvas/components/ui/SideControls';
import ZoomControls from './canvas/components/ui/ZoomControls';
import UndoRedoControls from './canvas/components/ui/UndoRedoControls';
import TopMenuControls from './canvas/components/ui/TopMenuControls';
import { useCanvasStore } from './canvas/lib/store/canvas-store';

const DrawingCanvasUI = () => {
  const { presentationMode, togglePresentationMode } = useCanvasStore();

  // Handle keyboard shortcuts for presentation mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // F5 or Cmd/Ctrl+P to toggle presentation mode
      if (e.key === 'F5' || (e.key === 'p' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        togglePresentationMode();
      }
      
      // ESC to exit presentation mode
      if (e.key === 'Escape' && presentationMode) {
        e.preventDefault();
        togglePresentationMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [presentationMode, togglePresentationMode]);
  
  return (
    <div className="w-full h-full overflow-hidden">
      {/* Canvas takes up the full space */}
      <Canvas className="w-full h-full" />
      
      {/* Only render UI controls when not in presentation mode */}
      {!presentationMode && (
        <>
          {/* Floating Controls - Top Left */}
          <TopMenuControls position="left" />
          
          {/* Floating Controls - Top Center */}
          <Toolbar />
          
          {/* Floating Controls - Top Right */}
          <TopMenuControls position="right" />

          {/* Floating Controls - Center Left */}
          <SideControls />
          
          {/* Floating Controls - Bottom Left */}
          <ZoomControls />
          
          {/* Floating Controls - Bottom Right */}
          <UndoRedoControls />
        </>
      )}

      {/* Always show presentation mode button in the top right, even in presentation mode */}
      {presentationMode && (
        <TopMenuControls position="right" presentationModeOnly={true} />
      )}
    </div>
  );
};

export default DrawingCanvasUI;