import Head from 'next/head';
import { TOUR_ROUTES } from '@/data/routes';

// Вспомогательный компонент для карточки маршрута
const RouteCard = ({ route }: { route?: any }) => {
  if (!route) return null;
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300 group cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1">{route.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ml-2 ${
          route.difficulty === 'Сложный' ? 'bg-red-100 text-red-700' : 
          route.difficulty === 'Средний' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
        }`}>
          {route.difficulty}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{route.description}</p>
      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
        <span className="px-2 py-1 bg-gray-50 rounded border border-gray-100">⏱ {route.duration}</span>
      </div>
    </div>
  );
};

export default function GuidePage({ selectedSectionData, renderDetailView, renderGridView }: any) {
  return (
    <>
      <Head>
        <title>{selectedSectionData ? selectedSectionData.title : 'Гид по Дагестану'} | EasyGo</title>
      </Head>
      <main className="min-h-screen bg-white pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        {selectedSectionData ? (
          selectedSectionData.title === 'Приключения' ? (
            <div className="max-w-4xl mx-auto pb-20 px-4 w-full">
              <h1 className="text-4xl font-bold mb-12 text-center mt-8 text-slate-900">Приключения</h1>
              
              {/* БЛОК 1: РАФТИНГ */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold mb-4 text-slate-900">Рафтинг по Аварскому Койсу</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Покори бурную горную реку! Командный сплав по маршрутам разной сложности. 
                  Сплавы по горным рекам Дагестана — это незабываемый опыт. Мы организуем туры по реке Аварское Койсу, 
                  предлагая маршруты как для новичков, так и для опытных рафтеров. Предоставляется всё необходимое 
                  оборудование и сопровождение опытных инструкторов.
                </p>
                <p className="text-sm text-gray-500 italic mb-6">📍 Ключевые места: База «Остров Рафт» (Шамильский район)</p>
                <RouteCard route={TOUR_ROUTES.find(r => r.id === 'adv-day-2')} />
              </section>

              {/* БЛОК 2: КВАДРОТУРЫ */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold mb-4 text-slate-900">Квадротуры: Свобода бездорожья</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  За рулем мощного квадроцикла по самым диким тропам. Крутые подъемы, спуски и виды, от которых захватывает дух.
                  Почувствуйте полный контроль над своим приключением! Мы предлагаем прогулки на квадроциклах по горным 
                  маршрутам Буйнакского района и других локаций. Выбирайте тур по душе: от коротких заездов до многодневных экспедиций.
                </p>
                <p className="text-sm text-gray-500 italic mb-6">📍 Ключевые места: База «На рахате» (с. Ново-Зубутли)</p>
                <RouteCard route={TOUR_ROUTES.find(r => r.id === 'adv-day-4')} />
              </section>

              {/* БЛОК 3: ПАРАПЛАН */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold mb-4 text-slate-900">Полет на параплане</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Взлети над горами и морем! Тандемный полет с инструктором — самый безопасный способ ощутить свободу.
                  Увидеть Дагестан таким, каким его видят только птицы. Мы организуем тандем-полеты на параплане с опытными 
                  инструкторами в окрестностях Избербаша, со знаменитой горы Пушкин-Тау.
                </p>
                <p className="text-sm text-gray-500 italic mb-6">📍 Ключевые места: Гора Пушкин-Тау (г. Избербаш)</p>
                <RouteCard route={TOUR_ROUTES.find(r => r.id === 'adv-day-5')} />
              </section>

              {/* БЛОК 4: ЗИПЛАЙН И ТАРАНКА */}
              <section className="mb-16">
                <h2 className="text-2xl font-bold mb-4 text-slate-900">Зиплайн и тарзанка</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Готовы шагнуть в пропасть? Скоростной спуск по тросу или затяжной прыжок с веревкой.
                  Для самых смелых! Попробуйте скоростной спуск на зиплайне в Матласе или прямо над Сулакским каньоном в «Главрыбе». 
                  А если этого мало — совершите прыжок с тарзанки со 100-метровой скалы водопада Тобот.
                </p>
                <p className="text-sm text-gray-500 italic mb-6">📍 Ключевые места: Зиплайн: Матлас, «Главрыба», Тарзанка: водопад Тобот</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <RouteCard route={TOUR_ROUTES.find(r => r.id === 'adv-day-1')} />
                  <RouteCard route={TOUR_ROUTES.find(r => r.id === 'adv-day-3')} />
                </div>
              </section>

              {/* БЛОК 5: ВИА ФЕРРАТА */}
              <section className="mb-20">
                <h2 className="text-2xl font-bold mb-4 text-slate-900">Виа Феррата: Тропа над каньоном</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Проверь себя на прочность! Уникальный скальный маршрут со страховкой прямо над бирюзовой водой Сулака.
                  «Виа феррата» — это скальная тропа, оборудованная металлическими скобами и страховочным тросом. Вам 
                  предстоит карабкаться вдоль отвесной скалы и проходить по подвесным мостам на высоте.
                </p>
                <p className="text-sm text-gray-500 italic mb-6">📍 Ключевые места: Развлекательный комплекс «Нохьо» (Сулакский каньон)</p>
                <RouteCard route={TOUR_ROUTES.find(r => r.id === 'adv-day-1')} />
              </section>

              {/* ФИНАЛЬНЫЙ БЛОК: ЭКСТРИМ-МАРАФОН */}
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-slate-900 to-black rounded-3xl p-8 md:p-12 text-white shadow-2xl border border-emerald-500/30">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider animate-pulse">🔥 Рекомендуем</span>
                      <h2 className="text-3xl md:text-4xl font-bold leading-tight">ЭКСТРИМ-МАРАФОН</h2>
                      <p className="text-emerald-300 mt-2 text-xl font-medium">5 дней абсолютного драйва</p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                       <span className="px-4 py-2 bg-white/10 rounded-xl text-sm backdrop-blur border border-white/10">⏱ 5 дней</span>
                       <span className="px-4 py-2 bg-red-500/90 rounded-xl text-sm font-bold shadow-lg shadow-red-500/20">⚡ Сложный</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-8 leading-relaxed text-lg max-w-3xl">
                    Зачем выбирать что-то одно? Пройдите весь путь экстремального Дагестана за одну поездку. 
                    Мы взяли лучшие активности — от бурного рафтинга и скальных троп до полета над морем — 
                    и собрали их в идеальный маршрут. Трансфер, гиды, оборудование и эмоции включены.
                  </p>

                  <button 
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-1"
                  >
                    <span>Выбрать Экстрим-Марафон</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          ) : (
            renderDetailView(selectedSectionData)
          )
        ) : (
            <div className="max-w-6xl mx-auto pb-20 px-4 w-full">
              <h1 className="text-4xl font-bold mb-12 text-center mt-8 text-slate-900">Все маршруты</h1>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {TOUR_ROUTES.map((route) => (
                  <div key={route.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300 group cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1">{route.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ml-2 ${
                        route.difficulty === 'Сложный' ? 'bg-red-100 text-red-700' : 
                        route.difficulty === 'Средний' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {route.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{route.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <span className="px-2 py-1 bg-gray-50 rounded border border-gray-100">⏱ {route.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </main>
    </>
  );
}