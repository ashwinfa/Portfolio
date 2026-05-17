import type {
  TNavLink,
  TService,
  TTechnology,
  TExperience,
  TTestimonial,
  TProject,
} from "../types";

import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks: TNavLink[] = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "/about",
    title: "About",
  },
  {
    id: "/work",
    title: "Work",
  },
  {
    id: "/contact",
    title: "Contact",
  },
];

const services: TService[] = [
  {
    title: "UI / UX Development",
    icon: web,
  },
  {
    title: "React Development",
    icon: mobile,
  },
  {
    title: "Full Stack Development",
    icon: backend,
  },
  {
    title: "Performance Optimization",
    icon: creator,
  },
];

const technologies: TTechnology[] = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences: TExperience[] = [
  {
    title: "Frontend Developer Intern",
    companyName: "Tech Startup",
    icon: web,
    iconBg: "#1d1836",
    date: "Jan 2023 - Jun 2023",
    points: [
      "Built responsive React.js UIs from Figma designs with pixel-perfect accuracy.",
      "Implemented reusable component libraries reducing development time by 30%.",
      "Collaborated with designers to deliver seamless user experiences.",
      "Integrated REST APIs and managed state using Redux Toolkit.",
    ],
  },
  {
    title: "React Developer",
    companyName: "Freelance",
    icon: reactjs,
    iconBg: "#1a1a2e",
    date: "Jul 2023 - Dec 2023",
    points: [
      "Delivered 5+ client websites with modern React 18 and Next.js.",
      "Built 3D interactive experiences using Three.js and React Three Fiber.",
      "Optimized Core Web Vitals achieving 90+ Lighthouse scores across projects.",
      "Implemented email automation and contact forms using EmailJS.",
    ],
  },
  {
    title: "Full Stack Web Developer",
    companyName: "Personal Projects",
    icon: nodejs,
    iconBg: "#0f0c29",
    date: "Jan 2024 - Present",
    points: [
      "Developing full-stack applications using React, Node.js, and MongoDB.",
      "Creating premium portfolio websites and landing pages with 3D animations.",
      "Building RESTful APIs and integrating third-party services.",
      "Mentoring junior developers and contributing to open source projects.",
    ],
  },
];

const testimonials: TTestimonial[] = [
  {
    testimonial:
      "Ashwin built our landing page in record time. The animations and 3D effects blew our minds!",
    name: "Priya Sharma",
    designation: "CEO",
    company: "StartupXYZ",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "Working with Ashwin was a fantastic experience. He truly cares about delivering quality work.",
    name: "Rahul Mehta",
    designation: "CTO",
    company: "DevCorp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Ashwin optimized our website, our traffic doubled. Highly recommend him!",
    name: "Ananya Singh",
    designation: "Marketing Head",
    company: "GrowthLabs",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects: TProject[] = [
  {
    name: "3D Portfolio",
    description:
      "A cinematic, interactive 3D portfolio built with React 18, Three.js and Framer Motion. Features immersive animations, glassmorphism UI, and a full-page multi-route experience.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "threejs",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    sourceCodeLink: "https://github.com/",
  },
  {
    name: "Task Canvas",
    description:
      "A full-stack task management app with a drag-and-drop Kanban board, cloud image storage via Cloudinary, and PostgreSQL persistence. Deployed on Render.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "postgresql",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    sourceCodeLink: "https://github.com/",
  },
  {
    name: "E-Commerce Platform",
    description:
      "A high-performance e-commerce storefront with custom Shopify sections, animated product carousels, and a responsive checkout flow optimized for conversions.",
    tags: [
      {
        name: "shopify",
        color: "blue-text-gradient",
      },
      {
        name: "liquid",
        color: "green-text-gradient",
      },
      {
        name: "javascript",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    sourceCodeLink: "https://github.com/",
  },
];

export const stats = [
  { value: 15, suffix: "+", label: "Projects Completed" },
  { value: 10, suffix: "+", label: "Technologies Mastered" },
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/", icon: "linkedin" },
  { name: "Twitter", url: "https://twitter.com/", icon: "twitter" },
];

export { services, technologies, experiences, testimonials, projects };
