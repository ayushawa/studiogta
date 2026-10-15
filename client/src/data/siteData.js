// Authentic Studio GTA Real Estate Media Data Source of Truth

export const COMPANY = {
  name: 'STUDIO GTA',
  tagline: 'Real Estate & Architectural Media',
  founder: 'Herman',
  phone: '647-300-0315',
  phoneClean: '+16473000315',
  email: 'info@studiogta.ca',
  address: '3601 Highway 7 East, Suite 1005, Unit D08, Markham ON L3R 0M3',
  addressLines: [
    '3601 Highway 7 East, Suite 1005, Unit D08,',
    'Markham ON',
    'L3R 0M3'
  ],
  mapUrl: 'https://maps.google.com/?q=3601+Highway+7+East,+Suite+1005,+Unit+D08,+Markham+ON+L3R+0M3',
  serviceArea: 'Greater Toronto Area & Surrounding Regions',
  hours: 'Monday – Saturday: 8:00 AM – 7:00 PM',
  instagram: 'https://www.instagram.com/studiogta_realestatemedia',
  youtube: 'https://www.youtube.com/c/StudioGTAVirtualTour',
  turnaround: '24-48 Hour Delivery',
  guarantee: '100% Satisfaction Guaranteed'
};

export const TRUST_STATS = [
  {
    number: '24',
    suffix: 'hr',
    label: 'Fast Turnaround',
    subtext: 'Next-day MLS delivery'
  },
  {
    number: '5.0',
    suffix: '★',
    label: 'Google Reviews',
    subtext: 'Flawless 5/5 client satisfaction'
  },
  {
    number: '200',
    suffix: '+',
    label: 'Top GTA Realtors',
    subtext: 'Collaborating across Toronto'
  },
  {
    number: '10',
    suffix: '+',
    label: 'Years Experience',
    subtext: 'Award-winning architectural media'
  }
];

export const BROKERAGES = [
  { name: 'Barry Cohen Homes', logo: '/images/broker-barry-cohen.png', width: 77, height: 48, imgSize: 171 },
  { name: "Sotheby's International Realty", logo: '/images/broker-sothebys.png', width: 213, height: 36, imgSize: 300 },
  { name: 'RE/MAX', logo: '/images/broker-remax.png', width: 215, height: 38, imgSize: 317 },
  { name: 'PSR Brokerage', logo: '/images/broker-psr.png', width: 129, height: 42, imgSize: 191 },
  { name: 'Susan Gucci Team', logo: '/images/broker-susan-gucci.png', width: 257, height: 34, imgSize: 378 },
  { name: 'Sutton Group', logo: '/images/broker-sutton.png', width: 85, height: 48, imgSize: 160 },
  { name: 'Right At Home Realty', logo: '/images/broker-right-at-home.png', width: 71, height: 54, imgSize: 100 },
  { name: 'Royal LePage', logo: '/images/broker-royal-lepage.png', width: 128, height: 44, imgSize: 180 },
  { name: 'Benchmark Realty', logo: '/images/broker-benchmark.png', width: 154, height: 40, imgSize: 235 },
  { name: 'Living Realty', logo: '/images/broker-living-realty.png', width: 111, height: 44, imgSize: 169 },
  { name: 'Landpower Real Estate', logo: '/images/broker-landpower.png', width: 208, height: 36, imgSize: 313 },
  { name: 'Bay Street Group', logo: '/images/broker-bay-street.png', width: 88, height: 46, imgSize: 177 },
  { name: 'HomeLife', logo: '/images/broker-homelife.png', width: 116, height: 44, imgSize: 205 },
  { name: 'Forest Hill Real Estate', logo: '/images/broker-forest-hill.png', width: 133, height: 42, imgSize: 271 },
  { name: 'Century 21', logo: '/images/broker-century21.png', width: 297, height: 32, imgSize: 457 },
  { name: 'Big City Realty', logo: '/images/broker-bigcity.png', width: 179, height: 38, imgSize: 271 },
  { name: 'Keller Williams', logo: '/images/broker-keller-williams.png', width: 102, height: 46, imgSize: 167 }
];

export const TESTIMONIALS = [
  {
    quote: "I reach out to Herman for all my real estate photography/videography needs. He's so easy to work with, professional, accommodating and the results are always outstanding! I highly recommend his services.",
    author: "James Arciaga",
    role: "Real Estate Broker",
    brokerage: "Toronto Brokerage"
  },
  {
    quote: "Herman and his team are fantastic to work with. Great photo/video quality and even better customer service! We would highly recommend them to any real estate professional or home builder.",
    author: "Lome Irwin Real Estate Team",
    role: "Top Producer Team",
    brokerage: "Forest Hill Real Estate"
  },
  {
    quote: "We have been working with Studio GTA Real Estate Media for 5 years. Their team has been our go-to photographer and videographer. I have full faith that our listings will look amazing and have never been disappointed. Very professional and good turn around time.",
    author: "Michelle Zhao",
    role: "Senior Real Estate Agent",
    brokerage: "Greater Toronto Area"
  }
];

export const PACKAGES = [
  {
    id: 'hdr-photography',
    name: 'HDR Photography Package',
    badge: 'Popular for Basic Decors',
    price: '$185',
    currency: 'CAD + HST',
    sizeLimit: 'Properties less than 3,000 sq ft',
    description: 'Designed for condos and residential listings with clean decors that need high-impact MLS imagery to maximize buyers\' first impression.',
    inclusions: [
      'Comprehensive Interior & Exterior Photography',
      'True HDR Multi-Exposure Blending for Balanced Light',
      'High-Resolution Still Images for Print Marketing',
      'MLS-Optimized Web-Ready Compressed Images',
      'Dedicated Property Webpage Virtual Tour Link',
      'Client Portal & Instant Photo Delivery System',
      'One-Click Social Media Sharing Assets',
      'Local Map & Area Overview Integration',
      'Guaranteed 24-Hour Turnaround'
    ],
    ctaText: 'Book This Package',
    recommended: false
  },
  {
    id: 'video-photo',
    name: 'Video & Photo Package',
    badge: 'Most Popular',
    price: '$280',
    currency: 'CAD + HST',
    sizeLimit: 'Properties less than 3,000 sq ft',
    description: 'The complete digital marketing bundle for staged homes and proactive realtors who utilize video and social media to capture buyer attention.',
    inclusions: [
      'Everything in HDR Photography Package',
      '2–4 Minute HD Cinematic Property Video',
      'Professional Color Grading & Licensed Background Music',
      'Branded & Unbranded MLS-Compliant Video Files',
      'Smooth Gimbal Stabilization for Flowing Navigation',
      'Dedicated Property Webpage Virtual Tour',
      'High-Resolution Print & MLS-Ready Still Images',
      'Client Portal & Seamless Cloud Delivery',
      'Fast 24–48 Hour Turnaround'
    ],
    ctaText: 'Book This Package',
    recommended: true
  },
  {
    id: 'premium-walkthrough',
    name: 'Premium Walkthrough Video & Photo Package',
    badge: 'Luxury Properties',
    price: '$420',
    currency: 'CAD + HST',
    sizeLimit: 'Properties less than 3,000 sq ft',
    description: 'Engineered specifically for high-end luxury residences, custom architectural builds, and properties requiring maximum visual prestige.',
    inclusions: [
      'Complete Luxury Interior & Exterior HDR Photography',
      'Premium Steadicam / Motorized Gimbal Walkthrough Video',
      'Ultra-HD 4K Cinematic Visual Presentation',
      'Detailed Architectural Vignettes & Custom Feature Focus',
      'High-Resolution Print & MLS-Optimized Image Suite',
      'Dedicated Property Webpage Virtual Tour Showcase',
      'Social Media Vertical Reel / Short Teaser Video',
      'Unbranded MLS Video & Branded Social Version',
      'Priority Post-Production & Client Delivery Portal'
    ],
    ctaText: 'Book This Package',
    recommended: false
  }
];

export const ADDON_SERVICES = [
  {
    name: 'Professional Headshot Session',
    price: '$250 CAD',
    details: '15-min in-studio session + 15-min photo selection. Includes 2 high-res retouched JPGs + 2 transparent PNGs for marketing materials. Optional hair & makeup available.'
  },
  {
    name: '3D Matterport Interactive Floor Plan',
    price: 'Custom Quote by Sq Ft',
    details: 'Complete 3D digital twin of the property. Prospective buyers can walk through rooms virtually from anywhere in the world, filtering serious qualified buyers.'
  },
  {
    name: 'Commercial & Architectural Photoshoot',
    price: 'Custom Project Quote',
    details: 'Custom tailored for architects, developers, hotels, and designers. Includes pre-planning, scouting, full-day shoot, advanced retouches (TIFF/JPG), and commercial usage licensing.'
  }
];

export const SERVICES = [
  {
    id: 'residential-photography',
    title: 'Residential Real Estate Photography & Videography',
    eyebrow: 'MLS & Marketing Media',
    description: 'Still photography and cinematic video are the foundation of online real estate marketing. Studio GTA captures interiors with balanced exposure, natural window views, and wide-angle precision so rooms feel spacious, inviting, and true to life.',
    image: '/images/service-residential.jpg',
    features: [
      'True HDR exposure blending for crisp window views and rich ambient lighting',
      'Ultra-wide architectural lenses that showcase spatial volume without unnatural fish-eye distortion',
      'Detailed color correction, vertical perspective straightening, and lens optimization',
      'Cinematic HD & 4K property walkthrough videos for MLS and social media reels',
      'High-resolution files for print feature sheets and compressed formats ready for immediate MLS upload'
    ]
  },
  {
    id: 'commercial-architectural',
    title: 'Commercial & Architectural Photography',
    eyebrow: 'Architects & Commercial Developers',
    description: 'Architectural photography requires meticulous preparation, understanding of natural sun angles, and exacting compositional control. We work directly with architects, interior designers, commercial developers, and luxury boutique hotels to translate physical structures into editorial art.',
    image: '/images/service-commercial.jpg',
    features: [
      'Comprehensive pre-production, site scouting, and sun angle planning',
      'Exterior daylight, golden hour, and dusk twilight captures',
      'Interior lighting balance highlighting materials, textures, and bespoke design finishes',
      'Digital post-production with 16-bit TIFF master files and high-resolution JPGs',
      'Full commercial usage rights agreements tailored to your promotional campaigns'
    ]
  },
  {
    id: 'matterport-3d-floorplans',
    title: '3D Matterport Tours & Interactive Floor Plans',
    eyebrow: 'Immersive Virtual Exploration',
    description: 'Blow prospective buyers away with an immersive 3D digital twin of your property. Matterport technology allows out-of-town purchasers and busy executives to explore every room at their own pace, weeding out unqualified visits and driving serious offers.',
    image: '/images/portfolio-interior.jpg',
    features: [
      'Interactive 3D dollhouse and floor-by-floor navigation',
      'Precision schematic floor plans with accurate room measurements',
      'Hosted virtual tour link ready for MLS, Realtor.ca, and social media integration',
      'Accessible on all devices—mobile phones, tablets, desktops, and VR headsets',
      'Reduces unnecessary foot traffic while attracting highly motivated buyers'
    ]
  },
  {
    id: 'professional-headshots',
    title: 'Professional Realtor Headshots',
    eyebrow: 'Personal Branding & Executive Presence',
    description: 'Elevate your real estate brand with a modern, commanding headshot. Shot in our dedicated studio or on location with high-end commercial retouching that enhances your natural confidence without artificial plastic filtering.',
    image: '/images/portfolio-foyer.jpg',
    features: [
      '15-minute guided in-studio or on-location session with posture coaching',
      '15-minute live photo review to pick your favorite portraits immediately',
      '2 High-Resolution master retouched JPGs for billboard and print feature sheets',
      '2 Transparent PNG cutouts ready for social graphics and listing flyers',
      'Optional in-house professional makeup and hair styling'
    ]
  }
];

export const PORTFOLIO_GALLERY = [
  {
    id: 1,
    title: 'Luxury Living & Toronto Skyline Balcony',
    category: 'Residential',
    location: 'Downtown Toronto, ON',
    description: 'Over 1,100 sq ft luxury condo featuring floor-to-ceiling windows and a 400 sq ft wrap-around terrace overlooking the city skyline.',
    image: '/images/portfolio-skyline.jpg',
    featured: true
  },
  {
    id: 2,
    title: 'Woodwards W-43 Architectural Landmark',
    category: 'Architectural',
    location: 'Vancouver, BC / Toronto',
    description: 'Iconic high-density architectural tower captured with precision vertical tilt-shift perspective.',
    image: '/images/arch-woodwards.jpg',
    featured: true
  },
  {
    id: 3,
    title: 'Custom Contemporary Chef Kitchen',
    category: 'Residential',
    location: 'South Ajax, ON',
    description: 'Bright open-concept gourmet kitchen with custom cabinetry, quartz waterfall island, and designer pendant fixtures.',
    image: '/images/portfolio-kitchen.jpg',
    featured: false
  },
  {
    id: 4,
    title: 'Hotel X Toronto Luxury Hospitality',
    category: 'Commercial',
    location: 'Exhibition Place, Toronto',
    description: 'Commercial hospitality shoot capturing interior grandeur and waterfront architecture.',
    image: '/images/arch-hotel-x.jpg',
    featured: true
  },
  {
    id: 5,
    title: 'One Bloor Luxury Residence',
    category: 'Architectural',
    location: 'Bloor-Yorkville, Toronto',
    description: 'One of Canada’s most prestigious residential high-rises shot for luxury real estate marketing.',
    image: '/images/arch-one-bloor.jpg',
    featured: false
  },
  {
    id: 6,
    title: 'The Paramount Keltic Development',
    category: 'Architectural',
    location: 'Metro Vancouver / Richmond',
    description: 'Contemporary mixed-use urban architectural project showcasing curved glass facades and public concourse.',
    image: '/images/arch-paramount.jpg',
    featured: false
  },
  {
    id: 7,
    title: 'King Portland Centre Commercial Space',
    category: 'Commercial',
    location: 'King West Fashion District, Toronto',
    description: 'Award-winning sustainable office and retail complex emphasizing brick-and-beam authenticity with modern steel.',
    image: '/images/arch-king-portland.jpg',
    featured: false
  },
  {
    id: 8,
    title: 'Modern Great Room & Staged Living',
    category: 'Residential',
    location: 'Markham, ON',
    description: 'Expansive open-plan living room with natural ambient light and curated staging accents.',
    image: '/images/portfolio-living.jpg',
    featured: false
  },
  {
    id: 9,
    title: 'Wellesley on the Park Residential Tower',
    category: 'Architectural',
    location: 'Downtown Toronto',
    description: 'Flowing sculptural balcony ribbons defining modern downtown high-rise architecture.',
    image: '/images/arch-wellesley.jpg',
    featured: false
  },
  {
    id: 10,
    title: 'Master Retreat & Natural Illumination',
    category: 'Residential',
    location: 'Richmond Hill, ON',
    description: 'Tranquil master bedroom suite with natural hardwood floors and soft morning window light.',
    image: '/images/portfolio-bedroom.jpg',
    featured: false
  },
  {
    id: 11,
    title: 'Executive Dining & Architectural Millwork',
    category: 'Residential',
    location: 'Vaughan, ON',
    description: 'Sophisticated formal dining area highlighting custom ceiling woodwork and ambient chandelier lighting.',
    image: '/images/portfolio-dining.jpg',
    featured: false
  },
  {
    id: 12,
    title: 'Modern Condominium Grand Foyer',
    category: 'Residential',
    location: 'North York, ON',
    description: 'Inviting entrance foyer emphasizing sightlines and materials.',
    image: '/images/portfolio-foyer.jpg',
    featured: false
  }
];

export const FAQS = [
  {
    q: 'How fast will I receive the final photos and video?',
    a: 'We understand that in the fast-paced GTA real estate market, timing is everything. Our HDR photography packages are delivered within 24 hours. Packages including cinematic video or 3D Matterport tours are delivered within 24 to 48 hours.'
  },
  {
    q: 'Are the photos formatted for MLS upload?',
    a: 'Yes, absolutely. You receive two full sets of files: a high-resolution set suited for luxury print brochures and magazines, and a properly formatted, compressed set ready for immediate upload to TRREB MLS, Realtor.ca, and brokerage portals.'
  },
  {
    q: 'How do I prepare the home prior to the photoshoot?',
    a: 'Ensure all interior lights and lamps are turned on, window blinds are neatly leveled to let in natural light, countertops are cleared of personal toiletries or clutter, and vehicles are parked away from the driveway to ensure unobstructed exterior views.'
  },
  {
    q: 'What is your service coverage area?',
    a: 'Studio GTA covers the entire Greater Toronto Area, including Toronto, Markham, Richmond Hill, Vaughan, Mississauga, Brampton, Oakville, Burlington, Ajax, Pickering, and surrounding Ontario regions.'
  },
  {
    q: 'How do I book a shoot?',
    a: 'You can book directly through our website by choosing a package and submitting your property details, emailing us at tour@studiogta.ca, or calling Herman directly at 647-300-0315.'
  }
];
