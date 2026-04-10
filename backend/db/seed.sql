-- Insert seed data for BRBR Community members
-- Password hash: $2a$10$placeholder (all use same placeholder for demo)

INSERT INTO users (name, email, password_hash, location, work, age, kids, marital_status, birthday, languages, bio, avatar, phone, can_drive, is_business_owner, business_name, business_description, current_groups, desired_groups, spiritual_gifts, hobbies, available, need_help_with, on_prayer_team, joined)
VALUES
  (
    'Nikki Nonchalant',
    'nikki@example.com',
    '$2a$10$placeholder',
    'Baton Rouge, LA',
    'Event Coordinator',
    28,
    '0',
    'Single',
    '1996-03-15',
    ARRAY['English'],
    'Loves organizing community events and bringing people together. Always up for an adventure!',
    'https://via.placeholder.com/150?text=Nikki',
    '(225) 555-0101',
    true,
    false,
    NULL,
    NULL,
    ARRAY['Book Club', 'Events Committee'],
    ARRAY['Service Team', 'Mentorship'],
    ARRAY['Leadership', 'Organization'],
    ARRAY['Book Reading', 'Event Planning', 'Travel'],
    ARRAY['Weekends', 'Evenings'],
    ARRAY['Home Maintenance Help'],
    true,
    CURRENT_DATE
  ),
  (
    'Sierra Williams',
    'sierra@example.com',
    '$2a$10$placeholder',
    'Baton Rouge, LA',
    'Graphic Designer',
    34,
    '2',
    'Married',
    '1992-07-22',
    ARRAY['English'],
    'Creative designer passionate about making beautiful things. Mother of two amazing kids.',
    'https://via.placeholder.com/150?text=Sierra',
    '(225) 555-0102',
    true,
    true,
    'Sierra Creative Studio',
    'Full-service graphic design studio specializing in branding and digital media',
    ARRAY['Book Club', 'Design Group'],
    ARRAY['Small Business Mentorship', 'Parenting Group'],
    ARRAY['Creativity', 'Design', 'Teaching'],
    ARRAY['Graphic Design', 'Coffee', 'Community Service'],
    ARRAY['Weekday Mornings', 'Weekends'],
    ARRAY['Childcare Exchange', 'Marketing Advice'],
    false,
    CURRENT_DATE
  ),
  (
    'Destiny Johnson',
    'destiny@example.com',
    '$2a$10$placeholder',
    'Baton Rouge, LA',
    'High School Teacher',
    41,
    '1',
    'Divorced',
    '1985-01-10',
    ARRAY['English', 'Spanish'],
    'Educator dedicated to helping young people reach their potential. Love mentoring others.',
    'https://via.placeholder.com/150?text=Destiny',
    '(225) 555-0103',
    true,
    false,
    NULL,
    NULL,
    ARRAY['Mentorship Group', 'Prayer Team'],
    ARRAY['Book Club', 'Young Adults Group'],
    ARRAY['Teaching', 'Mentorship', 'Wisdom'],
    ARRAY['Reading', 'Hiking', 'Mentoring Youth'],
    ARRAY['Afternoons', 'Weekends'],
    ARRAY['Resume Review', 'Job Interview Prep'],
    true,
    CURRENT_DATE
  ),
  (
    'Jasmine & Marcus Reed',
    'reed.family@example.com',
    '$2a$10$placeholder',
    'Baton Rouge, LA',
    'Educators & Community Leaders',
    38,
    '3',
    'Married',
    '1988-05-14',
    ARRAY['English'],
    'Dynamic duo committed to serving their community. Partners in life, faith, and service.',
    'https://via.placeholder.com/150?text=Reeds',
    '(225) 555-0104',
    true,
    false,
    NULL,
    NULL,
    ARRAY['Family Group', 'Service Team', 'Youth Ministry'],
    ARRAY['Parenting Workshop', 'Leadership Development'],
    ARRAY['Hospitality', 'Leadership', 'Community Building'],
    ARRAY['Family Time', 'Cooking', 'Sports'],
    ARRAY['Flexible Schedule'],
    ARRAY['Contractor Recommendations', 'Childcare Support'],
    true,
    CURRENT_DATE
  ),
  (
    'Gloria Thompson',
    'gloria@example.com',
    '$2a$10$placeholder',
    'Baton Rouge, LA',
    'Retired Nurse',
    72,
    '4',
    'Widowed',
    '1952-09-08',
    ARRAY['English'],
    'Retired healthcare provider with a heart for serving. Grandmother of 8 and loving it!',
    'https://via.placeholder.com/150?text=Gloria',
    '(225) 555-0105',
    true,
    false,
    NULL,
    NULL,
    ARRAY['Prayer Team', 'Visitation Group', 'Widows Support'],
    ARRAY['Book Club', 'Grandparents Network'],
    ARRAY['Compassion', 'Care', 'Wisdom'],
    ARRAY['Grandchildren', 'Gardening', 'Cooking'],
    ARRAY['Mornings', 'Flexible'],
    ARRAY['Transportation', 'Tech Help'],
    true,
    CURRENT_DATE
  ),
  (
    'Kayla Baptiste',
    'kayla@example.com',
    '$2a$10$placeholder',
    'Baton Rouge, LA',
    'Marketing Manager',
    29,
    '0',
    'Single',
    '1997-11-30',
    ARRAY['English', 'French'],
    'Marketing professional with passion for people and community. Always seeking new connections!',
    'https://via.placeholder.com/150?text=Kayla',
    '(225) 555-0106',
    true,
    false,
    NULL,
    NULL,
    ARRAY['Book Club', 'Young Professionals'],
    ARRAY['Leadership Group', 'Mentorship'],
    ARRAY['Communication', 'Encouragement', 'Strategy'],
    ARRAY['Marketing', 'Networking', 'Travel', 'Reading'],
    ARRAY['Evenings', 'Weekends'],
    ARRAY['Career Coaching', 'Professional Connections'],
    false,
    CURRENT_DATE
);

-- Insert sample prayers
INSERT INTO prayers (user_id, title, body, category, pray_count)
VALUES
  (
    1,
    'Wisdom for Event Planning',
    'Asking for guidance as we plan the upcoming community book fair. Need wisdom to make it welcoming and meaningful for everyone.',
    'Guidance',
    3
  ),
  (
    3,
    'Health and Strength',
    'Please pray for good health as I navigate this new school year. Thank you for your support!',
    'Health',
    5
  ),
  (
    5,
    'Family Blessings',
    'Grateful for my family. Praying God continues to bless and protect each of my children and grandchildren.',
    'Family',
    8
  ),
  (
    4,
    'Community Outreach',
    'Asking for prayer as we launch our new mentorship program for at-risk youth in our neighborhood.',
    'Service',
    2
  );

-- Insert prayer interactions
INSERT INTO prayer_interactions (prayer_id, user_id)
VALUES
  (1, 2),
  (1, 3),
  (1, 4),
  (2, 1),
  (2, 4),
  (2, 5),
  (3, 1),
  (3, 2),
  (3, 4),
  (3, 6),
  (3, 5),
  (4, 1),
  (4, 2);

-- Insert sample connections (offerings and seekings)
INSERT INTO connections (user_id, type, title, description, categories, response_count)
VALUES
  (
    2,
    'offering',
    'Logo & Branding Design Services',
    'I offer professional logo and branding services for small businesses and nonprofits. Let me help you build your visual identity!',
    ARRAY['Design', 'Branding', 'Business'],
    2
  ),
  (
    6,
    'seeking',
    'Marketing Mentor',
    'Looking for an experienced marketing professional who can guide me through career development and strategic planning.',
    ARRAY['Mentorship', 'Marketing', 'Career'],
    1
  ),
  (
    1,
    'offering',
    'Event Planning & Coordination',
    'Available to help plan and coordinate community events, parties, and celebrations. 10+ years of experience!',
    ARRAY['Events', 'Planning', 'Community'],
    3
  ),
  (
    3,
    'offering',
    'Tutoring in Spanish & Academic Subjects',
    'High school teacher offering tutoring for Spanish language and general academic subjects. Flexible scheduling available.',
    ARRAY['Education', 'Tutoring', 'Language'],
    1
  ),
  (
    5,
    'offering',
    'Home Cooking & Meal Prep',
    'Retired nurse offering meal prep and cooking assistance. Specialty in healthy comfort food and special diets.',
    ARRAY['Cooking', 'Meals', 'Service'],
    2
  );

-- Insert sample jobs
INSERT INTO jobs (user_id, title, company, type, category, location, description, contact)
VALUES
  (
    2,
    'Part-time Graphic Designer',
    'Local Marketing Firm',
    'Contract',
    'Design',
    'Remote/Baton Rouge',
    'Looking for experienced graphic designer for website and marketing materials. 15-20 hours per week.',
    'hr@marketingfirm.com'
  ),
  (
    1,
    'Event Coordinator Assistant',
    'Chamber of Commerce',
    'Part-time',
    'Events',
    'Downtown Baton Rouge',
    'Help coordinate monthly networking events and annual conference. Great for someone with events experience.',
    'events@brchamber.org'
  ),
  (
    3,
    'Summer Camp Counselor',
    'Local Youth Center',
    'Seasonal',
    'Education',
    'Baton Rouge',
    'Seeking enthusiastic educators for summer youth program. Mentoring and teaching opportunity.',
    'director@youthcenter.org'
  );

-- Insert job applications
INSERT INTO job_applications (job_id, user_id)
VALUES
  (1, 6),
  (2, 4),
  (3, 4);

-- Insert gallery items
INSERT INTO gallery (user_id, url, caption, category, like_count)
VALUES
  (
    2,
    'https://via.placeholder.com/400x300?text=Design+Portfolio',
    'Recent branding project for local nonprofit',
    'Business',
    5
  ),
  (
    1,
    'https://via.placeholder.com/400x300?text=Community+Event',
    'Inaugural book fair brought 200+ community members together!',
    'Community',
    12
  ),
  (
    4,
    'https://via.placeholder.com/400x300?text=Family+Service',
    'Our mentorship program in action - making a difference in young lives',
    'Service',
    8
  ),
  (
    5,
    'https://via.placeholder.com/400x300?text=Cooking+Class',
    'Teaching my granddaughter to cook her favorite recipes',
    'Family',
    6
  ),
  (
    3,
    'https://via.placeholder.com/400x300?text=Classroom',
    'Excited to welcome students back for another amazing school year!',
    'Education',
    9
  );

-- Insert gallery likes
INSERT INTO gallery_likes (gallery_id, user_id)
VALUES
  (1, 1), (1, 3), (1, 4), (1, 5), (1, 6),
  (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6),
  (3, 1), (3, 2), (3, 4), (3, 5), (3, 6),
  (4, 1), (4, 2), (4, 3), (4, 6),
  (5, 1), (5, 2), (5, 3), (5, 4), (5, 6);

-- Insert gallery comments
INSERT INTO gallery_comments (gallery_id, user_id, text)
VALUES
  (1, 4, 'Beautiful work, Sierra! Love the color palette.'),
  (1, 5, 'This is exactly what we were looking for!'),
  (2, 3, 'What an amazing turnout! Thank you for organizing!'),
  (2, 5, 'I brought my grandson - he loved it!'),
  (3, 1, 'This is wonderful work. Keep it up!'),
  (4, 2, 'Nothing better than family time and cooking!'),
  (5, 1, 'Love seeing our young people getting mentored!');

-- Insert suggestions
INSERT INTO suggestions (user_id, title, description, category, status, vote_count)
VALUES
  (
    6,
    'Monthly Professional Development Workshops',
    'Host monthly workshops on topics like personal branding, negotiation skills, and career advancement. Would help us all grow professionally.',
    'Learning',
    'open',
    6
  ),
  (
    1,
    'Community Service Day',
    'Organize a quarterly service day where we volunteer together at a local nonprofit or community project.',
    'Service',
    'open',
    8
  ),
  (
    2,
    'Book Club Expansion',
    'Add a second book club with different genres/schedule to reach more community members interested in reading.',
    'Programs',
    'in_progress',
    4
  ),
  (
    5,
    'Senior Lunch Program',
    'Start a weekly lunch gathering for seniors in our community. Great way to combat isolation and build friendships.',
    'Community',
    'open',
    7
  ),
  (
    3,
    'Youth Mentorship Initiative',
    'Formalize mentorship program pairing professionals with high school students for guidance and career exploration.',
    'Programs',
    'open',
    9
  );

-- Insert suggestion votes
INSERT INTO suggestion_votes (suggestion_id, user_id)
VALUES
  (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
  (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6),
  (3, 1), (3, 2), (3, 5), (3, 6),
  (4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6),
  (5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6);

-- Insert suggestion comments
INSERT INTO suggestion_comments (suggestion_id, user_id, text)
VALUES
  (1, 4, 'This is such a great idea! I would definitely attend.'),
  (1, 2, 'Love this. What topics are you thinking about?'),
  (2, 5, 'Count me in! Would love to volunteer with everyone.'),
  (2, 3, 'Great idea. Let''s make a real difference in our community.'),
  (3, 6, 'Yes! Different genres would appeal to more people.'),
  (4, 1, 'I love this idea. I know several seniors who would benefit.'),
  (5, 4, 'This could be transformational for young people. I''m excited!');

-- Insert sample notifications
INSERT INTO notifications (user_id, message, type, is_read)
VALUES
  (1, 'Sierra liked your gallery photo', 'like', false),
  (1, 'New message from Destiny Johnson', 'message', false),
  (2, 'Kayla applied to your job posting', 'job_application', false),
  (3, 'Gloria prayed for your request', 'prayer_interact', true),
  (4, 'New connection response from Sierra Williams', 'connection_response', false),
  (5, 'Your suggestion received 7 votes', 'suggestion_vote', true),
  (6, 'Marcus Reed commented on the community event photo', 'comment', false);

-- Update pray counts based on interactions
UPDATE prayers SET pray_count = (SELECT COUNT(*) FROM prayer_interactions WHERE prayer_id = prayers.id);

-- Update response counts based on interactions
UPDATE connections SET response_count = (SELECT COUNT(*) FROM connection_responses WHERE connection_id = connections.id);

-- Update like counts based on likes
UPDATE gallery SET like_count = (SELECT COUNT(*) FROM gallery_likes WHERE gallery_id = gallery.id);

-- Update vote counts based on votes
UPDATE suggestions SET vote_count = (SELECT COUNT(*) FROM suggestion_votes WHERE suggestion_id = suggestions.id);
