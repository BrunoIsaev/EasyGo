import { useState, useEffect } from 'react';

interface TourData {
  id: string;
  title: string;
  basePrice: number;
  program: string[];
}

interface BookingModalProps {
  tour: TourData | null;
  onClose: () => void;
}

export default function BookingModal({ tour, onClose }: BookingModalProps) {
  const [people, setPeople] = useState(1);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Логика расчета цены
  const DISCOUNT_THRESHOLD = 2; // Скидка начинается с 3-го человека
  const DISCOUNT_AMOUNT = 500;
  
  const totalPrice = (() => {
    if (!tour) return 0;
    const baseTotal = people * tour.basePrice;
    const discountCount = Math.max(0, people - DISCOUNT_THRESHOLD);
    return baseTotal - (discountCount * DISCOUNT_AMOUNT);
  })();

  // Блокируем скролл страницы при открытой модалке
  useEffect(() => {
    if (tour) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [tour]);

  if (!tour) return null;

  const handleBook = () => {
    if (!date || !name || !phone) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    // Здесь будет логика отправки (пока алерт)
    alert(`Заявка отправлена!\nТур: ${tour.title}\nДата: ${date}\nЛюдей: ${people}\nСумма: ${totalPrice.toLocaleString()}₽\nКлиент: ${name} (${phone})`);
    onClose();
  };

  return (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', 
      alignItems: 'center', justifyContent: 'center', padding: '20px' 
    }} onClick={onClose}>
      
      <div style={{ 
        background: '#fff', borderRadius: '24px', width: '100%', maxWidth: '500px', 
        maxHeight: '90vh', overflowY: 'auto', padding: '32px', position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Кнопка закрытия */}
        <button onClick={onClose} style={{ 
          position: 'absolute', top: '20px', right: '20px', background: 'none', 
          border: 'none', fontSize: '24px', cursor: 'pointer', color: '#9ca3af' 
        }}>✕</button>

        <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', fontWeight: '800', paddingRight: '30px' }}>{tour.title}</h2>
        <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '0.9rem' }}>🕘 Выезд: 07:30 | 🏁 Возврат: 20:00</p>

        {/* Программа */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px' }}>Программа дня:</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#4b5563', lineHeight: '1.6', fontSize: '0.95rem' }}>
            {tour.program.map((item, i) => <li key={i} style={{ marginBottom: '4px' }}>{item}</li>)}
          </ul>
        </div>

        {/* Выбор даты */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '8px' }}>Выберите дату:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required
            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '1rem', boxSizing: 'border-box' }} />
        </div>

        {/* Количество людей */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '8px' }}>Количество участников:</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setPeople(Math.max(1, people - 1))} 
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e5e7eb', background: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>-</button>
            <span style={{ fontSize: '1.2rem', fontWeight: '700', minWidth: '30px', textAlign: 'center' }}>{people}</span>
            <button onClick={() => setPeople(people + 1)} 
              style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e5e7eb', background: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
            {people >= 3 && <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '600' }}>🎉 Скидка {DISCOUNT_AMOUNT}₽ за каждого доп. участника!</span>}
          </div>
        </div>

        {/* Итоговая стоимость */}
        <div style={{ 
          background: '#f0fdf4', padding: '16px', borderRadius: '12px', marginBottom: '24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span style={{ fontWeight: '600', color: '#065f46' }}>Итого к оплате:</span>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#065f46' }}>{totalPrice.toLocaleString()} ₽</span>
        </div>

        {/* Контакты */}
        <div style={{ marginBottom: '24px', display: 'grid', gap: '12px' }}>
          <input placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)}
            style={{ padding: '12px', borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '1rem' }} />
          <input placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel"
            style={{ padding: '12px', borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '1rem' }} />
        </div>

        {/* Кнопка брони */}
        <button onClick={handleBook} disabled={!date || !name || !phone}
          style={{ 
            width: '100%', padding: '16px', background: (!date || !name || !phone) ? '#d1d5db' : '#10b981', 
            color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '700', 
            cursor: (!date || !name || !phone) ? 'not-allowed' : 'pointer', transition: 'all 0.2s'
          }}>
          Забронировать тур
        </button>

      </div>
    </div>
  );
}
