import express from 'express';
const router = express.Router();

import publicDomains from '../constants/publicDomains.js';
import tempDomains from '../constants/tempDomains.js';
import businessDomains from '../constants/businessDomains.js';
import { checkEmailProviderAi } from '../services/openAi.js';
import { promises as dns } from 'node:dns';



function cleanEmail(email) {
  const [localPart, domain] = email.split('@');
  const cleanedLocalPart = localPart.split('+')[0].replace(/\./g, '');
  return `${cleanedLocalPart}@${domain}`;
}

async function getMxRecords(domain) {
  const resolver = new dns.Resolver();
  resolver.setServers(['8.8.8.8']); // Use Google's public DNS server

  try {
    console.log(`Fetching MX records for: ${domain}`);

    const mxRecords = await resolver.resolveMx(domain);
    console.log(`MX Records for ${domain}:`, mxRecords);

    // Extract base domains from MX records
    const baseDomains = mxRecords.map(record => {
      const parts = record.exchange.toLowerCase().split('.');
      return `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
    });

    return [...new Set(baseDomains)];
  } catch (error) {
    console.log(`Error fetching MX records for ${domain}, trying SOA records`);

    try {
      const soaRecord = await resolver.resolveSoa(domain);
      console.log(`SOA Record for ${domain}:`, soaRecord);

      // Extract last two parts of the primary name server
      const parts = soaRecord.hostmaster.split('.');
      console.log(parts);
      return [`${parts[parts.length - 2]}.${parts[parts.length - 1]}`];

    } catch (soaError) {
      console.error(`Error fetching SOA records for ${domain}: Invalid domain`);
      return null;
    }
  }
}

async function checkEmail(email) {
  console.log(email);
  const domain = email.split('@')[1];

  const mxRecords = await getMxRecords(domain);
  console.log(mxRecords);
  if (mxRecords === null) {
    return {
      mail: email,
      isValidDomain: false,
      isPublicMail: false,
      isKnownTemp: false,
      isKnownBusinessMail: false,
      isAiBusinessMail: false,
      isAiTemp: false
    };
  }

  // Clean email if MX record is google.com
  if (mxRecords.includes('google.com')) {
    email = cleanEmail(email);
  }

  const result = {
    mail: email,
    isValidDomain: true,
    isPublicMail: publicDomains.includes(domain),
    isKnownTemp: tempDomains.includes(domain),
    isKnownBusinessMail: false,
    isAiBusinessMail: false,
    isAiTemp: false
  };
  if(result.isPublicMail || result.isKnownTemp) {
    return result;
  }

  // Check business domains against MX records
  for (const [provider, mxList] of Object.entries(businessDomains)) {
    if (mxList.some(mx => mxRecords.includes(mx))) {
      result.isKnownBusinessMail = true;
      break;
    }
  }

  if (!result.isPublicMail && !result.isKnownTemp && !result.isKnownBusinessMail) {
    const isAiTemp = await checkEmailProviderAi(domain);
    console.log(isAiTemp);
    if (isAiTemp == 'true') {
      result.isAiTemp = true;
    } else {
      result.isAiBusinessMail = true;
    }
  }

  return result;
}
const testEmails = [
  "user+new@gmail.com",
  "user+new@googlemail.com",
  "user.new@aws.google.com",
  "user@google.com",
  "test@googlemail.com",
  "admin@oracle.com",
  "someone@amazon.com",
  "someone@apple.com",
  "someone@zeta.com",
  "someone@zepto.com",
  "someone@wellsfargo.com",
  "dev@aws.amazon.com",
  "user@cloudflare.com",
  "tempuser@mailinator.com",
  "user@10minutemail.com",
  "kikono8519@getnada.com",
  "test@facebook.com",
  "test@blackrock.com",
  "test@in.nestle.com",
  "intouch.im@pg.com",
  "apple@ycombinator.com",
  "tityselu@cyclelove.cc",
  "kikono8519@bitflirt.com",
  "kikono8519@paypal.com",
  "kikono8519@fivermail.com",
  "kikono8519@btcours.com",
  "test@pulsegen.com",
  "test@pulsegen.ai",
  "t.est@pulsegen.ai",
  "t.est+new@pulsegen.ai",
  "test+new@pulsegen.ai",
  "test@desutchebank.com",
  "test@deutschebank.com"
];

router.get('/check-email', async (req, res) => {
  const email = req.query.email;
  console.log(email);
  if (!email) {
    return res.status(400).json({ error: 'Email query parameter is required' });
  }
  // for (const email of testEmails) {
  //   console.log('\nTesting email:', email);
  //   const result = await checkEmail(email);
  //   console.log('Result:', result);
  //   console.log('--------------------------------');
  // }
  
  const result = await checkEmail(email);
  console.log(result);
  res.json(result);
});

for (const email of testEmails) {
    console.log('\nTesting email:', email);
    const result = await checkEmail(email);
    console.log('Result:', result);
    console.log('--------------------------------');
  }

export default router;