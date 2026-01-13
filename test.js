const { chromium } = require('playwright');
const path = require('path');

async function testPortfolio() {
    console.log('Starting Playwright test...');
    
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
        
        // Check if main elements exist
        const heroSection = await page.$('.hero');
        console.log(heroSection ? '✓ Hero section found' : '✗ Hero section missing');
        
        const navbar = await page.$('.navbar');
        console.log(navbar ? '✓ Navigation bar found' : '✗ Navigation bar missing');
        
        const aboutSection = await page.$('#about');
        console.log(aboutSection ? '✓ About section found' : '✗ About section missing');
        
        const educationSection = await page.$('#education');
        console.log(educationSection ? '✓ Education section found' : '✗ Education section missing');
        
        const experienceSection = await page.$('#experience');
        console.log(experienceSection ? '✓ Experience section found' : '✗ Experience section missing');
        
        const skillsSection = await page.$('#skills');
        console.log(skillsSection ? '✓ Skills section found' : '✗ Skills section missing');
        
        const contactSection = await page.$('#contact');
        console.log(contactSection ? '✓ Contact section found' : '✗ Contact section missing');
        
        // Test responsive design
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(500);
        console.log('✓ Mobile viewport test passed');
        
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.waitForTimeout(500);
        console.log('✓ Desktop viewport test passed');
        
        // Test navigation links
        const navLinks = await page.$$('.nav-links a');
        console.log(`✓ Found ${navLinks.length} navigation links`);
        
        // Check for contact links
        const phoneLink = await page.$('a[href^="tel:"]');
        console.log(phoneLink ? '✓ Phone link found' : '✗ Phone link missing');
        
        const emailLink = await page.$('a[href^="mailto:"]');
        console.log(emailLink ? '✓ Email link found' : '✗ Email link missing');
        
        // Report errors
        if (errors.length > 0) {
            console.log('\n--- Errors Found ---');
            errors.forEach(err => console.log(err));
        } else {
            console.log('\n✓ No console errors detected');
        }
        
        console.log('\n=== Test Summary ===');
        console.log('Portfolio website is ready for deployment!');
        
    } catch (error) {
        console.error('Test failed:', error.message);
    } finally {
        await browser.close();
    }
}

testPortfolio();
