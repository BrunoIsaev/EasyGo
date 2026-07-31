import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
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


// Компонент карточки тура (для Приключений)
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
      <div style={{ width: '40px', height: '40px', background: '#064e3b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.2rem', flexShrink: 0 }}>📍</div>
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: '700', color: '#111' }}>{cleanTitle}</h3>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.4' }}>{route.description}</p>
      </div>
      <div style={{ color: '#9ca3af', fontSize: '1.2rem' }}>→</div>
    </div>
  );
};

// Компонент информационной карточки (для Культуры, Гастро, Семьи)
const InfoCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <div style={{ padding: '24px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', marginBottom: '20px' }}>
    <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{icon}</div>
    <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', fontWeight: '700', color: '#111' }}>{title}</h3>
    <p style={{ margin: 0, color: '#4b5563', lineHeight: '1.6' }}>{description}</p>
  </div>
);

export default function GuidePage({ selectedSectionData }: any) {
  // Если раздел не выбран, по умолчанию показываем "Приключения"
  const activeSection = selectedSectionData || { title: 'Приключения' };
  const [selectedTour, setSelectedTour] = useState<any>(null);
  
  const BackButton = () => (
    <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '0.9rem', padding: '0', marginBottom: '20px' }}>
      ← Назад
    </button>
  );

  // 1. РАЗДЕЛ ПРИКЛЮЧЕНИЯ (с модалкой и бронированием)
  if (activeSection.title === 'Приключения') {
    return (
      <>
        <Head><title>Приключения | EasyGo</title></Head>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 20px 0' }}><BackButton /></div>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 40px', fontFamily: 'system-ui, sans-serif', color: '#111' }}>
          
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
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: База «На рахате» (с. Ново-Зубутли)</p>
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
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Для самых смелых! Попробуйте скоростной спуск на зиплайне в Матласе или прямо над Сулакским каньоном в «Главрыбе». А если этого мало — совершите прыжок с тарзанки со 100-метровой скалы водопада Тобот.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Зиплайн: Матлас, «Главрыба»; Тарзанка: водопад Тобот</p>
            <TourCard route={TOUR_ROUTES.find((r: any) => r.id === 'adv-day-3')} onClick={() => setSelectedTour(ADVENTURE_TOURS_DATA['adv-day-3'])} />
          </section>

          <section style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Виа Феррата: Тропа над каньоном</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Проверь себя на прочность! Уникальный скальный маршрут со страховкой прямо над бирюзовой водой Сулака.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>«Виа феррата» — это скальная тропа, оборудованная металлическими скобами и страховочным тросом. Вам предстоит карабкаться вдоль отвесной скалы и проходить по подвесным мостам на высоте.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Развлекательный комплекс «Нохъо» (Сулакский каньон)</p>
            <TourCard route={TOUR_ROUTES.find((r: any) => r.id === 'adv-day-1')} onClick={() => setSelectedTour(ADVENTURE_TOURS_DATA['adv-day-1'])} />
          </section>

          <div style={{ marginTop: '80px', padding: '32px', borderRadius: '16px', background: '#f9fafb', borderLeft: '4px solid #ef4444' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', fontWeight: '800' }}>🔥 ЭКСТРИМ-МАРАФОН</h2>
            <p style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>5 дней абсолютного драйва</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px', color: '#4b5563' }}>Зачем выбирать что-то одно? Пройдите весь путь экстремального Дагестана за одну поездку. Мы взяли лучшие активности — от бурного рафтинга и скальных троп до полета над морем — и собрали их в идеальный маршрут. Трансфер, гиды, оборудование и эмоции включены.</p>
            <button onClick={() => setSelectedTour(ADVENTURE_TOURS_DATA['adventure-full-5days'])} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#ef4444', color: '#fff', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>[ Выбрать Экстрим-Марафон → ]</button>
          </div>

        </div>
        <BookingModal tour={selectedTour} onClose={() => setSelectedTour(null)} />
      </>
    );
  }

  // 2. РАЗДЕЛ КУЛЬТУРА (с оригинальными текстами)
  if (activeSection.title === 'Культура') {
    return (
      <>
        <Head><title>Культура | EasyGo</title></Head>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 20px 0' }}><BackButton /></div>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 40px', fontFamily: 'system-ui, sans-serif', color: '#111' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '32px' }}>Культурное наследие Дагестана</h1>
          <p style={{ lineHeight: '1.6', marginBottom: '32px', color: '#4b5563' }}>
            Дагестан — это живая история. Древние ремесла, уникальные промыслы и тысячелетние традиции ждут своих исследователей.
          </p>
          
          <InfoCard icon="💍" title="Кубачи: Легенды в серебре" description="Посетите легендарный аул-крепость, чьи ювелирные изделия и оружие хранятся в Лувре и Эрмитаже. Кубачи — крупнейший на Кавказе центр художественной обработки металла. Вы сможете посетить мастерские, увидеть, как рождаются шедевры, и приобрести уникальные серебряные украшения, посуду или кинжалы." />
          <InfoCard icon="🪵" title="Унцукуль: Узоры на дереве" description="Узнайте секрет уникальной унцукульской насечки металлом по дереву. Унцукуль — родина уникального промысла. Здесь создают изделия из дерева, украшая их тончайшей орнаментальной насечкой из металла. Посетите Унцукульскую художественную фабрику, где есть музей и цеха." />
          <InfoCard icon="" title="Ковры Дагестана" description="Откройте мир дагестанских ковров ручной работы на старинных фабриках и в частных мастерских. Дагестанский ковер — это бренд, известный во всем мире. Чтобы увидеть процесс его создания, можно посетить Межгюльскую, Ляхлинскую ковровые фабрики или частные артели Табасаранского района." />
          <InfoCard icon="🏛️" title="Музеи: Хранители истории" description="От сокровищ Нарын-Калы до авангарда XX века — главные музейные сокровищницы республики. Погрузитесь в богатое прошлое Дагестана, посетив его лучшие музеи: Национальный музей РД им. А. Тахо-Годи, Музей-заповедник «Дербентская крепость Нарын-Кала», Дагестанский музей ИЗО им. П.С. Гамзатовой." />
        </div>
      </>
    );
  }

  // 3. РАЗДЕЛ ГАСТРОНОМИЯ (с оригинальными текстами)
  if (activeSection.title === 'Гастротуры') {
    return (
      <>
        <Head><title>Гастротуры | EasyGo</title></Head>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 20px 0' }}><BackButton /></div>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 40px', fontFamily: 'system-ui, sans-serif', color: '#111' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '32px' }}>Вкус настоящего Дагестана</h1>
          <p style={{ lineHeight: '1.6', marginBottom: '32px', color: '#4b5563' }}>
            Дагестанская кухня — это отдельный вид искусства. От ароматного хинкала до сладкого урбеча. Мы покажем вам места, где готовят по старинным рецептам.
          </p>
          
          <InfoCard icon="🥟" title="Хинкал: Главное блюдо Дагестана" description="Забудьте всё, что вы знали о хинкали! Попробуйте пышные кусочки теста с мясом, бульоном и соусом. Хинкал — это не пельмени, это целая философия. В каждом районе Дагестана его готовят по-своему. Блюдо всегда подается раздельно: отварное мясо, ароматный бульон, соус и сами 'хинкалинки'." />
          <InfoCard icon="" title="Чуду: Тонкие пироги с душой" description="Горячие, только со сковороды, тонкие пироги с самыми разными начинками. Чуду — это тончайшие закрытые пироги, которые жарят на сухой сковороде, а затем обильно смазывают сливочным маслом. Начинки бывают на любой вкус: с мясом, с творогом, с зеленью, с тыквой." />
          <InfoCard icon="🥟" title="Курзе: Дагестанские пельмени 'косичкой'" description="Похожи на пельмени, но сочнее и красивее, с особым швом в виде косички. Главный секрет курзе — в начинке и форме. В мясной фарш часто добавляют томаты для сочности. А лепят их особым способом, защипывая край 'косичкой', чтобы весь бульон остался внутри." />
          <InfoCard icon="🍯" title="Урбеч: Энергия гор в одной ложке" description="Натуральная паста из перетертых орехов или семян. Дагестанский суперфуд. Урбеч — это уникальный продукт. Семена льна, абрикосовые косточки или орехи перетирают на каменных жерновах до выделения масла. Его смешивают с медом и сливочным маслом. Мощный источник энергии и отличный сувенир." />
        </div>
      </>
    );
  }

  // 4. РАЗДЕЛ ДЛЯ ВСЕЙ СЕМЬИ (с оригинальными текстами)
  if (activeSection.title === 'Для всей семьи') {
    return (
      <>
        <Head><title>Для всей семьи | EasyGo</title></Head>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 20px 0' }}><BackButton /></div>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 40px', fontFamily: 'system-ui, sans-serif', color: '#111' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '32px' }}>Отдых для всех возрастов</h1>
          <p style={{ lineHeight: '1.6', marginBottom: '32px', color: '#4b5563' }}>
            Безопасные, интересные и комфортные маршруты, которые понравятся и детям, и взрослым. Без экстрима, но с яркими впечатлениями.
          </p>
          
          <InfoCard icon="🏰" title="Дербент: Путешествие на 5000 лет назад" description="Прикоснитесь к стенам древнейшей цитадели России, внесенной в список ЮНЕСКО. Дербент — это живой учебник истории. Вы посетите грандиозную крепость Нарын-Кала, увидите руины древних дворцов и храмов, прогуляетесь по старинным магалам и посетите Джума-мечеть — одну из старейших в мире." />
          <InfoCard icon="🏞️" title="Сулакский каньон: Чудо природы" description="Посмотрите на один из глубочайших каньонов мира и прокатитесь на катере по бирюзовой реке. Сулакский каньон — визитная карточка Дагестана. Его глубина достигает 1920 метров! Мы отвезем вас на лучшие смотровые площадки у поселка Дубки, где есть кафе и знаменитые качели над обрывом." />
          <InfoCard icon="🏜️" title="Бархан Сарыкум: Пустыня в горах" description="Побывайте в настоящей пустыне, не уезжая с Кавказа! Один из крупнейших песчаных барханов Евразии. Сарыкум — это уникальное чудо природы, огромная песчаная гора высотой 262 метра. Вы сможете подняться на его вершину по специальной эко-тропе. У подножия бархана расположен небольшой музей флоры и фауны." />
          <InfoCard icon="️" title="Аулы-легенды: Гамсутль и Гуниб" description="Посетите 'дагестанский Мачу-Пикчу' — аул-призрак Гамсутль, и исторический Гуниб. Это путешествие в самое сердце истории гор. Сначала вы подниметесь к заброшенному аулу Гамсутль, который врос в вершину горы. А затем отправитесь в Гуниб — село с потрясающими видами, где можно посетить крепость Шамиля." />
          <InfoCard icon="" title="Гоор и Кахиб: Страна башен" description="Сделайте фото на знаменитом 'Языке тролля' и исследуйте руины древних оборонительных башен. Старинные аулы Гоор и Кахиб — это место невероятной силы и красоты. Вы увидите средневековые оборонительные башни, стоящие на самом краю пропасти. В Гооре находится знаменитый скальный выступ, прозванный 'Языком тролля'." />
        </div>
      </>
    );
  }

  // ДЕФОЛТНАЯ СТРАНИЦА (если ничего не выбрано)
  return (
    <>
      <Head><title>Гид по Дагестану | EasyGo</title></Head>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '20px' }}>Выберите раздел выше</h1>
        <p style={{ color: '#6b7280' }}>Нажмите на вкладку «Приключения», «Культура» или другую, чтобы увидеть подробный гид.</p>
        <Link href="/" style={{ display: 'inline-block', marginTop: '20px', color: '#064e3b', textDecoration: 'underline' }}>← На главную</Link>
      </div>
    </>
  );
}