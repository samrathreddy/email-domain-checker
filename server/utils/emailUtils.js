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
        // Extract last two parts of the primary name server
        const parts = soaRecord.hostmaster.split('.');
        return [`${parts[parts.length - 2]}.${parts[parts.length - 1]}`];
  
      } catch (soaError) {
        console.error(`Error fetching SOA records for ${domain}: Invalid domain`);
        return null;
      }
    }
  }

export { cleanEmail, getMxRecords };