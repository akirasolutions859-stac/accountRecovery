document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Mobile Navigation Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon between menu and close
            const icon = menuToggle.querySelector('i');
            if (icon) {
                const currentIcon = icon.getAttribute('data-lucide');
                if (currentIcon === 'menu') {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });
    }

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });
    });

    // 3. Platform Select Grid (Hero Widget)
    const platBtns = document.querySelectorAll('.plat-btn');
    let selectedPlatform = 'gmail'; // Default platform

    platBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            platBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedPlatform = btn.getAttribute('data-platform');
        });
    });

    // 4. Hero Diagnostic Terminal Simulator
    const startDiagnosticBtn = document.getElementById('startDiagnosticBtn');
    const diagStep1 = document.getElementById('diagStep1');
    const diagStep2 = document.getElementById('diagStep2');
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalCta = document.getElementById('terminalCta');
    const terminalWaBtn = document.getElementById('terminalWaBtn');
    const diagUsername = document.getElementById('diagUsername');

    if (startDiagnosticBtn && diagStep1 && diagStep2) {
        startDiagnosticBtn.addEventListener('click', () => {
            let targetUser = diagUsername.value.trim();
            if (!targetUser) {
                targetUser = 'User';
            }

            // Capitalize platform name for output display
            const formattedPlatform = selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1);

            // Hide Step 1 inputs, show Step 2 Terminal
            diagStep1.classList.add('hidden');
            diagStep2.classList.remove('hidden');

            // Log messages to simulate diagnostic script
            const logQueue = [
                { text: `[SYSTEM] Booting SecuRecovery Core Engine v4.2.1...`, type: 'info', delay: 400 },
                { text: `[INFO] Mapping secure gateway tunnel to ${formattedPlatform} authentication nodes...`, type: 'info', delay: 700 },
                { text: `[INFO] Querying security ledger registries for record: [${targetUser}]`, type: 'info', delay: 900 },
                { text: `[ALERT] Verification failure: Remote security block detected.`, type: 'warn', delay: 800 },
                { text: `[WARN] 2-Factor Authentication (2FA) or password vector modified externally.`, type: 'warn', delay: 1000 },
                { text: `[INFO] Initiating algorithmic policy exception scan...`, type: 'info', delay: 900 },
                { text: `[SUCCESS] Direct secure recovery vector found (Bypass Node Map: ESC-902).`, type: 'success', delay: 800 },
                { text: `[ALERT] Action Required: Verification requires manual compliance handshake by our lead specialist.`, type: 'danger', delay: 500 }
            ];

            let cumulativeDelay = 0;

            logQueue.forEach((log) => {
                cumulativeDelay += log.delay;
                setTimeout(() => {
                    appendTerminalLine(log.text, log.type);
                }, cumulativeDelay);
            });

            // Show WhatsApp button inside terminal after logs finish
            setTimeout(() => {
                // Update terminal WhatsApp link with prefilled diagnostic text
                const prefilledMsg = `Hi Dharam, I ran the recovery diagnostic for my ${formattedPlatform} account (${targetUser}). It reported code ESC-902. Please help me restore access.`;
                terminalWaBtn.href = `https://wa.me/916289415717?text=${encodeURIComponent(prefilledMsg)}`;
                
                terminalCta.classList.remove('hidden');
                
                // Redraw icons inside terminal if any
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }, cumulativeDelay + 500);
        });
    }

    function appendTerminalLine(text, type) {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.innerText = text;
        terminalOutput.appendChild(line);
        // Scroll terminal to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // 5. Contact Lead Form submission and WhatsApp Routing
    const recoveryForm = document.getElementById('recoveryForm');
    const submitBtn = document.getElementById('submitBtn');

    if (recoveryForm && submitBtn) {
        recoveryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Fetch inputs
            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('emailAddr').value.trim();
            const phone = document.getElementById('phoneNumber').value.trim();
            const platformSel = document.getElementById('platform');
            const platformText = platformSel.options[platformSel.selectedIndex].text;
            const details = document.getElementById('issueDetails').value.trim();

            // Disable button to show processing
            const origBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerHTML = `<span>Processing Secure Pipeline...</span>`;

            // Prepare WhatsApp prefilled message
            const whatsAppMsg = `Hello Dharam, I need urgent assistance recovering my account. Here are my details:
• Name: ${name}
• Email: ${email}
• Phone: ${phone}
• Platform: ${platformText}
• Issue Details: ${details}`;

            const encodedMsg = encodeURIComponent(whatsAppMsg);
            const waUrl = `https://wa.me/916289415717?text=${encodedMsg}`;

            // Open WhatsApp redirect in new window after a brief transition delay
            setTimeout(() => {
                window.open(waUrl, '_blank');
                
                // Show success feedback
                submitBtn.innerHTML = `<span>Redirected! Connect via WhatsApp</span>`;
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Reset form elements
                recoveryForm.reset();
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                
                setTimeout(() => {
                    submitBtn.innerHTML = origBtnText;
                    submitBtn.style.background = ''; // restore original style
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }, 5000);
            }, 1200);
        });
    }
});
