import {defineConfig, devices, TraceMode} from '@playwright/test';
import dotenv from 'dotenv';
import * as path from 'node:path';
import {VideoMode} from "playwright/types/test";
import * as fs from 'node:fs';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const STORAGE_STATE_PATH = path.join(__dirname, 'e2e/.auth/');

const envFile = path.resolve(__dirname, `.env.${process.env.APP_ENV}`);
if (fs.existsSync(envFile)) {
    dotenv.config({path: envFile});
} else {
    dotenv.config();
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './e2e',
    snapshotPathTemplate: '{testDir}/__snapshots__/{testFilePath}/{projectName}-{platform}/{arg}{ext}',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [['html', {open: 'never'}]],
    timeout: Number(process.env.TEST_TIMEOUT) ?? 30000,
    expect: {
        timeout: 30000
    },

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.APP_URL ?? undefined,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: process.env.USE_TRACE as TraceMode ?? 'off',
        video: process.env.USE_VIDEOS as VideoMode ?? 'off',

        locale: 'ja-JP',
        timezoneId: 'Asia/Tokyo',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'DesktopChromiumGuest',
            use: {
                ...devices['Desktop Chrome']
            },
            testDir: './e2e/guest',
            testMatch: /top\.spec\.ts/,
        },

        {
            name: 'DesktopFirefoxGuest',
            use: {
                ...devices['Desktop Firefox']
            },
            testDir: './e2e/guest',
            testMatch: /top\.spec\.ts/,
        },

        {
            name: 'DesktopSafariGuest',
            use: {
                ...devices['Desktop Safari']
            },
            testDir: './e2e/guest',
            testMatch: /top\.spec\.ts/,
        },

        {
            name: 'DesktopChromiumDarkModeGuest',
            use: {
                ...devices['Desktop Chrome'],
                colorScheme: 'dark',
            },
            testDir: './e2e/guest',
            testMatch: /top\.spec\.ts/,
        },

        {
            name: 'mock',
            use: {
                ...devices['Desktop Chrome'],
            },
            testDir: './e2e/guest',
            testMatch: /mock\.spec\.ts/,
        },

        {
            name: 'DesktopChromeLogin',
            use: {
                ...devices['Desktop Chrome'],
            },
            testDir: './e2e/member/desktop',
            testMatch: /chromeLogin\.setup\.ts/,
        },

        {
            name: 'DesktopChromeMember',
            use: {
                ...devices['Desktop Chrome'],
                storageState: path.join(STORAGE_STATE_PATH, 'DesktopChromeLogin.json'),
            },
            testDir: './e2e/member/desktop',
            dependencies: ['DesktopChromeLogin'],
        },

        {
            name: 'DesktopFirefoxLogin',
            use: {
                ...devices['Desktop Firefox'],
            },
            testDir: './e2e/member/desktop',
            testMatch: /firefoxLogin\.setup\.ts/,
        },

        {
            name: 'DesktopFirefoxMember',
            use: {
                ...devices['Desktop Firefox'],
                storageState: path.join(STORAGE_STATE_PATH, 'DesktopFirefoxMember.json'),
            },
            testDir: './e2e/member/desktop',
            dependencies: ['DesktopFirefoxLogin'],
        },

        {
            name: 'DesktopSafariLogin',
            use: {
                ...devices['Desktop Safari'],
            },
            testDir: './e2e/member/desktop',
            testMatch: /safariLogin\.setup\.ts/,
        },

        {
            name: 'DesktopSafariMember',
            use: {
                ...devices['Desktop Safari'],
                storageState: path.join(STORAGE_STATE_PATH, 'DesktopSafariMember.json'),
            },
            testDir: './e2e/member/desktop',
            dependencies: ['DesktopSafariLogin'],
        },

        {
            name: 'MobileChromeLogin',
            use: {
                ...devices['Pixel 5'],
            },
            testDir: './e2e/member/mobile',
            testMatch: /chromeLogin\.setup\.ts/,
        },

        {
            name: 'MobileChromeMember',
            use: {
                ...devices['Pixel 5'],
                storageState: path.join(STORAGE_STATE_PATH, 'MobileChromeMember.json'),
            },
            testDir: './e2e/member/mobile',
            dependencies: ['MobileChromeLogin'],
        },

        {
            name: 'MobileSafariLogin',
            use: {
                ...devices['iPhone 12'],
            },
            testDir: './e2e/member/mobile',
            testMatch: /safariLogin\.setup\.ts/,
        },

        {
            name: 'MobileSafariMember',
            use: {
                ...devices['iPhone 12'],
                storageState: path.join(STORAGE_STATE_PATH, 'MobileSafariMember.json'),
            },
            testDir: './e2e/member/mobile',
            dependencies: ['MobileSafariLogin'],
        },

        {
            name: 'FakeMedia',
            use: {
                ...devices['Desktop Chrome'],
                launchOptions: {
                    args: [
                        '--use-fake-device-for-media-stream',
                        '--use-fake-ui-for-media-stream',
                        '--use-file-for-fake-audio-capture=' + path.join(__dirname, 'e2e/fakeMedia/audio.wav'),
                        '--use-file-for-fake-video-capture=' + path.join(__dirname, 'e2e/fakeMedia/video.y4m'),
                    ]
                },
                permissions: ['camera', 'microphone']
            },
            testDir: './e2e/fakeMedia/',
        },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
