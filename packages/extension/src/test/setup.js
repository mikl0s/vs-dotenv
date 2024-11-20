import { vi } from 'vitest';
// Mock fs module
vi.mock('fs', () => ({
    promises: {
        access: vi.fn()
    },
    constants: {
        F_OK: 0
    }
}));
// Mock path module
vi.mock('path', () => ({
    join: vi.fn()
}));
//# sourceMappingURL=setup.js.map