// src/pages/guide/[id].tsx

import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';
import { GUIDE_SECTIONS } from '@/data/guideData';
import styles from '@/styles/GuideSection.module.css';

const GuideSectionPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query as { id?: string };

  // Находим данные для нужного раздела по его id
  const sectionData = GUIDE_SECTIONS.find((section) => section.id === id);

  // Если данные еще не загрузились или не найдены, показываем заглушку
  if (!sectionData) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <Head>
        <title>{sectionData.title} | Гид по Дагестану | EasyGo</title>
        <meta
          name="description"
          content={`Лучшие места и занятия в категории '${sectionData.title}' в Дагестане.`}
        />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.mainTitle}>{sectionData.title}</h1>
        <p className={styles.mainDescription}>
          Все самое интересное из мира приключений, культуры, гастрономии и семейного
          отдыха в Дагестане.
        </p>

        <div className={styles.cardsGrid}>
          {sectionData.cards.map((card) => (
            <div key={card.id} className={styles.card}>
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <p className={styles.cardShortDescription}>{card.shortDescription}</p>
              <hr className={styles.cardDivider} />
              <p className={styles.cardFullDescription}>{card.fullDescription}</p>
              {card.keyLocations && (
                <div className={styles.cardLocations}>
                  <strong>Ключевые места:</strong> {card.keyLocations.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default GuideSectionPage;
