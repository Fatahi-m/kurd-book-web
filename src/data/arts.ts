import { Artisan, ArtProduct } from '@/lib/types';

export const artisans: Artisan[] = [
  {
    id: 'artisan-1',
    name: 'دایە مریەم',
    latinName: 'Daya Maryam',
    bio: {
      ku: 'دایە مریەم زیاتر لە ٤٠ ساڵە خەریکی دروستکردنی کڵاشە لە هەورامان.',
      en: 'Daya Maryam has been weaving Klash (traditional shoes) in Hawraman for over 40 years.',
      kmr: 'Dayê Meryem zêdetirî 40 sal e li Hewramanê mijûlî çêkirina Kilaş e.'
    },
    image: '/images/artisans/daya-maryam.jpg', // Placeholder
    location: {
      city: 'Hawraman',
      country: 'Kurdistan'
    },
    specialty: ['Weaving', 'Footwear'],
    products: ['art-1', 'art-2'],
    story: {
      ku: 'دایە مریەم لە گوندێکی بچووک لە دڵی هەورامان دەژی. ئەو هونەری کڵاش چنین لە دایکیەوە فێر بووە و ئێستا بە خۆشەویستیەوە بۆ نەوەی نوێ دەیگوازێتەوە.',
      en: 'Daya Maryam lives in a small village in the heart of Hawraman. She learned the art of Klash weaving from her mother and now passes it on to the new generation with love.',
      kmr: 'Dayê Meryem li gundekî biçûk li dilê Hewramanê dijî. Wê hunera çêkirina Kilaş ji diya xwe fêr bûye û niha bi hezkirin ji nifşê nû re vediguhêze.'
    }
  },
  {
    id: 'artisan-2',
    name: 'مام کاوە',
    latinName: 'Mam Kawa',
    bio: {
      ku: 'مام کاوە دارتاشێکی بەتوانایە لە سنە، کە بە کارە هونەرییە دارینەکانی ناسراوە.',
      en: 'Mam Kawa is a skilled carpenter from Sanandaj, known for his artistic wooden works.',
      kmr: 'Mam Kawe darxuratekî jêhatî ye li Sineyê, ku bi karên xwe yên hunerî yên darîn tê naskirin.'
    },
    image: '/images/artisans/mam-kawa.jpg', // Placeholder
    location: {
      city: 'Sanandaj',
      country: 'Kurdistan'
    },
    specialty: ['Woodwork', 'Carving'],
    products: ['art-3'],
    story: {
      ku: 'مام کاوە باوەڕی وایە دار گیانی هەیە. او بە وردەکارییەوە تەختە نرد و شەترەنج دروست دەکات کە هەر کامەیان چیرۆکێک دەگێڕنەوە.',
      en: 'Mam Kawa believes that wood has a soul. He meticulously crafts backgammon and chess sets, each telling a unique story.',
      kmr: 'Mam Kawe bawer dike ku dar xwedî giyan e. Ew bi hûrgilî textê nerd û şetrencê çêdike ku her yek çîrokek vedibêje.'
    }
  }
];

export const artProducts: ArtProduct[] = [
  {
    id: 'art-1',
    title: {
      ku: 'کڵاشی هەورامی پلە یەک',
      en: 'Premium Hawrami Klash',
      kmr: 'Kilaşê Hewramî yê pile yek'
    },
    artisanId: 'artisan-1',
    price: 45.00,
    images: ['/images/arts/klash-1.jpg'], // Placeholder
    description: {
      ku: 'کڵاشی دەستچنی هەورامی، دروستکراو لە پەڕۆی سروشتی و کەرەستەی کوالێتی بەرز. زۆر ئاسوودە و فێنک بۆ هاوین.',
      en: 'Handwoven Hawrami Klash, made from natural fabrics and high-quality materials. Very comfortable and cool for summer.',
      kmr: 'Kilaşê destçêkirî yê Hewramî, ji qumaşê xwezayî û materyalên bi kalîteya bilind hatiye çêkirin. Ji bo havînê pir rehet û hênik e.'
    },
    category: 'textile',
    materials: ['Cotton', 'Leather', 'Natural Fabric'],
    dimensions: 'Available in all sizes',
    weight: '300g',
    inStock: true,
    isHandmade: true,
    creationTime: '3 days'
  },
  {
    id: 'art-2',
    title: {
      ku: 'کڵاشی ژنانە نەخشدار',
      en: 'Patterned Women\'s Klash',
      kmr: 'Kilaşê jinan ê nexşandî'
    },
    artisanId: 'artisan-1',
    price: 50.00,
    images: ['/images/arts/klash-women.jpg'], // Placeholder
    description: {
      ku: 'کڵاشی تایبەتی ژنانە بە نەخشی ڕەنگاوڕەنگ و دیزاینی مۆدێرن.',
      en: 'Special women\'s Klash with colorful patterns and modern design.',
      kmr: 'Kilaşê taybet ê jinan bi nexşên rengîn û sêwirana nûjen.'
    },
    category: 'textile',
    materials: ['Cotton', 'Silk threads'],
    dimensions: 'Sizes 36-41',
    weight: '250g',
    inStock: true,
    isHandmade: true,
    creationTime: '4 days'
  },
  {
    id: 'art-3',
    title: {
      ku: 'تەختە نردی دار گوێز',
      en: 'Walnut Wood Backgammon',
      kmr: 'Textê Nerd ê Dara Gûzê'
    },
    artisanId: 'artisan-2',
    price: 120.00,
    images: ['/images/arts/backgammon.jpg'], // Placeholder
    description: {
      ku: 'تەختە نردی دەستساز لە داری گوێزی کۆن، بە نەخشی کوردی و کوالێتی نایاب.',
      en: 'Handmade backgammon set from old walnut wood, featuring Kurdish patterns and premium quality.',
      kmr: 'Textê nerd ê destçêkirî ji dara gûzê ya kevn, bi nexşên Kurdî û kalîteya bilind.'
    },
    category: 'woodwork',
    materials: ['Walnut Wood', 'Varnish'],
    dimensions: '50x50 cm (Open)',
    weight: '2.5kg',
    inStock: true,
    isHandmade: true,
    creationTime: '2 weeks'
  }
];
