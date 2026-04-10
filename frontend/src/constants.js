// ─── BRBR Community Constants ─────────────────────────────────

// Book chapters / discussion topics
export const BOOK_CHAPTERS = [
  "Chapter 1 — The Ghetto Side of Growth",
  "Chapter 2 — Nichole vs. Nikki (Healing + Harmony)",
  "Chapter 3 — How I Broke the Pattern",
  "Chapter 4 — When Grit Becomes Grace",
  "Chapter 5 — Dear Peace",
  "Introduction — To the Reader",
];

// Discussion groups / reading circles
export const READING_GROUPS = [
  "First-Time Readers", "Chapter-a-Week Club", "Deep Dive Study Group",
  "Prayer & Reflection Circle", "Healing Out Loud Group", "Women of Faith Readers",
  "Young Adults Book Club", "Couples Reading Together", "Journal & Discuss",
  "Petty Prayers Fellowship", "New Members Welcome", "Advanced Discussion",
];

export const DESIRED_GROUPS = [
  "Weekly Book Club", "Prayer Circle", "Writing Workshop",
  "Healing Support Group", "Women's Empowerment", "Creative Expression",
  "Couples Discussion", "Youth Readers", "Community Outreach",
  "Podcast Discussion", "Journaling Group", "Mentoring Circle",
  "Virtual Meetup", "Local Meetup", "Leadership Development",
];

// Spiritual / personal growth gifts
export const GROWTH_AREAS = [
  "Encouragement", "Hospitality", "Leadership", "Teaching",
  "Creative Expression", "Prayer", "Mentoring", "Writing",
  "Listening", "Healing", "Advocacy", "Community Building",
];

// Ways to help / connect
export const AVAIL_OPTS = [
  "Prayer Partner", "Accountability Partner", "Meal Sharing",
  "Childcare Help", "Mentoring", "Event Hosting", "Creative Projects",
  "Tech Support", "Transportation", "Emotional Support",
  "Workshop Facilitation", "Photography", "Design Work",
  "Writing/Editing", "Social Media Help", "Fundraising",
];

export const HOBBY_OPTS = [
  "Reading", "Writing", "Journaling", "Poetry", "Photography",
  "Painting", "Music", "Dancing", "Cooking", "Yoga",
  "Hiking", "Travel", "Gardening", "Meditation", "Podcasts",
  "Fashion", "Crafts", "Volunteering", "Coffee Meetups", "Film",
];

export const NEED_HELP_OPTS = [
  "Emotional Support", "Prayer Support", "Accountability",
  "Childcare", "Transportation", "Meals/Groceries",
  "Job Search Help", "Financial Guidance", "Mentoring",
  "Moving Help", "Tech Help", "Elder Care",
  "Creative Collaboration", "Study Partner", "Life Coaching",
];

// Prayer / reflection categories (matches BRBR prayer collection)
export const PRAYER_CATS = [
  "Healing", "Growth", "Family", "Relationships", "Peace",
  "Forgiveness", "Strength", "Gratitude", "Grief & Loss",
  "Financial", "Career", "Spiritual Breakthrough", "Other",
];

// Gallery categories
export const GALLERY_CATS = [
  "Book Club Meetups", "Reading Moments", "Community Events",
  "Creative Expression", "Healing Journeys", "Celebrations",
  "Behind the Book", "Reader Stories", "Art & Inspiration",
];

// Job / opportunity types
export const JOB_TYPES = ["Full-Time", "Part-Time", "Freelance", "Volunteer", "Mentorship"];

export const JOB_CATS = [
  "Healthcare", "Education", "Creative & Arts", "Technology",
  "Ministry & Nonprofit", "Business", "Trades & Labor",
  "Food & Hospitality", "Wellness & Fitness", "Other",
];

// Mock members for development
export const MEMBERS = [
  { id:1, name:"Nikki Nonchalant", email:"nikki@brbrcollection.com", avatar:"NN", location:"Baton Rouge, LA", work:"Author & Speaker", age:35, kids:2, maritalStatus:"Single", birthday:"April 15", languages:["English"], canDrive:true, spiritualGifts:["Teaching","Encouragement","Writing"], currentGroups:["Prayer & Reflection Circle","Deep Dive Study Group"], desiredGroups:["Women's Empowerment","Leadership Development"], hobbies:["Writing","Poetry","Photography","Music"], bio:"Author of Beautifully Ratchet, Brilliantly Real. Faith pusher, truth teller, whole woman. This community is my heart.", social:"Podcast host of Talk Yo Truth, Nik. Always down for real conversation.", available:["Mentoring","Prayer Partner","Workshop Facilitation"], joined:"2026", smallGroup:"Prayer & Reflection Circle", phone:"(225) 555-0001", dietary:"No restrictions" },
  { id:2, name:"Sierra Williams", email:"sierra@email.com", avatar:"SW", location:"Houston, TX", work:"Social Worker", age:28, kids:0, maritalStatus:"Single", birthday:"July 22", languages:["English","Spanish"], canDrive:true, spiritualGifts:["Listening","Advocacy","Encouragement"], currentGroups:["First-Time Readers","Young Adults Book Club"], desiredGroups:["Healing Support Group","Virtual Meetup"], hobbies:["Journaling","Yoga","Podcasts","Coffee Meetups"], bio:"Read BRBR in one sitting and it changed my whole perspective. Here to connect with women who get it.", social:"Love deep conversations and accountability partners.", available:["Emotional Support","Prayer Partner","Accountability Partner"], joined:"2026", smallGroup:"First-Time Readers", phone:"(713) 555-0002", dietary:"Vegan" },
  { id:3, name:"Destiny Johnson", email:"destiny@email.com", avatar:"DJ", location:"Atlanta, GA", work:"Registered Nurse", age:34, kids:1, maritalStatus:"Married", birthday:"November 8", languages:["English"], canDrive:true, spiritualGifts:["Mercy","Healing","Prayer"], currentGroups:["Chapter-a-Week Club","Petty Prayers Fellowship"], desiredGroups:["Couples Discussion","Prayer Circle"], hobbies:["Reading","Cooking","Travel","Dancing"], bio:"Healthcare worker and mom. This book spoke to every chapter of my life. Literally. The Petty Prayer is my daily devotional now.", social:"Always looking for book club meetups and prayer partners.", available:["Prayer Partner","Meal Sharing","Emotional Support"], joined:"2026", smallGroup:"Chapter-a-Week Club", phone:"(404) 555-0003", dietary:"No restrictions" },
  { id:4, name:"Jasmine & Marcus Reed", email:"reeds@email.com", avatar:"JR", location:"Baton Rouge, LA", work:"Jasmine: Teacher | Marcus: IT Manager", age:40, kids:3, maritalStatus:"Married", birthday:"Jasmine: Feb 14 | Marcus: Sep 3", languages:["English"], canDrive:true, spiritualGifts:["Hospitality","Leadership","Community Building"], currentGroups:["Couples Reading Together","Journal & Discuss"], desiredGroups:["Couples Discussion","Local Meetup"], hobbies:["Cooking","Gardening","Travel","Film"], bio:"We read BRBR together and it transformed how we communicate. Now we want to share that with other couples.", social:"Love hosting dinner-and-discuss nights at our home.", available:["Event Hosting","Mentoring","Childcare Help"], joined:"2026", smallGroup:"Couples Reading Together", phone:"(225) 555-0004", dietary:"No restrictions" },
  { id:5, name:"Gloria Thompson", email:"gloria@email.com", avatar:"GT", location:"New Orleans, LA", work:"Retired Educator", age:62, kids:4, maritalStatus:"Widowed", birthday:"May 20", languages:["English"], canDrive:true, spiritualGifts:["Mentoring","Teaching","Prayer"], currentGroups:["Advanced Discussion","Prayer & Reflection Circle"], desiredGroups:["Mentoring Circle","Community Outreach"], hobbies:["Reading","Volunteering","Gardening","Crafts"], bio:"35 years in education. This book reminded me that healing has no age limit. I'm here to pour into younger women.", social:"Coffee and conversation is my love language.", available:["Mentoring","Prayer Partner","Workshop Facilitation","Emotional Support"], joined:"2026", smallGroup:"Advanced Discussion", phone:"(504) 555-0005", dietary:"Diabetic-friendly" },
  { id:6, name:"Kayla Baptiste", email:"kayla@email.com", avatar:"KB", location:"Dallas, TX", work:"Graphic Designer & Content Creator", age:25, kids:0, maritalStatus:"Single", birthday:"August 11", languages:["English","Haitian Creole"], canDrive:true, spiritualGifts:["Creative Expression","Encouragement","Community Building"], currentGroups:["Young Adults Book Club","Creative Expression"], desiredGroups:["Creative Expression","Social Media Help"], hobbies:["Photography","Fashion","Dancing","Podcasts"], bio:"Designer who turns healing into art. BRBR inspired me to start my own journal brand. Here for the community and the creativity.", social:"Instagram is my playground. Let's create together.", available:["Design Work","Photography","Social Media Help","Creative Projects"], joined:"2026", smallGroup:"Young Adults Book Club", phone:"(214) 555-0006", dietary:"Gluten-free" },
];
