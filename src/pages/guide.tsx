import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GUIDE_SECTIONS, Section } from '@/data/guideData';
import styles from '@/styles/GuidePage.module.css';

const GuidePage = () => {
  const router = useRouter();

  // Состояние для хранения ID выбранного раздела
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  
  // Это состояние нужно, чтобы избежать мигания контента, пока роутер не готов
  const [isLoading, setIsLoading] = useState(true);

  // Этот эффект будет срабатывать при загрузке страницы и при изменении URL
  useEffect(() => {
    // Ждем, пока router.query будет доступен
    if (!router.isReady) {
      return;
    }

    const { section } = router.query;

    // Проверяем, есть ли валидный ID раздела в URL
    if (section && typeof section === 'string' && GUIDE_SECTIONS.some(s => s.id === section)) {
      setSelectedSectionId(section);
    } else {
      // Если параметра нет или он неверный, показываем страницу выбора
      setSelectedSectionId(null);
    }
    
    setIsLoading(false); // Загрузка завершена
  }, [router.isReady, router.query]);

  // Находим данные выбранного раздела
  const selectedSectionData = GUIDE_SECTIONS.find(
    (section) => section.id === selectedSectionId
  );
  
  // Функция для возврата на ГЛАВНУЮ страницу сайта
  const handleGoBack = () => {
    router.push('/'); // Эта команда всегда ведет на главную
  };

  // Пока идет определение раздела, показываем заглушку
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  // Функция для отображения детального вида
  const renderDetailView = (sectionData: Section) => (
    <div className={styles.detailContainer}>
      <button onClick={handleGoBack} className={styles.backButton}>
        &larr; Назад
      </button>

      {sectionData.image && (
        <div className="relative mb-8 min-h-[80vh] w-full overflow-hidden rounded-[32px] bg-black">
          <Image
            src={sectionData.image}
            alt={sectionData.title}
            fill
            priority={true}
            className="absolute inset-0 object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex min-h-[80vh] items-center justify-center px-6 text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {sectionData.title}
            </h1>
          </div>
        </div>
      )}

      <div className="rounded-[24px] bg-white px-4 py-6 shadow-sm sm:px-6">
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
          >
            {section.image && (
              <Image
                src={section.image}
                alt={section.title}
                width={400}
                height={200}
                className="mb-4 w-full rounded-t-xl object-cover"
                style={{ height: 200 }}
              />
            )}
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
        {selectedSectionData ? renderDetailView(selectedSectionData) : renderGridView()}
      </main>
    </>
  );
}; // <-- ВОТ ЭТА СКОБКА БЫЛА ПРОПУЩЕНА

export default GuidePage;