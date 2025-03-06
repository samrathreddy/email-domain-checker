import dns.resolver
from datetime import datetime
from constants.business_domains import business_provider_mx_domains
from constants.temp_domains import blacklist_temp_domains
from constants.public_domains import public_email_domains
from openAI import check_email_provider



def get_mx_records(domain):
    """Fetch MX records for a given domain."""
    try:
        # Resolve MX records for the domain
        mx_answers = dns.resolver.resolve(domain, 'MX')
        # print(mx_answers)
        # for record in mx_answers:
        #     print(f"{domain}\tmail exchanger = {record.preference} {record.exchange}")
        
        # Return the last two parts of each MX record's exchange
        return ['.'.join(str(record.exchange).strip('.').split('.')[-2:]) for record in mx_answers]
    
    except Exception as e:
        #print(f"❌ Error fetching MX non authoritative records for {domain}: {e}")
        
        # Attempt to fetch authoritative information if MX records are not found
        try:
            soa_answer = dns.resolver.resolve(domain, 'SOA')
            # print("\nAuthoritative answers can be found from:")
            # for record in soa_answer:
            #     print(f"{domain}\n\torigin = {record.mname}\n\tmail addr = {record.rname}\n\tserial = {record.serial}\n\trefresh = {record.refresh}\n\tretry = {record.retry}\n\texpire = {record.expire}\n\tminimum = {record.minimum}")
            return ['.'.join(str(record.rname).strip('.').split('.')[-2:]) for record in soa_answer]
        
        except Exception as e:
            print("Invalid Domain")
            return []


def clean_email(email):
    """Remove aliases, dots from the local part, and '+' parts from the email to get a clean version."""
    local_part, domain = email.split('@')
    local_part = local_part.split('+')[0]
    local_part = local_part.replace('.', '')
    cleaned_email = f"{local_part}@{domain}"
    return cleaned_email


def is_whitelisted(email):
    """Check if the email domain is whitelisted and return a dictionary of checks."""
    domain = email.split('@')[-1]
    print(f"🔍 Checking domain: {domain}")

    if domain == "gmail.com":
        email = clean_email(email)
    
    # Initialize the result dictionary
    result = {
        "email": email,
        "isValidDomain": True,
        "isPublicMail": False,
        "isKnownTemp": False,
        "isBusinessMail": False,
        "isAiBusinessMail": False,
        "isAiTemp": False
    }

    # Check if the domain is a public email provider
    if domain in public_email_domains:
        print(f"✅ {domain} is a public email provider.")
        result["isPublicMail"] = True
        return result

    # Check if the domain is in the temporary email blacklist
    if domain in blacklist_temp_domains:
        print(f"🚨 {domain} is a known temporary email provider!")
        result["isKnownTemp"] = True
        return result

    # Get MX records for the email domain
    mx_records = get_mx_records(domain)

    if not mx_records:
        result["isValidDomain"] = False
        print(f"❌ {domain} is an invalid domain (no MX records found).")
        return result
    
    #Remove aliases and dots from the email (gmail and its workspace)
    for mx in mx_records:
        if mx == "google.com":
            clean_mail = clean_email(email)
            result["email"] = clean_mail

    # Check if any MX record matches our whitelist
    for provider, mx_list in business_provider_mx_domains.items():
        if any(mx in mx_records for mx in mx_list):
            print(f"✅ {email} is verified as a business email (Provider: {provider}).")
            result["isBusinessMail"] = True
            return result
    try:
        isAiTemp = check_email_provider(domain)
        if isAiTemp.lower() == "yes":
            print(f"🚨 {email} is AI Suspected Temp Mail.")
            result["isAiTemp"] = True
        else:
            print(f"✅ {email} is AI Bussiness Mail.")
            result["isAiBusinessMail"] = True
    except Exception as e:
        print(f"❌ Error fetching AI Check for {domain}: {e}")
    

    return result


emails = [
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
    "test@deutschebank.com",
]



for email in emails:
    result = is_whitelisted(email)
    print(f"Email: {email}, Result: {result}")
    print("--------------------------------")
