import { GetStaticProps } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import { FaDownload, FaGraduationCap, FaBriefcase, FaCode, FaAward, FaWrench } from 'react-icons/fa';
import { getMockPersonalInfo, PersonalInfo } from '../lib/wordpress';
import styles from '../styles/Resume.module.css';

interface ResumeProps {
  personalInfo: PersonalInfo;
}

export default function Resume({ personalInfo }: ResumeProps) {
  return (
    <>
      <Head>
        <title>Resume - Achyut</title>
        <meta name="description" content="Resume and CV of Achyut" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Layout personalInfo={personalInfo}>
        <section className={styles.resumeSection}>
          <div className="container">
            <div className={styles.header}>
              <h1 className="section-title">Resume</h1>
              <a 
                href={personalInfo.resume_url}
                download
                className={styles.downloadBtn}
              >
                <FaDownload /> Download PDF
              </a>
            </div>

            {/* Education Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaGraduationCap className={styles.icon} />
                <h2>Education</h2>
              </div>
              <div className={styles.content}>
                <div className={styles.item}>
                  <h3>Bachelor of Science: Honours Specialization in Computer Science</h3>
                  <p className={styles.institution}>Nipissing University</p>
                  <p className={styles.date}>Expected Graduation: 2026</p>
                </div>
              </div>
            </div>

            {/* Technical Skills Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaCode className={styles.icon} />
                <h2>Technical Skills</h2>
              </div>
              <div className={styles.content}>
                <div className={styles.skillsGrid}>
                  <div className={styles.skillCategory}>
                    <h3>Languages</h3>
                    <div className={styles.skillTags}>
                      <span>Python</span>
                      <span>Java</span>
                      <span>JavaScript</span>
                      <span>TypeScript</span>
                      <span>C/C++</span>
                      <span>SQL</span>
                    </div>
                  </div>
                  <div className={styles.skillCategory}>
                    <h3>Frameworks & Libraries</h3>
                    <div className={styles.skillTags}>
                      <span>React</span>
                      <span>Spring Boot</span>
                      <span>Next.js</span>
                      <span>Flask</span>
                      <span>FastAPI</span>
                      <span>Node.js</span>
                      <span>REST APIs</span>
                      <span>TensorFlow</span>
                      <span>PyTorch</span>
                      <span>Chart.js</span>
                    </div>
                  </div>
                  <div className={styles.skillCategory}>
                    <h3>Cloud & DevOps</h3>
                    <div className={styles.skillTags}>
                      <span>Google Cloud Platform</span>
                      <span>AWS</span>
                      <span>Docker</span>
                      <span>Git</span>
                      <span>Maven</span>
                      <span>Supabase</span>
                      <span>Redis</span>
                    </div>
                  </div>
                  <div className={styles.skillCategory}>
                    <h3>Specializations</h3>
                    <div className={styles.skillTags}>
                      <span>Cloud & Backend Engineering</span>
                      <span>Distributed Systems</span>
                      <span>AI/ML Integration</span>
                      <span>Machine Learning</span>
                      <span>Full-Stack Web Development</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaWrench className={styles.icon} />
                <h2>Key Projects</h2>
              </div>
              <div className={styles.content}>
                <div className={styles.item}>
                  <h3>LearnOne — AI-Powered Personal Educator</h3>
                  <p className={styles.date}>2025–2026</p>
                  <ul className={styles.details}>
                    <li>Java 21 · Spring Boot 3 · React · TypeScript · PostgreSQL · Redis · Claude API · pgvector · Cohere</li>
                    <li>Built a full-stack Jarvis-style AI tutor with curriculum generation, persistent memory, and a 6-tab learning panel (plan, memory, knowledge graph, quiz, progress, spaced repetition)</li>
                    <li>Implemented SM-2 spaced repetition algorithm, pgvector semantic embeddings via Cohere, and Claude-extracted concept knowledge graph with EMA-smoothed confidence scoring</li>
                    <li>Integrated Judge0 code execution sandbox, KaTeX math rendering, and Mermaid diagram generation triggered by visual-intent keyword detection in the chat engine</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>Multimodal Video Understanding Platform</h3>
                  <p className={styles.date}>2026</p>
                  <ul className={styles.details}>
                    <li>Python · FastAPI · React · AWS (S3, SQS, EC2, DynamoDB) · Docker · Whisper · Qwen2-VL</li>
                    <li>Architected a cloud-native video analytics pipeline on AWS integrating 8+ neural models — SigLIP, DepthAnything V2, Mask2Former, SlowFast, ByteTrack, Whisper, and Qwen2-VL — fusing vision, depth, motion, and audio signals into a unified per-frame scene representation</li>
                    <li>Engineered an event-driven inference worker (S3 → SQS → EC2 GPU) with a FastAPI + WebSocket backend, delivering real-time bounding box overlays and per-frame confidence scores synced to interactive video playback</li>
                    <li>Integrated Claude API for narrative generation, assembling timestamped, multi-frame coherent scene summaries from track-based groupings, action timelines, and audio transcriptions via structured prompt engineering</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>Cloud Inventory — Landscaping Inventory System</h3>
                  <p className={styles.date}>2024</p>
                  <ul className={styles.details}>
                    <li>Flask · Python · Firebase (Auth + Realtime DB) · Google Cloud Run · Cloudinary · Chart.js · Docker</li>
                    <li>Built a full-stack, cloud-hosted inventory management app for landscaping businesses with real-time data sync and role-based access control (Admin / Editor / Viewer)</li>
                    <li>Implemented secure authentication using Firebase Auth (email/password), HTTP-only sessions, and automatic session restoration</li>
                    <li>Deployed a serverless container on Google Cloud Run backed by Firebase Realtime Database; automated with Docker and Cloud Build for reproducible releases</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>Cloud-Chat — Real-Time Chat Portal</h3>
                  <p className={styles.date}>2025</p>
                  <ul className={styles.details}>
                    <li>Java · Firebase · WebSocket · Maven</li>
                    <li>Architected a distributed real-time messaging platform on Firebase Realtime Database, leveraging automatic multi-region replication and an eventual consistency model (AP — CAP theorem) for high availability and fault tolerance</li>
                    <li>Implemented WebSocket-based synchronization with event-driven listeners and role-based access control, enabling non-blocking async message delivery across geographically distributed clients</li>
                    <li>Designed a hierarchical NoSQL schema with timestamp-based ordering and last-write-wins conflict resolution to handle concurrent writes across distributed nodes</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>JobHunt AI — Intelligent Job Application Assistant</h3>
                  <p className={styles.date}>2025</p>
                  <ul className={styles.details}>
                    <li>JavaScript · HTML · CSS · AI/LLM Integration</li>
                    <li>Built an AI-powered job search assistant that analyzes uploaded resumes and scores job postings for compatibility, surfacing best-fit roles with a ranked match score</li>
                    <li>Integrated LLM-powered content generation to produce tailored cover letters and optimized application materials for each role automatically</li>
                  </ul>
                </div>
                <div className={styles.item}>
                  <h3>rlget — CLI File Downloader</h3>
                  <p className={styles.date}>2026</p>
                  <ul className={styles.details}>
                    <li>Python · Concurrency · Rate Limiting · Retry Logic · CLI</li>
                    <li>Built a command-line download manager with parallel workers via ThreadPoolExecutor, supporting multiple URLs downloaded simultaneously</li>
                    <li>Implemented a token bucket rate limiter and exponential backoff with jitter to handle server throttling and avoid thundering herd failures</li>
                    <li>Designed safe file naming with no-clobber deduplication and Content-Disposition parsing for production-ready output handling</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaBriefcase className={styles.icon} />
                <h2>Experience</h2>
              </div>
              <div className={styles.item}>
                  <h3>Research Assistant - Nipissing University, North Bay, ON</h3>
                  <p className={styles.date}>2023, 2024, 2025 (May - August)</p>
                  <ul className={styles.details}>
                    <li>Designed and delivered a custom faculty website for a university domain, implementing a responsive, production-ready frontend to present academic CVs, publications, and teaching materials</li>
                    <li>Built and customized modular page layouts and UI components using HTML, CSS, and JavaScript, focusing on usability, accessibility, and clean content organization</li>
                    <li>Collaborated directly with a faculty member to gather requirements, iterate on design, and maintain content within a database-backed content management system</li>
                  </ul>
                </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const personalInfo = getMockPersonalInfo();

  return {
    props: {
      personalInfo,
    },
  };
};
