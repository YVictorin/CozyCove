import { describe, it, expect } from 'vitest';
import { 
  routines, 
  getTextColor, 
  getBackgroundColor, 
  brushTeethQuestions, 
  bedtimeStories 
} from '../../../src/components/game/GameUtils';

describe('GameUtils', () => {
  describe('routines', () => {
    it('contains the correct routines', () => {
      expect(Object.keys(routines)).toEqual([
        'Morning Routine',
        'Afternoon Routine',
        'Night Routine'
      ]);
    });

    it('has the correct number of tasks for each routine', () => {
      expect(routines['Morning Routine'].length).toBe(4);
      expect(routines['Afternoon Routine'].length).toBe(4);
      expect(routines['Night Routine'].length).toBe(4);
    });

    it('has name and description for each task', () => {
      Object.keys(routines).forEach(routine => {
        routines[routine].forEach(task => {
          expect(task).toHaveProperty('name');
          expect(task).toHaveProperty('description');
          expect(typeof task.name).toBe('string');
          expect(typeof task.description).toBe('string');
        });
      });
    });
  });

  describe('getTextColor', () => {
    it('returns the correct text color for Morning Routine', () => {
      expect(getTextColor('Morning Routine')).toBe('text-blue-600');
    });

    it('returns the correct text color for Afternoon Routine', () => {
      expect(getTextColor('Afternoon Routine')).toBe('text-purple-600');
    });

    it('returns the correct text color for Night Routine', () => {
      expect(getTextColor('Night Routine')).toBe('text-indigo-200');
    });

    it('returns default text color for unknown routine', () => {
      expect(getTextColor('Unknown Routine')).toBe('text-blue-600');
    });
  });

  describe('getBackgroundColor', () => {
    it('returns the correct background color for Morning Routine', () => {
      expect(getBackgroundColor('Morning Routine')).toBe('bg-blue-100');
    });

    it('returns the correct background color for Afternoon Routine', () => {
      expect(getBackgroundColor('Afternoon Routine')).toBe('bg-purple-100');
    });

    it('returns the correct background color for Night Routine', () => {
      expect(getBackgroundColor('Night Routine')).toBe('bg-indigo-700');
    });

    it('returns default background color for unknown routine', () => {
      expect(getBackgroundColor('Unknown Routine')).toBe('bg-blue-100');
    });
  });

  describe('brushTeethQuestions', () => {
    it('has the correct number of questions', () => {
      expect(brushTeethQuestions.length).toBe(3);
    });

    it('has the required properties for each question', () => {
      brushTeethQuestions.forEach(question => {
        expect(question).toHaveProperty('question');
        expect(question).toHaveProperty('options');
        expect(question).toHaveProperty('correct');
        expect(Array.isArray(question.options)).toBe(true);
        expect(typeof question.correct).toBe('number');
      });
    });

    it('has valid correct answer indices', () => {
      brushTeethQuestions.forEach(question => {
        expect(question.correct).toBeGreaterThanOrEqual(0);
        expect(question.correct).toBeLessThan(question.options.length);
      });
    });
  });

  describe('bedtimeStories', () => {
    it('has the correct number of stories', () => {
      expect(bedtimeStories.length).toBe(3);
    });

    it('has the required properties for each story', () => {
      bedtimeStories.forEach(story => {
        expect(story).toHaveProperty('title');
        expect(story).toHaveProperty('image');
        expect(typeof story.title).toBe('string');
        expect(typeof story.image).toBe('string');
      });
    });
  });
});