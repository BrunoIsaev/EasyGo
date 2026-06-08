import { useState } from 'react';
import Head from 'next/head';
import { GUIDE_SECTIONS, Section } from '@/data/guideData';
import styles from '@/styles/GuidePage.module.css'; // Будем использовать новый файл стилей

const GuidePage = () => {
  // Состояние для хранения ID выбранного раздела. null - ничего не выбрано.
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  // Находим данные выбранного раздела
  const selectedSectionData = GUIDE_SECTIONS.find(
    (section) => section.id === selectedSectionId
  );

  // Функция для отображения детального вида
  const renderDetailView = (sectionData: Section) => (
    <div className={styles.detailContainer}>
      <button onClick={() => setSelectedSectionId(null)} className={styles.backButton}>
        &larr; Назад ко всем разделам
      </button>
      <h1 className={styles.mainTitle}>{sectionData.title}</h1>
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
    </div>
  );

  // Функция для отображения сетки с разделами
  const renderGridView = () => (
    <>
      <h1 className={styles.mainTitle}>Гид по Дагестану</h1>
      <p className={styles.mainDescription}>
        Выберите интересующий вас раздел, чтобы увидеть подробности.
      </p>
      <div className={styles.sectionGrid}>
        {GUIDE_SECTIONS.map((section) => (
          <div
            key={section.id}
            className={styles.sectionCard}
            onClick={() => setSelectedSectionId(section.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setSelectedSectionId(section.id); }}
          >
            <h2 className={styles.sectionTitle}>{section.title}</h2>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <Head>
        <title>
          {selectedSectionData ? selectedSectionData.title : 'Гид по Дагестану'} | EasyGo
        </title>
      </Head>
      <main className={styles.container}>
        {/* В зависимости от состояния показываем или детальный вид, или сетку */}
        {selectedSectionData ? renderDetailView(selectedSectionData) : renderGridView()}
      </main>
    </>
  );
};

export default GuidePage;
