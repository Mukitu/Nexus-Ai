import React from 'react';
import {
  User,
  Mail,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Award,
  Briefcase,
  Code,
  GraduationCap,
  Star,
  ExternalLink,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/ui/PageHeader';

const skills = [
  { name: 'React.js', level: 95 },
  { name: 'Node.js', level: 90 },
  { name: 'TypeScript', level: 88 },
  { name: 'MongoDB', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'AI/ML Integration', level: 85 },
  { name: 'Cloud Architecture', level: 82 },
  { name: 'UI/UX Design', level: 78 },
];

const achievements = [
  { icon: Award, title: '580+ Clients Served', description: 'Successfully delivered projects worldwide' },
  { icon: Star, title: 'Top Rated Developer', description: '5-star rating on multiple platforms' },
  { icon: Briefcase, title: 'AI SaaS Specialist', description: 'Expert in AI-driven solutions' },
  { icon: Code, title: 'Open Source Contributor', description: 'Active in the developer community' },
];

const projects = [
  {
    title: 'AI-Powered Analytics Platform',
    description: 'Enterprise analytics with real-time AI insights',
    tech: ['React', 'Node.js', 'TensorFlow', 'AWS'],
  },
  {
    title: 'E-Commerce Automation Suite',
    description: 'Automated inventory and order management system',
    tech: ['Next.js', 'GraphQL', 'PostgreSQL', 'Stripe'],
  },
  {
    title: 'Healthcare Management System',
    description: 'HIPAA-compliant patient management platform',
    tech: ['React', 'Express', 'MongoDB', 'Docker'],
  },
];

export default function Profile() {
  return (
    <DashboardLayout>
      <div className="animate-fade-in max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="glass-card-elevated p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image */}
            <<div className="relative shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-primary to-primary-glow p-1">
                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center overflow-hidden">
           <img
        src="mypic.jpeg"
        alt="Profile"
        className="w-full h-full object-cover rounded-xl"
            />
          </div>
          </div>
              <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-success text-success-foreground text-xs font-medium">
        Available
        </div>
    </div>


            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Mukitu Islam Nishat</h1>
              <p className="text-lg text-primary font-medium mb-4">
                Full Stack MERN Developer | AI & SaaS Architect | Tech Innovator
              </p>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                I'm a CSE student and professional Full Stack MERN Developer specializing in AI-driven SaaS solutions. 
                I design and build scalable, high-performance, and user-centric web applications that turn ideas into 
                impactful digital products. With experience serving over 580 clients, I focus on clean, maintainable code, 
                innovative problem-solving, and delivering solutions that combine practicality with cutting-edge technology.
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">contact@mukitu.dev</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Bangladesh</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">mukitu.dev</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                <a href="#" className="btn-secondary p-2.5" title="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="btn-secondary p-2.5" title="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="btn-secondary p-2.5" title="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills Section */}
          <div className="lg:col-span-2">
            <h2 className="section-title mb-4">Skills & Expertise</h2>
            <div className="glass-card p-6">
              <div className="grid gap-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          background: 'var(--gradient-primary)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div>
            <h2 className="section-title mb-4">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.title}
                  className="glass-card p-4 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                      <achievement.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mt-8">
          <h2 className="section-title mb-4">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="glass-card p-6 hover:shadow-glow transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                    <Code className="w-5 h-5 text-primary" />
                  </div>
                  <button className="btn-ghost p-2">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="badge-primary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-8">
          <h2 className="section-title mb-4">Education</h2>
          <div className="glass-card p-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Bachelor of Science in Computer Science & Engineering</h3>
                <p className="text-muted-foreground">Currently Pursuing</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Specializing in Software Engineering, AI/ML, and Cloud Computing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
