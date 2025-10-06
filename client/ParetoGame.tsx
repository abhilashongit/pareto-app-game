import React, { useState } from 'react';
import LogoScreen from './LogoScreen';
import Tutorial from './Tutorial';
import NameInput from './NameInput';
import GameInterface from './GameInterface';

export default function ParetoGame() {
  const [currentScreen, setCurrentScreen] = useState<'logo' | 'tutorial' | 'name' | 'game'>('logo');
  const [playerName, setPlayerName] = useState<string>('');

  if (currentScreen === 'logo') {
    return <LogoScreen onContinue={() => setCurrentScreen('tutorial')} />;
  }

  if (currentScreen === 'tutorial') {
    return <Tutorial onComplete={() => setCurrentScreen('name')} />;
  }

  if (currentScreen === 'name') {
    return <NameInput onComplete={(name) => {
      setPlayerName(name);
      setCurrentScreen('game');
    }} />;
  }

  return <GameInterface playerName={playerName} />;
}
