import Head from 'next/head';
import { useState } from 'react';
import { TOUR_ROUTES } from '@/data/routes';
import BookingModal from '@/components/BookingModal';


const ADVENTURE_TOURS_DATA: Record<string, any> = {
  'adv-day-1': { id: 'adv-day-1', title: 'Джиппинг, Нохьо и Сулак', basePrice: 5500, program: ['Трансфер до Сулакского каньона', 'Посещение пещеры Нохьо и Виа Феррата', 'Прогулка на катерах по бирюзовой воде', 'Обед в ресторане «Главрыба»', 'Экскурсия на бархан Сарыкум'] },
  'adv-day-2': { id: 'adv-day-2', title: 'Рафтинг, Гоор и Карадах', basePrice: 5500, program: ['Трансфер к реке Аварское Койсу', 'Инструктаж и подготовка снаряжения', 'Сплав по горной реке', 'Посещение теснины Гоор', 'Обед на природе'] },
  'adv-day-3': { id: 'adv-day-3', title: 'Хунзах, Лошади и Тарзанка', basePrice: 5500, program: ['Трансфер на Хунзахское плато', 'Конная прогулка по плато', 'Зиплайн в Матласе', 'Прыжок с тарзанки у водопада Тобот', 'Обед в горном кафе'] },
  'adv-day-4': { id: 'adv-day-4', title: 'Багги, Хучни и Лунь', basePrice: 5500, program: ['Трансфер в Дербентский район', 'Заезд на багги по бездорожью', 'Посещение водопада в Хучни', 'Осмотр экраноплана «Лунь»', 'Обед у Каспия'] },
  'adv-day-5': { id: 'adv-day-5', title: 'Избербаш Параплан', basePrice: 5500, program: ['Трансфер на гору Пушкин-Тау', 'Подготовка параплана и инструктаж', 'Тандемный полет над морем', 'Фотосессия на вершине', 'Обед в Избербаше'] },
  'adventure-full-5days': { id: 'adventure-full-5days', title: 'ЭКСТРИМ-МАРАФОН (5 дней)', basePrice: 25000, program: ['День 1: Сулак и Нохьо', 'День 2: Рафтинг и Гоор', 'День 3: Хунзах и Тарзанка', 'День 4: Багги и Лунь', 'День 5: Параплан в Избербаше', 'Проживание и трансферы включены'] }
};


// Компонент карточки тура (с темно-зеленым кружком)
const TourCard = ({ route, onClick }: { route: any; onClick: () => void }) => {
  if (!route) return null;
  const cleanTitle = route.title.replace(/^День \d+:\s*/, '');
  return (
    <div 
      style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', marginBottom: '32px', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} 
      onMouseOver={(e: any) => { e.currentTarget.style.borderColor = '#064e3b'; e.currentTarget.style.transform = 'translateY(-2px)'; }} 
      onMouseOut={(e: any) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.transform = 'translateY(0)'; }} 
      onClick={onClick}
    >
      {/* Темно-зеленый кружок вместо бледного */}
      <div style={{ width: '40px', height: '40px', background: '#064e3b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem', flexShrink: 0 }}>📍</div>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '700', color: '#111' }}>{cleanTitle}</h3>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.4' }}>{route.description}</p>
      </div>
      <div style={{ color: '#9ca3af', fontSize: '1.2rem' }}>→</div>
    </div>
  );
};

export default function GuidePage({ selectedSectionData, renderDetailView, renderGridView }: any) {
  const [selectedTour, setSelectedTour] = useState<any>(null);
  
  // Если выбрана секция "Приключения" - показываем наш новый дизайн
  if (selectedSectionData && selectedSectionData.title === 'Приключения') {
    return (
      <>
        <Head><title>Приключения | EasyGo</title></Head>
        
        {/* Кнопка Назад */}
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 20px 0' }}>
          <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '0.9rem', padding: '0' }}>
            ← Назад
          </button>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 20px 40px', fontFamily: 'system-ui, sans-serif', color: '#111' }}>
          
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Рафтинг по Аварскому Койсу</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Покори бурную горную реку! Командный сплав по маршрутам разной сложности.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Сплавы по горным рекам Дагестана — это незабываемый опыт. Мы организуем туры по реке Аварское Койсу, предлагая маршруты как для новичков, так и для опытных рафтеров. Предоставляется всё необходимое оборудование и сопровождение опытных инструкторов.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: База «Остров Рафт» (Шамильский район)</p>
            <TourCard route={TOUR_ROUTES.find((r: any) => r.id === 'adv-day-2')} onClick={() => setSelectedTour(ADVENTURE_TOURS_DATA['adv-day-2'])} />
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Квадротуры: Свобода бездорожья</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>За рулем мощного квадроцикла по самым диким тропам. Крутые подъемы, спуски и виды, от которых захватывает дух.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Почувствуйте полный контроль над своим приключением! Мы предлагаем прогулки на квадроциклах по горным маршрутам Буйнакского района и других локаций. Выбирайте тур по душе: от коротких заездов до многодневных экспедиций.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Хучни, Дербент</p>
            <TourCard route={TOUR_ROUTES.find((r: any) => r.id === 'adv-day-4')} onClick={() => setSelectedTour(ADVENTURE_TOURS_DATA['adv-day-4'])} />
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Полет на параплане</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Взлети над горами и морем! Тандемный полет с инструктором — самый безопасный способ ощутить свободу.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Увидеть Дагестан таким, каким его видят только птицы. Мы организуем тандем-полеты на параплане с опытными инструкторами в окрестностях Избербаша, со знаменитой горы Пушкин-Тау.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Гора Пушкин-Тау (г. Избербаш)</p>
            <TourCard route={TOUR_ROUTES.find((r: any) => r.id === 'adv-day-5')} onClick={() => setSelectedTour(ADVENTURE_TOURS_DATA['adv-day-5'])} />
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Зиплайн и тарзанка</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Готовы шагнуть в пропасть? Скоростной спуск по тросу или затяжной прыжок с веревкой.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Для самых смелых! Попробуйте скоростной спуск на зиплайне в Матласе или прямо над Сулакским каньоном. А если этого мало — совершите прыжок с тарзанки со 100-метровой скалы водопада Тобот.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Зиплайн: Матлас, Тарзанка: водопад Тобот</p>
            <TourCard route={TOUR_ROUTES.find((r: any) => r.id === 'adv-day-3')} onClick={() => setSelectedTour(ADVENTURE_TOURS_DATA['adv-day-3'])} />
          </section>

          <section style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Виа Феррата: Тропа над каньоном</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Проверь себя на прочность! Уникальный скальный маршрут со страховкой прямо над бирюзовой водой Сулака.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>«Виа феррата» — это скальная тропа, оборудованная металлическими скобами и страховочным тросом. Вам предстоит карабкаться вдоль отвесной скалы и проходить по подвесным мостам на высоте.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Развлекательный комплекс «Нохьо», «Главрыба» (Сулакский каньон)</p>
            <TourCard route={TOUR_ROUTES.find((r: any) => r.id === 'adv-day-1')} onClick={() => setSelectedTour(ADVENTURE_TOURS_DATA['adv-day-1'])} />
          </section>

          <div style={{ marginTop: '80px', padding: '32px', borderRadius: '16px', background: '#f9fafb', borderLeft: '4px solid #ef4444' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', fontWeight: '800' }}>🔥 ЭКСТРИМ-МАРАФОН</h2>
            <p style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>5 дней абсолютного драйва</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px', color: '#4b5563' }}>Зачем выбирать что-то одно? Пройдите весь путь экстремального Дагестана за одну поездку. Мы взяли лучшие активности — от бурного рафтинга и скальных троп до полета над морем — и собрали их в идеальный маршрут. Трансфер, гиды, оборудование и эмоции включены.</p>
            <button onClick={() => setSelectedTour(ADVENTURE_TOURS_DATA['adventure-full-5days'])} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#ef4444', color: '#fff', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>[ Выбрать Экстрим-Марафон → ]</button>
          </div>

        </div>
        
        {/* Модалка бронирования */}
        <BookingModal tour={selectedTour} onClose={() => setSelectedTour(null)} />
      </>
    );
  }

  // Для ВСЕХ остальных разделов (Культура, Гастро, Семья) используем СТАРЫЙ рендер
  return (
    <>
      <Head>
        <title>{selectedSectionData ? selectedSectionData.title : 'Гид по Дагестану'} | EasyGo</title>
      </Head>
      <main style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '40px', paddingLeft: '20px', paddingRight: '20px' }}>
        {selectedSectionData ? renderDetailView(selectedSectionData) : renderGridView()}
      </main>
    </>
  );
}