import { describe, it, expect } from 'vitest';
import { getBadgeDetails } from './badgeUtils';

describe('Badge Utils', () => {
  describe('getBadgeDetails', () => {
    it('returns correct details for Morning Routine', () => {
      const badge = getBadgeDetails('Morning Routine');
      
      expect(badge).toEqual({
        name: 'Morning Champion',
        icon: '☀️',
        color: '#FBEDCA',
        description: 'Completed all morning routine tasks'
      });
    });
    
    it('returns correct details for Afternoon Routine', () => {
      const badge = getBadgeDetails('Afternoon Routine');
      
      expect(badge).toEqual({
        name: 'Playtime Hero',
        icon: '🎮',
        color: '#D3FFFE',
        description: 'Completed all afternoon activities'
      });
    });
    
    it('returns correct details for Night Routine', () => {
      const badge = getBadgeDetails('Night Routine');
      
      expect(badge).toEqual({
        name: 'Nighttime Hero',
        icon: '🌙',
        color: '#C7FCFB',
        description: 'Completed all bedtime routine tasks'
      });
    });
    
    it('returns correct details for Routine Master', () => {
      const badge = getBadgeDetails('Routine Master');
      
      expect(badge).toEqual({
        name: 'Routine Master',
        icon: '🏆',
        color: '#F2E2B8',
        description: 'Completed all daily routines'
      });
    });
    
    it('returns null for unknown routine types', () => {
      const badge = getBadgeDetails('Unknown Routine');
      expect(badge).toBeNull();
    });
  });
});