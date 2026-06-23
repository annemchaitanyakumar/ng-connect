export type Service = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  importance: string[];
  offerings: { title: string; desc: string }[];
  closingTitle?: string;
  closing?: string;
  whyPoints?: string[];
  faqs: { q: string; a: string }[];
  plans?: { name: string; features: string[]; featured?: boolean }[];
};

export const services: Service[] = [
  {
    slug: "brand-creative",
    title: "Brand & Creative Services",
    tagline: "Give your brand a story worth remembering.",
    intro:
      "Great brands aren't built by chance, they're built with purpose, consistency, and creativity. We help businesses craft strong brand identities that not only look good but also create lasting impressions and meaningful connections with their audience.",
    importance: [
      "Establishes your position and identity in the market.",
      "Helps customers recognize and remember your business.",
      "Builds trust and credibility with your target audience.",
      "Differentiates your brand from competitors.",
      "Strengthens customer loyalty and long-term brand value.",
    ],
    offerings: [
      { title: "Brand Strategy", desc: "We define your brand's direction, positioning, and voice to create a strong foundation for long-term growth." },
      { title: "Logo Design", desc: "Out-of-the-box logos that capture your brand's personality and make a lasting first impression." },
      { title: "Brand Identity", desc: "Cohesive visual and verbal identities that help your brand stand out and stay recognizable." },
      { title: "Brand Guidelines", desc: "Clear brand guidelines to ensure consistency across every platform and communication touchpoint." },
      { title: "Corporate Presentations", desc: "Professional presentations that communicate your ideas clearly and leave a strong impact." },
      { title: "Marketing Collateral", desc: "From brochures to social creatives, we design materials that strengthen your brand presence." },
      { title: "Packaging Design", desc: "Packaging that attracts attention, reflects your brand, and enhances the customer experience." },
      { title: "Rebranding", desc: "We help businesses refresh, reposition, and transform their identity to stay relevant and competitive." },
    ],
    closingTitle: "Why Choose Networq?",
    closing:
      "Because great brands aren't just to be seen, they're to be remembered. We blend authentic brand values with modern creative approaches, helping you attract the future while staying true to the story that brought you here.",
    faqs: [
      { q: "Why should I hire a professional branding agency?", a: "A professional agency helps create a clear, consistent, and memorable brand identity that builds trust and helps your business stand out in the market." },
      { q: "What kind of branding will work best for my business?", a: "There is no one-size-fits-all approach. Every branding strategy is personalized based on your business goals, audience, industry, and market positioning." },
      { q: "What is the investment required for branding services?", a: "The investment depends on your requirements, business size, and the scope of work. Contact us for a customized quote tailored to your brand." },
      { q: "Can you help rebrand an existing business?", a: "Absolutely. We can refresh, reposition, or completely transform your existing brand while preserving the values that matter most." },
      { q: "How long does the branding process take?", a: "The timeline varies depending on the scope of the project, but we ensure every stage is carefully planned and executed for the best results." },
    ],
  },
  {
    slug: "social-media",
    title: "Social Media Marketing",
    tagline: "Make your brand impossible to ignore.",
    intro:
      "Social media marketing is more than just posting content, it's about building a strong brand presence, creating meaningful engagement, and turning followers into loyal customers. We help businesses stay relevant, visible, and connected with their audience through strategic and creative content.",
    importance: [
      "Helps your brand stay visible and relevant to your audience.",
      "Builds trust through consistent communication and engagement.",
      "Creates impactful connections with potential and existing customers.",
      "Increases brand awareness, reach, and customer loyalty.",
      "Turns attention into opportunities for growth and conversions.",
    ],
    offerings: [
      { title: "Social Media Management", desc: "End-to-end management ensuring consistent activity, audience engagement, and brand presence across all channels." },
      { title: "Content Creation", desc: "High-quality graphics, captions, videos, and creatives that capture attention and drive engagement." },
      { title: "Social Media Advertising", desc: "Targeted ad campaigns designed to reach the right audience, generate leads, and maximize ROI." },
      { title: "Influencer Marketing", desc: "Connect your brand with relevant influencers to increase reach and build authentic credibility." },
      { title: "Community Management", desc: "Engage with your audience through comments, messages, and interactions to build a loyal community." },
      { title: "Social Media Audits", desc: "Analyze your existing presence and provide actionable recommendations to enhance performance." },
      { title: "Strategy Consulting", desc: "Expert guidance and customized strategies based on your business goals, industry trends, and audience behavior." },
    ],
    closingTitle: "Why Choose Networq?",
    closing: "Because we turn content into connections and visibility into growth.",
    whyPoints: [
      "Strategies tailored specifically to your business goals.",
      "Building a strong and consistent brand presence.",
      "Combining creativity with data-driven decision making.",
      "Regular, high-quality content across all platforms.",
      "Up to date with the latest trends and algorithms.",
      "Engagement, reach, and meaningful audience growth.",
      "Transparent reporting and performance insights.",
      "We work as an extension of your team.",
      "Long-term brand value, not just short-term numbers.",
      "Committed to measurable results and real business growth.",
    ],
    faqs: [
      { q: "How fast can I grow my followers and reach?", a: "Growth depends on your industry, content quality, consistency, and audience behaviour. We focus on attracting the right audience rather than just increasing numbers." },
      { q: "Do I need to be active on every social media platform?", a: "Not necessarily. We help identify the platforms where your audience spends the most time and build a strategy around them." },
      { q: "Will trending content work for my brand?", a: "Only if it aligns with your brand identity. We balance trends with relevance to ensure your content feels authentic and purposeful." },
      { q: "What if I don't have content ideas every month?", a: "That's where we come in. Our team handles planning, ideation, and content strategy so your brand never runs out of meaningful content." },
      { q: "Can social media actually bring business, or just likes?", a: "When done strategically, social media can generate enquiries, leads, website traffic, and sales, not just engagement metrics." },
    ],
  },
  {
    slug: "performance",
    title: "Performance Marketing",
    tagline: "Turn clicks into customers, consistently.",
    intro:
      "We design and run lead generation campaigns that focus on bringing you high-quality, conversion-ready leads, not just traffic. By combining targeted ads, audience research, and continuous optimization, we ensure every campaign is built to maximize your ROI and business growth.",
    importance: [
      "Your marketing budget is spent on results, not just reach.",
      "Attract people who are already looking for what you offer.",
      "Turn data into smarter decisions and stronger campaign performance.",
      "Scale with strategies backed by measurable outcomes.",
      "Generate revenue, leads, and growth instead of vanity metrics.",
    ],
    offerings: [
      { title: "Google Ads", desc: "Targeted Google Ads campaigns that reach customers actively searching for your products or services." },
      { title: "Meta Ads", desc: "High-performing campaigns across Facebook and Instagram to drive awareness, engagement, leads and sales." },
      { title: "LinkedIn Ads", desc: "Connect with decision-makers, industry professionals, and high-value prospects on the professional network." },
      { title: "YouTube Ads", desc: "Strategic video advertising campaigns that capture attention, increase visibility, and drive action." },
      { title: "Remarketing", desc: "Reconnect with users who have interacted with your brand to improve conversions and ROI." },
      { title: "CRO", desc: "Optimize landing pages, ad journeys, and conversion funnels to improve performance." },
      { title: "Lead Generation", desc: "Data-driven campaigns focused on generating high-quality leads more likely to convert." },
    ],
    faqs: [
      { q: "How soon can I start seeing results from my campaigns?", a: "Some campaigns generate leads within days, while others require testing and optimization. Our focus is on building sustainable results, not short-term spikes." },
      { q: "Do bigger ad budgets always mean better results?", a: "Not always. A well-optimized campaign with the right audience can often outperform a larger budget with poor targeting." },
      { q: "What happens if a campaign isn't performing well?", a: "We continuously monitor and optimize campaigns, adjusting audiences, creatives, and strategies to improve performance and maximize ROI." },
      { q: "Will I know exactly where my money is being spent?", a: "Absolutely. We provide transparent reporting and performance insights so you can clearly understand how your campaigns are performing." },
      { q: "Can performance marketing work for a new business?", a: "Yes. It can help new businesses gain visibility, generate leads, and validate their market much faster than relying solely on organic growth." },
    ],
  },
  {
    slug: "seo",
    title: "SEO Services",
    tagline: "Your Rank 1 is our goal.",
    intro:
      "We provide result-driven SEO services designed to improve your website visibility, increase organic traffic, and help your business rank higher on search engines. Our approach combines technical SEO, content strategy, and consistent optimization to ensure long-term, sustainable growth.",
    importance: [
      "Appear exactly when customers are searching for your services.",
      "Build long-term organic visibility without constant ad spend.",
      "Increase trust by positioning your brand higher in results.",
      "Drive consistent, high-intent traffic that converts.",
      "Strengthen your digital presence and brand authority.",
    ],
    offerings: [
      { title: "Technical SEO", desc: "Optimize site speed, structure, and crawlability for stronger search performance." },
      { title: "Local SEO", desc: "Get found by customers in your city and neighbourhood when they search nearby." },
      { title: "E-commerce SEO", desc: "Rank product and category pages to drive qualified organic shoppers." },
      { title: "Keyword Research", desc: "Find the keywords your audience actually uses and your competitors are missing." },
      { title: "On-Page SEO", desc: "Refine content, structure, and metadata to maximize relevance and rankings." },
      { title: "Off-Page SEO", desc: "Build authority through outreach, digital PR, and brand presence across the web." },
      { title: "Link Building", desc: "Earn high-quality, relevant backlinks that move the needle on rankings." },
      { title: "SEO Audits", desc: "Deep technical and content audits that uncover what's holding your site back." },
    ],
    plans: [
      {
        name: "Silver",
        features: [
          "30 Keywords",
          "Basic On-Page SEO",
          "Limited Backlinks",
          "Monthly Reporting",
          "Google Business Setup",
          "Basic Competitor Analysis",
          "Mobile Optimization",
          "Content Suggestions",
          "Rank Tracking",
          "Email Support",
        ],
      },
      {
        name: "Gold",
        featured: true,
        features: [
          "50 Keywords",
          "Advanced On-Page SEO",
          "Strong Backlinking",
          "Technical SEO",
          "Content Strategy",
          "Local SEO",
          "Competitor Tracking",
          "Internal Linking",
          "Weekly Reports",
          "Priority Support",
        ],
      },
      {
        name: "Premium",
        features: [
          "100+ Keywords",
          "Full SEO Strategy",
          "High Authority Backlinks",
          "Advanced Technical SEO",
          "Content Marketing",
          "Market Domination",
          "Global SEO",
          "Dedicated Manager",
          "Deep Analytics",
          "Continuous Optimization",
        ],
      },
    ],
    closing:
      "From strategy to execution, we focus on delivering SEO that drives real visibility, traffic, and growth. Because to build the best, you need to team up with the best.",
    faqs: [
      { q: "Can you guarantee a #1 ranking on Google?", a: "No genuine SEO agency can guarantee a #1 ranking. What we can guarantee is a strategic, data-driven approach focused on improving your visibility and long-term growth." },
      { q: "Why is my website not showing up on Google?", a: "This could be due to technical issues, poor optimization, low authority, or strong competition. We identify the gaps and create a roadmap to improve your rankings." },
      { q: "Is SEO a one-time activity or an ongoing process?", a: "SEO is an ongoing process. Search trends, algorithms, and competitors are constantly evolving, so continuous optimization is essential." },
      { q: "How do I know if my SEO is actually working?", a: "We track keyword rankings, organic traffic, website visibility, and conversions to measure the real impact of your SEO efforts." },
      { q: "I already have a website. Do I still need SEO?", a: "Absolutely. A website without SEO is like a shop hidden in a lane nobody knows about. SEO helps the right people find your business." },
    ],
  },
  {
    slug: "web-design",
    title: "Website Design & Development",
    tagline: "We don't just build websites, we create digital experiences.",
    intro:
      "We begin by understanding your business, goals, and audience in detail. Based on that, we design and develop a website that reflects your brand identity and delivers a smooth user experience. From planning to launch, every step is focused on performance, clarity, and impact.",
    importance: [
      "Creates the first impression of your brand in the digital world.",
      "Influences how users trust, engage, and interact with your business.",
      "Turns visitors into customers through clear structure and smart design.",
      "Ensures your brand is accessible, fast, and mobile-friendly everywhere.",
      "Acts as the foundation for all your marketing and online growth efforts.",
    ],
    offerings: [
      { title: "Website Development", desc: "Clean, responsive and scalable development built for smooth performance on every device." },
      { title: "Website Design", desc: "Modern, on-brand interfaces designed for clarity, beauty and conversion." },
      { title: "Landing Pages", desc: "Focused, high-converting landing pages built around a single objective." },
      { title: "E-commerce", desc: "Storefronts engineered to sell, with smooth checkout and product discovery." },
      { title: "Maintenance", desc: "Ongoing care, updates and improvements that keep your site fast and secure." },
      { title: "Speed Optimization", desc: "Performance audits and tuning so your site loads instantly, everywhere." },
      { title: "UX / UI Consulting", desc: "Audit, research and direction to make digital products people love using." },
    ],
    closingTitle: "Build an exceptional business with us",
    closing:
      "Every business needs professional developers who can turn ideas into scalable, high-performing digital solutions that actually grow your brand.",
    faqs: [
      { q: "Do I really need a website if my business is active on social media?", a: "Yes. Social media can attract attention, but your website is where your brand, credibility, and conversions truly come together." },
      { q: "How long does it take to build a website?", a: "The timeline depends on the size, features, and complexity of the project. After understanding your requirements, we provide a clear development schedule." },
      { q: "Will my website work on mobile devices?", a: "Absolutely. Every website we build is fully responsive and optimized to perform seamlessly across mobiles, tablets, and desktops." },
      { q: "Can I update the website myself after it's launched?", a: "Yes. We can build your website on user-friendly platforms that allow you to make basic content updates whenever needed." },
      { q: "What makes a good website different from an average one?", a: "A good website doesn't just look great, it loads fast, offers a smooth user experience, communicates clearly, and helps turn visitors into customers." },
    ],
  },
  {
    slug: "content",
    title: "Content Marketing",
    tagline: "Words that inform, engage & convert.",
    intro:
      "Great content does more than fill a page, it builds trust, starts conversations, and drives action. We create purposeful content that connects with your audience, strengthens your brand voice, and supports your business goals.",
    importance: [
      "Gives your brand a voice that feels human, not promotional.",
      "Stays with your audience long after they've scrolled away.",
      "Builds familiarity that slowly turns into trust.",
      "Makes your brand part of conversations people already care about.",
      "Quietly shapes how people think about your business over time.",
    ],
    offerings: [
      { title: "Blog Writing", desc: "Informative blogs that improve visibility, establish authority, and bring readers back." },
      { title: "Copywriting", desc: "Compelling copy that captures attention, communicates value, and drives action." },
      { title: "Articles", desc: "Well-researched articles that educate and position your brand as an expert." },
      { title: "Email Newsletters", desc: "Impactful newsletters that keep your audience informed and connected." },
      { title: "Case Studies", desc: "Structured success stories that build credibility and trust." },
      { title: "Whitepapers", desc: "In-depth, insightful whitepapers that demonstrate expertise and provide value." },
      { title: "Content Strategy", desc: "Plans aligned with your business objectives so every piece serves a clear purpose." },
    ],
    faqs: [
      { q: "Do I really need content if I already run ads?", a: "Yes. Ads bring attention, but content builds trust, explains your value, and keeps your brand relevant even when ads are off." },
      { q: "How often should I post content?", a: "There is no fixed rule. The right frequency depends on your audience, platform, and strategy, consistency matters more than volume." },
      { q: "Can content really bring customers, or is it just for engagement?", a: "Good content does both. It builds awareness, nurtures interest, and guides people toward becoming customers over time." },
      { q: "What if I don't know what to write about?", a: "Our strategy team researches your audience, industry, and trends to create content that actually connects and performs." },
      { q: "Is content marketing a long-term investment?", a: "Yes. Content keeps working for your brand over time, building authority, visibility, and trust long after it is published." },
    ],
  },
  {
    slug: "video-multimedia",
    title: "Video & Multimedia",
    tagline: "Visuals that move, engage & stay.",
    intro:
      "Video and visual content are the most powerful ways to capture attention and communicate your brand message today. We create high-impact visuals that not only look premium but also connect emotionally and drive engagement.",
    importance: [
      "Every visual shot by humans will always attract humans.",
      "Holds attention in a world where everything moves too fast.",
      "Translates ideas into emotions people instantly connect with.",
      "Gives your message a visual memory people don't forget.",
      "Turns simple stories into experiences that stay with your audience.",
    ],
    offerings: [
      { title: "Video Production", desc: "High-quality brand videos that clearly communicate your message and create visual impact." },
      { title: "Motion Graphics", desc: "Engaging motion graphics that simplify complex ideas and make content memorable." },
      { title: "Explainer Videos", desc: "Clear, compelling explainers that help your audience understand your product easily." },
      { title: "Reels & Shorts", desc: "Fast-paced, attention-grabbing short-form videos designed to increase reach." },
      { title: "Podcast Production", desc: "Professional podcast content that builds authority and strengthens your brand voice." },
      { title: "Product Photography", desc: "High-quality product images that highlight detail and boost conversions." },
      { title: "Corporate Photography", desc: "Professional corporate visuals that enhance your brand image and communication." },
    ],
    faqs: [
      { q: "Do I really need video content for my business?", a: "Yes. Video helps people understand your brand faster and connect with it more deeply than any other format." },
      { q: "What kind of videos work best for brands?", a: "It depends on your goal: reels for reach, explainer clips for clarity, and brand videos for identity and trust." },
      { q: "I don't have ideas for videos, can you still help?", a: "Absolutely. We handle concept creation, scripting, and execution so your brand always has fresh and relevant ideas." },
      { q: "Will videos actually bring business or just views?", a: "When done strategically, videos can drive engagement, enquiries, leads, and conversions, not just views." },
      { q: "Do I need professional equipment to get started?", a: "Not always. Great storytelling, editing, and strategy matter more than just expensive equipment." },
    ],
  },
  {
    slug: "business-growth",
    title: "Business Growth Strategy",
    tagline: "Build smarter systems that drive real growth.",
    intro:
      "Business growth is not just about getting more customers, it's about building the right systems, strategies, and insights that help your brand scale consistently and sustainably. We focus on understanding your market, refining your journey, and optimizing every stage of growth.",
    importance: [
      "Brings clarity to how your business actually grows, not just how it operates.",
      "Helps you move with direction instead of reacting to the market.",
      "Uncovers gaps and opportunities you might not notice internally.",
      "Aligns marketing, sales, and customer experience into one flow.",
      "Builds a foundation for growth that is steady, not dependent on chance.",
    ],
    offerings: [
      { title: "Sales Funnel Creation", desc: "Structured funnels that guide your audience smoothly from awareness to conversion." },
      { title: "Marketing Strategy", desc: "Clear, actionable strategies aligned with your business goals and market positioning." },
      { title: "Customer Journey Mapping", desc: "Analyze and map the customer experience to improve engagement and conversions." },
      { title: "Market Research", desc: "Study your industry, audience, and trends to uncover real opportunities for growth." },
      { title: "Competitor Analysis", desc: "Evaluate competitors to identify gaps, strengths, and winning strategies for your brand." },
      { title: "Growth Consulting", desc: "Expert insights and direction to help you scale your business with clarity and confidence." },
    ],
    faqs: [
      { q: "Is business growth strategy only for big companies?", a: "No. Even small and growing businesses benefit the most, because it helps them scale in the right direction from the start." },
      { q: "What exactly will you improve in my business?", a: "We look at your entire journey: marketing, sales, customer flow, and positioning, to find what is holding growth back and fix it." },
      { q: "Do I need a strategy if my business is already getting customers?", a: "Yes. A strategy helps you grow consistently instead of relying on random spikes or unpredictable results." },
      { q: "How is this different from marketing services?", a: "Marketing brings attention, but business strategy ensures that attention turns into structured, long-term growth." },
      { q: "Can this help me increase revenue directly?", a: "Yes. By improving funnels, targeting, and customer experience, we focus on turning existing efforts into better revenue outcomes." },
    ],
  },
  {
    slug: "local-business",
    title: "Local Business Marketing",
    tagline: "Make every local search lead to you.",
    intro:
      "Local marketing is about being visible where it matters most, in your city, your neighbourhood, and your search results. We help businesses strengthen their local presence, build trust, and attract more walk-ins and enquiries through strategic local optimization.",
    importance: [
      "Puts your business in front of people actively searching nearby.",
      "Builds instant trust through visibility, reviews, and consistent presence.",
      "Helps your brand become a familiar name in your local market.",
      "Drives real footfall, calls, and enquiries from high-intent customers.",
      "Ensures your business is the first choice when people search locally.",
    ],
    offerings: [
      { title: "Google Business Profile", desc: "Optimize your Google listing to improve visibility, search rankings, and engagement." },
      { title: "Review Management", desc: "Build, manage, and respond to reviews to strengthen trust and credibility." },
      { title: "Local Citations", desc: "Consistent listings across key directories to improve local SEO performance." },
      { title: "Local Advertising", desc: "Targeted ads focused on your local audience to drive more calls, visits, and enquiries." },
      { title: "Reputation Management", desc: "Monitor and enhance your online reputation to maintain a strong, positive brand image." },
    ],
    faqs: [
      { q: "Will my business show up on Google Maps automatically?", a: "Not always. It needs proper setup, optimization, and ongoing management to rank and appear in local searches." },
      { q: "Can local marketing work if I don't have a physical store?", a: "Yes. Even service-based businesses can target specific locations and attract local enquiries online." },
      { q: "How important are reviews for local growth?", a: "Very important. Reviews directly impact trust, visibility, and how often your business appears in local search results." },
      { q: "Do I need ads for local marketing to work?", a: "Not always. A strong Google Business Profile and local SEO can bring consistent organic enquiries on their own." },
      { q: "How do you decide which local areas to target?", a: "We study your business, competitors, and demand patterns to identify locations with the highest growth potential." },
    ],
  },
  {
    slug: "emerging",
    title: "Emerging Services",
    tagline: "Conquer the future with intelligent automation.",
    intro:
      "Emerging technologies are reshaping how brands connect, communicate, and convert. We help businesses stay ahead with AI-driven solutions, smarter analytics, and automated marketing systems that improve efficiency and decision-making.",
    importance: [
      "Stay ten steps ahead while others are still adapting.",
      "Grow with the future instead of catching up to it.",
      "Make everyday work simpler, faster, and more efficient.",
      "Improve how your brand connects with customers in real time.",
      "Get the advantage of adapting today, not tomorrow.",
    ],
    offerings: [
      { title: "AI Content Creation", desc: "Smart, high-quality content generated with AI tools while maintaining brand consistency and creativity." },
      { title: "AI Chatbots", desc: "Intelligent chatbots that improve customer interaction, response time, and lead handling." },
      { title: "AI Customer Support", desc: "AI-powered support systems providing faster, more efficient, 24/7 assistance." },
      { title: "Analytics Dashboards", desc: "Customized dashboards tracking performance, campaigns, and key marketing metrics in real time." },
      { title: "Data Visualization", desc: "Transform complex data into clear, actionable insights through effective visual reporting." },
      { title: "Automation Consulting", desc: "Automate repetitive marketing tasks to improve efficiency, save time, and scale faster." },
    ],
    faqs: [
      { q: "Do I really need AI or automation if my business is already running fine?", a: "Yes. These tools don't replace your system, they make it faster, smarter, and more efficient as you scale." },
      { q: "Is AI too complex for a small business to use?", a: "Not anymore. We simplify and integrate AI tools in a way that fits your business without technical hassle." },
      { q: "Will automation remove the human touch in my customer experience?", a: "No. We design systems that support your team, not replace human interaction where it matters most." },
      { q: "How quickly can I see benefits from automation?", a: "Many improvements like time savings, faster responses, and better tracking can be seen within a short period after setup." },
      { q: "Is this only for tech companies?", a: "Not at all. Any business that wants to save time, improve efficiency, and scale can benefit." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
