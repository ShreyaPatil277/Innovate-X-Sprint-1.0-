// ──────────────────────────────────────────────────
// SMARTCAT LANGUAGE TRANSLATION SYSTEM
// ──────────────────────────────────────────────────

// Smartcat Configuration - REPLACE WITH YOUR ACTUAL CREDENTIALS
const SMARTCAT_CONFIG = {
    accountId: '6d7c2fb6-82ab-4df5-9d69-e9f8cc6675e2',     // ← CHANGE THIS
    apiKey: '2_0YVq15Pqwnwpdg01N7koS8S7l',           // ← CHANGE THIS
    server: 'https://smartcat.ai',    // or 'https://us.smartcat.ai' for US region
    enabled: true
};

// Language mapping
const LANGUAGES = {
    'en': { name: 'English', flag: '🇬🇧' },
    'hi': { name: 'हिन्दी', flag: '🇮🇳' },
    'mr': { name: 'मराठी', flag: '🇮🇳' },
    'ta': { name: 'தமிழ்', flag: '🇮🇳' },
    'te': { name: 'తెలుగు', flag: '🇮🇳' },
    'bn': { name: 'বাংলা', flag: '🇮🇳' }
};

// Simple translations for testing (without API)
// Simple translations for testing (without API)
const SIMPLE_TRANSLATIONS = {
    'hi': {
        // Navigation & Headers
        'Features': 'विशेषताएं',
        'How It Works': 'यह कैसे काम करता है',
        'Testimonials': 'प्रशंसापत्र',
        'Contact': 'संपर्क करें',
        'Citizen Login': 'नागरिक लॉगिन',
        'Officer Login': 'अधिकारी लॉगिन',
        'Admin': 'प्रशासक',
        
        // Hero Section
        'नगरवाणी - अपनी आवाज, अपनी सरकार': 'नगरवाणी - अपनी आवाज, अपनी सरकार',
        'NagarVaani - Your Voice, Your Government': 'नगरवाणी - आपकी आवाज, आपकी सरकार',
        'Report civic issues in your language, track real-time resolution. Breaking language barriers in governance with AI-powered translation.': 'अपनी भाषा में नागरिक मुद्दों की रिपोर्ट करें, वास्तविक समय समाधान ट्रैक करें। एआई-पावर्ड अनुवाद के साथ शासन में भाषा की बाधाओं को तोड़ना।',
        'Submit Complaint': 'शिकायत दर्ज करें',
        'Track Complaint': 'शिकायत ट्रैक करें',
        'Complaints Resolved': 'शिकायतों का समाधान',
        'Indian Languages': 'भारतीय भाषाएं',
        'Citizen Satisfaction': 'नागरिक संतुष्टि',
        
        // Features Section
        'Key Features': 'मुख्य विशेषताएं',
        'Making governance accessible to every citizen': 'हर नागरिक के लिए सुलभ बनाना शासन',
        '4+ Languages': '4+ भाषाएं',
        'Hindi, Marathi, Tamil, Telugu, Bengali, and more Indian languages': 'हिंदी, मराठी, तमिल, तेलुगु, बंगाली और अधिक भारतीय भाषाएं',
        'AI Translation': 'एआई अनुवाद',
        'Auto-categorize and assign to right department': 'स्वचालित रूप से वर्गीकृत करें और सही विभाग को असाइन करें',
        'Location Tracking': 'स्थान ट्रैकिंग',
        'Auto-detect your ward and area': 'अपने वार्ड और क्षेत्र का स्वतः पता लगाएं',
        'SMS Alerts': 'एसएमएस अलर्ट',
        'Real-time status notifications': 'वास्तविक समय स्थिति सूचनाएं',
        
        // How It Works Section
        'How It Works': 'यह कैसे काम करता है',
        'In your language with voice or text': 'अपनी भाषा में आवाज या पाठ के साथ',
        'AI Processing': 'एआई प्रोसेसिंग',
        'Auto-translate & assign to department': 'स्वतः अनुवाद और विभाग को असाइन करें',
        'Track Progress': 'प्रगति ट्रैक करें',
        'Real-time updates via SMS/Email': 'एसएमएस/ईमेल के माध्यम से वास्तविक समय अपडेट',
        'Get Resolution': 'समाधान प्राप्त करें',
        'Rate the quality of service': 'सेवा की गुणवत्ता को रेट करें',
        
        // Services Section
        'Services We Cover': 'हमारी सेवाएं',
        'Report issues across various civic departments': 'विभिन्न नागरिक विभागों में मुद्दों की रिपोर्ट करें',
        'Roads': 'सड़कें',
        'Water': 'पानी',
        'Electricity': 'बिजली',
        'Sanitation': 'स्वच्छता',
        'Noise': 'शोर',
        'Environment': 'पर्यावरण',
        
        // Testimonials Section
        'What Citizens Say': 'नागरिक क्या कहते हैं',
        'Finally able to report issues in my native language Marathi. Very helpful!': 'अंततः अपनी मातृभाषा मराठी में मुद्दों की रिपोर्ट कर पा रहा हूं। बहुत मददगार!',
        'Tracked my complaint in real-time. Officer visited within 24 hours!': 'मेरी शिकायत को वास्तविक समय में ट्रैक किया। अधिकारी 24 घंटे के भीतर आए!',
        'The QR code tracking makes it easy to share complaint status.': 'क्यूआर कोड ट्रैकिंग से शिकायत की स्थिति साझा करना आसान हो जाता है।',
        
        // Footer
        'Making governance accessible to all': 'सभी के लिए सुलभ बनाना शासन',
        'A Government of India Initiative': 'भारत सरकार की पहल',
        'ISO 27001 Certified': 'आईएसओ 27001 प्रमाणित',
        'Quick Links': 'त्वरित लिंक',
        'Privacy Policy': 'गोपनीयता नीति',
        'Terms of Use': 'उपयोग की शर्तें',
        'Contact': 'संपर्क करें',
        'Toll Free': 'टोल फ्री',
        'Follow Us': 'हमें फॉलो करें',
        'All rights reserved. A Government of India Project': 'सर्वाधिकार सुरक्षित। भारत सरकार की परियोजना',
        'Developed with pride by': 'गर्व के साथ विकसित किया गया',
        'for Digital India': 'डिजिटल इंडिया के लिए'
    },
    
    'mr': {
        // Navigation & Headers
        'Features': 'वैशिष्ट्ये',
        'How It Works': 'हे कसे कार्य करते',
        'Testimonials': 'प्रशंसापत्रे',
        'Contact': 'संपर्क',
        'Citizen Login': 'नागरिक लॉगिन',
        'Officer Login': 'अधिकारी लॉगिन',
        'Admin': 'प्रशासक',
        
        // Hero Section
        'NagarVaani - Your Voice, Your Government': 'नगरवाणी - तुमचा आवाज, तुमचे सरकार',
        'Report civic issues in your language, track real-time resolution. Breaking language barriers in governance with AI-powered translation.': 'तुमच्या भाषेत नागरी समस्यांची नोंद करा, रिअल-टाइम निराकरण ट्रॅक करा. एआय-चालित भाषांतरासह प्रशासनातील भाषेचे अडथळे दूर करणे.',
        'Submit Complaint': 'तक्रार नोंदवा',
        'Track Complaint': 'तक्रार ट्रॅक करा',
        'Complaints Resolved': 'तक्रारी सोडवल्या',
        'Indian Languages': 'भारतीय भाषा',
        'Citizen Satisfaction': 'नागरिक समाधान',
        
        // Features Section
        'Key Features': 'मुख्य वैशिष्ट्ये',
        'Making governance accessible to every citizen': 'प्रत्येक नागरिकासाठी प्रशासन सुलभ करणे',
        '4+ Languages': '४+ भाषा',
        'Hindi, Marathi, Tamil, Telugu, Bengali, and more Indian languages': 'हिंदी, मराठी, तमिळ, तेलुगू, बंगाली आणि अधिक भारतीय भाषा',
        'AI Translation': 'एआय भाषांतर',
        'Auto-categorize and assign to right department': 'स्वयं-वर्गीकरण आणि योग्य विभागाला नियुक्त करा',
        'Location Tracking': 'स्थान ट्रॅकिंग',
        'Auto-detect your ward and area': 'तुमचा वॉर्ड आणि क्षेत्र स्वयं-शोधा',
        'SMS Alerts': 'एसएमएस सूचना',
        'Real-time status notifications': 'रिअल-टाइम स्थिती सूचना',
        
        // How It Works Section
        'How It Works': 'हे कसे कार्य करते',
        'In your language with voice or text': 'तुमच्या भाषेत आवाज किंवा मजकूरासह',
        'AI Processing': 'एआय प्रक्रिया',
        'Auto-translate & assign to department': 'स्वयं-भाषांतर आणि विभागाला नियुक्त करा',
        'Track Progress': 'प्रगती ट्रॅक करा',
        'Real-time updates via SMS/Email': 'एसएमएस/ईमेलद्वारे रिअल-टाइम अपडेट',
        'Get Resolution': 'निराकरण मिळवा',
        'Rate the quality of service': 'सेवेच्या गुणवत्तेचे मूल्यांकन करा',
        
        // Services Section
        'Services We Cover': 'आमच्या सेवा',
        'Report issues across various civic departments': 'विविध नागरी विभागांमध्ये समस्या नोंदवा',
        'Roads': 'रस्ते',
        'Water': 'पाणी',
        'Electricity': 'वीज',
        'Sanitation': 'स्वच्छता',
        'Noise': 'आवाज',
        'Environment': 'पर्यावरण',
        
        // Testimonials Section
        'What Citizens Say': 'नागरिक काय म्हणतात',
        'Finally able to report issues in my native language Marathi. Very helpful!': 'शेवटी माझ्या मातृभाषा मराठीत समस्या नोंदवू शकलो. खूप उपयुक्त!',
        'Tracked my complaint in real-time. Officer visited within 24 hours!': 'माझी तक्रार रिअल-टाइममध्ये ट्रॅक केली. अधिकारी २४ तासांत भेट दिली!',
        'The QR code tracking makes it easy to share complaint status.': 'क्यूआर कोड ट्रॅकिंगमुळे तक्रार स्थिती सामायिक करणे सोपे होते.',
        
        // Footer
        'Making governance accessible to all': 'सर्वांसाठी प्रशासन सुलभ करणे',
        'A Government of India Initiative': 'भारत सरकारचा उपक्रम',
        'ISO 27001 Certified': 'आयएसओ २७००१ प्रमाणित',
        'Quick Links': 'द्रुत लिंक्स',
        'Privacy Policy': 'गोपनीयता धोरण',
        'Terms of Use': 'वापराच्या अटी',
        'Contact': 'संपर्क',
        'Toll Free': 'टोल फ्री',
        'Follow Us': 'आमचे अनुसरण करा',
        'All rights reserved. A Government of India Project': 'सर्व हक्क राखीव. भारत सरकारचा प्रकल्प',
        'Developed with pride by': 'अभिमानाने विकसित',
        'for Digital India': 'डिजिटल इंडियासाठी'
    },
    
    'ta': {
        // Navigation & Headers
        'Features': 'அம்சங்கள்',
        'How It Works': 'இது எவ்வாறு இயங்குகிறது',
        'Testimonials': 'பாராட்டுகள்',
        'Contact': 'தொடர்பு',
        'Citizen Login': 'குடிமகன் உள்நுழைவு',
        'Officer Login': 'அதிகாரி உள்நுழைவு',
        'Admin': 'நிர்வாகி',
        
        // Hero Section
        'NagarVaani - Your Voice, Your Government': 'நகர்வாணி - உங்கள் குரல், உங்கள் அரசு',
        'Report civic issues in your language, track real-time resolution. Breaking language barriers in governance with AI-powered translation.': 'உங்கள் மொழியில் பொதுப் பிரச்சினைகளைப் புகாரளிக்கவும், நிகழ்நேர தீர்வைக் கண்காணிக்கவும். AI-இயங்கும் மொழிபெயர்ப்புடன் ஆட்சியில் மொழித் தடைகளை உடைத்தல்.',
        'Submit Complaint': 'புகாரை சமர்ப்பிக்கவும்',
        'Track Complaint': 'புகாரை கண்காணிக்கவும்',
        'Complaints Resolved': 'புகார்கள் தீர்க்கப்பட்டன',
        'Indian Languages': 'இந்திய மொழிகள்',
        'Citizen Satisfaction': 'குடிமக்கள் திருப்தி',
        
        // Features Section
        'Key Features': 'முக்கிய அம்சங்கள்',
        'Making governance accessible to every citizen': 'ஒவ்வொரு குடிமகனுக்கும் ஆட்சியை அணுகக்கூடியதாக மாற்றுதல்',
        '4+ Languages': '4+ மொழிகள்',
        'Hindi, Marathi, Tamil, Telugu, Bengali, and more Indian languages': 'இந்தி, மராத்தி, தமிழ், தெலுங்கு, வங்காளி மற்றும் பிற இந்திய மொழிகள்',
        'AI Translation': 'AI மொழிபெயர்ப்பு',
        'Auto-categorize and assign to right department': 'தானியங்கி வகைப்படுத்தி சரியான துறைக்கு ஒதுக்கவும்',
        'Location Tracking': 'இருப்பிட கண்காணிப்பு',
        'Auto-detect your ward and area': 'உங்கள் வார்டு மற்றும் பகுதியை தானாகக் கண்டறியவும்',
        'SMS Alerts': 'SMS எச்சரிக்கைகள்',
        'Real-time status notifications': 'நிகழ்நேர நிலை அறிவிப்புகள்',
        
        // How It Works Section
        'How It Works': 'இது எவ்வாறு இயங்குகிறது',
        'In your language with voice or text': 'உங்கள் மொழியில் குரல் அல்லது உரையுடன்',
        'AI Processing': 'AI செயலாக்கம்',
        'Auto-translate & assign to department': 'தானியங்கி மொழிபெயர்ப்பு & துறைக்கு ஒதுக்கவும்',
        'Track Progress': 'முன்னேற்றத்தைக் கண்காணிக்கவும்',
        'Real-time updates via SMS/Email': 'SMS/மின்னஞ்சல் மூலம் நிகழ்நேர புதுப்பிப்புகள்',
        'Get Resolution': 'தீர்வு பெறவும்',
        'Rate the quality of service': 'சேவையின் தரத்தை மதிப்பிடவும்',
        
        // Services Section
        'Services We Cover': 'எங்கள் சேவைகள்',
        'Report issues across various civic departments': 'பல்வேறு பொதுத் துறைகளில் பிரச்சினைகளைப் புகாரளிக்கவும்',
        'Roads': 'சாலைகள்',
        'Water': 'நீர்',
        'Electricity': 'மின்சாரம்',
        'Sanitation': 'துப்புரவு',
        'Noise': 'சத்தம்',
        'Environment': 'சுற்றுச்சூழல்',
        
        // Testimonials Section
        'What Citizens Say': 'குடிமக்கள் கூறுவது',
        'Finally able to report issues in my native language Marathi. Very helpful!': 'இறுதியாக எனது தாய்மொழியான மராத்தியில் பிரச்சினைகளைப் புகாரளிக்க முடிந்தது. மிகவும் உதவியாக உள்ளது!',
        'Tracked my complaint in real-time. Officer visited within 24 hours!': 'எனது புகாரை நிகழ்நேரத்தில் கண்காணித்தேன். அதிகாரி 24 மணி நேரத்தில் வந்தார்!',
        'The QR code tracking makes it easy to share complaint status.': 'QR குறியீடு கண்காணிப்பு புகார் நிலையைப் பகிர்வதை எளிதாக்குகிறது.',
        
        // Footer
        'Making governance accessible to all': 'அனைவருக்கும் ஆட்சியை அணுகக்கூடியதாக மாற்றுதல்',
        'A Government of India Initiative': 'இந்திய அரசின் முயற்சி',
        'ISO 27001 Certified': 'ISO 27001 சான்றளிக்கப்பட்டது',
        'Quick Links': 'விரைவு இணைப்புகள்',
        'Privacy Policy': 'தனியுரிமைக் கொள்கை',
        'Terms of Use': 'பயன்பாட்டு விதிமுறைகள்',
        'Contact': 'தொடர்பு',
        'Toll Free': 'கட்டணமில்லா',
        'Follow Us': 'எங்களைப் பின்தொடரவும்',
        'All rights reserved. A Government of India Project': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. இந்திய அரசின் திட்டம்',
        'Developed with pride by': 'பெருமையுடன் உருவாக்கப்பட்டது',
        'for Digital India': 'டிஜிட்டல் இந்தியாவுக்காக'
    },
    
    'te': {
        // Navigation & Headers
        'Features': 'లక్షణాలు',
        'How It Works': 'ఇది ఎలా పని చేస్తుంది',
        'Testimonials': 'ప్రశంసలు',
        'Contact': 'సంప్రదించండి',
        'Citizen Login': 'పౌరుడు లాగిన్',
        'Officer Login': 'అధికారి లాగిన్',
        'Admin': 'నిర్వాహకుడు',
        
        // Hero Section
        'NagarVaani - Your Voice, Your Government': 'నగర్‌వాణి - మీ స్వరం, మీ ప్రభుత్వం',
        'Report civic issues in your language, track real-time resolution.': 'మీ భాషలో పౌర సమస్యలను నివేదించండి, నిజ-సమయ పరిష్కారాన్ని ట్రాక్ చేయండి.',
        'Submit Complaint': 'ఫిర్యాదు సమర్పించండి',
        'Track Complaint': 'ఫిర్యాదును ట్రాక్ చేయండి',
        'Complaints Resolved': 'ఫిర్యాదులు పరిష్కరించబడ్డాయి',
        'Indian Languages': 'భారతీయ భాషలు',
        'Citizen Satisfaction': 'పౌరుల సంతృప్తి'
    },
    
    'bn': {
        // Navigation & Headers
        'Features': 'বৈশিষ্ট্য',
        'How It Works': 'এটি কিভাবে কাজ করে',
        'Testimonials': 'প্রশংসাপত্র',
        'Contact': 'যোগাযোগ',
        'Citizen Login': 'নাগরিক লগইন',
        'Officer Login': 'অফিসার লগইন',
        'Admin': 'অ্যাডমিন',
        
        // Hero Section
        'NagarVaani - Your Voice, Your Government': 'নগরবাণী - আপনার কণ্ঠ, আপনার সরকার',
        'Report civic issues in your language, track real-time resolution.': 'আপনার ভাষায় নাগরিক সমস্যা রিপোর্ট করুন, রিয়েল-টাইম সমাধান ট্র্যাক করুন।',
        'Submit Complaint': 'অভিযোগ জমা দিন',
        'Track Complaint': 'অভিযোগ ট্র্যাক করুন',
        'Complaints Resolved': 'অভিযোগ নিষ্পত্তি হয়েছে',
        'Indian Languages': 'ভারতীয় ভাষা',
        'Citizen Satisfaction': 'নাগরিক সন্তুষ্টি'
    }
};

/**
 * MAIN FUNCTION: Called when language button is clicked
 */
function handleLanguageSelect(button, langCode) {
    console.log('🔵 Language selected:', langCode);
    
    // Update button styles
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.style.background = 'white';
        btn.style.borderColor = 'var(--border-light)';
        btn.style.color = '#334155';
    });
    
    button.style.background = '#dbeafe';
    button.style.borderColor = '#2563eb';
    button.style.color = '#2563eb';
    
    // Save preference
    localStorage.setItem('preferred_language', langCode);
    
    // Translate the page
    if (langCode === 'en') {
        revertToEnglish();
    } else {
        translatePageTo(langCode);
    }
}

/**
 * Translate page to selected language using simple translations
 */
/**
 * Translate page to selected language using simple translations
 */
function translatePageTo(langCode) {
    console.log('🟢 Translating to:', langCode);
    
    // Get translations for this language
    const translations = SIMPLE_TRANSLATIONS[langCode];
    if (!translations) {
        console.log('No translations for:', langCode);
        return;
    }
    
    // Get all text elements that should be translated
    const elements = findTextElements();
    console.log(`Found ${elements.length} elements to translate`);
    
    let translatedCount = 0;
    
    // Translate each element
    elements.forEach(element => {
        const originalText = element.textContent.trim();
        
        // Skip empty elements
        if (originalText.length === 0) return;
        
        // Store original text if not already stored
        if (!element.hasAttribute('data-original')) {
            element.setAttribute('data-original', originalText);
        }
        
        // Check if we have a translation for this exact text
        if (translations[originalText]) {
            console.log(`Translating: "${originalText}" → "${translations[originalText]}"`);
            element.textContent = translations[originalText];
            translatedCount++;
        } 
        // Check for partial matches (for elements that might have extra text)
        else {
            let translated = false;
            for (const [key, value] of Object.entries(translations)) {
                if (originalText.includes(key)) {
                    const newText = originalText.replace(key, value);
                    console.log(`Partial: "${originalText}" → "${newText}"`);
                    element.textContent = newText;
                    translatedCount++;
                    translated = true;
                    break;
                }
            }
            
            // If no translation found, log for debugging
            if (!translated) {
                console.log(`No translation found for: "${originalText}"`);
            }
        }
    });
    
    console.log(`✅ Translated ${translatedCount} elements`);
    
    // Show success message
    if (typeof showToast === 'function') {
        showToast(`Page translated to ${LANGUAGES[langCode].name}`, 'success');
    }
}

/**
 * Find all elements that should be translated
 */
function findTextElements() {
    const elements = [];
    
    // Elements that should be translated
    const selectors = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p',
        '.feature-card h3',
        '.feature-card p',
        '.step h4',
        '.step p',
        '.service-item h4',
        '.testimonial-card p',
        '.testimonial-author strong',
        '.testimonial-author span',
        '.hero p',
        '.hero-buttons a',
        '.stat-label',
        'footer h4',
        'footer p',
        'footer a',
        '.digital-india'
    ];
    
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            // Skip if it's a button we don't want to translate
            if (el.closest('.lang-btn')) return;
            if (el.closest('.btn-primary')) return;
            if (el.closest('.btn-outline')) return;
            
            // Only include if it has text content
            if (el.textContent.trim().length > 0) {
                elements.push(el);
            }
        });
    });
    
    return elements;
}

/**
 * Revert page to English
 */
function revertToEnglish() {
    console.log('🔵 Reverting to English');
    
    // Restore original text
    document.querySelectorAll('[data-original]').forEach(el => {
        el.textContent = el.getAttribute('data-original');
        el.removeAttribute('data-original');
    });
    
    // Reset button styles
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.style.background = 'white';
        btn.style.borderColor = 'var(--border-light)';
        btn.style.color = '#334155';
        if (btn.getAttribute('data-lang') === 'en') {
            btn.style.background = '#dbeafe';
            btn.style.borderColor = '#2563eb';
            btn.style.color = '#2563eb';
        }
    });
    
    if (typeof showToast === 'function') {
        showToast('Language changed to English', 'success');
    }
}

/**
 * Initialize language on page load
 */
function initializeLanguage() {
    const savedLang = localStorage.getItem('preferred_language');
    console.log('Saved language:', savedLang);
    
    if (savedLang && savedLang !== 'en') {
        // Find the button for saved language
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            if (btnLang === savedLang) {
                console.log('Found saved language button, activating');
                handleLanguageSelect(btn, savedLang);
            }
        });
    } else {
        // Set English as active by default
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === 'en') {
                btn.style.background = '#dbeafe';
                btn.style.borderColor = '#2563eb';
                btn.style.color = '#2563eb';
            }
        });
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Page loaded, initializing language system');
    
    // Add click handlers to all language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    console.log(`Found ${langButtons.length} language buttons`);
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const langCode = this.getAttribute('data-lang') || 'en';
            handleLanguageSelect(this, langCode);
        });
    });
    
    // Initialize language from saved preference
    initializeLanguage();
});

// Also run immediately in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Already handled above
    });
} else {
    console.log('✅ DOM already loaded, initializing now');
    setTimeout(() => {
        const langButtons = document.querySelectorAll('.lang-btn');
        console.log(`Found ${langButtons.length} language buttons (immediate)`);
        
        langButtons.forEach(btn => {
            // Remove any existing listeners to avoid duplicates
            btn.removeEventListener('click', handleLanguageSelect);
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const langCode = this.getAttribute('data-lang') || 'en';
                handleLanguageSelect(this, langCode);
            });
        });
        
        initializeLanguage();
    }, 100);
}