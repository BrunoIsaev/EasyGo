import Head from 'next/head';
import { TOUR_ROUTES } from '@/data/routes';

const RouteCard = ({ route }: { route?: any }) => {
  if (!route) return null;
  return (
    <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '20px', marginBottom: '32px', background: '#f9fafb', padding: '20px', borderRadius: '0 12px 12px 0' }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: '700', color: '#374151' }}>📍 {route.title}</h3>
      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.5' }}>{route.description}</p>
    </div>
  );
};

export default function GuidePage({ selectedSectionData, renderDetailView, renderGridView }: any) {
  if (selectedSectionData && selectedSectionData.title === 'Приключения') {
    return (
      <>
        <Head><title>Приключения | EasyGo</title></Head>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#111' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '48px' }}>Приключения</h1>
          
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>Рафтинг по Аварскому Койсу</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>Покори бурную горную реку! Командный сплав по маршрутам разной сложности.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>Сплавы по горным рекам Дагестана — это незабываемый опыт. Мы организуем туры по реке Аварское Койсу, предлагая маршруты как для новичков, так и для опытных рафтеров. Предоставляется всё необходимое оборудование и сопровождение опытных инструкторов.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px', fontSize: '1rem' }}>Ключевые места: База «Остров Рафт» (Шамильский район)</p>
            <RouteCard route={TOUR_ROUTES.find(r => r.id === 'adv-day-2')} />
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>Квадротуры: Свобода бездорожья</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>За рулем мощного квадроцикла по самым диким тропам. Крутые подъемы, спуски и виды, от которых захватывает дух.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>Почувствуйте полный контроль над своим приключением! Мы предлагаем прогулки на квадроциклах по горным маршрутам Буйнакского района и других локаций. Выбирайте тур по душе: от коротких заездов до многодневных экспедиций.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px', fontSize: '1rem' }}>Ключевые места: Хучни, Дербент</p>
            <RouteCard route={TOUR_ROUTES.find(r => r.id === 'adv-day-4')} />
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>Полет на параплане</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>Взлети над горами и морем! Тандемный полет с инструктором — самый безопасный способ ощутить свободу.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>Увидеть Дагестан таким, каким его видят только птицы. Мы организуем тандем-полеты на параплане с опытными инструкторами в окрестностях Избербаша, со знаменитой горы Пушкин-Тау.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px', fontSize: '1rem' }}>Ключевые места: Гора Пушкин-Тау (г. Избербаш)</p>
            <RouteCard route={TOUR_ROUTES.find(r => r.id === 'adv-day-5')} />
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>Зиплайн и тарзанка</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>Готовы шагнуть в пропасть? Скоростной спуск по тросу или затяжной прыжок с веревкой.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>Для самых смелых! Попробуйте скоростной спуск на зиплайне в Матласе или прямо над Сулакским каньоном. А если этого мало — совершите прыжок с тарзанки со 100-метровой скалы водопада Тобот.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px', fontSize: '1rem' }}>Ключевые места: Зиплайн: Матлас, Тарзанка: водопад Тобот</p>
            <RouteCard route={TOUR_ROUTES.find(r => r.id === 'adv-day-3')} />
          </section>

          <section style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>Виа Феррата: Тропа над каньоном</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>Проверь себя на прочность! Уникальный скальный маршрут со страховкой прямо над бирюзовой водой Сулака.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '1rem' }}>«Виа феррата» — это скальная тропа, оборудованная металлическими скобами и страховочным тросом. Вам предстоит карабкаться вдоль отвесной скалы и проходить по подвесным мостам на высоте.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px', fontSize: '1rem' }}>Ключевые места: Развлекательный комплекс «Нохьо», «Главрыба» (Сулакский каньон)</p>
            <RouteCard route={TOUR_ROUTES.find(r => r.id === 'adv-day-1')} />
          </section>

          <div style={{ marginTop: '80px', padding: '40px', borderRadius: '24px', background: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)', color: '#fff', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ display: 'inline-block', padding: '6px 12px', background: '#10b981', color: '#fff', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '9999px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🔥 Рекомендуем</span>
                <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: '800', lineHeight: '1.2' }}>ЭКСТРИМ-МАРАФОН</h2>
                <p style={{ margin: '8px 0 0 0', color: '#6ee7b7', fontSize: '1.25rem', fontWeight: '500' }}>5 дней абсолютного драйва</p>
              </div>
              <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '1.1rem', marginBottom: '32px', maxWidth: '800px' }}>Зачем выбирать что-то одно? Пройдите весь путь экстремального Дагестана за одну поездку. Мы взяли лучшие активности — от бурного рафтинга и скальных троп до полета над морем — и собрали их в идеальный маршрут. Трансфер, гиды, оборудование и эмоции включены.</p>
              <button onClick={() => {}} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '16px 32px', background: '#10b981', color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', borderRadius: '16px', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 10px 15px -3px rgba(16,185,129,0.3)' }}>
                <span>Выбрать Экстрим-Марафон</span>
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M5 12h14'/><path d='m12 5 7 7-7 7'/></svg>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Head><title>{selectedSectionData ? selectedSectionData.title : 'Гид по Дагестану'} | EasyGo</title></Head>
      <main style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '40px', paddingHorizontal: '20px' }}>
        {selectedSectionData ? renderDetailView(selectedSectionData) : renderGridView()}
      </main>
    </>
  );
}