import Head from 'next/head';
import { TOUR_ROUTES } from '@/data/routes';

// Компонент карточки тура (идентичный поиску на главной)
const TourCard = ({ route }: { route: any }) => {
  if (!route) return null;
  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px', 
        padding: '16px', 
        background: '#fff', 
        border: '1px solid #e5e7eb', 
        borderRadius: '12px', 
        marginBottom: '32px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = '#10b981';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(16,185,129,0.15)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = '#e5e7eb';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      onClick={() => window.location.href = '/?search=' + encodeURIComponent(route.title)}
    >
      <div style={{ 
        width: '40px', 
        height: '40px', 
        background: '#f0fdf4', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#10b981',
        fontSize: '1.2rem'
      }}>
        
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '700', color: '#111' }}>{route.title}</h3>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.4' }}>{route.description}</p>
      </div>
      <div style={{ color: '#9ca3af', fontSize: '1.2rem' }}>→</div>
    </div>
  );
};

export default function GuidePage({ selectedSectionData }: any) {
  // Логика отображения раздела "Приключения"
  if (selectedSectionData && selectedSectionData.title === 'Приключения') {
    return (
      <>
        <Head><title>Приключения | EasyGo</title></Head>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#111' }}>
          
          {/* БЛОК 1: ПАРАПЛАН */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Полет на параплане</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>
              Взлети над горами и морем! Тандемный полет с инструктором — самый безопасный способ ощутить свободу.
            </p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>
              Увидеть Дагестан таким, каким его видят только птицы. Мы организуем тандем-полеты на параплане с опытными инструкторами в окрестностях Избербаша, со знаменитой горы Пушкин-Тау.
            </p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px', fontSize: '1rem' }}>
              Ключевые места: Гора Пушкин-Тау (г. Избербаш)
            </p>
            <TourCard route={TOUR_ROUTES.find((r: any) => r.id === 'adv-day-5')} />
          </section>

          {/* БЛОК 2: ЗИПЛАЙН */}
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Зиплайн и тарзанка</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>
              Готовы шагнуть в пропасть? Скоростной спуск по тросу или затяжной прыжок с веревкой.
            </p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>
              Для самых смелых! Попробуйте скоростной спуск на зиплайне в Матласе или прямо над Сулакским каньоном. А если этого мало — совершите прыжок с тарзанки со 100-метровой скалы водопада Тобот.
            </p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px', fontSize: '1rem' }}>
              Ключевые места: Зиплайн: Матлас, Тарзанка: водопад Тобот
            </p>
            <TourCard route={TOUR_ROUTES.find((r: any) => r.id === 'adv-day-3')} />
          </section>

          {/* БЛОК 3: ВИА ФЕРРАТА */}
          <section style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Виа Феррата: Тропа над каньоном</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>
              Проверь себя на прочность! Уникальный скальный маршрут со страховкой прямо над бирюзовой водой Сулака.
            </p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>
              «Виа феррата» — это скальная тропа, оборудованная металлическими скобами и страховочным тросом. Вам предстоит карабкаться вдоль отвесной скалы и проходить по подвесным мостам на высоте.
            </p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px', fontSize: '1rem' }}>
              Ключевые места: Развлекательный комплекс «Нохьо», «Главрыба» (Сулакский каньон)
            </p>
            <TourCard route={TOUR_ROUTES.find((r: any) => r.id === 'adv-day-1')} />
          </section>

          {/* ФИНАЛ: ЭКСТРИМ-МАРАФОН */}
          <div style={{ 
            marginTop: '80px', 
            padding: '32px', 
            borderRadius: '16px', 
            background: '#f9fafb', 
            borderLeft: '4px solid #ef4444'
          }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', fontWeight: '800', color: '#111' }}>🔥 ЭКСТРИМ-МАРАФОН</h2>
            <p style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>5 дней абсолютного драйва</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px', color: '#4b5563' }}>
              Зачем выбирать что-то одно? Пройдите весь путь экстремального Дагестана за одну поездку. Мы взяли лучшие активности — от бурного рафтинга и скальных троп до полета над морем — и собрали их в идеальный маршрут. Трансфер, гиды, оборудование и эмоции включены.
            </p>
            <button 
              onClick={() => window.location.href = '/?search=' + encodeURIComponent('БОЛЬШОЙ ТУР: Приключения')}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '12px 24px', 
                background: '#ef4444', 
                color: '#fff', 
                fontWeight: 'bold', 
                borderRadius: '8px', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              [ Выбрать Экстрим-Марафон → ]
            </button>
          </div>

        </div>
      </>
    );
  }

  // Дефолтное состояние (если раздел не выбран) - просто пустая заглушка или редирект
  return (
    <>
      <Head><title>Гид по Дагестану | EasyGo</title></Head>
      <div style={{ padding: '100px 20px', textAlign: 'center', fontFamily: 'system-ui' }}>
        <h1>Выберите раздел в меню выше</h1>
      </div>
    </>
  );
}