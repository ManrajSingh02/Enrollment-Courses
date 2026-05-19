const sampleCourses = [
    {
  title: "DevOps Fundamentals",
  description:
    "Learn CI/CD pipelines, Docker, Kubernetes, and deployment automation.",
  category: "DevOps",
  difficulty: "Intermediate",
  price: 150,
  duration: "8 Weeks",
  instructor: "Ryan Cooper",
  image:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
  availability: true,
  createdAt: new Date(),
},

{
  title: "AWS Cloud Practitioner",
  description:
    "Understand AWS core services, cloud architecture, and deployment basics.",
  category: "Cloud Computing",
  difficulty: "Beginner",
  price: 125,
  duration: "7 Weeks",
  instructor: "Kevin Scott",
  image:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  availability: true,
  createdAt: new Date(),
},

{
  title: "TypeScript Complete Course",
  description:
    "Master TypeScript for scalable frontend and backend development.",
  category: "Programming",
  difficulty: "Intermediate",
  price: 105,
  duration: "6 Weeks",
  instructor: "Andrew Miller",
  image:
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  availability: true,
  createdAt: new Date(),
},

{
  title: "Next.js Full Stack Development",
  description:
    "Build SEO-friendly and scalable full stack applications using Next.js.",
  category: "Web Development",
  difficulty: "Advanced",
  price: 165,
  duration: "9 Weeks",
  instructor: "Jessica Parker",
  image:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  availability: true,
  createdAt: new Date(),
},

{
  title: "Android App Development",
  description:
    "Create Android applications using Java and Android Studio.",
  category: "Mobile Development",
  difficulty: "Beginner",
  price: 120,
  duration: "8 Weeks",
  instructor: "Nathan Green",
  image:
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
  availability: true,
  createdAt: new Date(),
},

{
  title: "Ethical Hacking Bootcamp",
  description:
    "Learn penetration testing, vulnerability scanning, and ethical hacking tools.",
  category: "Cybersecurity",
  difficulty: "Advanced",
  price: 190,
  duration: "10 Weeks",
  instructor: "Ethan Walker",
  image:
    "https://images.unsplash.com/photo-1510511459019-5dda7724fd87",
  availability: true,
  createdAt: new Date(),
},

{
  title: "Figma UI Design Course",
  description:
    "Design professional mobile and web interfaces using Figma.",
  category: "Design",
  difficulty: "Beginner",
  price: 85,
  duration: "5 Weeks",
  instructor: "Sophia Adams",
  image:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  availability: true,
  createdAt: new Date(),
},

{
  title: "C++ Programming Masterclass",
  description:
    "Learn object-oriented programming and DSA using C++.",
  category: "Programming",
  difficulty: "Intermediate",
  price: 95,
  duration: "7 Weeks",
  instructor: "Daniel Carter",
  image:
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  availability: true,
  createdAt: new Date(),
},

{
  title: "Blockchain Development",
  description:
    "Understand blockchain technology, smart contracts, and Web3 basics.",
  category: "Blockchain",
  difficulty: "Advanced",
  price: 210,
  duration: "11 Weeks",
  instructor: "Lucas Bennett",
  image:
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
  availability: true,
  createdAt: new Date(),
},

{
  title: "Excel for Data Analysis",
  description:
    "Analyze data efficiently using Excel formulas, charts, and dashboards.",
  category: "Data Analysis",
  difficulty: "Beginner",
  price: 60,
  duration: "4 Weeks",
  instructor: "Emily Roberts",
  image:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  availability: true,
  createdAt: new Date(),
},

{
  title: "PHP & Laravel Development",
  description:
    "Build secure and scalable web applications using Laravel framework.",
  category: "Backend Development",
  difficulty: "Intermediate",
  price: 135,
  duration: "8 Weeks",
  instructor: "Mark Wilson",
  image:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  availability: true,
  createdAt: new Date(),
},

{
  title: "Artificial Intelligence Advanced",
  description:
    "Explore neural networks, deep learning, and AI-powered applications.",
  category: "Artificial Intelligence",
  difficulty: "Advanced",
  price: 220,
  duration: "12 Weeks",
  instructor: "Sophia Clark",
  image:
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  availability: true,
  createdAt: new Date(),
},

{
  title: "Video Editing with Premiere Pro",
  description:
    "Learn professional video editing, transitions, and cinematic effects.",
  category: "Multimedia",
  difficulty: "Beginner",
  price: 90,
  duration: "5 Weeks",
  instructor: "Oliver Stone",
  image:
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d",
  availability: true,
  createdAt: new Date(),
},
{
    title: "React Native Mobile Apps",
    description:
      "Build cross-platform mobile apps using React Native and Expo.",
    category: "Mobile Development",
    difficulty: "Intermediate",
    price: 140,
    duration: "8 Weeks",
    instructor: "Michael Reed",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
    availability: true,
    createdAt: new Date(),
  },

  {
    title: "Machine Learning with Python",
    description:
      "Learn machine learning algorithms, model training, and prediction systems.",
    category: "Machine Learning",
    difficulty: "Advanced",
    price: 200,
    duration: "10 Weeks",
    instructor: "Emma Watson",
    image:
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a",
    availability: true,
    createdAt: new Date(),
  },

  {
    title: "Node.js API Development",
    description:
      "Create RESTful APIs with Express.js, MongoDB, and authentication.",
    category: "Backend Development",
    difficulty: "Intermediate",
    price: 130,
    duration: "7 Weeks",
    instructor: "Chris Evans",
    image:
      "https://images.unsplash.com/photo-1555066931-bf19f8fd1085",
    availability: true,
    createdAt: new Date(),
  },

  {
    title: "Cybersecurity Essentials",
    description:
      "Understand network security, malware analysis, and system protection.",
    category: "Cybersecurity",
    difficulty: "Beginner",
    price: 110,
    duration: "6 Weeks",
    instructor: "David Miller",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3",
    availability: true,
    createdAt: new Date(),
  },

  {
    title: "UI/UX Design Principles",
    description:
      "Learn wireframing, prototyping, and user-centered design concepts.",
    category: "Design",
    difficulty: "Beginner",
    price: 80,
    duration: "5 Weeks",
    instructor: "Isabella Moore",
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698",
    availability: true,
    createdAt: new Date(),
  },

  {
    title: "Data Structures & Algorithms",
    description:
      "Master DSA concepts for coding interviews and competitive programming.",
    category: "Programming",
    difficulty: "Advanced",
    price: 160,
    duration: "9 Weeks",
    instructor: "James Anderson",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    availability: true,
    createdAt: new Date(),
  },

  {
    title: "Flutter App Development",
    description:
      "Develop modern Android and iOS apps using Flutter and Dart.",
    category: "Mobile Development",
    difficulty: "Intermediate",
    price: 145,
    duration: "8 Weeks",
    instructor: "Charlotte White",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    availability: true,
    createdAt: new Date(),
  },

  {
    title: "MongoDB Database Mastery",
    description:
      "Learn schema design, aggregation, indexing, and database optimization.",
    category: "Database",
    difficulty: "Intermediate",
    price: 115,
    duration: "6 Weeks",
    instructor: "Benjamin Hall",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
    availability: true,
    createdAt: new Date(),
  },

  {
    title: "Google Cloud Platform Basics",
    description:
      "Explore GCP services, deployment, storage, and cloud architecture.",
    category: "Cloud Computing",
    difficulty: "Beginner",
    price: 125,
    duration: "7 Weeks",
    instructor: "Ava Johnson",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    availability: true,
    createdAt: new Date(),
  },

  {
    title: "Full Stack MERN Development",
    description:
      "Build scalable MERN applications with authentication and deployment.",
    category: "Web Development",
    difficulty: "Advanced",
    price: 230,
    duration: "12 Weeks",
    instructor: "William Brown",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    availability: true,
    createdAt: new Date(),
  },

  {
    title: "Python Automation Projects",
    description:
      "Automate repetitive tasks and build scripts using Python.",
    category: "Programming",
    difficulty: "Beginner",
    price: 95,
    duration: "5 Weeks",
    instructor: "Ethan Harris",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
    availability: true,
    createdAt: new Date(),
  },

  {
    title: "Digital Marketing Mastery",
    description:
      "Learn SEO, social media marketing, and online branding strategies.",
    category: "Marketing",
    difficulty: "Beginner",
    price: 75,
    duration: "4 Weeks",
    instructor: "Sophia Lewis",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    availability: true,
    createdAt: new Date(),
  },

  {
    title: "Docker & Kubernetes",
    description:
      "Containerize applications and manage deployments using Kubernetes.",
    category: "DevOps",
    difficulty: "Advanced",
    price: 185,
    duration: "9 Weeks",
    instructor: "Alexander King",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b",
    availability: true,
    createdAt: new Date(),
  },

  {
    title: "Java Spring Boot Development",
    description:
      "Build enterprise-grade backend applications using Spring Boot.",
    category: "Backend Development",
    difficulty: "Intermediate",
    price: 150,
    duration: "8 Weeks",
    instructor: "Matthew Scott",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    availability: true,
    createdAt: new Date(),
  },

  {
    title: "Graphic Design with Photoshop",
    description:
      "Create banners, posters, and social media graphics professionally.",
    category: "Design",
    difficulty: "Beginner",
    price: 70,
    duration: "4 Weeks",
    instructor: "Amelia Taylor",
    image:
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a",
    availability: true,
    createdAt: new Date(),
  }
];

export default sampleCourses;
