import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RoutineScreen from './RoutineScreen';

// Mock the routines from GameUtils
vi.mock('../../src/components/game/GameUtils"', () => ({
  routines: {
    'Morning Routine': [
      { name: 'Brush Teeth', description: 'Catch the runaway toothbrush!' },
      { name: 'Eat Breakfast', description: 'Catch the falling cereal in your bowl!' },
      { name: 'Get Dressed', description: 'Match the clothes to get dressed!' },
      { name: 'Go Outside', description: 'Find the key and unlock the door!' },
    ],
    'Afternoon Routine': [
      { name: 'Eat Lunch', description: 'Balance your sandwich on the plate!' },
      { name: 'Playtime', description: 'Put your toys back in their places!' },
      { name: 'Rest Time', description: 'Calm down the jumping bed!' },
      { name: 'Tidy Up Toys', description: 'Collect all the toys before time runs out!' },
    ],
    'Night Routine': [
      { name: 'Brush Teeth', description: 'Answer the toothbrush\'s questions!' },
      { name: 'Change Clothes', description: 'Find your pajamas among the clothes!' },
      { name: 'Story Time', description: 'Choose a story to read before bed!' },
      { name: 'Sleep', description: 'Turn off the lights and go to sleep.' },
    ],
  },
  getTextColor: () => 'text-test-color',
  getBackgroundColor: () => 'bg-test-color',
}));

// Mock the routine components
vi.mock('../../src/components/game/routines/MorningRoutine', () => ({
  default: ({ task, onCompleteTask }) => (
    <div data-testid="morning-routine">
      <span>Task: {task}</span>
      <button data-testid="complete-morning-task" onClick={onCompleteTask}>
        Complete Morning Task
      </button>
    </div>
  ),
}));

vi.mock('../../src/components/game/routines/AfternoonRoutine', () => ({
  default: ({ task, onCompleteTask }) => (
    <div data-testid="afternoon-routine">
      <span>Task: {task}</span>
      <button data-testid="complete-afternoon-task" onClick={onCompleteTask}>
        Complete Afternoon Task
      </button>
    </div>
  ),
}));

vi.mock('../../src/components/game/routines/NightRoutine', () => ({
  default: ({ task, onCompleteTask }) => (
    <div data-testid="night-routine">
      <span>Task: {task}</span>
      <button data-testid="complete-night-task" onClick={onCompleteTask}>
        Complete Night Task
      </button>
    </div>
  ),
}));



describe('RoutineScreen Component', () => {
  it('renders the correct routine name and task', () => {
    render(
      <RoutineScreen
        routine="Morning Routine"
        currentTask={0}
        taskCompleted={false}
        onBackClick={vi.fn()}
        onCompleteTask={vi.fn()}
      />
    );
    
    expect(screen.getByText('Morning Routine')).toBeInTheDocument();
    expect(screen.getByText('Brush Teeth')).toBeInTheDocument();
    expect(screen.getByText('Catch the runaway toothbrush!')).toBeInTheDocument();
  });

  it('renders the correct routine component based on routine name', () => {
    // Test Morning Routine
    const { rerender } = render(
      <RoutineScreen
        routine="Morning Routine"
        currentTask={0}
        taskCompleted={false}
        onBackClick={vi.fn()}
        onCompleteTask={vi.fn()}
      />
    );
    expect(screen.getByTestId('morning-routine')).toBeInTheDocument();
    
    // Test Afternoon Routine
    rerender(
      <RoutineScreen
        routine="Afternoon Routine"
        currentTask={0}
        taskCompleted={false}
        onBackClick={vi.fn()}
        onCompleteTask={vi.fn()}
      />
    );
    expect(screen.getByTestId('afternoon-routine')).toBeInTheDocument();
    
    // Test Night Routine
    rerender(
      <RoutineScreen
        routine="Night Routine"
        currentTask={0}
        taskCompleted={false}
        onBackClick={vi.fn()}
        onCompleteTask={vi.fn()}
      />
    );
    expect(screen.getByTestId('night-routine')).toBeInTheDocument();
  });

  it('calls onBackClick when back button is clicked', () => {
    const mockBackClick = vi.fn();
    render(
      <RoutineScreen
        routine="Morning Routine"
        currentTask={0}
        taskCompleted={false}
        onBackClick={mockBackClick}
        onCompleteTask={vi.fn()}
      />
    );
    
    fireEvent.click(screen.getByText('Back'));
    expect(mockBackClick).toHaveBeenCalledTimes(1);
  });

  it('shows task completion message when taskCompleted is true', () => {
    render(
      <RoutineScreen
        routine="Morning Routine"
        currentTask={0}
        taskCompleted={true}
        onBackClick={vi.fn()}
        onCompleteTask={vi.fn()}
      />
    );
    
    expect(screen.getByText('Great job!')).toBeInTheDocument();
    expect(screen.getByText('You completed the task!')).toBeInTheDocument();
  });

  it('calls onCompleteTask when the task component completes', () => {
    const mockCompleteTask = vi.fn();
    render(
      <RoutineScreen
        routine="Morning Routine"
        currentTask={0}
        taskCompleted={false}
        onBackClick={vi.fn()}
        onCompleteTask={mockCompleteTask}
      />
    );
    
    fireEvent.click(screen.getByTestId('complete-morning-task'));
    expect(mockCompleteTask).toHaveBeenCalledTimes(1);
  });
});