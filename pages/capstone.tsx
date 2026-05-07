import { GetStaticProps } from 'next';
import Head from 'next/head';
import path from 'path';
import Layout from '../components/Layout';
import { getMockPersonalInfo, PersonalInfo } from '../lib/wordpress';
import styles from '../styles/Capstone.module.css';

interface CapstoneProps {
  html: string;
  personalInfo: PersonalInfo;
}

export default function Capstone({ html, personalInfo }: CapstoneProps) {
  return (
    <>
      <Head>
        <title>Capstone Project - Achyut</title>
        <meta name="description" content="A Cloud-Native Multimodal Video Understanding Platform — Achyut Niroula, COSC 4896" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Layout personalInfo={personalInfo}>
        <section className={styles.capstoneSection}>
          <div className={styles.paper}>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const mammoth = await import('mammoth');
  const docPath = path.join(process.cwd(), 'public', 'COSC4896_VideoUnderstanding_Niroula.docx');
  const result = await mammoth.convertToHtml({ path: docPath });

  return {
    props: {
      html: result.value,
      personalInfo: getMockPersonalInfo(),
    },
  };
};
