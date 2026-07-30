import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { GUIDE_SECTIONS, Section } from '@/data/guideData';
import styles from '@/styles/GuidePage.module.css';
import { TOUR_ROUTES } from '@/data/routes';

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
    <div className="w-full bg-white px-6 py-8 text-gray-900 md:px-12">
      <button
        onClick={handleGoBack}
        className="mb-6 flex items-center gap-2 text-gray-700 transition-colors hover:text-gray-900"
      >
        ← Назад
      </button>

      <h1 className="mb-8 text-3xl font-bold md:text-4xl">
        {sectionData.title}
      </h1>

      <div className="space-y-6">
        {sectionData.cards.map((card) => (
          <div key={card.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">{card.title}</h2>
            <p className="mb-3 text-gray-700">{card.shortDescription}</p>
            <p className="text-sm leading-relaxed text-gray-600">{card.fullDescription}</p>
            {card.keyLocations && card.keyLocations.length > 0 && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <span className="text-sm font-medium text-gray-500">Ключевые места: </span>
                <span className="text-sm text-gray-700">{card.keyLocations.join(', ')}</span>
              </div>
            )}
            {card.photoIdea && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <span className="text-sm font-medium text-gray-500">Идея для фото: </span>
                <p className="mt-1 text-sm italic text-gray-600">{card.photoIdea}</p>
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
        {selectedSectionData ? (
          selectedSectionData.title === 'Приключения' ? (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold mb-6">{selectedSectionData.title}</h1>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {TOUR_ROUTES.filter(r => r.tags.includes('приключения')).map((route) => (
                  <div key={route.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow cursor-pointer"
                       onClick={() => window.location.href = `/guide?route=${route.id}`}> 
                    {/* Примечание: здесь нужна логика перехода к деталям маршрута. 
                        Если у тебя есть роутинг для деталей, используй его. 
                        Пока сделаем заглушку или ссылку на главную с открытым поиском */}
                    <h3 className="text-xl font-semibold mb-2">{route.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{route.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="px-2 py-1 bg-gray-100 rounded">{route.duration}</span>
                      <span className={`px-2 py-1 rounded ${route.difficulty === 'Сложный' ? 'bg-red-100 text-red-700' : route.difficulty === 'Средний' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        {route.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            renderDetailView(selectedSectionData)
          )
        ) : renderGridView()}
      </main>
    </>
  );
}; // <-- ВОТ ЭТА СКОБКА БЫЛА ПРОПУЩЕНА

export default GuidePage;