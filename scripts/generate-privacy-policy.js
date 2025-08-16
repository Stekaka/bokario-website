const fs = require('fs');
const path = require('path');

// Company information
const COMPANY_INFO = {
  name: 'Bokario',
  website: 'https://bokario.se',
  email: 'info@bokario.se',
  address: 'Stockholm, Sverige',
  phone: '+46-70-123-45-67',
  orgNumber: '123456-7890'
};

// Data collection information
const DATA_COLLECTION = {
  personalData: [
    'Namn och kontaktinformation',
    'Företagsinformation',
    'Användningsdata från webbplatsen',
    'Cookies och tracking-teknik',
    'Kommunikation via formulär och e-post'
  ],
  purpose: [
    'Leverera och förbättra våra tjänster',
    'Kommunikation med kunder',
    'Analys av webbplatsanvändning',
    'Marknadsföring och försäljning',
    'Juridisk compliance'
  ],
  legalBasis: [
    'Samtycke (GDPR Art. 6.1.a)',
    'Avtalsuppfyllelse (GDPR Art. 6.1.b)',
    'Berättigat intresse (GDPR Art. 6.1.f)',
    'Juridisk skyldighet (GDPR Art. 6.1.c)'
  ]
};

// Generate privacy policy
function generatePrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString('sv-SE');
  
  const privacyPolicy = `# Integritetspolicy

**Senast uppdaterad:** ${currentDate}  
**Version:** 1.0

## 1. Introduktion

${COMPANY_INFO.name} ("vi", "oss", "vår") respekterar din integritet och är engagerade i att skydda dina personuppgifter. Denna integritetspolicy förklarar hur vi samlar in, använder och skyddar din information när du använder vår webbplats ${COMPANY_INFO.website}.

## 2. Kontaktinformation

**Företag:** ${COMPANY_INFO.name}  
**Organisationsnummer:** ${COMPANY_INFO.orgNumber}  
**Adress:** ${COMPANY_INFO.address}  
**E-post:** ${COMPANY_INFO.email}  
**Telefon:** ${COMPANY_INFO.phone}

## 3. Vilka personuppgifter samlar vi in?

Vi samlar in följande typer av personuppgifter:

${DATA_COLLECTION.personalData.map(item => `- ${item}`).join('\n')}

## 4. Hur samlar vi in personuppgifter?

Vi samlar in personuppgifter genom:

- **Direkt input:** När du fyller i formulär på vår webbplats
- **Automatisk insamling:** Cookies, analytics och tracking-teknik
- **Kommunikation:** E-post, telefon och chatt
- **Tredje part:** Analytics-tjänster och sociala medier

## 5. Syfte med behandling

Vi använder dina personuppgifter för följande syften:

${DATA_COLLECTION.purpose.map(item => `- ${item}`).join('\n')}

## 6. Juridisk grund

Vår behandling av personuppgifter baseras på:

${DATA_COLLECTION.legalBasis.map(item => `- ${item}`).join('\n')}

## 7. Cookies och tracking

Vi använder cookies för att:

- **Nödvändiga cookies:** Säkerställa att webbplatsen fungerar korrekt
- **Analytics cookies:** Förstå hur webbplatsen används
- **Preferens cookies:** Spara dina inställningar
- **Marketing cookies:** Visa relevant innehåll

Du kan hantera dina cookie-inställningar genom vår cookie-banner eller i din webbläsares inställningar.

## 8. Delning av personuppgifter

Vi delar inte dina personuppgifter med tredje part utom i följande fall:

- När det krävs för att leverera våra tjänster
- Med ditt uttryckliga samtycke
- När det krävs enligt lag
- Med betrodda partners som hjälper oss att driva webbplatsen

## 9. Datasäkerhet

Vi implementerar lämpliga tekniska och organisatoriska säkerhetsåtgärder för att skydda dina personuppgifter mot:

- Obehörig åtkomst
- Oavsiktlig förlust
- Obehörig ändring
- Obehörig spridning

## 10. Dina rättigheter

Enligt GDPR har du följande rättigheter:

- **Rätt till information:** Veta vilka uppgifter vi har om dig
- **Rätt till åtkomst:** Få en kopia av dina personuppgifter
- **Rätt till rättelse:** Korrigera felaktiga eller ofullständiga uppgifter
- **Rätt till radering:** Begära att dina uppgifter raderas
- **Rätt till begränsning:** Begränsa hur vi använder dina uppgifter
- **Rätt till dataportabilitet:** Få dina uppgifter i ett strukturerat format
- **Rätt till invändning:** Invända mot behandling baserad på berättigat intresse
- **Rätt till klagomål:** Lämna klagomål till tillsynsmyndighet

## 11. Hur du utövar dina rättigheter

För att utöva dina rättigheter, kontakta oss på ${COMPANY_INFO.email}. Vi kommer att svara inom 30 dagar.

## 12. Bevarande av personuppgifter

Vi behåller dina personuppgifter endast så länge som det är nödvändigt för de syften de samlades in för, eller så länge som det krävs enligt lag.

## 13. Internationella överföringar

Vi kan överföra dina personuppgifter till länder utanför EES. När vi gör detta säkerställer vi att lämpliga skyddsåtgärder finns på plats.

## 14. Ändringar i denna policy

Vi kan uppdatera denna integritetspolicy från tid till annan. Vi kommer att meddela dig om väsentliga ändringar via e-post eller genom att lägga upp en avisering på vår webbplats.

## 15. Kontakt

Om du har frågor om denna integritetspolicy eller vår behandling av personuppgifter, kontakta oss:

**E-post:** ${COMPANY_INFO.email}  
**Telefon:** ${COMPANY_INFO.phone}  
**Adress:** ${COMPANY_INFO.address}

## 16. Klagomål

Om du anser att vi inte hanterar dina personuppgifter korrekt, har du rätt att lämna klagomål till:

**Integritetsskyddsmyndigheten (IMY)**  
Box 8114  
104 20 Stockholm  
https://www.imy.se

---

*Denna integritetspolicy är utformad för att följa GDPR och svensk lagstiftning om personuppgiftshantering.*`;

  // Write privacy policy to public directory
  const privacyPath = path.join(process.cwd(), 'public', 'privacy-policy.md');
  fs.writeFileSync(privacyPath, privacyPolicy);
  
  // Also create an HTML version
  const htmlVersion = `<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Integritetspolicy - ${COMPANY_INFO.name}</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 2rem;
            background: #0a0a0a;
            color: #ffffff;
        }
        h1, h2, h3 { color: #3b82f6; }
        a { color: #17b6a5; }
        .header { text-align: center; margin-bottom: 3rem; }
        .section { margin-bottom: 2rem; }
        .footer { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #333; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Integritetspolicy</h1>
        <p><strong>Senast uppdaterad:</strong> ${currentDate}</p>
        <p><strong>Version:</strong> 1.0</p>
    </div>
    
    ${privacyPolicy.split('\n').map(line => {
        if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`;
        if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`;
        if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`;
        if (line.startsWith('- ')) return `<li>${line.substring(2)}</li>`;
        if (line.startsWith('**') && line.endsWith('**')) return `<strong>${line.substring(2, line.length-2)}</strong>`;
        if (line.trim() === '') return '<br>';
        return `<p>${line}</p>`;
    }).join('')}
    
    <div class="footer">
        <p>&copy; ${new Date().getFullYear()} ${COMPANY_INFO.name}. Alla rättigheter förbehållna.</p>
    </div>
</body>
</html>`;

  const htmlPath = path.join(process.cwd(), 'public', 'privacy.html');
  fs.writeFileSync(htmlPath, htmlVersion);
  
  console.log('✅ Privacy Policy generated successfully!');
  console.log(`📍 Markdown: ${privacyPath}`);
  console.log(`📍 HTML: ${htmlPath}`);
  console.log(`🔗 Markdown URL: ${COMPANY_INFO.website}/privacy-policy.md`);
  console.log(`🔗 HTML URL: ${COMPANY_INFO.website}/privacy.html`);
}

// Generate robots.txt with privacy policy
function generateRobotsWithPrivacy() {
  const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${COMPANY_INFO.website}/sitemap.xml

# Privacy Policy
Allow: /privacy-policy.md
Allow: /privacy.html

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /scripts/
Disallow: /analytics/

# Crawl delay (optional)
Crawl-delay: 1`;

  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  fs.writeFileSync(robotsPath, robots);
  
  console.log('✅ Robots.txt updated with privacy policy!');
}

// Main execution
try {
  generatePrivacyPolicy();
  generateRobotsWithPrivacy();
  console.log('\n🎉 Privacy Policy and related files generated successfully!');
} catch (error) {
  console.error('❌ Error generating privacy policy:', error);
  process.exit(1);
}
