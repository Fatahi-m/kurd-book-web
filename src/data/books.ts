import { Book, Category, Author } from '@/lib/types';

// Sample Kurdish books data
export const books: Book[] = [
  {
    id: '1',
    title: 'مەم و زین',
    author: 'ئەحمەدی خانی',
    publisher: 'دەزگای چاپ و بڵاوکردنەوەی کوردستان',
    price: 22.50,
    originalPrice: 25.00,
    image: '/images/books/book-1.jpg',
    description: 'ئەم کتابە یەکێک لە گرنگترین بەرهەمەکانی ئەدەبیاتی کلاسیکی کوردییە',
    isbn: '978-964-123-456-7',
    pages: 320,
    language: 'kurdish',
    category: 'literature',
    tags: ['کلاسیک', 'ئەدەبیات', 'شیعر'],
    publishedDate: '2023-01-15',
    inStock: true,
    featured: true,
    bestseller: true,
    newRelease: false,
    rating: 4.8,
    reviewCount: 125
  },
  {
    id: '2',
    title: 'جنێرال جۆتیار',
    author: 'شێرکۆ بێکەس',
    publisher: 'سەردەم',
    price: 16.90,
    image: '/images/books/book-2.jpg',
    description: 'رۆمانێکی مۆدێرن لە شێرکۆ بێکەس',
    isbn: '978-964-234-567-8',
    pages: 280,
    language: 'kurdish',
    category: 'literature',
    tags: ['رۆمان', 'مۆدێرن', 'کورد'],
    publishedDate: '2023-03-10',
    inStock: true,
    featured: true,
    bestseller: false,
    newRelease: true,
    rating: 4.5,
    reviewCount: 89
  },
  {
    id: '3',
    title: 'مێژووی کورد',
    author: 'د. کەمال مەزهەر ئەحمەد',
    publisher: 'چاپخانەی کوردستان',
    price: 24.90,
    originalPrice: 29.90,
    image: '/images/books/book-3.jpg',
    description: 'کتابێکی جیاوازی مێژووی کورد لە سەردەمی دێرینەوە تا ئێستا',
    isbn: '978-964-345-678-9',
    pages: 450,
    language: 'kurdish',
    category: 'history',
    tags: ['مێژوو', 'کورد', 'ناسنامە'],
    publishedDate: '2022-11-20',
    inStock: true,
    featured: false,
    bestseller: true,
    newRelease: false,
    rating: 4.7,
    reviewCount: 203
  },
  {
    id: '4',
    title: 'چیرۆکەکانی منداڵان',
    author: 'ئارام تیگران',
    publisher: 'منداڵ',
    price: 15.50,
    image: '/images/books/book-4.jpg',
    description: 'کۆمەڵێک چیرۆکی جوان بۆ منداڵان',
    isbn: '978-964-456-789-0',
    pages: 120,
    language: 'kurdish',
    category: 'children',
    tags: ['منداڵان', 'چیرۆک', 'پەروەردە'],
    publishedDate: '2023-05-08',
    inStock: true,
    featured: false,
    bestseller: false,
    newRelease: true,
    rating: 4.3,
    reviewCount: 67
  },
  {
    id: '5',
    title: 'شیعرەکانی گۆران',
    author: 'عبدوڵڵا گۆران',
    publisher: 'دەزگای چاپ و بڵاوکردنەوەی کوردستان',
    price: 19.90,
    image: '/images/books/book-5.jpg',
    description: 'کۆمەڵێک لە باشترین شیعرەکانی عبدوڵڵا گۆران',
    isbn: '978-964-567-890-1',
    pages: 200,
    language: 'kurdish',
    category: 'poetry',
    tags: ['شیعر', 'کلاسیک', 'گۆران'],
    publishedDate: '2023-02-14',
    inStock: true,
    featured: true,
    bestseller: false,
    newRelease: false,
    rating: 4.6,
    reviewCount: 156
  },
  {
    id: '6',
    title: 'فەلسەفەی کوردی',
    author: 'د. محەمەد سالح',
    publisher: 'بیر',
    price: 23.50,
    image: '/images/books/book-6.jpg',
    description: 'لێکۆڵینەوەیەک لە فەلسەفەی کوردی',
    isbn: '978-964-678-901-2',
    pages: 380,
    language: 'kurdish',
    category: 'culture',
    tags: ['فەلسەفە', 'کلتوور', 'بیرکردنەوە'],
    publishedDate: '2022-09-30',
    inStock: true,
    featured: false,
    bestseller: false,
    newRelease: false,
    rating: 4.4,
    reviewCount: 91
  },
  {
    id: '7',
    title: 'مێژووی تەواوی جیهان',
    author: 'جان کلۆد بارۆ و غیوم بیغۆ',
    translator: 'هۆگر ڕەحمان قادر',
    publisher: 'ناوەندی غەزەلنووس',
    price: 18.00,
    image: '/images/books/book-7.jpg',
    description: 'کتێبێک سەبارەت بە مێژووی جیهان لە سەرەتاوە تا ئێستا',
    isbn: '978-964-000-001-1',
    pages: 500,
    language: 'kurdish',
    category: 'history',
    tags: ['مێژوو', 'جیهان'],
    publishedDate: '2020-01-01',
    inStock: true,
    featured: false,
    bestseller: false,
    newRelease: true,
    rating: 4.5,
    reviewCount: 10
  },
  {
    id: '8',
    title: 'مەسخ',
    author: 'فرانتس کافکا',
    translator: 'ئازاد هاشم',
    publisher: 'ناوەندی ئەندێشە',
    price: 10.00,
    image: '/images/books/book-8.jpg',
    description: 'ڕۆمانی بەناوبانگی کافکا',
    isbn: '978-964-000-002-2',
    pages: 120,
    language: 'kurdish',
    category: 'literature',
    tags: ['ڕۆمان', 'کلاسیک'],
    publishedDate: '2019-01-01',
    inStock: true,
    featured: true,
    bestseller: true,
    newRelease: false,
    rating: 4.8,
    reviewCount: 45
  }
];

// Categories data
export const categories: Category[] = [
  {
    id: 'literature',
    name: {
      ku: 'ئەدەبیات',
      en: 'Literature',
      de: 'Literatur'
    },
    slug: 'literature',
    description: {
      ku: 'کتابەکانی ئەدەبیات و رۆمان',
      en: 'Literature and novels',
      de: 'Literatur und Romane'
    },
    icon: '📚'
  },
  {
    id: 'poetry',
    name: {
      ku: 'شیعر',
      en: 'Poetry',
      de: 'Poesie'
    },
    slug: 'poetry',
    description: {
      ku: 'کۆمەڵگای شاعیران و شیعرەکانیان',
      en: 'Poetry collections and poets',
      de: 'Gedichtsammlungen und Dichter'
    },
    icon: '✍️'
  },
  {
    id: 'history',
    name: {
      ku: 'مێژوو',
      en: 'History',
      de: 'Geschichte'
    },
    slug: 'history',
    description: {
      ku: 'کتابەکانی مێژوویی کورد و دنیا',
      en: 'Kurdish and world history books',
      de: 'Kurdische und Weltgeschichte'
    },
    icon: '🏛️'
  },
  {
    id: 'children',
    name: {
      ku: 'منداڵان',
      en: 'Children',
      de: 'Kinder'
    },
    slug: 'children',
    description: {
      ku: 'کتابەکانی منداڵان و نەوجوانان',
      en: 'Children and young adult books',
      de: 'Kinder- und Jugendbücher'
    },
    icon: '🧸'
  },
  {
    id: 'education',
    name: {
      ku: 'پەروەردە',
      en: 'Education',
      de: 'Bildung'
    },
    slug: 'education',
    description: {
      ku: 'کتابەکانی پەروەردەیی و فێرکاری',
      en: 'Educational and learning books',
      de: 'Bildungs- und Lernbücher'
    },
    icon: '🎓'
  },
  {
    id: 'religion',
    name: {
      ku: 'ئایین',
      en: 'Religion',
      de: 'Religion'
    },
    slug: 'religion',
    description: {
      ku: 'کتابەکانی ئاینی',
      en: 'Religious books',
      de: 'Religiöse Bücher'
    },
    icon: '🕌'
  },
  {
    id: 'politics',
    name: {
      ku: 'سیاسەت',
      en: 'Politics',
      de: 'Politik'
    },
    slug: 'politics',
    description: {
      ku: 'کتابەکانی سیاسی',
      en: 'Political books',
      de: 'Politische Bücher'
    },
    icon: '🏛️'
  },
  {
    id: 'science',
    name: {
      ku: 'زانست',
      en: 'Science',
      de: 'Wissenschaft'
    },
    slug: 'science',
    description: {
      ku: 'کتابەکانی زانستی',
      en: 'Scientific books',
      de: 'Wissenschaftliche Bücher'
    },
    icon: '🔬'
  },
  {
    id: 'biography',
    name: {
      ku: 'بیۆگرافی',
      en: 'Biography',
      de: 'Biografie'
    },
    slug: 'biography',
    description: {
      ku: 'ژیاننامەی کەسایەتییەکان',
      en: 'Biographies of personalities',
      de: 'Biografien von Persönlichkeiten'
    },
    icon: '👤'
  },
  {
    id: 'culture',
    name: {
      ku: 'کلتوور',
      en: 'Culture',
      de: 'Kultur'
    },
    slug: 'culture',
    description: {
      ku: 'کتابەکانی کلتووری',
      en: 'Cultural books',
      de: 'Kulturelle Bücher'
    },
    icon: '🎭'
  }
];

// Authors data
export const authors: Author[] = [
  {
    id: '1',
    name: 'ئەحمەدی خانی',
    latinName: 'Ahmad Khani',
    bio: {
      ku: 'ئەحمەدی خانی (١٦٥١-١٧٠٧) یەکێک لە گەورە شاعیرەکانی کوردە و دامەزرێنەری شیعری کلاسیکی کوردی. لە گوندی ئەحمەدی خان لە دایک بووە. بەرهەمی نامۆی "مەم و زین" یەکێک لە گرنگترین بەرهەمەکانی ئەدەبیاتی کوردییە کە تایبەتمەندیەکانی نەتەوایەتی و رۆمانسی کوردی تێدا کۆکراوەتەوە.',
      en: 'Ahmad Khani (1651-1707) is one of the greatest Kurdish poets and the founder of Kurdish classical poetry. Born in the village of Ahmad Khan, his immortal work "Mem and Zin" is one of the most important works of Kurdish literature that combines Kurdish national and romantic characteristics.',
      de: 'Ahmad Khani (1651-1707) ist einer der größten kurdischen Dichter und der Begründer der kurdischen klassischen Dichtung. Geboren im Dorf Ahmad Khan, ist sein unsterbliches Werk "Mem und Zin" eines der wichtigsten Werke der kurdischen Literatur.'
    },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    birthYear: 1651,
    deathYear: 1707,
    nationality: 'کورد',
    genre: ['شیعر', 'ئەدەبیاتی کلاسیک'],
    awards: ['شاعیری نیشتیمانی کورد'],
    books: ['1']
  },
  {
    id: '2',
    name: 'شێرکۆ بێکەس',
    latinName: 'Sherko Bekas',
    bio: {
      ku: 'شێرکۆ بێکەس (١٩٤٠-٢٠١٣) یەکێک لە گرنگترین شاعیرانی هاوچەرخی کوردە. لە سلێمانی لە دایک بووە و لە تەمەنی منداڵیەوە بە شیعر خەریک بووە. شیعرەکانی بە نوێبوون و جوانی ناسراون. چەندین خەڵاتی نێودەوڵەتیی وەرگرتووە و وەک "شاعیری ئازادی" ناسراوە.',
      en: 'Sherko Bekas (1940-2013) is one of the most important contemporary Kurdish poets. Born in Sulaymaniyah, he has been involved in poetry since childhood. His poems are known for their innovation and beauty. He has received several international awards and is known as the "Poet of Freedom".',
      de: 'Sherko Bekas (1940-2013) ist einer der wichtigsten zeitgenössischen kurdischen Dichter. Geboren in Sulaymaniyah, beschäftigte er sich seit seiner Kindheit mit Dichtung. Seine Gedichte sind für ihre Innovation und Schönheit bekannt.'
    },
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    birthYear: 1940,
    deathYear: 2013,
    nationality: 'کورد',
    genre: ['شیعری هاوچەرخ', 'ئەدەبیاتی مۆدێرن'],
    awards: ['خەڵاتی شیعری ئەوروپا', 'خەڵاتی شاعیری ئازادی'],
    books: ['2']
  },
  {
    id: '3',
    name: 'د. کەمال مەزهەر ئەحمەد',
    latinName: 'Dr. Kamal Mazhar Ahmad',
    bio: {
      ku: 'د. کەمال مەزهەر ئەحمەد (١٩٦٥) مێژووناسێکی ناسراوی کوردە و پسپۆڕی مێژووی کورد و ناوچەکە. لە زانکۆی بەغدا بڕوانامەی دکتۆرای مێژووی وەرگرتووە. چەندین کتاب و توێژینەوەی لەسەر مێژووی کورد نووسیووە. ئێستا وەک مامۆستای زانکۆ لە زانکۆی سلێمانی کار دەکات.',
      en: 'Dr. Kamal Mazhar Ahmad (1965) is a renowned Kurdish historian and expert on Kurdish and regional history. He received his PhD in History from the University of Baghdad. He has written several books and research papers on Kurdish history. He currently works as a university professor at the University of Sulaymaniyah.',
      de: 'Dr. Kamal Mazhar Ahmad (1965) ist ein renommierter kurdischer Historiker und Experte für kurdische und regionale Geschichte. Er promovierte in Geschichte an der Universität Bagdad und arbeitet derzeit als Universitätsprofessor.'
    },
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face',
    birthYear: 1965,
    nationality: 'کورد',
    genre: ['مێژوو', 'لێکۆڵینەوە'],
    awards: ['خەڵاتی باشترین کتابی مێژووی'],
    books: ['3']
  },
  {
    id: '4',
    name: 'ئارام تیگران',
    latinName: 'Aram Tigran',
    bio: {
      ku: 'ئارام تیگران (١٩٨٠) نووسەری چیرۆک و رۆمانی منداڵانە. لە هەولێر لە دایک بووە و لە زانکۆی دهۆک بڕوانامەی لیسانسی ئەدەبیاتی وەرگرتووە. چەندین چیرۆک و رۆمانی بۆ منداڵان نووسیووە کە زۆر پەسەندکراون. شێوازی نووسینی سادە و خۆشە.',
      en: 'Aram Tigran (1980) is a story and novel writer for children. Born in Erbil, he received his bachelor\'s degree in literature from Duhok University. He has written several stories and novels for children that are highly appreciated.',
      de: 'Aram Tigran (1980) ist ein Geschichten- und Romanautor für Kinder. Geboren in Erbil, erhielt er seinen Bachelor-Abschluss in Literatur von der Universität Duhok.'
    },
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    birthYear: 1980,
    nationality: 'کورد',
    genre: ['ئەدەبیاتی منداڵان', 'چیرۆک'],
    awards: ['خەڵاتی باشترین نووسەری منداڵان'],
    books: ['4']
  },
  {
    id: '5',
    name: 'عبدوڵڵا گۆران',
    latinName: 'Abdullah Goran',
    bio: {
      ku: 'عبدوڵڵا گۆران (١٩٠٤-١٩٦٢) یەکێک لە گەورە شاعیرانی کوردە و بناغەی شیعری نوێی کوردی. لە هەڵەبجە لە دایک بووە. شیعرەکانی تایبەتمەندی نوێبوون و رۆمانسیزمیان هەیە. وەک "شاعیری گۆران" ناسراوە چونکە شێوازێکی تازەی بۆ شیعری کوردی هێناوە.',
      en: 'Abdullah Goran (1904-1962) is one of the great Kurdish poets and the founder of modern Kurdish poetry. Born in Halabja, his poems have characteristics of innovation and romanticism. Known as the "Poet of Change".',
      de: 'Abdullah Goran (1904-1962) ist einer der großen kurdischen Dichter und der Begründer der modernen kurdischen Dichtung. Geboren in Halabja, haben seine Gedichte Eigenschaften von Innovation und Romantik.'
    },
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    birthYear: 1904,
    deathYear: 1962,
    nationality: 'کورد',
    genre: ['شیعری نوێ', 'رۆمانسیزم'],
    awards: ['شاعیری نیشتیمانی کورد'],
    books: ['5']
  },
  {
    id: '6',
    name: 'د. محەمەد سالح',
    latinName: 'Dr. Mohammed Salih',
    bio: {
      ku: 'د. محەمەد سالح (١٩٧٠) فەیلەسوف و لێکۆڵەرێکی کوردە. لە کەرکووک لە دایک بووە و لە زانکۆی بەغدا دکتۆرای فەلسەفەی وەرگرتووە. چەندین کتاب لەسەر فەلسەفەی ئیسلامی و کوردایەتی نووسیووە. ئێستا وەک مامۆستای زانکۆ کار دەکات.',
      en: 'Dr. Mohammed Salih (1970) is a Kurdish philosopher and researcher. Born in Kirkuk, he received his PhD in Philosophy from the University of Baghdad. He has written several books on Islamic philosophy and Kurdish identity.',
      de: 'Dr. Mohammed Salih (1970) ist ein kurdischer Philosoph und Forscher. Geboren in Kirkuk, promovierte er in Philosophie an der Universität Bagdad.'
    },
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    birthYear: 1970,
    nationality: 'کورد',
    genre: ['فەلسەفە', 'لێکۆڵینەوە'],
    awards: ['خەڵاتی باشترین کتابی فەلسەفی'],
    books: ['6']
  }
];

// Translators data
export const translators: import('@/lib/types').Translator[] = [
  {
    id: '1',
    name: 'هەژار موکریانی',
    latinName: 'Hejar Mukriyani',
    bio: {
      ku: 'هەژار موکریانی (١٩٢١-١٩٩١) شاعیر، نووسەر و وەرگێڕی گەورەی کوردە. وەرگێڕانی قورئانی پیرۆز و شەرەفنامە و چوارینەکانی خەیام لە گرنگترین کارەکانی ئەون.',
      en: 'Hejar Mukriyani (1921-1991) was a great Kurdish poet, writer, and translator. His translations of the Holy Quran, Sharafnama, and Khayyam\'s Quartets are among his most important works.',
      de: 'Hejar Mukriyani (1921-1991) war ein großer kurdischer Dichter, Schriftsteller und Übersetzer. Seine Übersetzungen des Heiligen Koran, Sharafnama und Khayyams Quartette gehören zu seinen wichtigsten Werken.'
    },
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=150&h=150&fit=crop&crop=face',
    birthYear: 1921,
    deathYear: 1991,
    nationality: 'کورد',
    languages: ['کوردی', 'عەرەبی', 'فارسی'],
    books: ['1', '5']
  },
  {
    id: '2',
    name: 'محەمەد قازی',
    latinName: 'Mohammad Qazi',
    bio: {
      ku: 'محەمەد قازی (١٩١٣-١٩٩٨) یەکێک لە بەناوبانگترین وەرگێڕەکانی ئێران و کوردستان بوو. ئەو بە "باوکی وەرگێڕانی ئێران" ناسراوە و دەیان شاکاری ئەدەبی جیهانی وەرگێڕاوەتە سەر زمانی فارسی و کوردی.',
      en: 'Mohammad Qazi (1913-1998) was one of the most famous translators in Iran and Kurdistan. Known as the "Father of Translation in Iran", he translated dozens of world literary masterpieces into Persian and Kurdish.',
      de: 'Mohammad Qazi (1913-1998) war einer der berühmtesten Übersetzer im Iran und in Kurdistan. Bekannt als "Vater der Übersetzung im Iran", übersetzte er Dutzende von Meisterwerken der Weltliteratur ins Persische und Kurdische.'
    },
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    birthYear: 1913,
    deathYear: 1998,
    nationality: 'کورد',
    languages: ['کوردی', 'فارسی', 'فەڕەنسی'],
    books: ['2', '3']
  },
  {
    id: '3',
    name: 'هۆگر ڕەحمان قادر',
    latinName: 'Hogir Rahman Qadir',
    bio: {
      ku: 'هۆگر ڕەحمان قادر وەرگێڕێکی بەتوانای کوردە کە چەندین کتێبی گرنگی مێژوویی و فکری وەرگێڕاوە.',
      en: 'Hogir Rahman Qadir is a capable Kurdish translator who has translated several important historical and intellectual books.',
      de: 'Hogir Rahman Qadir ist ein fähiger kurdischer Übersetzer, der mehrere wichtige historische und intellektuelle Bücher übersetzt hat.'
    },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    birthYear: 1980,
    nationality: 'کورد',
    languages: ['کوردی', 'فەڕەنسی', 'ئینگلیزی'],
    books: ['7']
  },
  {
    id: '4',
    name: 'ئازاد هاشم',
    latinName: 'Azad Hashim',
    bio: {
      ku: 'ئازاد هاشم وەرگێڕ و نووسەرێکی کوردە، ناسراوە بە وەرگێڕانی بەرهەمە ئەدەبییە جیهانییەکان.',
      en: 'Azad Hashim is a Kurdish translator and writer, known for translating world literary works.',
      de: 'Azad Hashim ist ein kurdischer Übersetzer und Schriftsteller, bekannt für die Übersetzung von Werken der Weltliteratur.'
    },
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    birthYear: 1975,
    nationality: 'کورد',
    languages: ['کوردی', 'ئەڵمانی', 'ئینگلیزی'],
    books: ['8']
  }
];