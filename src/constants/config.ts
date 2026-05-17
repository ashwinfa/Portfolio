type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  hero: {
    name: string;
    p: string[];
    roles: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    feedbacks: TSection;
    works: Required<TSection>;
    services: TSection;
  };
};

export const config: TConfig = {
  html: {
    title: "Ashwin | Web Developer",
    fullName: "Ashwin",
    email: "ashwin@gmail.com",
  },
  hero: {
    name: "Ashwin",
    p: ["I craft immersive digital", "experiences & web applications"],
    roles: ["Web Developer", "React Specialist", "UI Craftsman", "Full Stack Dev"],
  },
  contact: {
    p: "Get in touch",
    h2: "Contact.",
    form: {
      name: {
        span: "Your Name",
        placeholder: "What's your name?",
      },
      email: { span: "Your Email", placeholder: "What's your email?" },
      message: {
        span: "Your Message",
        placeholder: "What do you want to say?",
      },
    },
  },
  sections: {
    about: {
      p: "Introduction",
      h2: "Overview.",
      content: `I'm Ashwin, a passionate Web Developer with a strong focus on building beautiful, 
      performant, and interactive web experiences. I specialize in React.js, TypeScript, and 
      modern frontend technologies, with a keen eye for design and user experience. 
      I love turning complex ideas into elegant digital solutions — let's build something amazing together!`,
    },
    experience: {
      p: "What I have done so far",
      h2: "Work Experience.",
    },
    feedbacks: {
      p: "What others say",
      h2: "Testimonials.",
    },
    works: {
      p: "My work",
      h2: "Projects.",
      content: `Here are some of the projects I've built — each one crafted with attention to 
      detail, performance, and great user experience. From interactive UIs to full-stack apps, 
      these projects reflect my passion for building things that matter.`,
    },
    services: {
      p: "What I offer",
      h2: "Services.",
    },
  },
};
