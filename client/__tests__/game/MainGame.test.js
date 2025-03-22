import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import MainGame from '../../src/components/game/MainGame';

// Mock the lazy-loaded GameContent component
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    lazy: () => {
      const GameContent = ({ children }) => (
        <div data-testid="mocked-game-content">
          {children}
        </div>
      );
      return GameContent;
    }
  };
});

// Mock the LoadingBar component
vi.mock('./utils/LoadingBar', () => ({
  default: () => <div data-testid="loading-bar">Loading...</div>
}));

// Mock react-bootstrap components
vi.mock('react-bootstrap', () => ({
  Card: ({ children, className }) => <div className={className}>{children}</div>,
  ProgressBar: ({ value, className }) => (
    <div className={className} data-testid="progress-bar" data-value={value}>
      Progress: {value}%
    </div>
  )
}));

describe('MainGame Component', () => {
  beforeEach(() => {
    // Reset window event listeners
    window.addEventListener = vi.fn();
    window.removeEventListener = vi.fn();
  });
  
  it('renders the game container with default state', async () => {
    // Wrap in act to handle effects
    await act(async () => {
      render(<MainGame />);
    });
    
    // The game should show the default routine
    expect(screen.getByText('Morning Routine')).toBeInTheDocument();
    
    // Progress bar should be at 0%
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar.getAttribute('data-value')).toBe('0');
    
    // Parent info section should be visible
    expect(screen.getByText('Parent Info')).toBeInTheDocument();
    expect(screen.getByText(/Cozy Routines helps children build consistent daily habits/)).toBeInTheDocument();
  });
  
  it('sets up event listeners for game progress and routine changes', async () => {
    await act(async () => {
      render(<MainGame />);
    });
    
    // Check that event listeners were added
    expect(window.addEventListener).toHaveBeenCalledWith(
      'game-progress',
      expect.any(Function)
    );
    
    expect(window.addEventListener).toHaveBeenCalledWith(
      'game-routine-change',
      expect.any(Function)
    );
  });
  
  it('updates progress when receiving game-progress event', async () => {
    await act(async () => {
      render(<MainGame />);
    });
    
    // Get the progress handler function
    const progressHandler = window.addEventListener.mock.calls.find(
      call => call[0] === 'game-progress'
    )[1];
    
    // Simulate a progress event
    act(() => {
      progressHandler({ detail: { progress: 0.5 } });
    });
    
    // Progress should be updated to 50%
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar.getAttribute('data-value')).toBe('50');
  });
  
  it('updates routine name when receiving game-routine-change event', async () => {
    await act(async () => {
      render(<MainGame />);
    });
    
    // Initially shows Morning Routine
    expect(screen.getByText('Morning Routine')).toBeInTheDocument();
    
    // Get the routine change handler function
    const routineHandler = window.addEventListener.mock.calls.find(
      call => call[0] === 'game-routine-change'
    )[1];
    
    // Simulate a routine change event
    act(() => {
      routineHandler({ detail: { routine: 'Night Routine' } });
    });
    
    // Should now show Night Routine
    expect(screen.getByText('Night Routine')).toBeInTheDocument();
  });
});