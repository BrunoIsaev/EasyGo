export interface Location {
  id: string;
  name: string;
  coords: [number, number];
  type: 'beach' | 'landmark' | 'winery' | 'nature' | 'history' | 'extreme';
  description?: string;
  city?: string; // Для группировки (Махачкала, Дербент и т.д.)
}

export const ALL_LOCATIONS: Location[] = [
  // --- ПЛЯЖИ (Отдельные точки) ---
  { id: 'beach-black-stones', name: 'Пляж Черные камни', coords: [43.032772, 47.461602], type: 'beach', city: 'Махачкала', description: 'Дикий пляж с черной галькой' },
  { id: 'beach-berezka', name: 'Пляж Березка', coords: [42.997752, 47.478247], type: 'beach', city: 'Махачкала' },
  { id: 'beach-makh-city', name: 'Городской пляж (Махачкала)', coords: [42.986806, 47.511080], type: 'beach', city: 'Махачкала' },
  { id: 'beach-korall', name: 'Пляж Коралл', coords: [42.962373, 47.558654], type: 'beach', city: 'Махачкала' },
  { id: 'beach-priboy-mkh', name: 'Пляж Прибой (Махачкала)', coords: [42.951873, 47.576169], type: 'beach', city: 'Махачкала' },
  { id: 'beach-oasis', name: 'Пляж Оазис', coords: [42.939808, 47.587883], type: 'beach', city: 'Махачкала' },
  
  { id: 'beach-jami', name: 'Пляж Джами', coords: [42.927411, 47.604846], type: 'beach', city: 'Каспийск' },
  { id: 'beach-nauka', name: 'Пляж Наука', coords: [42.908758, 47.627596], type: 'beach', city: 'Каспийск' },
  { id: 'beach-laguna', name: 'Пляж Лагуна', coords: [42.906795, 47.628988], type: 'beach', city: 'Каспийск' },
  { id: 'beach-kasp-city', name: 'Городской пляж (Каспийск)', coords: [42.902161, 47.632168], type: 'beach', city: 'Каспийск' },
  { id: 'beach-azimut', name: 'Пляж Азимут', coords: [42.887593, 47.650063], type: 'beach', city: 'Каспийск' },

  { id: 'beach-zavodskoy', name: 'Заводской пляж', coords: [42.594655, 47.866877], type: 'beach', city: 'Избербаш' },
  { id: 'beach-izb-city', name: 'Городской пляж (Избербаш)', coords: [42.585346, 47.879305], type: 'beach', city: 'Избербаш' },
  { id: 'beach-priboy-izb', name: 'Пляж Прибой (Избербаш)', coords: [42.581944, 47.885481], type: 'beach', city: 'Избербаш' },

  { id: 'beach-ogni', name: 'Огнинский пляж', coords: [42.141307, 48.235274], type: 'beach', city: 'Дагестанские Огни' },
  
  { id: 'beach-derbent-center', name: 'Центральный пляж (Дербент)', coords: [42.094374, 48.289759], type: 'beach', city: 'Дербент' },
  { id: 'beach-derbent-south', name: 'Дербентский пляж', coords: [42.053123, 48.311683], type: 'beach', city: 'Дербент' },

  // --- ДОСТОПРИМЕЧАТЕЛЬНОСТИ И ЛОКАЦИИ ---
  { id: 'sulak-dubki', name: 'Сулакский каньон (Дубки)', coords: [43.023323, 46.826067], type: 'nature', description: 'Главная смотровая площадка' },
  { id: 'glavryba', name: 'Главрыба (Зиплайн)', coords: [43.075371, 46.834599], type: 'extreme' },
  { id: 'nokho', name: 'Ресторан Нохьо', coords: [43.065256, 46.832734], type: 'landmark' },
  { id: 'sarykum', name: 'Бархан Сарыкум', coords: [43.004082, 47.236765], type: 'nature' },
  
  { id: 'naryn-kala', name: 'Крепость Нарын-Кала', coords: [42.053199, 48.275200], type: 'history', city: 'Дербент' },
  { id: 'magaly', name: 'Магалы (Старый город)', coords: [42.055159, 48.282632], type: 'history', city: 'Дербент' },
  { id: 'lun', name: 'Экраноплан Лунь', coords: [41.939094, 48.377184], type: 'history', city: 'Арабляр' },
  { id: 'lianovy', name: 'Лиановый лес (Самур)', coords: [41.815438, 48.528746], type: 'nature', city: 'Самур' },

  { id: 'khunzakh', name: 'Хунзахское плато', coords: [42.554613, 46.719514], type: 'nature' },
  { id: 'matlas', name: 'Каменная чаша (Матлас)', coords: [42.604530, 46.584876], type: 'nature' },
  { id: 'gamсутль', name: 'Село Гамсутль', coords: [42.303376, 46.996166], type: 'history' },
  { id: 'gunib', name: 'Гуниб (Смотровая)', coords: [42.388628, 46.957798], type: 'nature' },
  
  { id: 'gerey-tyuz', name: 'Винодельня Герей-Тюоз', coords: [42.680069, 47.682121], type: 'winery', city: 'Гергебиль' },
  { id: 'chateau-alvisa', name: 'Шато Алвиса', coords: [42.139285, 48.113493], type: 'winery', city: 'Мамедкала' },
  { id: 'izberbash-winery', name: 'Избербашский винзавод', coords: [42.537885, 47.894218], type: 'winery', city: 'Избербаш' },

  { id: 'gunnsky-wp', name: 'Гуннский водопад', coords: [42.388096, 46.953864], type: 'nature' },
  { id: 'stalin-wp', name: 'Сталинский водопад', coords: [42.391053, 47.067300], type: 'nature' },
  { id: 'karadakh', name: 'Карадахская теснина', coords: [42.456801, 46.892043], type: 'nature' },
  { id: 'tsolotl', name: 'Цолотлинский каньон', coords: [42.550048, 46.720265], type: 'nature' },
  
  { id: 'akhulgo', name: 'Мемориал Ахульго', coords: [42.774883, 46.738848], type: 'history' },
  { id: 'gimry-tower', name: 'Гимринская башня', coords: [42.747527, 46.874527], type: 'history' },
  { id: 'irganay', name: 'Ирганайское водохранилище', coords: [42.661254, 46.901394], type: 'nature' },
  
  { id: 'goar', name: 'Гоорский Язык тролля', coords: [42.432191, 46.563624], type: 'extreme' },
  { id: 'chokh', name: 'Чохские террасы', coords: [42.318212, 47.014923], type: 'nature' },
  { id: 'akhty', name: 'Ахты (Горячие источники)', coords: [41.459186, 47.749428], type: 'nature' }
];