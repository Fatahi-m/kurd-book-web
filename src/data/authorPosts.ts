import { AuthorPost } from '@/lib/types';

export const authorPosts: AuthorPost[] = [
  {
    id: '1',
    authorId: 'bakhtiyar-ali',
    authorName: 'بەختیار عەلی',
    authorAvatar: '/images/authors/bakhtiyar.jpg',
    content: 'مرۆڤ دەبێت فێربێت چۆن لەگەڵ تەنیایی خۆیدا بژی، چونکە لە کۆتاییدا تەنها شتێک کە بۆی دەمێنێتەوە، هەر تەنیاییەکەیەتی. نووسین تەنها هەوڵێکە بۆ ئەوەی ئەو تەنیاییە کەمێک ڕەنگینتر بکەین.',
    date: '2 hours ago',
    likes: 1240,
    comments: 85,
    bookLink: {
      id: '1',
      title: 'دواهەمین هەناری دونیا'
    }
  },
  {
    id: '2',
    authorId: 'sherko-bekas',
    authorName: 'شێرکۆ بێکەس',
    authorAvatar: '/images/authors/sherko.jpg',
    content: 'من دەمەوێت ببم بە با، تا بتوانم بە ئازادی بە ناو قژی کچانی نیشتمانمدا تێپەڕم. من دەمەوێت ببم بە باران، تا بتوانم تینوێتی خاکەکەم بشکێنم.',
    date: '5 hours ago',
    likes: 3500,
    comments: 210,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    authorId: 'abdulla-pashew',
    authorName: 'عەبدوڵڵا پەشێو',
    authorAvatar: '/images/authors/pashew.jpg',
    content: 'هەموو شەوێک خەون بە ئازادییەوە دەبینم، بەڵام کاتێک بەیانیان لە خەو هەڵدەستم، دەبینم هێشتا دیواری ژوورەکەم لە شوێنی خۆیەتی.',
    date: '1 day ago',
    likes: 890,
    comments: 45
  }
];
