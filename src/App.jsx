import { useEffect, useState } from 'react'

const navItems = ['About', 'Projects', 'Resume', 'Contact']

const projects = [
  {
    id: 'educrypt-platform',
    title: 'EduCrypt',
    tag: 'Full Stack + DevOps',
    summary:
      'A secure web platform deployed on AWS with a custom CI/CD pipeline, handling authentication, APIs, and production-grade server configuration.',
    features: [
      'End-to-end deployment using AWS EC2 with automated GitHub-based CI/CD pipeline.',
      'Dockerized Apache + PHP setup with custom virtual host configuration and permission handling.',
      'Secure authentication system with OTP APIs and proper CORS handling for frontend-backend communication.',
    ],
    stack: [
      'Laravel',
      'PHP',
      'MySQL',
      'Docker',
      'Apache',
      'AWS EC2',
      'GitHub Actions',
    ],
    notes:
      'This project centered on taking a PHP application from local development to a production-ready AWS setup. The main challenge was coordinating server permissions, Apache configuration, deployment flow, and authentication APIs in a way that stayed stable after repeated releases.',
    screenshotTiles: ['Login and OTP flow', 'Deployment pipeline', 'Admin dashboard'],
    screenLabel: 'Deployment & auth flow',
    palette: 'var(--gradient-orange)',
  },
  {
    id: 'react-portfolio-deploy',
    title: 'React Portfolio Deployment',
    tag: 'Frontend + Cloud',
    summary:
      'A production-ready React portfolio deployed on AWS EC2 with manual server setup, SSH access, and optimized static hosting.',
    features: [
      'Manual EC2 provisioning, SSH access, and Linux-based server configuration.',
      'Static build optimization and deployment with proper routing and port handling.',
      'Domain-ready setup with process management and scalability considerations.',
    ],
    stack: [
      'React',
      'Next.js',
      'AWS EC2',
      'Linux',
      'Nginx/Apache',
      'SSH',
    ],
    notes:
      'The focus here was delivery quality rather than only UI. I handled the deployment lifecycle end to end, including server provisioning, static asset serving, routing behavior, and the practical details needed to keep a frontend app reachable and maintainable on a live machine.',
    screenshotTiles: ['Hero landing view', 'Responsive sections', 'Production build output'],
    screenLabel: 'Live portfolio',
    palette: 'var(--gradient-pink)',
  },
  {
    id: 'devops-lab',
    title: 'DevOps & Networking Lab',
    tag: 'Infrastructure + Backend',
    summary:
      'A hands-on lab environment to explore AWS networking, database internals, and server-side architecture through real-world simulations.',
    features: [
      'Configured VPC, subnets, IGW, NAT, and route tables to simulate real cloud networking.',
      'Explored MySQL InnoDB internals including concurrency, transactions, and ACID behavior.',
      'Used AWS SSM for secure EC2 access without SSH and automated environment management.',
    ],
    stack: [
      'AWS (VPC, SSM, IAM)',
      'MySQL',
      'Linux',
      'Bash',
      'System Design',
    ],
    notes:
      'This lab was built as a practical environment for understanding infrastructure behavior instead of studying it only in theory. It combined network topology, secure machine access, and database behavior so system-level decisions could be tested under realistic constraints.',
    screenshotTiles: ['VPC layout', 'SSM access path', 'Database behavior notes'],
    screenLabel: 'Infra simulation',
    palette: 'var(--gradient-green)',
  },
  {
    id: 'auth-api-service',
    title: 'Authentication API Service',
    tag: 'Backend Engineering',
    summary:
      'A backend authentication service with OTP-based login, API security, and frontend integration handling real-world edge cases.',
    features: [
      'OTP-based authentication flow with API endpoints for secure login.',
      'Handled CORS issues and cross-origin communication between frontend and backend.',
      'Structured REST APIs with proper error handling and scalable design patterns.',
    ],
    stack: [
      'Node.js',
      'Express',
      'REST APIs',
      'CORS',
      'JWT/OTP',
    ],
    notes:
      'This service was shaped around real integration friction: OTP verification, frontend-backend communication, and predictable API responses. The goal was to keep the authentication flow secure while still being straightforward for client applications to consume.',
    screenshotTiles: ['OTP request screen', 'Token response panel', 'API health logs'],
    screenLabel: 'Auth flow',
    palette: 'var(--gradient-blue)',
  },
]

const skills = [
  // Core Backend
  'node.js',
  'php',
  'laravel',
  'javascript',

  // Frontend
  'React',
  'next.js',

  // DevOps & Cloud
  'AWS (EC2, S3, VPC, IAM)',
  'CI/CD pipelines',
  'Docker',

  // Web & APIs
  'REST APIs',
  'Apache/Nginx',
  'CORS handling',

  // Databases
  'mysql',
  'mongodb',
  'postgresql',

  // Version Control
  'Git',
  'GitHub workflows',
  'Branch protection & PR workflows',
]

const profilePhotoLink =
  'https://drive.google.com/file/d/1QCWvLTOCIqRTsH1CgaVCxAsFN6d822j6/view?usp=sharing' 

function getProfilePhotoSrc(url) {
  if (!url) {
    return ''
  }
  
  const driveFileMatch = url.match(/\/file\/d\/([^/]+)/)
  if (driveFileMatch?.[1]) {
    // Use proxy service to bypass CORS restrictions
    const driveUrl = `https://drive.google.com/uc?id=${driveFileMatch[1]}`
    return `https://images.weserv.nl/?url=${encodeURIComponent(driveUrl)}`
  }

  const driveIdMatch = url.match(/[?&]id=([^&]+)/)
  if (driveIdMatch?.[1]) {
    const driveUrl = `https://drive.google.com/uc?id=${driveIdMatch[1]}`
    return `https://images.weserv.nl/?url=${encodeURIComponent(driveUrl)}`
  }
  
  return url
}

function SkillIcon({ skill }) {
  const key = skill.toLowerCase()

  if (key === 'javascript') {
    return (
      <span className="skill-logo skill-logo-js" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <rect x="2.5" y="2.5" width="19" height="19" rx="4" />
          <text x="12" y="15.2">JS</text>
        </svg>
      </span>
    )
  }

  if (key === 'react') {
    return (
      <span className="skill-logo skill-logo-react" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="1.9" />
          <ellipse cx="12" cy="12" rx="8" ry="3.2" />
          <ellipse cx="12" cy="12" rx="8" ry="3.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="8" ry="3.2" transform="rotate(120 12 12)" />
        </svg>
      </span>
    )
  }

  if (key === 'next.js') {
    return (
      <span className="skill-logo skill-logo-next" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 16V8l8 8V8" />
        </svg>
      </span>
    )
  }

  if (key === 'node.js') {
    return (
      <span className="skill-logo skill-logo-node" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 2.8 19.1 6.9v8.2L12 19.2 4.9 15.1V6.9z" />
          <text x="12" y="14.5">N</text>
        </svg>
      </span>
    )
  }

  if (key === 'php') {
    return (
      <span className="skill-logo skill-logo-php" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <ellipse cx="12" cy="12" rx="9" ry="6.2" />
          <text x="12" y="14.2">PHP</text>
        </svg>
      </span>
    )
  }

  if (key === 'laravel') {
    return (
      <span className="skill-logo skill-logo-laravel" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M6 7.5 12 4l6 3.5v7L12 18l-6-3.5z" />
          <path d="M12 4v7l6 3.5M12 11 6 7.5M12 11v7" />
        </svg>
      </span>
    )
  }

  if (key === 'docker') {
    return (
      <span className="skill-logo skill-logo-docker" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <rect x="5" y="9" width="3" height="3" />
          <rect x="8.5" y="9" width="3" height="3" />
          <rect x="12" y="9" width="3" height="3" />
          <rect x="8.5" y="5.5" width="3" height="3" />
          <path d="M4 13.5h12.7c.7 2 2.1 3 4.3 3-1.2 1.9-3.1 2.7-5.7 2.7H9.4C6.7 19.2 4.8 17.4 4 13.5Z" />
        </svg>
      </span>
    )
  }

  if (key === 'mysql') {
    return (
      <span className="skill-logo skill-logo-db" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <ellipse cx="12" cy="6.5" rx="6.5" ry="2.7" />
          <path d="M5.5 6.5v8c0 1.5 2.9 2.7 6.5 2.7s6.5-1.2 6.5-2.7v-8" />
          <path d="M5.5 10.5c0 1.5 2.9 2.7 6.5 2.7s6.5-1.2 6.5-2.7" />
        </svg>
      </span>
    )
  }

  if (key === 'mongodb') {
    return (
      <span className="skill-logo skill-logo-mongo" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 4c2.2 2.6 3.3 5.2 3.3 7.8 0 3.7-1.7 6.3-3.3 8.2-1.6-1.9-3.3-4.5-3.3-8.2C8.7 9.2 9.8 6.6 12 4Z" />
          <path d="M12 6v11.5" />
        </svg>
      </span>
    )
  }

  if (key === 'postgresql') {
    return (
      <span className="skill-logo skill-logo-postgres" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 4c-3.4 0-5.8 2.5-5.8 5.9v4.2c0 1.2.9 2.1 2.1 2.1h1.3v2.6l2.4-1.5 2.4 1.5v-2.7h1.2c1.2 0 2.2-.9 2.2-2.1V9.9C17.8 6.5 15.4 4 12 4Z" />
          <circle cx="10" cy="10.5" r="0.8" />
          <circle cx="14" cy="10.5" r="0.8" />
        </svg>
      </span>
    )
  }

  if (key === 'git') {
    return (
      <span className="skill-logo skill-logo-git" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 3.5 20.5 12 12 20.5 3.5 12Z" />
          <circle cx="9" cy="9" r="1.2" />
          <circle cx="12" cy="12" r="1.2" />
          <circle cx="15" cy="15" r="1.2" />
          <path d="M9.8 9.8 11.2 11.2M12.8 12.8 14.2 14.2M12 10.8v1.9" />
        </svg>
      </span>
    )
  }

  const shortLabelMap = {
    'aws (ec2, s3, vpc, iam)': 'AWS',
    'ci/cd pipelines': 'CI',
    'rest apis': 'API',
    'apache/nginx': 'WEB',
    'cors handling': 'CORS',
    'github workflows': 'GH',
    'branch protection & pr workflows': 'PR',
  }

  return (
    <span className="skill-logo skill-logo-generic" aria-hidden="true">
      <span>{shortLabelMap[key] ?? skill.slice(0, 2).toUpperCase()}</span>
    </span>
  )
}

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const [cursorGlow, setCursorGlow] = useState({ x: 50, y: 50 })
  const [imageFailed, setImageFailed] = useState(false)
  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId,
  )
  const profilePhotoSrc = getProfilePhotoSrc(profilePhotoLink)

  useEffect(() => {
    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 100
      const y = (event.clientY / window.innerHeight) * 100
      setCursorGlow({ x, y })
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  useEffect(() => {
    if (!selectedProject) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  useEffect(() => {
    setImageFailed(false)
  }, [profilePhotoSrc])

  return (
    <div
      className="page-shell"
      style={{
        '--cursor-x': `${cursorGlow.x}%`,
        '--cursor-y': `${cursorGlow.y}%`,
      }}
    >
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />
      <div className="background-orb orb-three" />
      <div className="background-grid" />
      <div className="cursor-glow" />
      <div className="animated-wash" />

      <main className="portfolio">
        <section className="hero glass-panel" id="about">
          <nav className="top-nav" aria-label="Profile sections">
            {navItems.map((item) => (
              <a
                key={item}
                className="nav-pill"
                href={`#${item.toLowerCase()}`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="profile-card glass-card profile-card-expanded">
            <div className="profile-visual">
              <div className="profile-photo-ring">
                <div className="profile-photo">
                  {profilePhotoSrc && !imageFailed ? (
                    <img
                      src={profilePhotoSrc}
                      alt="Profile portrait"
                      className="profile-photo-image"
                      onError={() => setImageFailed(true)}
                    />
                  ) : (
                    <span>SY</span>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-content">
              <p className="eyebrow">Profile Summary</p>
              <h1>
                Designing and building scalable software with
                <span> clean architecture and thoughtful user experience.</span>
              </h1>
              <span className="profile-badge">Available*</span>
              <h2>Software Engineer</h2>
              <p className="hero-summary">
                Focused on building robust, maintainable systems and performant applications.
                I work across frontend and backend, crafting reliable APIs, scalable
                architectures, and intuitive interfaces. My approach combines clean code,
                efficient problem-solving, and user-centered thinking to deliver products
                that are fast, dependable, and easy to evolve.
              </p>
              <div className="hero-actions">
                <a className="glass-button primary-button" href="#projects">
                  Projects
                </a>
                <a className="glass-button" href="#contact">
                  Contact Me
                </a>
              </div>

              <div className="stat-row">
                <div>
                  <strong>1+</strong>
                  <span>Years building</span>
                </div>
                <div>
                  <strong>12</strong>
                  <span>Selected projects</span>
                </div>
                <div>
                  <strong>Global</strong>
                  <span>Remote collaboration</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading">
            <p className="eyebrow">Highlighted Work</p>
            <h2>Building products that go beyond solutions and create meaningful user experiences.</h2>
          </div>

          <div className="project-list">
            {projects.map((project) => {
              return (
                <article
                  key={project.id}
                  className="project-card glass-panel"
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  <div className="project-header">
                    <div>
                      <p className="project-tag">{project.tag}</p>
                      <h3>{project.title}</h3>
                    </div>
                    <button
                      type="button"
                      className="glass-button expand-button"
                      onClick={() => setSelectedProjectId(project.id)}
                    >
                      View More
                    </button>
                  </div>

                  <div className="project-body">
                    <div className="project-timeline">
                      <p className="project-summary">{project.summary}</p>

                      <ul className="feature-list">
                        {project.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>

                      <div className="stack-row">
                        {project.stack.map((item) => (
                          <span key={item} className="stack-pill">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="project-preview">
                      <div
                        className="screen-shot"
                        style={{ '--project-gradient': project.palette }}
                      >
                        <div className="shot-topbar">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="shot-content">
                          <div className="shot-graph" />
                          <div className="shot-lines">
                            <span />
                            <span />
                            <span />
                          </div>
                        </div>
                        <p>{project.screenLabel}</p>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="skills-section glass-panel" id="skills">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>Programming languages, frameworks, and product skills.</h2>
          </div>

          <div className="skills-grid">
            {skills.map((skill) => (
              <button key={skill} type="button" className="skill-chip">
                <SkillIcon skill={skill} />
                <span>{skill}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="resume-section glass-panel" id="resume">
          <div className="section-heading">
            <p className="eyebrow">Resume</p>
            <h2>Experience, education, and core strengths at a glance.</h2>
          </div>

          <div className="resume-grid">
            <div className="resume-card">
              <span className="resume-label">Experience</span>
              <h3>Software Engineer</h3>
              <p>
                Building full-stack applications with a focus on backend systems,
                deployment workflows, API integration, and practical cloud infrastructure.
              </p>
              <ul className="resume-points">
                <li>Production deployments on AWS EC2 with Linux server configuration.</li>
                <li>Backend work across PHP, Laravel, Node.js, REST APIs, and auth systems.</li>
                <li>Frontend delivery with React and Next.js for responsive, deployable apps.</li>
              </ul>
            </div>

            <div className="resume-card">
              <span className="resume-label">Education</span>
              <h3>Engineering & Self-Directed Systems Learning</h3>
              <p>
                Strengthening software fundamentals through hands-on project work,
                cloud labs, database internals, and production debugging experience.
              </p>
              <ul className="resume-points">
                <li>System design basics, cloud networking, and secure access workflows.</li>
                <li>Database concepts including transactions, concurrency, and ACID behavior.</li>
                <li>Deployment-focused learning across Docker, CI/CD, and web servers.</li>
              </ul>
            </div>

            <div className="resume-card">
              <span className="resume-label">Quick Snapshot</span>
              <h3>What I Work On</h3>
              <p>
                I prefer projects where clean architecture, reliable deployment,
                and strong product thinking matter as much as shipping features.
              </p>
              <div className="resume-tags">
                <span className="stack-pill">Backend APIs</span>
                <span className="stack-pill">Cloud Deployments</span>
                <span className="stack-pill">Authentication</span>
                <span className="stack-pill">React Frontends</span>
                <span className="stack-pill">DevOps Basics</span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section glass-panel" id="contact">
          <div className="section-heading">
            <p className="eyebrow">Contact Us</p>
            <h2>Let’s build something clear, fast, and visually sharp.</h2>
          </div>

          <div className="contact-grid">
            <a className="contact-card" href="mailto:hello@portfolio.dev">
              <span>Email</span>
              <strong>ysachin0438@gmail.com</strong>
            </a>
            <a className="contact-card" href="https://github.com" target="_blank" rel="noreferrer">
              <span>GitHub</span>
              <strong>github.com/ysachin438</strong>
            </a>
            <a className="contact-card" href="https://linkedin.com" target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <strong>linkedin.com/in/ysachin438</strong>
            </a>
            <a className="contact-card" href="https://x.com" target="_blank" rel="noreferrer">
              <span>X</span>
              <strong>x.com/ysachin438</strong>
            </a>
          </div>
        </section>
        <p className="page-credit">created by - ysachin438 ❤️</p>
      </main>

      {selectedProject ? (
        <div
          className="project-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-overlay-title"
          onClick={() => setSelectedProjectId(null)}
        >
          <div
            className="project-overlay-panel glass-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="project-overlay-header">
              <div>
                <p className="project-tag">{selectedProject.tag}</p>
                <h2 id="project-overlay-title">{selectedProject.title}</h2>
              </div>
              <button
                type="button"
                className="glass-button close-button"
                onClick={() => setSelectedProjectId(null)}
              >
                Close
              </button>
            </div>

            <div className="project-overlay-content">
              <div className="project-overlay-copy">
                <p className="project-summary">{selectedProject.summary}</p>

                <div className="project-detail-block">
                  <h3>Highlights</h3>
                  <ul className="feature-list">
                    {selectedProject.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-detail-block">
                  <h3>Tech Stack</h3>
                  <div className="stack-row">
                    {selectedProject.stack.map((item) => (
                      <span key={item} className="stack-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-detail-block">
                  <h3>Project Notes</h3>
                  <p className="project-summary">
                    {selectedProject.notes}
                  </p>
                </div>
              </div>

              <div className="project-overlay-preview">
                <div className="project-shot-stack">
                  {selectedProject.screenshotTiles.map((tile) => (
                    <div
                      key={tile}
                      className="screen-shot project-shot-tile"
                      style={{ '--project-gradient': selectedProject.palette }}
                    >
                      <div className="shot-topbar">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="shot-content">
                        <div className="shot-graph" />
                        <div className="shot-lines">
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                      <p>{tile}</p>
                    </div>
                  ))}
                  <div
                    className="screen-shot project-shot-tile project-shot-tile-featured"
                    style={{ '--project-gradient': selectedProject.palette }}
                  >
                    <div className="shot-topbar">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="shot-content">
                      <div className="shot-graph" />
                      <div className="shot-lines">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                    <p>{selectedProject.screenLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
