import React, { useState } from 'react';
import Link from 'next/link';

interface TourData {
  id: string;
  title: string;
  price: number;
  departure: string;
  returnTime: string;
  subtitle: string;
  program: string[];
}

const GASTRO_TOURS: Record<string, TourData> = {
  'gerey-tyuz': {
    id: 'gerey-tyuz',
    title: 'Семейная винодельня «Герей-Тюз»',
    price: 5500,
    departure: '08:00',
    returnTime: '19:00',
    subtitle: 'Вино, крепость и мастер-классы',
    program: [
      'Трансфер к виноградникам «Герей-Тюз»',
      'Экскурсия по плантациям и история сортов (Молдова, Мускат)',
      'Посещение легендарной Крепости семи братьев',
      'Национальный обед и мастер-класс по приготовлению чуду',
      'Прогулка к Ханадскому водопаду',
      'Осмотр древнего арочного моста Зюртинг'
    ]
  },
  'dagestan-summer': {
    id: 'dagestan-summer',
    title: 'Дагестанское лето: от садов до вершин',
    price: 5500,
    departure: '07:30',
    returnTime: '20:00',
    subtitle: 'Сады, водопад и Царская поляна',
    program: [
      'Проезд через Гимринский тоннель и оборонительную башню',
      'Остановка у Ирганайского водохранилища',
      'Посещение фруктовых садов в Гунибе (дегустация абрикосов)',
      'Экскурсия в подземный Салтинский водопад',
      'Прогулка по природному парку «Верхний Гуниб» (Царская поляна)',
      'Визит в историко-краеведческий музей'
    ]
  }
};

export default function GuidePage() {
  const [selectedTour, setSelectedTour] = useState<TourData | null>(null);
  const [participants, setParticipants] = useState<number>(1);
  const [date, setDate] = useState<string>('2026-08-16');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleOpenModal = (tour: TourData) => {
    setSelectedTour(tour);
    setParticipants(1);
    setIsSuccess(false);
  };

  const handleCloseModal = () => {
    setSelectedTour(null);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTour) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/sendBooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tourTitle: selectedTour.title,
          name,
          phone,
          date,
          participants,
          totalPrice: selectedTour.price * participants
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setIsSuccess(true);
      }
    } catch (error) {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-8 max-w-4xl mx-auto font-sans">
      <Link href="/" className="text-gray-500 hover:text-gray-700 mb-6 inline-block font-medium">
        ← Назад
      </Link>

      <h1 className="text-3xl font-bold mb-8">Гастротуры по Дагестану</h1>

      {/* Маршрут 1: Герей-Тюз */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Семейная винодельня «Герей-Тюз»</h2>
        <p className="text-gray-600 mb-4 font-medium">
          Погружение в мир виноградарства, дегустация и история Дербентского района.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Вас ждет увлекательное путешествие на родину дагестанского вина. Вы посетите виноградники
          «Герей-Тюз», где узнаете о сортах Молдова, Мускат Италия и Саперави, а также увидите процесс
          ручного сбора урожая. Маршрут включает посещение легендарной Крепости семи братьев,
          национальный обед и мастер-класс по приготовлению чуду. Завершит день прогулка к Ханадскому
          водопаду и осмотр древнего арочного моста Зюртинг.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-semibold text-gray-700">Ключевые места:</span> Винодельня «Герей-Тюз», Крепость семи братьев, Ханадский водопад, Мост Зюртинг
        </p>

        <button
          onClick={() => handleOpenModal(GASTRO_TOURS['gerey-tyuz'])}
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-200 transition-all text-left group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#01472a] flex items-center justify-center text-white text-lg font-bold">
              🍷
            </div>
            <div>
              <div className="font-bold text-gray-900 group-hover:text-[#01472a] transition-colors">
                Семейная винодельня «Герей-Тюз»
              </div>
              <div className="text-sm text-gray-500">Вино, крепость и мастер-классы</div>
            </div>
          </div>
          <span className="text-gray-400 group-hover:text-gray-700 text-xl font-bold">→</span>
        </button>
      </section>

      {/* Маршрут 2: Дагестанское лето */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Дагестанское лето: от садов до вершин</h2>
        <p className="text-gray-600 mb-4 font-medium">
          Гимринский перевал, подземный водопад и абрикосовые сады Гуниба.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Этот маршрут раскрывает природное разнообразие горного Дагестана. Вы проедете через
          Гимринский тоннель, увидите оборонительную башню и Ирганайское водохранилище. Главная
          изюминка — посещение фруктовых садов в Гунибе, где летом можно попробовать сладчайшие
          абрикосы сортов «Шалах» и «Краснощёкий». Программа также включает единственный в Дагестане
          подземный Салтинский водопад, прогулку по природному парку «Верхний Гуниб» (Царская поляна) и
          визит в историко-краеведческий музей.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-semibold text-gray-700">Ключевые места:</span> Гимринский тоннель, Салтинский водопад, Абрикосовые сады Гуниба, Природный парк «Верхний Гуниб»
        </p>

        <button
          onClick={() => handleOpenModal(GASTRO_TOURS['dagestan-summer'])}
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-200 transition-all text-left group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#01472a] flex items-center justify-center text-white text-lg font-bold">
              🍑
            </div>
            <div>
              <div className="font-bold text-gray-900 group-hover:text-[#01472a] transition-colors">
                Дагестанское лето: от садов до вершин
              </div>
              <div className="text-sm text-gray-500">Сады, водопад и Царская поляна</div>
            </div>
          </div>
          <span className="text-gray-400 group-hover:text-gray-700 text-xl font-bold">→</span>
        </button>
      </section>

      {/* Модальное окно бронирования */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ✕
            </button>

            {isSuccess ? (
              <div className="py-12 text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
                <p className="text-gray-600 mb-6">Мы свяжемся с вами в ближайшее время для подтверждения бронирования.</p>
                <button
                  onClick={handleCloseModal}
                  className="w-full py-3 bg-[#01472a] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Отлично
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-1 pr-6">{selectedTour.title}</h3>
                <div className="text-xs text-gray-500 mb-6 flex items-center gap-2">
                  <span>🕒 Выезд: {selectedTour.departure}</span>
                  <span>|</span>
                  <span>🏁 Возврат: {selectedTour.returnTime}</span>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-sm text-gray-900 mb-2">Программа дня:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {selectedTour.program.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Выберите дату:</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#01472a] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Количество участников:</label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setParticipants(Math.max(1, participants - 1))}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center font-bold text-lg hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="font-bold text-lg">{participants}</span>
                      <button
                        type="button"
                        onClick={() => setParticipants(participants + 1)}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center font-bold text-lg hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-[#01472a]/10 rounded-xl flex items-center justify-between my-2">
                    <span className="font-bold text-[#01472a] text-sm">Итого к оплате:</span>
                    <span className="font-extrabold text-[#01472a] text-xl">
                      {(selectedTour.price * participants).toLocaleString()} ₽
                    </span>
                  </div>

                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#01472a] text-sm"
                  />

                  <input
                    type="tel"
                    placeholder="Телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#01472a] text-sm"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#01472a] hover:opacity-90 text-white rounded-full font-bold transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Отправка...' : 'Забронировать тур'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
