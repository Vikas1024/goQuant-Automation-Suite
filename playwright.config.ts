import { PlaywrightTestConfig } from '@playwright/test';

const headless = process.env.HEADLESS !== 'false';

const config: PlaywrightTestConfig = {
    timeout: 60_000,
    use: {
        baseURL: 'https://buggy.justtestit.org',
        headless,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        viewport: { width: 1280, height: 720 }
    },
    projects: [
        { name: 'chromium', use: { browserName: 'chromium' } },
        { name: 'firefox', use: { browserName: 'firefox' } }
    ],
    reporter: [['list'], ['html', { open: 'never' }]]
};

export default config;
