import '@testing-library/jest-dom';
import fc from 'fast-check';

// Configure fast-check globally with 100 runs per property test
fc.configureGlobal({ numRuns: 100 });
