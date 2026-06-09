export interface Testimonial {
  id: number;
  name: string;
  location: string;
  countryCode: string;
  quote: string;
  avatar: string;
  portraitVideo?: string;
  landscapeVideo?: string;
  poster?: string;
}

function flag(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}

export const taxTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Joey Hernandez",
    location: "Miami, United States",
    countryCode: "US",
    quote: "CoinGuard made my crypto tax filing completely painless. I had transactions across five different exchanges and they handled everything. Highly recommend their service to any serious investor.",
    avatar: "",
    landscapeVideo: "/testimonials/tax-video-1-landscape.mp4",
    poster: "/testimonials/tax-video-1-poster.jpg",
  },
  {
    id: 2,
    name: "Sarah Bennett",
    location: "Vancouver, Canada",
    countryCode: "CA",
    quote: "I was overwhelmed trying to figure out my DeFi taxes. CoinGuard sorted everything out in days. Their team actually understands how staking and liquidity pools work.",
    avatar: "",
    landscapeVideo: "/testimonials/tax-video-2-landscape.mp4",
    poster: "/testimonials/tax-video-2-poster.jpg",
  },
  {
    id: 3,
    name: "Ryan Caldwell",
    location: "London, United Kingdom",
    countryCode: "GB",
    quote: "Switched from doing my crypto taxes manually to using CoinGuard. The accuracy and speed saved me from a potential audit headache. Could not be happier.",
    avatar: "/avatars/ryan-caldwell.png",
  },
  {
    id: 4,
    name: "James Whitfield",
    location: "Sydney, Australia",
    countryCode: "AU",
    quote: "Filing crypto taxes in Australia is confusing. CoinGuard handled every single CGT event across multiple wallets without a single issue. Worth every dollar.",
    avatar: "/avatars/james-whitfield.png",
  },
  {
    id: 5,
    name: "Nathan Brooks",
    location: "New York, United States",
    countryCode: "US",
    quote: "Their tax reports are clean, detailed, and my accountant actually thanked me for using CoinGuard. That says everything.",
    avatar: "/avatars/nathan-brooks.png",
  },
  {
    id: 6,
    name: "Marcus Engel",
    location: "Berlin, Germany",
    countryCode: "DE",
    quote: "I trade on six different platforms and CoinGuard pulled in all my data automatically. The tax summary was ready in under 48 hours.",
    avatar: "/avatars/marcus-engel.png",
  },
  {
    id: 7,
    name: "Oliver Tanaka",
    location: "Tokyo, Japan",
    countryCode: "JP",
    quote: "Crypto tax rules in Japan are strict. CoinGuard made sure every transaction was properly categorized. Saved me thousands in potential penalties.",
    avatar: "/avatars/oliver-tanaka.png",
  },
  {
    id: 8,
    name: "Ethan Moreau",
    location: "Montreal, Canada",
    countryCode: "CA",
    quote: "I have been trading crypto for four years and never filed properly. CoinGuard went back through all my history and got me compliant. Incredible service.",
    avatar: "/avatars/ethan-moreau.png",
  },
  {
    id: 9,
    name: "William Chen",
    location: "Singapore",
    countryCode: "SG",
    quote: "Fast, accurate, and professional. CoinGuard handled my cross-border crypto transactions perfectly. Their team is responsive and knowledgeable.",
    avatar: "/avatars/william-chen.png",
  },
  {
    id: 10,
    name: "Andrew Patel",
    location: "Dubai, UAE",
    countryCode: "AE",
    quote: "Even in a low-tax jurisdiction, proper documentation matters. CoinGuard gave me full audit-ready reports that my advisors approved immediately.",
    avatar: "/avatars/andrew-patel.png",
  },
  {
    id: 11,
    name: "Sebastian Larsen",
    location: "Oslo, Norway",
    countryCode: "NO",
    quote: "The personal advisor assigned to me understood Norwegian tax law and crypto regulations. That level of expertise is rare and valuable.",
    avatar: "/avatars/sebastian-larsen.png",
  },
  {
    id: 12,
    name: "Thomas Bergman",
    location: "Stockholm, Sweden",
    countryCode: "SE",
    quote: "I was worried about my NFT trades and how they would be taxed. CoinGuard classified everything correctly and my filing was accepted without questions.",
    avatar: "/avatars/thomas-bergman.png",
  },
  {
    id: 13,
    name: "Patrick O'Brien",
    location: "Dublin, Ireland",
    countryCode: "IE",
    quote: "Straightforward process from start to finish. Uploaded my exchange data, CoinGuard did the rest. My tax return was filed on time for the first time in years.",
    avatar: "/avatars/patrick-obrien.png",
  },
  {
    id: 14,
    name: "Alexander Rossi",
    location: "Milan, Italy",
    countryCode: "IT",
    quote: "CoinGuard is the only service I trust with my crypto taxes. They understand European regulations and deliver accurate reports every single time.",
    avatar: "/avatars/alexander-rossi.png",
  },
  {
    id: 15,
    name: "Benjamin Ward",
    location: "Melbourne, Australia",
    countryCode: "AU",
    quote: "Had over 2,000 transactions from the last financial year. CoinGuard processed them all and found deductions I did not even know I qualified for.",
    avatar: "/avatars/benjamin-ward.png",
  },
];

export const insuranceTestimonials: Testimonial[] = [
  {
    id: 101,
    name: "Amanda Clarke",
    location: "Calgary, Canada",
    countryCode: "CA",
    quote: "After the exchange hack last year, I lost sleep worrying about my holdings. CoinGuard insurance gave me peace of mind I did not think was possible in crypto.",
    avatar: "",
    landscapeVideo: "/testimonials/insurance-video-1-landscape.mp4",
    poster: "/testimonials/insurance-video-1-poster.jpg",
  },
  {
    id: 102,
    name: "Michael Dunn",
    location: "Chicago, United States",
    countryCode: "US",
    quote: "The claims process was straightforward and fast. I had a wallet compromise and CoinGuard covered my losses within two weeks. No other service does this.",
    avatar: "/avatars/michael-dunn.png",
  },
  {
    id: 103,
    name: "David Kim",
    location: "Seoul, South Korea",
    countryCode: "KR",
    quote: "For $15 a month, the coverage you get is unmatched. I sleep better knowing my portfolio has real protection backed by a legitimate insurance framework.",
    avatar: "/avatars/david-kim.png",
  },
  {
    id: 104,
    name: "Joshua Clarke",
    location: "Auckland, New Zealand",
    countryCode: "NZ",
    quote: "I was skeptical about crypto insurance until I actually needed it. CoinGuard processed my claim professionally and kept me updated throughout.",
    avatar: "/avatars/joshua-clarke.png",
  },
  {
    id: 105,
    name: "Samuel Torres",
    location: "Madrid, Spain",
    countryCode: "ES",
    quote: "The coverage terms are transparent and there are no hidden exclusions. CoinGuard is honest about what they cover and that builds real trust.",
    avatar: "/avatars/samuel-torres.png",
  },
  {
    id: 106,
    name: "Lucas Andersen",
    location: "Copenhagen, Denmark",
    countryCode: "DK",
    quote: "I hold a significant amount in cold storage and the insurance gives me an extra layer of confidence. CoinGuard understands what crypto investors actually need.",
    avatar: "/avatars/lucas-andersen.png",
  },
  {
    id: 107,
    name: "Henry Nguyen",
    location: "Ho Chi Minh City, Vietnam",
    countryCode: "VN",
    quote: "My hardware wallet was stolen during travel. CoinGuard covered the full value of what was on it. The process was smooth and the team was empathetic.",
    avatar: "/avatars/henry-nguyen.png",
  },
  {
    id: 108,
    name: "Jack Sullivan",
    location: "Perth, Australia",
    countryCode: "AU",
    quote: "Insurance for crypto used to sound like a gimmick. CoinGuard proved me wrong with legitimate coverage, clear terms, and a responsive claims team.",
    avatar: "/avatars/jack-sullivan.png",
  },
  {
    id: 109,
    name: "Noah Fischer",
    location: "Zurich, Switzerland",
    countryCode: "CH",
    quote: "As someone who manages multiple wallets and significant holdings, CoinGuard insurance is a non-negotiable part of my strategy. Highly professional service.",
    avatar: "/avatars/noah-fischer.png",
  },
  {
    id: 110,
    name: "Aiden Campbell",
    location: "Edinburgh, United Kingdom",
    countryCode: "GB",
    quote: "The monthly cost is minimal compared to the protection you receive. CoinGuard is genuinely looking out for crypto investors. I recommend them to everyone.",
    avatar: "/avatars/aiden-campbell.png",
  },
  {
    id: 111,
    name: "Gabriel Martin",
    location: "Paris, France",
    countryCode: "FR",
    quote: "I had a phishing incident that compromised one of my wallets. CoinGuard handled the claim quickly and fairly. They are the real deal.",
    avatar: "/avatars/gabriel-martin.png",
  },
  {
    id: 112,
    name: "Hugo Almeida",
    location: "Lisbon, Portugal",
    countryCode: "PT",
    quote: "What sets CoinGuard apart is the transparency. They explain exactly what is covered, how claims work, and there are no surprises. That is rare in this space.",
    avatar: "/avatars/hugo-almeida.png",
  },
  {
    id: 113,
    name: "Caleb Wright",
    location: "Austin, United States",
    countryCode: "US",
    quote: "My DeFi positions are covered under their policy. Finding insurance that actually covers DeFi was nearly impossible before CoinGuard.",
    avatar: "/avatars/caleb-wright.png",
  },
  {
    id: 114,
    name: "Dylan Schneider",
    location: "Vienna, Austria",
    countryCode: "AT",
    quote: "I have recommended CoinGuard insurance to my entire investment group. The coverage is solid, the price is fair, and the service is top-notch.",
    avatar: "/avatars/dylan-schneider.png",
  },
  {
    id: 115,
    name: "Oscar Johansson",
    location: "Helsinki, Finland",
    countryCode: "FI",
    quote: "After years in crypto without any protection, signing up with CoinGuard was one of the best decisions I made. Peace of mind is priceless.",
    avatar: "/avatars/oscar-johansson.png",
  },
];

export function getFlag(countryCode: string): string {
  return flag(countryCode);
}
