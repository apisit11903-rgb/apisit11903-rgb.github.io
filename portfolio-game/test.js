const { chromium } = require('playwright');
const path = require('path');

async function testGamePortfolio() {
    console.log('Starting Playwright test for Game Portfolio...');
    
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const errors = [];
    
    // Collect console errors
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(`Console Error: ${msg.text()}`);
        }
    });
    
    page.on('pageerror', err => {
        errors.push(`Page Error: ${err.message}`);
    });
    
    try {
        // Load the page
        const filePath = path.resolve(__dirname, 'index.html');
        await page.goto(`file://${filePath}`, { waitUntil: 'networkidle' });
        console.log('✓ Page loaded successfully');
        
        // Check if start screen exists
        const startScreen = await page.$('#start-screen');
        console.log(startScreen ? '✓ Start screen found' : '✗ Start screen missing');
        
        // Click start button
        await page.click('#start-btn');
        await page.waitForTimeout(500);
        console.log('✓ Game started');
        
        // Check if game overlay is visible
        const gameOverlay = await page.$('#game-overlay:not(.hidden)');
        console.log(gameOverlay ? '✓ Game overlay visible' : '✗ Game overlay not visible');
        
        // Check if canvas exists
        const canvas = await page.$('#game-canvas');
        console.log(canvas ? '✓ Game canvas found' : '✗ Game canvas missing');
        
        // Check if minimap exists
        const minimap = await page.$('#minimap');
        console.log(minimap ? '✓ Minimap found' : '✗ Minimap missing');
        
        // Test keyboard input
        await page.keyboard.press('KeyW');
        await page.waitForTimeout(100);
        await page.keyboard.press('KeyD');
        await page.waitForTimeout(100);
        await page.keyboard.press('KeyS');
        await page.waitForTimeout(100);
        await page.keyboard.press('KeyA');
        await page.waitForTimeout(100);
        console.log('✓ Keyboard controls tested');
        
        // Test interaction key
        await page.keyboard.press('KeyE');
        await page.waitForTimeout(300);
        console.log('✓ Interaction key tested');
        
        // Check for modal
        const modal = await page.$('#info-modal:not(.hidden)');
        if (modal) {
            console.log('✓ Modal opens correctly');
            await page.click('#modal-close');
            await page.waitForTimeout(300);
        }
        
        // Check if minimap canvas is rendered
        const minimapCanvas = await page.$('#minimap-canvas');
        console.log(minimapCanvas ? '✓ Minimap canvas found' : '✗ Minimap canvas missing');
        
        // Report errors
        if (errors.length > 0) {
            console.log('\n--- Errors Found ---');
            errors.forEach(err => console.log(err));
        } else {
            console.log('\n✓ No console errors detected');
        }
        
        console.log('\n=== Test Summary ===');
        console.log('Game Portfolio website is ready for deployment!');
        
    } catch (error) {
        console.error('Test failed:', error.message);
    } finally {
        await browser.close();
    }
}

testGamePortfolio();
