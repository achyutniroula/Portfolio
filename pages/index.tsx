import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { FaGraduationCap, FaCode, FaServer } from 'react-icons/fa';
import { getMockBlogPosts, getMockPersonalInfo, BlogPost, PersonalInfo } from '../lib/wordpress';
import styles from '../styles/Home.module.css';

interface HomeProps {
  blogPosts: BlogPost[];
  personalInfo: PersonalInfo;
}

export default function Home({ blogPosts, personalInfo }: HomeProps) {
  return (
    <>
      <Head>
        <title>Achyut - Portfolio</title>
        <meta name="description" content="Personal portfolio of Achyut - Computer Science Student" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Layout personalInfo={personalInfo}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                Hello, I'm <span className={styles.highlight}>Achyut</span>
              </h1>
              <p className={styles.heroSubtitle}>{personalInfo.bio}</p>
              <div className={styles.heroCta}>
                <Link href="/projects" className={styles.primaryBtn}>
                  View Projects
                </Link>
                <Link href="/resume" className={styles.secondaryBtn}>
                  Download Resume
                </Link>
              </div>
            </div>
            <div className={styles.heroImage}>
              <div className={styles.imageWrapper}>
                <img
                  src="/portrait.jpg"
                  alt="Achyut Niroula"
                  className={styles.portraitImage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cover Image Section */}
        <section className={styles.cover}>
          <div className="container">
            <div className={styles.coverWrapper}>
              <img
                src="/presentation.jpg"
                alt="Achyut Niroula presenting"
                className={styles.coverImage}
              />
            </div>
          </div>
        </section>

        {/* About Highlights */}
        <section className={styles.highlights}>
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div className={styles.highlightGrid}>
              <div className={styles.highlightCard}>
                <div className={styles.highlightIcon}><FaGraduationCap /></div>
                <h3>Education</h3>
                <p>B.Sc. Honours Specialization in Computer Science (Nipissing University)</p>
              </div>
              <div className={styles.highlightCard}>
                <div className={styles.highlightIcon}><FaCode /></div>
                <h3>Specialization</h3>
                <p>Cloud & Backend Engineering, Full Stack Development</p>
              </div>
              <a
                href="/capstone"
                className={`${styles.highlightCard} ${styles.capstoneCard}`}
              >
                <div className={styles.highlightIcon}><FaServer /></div>
                <h3>Capstone Project</h3>
                <p>A Cloud-Native Multimodal Video Understanding Platform Using Deep Learning and Large Vision Models</p>
              </a>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Use mock data for now, replace with actual WordPress API calls
  const blogPosts = getMockBlogPosts();
  const personalInfo = getMockPersonalInfo();

  return {
    props: {
      blogPosts,
      personalInfo,
    },
  };
};
