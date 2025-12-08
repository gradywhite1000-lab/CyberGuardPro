// --- Navigation Logic ---
function navigateTo(pageId, scrollToId = null) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
        
        if (scrollToId) {
             // Wait for display:block to take effect
             setTimeout(() => {
                 const element = document.getElementById(scrollToId);
                 if (element) {
                     element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                 }
             }, 50);
        } else {
             window.scrollTo(0, 0);
        }
    }

    // Update Active Nav State (Optional Visuals)
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// --- Pricing Toggle Logic ---
function setPricing(plan) {
    const btnMonthly = document.getElementById('btn-monthly');
    const btnAnnual = document.getElementById('btn-annual');
    const pricePersonal = document.getElementById('price-personal');
    const priceBusiness = document.getElementById('price-business');

    if (plan === 'annual') {
        btnAnnual.classList.add('active');
        btnAnnual.classList.remove('inactive');
        btnMonthly.classList.add('inactive');
        btnMonthly.classList.remove('active');
        
        // Set discounted monthly rate for annual plan
        pricePersonal.innerText = "15"; // approx 20% off 19
        priceBusiness.innerText = "39"; // approx 20% off 49
    } else {
        btnMonthly.classList.add('active');
        btnMonthly.classList.remove('inactive');
        btnAnnual.classList.add('inactive');
        btnAnnual.classList.remove('active');

        // Set standard monthly rate
        pricePersonal.innerText = "19";
        priceBusiness.innerText = "49";
    }
}

// --- FAQ Logic ---
function toggleFaq(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    // Toggle current
    if (answer.classList.contains('open')) {
        answer.classList.remove('open');
        icon.style.transform = 'rotate(0deg)';
    } else {
        // Close others (Optional, for accordion effect)
        document.querySelectorAll('.faq-answer').forEach(el => el.classList.remove('open'));
        document.querySelectorAll('.fa-chevron-down').forEach(el => el.style.transform = 'rotate(0deg)');
        
        answer.classList.add('open');
        icon.style.transform = 'rotate(180deg)';
    }
}

// --- Toast Notification Logic ---
function showToast(message) {
    const toast = document.getElementById('toast-container');
    const msgEl = document.getElementById('toast-message');
    msgEl.innerText = message;
    
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000); // Hide after 3 seconds
}

// --- Job Application Logic ---
function openJobApp(positionName) {
    document.getElementById('job-title-display').innerText = "Position: " + positionName;
    document.getElementById('app-position').value = positionName;
    navigateTo('job-application');
}

function handleJobSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = "Submitting...";
    btn.disabled = true;
    setTimeout(() => {
        showToast("Application Submitted Successfully!");
        e.target.reset();
        btn.innerText = originalText;
        btn.disabled = false;
        navigateTo('careers');
    }, 1500);
}

// --- HR Contact Logic ---
function handleHRSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = "Sending...";
    btn.disabled = true;
    setTimeout(() => {
        showToast("HR Inquiry Sent Successfully.");
        e.target.reset();
        btn.innerText = originalText;
        btn.disabled = false;
    }, 1500);
}

// --- Quiz Logic ---
function nextQuizStep(stepNumber) {
    // Hide all steps
    for(let i=1; i<=8; i++) {
        const el = document.getElementById(`quiz-step-${i}`);
        if(el) el.classList.add('hidden');
    }
    // Show next step
    const nextEl = document.getElementById(`quiz-step-${stepNumber}`);
    if(nextEl) nextEl.classList.remove('hidden');
}

function selectQuizOption(element) {
    // Visual selection effect
    const parent = element.parentElement;
    const options = parent.getElementsByClassName('quiz-option');
    for(let opt of options) {
        opt.classList.remove('bg-blue-50', 'border-brand-primary');
        opt.classList.add('border-gray-200');
    }
    element.classList.remove('border-gray-200');
    element.classList.add('bg-blue-50', 'border-brand-primary');
}

function sendQuizResults() {
    const subject = "My CyberGuard Pro Security Assessment";
    const body = `Here are my security assessment results from CyberGuard Pro:<br>
    <br>RISK SCORE: MEDIUM - HIGH<br><br>RECOMMENDED ACTION PLAN:<br>1. Immediate: Implement a Password Manager (LastPass, 1Password, etc.)<br>2. Start quarterly phishing simulations for staff.<br>3. Consult CyberGuard Pro for a Firewall audit.<br><br>Generated on: ${new Date().toLocaleDateString()}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// --- Service Estimator Logic ---
function calculateQuote() {
    const deviceCount = parseInt(document.getElementById('deviceCount').value) || 1;
    const complianceFee = parseInt(document.getElementById('compliance').value) || 0;
    const basePerDevice = 49; // SMB rate
    
    const total = (deviceCount * basePerDevice) + complianceFee;
    
    document.getElementById('quotePrice').innerText = `$${total}/mo`;
    document.getElementById('quoteResult').classList.remove('hidden');
}

// --- Contact Form Logic ---
function handleContactSubmit(e) {
    e.preventDefault();
    // Simulate form submission
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = "Sending...";
    btn.disabled = true;
    
    setTimeout(() => {
        showToast("We received your message and will reach out quickly.");
        e.target.reset();
        btn.innerText = originalText;
        btn.disabled = false;
    }, 1500);
}