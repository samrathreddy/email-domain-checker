import { checkEmailProviderServiceAi } from '../services/emailService.js';
import { cleanEmail, getMxRecords } from '../utils/emailUtils.js';
import publicDomains from '../constants/publicDomains.js';
import tempDomains from '../constants/tempDomains.js';
import businessDomains from '../constants/businessDomains.js';

async function checkEmail(req, res) {
  let email = req.query.email;
  console.log(email);
  if (!email) {
    return res.status(400).json({ error: 'Email query parameter is required' });
  }

  const domain = email.split('@')[1];
  const mxRecords = await getMxRecords(domain);
  console.log(mxRecords);
  if (mxRecords === null) {
    return res.json({
      mail: email,
      isValidDomain: false,
      isPublicMail: false,
      isKnownTemp: false,
      isKnownBusinessMail: false,
      isAiBusinessMail: false,
      isAiTemp: false
    });
  }

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

  if (result.isPublicMail || result.isKnownTemp) {
    return res.json(result);
  }

  for (const [provider, mxList] of Object.entries(businessDomains)) {
    if (mxList.some(mx => mxRecords.includes(mx))) {
      result.isKnownBusinessMail = true;
      break;
    }
  }

  if (!result.isPublicMail && !result.isKnownTemp && !result.isKnownBusinessMail) {
    const isAiTemp = await checkEmailProviderServiceAi(domain);
    if (isAiTemp === 'true') {
      result.isAiTemp = true;
    } else {
      result.isAiBusinessMail = true;
    }
  }

  res.json(result);
}

export default checkEmail;