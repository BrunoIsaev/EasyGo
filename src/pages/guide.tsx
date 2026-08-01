import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
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


// Компонент карточки тура (только для Приключений)
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

export default function GuidePage() {
  const router = useRouter();
  const [selectedTour, setSelectedTour] = useState<any>(null);
  
  // Читаем раздел из URL (?section=...) или ставим "adventures" по умолчанию
  const sectionId = (router.query.section as string) || 'adventures';
  
  const BackButton = () => (
    <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '0.9rem', padding: '0', marginBottom: '20px' }}>
      ← Назад
    </button>
  );

  // Общий стиль для контейнера раздела (как в Приключениях)
  const SectionContainer = ({ children }: { children: React.ReactNode }) => (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#111' }}>
      <BackButton />
      {children}
    </div>
  );

  // 1. РАЗДЕЛ ПРИКЛЮЧЕНИЯ (оставляем как есть)
  if (sectionId === 'adventures') {
    return (
      <>
        <Head><title>Приключения | EasyGo</title></Head>
        <SectionContainer>
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
            <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', fontWeight: '800' }}> ЭКСТРИМ-МАРАФОН</h2>
            <p style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: '600', color: '#374151' }}>5 дней абсолютного драйва</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px', color: '#4b5563' }}>Зачем выбирать что-то одно? Пройдите весь путь экстремального Дагестана за одну поездку. Мы взяли лучшие активности — от бурного рафтинга и скальных троп до полета над морем — и собрали их в идеальный маршрут. Трансфер, гиды, оборудование и эмоции включены.</p>
            <button onClick={() => setSelectedTour(ADVENTURE_TOURS_DATA['adventure-full-5days'])} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#ef4444', color: '#fff', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>[ Выбрать Экстрим-Марафон → ]</button>
          </div>
        </SectionContainer>
        <BookingModal tour={selectedTour} onClose={() => setSelectedTour(null)} />
      </>
    );
  }

  // 2. РАЗДЕЛ КУЛЬТУРА (формат идентичен Приключениям: заголовок, лид, текст, ключевые места)
  if (sectionId === 'culture') {
    return (
      <>
        <Head><title>Культура | EasyGo</title></Head>
        <SectionContainer>
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Кубачи: Легенды в серебре</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Посетите легендарный аул-крепость, чьи ювелирные изделия и оружие хранятся в Лувре и Эрмитаже.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Кубачи — крупнейший на Кавказе центр художественной обработки металла. Вы сможете посетить мастерские, увидеть, как рождаются шедевры, и приобрести уникальные серебряные украшения, посуду или кинжалы.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Аул Кубачи, Музей художественной обработки металла</p>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Унцукуль: Узоры на дереве</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Узнайте секрет уникальной унцукульской насечки металлом по дереву.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Унцукуль — родина уникального промысла. Здесь создают изделия из дерева, украшая их тончайшей орнаментальной насечкой из металла. Посетите Унцукульскую художественную фабрику, где есть музей и цеха.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Унцукульская художественная фабрика</p>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Ковры Дагестана</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Откройте мир дагестанских ковров ручной работы на старинных фабриках и в частных мастерских.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Дагестанский ковер — это бренд, известный во всем мире. Чтобы увидеть процесс его создания, можно посетить Межгюльскую, Ляхлинскую ковровые фабрики или частные артели Табасаранского района.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Межгюльская и Ляхлинская ковровые фабрики, Табасаранский район</p>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Музеи: Хранители истории</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>От сокровищ Нарын-Калы до авангарда XX века — главные музейные сокровищницы республики.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Погрузитесь в богатое прошлое Дагестана, посетив его лучшие музеи: Национальный музей РД им. А. Тахо-Годи, Музей-заповедник «Дербентская крепость Нарын-Кала», Дагестанский музей ИЗО им. П.С. Гамзатовой.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Национальный музей РД (Махачкала), Крепость Нарын-Кала (Дербент)</p>
          </section>
        </SectionContainer>
      </>
    );
  }

  // 3. РАЗДЕЛ ГАСТРОНОМИЯ (формат идентичен Приключениям)
  if (sectionId === 'gastronomy') {
    return (
      <>
        <Head><title>Гастротуры | EasyGo</title></Head>
        <SectionContainer>
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Хинкал: Главное блюдо Дагестана</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Забудьте всё, что вы знали о хинкали! Попробуйте пышные кусочки теста с мясом, бульоном и соусом.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Хинкал — это не пельмени, это целая философия. В каждом районе Дагестана его готовят по-своему. Блюдо всегда подается раздельно: отварное мясо, ароматный бульон, соус и сами хинкалинки.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Рестораны национальной кухни по всему Дагестану</p>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Чуду: Тонкие пироги с душой</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Горячие, только со сковороды, тонкие пироги с самыми разными начинками.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Чуду — это тончайшие закрытые пироги, которые жарят на сухой сковороде, а затем обильно смазывают сливочным маслом. Начинки бывают на любой вкус: с мясом, с творогом, с зеленью, с тыквой.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Семейные кафе, чайханы в горных селах</p>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Курзе: Дагестанские пельмени косичкой</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Похожи на пельмени, но сочнее и красивее, с особым швом в виде косички.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Главный секрет курзе — в начинке и форме. В мясной фарш часто добавляют томаты для сочности. А лепят их особым способом, защипывая край косичкой, чтобы весь бульон остался внутри.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Мастер-классы в этно-комплексах</p>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Урбеч: Энергия гор в одной ложке</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Натуральная паста из перетертых орехов или семян. Дагестанский суперфуд.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Урбеч — это уникальный продукт. Семена льна, абрикосовые косточки или орехи перетирают на каменных жерновах до выделения масла. Его смешивают с медом и сливочным маслом. Мощный источник энергии и отличный сувенир.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Рынки Махачкалы, частные производства в селах</p>
          </section>
        </SectionContainer>
      </>
    );
  }

  // 4. РАЗДЕЛ ДЛЯ ВСЕЙ СЕМЬИ (формат идентичен Приключениям)
  if (sectionId === 'family') {
    return (
      <>
        <Head><title>Для всей семьи | EasyGo</title></Head>
        <SectionContainer>
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Дербент: Путешествие на 5000 лет назад</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Прикоснитесь к стенам древнейшей цитадели России, внесенной в список ЮНЕСКО.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Дербент — это живой учебник истории. Вы посетите грандиозную крепость Нарын-Кала, увидите руины древних дворцов и храмов, прогуляетесь по старинным магалам и посетите Джума-мечеть — одну из старейших в мире.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Крепость Нарын-Кала, Старый город, Джума-мечеть</p>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Сулакский каньон: Чудо природы</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Посмотрите на один из глубочайших каньонов мира и прокатитесь на катере по бирюзовой реке.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Сулакский каньон — визитная карточка Дагестана. Его глубина достигает 1920 метров! Мы отвезем вас на лучшие смотровые площадки у поселка Дубки, где есть кафе и знаменитые качели над обрывом.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Смотровые площадки п. Дубки, Комплекс Главрыба</p>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Бархан Сарыкум: Пустыня в горах</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Побывайте в настоящей пустыне, не уезжая с Кавказа! Один из крупнейших песчаных барханов Евразии.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Сарыкум — это уникальное чудо природы, огромная песчаная гора высотой 262 метра. Вы сможете подняться на его вершину по специальной эко-тропе. У подножия бархана расположен небольшой музей флоры и фауны.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: Заповедник «Дагестанский», участок «Сарыкумские барханы»</p>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Аулы-легенды: Гамсутль и Гуниб</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Посетите «дагестанский Мачу-Пикчу» — аул-призрак Гамсутль, и исторический Гуниб.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Это путешествие в самое сердце истории гор. Сначала вы подниметесь к заброшенному аулу Гамсутль, который врос в вершину горы. А затем отправитесь в Гуниб — село с потрясающими видами, где можно посетить крепость Шамиля.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: с. Гамсутль, с. Гуниб</p>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Гоор и Кахиб: Страна башен</h2>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Сделайте фото на знаменитом «Языке тролля» и исследуйте руины древних оборонительных башен.</p>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>Старинные аулы Гоор и Кахиб — это место невероятной силы и красоты. Вы увидите средневековые оборонительные башни, стоящие на самом краю пропасти. В Гооре находится знаменитый скальный выступ, прозванный «Языком тролля».</p>
            <p style={{ lineHeight: '1.6', marginBottom: '24px' }}>Ключевые места: с. Гоор, с. Старый Кахиб</p>
          </section>
        </SectionContainer>
      </>
    );
  }

  return null;
}