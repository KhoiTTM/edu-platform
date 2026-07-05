export interface WordItem {
  key: number;
  type: 'BLANK' | 'TEXT' | 'PUNCTUATION';
  value: string;
}

export interface SentenceItem {
  index: number;
  start: number;
  end: number;
  content: string;
  contentVi: string;
  words: WordItem[];
}

export interface AdviceData {
  title: string;
  audio_url: string;
  repeat_offset: number;
  sentences: SentenceItem[];
}

// Helper to generate word tokens helper for dictation (splits by space and tags blanks randomly for practice)
function generateWordTokens(text: string): WordItem[] {
  const words = text.split(/(\s+|[.,\/#!$%\^&\*;:{}=\-_~\`()?])/);
  let key = 0;
  return words
    .filter(w => w.length > 0)
    .map(w => {
      const isWord = /\w+/.test(w);
      const isBlank = isWord && (key % 4 === 0 || w.length > 6);
      const type = !isWord ? 'PUNCTUATION' : (isBlank ? 'BLANK' : 'TEXT');
      return {
        key: key++,
        type,
        value: w
      };
    });
}

export const shadowingLessons: Record<string, AdviceData> = {
  "luyen-nghe-a2-tong-ket-2025": {
    "title": "Bài 1: Luyện Nghe Tiếng Anh Level A2- TỔNG KẾT 2025-",
    "audio_url": "8pzPtQwsUeg",
    "repeat_offset": 230.4,
    "sentences": [
      {
        "index": 0,
        "start": 12639,
        "end": 18880,
        "content": "Now listen carefully.",
        "words": generateWordTokens("Now listen carefully."),
        "contentVi": "Bây giờ hãy lắng nghe thật kỹ."
      },
      {
        "index": 1,
        "start": 15360,
        "end": 21119,
        "content": "Tom: Hey, it's almost 2026.",
        "words": generateWordTokens("Tom: Hey, it's almost 2026."),
        "contentVi": "Tom: Này, sắp đến năm 2026 rồi đấy."
      },
      {
        "index": 2,
        "start": 18880,
        "end": 23920,
        "content": "Time goes so fast.",
        "words": generateWordTokens("Time goes so fast."),
        "contentVi": "Thời gian trôi nhanh thật."
      },
      {
        "index": 3,
        "start": 21119,
        "end": 26000,
        "content": "Yes, Anna. New year soon. What did you",
        "words": generateWordTokens("Yes, Anna. New year soon. What did you"),
        "contentVi": "Anna: Đúng vậy, Tom. Sắp năm mới rồi. Cậu đã làm được gì"
      },
      {
        "index": 4,
        "start": 23920,
        "end": 28560,
        "content": "do in 2025?",
        "words": generateWordTokens("do in 2025?"),
        "contentVi": "trong năm 2025 thế?"
      },
      {
        "index": 5,
        "start": 26000,
        "end": 31119,
        "content": "Let's talk about goals from last year.",
        "words": generateWordTokens("Let's talk about goals from last year."),
        "contentVi": "Anna: Hãy cùng nói về những mục tiêu từ năm ngoái đi."
      },
      {
        "index": 6,
        "start": 28560,
        "end": 35360,
        "content": "What we wanted. what we got.",
        "words": generateWordTokens("What we wanted. what we got."),
        "contentVi": "Những gì chúng ta muốn và những gì đã đạt được."
      },
      {
        "index": 7,
        "start": 31119,
        "end": 36480,
        "content": "Okay. Last year I said in 2025 I want a",
        "words": generateWordTokens("Okay. Last year I said in 2025 I want a"),
        "contentVi": "Tom: Được thôi. Năm ngoái tớ bảo là trong năm 2025 tớ muốn có"
      },
      {
        "index": 8,
        "start": 35360,
        "end": 37760,
        "content": "girlfriend",
        "words": generateWordTokens("girlfriend"),
        "contentVi": "một người bạn gái"
      },
      {
        "index": 9,
        "start": 36480,
        "end": 41120,
        "content": "and",
        "words": generateWordTokens("and"),
        "contentVi": "và..."
      },
      {
        "index": 10,
        "start": 37760,
        "end": 44480,
        "content": "I tried hard. I talked to many girls but",
        "words": generateWordTokens("I tried hard. I talked to many girls but"),
        "contentVi": "Tớ đã cố gắng rất nhiều. Tớ đã nói chuyện với nhiều cô gái nhưng"
      },
      {
        "index": 11,
        "start": 41120,
        "end": 48480,
        "content": "now still no girlfriend. So sad.",
        "words": generateWordTokens("now still no girlfriend. So sad."),
        "contentVi": "đến giờ vẫn chưa có bạn gái. Buồn ghê."
      },
      {
        "index": 12,
        "start": 44480,
        "end": 49680,
        "content": "Oh, Tom. Poor you. Me? A boy said he",
        "words": generateWordTokens("Oh, Tom. Poor you. Me? A boy said he"),
        "contentVi": "Anna: Ồ, Tom. Tội nghiệp cậu quá. Còn tớ hả? Một bạn nam nói cậu ấy"
      },
      {
        "index": 13,
        "start": 48480,
        "end": 51120,
        "content": "likes me.",
        "words": generateWordTokens("likes me."),
        "contentVi": "thích tớ."
      },
      {
        "index": 14,
        "start": 49680,
        "end": 53600,
        "content": "Really? Who?",
        "words": generateWordTokens("Really? Who?"),
        "contentVi": "Tom: Thật á? Ai thế?"
      },
      {
        "index": 15,
        "start": 51120,
        "end": 55199,
        "content": "A boy from class, but I don't like him",
        "words": generateWordTokens("A boy from class, but I don't like him"),
        "contentVi": "Anna: Một bạn nam cùng lớp, nhưng tớ không thích cậu ấy"
      },
      {
        "index": 16,
        "start": 53600,
        "end": 58960,
        "content": "so nothing.",
        "words": generateWordTokens("so nothing."),
        "contentVi": "nên không có gì cả."
      },
      {
        "index": 17,
        "start": 55199,
        "end": 61280,
        "content": "Okay. What other goals? Many more money,",
        "words": generateWordTokens("Okay. What other goals? Many more money,"),
        "contentVi": "Tom: Được rồi. Còn những mục tiêu khác thì sao? Kiếm thật nhiều tiền,"
      },
      {
        "index": 18,
        "start": 58960,
        "end": 62800,
        "content": "study better, travel more.",
        "words": generateWordTokens("study better, travel more."),
        "contentVi": "học tập tốt hơn, đi du lịch nhiều hơn."
      },
      {
        "index": 19,
        "start": 61280,
        "end": 66960,
        "content": "Did you do them?",
        "words": generateWordTokens("Did you do them?"),
        "contentVi": "Anna: Cậu có thực hiện được không?"
      },
      {
        "index": 20,
        "start": 62800,
        "end": 71200,
        "content": "No money. I earn a 100,000 V and D but",
        "words": generateWordTokens("No money. I earn a 100,000 V and D but"),
        "contentVi": "Tom: Chẳng kiếm được tiền. Tớ kiếm được 100,000 VND nhưng"
      },
      {
        "index": 21,
        "start": 66960,
        "end": 72159,
        "content": "spend 200,000. Always no money.",
        "words": generateWordTokens("spend 200,000. Always no money."),
        "contentVi": "lại tiêu mất 200,000. Lúc nào cũng hết tiền."
      },
      {
        "index": 22,
        "start": 71200,
        "end": 74960,
        "content": "Study.",
        "words": generateWordTokens("Study."),
        "contentVi": "Còn việc học?"
      },
      {
        "index": 23,
        "start": 72159,
        "end": 77920,
        "content": "I sleep in class. Nothing in my head.",
        "words": generateWordTokens("I sleep in class. Nothing in my head."),
        "contentVi": "Tom: Tớ toàn ngủ gật trong lớp. Chẳng có chữ nào vào đầu cả."
      },
      {
        "index": 24,
        "start": 74960,
        "end": 81520,
        "content": "Travel. No money. No travel.",
        "words": generateWordTokens("Travel. No money. No travel."),
        "contentVi": "Du lịch hả? Không có tiền thì không đi du lịch được."
      },
      {
        "index": 25,
        "start": 77920,
        "end": 84400,
        "content": "This year I feel useless. Bad year.",
        "words": generateWordTokens("This year I feel useless. Bad year."),
        "contentVi": "Năm nay tớ cảm thấy mình thật vô dụng. Một năm tồi tệ."
      },
      {
        "index": 26,
        "start": 81520,
        "end": 86080,
        "content": "Don't say that. Now you What happened in",
        "words": generateWordTokens("Don't say that. Now you What happened in"),
        "contentVi": "Anna: Đừng nói vậy chứ. Còn cậu thì sao? Chuyện gì đã xảy ra trong"
      },
      {
        "index": 27,
        "start": 84400,
        "end": 89360,
        "content": "2025?",
        "words": generateWordTokens("2025?"),
        "contentVi": "năm 2025?"
      },
      {
        "index": 28,
        "start": 86080,
        "end": 92640,
        "content": "me. I got 5 kilos more.",
        "words": generateWordTokens("me. I got 5 kilos more."),
        "contentVi": "Tớ á? Tớ tăng thêm 5 kg rồi."
      },
      {
        "index": 29,
        "start": 89360,
        "end": 95439,
        "content": "What? You said I want to lose weight.",
        "words": generateWordTokens("What? You said I want to lose weight."),
        "contentVi": "Tom: Cái gì? Cậu từng nói cậu muốn giảm cân mà."
      },
      {
        "index": 30,
        "start": 92640,
        "end": 97596,
        "content": "I said lose weight, but I didn't say I",
        "words": generateWordTokens("I said lose weight, but I didn't say I"),
        "contentVi": "Anna: Tớ nói giảm cân, chứ tớ không nói là tớ"
      },
      {
        "index": 31,
        "start": 95439,
        "end": 98159,
        "content": "lose it successful.",
        "words": generateWordTokens("lose it successful."),
        "contentVi": "giảm cân thành công."
      },
      {
        "index": 32,
        "start": 97596,
        "end": 100560,
        "content": "[laughter]",
        "words": generateWordTokens("[laughter]"),
        "contentVi": "[tiếng cười]"
      },
      {
        "index": 33,
        "start": 98159,
        "end": 103520,
        "content": "Funny. What good things?",
        "words": generateWordTokens("Funny. What good things?"),
        "contentVi": "Tom: Hài hước thật đấy. Có chuyện gì tốt đẹp không?"
      },
      {
        "index": 34,
        "start": 100560,
        "end": 105280,
        "content": "Good things. I tried a new language. Not",
        "words": generateWordTokens("Good things. I tried a new language. Not"),
        "contentVi": "Anna: Chuyện tốt đẹp hả. Tớ đã thử học một ngôn ngữ mới. Không"
      },
      {
        "index": 35,
        "start": 103520,
        "end": 106640,
        "content": "good, but I tried.",
        "words": generateWordTokens("good, but I tried."),
        "contentVi": "tốt lắm, nhưng tớ đã cố gắng."
      },
      {
        "index": 36,
        "start": 105280,
        "end": 109119,
        "content": "Nice.",
        "words": generateWordTokens("Nice."),
        "contentVi": "Tom: Tuyệt đấy."
      },
      {
        "index": 37,
        "start": 106640,
        "end": 112640,
        "content": "I go out more, meet new people, more",
        "words": generateWordTokens("I go out more, meet new people, more"),
        "contentVi": "Anna: Tớ đi ra ngoài nhiều hơn, gặp gỡ nhiều người mới hơn, có thêm nhiều"
      },
      {
        "index": 38,
        "start": 109119,
        "end": 113600,
        "content": "friends, eat new food. Yummy food.",
        "words": generateWordTokens("friends, eat new food. Yummy food."),
        "contentVi": "bạn bè hơn, ăn nhiều món ăn mới. Đồ ăn ngon tuyệt."
      },
      {
        "index": 39,
        "start": 112640,
        "end": 116000,
        "content": "Good.",
        "words": generateWordTokens("Good."),
        "contentVi": "Tom: Tốt đấy."
      },
      {
        "index": 40,
        "start": 113600,
        "end": 118320,
        "content": "I listen to mom and dad. not make them",
        "words": generateWordTokens("I listen to mom and dad. not make them"),
        "contentVi": "Anna: Tớ biết lắng nghe bố mẹ hơn, không làm bố mẹ phải"
      },
      {
        "index": 41,
        "start": 116000,
        "end": 121280,
        "content": "sad. This makes me happy.",
        "words": generateWordTokens("sad. This makes me happy."),
        "contentVi": "buồn. Điều này làm tớ thấy hạnh phúc."
      },
      {
        "index": 42,
        "start": 118320,
        "end": 123200,
        "content": "Wow, Tom, you are great. Small things",
        "words": generateWordTokens("Wow, Tom, you are great. Small things"),
        "contentVi": "Tom: Oa, Anna, cậu tuyệt thật đấy. Những điều nhỏ bé"
      },
      {
        "index": 43,
        "start": 121280,
        "end": 127200,
        "content": "but happy things.",
        "words": generateWordTokens("but happy things."),
        "contentVi": "nhưng đem lại hạnh phúc."
      },
      {
        "index": 44,
        "start": 123200,
        "end": 130640,
        "content": "Yes. And we are alive. 2025 had many bad",
        "words": generateWordTokens("Yes. And we are alive. 2025 had many bad"),
        "contentVi": "Anna: Đúng vậy. Và chúng ta vẫn còn sống. Năm 2025 đã có nhiều điều tồi tệ,"
      },
      {
        "index": 45,
        "start": 127200,
        "end": 133680,
        "content": "things, storms, problems everywhere.",
        "words": generateWordTokens("things, storms, problems everywhere."),
        "contentVi": "bão lũ, rắc rối ở khắp mọi nơi."
      },
      {
        "index": 46,
        "start": 130640,
        "end": 134720,
        "content": "True. We are here. We talk. That's",
        "words": generateWordTokens("True. We are here. We talk. That's"),
        "contentVi": "Tom: Đúng thế. Chúng ta đang ở đây. Đang trò chuyện cùng nhau. Điều đó thật"
      },
      {
        "index": 47,
        "start": 133680,
        "end": 136800,
        "content": "happy.",
        "words": generateWordTokens("happy."),
        "contentVi": "hạnh phúc rồi."
      },
      {
        "index": 48,
        "start": 134720,
        "end": 139680,
        "content": "New year, try again.",
        "words": generateWordTokens("New year, try again."),
        "contentVi": "Anna: Năm mới, cố gắng lại nào."
      },
      {
        "index": 49,
        "start": 136800,
        "end": 140720,
        "content": "Every year we say try again, but never",
        "words": generateWordTokens("Every year we say try again, but never"),
        "contentVi": "Tom: Năm nào chúng ta cũng nói cố gắng lại, nhưng chưa bao giờ"
      },
      {
        "index": 50,
        "start": 139680,
        "end": 143680,
        "content": "good",
        "words": generateWordTokens("good"),
        "contentVi": "tốt cả"
      },
      {
        "index": 51,
        "start": 140720,
        "end": 147120,
        "content": "because no strong heart. You need to try",
        "words": generateWordTokens("because no strong heart. You need to try"),
        "contentVi": "bởi vì chúng ta không đủ quyết tâm. Cậu cần phải cố gắng"
      },
      {
        "index": 52,
        "start": 143680,
        "end": 148800,
        "content": "hard. Okay, let's make new goals for",
        "words": generateWordTokens("hard. Okay, let's make new goals for"),
        "contentVi": "hết sức mình. Được rồi, hãy đặt ra các mục tiêu mới cho"
      },
      {
        "index": 53,
        "start": 147120,
        "end": 150480,
        "content": "2026.",
        "words": generateWordTokens("2026."),
        "contentVi": "năm 2026 nào."
      },
      {
        "index": 54,
        "start": 148800,
        "end": 153519,
        "content": "Will we do them?",
        "words": generateWordTokens("Will we do them?"),
        "contentVi": "Anna: Liệu chúng ta có thực hiện được không nhỉ?"
      },
      {
        "index": 55,
        "start": 150480,
        "end": 155680,
        "content": "Not sure, but goals give life meaning.",
        "words": generateWordTokens("Not sure, but goals give life meaning."),
        "contentVi": "Tom: Không chắc chắn, nhưng các mục tiêu giúp cuộc sống có ý nghĩa hơn."
      },
      {
        "index": 56,
        "start": 153519,
        "end": 157840,
        "content": "You first. Your goals.",
        "words": generateWordTokens("You first. Your goals."),
        "contentVi": "Anna: Cậu trước đi. Mục tiêu của cậu là gì?"
      },
      {
        "index": 57,
        "start": 155680,
        "end": 159599,
        "content": "I want to be Tik Tocker.",
        "words": generateWordTokens("I want to be Tik Tocker."),
        "contentVi": "Tom: Tớ muốn trở thành một TikToker."
      },
      {
        "index": 58,
        "start": 157840,
        "end": 163680,
        "content": "Wow. Big.",
        "words": generateWordTokens("Wow. Big."),
        "contentVi": "Anna: Oa. Ước mơ lớn lao đấy."
      },
      {
        "index": 59,
        "start": 159599,
        "end": 167760,
        "content": "Yes. Vlog my life, school, fun things.",
        "words": generateWordTokens("Yes. Vlog my life, school, fun things."),
        "contentVi": "Tom: Đúng vậy. Quay vlog về cuộc sống, trường học, những điều thú vị."
      },
      {
        "index": 60,
        "start": 163680,
        "end": 170239,
        "content": "Cool. Me? If you tick tock, I YouTube.",
        "words": generateWordTokens("Cool. Me? If you tick tock, I YouTube."),
        "contentVi": "Anna: Ngầu đấy. Còn tớ hả? Nếu cậu làm TikTok thì tớ làm YouTube."
      },
      {
        "index": 61,
        "start": 167760,
        "end": 174239,
        "content": "No joke. Serious?",
        "words": generateWordTokens("No joke. Serious?"),
        "contentVi": "Tom: Không đùa chứ? Nghiêm túc chứ?"
      },
      {
        "index": 62,
        "start": 170239,
        "end": 175519,
        "content": "I am serious. I study IELTS. Get 8.0.",
        "words": generateWordTokens("I am serious. I study IELTS. Get 8.0."),
        "contentVi": "Anna: Tớ nghiêm túc mà. Tớ sẽ học IELTS để đạt 8.0."
      },
      {
        "index": 63,
        "start": 174239,
        "end": 177840,
        "content": "Hi.",
        "words": generateWordTokens("Hi."),
        "contentVi": "Chào cậu."
      },
      {
        "index": 64,
        "start": 175519,
        "end": 179599,
        "content": "Then make YouTube teach English or",
        "words": generateWordTokens("Then make YouTube teach English or"),
        "contentVi": "Anna: Sau đó làm kênh YouTube dạy tiếng Anh hoặc"
      },
      {
        "index": 65,
        "start": 177840,
        "end": 182080,
        "content": "podcast for listening.",
        "words": generateWordTokens("podcast for listening."),
        "contentVi": "làm kênh podcast để luyện nghe."
      },
      {
        "index": 66,
        "start": 179599,
        "end": 185367,
        "content": "Good idea. Next goal.",
        "words": generateWordTokens("Good idea. Next goal."),
        "contentVi": "Tom: Ý kiến hay đó. Mục tiêu tiếp theo là gì?"
      },
      {
        "index": 67,
        "start": 182080,
        "end": 186480,
        "content": "Find a girlfriend. Beautiful and smart.",
        "words": generateWordTokens("Find a girlfriend. Beautiful and smart."),
        "contentVi": "Anna: Tìm một cô bạn gái. Xinh đẹp và thông minh."
      },
      {
        "index": 68,
        "start": 185367,
        "end": 189200,
        "content": "[laughter]",
        "words": generateWordTokens("[laughter]"),
        "contentVi": "[tiếng cười]"
      },
      {
        "index": 69,
        "start": 186480,
        "end": 191760,
        "content": "You need to be handsome first.",
        "words": generateWordTokens("You need to be handsome first."),
        "contentVi": "Tom: Cậu cần phải đẹp trai trước đã nhé."
      },
      {
        "index": 70,
        "start": 189200,
        "end": 194159,
        "content": "Hey, I am handsome.",
        "words": generateWordTokens("Hey, I am handsome."),
        "contentVi": "Anna: Này, tớ đẹp trai mà."
      },
      {
        "index": 71,
        "start": 191760,
        "end": 196879,
        "content": "Okay. Okay. Next.",
        "words": generateWordTokens("Okay. Okay. Next."),
        "contentVi": "Tom: Được rồi, được rồi. Tiếp theo nào."
      },
      {
        "index": 72,
        "start": 194159,
        "end": 198480,
        "content": "Make a lot of money. Travel. Care for",
        "words": generateWordTokens("Make a lot of money. Travel. Care for"),
        "contentVi": "Anna: Kiếm thật nhiều tiền. Đi du lịch. Chăm sóc"
      },
      {
        "index": 73,
        "start": 196879,
        "end": 200959,
        "content": "mom and dad more.",
        "words": generateWordTokens("mom and dad more."),
        "contentVi": "bố và mẹ nhiều hơn."
      },
      {
        "index": 74,
        "start": 198480,
        "end": 204239,
        "content": "Nice. That's all for me now.",
        "words": generateWordTokens("Nice. That's all for me now."),
        "contentVi": "Tom: Tuyệt vời. Hiện tại tớ chỉ có vậy thôi."
      },
      {
        "index": 75,
        "start": 200959,
        "end": 205280,
        "content": "You more goals. Study hard, find good",
        "words": generateWordTokens("You more goals. Study hard, find good"),
        "contentVi": "Anna: Cậu còn nhiều mục tiêu khác mà. Học tập chăm chỉ, tìm công việc tốt,"
      },
      {
        "index": 76,
        "start": 204239,
        "end": 208239,
        "content": "job,",
        "words": generateWordTokens("job,"),
        "contentVi": "công việc tốt,"
      },
      {
        "index": 77,
        "start": 205280,
        "end": 212400,
        "content": "or find a rich boyfriend. Easy money.",
        "words": generateWordTokens("or find a rich boyfriend. Easy money."),
        "contentVi": "hoặc tìm một anh bạn trai giàu có. Tiền bạc dễ kiếm."
      },
      {
        "index": 78,
        "start": 208239,
        "end": 213920,
        "content": "Hey, no. I want my money, my job. No",
        "words": generateWordTokens("Hey, no. I want my money, my job. No"),
        "contentVi": "Anna: Này, không đời nào. Tớ muốn tự kiếm tiền, tự có công việc riêng. Không"
      },
      {
        "index": 79,
        "start": 212400,
        "end": 214879,
        "content": "depend on a boy.",
        "words": generateWordTokens("depend on a boy."),
        "contentVi": "phụ thuộc vào con trai."
      },
      {
        "index": 80,
        "start": 213920,
        "end": 217200,
        "content": "Sorry.",
        "words": generateWordTokens("Sorry."),
        "contentVi": "Tom: Tớ xin lỗi."
      },
      {
        "index": 81,
        "start": 214879,
        "end": 219440,
        "content": "I want to care for parents better, live",
        "words": generateWordTokens("I want to care for parents better, live"),
        "contentVi": "Anna: Tớ muốn chăm sóc bố mẹ tốt hơn, sống tự do,"
      },
      {
        "index": 82,
        "start": 217200,
        "end": 221920,
        "content": "free, do what I want.",
        "words": generateWordTokens("free, do what I want."),
        "contentVi": "làm những gì tớ muốn."
      },
      {
        "index": 83,
        "start": 219440,
        "end": 224159,
        "content": "Travel other countries, see new culture,",
        "words": generateWordTokens("Travel other countries, see new culture,"),
        "contentVi": "Anna: Đi du lịch các nước khác, tìm hiểu văn hóa mới,"
      },
      {
        "index": 84,
        "start": 221920,
        "end": 227120,
        "content": "meet international friends,",
        "words": generateWordTokens("meet international friends,"),
        "contentVi": "gặp gỡ bạn bè quốc tế,"
      },
      {
        "index": 85,
        "start": 224159,
        "end": 228640,
        "content": "and be more beautiful, care skin,",
        "words": generateWordTokens("and be more beautiful, care skin,"),
        "contentVi": "và trở nên xinh đẹp hơn, chăm sóc da,"
      },
      {
        "index": 86,
        "start": 227120,
        "end": 231280,
        "content": "exercise.",
        "words": generateWordTokens("exercise."),
        "contentVi": "tập thể dục."
      },
      {
        "index": 87,
        "start": 228640,
        "end": 234959,
        "content": "Wow, Anna, big dreams.",
        "words": generateWordTokens("Wow, Anna, big dreams."),
        "contentVi": "Tom: Oa, Anna, ước mơ lớn lao đấy."
      },
      {
        "index": 88,
        "start": 231280,
        "end": 237040,
        "content": "Yes. I want all true. I try anything.",
        "words": generateWordTokens("Yes. I want all true. I try anything."),
        "contentVi": "Anna: Đúng vậy. Tớ muốn tất cả thành sự thật. Tớ sẽ thử mọi cách."
      },
      {
        "index": 89,
        "start": 234959,
        "end": 239040,
        "content": "Me too. We can do it.",
        "words": generateWordTokens("Me too. We can do it."),
        "contentVi": "Tom: Tớ cũng thế. Chúng ta có thể làm được."
      },
      {
        "index": 90,
        "start": 237040,
        "end": 243640,
        "content": "Happy New Year soon, Tom.",
        "words": generateWordTokens("Happy New Year soon, Tom."),
        "contentVi": "Anna: Chúc mừng năm mới sớm nhé, Tom."
      },
      {
        "index": 91,
        "start": 239040,
        "end": 243640,
        "content": "Happy New Year, Anna. Best friends.",
        "words": generateWordTokens("Happy New Year, Anna. Best friends."),
        "contentVi": "Tom: Chúc mừng năm mới, Anna. Đôi bạn thân tốt nhất."
      }
    ]
  },

  "luyen-nghe-a2-tong-ket-2024": {
    "title": "Bài 2: Luyện Nghe Tiếng Anh Level A2- TỔNG KẾT 2024-",
    "audio_url": "5BcuIWIx2E0",
    "repeat_offset": 155.76,
    "sentences": [
      {
        "index": 0,
        "start": 11920,
        "end": 16480,
        "content": "Now listen carefully.",
        "words": generateWordTokens("Now listen carefully."),
        "contentVi": "Bây giờ hãy lắng nghe thật kỹ."
      },
      {
        "index": 1,
        "start": 14480,
        "end": 17279,
        "content": "Emma, what do you want for dinner",
        "words": generateWordTokens("Emma, what do you want for dinner"),
        "contentVi": "John: Emma này, cậu muốn ăn gì cho bữa"
      },
      {
        "index": 2,
        "start": 16480,
        "end": 20560,
        "content": "tonight?",
        "words": generateWordTokens("tonight?"),
        "contentVi": "tối nay?"
      },
      {
        "index": 3,
        "start": 17279,
        "end": 21840,
        "content": "Let's go out or order food. I want pizza",
        "words": generateWordTokens("Let's go out or order food. I want pizza"),
        "contentVi": "Emma: Chúng ta đi ăn ngoài hoặc đặt đồ ăn đi. Tớ muốn ăn pizza"
      },
      {
        "index": 4,
        "start": 20560,
        "end": 24720,
        "content": "or sushi.",
        "words": generateWordTokens("or sushi."),
        "contentVi": "hoặc sushi."
      },
      {
        "index": 5,
        "start": 21840,
        "end": 27199,
        "content": "Again, why don't we cook at home? Eating",
        "words": generateWordTokens("Again, why don't we cook at home? Eating"),
        "contentVi": "John: Lại ăn ngoài nữa à? Sao chúng ta không nấu ăn ở nhà? Ăn"
      },
      {
        "index": 6,
        "start": 24720,
        "end": 30160,
        "content": "out costs a lot of money and it is not",
        "words": generateWordTokens("out costs a lot of money and it is not"),
        "contentVi": "ngoài tốn kém lắm và lại không"
      },
      {
        "index": 7,
        "start": 27199,
        "end": 33520,
        "content": "good for health. I am very tired after",
        "words": generateWordTokens("good for health. I am very tired after"),
        "contentVi": "tốt cho sức khỏe nữa. Tớ rất mệt sau khi"
      },
      {
        "index": 8,
        "start": 30160,
        "end": 36640,
        "content": "work. I cannot cook. Why don't you cook?",
        "words": generateWordTokens("work. I cannot cook. Why don't you cook?"),
        "contentVi": "đi làm về. Tớ không nấu được. Sao cậu không nấu đi?"
      },
      {
        "index": 9,
        "start": 33520,
        "end": 37600,
        "content": "Me? I work all day, too. Very long",
        "words": generateWordTokens("Me? I work all day, too. Very long"),
        "contentVi": "Emma: Tớ á? Tớ cũng làm việc cả ngày mà. Làm việc"
      },
      {
        "index": 10,
        "start": 36640,
        "end": 40640,
        "content": "hours.",
        "words": generateWordTokens("hours."),
        "contentVi": "nhiều giờ liền."
      },
      {
        "index": 11,
        "start": 37600,
        "end": 42559,
        "content": "I work all day, too. Same as you. I do",
        "words": generateWordTokens("I work all day, too. Same as you. I do"),
        "contentVi": "John: Tớ cũng làm việc cả ngày, giống cậu thôi. Tớ đâu có"
      },
      {
        "index": 12,
        "start": 40640,
        "end": 44960,
        "content": "not stay home and play.",
        "words": generateWordTokens("not stay home and play."),
        "contentVi": "ở nhà để chơi đâu."
      },
      {
        "index": 13,
        "start": 42559,
        "end": 46320,
        "content": "But you are the girl. Cooking is a",
        "words": generateWordTokens("But you are the girl. Cooking is a"),
        "contentVi": "Emma: Nhưng cậu là con gái mà. Nấu ăn là việc"
      },
      {
        "index": 14,
        "start": 44960,
        "end": 50239,
        "content": "girl's job.",
        "words": generateWordTokens("girl's job."),
        "contentVi": "của con gái."
      },
      {
        "index": 15,
        "start": 46320,
        "end": 54000,
        "content": "Girls job. John, today men and women are",
        "words": generateWordTokens("Girls job. John, today men and women are"),
        "contentVi": "John: Việc của con gái á? John này, ngày nay nam nữ bình đẳng"
      },
      {
        "index": 16,
        "start": 50239,
        "end": 56960,
        "content": "equal. We both work. We are both tired.",
        "words": generateWordTokens("equal. We both work. We are both tired."),
        "contentVi": "rồi. Cả hai chúng ta đều đi làm. Đều mệt mỏi như nhau."
      },
      {
        "index": 17,
        "start": 54000,
        "end": 59199,
        "content": "My mom works too, but she always cooks,",
        "words": generateWordTokens("My mom works too, but she always cooks,"),
        "contentVi": "Mẹ tớ cũng đi làm vậy, nhưng bà ấy luôn nấu ăn,"
      },
      {
        "index": 18,
        "start": 56960,
        "end": 60079,
        "content": "cleans the house, and takes care of the",
        "words": generateWordTokens("cleans the house, and takes care of the"),
        "contentVi": "dọn dẹp nhà cửa và chăm sóc"
      },
      {
        "index": 19,
        "start": 59199,
        "end": 62719,
        "content": "children.",
        "words": generateWordTokens("children."),
        "contentVi": "con cái đấy chứ."
      },
      {
        "index": 20,
        "start": 60079,
        "end": 63760,
        "content": "Then go date your mom, not me.",
        "words": generateWordTokens("Then go date your mom, not me."),
        "contentVi": "Emma: Thế thì cậu đi mà hẹn hò với mẹ cậu ấy, đừng hẹn hò với tớ."
      },
      {
        "index": 21,
        "start": 62719,
        "end": 67119,
        "content": "Emma,",
        "words": generateWordTokens("Emma,"),
        "contentVi": "John: Emma,"
      },
      {
        "index": 22,
        "start": 63760,
        "end": 69920,
        "content": "no. You think I am your maid. I work 9",
        "words": generateWordTokens("no. You think I am your maid. I work 9"),
        "contentVi": "Emma: không đời nào. Cậu nghĩ tớ là người giúp việc của cậu chắc. Tớ làm việc 9"
      },
      {
        "index": 23,
        "start": 67119,
        "end": 71680,
        "content": "hours, come home and cook for you, clean",
        "words": generateWordTokens("hours, come home and cook for you, clean"),
        "contentVi": "tiếng, về nhà lại phải nấu ăn cho cậu, dọn dẹp"
      },
      {
        "index": 24,
        "start": 69920,
        "end": 72400,
        "content": "for you. No way.",
        "words": generateWordTokens("for you. No way."),
        "contentVi": "cho cậu á? Không bao giờ."
      },
      {
        "index": 25,
        "start": 71680,
        "end": 74560,
        "content": "But,",
        "words": generateWordTokens("But,"),
        "contentVi": "John: Nhưng,"
      },
      {
        "index": 26,
        "start": 72400,
        "end": 77520,
        "content": "no buts. If you do not help with",
        "words": generateWordTokens("no buts. If you do not help with"),
        "contentVi": "Emma: không nhưng nhị gì cả. Nếu cậu không chịu phụ giúp"
      },
      {
        "index": 27,
        "start": 74560,
        "end": 80400,
        "content": "housework, do not ask me to do it.",
        "words": generateWordTokens("housework, do not ask me to do it."),
        "contentVi": "việc nhà thì đừng bắt tớ phải làm."
      },
      {
        "index": 28,
        "start": 77520,
        "end": 82799,
        "content": "Today, everything is equal. Men and",
        "words": generateWordTokens("Today, everything is equal. Men and"),
        "contentVi": "Ngày nay mọi thứ đều bình đẳng. Đàn ông và"
      },
      {
        "index": 29,
        "start": 80400,
        "end": 83840,
        "content": "women have the same rights and the same",
        "words": generateWordTokens("women have the same rights and the same"),
        "contentVi": "phụ nữ đều có quyền lợi và nghĩa vụ"
      },
      {
        "index": 30,
        "start": 82799,
        "end": 85600,
        "content": "duties.",
        "words": generateWordTokens("duties."),
        "contentVi": "như nhau."
      },
      {
        "index": 31,
        "start": 83840,
        "end": 89360,
        "content": "But tradition,",
        "words": generateWordTokens("But tradition,"),
        "contentVi": "John: Nhưng truyền thống,"
      },
      {
        "index": 32,
        "start": 85600,
        "end": 92479,
        "content": "tradition is old. Now it is 2025. Wake",
        "words": generateWordTokens("tradition is old. Now it is 2025. Wake"),
        "contentVi": "Emma: truyền thống xưa cũ rồi. Bây giờ là năm 2025 rồi."
      },
      {
        "index": 33,
        "start": 89360,
        "end": 95360,
        "content": "up, John. If you love me, help me. Share",
        "words": generateWordTokens("up, John. If you love me, help me. Share"),
        "contentVi": "Tỉnh lại đi John. Nếu cậu yêu tớ thì hãy giúp tớ. Chia sẻ"
      },
      {
        "index": 34,
        "start": 92479,
        "end": 97600,
        "content": "the work or find an oldstyle girl.",
        "words": generateWordTokens("the work or find an oldstyle girl."),
        "contentVi": "công việc hoặc đi tìm một cô gái kiểu truyền thống đi."
      },
      {
        "index": 35,
        "start": 95360,
        "end": 101040,
        "content": "Emma is very angry.",
        "words": generateWordTokens("Emma is very angry."),
        "contentVi": "John: Emma đang rất tức giận."
      },
      {
        "index": 36,
        "start": 97600,
        "end": 103680,
        "content": "Yes, very angry. I love you, but I am",
        "words": generateWordTokens("Yes, very angry. I love you, but I am"),
        "contentVi": "Emma: Đúng thế, rất tức giận. Tớ yêu cậu, nhưng tớ"
      },
      {
        "index": 37,
        "start": 101040,
        "end": 104960,
        "content": "not your slave. You must respect me or",
        "words": generateWordTokens("not your slave. You must respect me or"),
        "contentVi": "không phải nô lệ của cậu. Cậu phải tôn trọng tớ hoặc"
      },
      {
        "index": 38,
        "start": 103680,
        "end": 108640,
        "content": "we finish.",
        "words": generateWordTokens("we finish."),
        "contentVi": "chúng ta chia tay."
      },
      {
        "index": 39,
        "start": 104960,
        "end": 109600,
        "content": "Emma, wait. You are right. I am wrong.",
        "words": generateWordTokens("Emma, wait. You are right. I am wrong."),
        "contentVi": "John: Emma, đợi đã. Cậu nói đúng. Tớ sai rồi."
      },
      {
        "index": 40,
        "start": 108640,
        "end": 112880,
        "content": "Really?",
        "words": generateWordTokens("Really?"),
        "contentVi": "Emma: Thật chứ?"
      },
      {
        "index": 41,
        "start": 109600,
        "end": 115520,
        "content": "Really? I am sorry. I think the old way",
        "words": generateWordTokens("Really? I am sorry. I think the old way"),
        "contentVi": "John: Thật chứ? Tớ xin lỗi. Tớ đã suy nghĩ theo kiểu cũ"
      },
      {
        "index": 42,
        "start": 112880,
        "end": 118320,
        "content": "from my mom and dad, but you were right.",
        "words": generateWordTokens("from my mom and dad, but you were right."),
        "contentVi": "từ thời bố mẹ tớ, nhưng cậu đã đúng."
      },
      {
        "index": 43,
        "start": 115520,
        "end": 120320,
        "content": "We both work, so we both help.",
        "words": generateWordTokens("We both work, so we both help."),
        "contentVi": "Cả hai cùng đi làm thì cả hai cùng phụ giúp."
      },
      {
        "index": 44,
        "start": 118320,
        "end": 123040,
        "content": "Good. You see it now.",
        "words": generateWordTokens("Good. You see it now."),
        "contentVi": "Emma: Tốt lắm. Cuối cùng cậu cũng hiểu ra rồi."
      },
      {
        "index": 45,
        "start": 120320,
        "end": 125759,
        "content": "Tonight I do not ask you to cook. I take",
        "words": generateWordTokens("Tonight I do not ask you to cook. I take"),
        "contentVi": "John: Tối nay tớ không bắt cậu nấu ăn nữa. Tớ sẽ đưa"
      },
      {
        "index": 46,
        "start": 123040,
        "end": 126799,
        "content": "you to a restaurant. The best one. You",
        "words": generateWordTokens("you to a restaurant. The best one. You"),
        "contentVi": "cậu đến nhà hàng. Nhà hàng tốt nhất. Cậu chọn đi."
      },
      {
        "index": 47,
        "start": 125759,
        "end": 127920,
        "content": "choose.",
        "words": generateWordTokens("choose."),
        "contentVi": "Emma: Nhà hàng á?"
      },
      {
        "index": 48,
        "start": 126799,
        "end": 131440,
        "content": "Restaurant?",
        "words": generateWordTokens("Restaurant?"),
        "contentVi": "John: Đúng vậy. Và ngày mai tớ sẽ nấu ăn cho cậu. Món ăn đơn giản"
      },
      {
        "index": 49,
        "start": 127920,
        "end": 134080,
        "content": "Yes. And tomorrow I cook for you. Simple",
        "words": generateWordTokens("Yes. And tomorrow I cook for you. Simple"),
        "contentVi": "thôi, nhưng tớ sẽ cố gắng. Tớ hứa."
      },
      {
        "index": 50,
        "start": 131440,
        "end": 135280,
        "content": "food. But I try. I promise.",
        "words": generateWordTokens("food. But I try. I promise."),
        "contentVi": "Emma: Cậu nấu á?"
      },
      {
        "index": 51,
        "start": 134080,
        "end": 138160,
        "content": "You cook?",
        "words": generateWordTokens("You cook?"),
        "contentVi": "John: Đúng thế. Tối nay tớ sẽ học từ YouTube. Và"
      },
      {
        "index": 52,
        "start": 135280,
        "end": 139760,
        "content": "Yes. I learned from YouTube tonight. and",
        "words": generateWordTokens("Yes. I learned from YouTube tonight. and"),
        "contentVi": "chúng ta sẽ dọn dẹp nhà cửa cùng nhau vào"
      },
      {
        "index": 53,
        "start": 138160,
        "end": 141360,
        "content": "we clean the house together on the",
        "words": generateWordTokens("we clean the house together on the"),
        "contentVi": "cuối tuần. Chúng ta chia sẻ công việc."
      },
      {
        "index": 54,
        "start": 139760,
        "end": 144720,
        "content": "weekend. We share.",
        "words": generateWordTokens("weekend. We share."),
        "contentVi": "Emma: Ôi John, cảm ơn cậu. Giờ tớ hạnh phúc rồi."
      },
      {
        "index": 55,
        "start": 141360,
        "end": 147520,
        "content": "Oh, John, thank you. I'm happy now.",
        "words": generateWordTokens("Oh, John, thank you. I'm happy now."),
        "contentVi": "John: Tớ yêu cậu, Emma. Xin lỗi cậu nhiều."
      },
      {
        "index": 56,
        "start": 144720,
        "end": 149680,
        "content": "I love you, Emma. Sorry. Sorry.",
        "words": generateWordTokens("I love you, Emma. Sorry. Sorry."),
        "contentVi": "Emma: Tớ cũng yêu cậu. Nhưng hãy nhớ"
      },
      {
        "index": 57,
        "start": 147520,
        "end": 150879,
        "content": "I love you, too. But remember your",
        "words": generateWordTokens("I love you, too. But remember your"),
        "contentVi": "lời hứa của cậu đấy nhé."
      },
      {
        "index": 58,
        "start": 149680,
        "end": 153680,
        "content": "promise. Okay.",
        "words": generateWordTokens("promise. Okay."),
        "contentVi": "John: Tớ sẽ nhớ mãi mãi. Giờ chúng ta đi nhà hàng thôi."
      },
      {
        "index": 59,
        "start": 150879,
        "end": 156640,
        "content": "I remember forever. Now, let's go to the",
        "words": generateWordTokens("I remember forever. Now, let's go to the"),
        "contentVi": "Nữ hoàng của tớ chọn địa điểm nào."
      },
      {
        "index": 60,
        "start": 153680,
        "end": 158720,
        "content": "restaurant. My queen chooses the place.",
        "words": generateWordTokens("restaurant. My queen chooses the place."),
        "contentVi": "Emma: Được chứ. Đồ ăn Ý nhé."
      },
      {
        "index": 61,
        "start": 156640,
        "end": 161760,
        "content": "Yes. Italian food.",
        "words": generateWordTokens("Yes. Italian food."),
        "contentVi": "John: Đồ Ý à. Đi thôi nào. Ôm cái trước đã."
      },
      {
        "index": 62,
        "start": 158720,
        "end": 164319,
        "content": "Italian. Let's go. Hug first.",
        "words": generateWordTokens("Italian. Let's go. Hug first."),
        "contentVi": "Emma: Ôm thật chặt. Tớ yêu cậu, John."
      },
      {
        "index": 63,
        "start": 161760,
        "end": 168440,
        "content": "Big hug. I love you, John.",
        "words": generateWordTokens("Big hug. I love you, John."),
        "contentVi": "John: Tớ yêu cậu nhiều hơn, Emma."
      },
      {
        "index": 64,
        "start": 164319,
        "end": 168440,
        "content": "I love you more, Emma.",
        "words": generateWordTokens("I love you more, Emma."),
        "contentVi": "I love you more, Emma."
      }
    ]
  },

  "luyen-nghe-a2-tong-ket-2023": {
    "title": "Bài 3: Luyện Nghe Tiếng Anh Level A2- TỔNG KẾT 2023-",
    "audio_url": "WUaRqlnenq4",
    "repeat_offset": 216.32,
    "sentences": [
      {
        "index": 0,
        "start": 11840,
        "end": 17440,
        "content": "Now listen carefully.",
        "words": generateWordTokens("Now listen carefully."),
        "contentVi": "Bây giờ hãy lắng nghe thật kỹ."
      },
      {
        "index": 1,
        "start": 14400,
        "end": 18800,
        "content": "Tom, you know that hot Tik Tocker Mina,",
        "words": generateWordTokens("Tom, you know that hot Tik Tocker Mina,"),
        "contentVi": "Anna: Tom này, cậu biết cô nàng hot TikToker Mina"
      },
      {
        "index": 2,
        "start": 17440,
        "end": 21439,
        "content": "the dance girl?",
        "words": generateWordTokens("the dance girl?"),
        "contentVi": "nhảy múa đó chứ?"
      },
      {
        "index": 3,
        "start": 18800,
        "end": 24000,
        "content": "Yes, I know her. She dances very well.",
        "words": generateWordTokens("Yes, I know her. She dances very well."),
        "contentVi": "Tom: Có, tớ biết cô ấy. Cô ấy nhảy đẹp lắm."
      },
      {
        "index": 4,
        "start": 21439,
        "end": 26640,
        "content": "Before she always covered her face,",
        "words": generateWordTokens("Before she always covered her face,"),
        "contentVi": "Anna: Trước đây cô ấy toàn che mặt đúng không?"
      },
      {
        "index": 5,
        "start": 24000,
        "end": 28800,
        "content": "right? Only her eyes showed.",
        "words": generateWordTokens("right? Only her eyes showed."),
        "contentVi": "Chỉ lộ mỗi đôi mắt thôi."
      },
      {
        "index": 6,
        "start": 26640,
        "end": 30320,
        "content": "Yes. She said she was scared people",
        "words": generateWordTokens("Yes. She said she was scared people"),
        "contentVi": "Tom: Đúng thế. Cô ấy bảo sợ mọi người"
      },
      {
        "index": 7,
        "start": 28800,
        "end": 33360,
        "content": "would judge her looks.",
        "words": generateWordTokens("would judge her looks."),
        "contentVi": "sẽ phán xét ngoại hình của mình."
      },
      {
        "index": 8,
        "start": 30320,
        "end": 34719,
        "content": "But now she shows her full face. She is",
        "words": generateWordTokens("But now she shows her full face. She is"),
        "contentVi": "Anna: Nhưng bây giờ cô ấy đã lộ toàn bộ gương mặt. Cô ấy"
      },
      {
        "index": 9,
        "start": 33360,
        "end": 37120,
        "content": "very pretty.",
        "words": generateWordTokens("very pretty."),
        "contentVi": "rất xinh đẹp."
      },
      {
        "index": 10,
        "start": 34719,
        "end": 37760,
        "content": "Really pretty. Why did she show her face",
        "words": generateWordTokens("Really pretty. Why did she show her face"),
        "contentVi": "Tom: Rất xinh đẹp. Sao tự dưng"
      },
      {
        "index": 11,
        "start": 37120,
        "end": 40480,
        "content": "now?",
        "words": generateWordTokens("now?"),
        "contentVi": "bây giờ cô ấy lại lộ mặt thế?"
      },
      {
        "index": 12,
        "start": 37760,
        "end": 43360,
        "content": "Big problem. Last week she posted a",
        "words": generateWordTokens("Big problem. Last week she posted a"),
        "contentVi": "Anna: Vấn đề lớn đấy. Tuần trước cô ấy đăng một"
      },
      {
        "index": 13,
        "start": 40480,
        "end": 45440,
        "content": "video. The caption was, \"What is the",
        "words": generateWordTokens("video. The caption was, \"What is the"),
        "contentVi": "video. Dòng trạng thái là: 'Mục đích thực sự"
      },
      {
        "index": 14,
        "start": 43360,
        "end": 46879,
        "content": "real purpose of learning a new language",
        "words": generateWordTokens("real purpose of learning a new language"),
        "contentVi": "của việc học một ngôn ngữ mới hoàn toàn bằng tiếng Anh là gì?'"
      },
      {
        "index": 15,
        "start": 45440,
        "end": 48399,
        "content": "all in English?\"",
        "words": generateWordTokens("all in English?\""),
        "contentVi": "Tom: Được rồi. Và sau đó thì sao?"
      },
      {
        "index": 16,
        "start": 46879,
        "end": 51520,
        "content": "Okay. And then",
        "words": generateWordTokens("Okay. And then"),
        "contentVi": "Anna: Bùm, rất nhiều người đã tức giận. Họ viết:"
      },
      {
        "index": 17,
        "start": 48399,
        "end": 54079,
        "content": "boom, many people got angry. They wrote,",
        "words": generateWordTokens("boom, many people got angry. They wrote,"),
        "contentVi": "'Đây không phải việc của cô. Chỉ lo nhảy đi."
      },
      {
        "index": 18,
        "start": 51520,
        "end": 56480,
        "content": "\"This is not your business. Just dance.",
        "words": generateWordTokens("\"This is not your business. Just dance."),
        "contentVi": "Che mặt lại đi. Ngừng nói tiếng Anh đi'."
      },
      {
        "index": 19,
        "start": 54079,
        "end": 59199,
        "content": "Cover your face again. Stop speaking",
        "words": generateWordTokens("Cover your face again. Stop speaking"),
        "contentVi": "Những bình luận rất ác ý."
      },
      {
        "index": 20,
        "start": 56480,
        "end": 61600,
        "content": "English. Very mean comments.",
        "words": generateWordTokens("English. Very mean comments."),
        "contentVi": "Tom: Tại sao chứ? Đó chỉ là một câu hỏi thôi mà."
      },
      {
        "index": 21,
        "start": 59199,
        "end": 63840,
        "content": "Why? It was only one question.",
        "words": generateWordTokens("Why? It was only one question."),
        "contentVi": "Anna: Họ gọi cô ấy là một 'pick me girl'."
      },
      {
        "index": 22,
        "start": 61600,
        "end": 66320,
        "content": "They called her a pickme girl.",
        "words": generateWordTokens("They called her a pickme girl."),
        "contentVi": "Tom: Pick me girl à. Cụm từ đó nghĩa là gì thế?"
      },
      {
        "index": 23,
        "start": 63840,
        "end": 68240,
        "content": "Pick me girl. What does that mean?",
        "words": generateWordTokens("Pick me girl. What does that mean?"),
        "contentVi": "Anna: Nghĩa là một cô gái cố tỏ ra khác biệt"
      },
      {
        "index": 24,
        "start": 66320,
        "end": 70720,
        "content": "It means a girl who acts different",
        "words": generateWordTokens("It means a girl who acts different"),
        "contentVi": "vì cô ấy muốn con trai thích mình."
      },
      {
        "index": 25,
        "start": 68240,
        "end": 73840,
        "content": "because she wants boys to like her.",
        "words": generateWordTokens("because she wants boys to like her."),
        "contentVi": "Kiểu như: xem kìa, tớ vừa nhảy đẹp lại vừa"
      },
      {
        "index": 26,
        "start": 70720,
        "end": 76640,
        "content": "Like, look, I dance beautifully and I am",
        "words": generateWordTokens("Like, look, I dance beautifully and I am"),
        "contentVi": "thông minh, lại biết nói tiếng Anh nữa. Hãy chọn tớ đi."
      },
      {
        "index": 27,
        "start": 73840,
        "end": 78960,
        "content": "smart and I speak English. Chance me.",
        "words": generateWordTokens("smart and I speak English. Chance me."),
        "contentVi": "Tom: À, kiểu như thích thể hiện."
      },
      {
        "index": 28,
        "start": 76640,
        "end": 81119,
        "content": "Ah, like showing off.",
        "words": generateWordTokens("Ah, like showing off."),
        "contentVi": "Anna: Đúng thế. Họ bảo cô ấy muốn tỏ ra đặc biệt"
      },
      {
        "index": 29,
        "start": 78960,
        "end": 84080,
        "content": "Yes. They said she wanted to look",
        "words": generateWordTokens("Yes. They said she wanted to look"),
        "contentVi": "để thu hút sự chú ý từ con trai. Nhưng cô ấy chỉ hỏi một câu hỏi thôi mà."
      },
      {
        "index": 30,
        "start": 81119,
        "end": 86240,
        "content": "special and get attention from boys. But",
        "words": generateWordTokens("special and get attention from boys. But"),
        "contentVi": "Tom: Mọi người vẫn nói: 'Cô là vũ công,"
      },
      {
        "index": 31,
        "start": 84080,
        "end": 88880,
        "content": "she only asked one question.",
        "words": generateWordTokens("she only asked one question."),
        "contentVi": "chứ không phải giáo viên. Hãy im lặng đi'."
      },
      {
        "index": 32,
        "start": 86240,
        "end": 91040,
        "content": "People still said, \"You are a dancer,",
        "words": generateWordTokens("People still said, \"You are a dancer,"),
        "contentVi": "Anna: Khi mọi người viết những bình luận ác ý đó, cô ấy đã làm gì?"
      },
      {
        "index": 33,
        "start": 88880,
        "end": 93360,
        "content": "not a teacher. Be quiet.\"",
        "words": generateWordTokens("not a teacher. Be quiet.\""),
        "contentVi": "Tom: Cô ấy đã chặn rất nhiều người. Hoặc cô ấy"
      },
      {
        "index": 34,
        "start": 91040,
        "end": 94240,
        "content": "When people wrote bad comments, what did",
        "words": generateWordTokens("When people wrote bad comments, what did"),
        "contentVi": "trả lời lại: 'Bạn là một con robot chứ không phải người thật'."
      },
      {
        "index": 35,
        "start": 93360,
        "end": 96640,
        "content": "she do?",
        "words": generateWordTokens("she do?"),
        "contentVi": "Anna: Thế là mọi người lại càng tức giận hơn."
      },
      {
        "index": 36,
        "start": 94240,
        "end": 98960,
        "content": "She blocked many people. Or she",
        "words": generateWordTokens("She blocked many people. Or she"),
        "contentVi": "Tom: Đúng thế, giờ đây có hàng ngàn bình luận ghét bỏ"
      },
      {
        "index": 37,
        "start": 96640,
        "end": 100560,
        "content": "answered, \"You are a bot, not a real",
        "words": generateWordTokens("answered, \"You are a bot, not a real"),
        "contentVi": "mỗi ngày. 'Giả tạo', 'Pick me',"
      },
      {
        "index": 38,
        "start": 98960,
        "end": 102720,
        "content": "person.\"",
        "words": generateWordTokens("person.\""),
        "contentVi": "'Cô nàng hám fame'. Vụ drama này cực kỳ lớn."
      },
      {
        "index": 39,
        "start": 100560,
        "end": 105040,
        "content": "Now more people became angry.",
        "words": generateWordTokens("Now more people became angry."),
        "contentVi": "Anna: Tội nghiệp Mina. Cô ấy chỉ lộ mặt và"
      },
      {
        "index": 40,
        "start": 102720,
        "end": 108240,
        "content": "Yes, now there are thousands of hate",
        "words": generateWordTokens("Yes, now there are thousands of hate"),
        "contentVi": "hỏi một câu bằng tiếng Anh thôi mà."
      },
      {
        "index": 41,
        "start": 105040,
        "end": 111439,
        "content": "comments every day. Fake. Pick me.",
        "words": generateWordTokens("comments every day. Fake. Pick me."),
        "contentVi": "Tom: Chính xác. Cô ấy đã khóc trên livestream. Cô ấy nói: 'Tớ"
      },
      {
        "index": 42,
        "start": 108240,
        "end": 114159,
        "content": "Attention girl. The drama is super big.",
        "words": generateWordTokens("Attention girl. The drama is super big."),
        "contentVi": "chỉ muốn chia sẻ ý kiến của mình thôi. Tại sao mọi người lại ghét tớ?'"
      },
      {
        "index": 43,
        "start": 111439,
        "end": 116320,
        "content": "Poor Mina. She only showed her face and",
        "words": generateWordTokens("Poor Mina. She only showed her face and"),
        "contentVi": "Anna: Tớ thấy thương cho cô ấy quá."
      },
      {
        "index": 44,
        "start": 114159,
        "end": 119759,
        "content": "asked one English question.",
        "words": generateWordTokens("asked one English question."),
        "contentVi": "Tom: Tớ cũng vậy. Mạng Internet thật đáng sợ. Chỉ một"
      },
      {
        "index": 45,
        "start": 116320,
        "end": 122320,
        "content": "Exactly. She cried on live. She said, \"I",
        "words": generateWordTokens("Exactly. She cried on live. She said, \"I"),
        "contentVi": "video nhỏ cũng biến thành một cuộc chiến lớn."
      },
      {
        "index": 46,
        "start": 119759,
        "end": 123280,
        "content": "only wanted to share my idea. Why do you",
        "words": generateWordTokens("only wanted to share my idea. Why do you"),
        "contentVi": "Anna: Lần tới chúng ta chỉ xem cô ấy nhảy và"
      },
      {
        "index": 47,
        "start": 122320,
        "end": 125040,
        "content": "hate me?\"",
        "words": generateWordTokens("hate me?\""),
        "contentVi": "không đọc bình luận nữa nhé."
      },
      {
        "index": 48,
        "start": 123280,
        "end": 128720,
        "content": "I feel sad for her.",
        "words": generateWordTokens("I feel sad for her."),
        "contentVi": "Tom: Nhất trí. Mina tội nghiệp. Hy vọng cô ấy ổn."
      },
      {
        "index": 49,
        "start": 125040,
        "end": 131200,
        "content": "Me too. The internet is very scary. One",
        "words": generateWordTokens("Me too. The internet is very scary. One"),
        "contentVi": "Anna: Tớ hy vọng vụ drama này sớm kết thúc. Chỉ cần"
      },
      {
        "index": 50,
        "start": 128720,
        "end": 133760,
        "content": "small video becomes a big war.",
        "words": generateWordTokens("small video becomes a big war."),
        "contentVi": "nhảy thôi, không cần nói gì cả."
      },
      {
        "index": 51,
        "start": 131200,
        "end": 135120,
        "content": "Next time we only watch her dance and we",
        "words": generateWordTokens("Next time we only watch her dance and we"),
        "contentVi": "Tom: Khoan đã, còn có thêm tin tức nữa này. Mọi người bảo"
      },
      {
        "index": 52,
        "start": 133760,
        "end": 138640,
        "content": "don't read comments.",
        "words": generateWordTokens("don't read comments."),
        "contentVi": "Mina đã tốt nghiệp một trường đại học hàng đầu ở"
      },
      {
        "index": 53,
        "start": 135120,
        "end": 141120,
        "content": "Deal. Poor Mina. I hope she is okay.",
        "words": generateWordTokens("Deal. Poor Mina. I hope she is okay."),
        "contentVi": "Việt Nam. Khoa tiếng Anh."
      },
      {
        "index": 54,
        "start": 138640,
        "end": 143040,
        "content": "I hope the drama finishes soon. Just",
        "words": generateWordTokens("I hope the drama finishes soon. Just"),
        "contentVi": "Anna: Thật á? Trường đại học hàng đầu sao?"
      },
      {
        "index": 55,
        "start": 141120,
        "end": 145599,
        "content": "dance. No talking.",
        "words": generateWordTokens("dance. No talking."),
        "contentVi": "Tom: Đúng thế, một trường rất nổi tiếng. Nhưng bằng của cô ấy"
      },
      {
        "index": 56,
        "start": 143040,
        "end": 148080,
        "content": "Wait, there is more news. People say",
        "words": generateWordTokens("Wait, there is more news. People say"),
        "contentVi": "chỉ là loại khá chứ không phải xuất sắc."
      },
      {
        "index": 57,
        "start": 145599,
        "end": 150160,
        "content": "Mina graduated from a top university in",
        "words": generateWordTokens("Mina graduated from a top university in"),
        "contentVi": "Anna: Và sau đó thì sao?"
      },
      {
        "index": 58,
        "start": 148080,
        "end": 152400,
        "content": "Vietnam. English major.",
        "words": generateWordTokens("Vietnam. English major."),
        "contentVi": "Tom: Mọi người lại càng tức giận hơn nữa. Họ nói: 'Trường"
      },
      {
        "index": 59,
        "start": 150160,
        "end": 155599,
        "content": "Really? A top university?",
        "words": generateWordTokens("Really? A top university?"),
        "contentVi": "đại học hàng đầu nhưng bằng chỉ loại khá. Cô không"
      },
      {
        "index": 60,
        "start": 152400,
        "end": 158640,
        "content": "Yes, a very famous one. But her diploma",
        "words": generateWordTokens("Yes, a very famous one. But her diploma"),
        "contentVi": "thông minh đâu. Đừng tỏ ra thông minh nữa'."
      },
      {
        "index": 61,
        "start": 155599,
        "end": 159680,
        "content": "was only good, not excellent.",
        "words": generateWordTokens("was only good, not excellent."),
        "contentVi": "Anna: Như thế thật quá tàn nhẫn. Nhiều TikToker nổi tiếng"
      },
      {
        "index": 62,
        "start": 158640,
        "end": 162800,
        "content": "And then",
        "words": generateWordTokens("And then"),
        "contentVi": "đã làm video về chuyện này. Họ"
      },
      {
        "index": 63,
        "start": 159680,
        "end": 165120,
        "content": "people got even angrier. They said, \"Top",
        "words": generateWordTokens("people got even angrier. They said, \"Top"),
        "contentVi": "còn trưng ra hình chụp bằng tốt nghiệp của cô ấy và nói:"
      },
      {
        "index": 64,
        "start": 162800,
        "end": 167599,
        "content": "university, but only good grade. You are",
        "words": generateWordTokens("university, but only good grade. You are"),
        "contentVi": "'Xem đi, cô ta cũng chỉ bình thường thôi'."
      },
      {
        "index": 65,
        "start": 165120,
        "end": 170319,
        "content": "not smart. Stop acting smart.",
        "words": generateWordTokens("not smart. Stop acting smart."),
        "contentVi": "Tom: Họ chia sẻ cả giấy tờ cá nhân của cô ấy sao?"
      },
      {
        "index": 66,
        "start": 167599,
        "end": 172239,
        "content": "That is too cruel.\" Many famous Tik",
        "words": generateWordTokens("That is too cruel.\" Many famous Tik"),
        "contentVi": "Anna: Đúng thế. Giờ đây ai cũng bàn tán về"
      },
      {
        "index": 67,
        "start": 170319,
        "end": 174319,
        "content": "Tockers made videos about it. They",
        "words": generateWordTokens("Tockers made videos about it. They"),
        "contentVi": "điểm số của cô ấy."
      },
      {
        "index": 68,
        "start": 172239,
        "end": 177040,
        "content": "showed photos of her diploma. They said,",
        "words": generateWordTokens("showed photos of her diploma. They said,"),
        "contentVi": "Tom: Khi nào chuyện này mới dừng lại đây?"
      },
      {
        "index": 69,
        "start": 174319,
        "end": 179280,
        "content": "\"See, she is only normal.\"",
        "words": generateWordTokens("\"See, she is only normal.\""),
        "contentVi": "Anna: Gần 1 tháng rồi đấy. Và Mina vẫn chưa"
      },
      {
        "index": 70,
        "start": 177040,
        "end": 181680,
        "content": "They shared her private paper.",
        "words": generateWordTokens("They shared her private paper."),
        "contentVi": "đăng bất kỳ video mới nào. Không nhảy, không"
      },
      {
        "index": 71,
        "start": 179280,
        "end": 182720,
        "content": "Yes. Now everyone talks about her",
        "words": generateWordTokens("Yes. Now everyone talks about her"),
        "contentVi": "story, không gì cả. Tài khoản của cô ấy"
      },
      {
        "index": 72,
        "start": 181680,
        "end": 184159,
        "content": "grades.",
        "words": generateWordTokens("grades."),
        "contentVi": "hoàn toàn im ắng rồi."
      },
      {
        "index": 73,
        "start": 182720,
        "end": 187040,
        "content": "When will this stop?",
        "words": generateWordTokens("When will this stop?"),
        "contentVi": "Anna: Cô ấy đang trốn tránh sao?"
      },
      {
        "index": 74,
        "start": 184159,
        "end": 189920,
        "content": "Almost 1 month already. And Mina has not",
        "words": generateWordTokens("Almost 1 month already. And Mina has not"),
        "contentVi": "Tom: Có lẽ vậy, hoặc cô ấy đang rất tổn thương. Tớ nghĩ cô ấy"
      },
      {
        "index": 75,
        "start": 187040,
        "end": 192400,
        "content": "posted any new video. No dance, no",
        "words": generateWordTokens("posted any new video. No dance, no"),
        "contentVi": "khóc mỗi ngày mất."
      },
      {
        "index": 76,
        "start": 189920,
        "end": 194080,
        "content": "story, nothing. Her account is",
        "words": generateWordTokens("story, nothing. Her account is"),
        "contentVi": "Anna: Tội nghiệp cô bé. Đầu tiên là gương mặt, rồi đến tiếng Anh,"
      },
      {
        "index": 77,
        "start": 192400,
        "end": 195440,
        "content": "completely quiet now.",
        "words": generateWordTokens("completely quiet now."),
        "contentVi": "giờ lại là điểm số đại học. Mọi người tấn công mọi thứ."
      },
      {
        "index": 78,
        "start": 194080,
        "end": 199280,
        "content": "She is hiding",
        "words": generateWordTokens("She is hiding"),
        "contentVi": "Tom: Tớ nhớ các điệu nhảy của cô ấy quá. TikTok chẳng còn"
      },
      {
        "index": 79,
        "start": 195440,
        "end": 200640,
        "content": "maybe or she is very hurt. I think she",
        "words": generateWordTokens("maybe or she is very hurt. I think she"),
        "contentVi": "vui nếu thiếu Mina."
      },
      {
        "index": 80,
        "start": 199280,
        "end": 203760,
        "content": "cries every day.",
        "words": generateWordTokens("cries every day."),
        "contentVi": "Anna: Tớ cũng thế. Tớ hy vọng một ngày nào đó cô ấy sẽ quay lại thật mạnh mẽ."
      },
      {
        "index": 81,
        "start": 200640,
        "end": 206640,
        "content": "Poor girl. First her face, then English,",
        "words": generateWordTokens("Poor girl. First her face, then English,"),
        "contentVi": "Tom: Đúng thế, chúng ta sẽ đợi cô ấy. Không ghét bỏ, chỉ có"
      },
      {
        "index": 82,
        "start": 203760,
        "end": 207599,
        "content": "now her university grades. People attack",
        "words": generateWordTokens("now her university grades. People attack"),
        "contentVi": "yêu thương thôi."
      },
      {
        "index": 83,
        "start": 206640,
        "end": 210560,
        "content": "everything.",
        "words": generateWordTokens("everything."),
        "contentVi": "Anna: Chỉ yêu thương thôi. Mina, cố lên nhé."
      },
      {
        "index": 84,
        "start": 207599,
        "end": 211840,
        "content": "I miss her dances. Tik Tok is not fun",
        "words": generateWordTokens("I miss her dances. Tik Tok is not fun"),
        "contentVi": "Tom: Cố lên. Hãy sớm quay lại nhé Mina. Chúng tớ"
      },
      {
        "index": 85,
        "start": 210560,
        "end": 214480,
        "content": "without Mina.",
        "words": generateWordTokens("without Mina."),
        "contentVi": "ủng hộ cậu."
      },
      {
        "index": 86,
        "start": 211840,
        "end": 215200,
        "content": "Me too. I hope she comes back strong one",
        "words": generateWordTokens("Me too. I hope she comes back strong one"),
        "contentVi": "Anna: Chúng tớ luôn ủng hộ cậu."
      },
      {
        "index": 87,
        "start": 214480,
        "end": 218080,
        "content": "day.",
        "words": generateWordTokens("day."),
        "contentVi": "day."
      },
      {
        "index": 88,
        "start": 215200,
        "end": 218959,
        "content": "Yes, we will wait for her. No hate, only",
        "words": generateWordTokens("Yes, we will wait for her. No hate, only"),
        "contentVi": "Yes, we will wait for her. No hate, only"
      },
      {
        "index": 89,
        "start": 218080,
        "end": 221920,
        "content": "love.",
        "words": generateWordTokens("love."),
        "contentVi": "love."
      },
      {
        "index": 90,
        "start": 218959,
        "end": 224000,
        "content": "Only love. Mina, fighting.",
        "words": generateWordTokens("Only love. Mina, fighting."),
        "contentVi": "Only love. Mina, fighting."
      },
      {
        "index": 91,
        "start": 221920,
        "end": 225040,
        "content": "Fighting. Come back soon, Mina. We",
        "words": generateWordTokens("Fighting. Come back soon, Mina. We"),
        "contentVi": "Fighting. Come back soon, Mina. We"
      },
      {
        "index": 92,
        "start": 224000,
        "end": 229000,
        "content": "support you.",
        "words": generateWordTokens("support you."),
        "contentVi": "support you."
      },
      {
        "index": 93,
        "start": 225040,
        "end": 229000,
        "content": "We always support you.",
        "words": generateWordTokens("We always support you."),
        "contentVi": "We always support you."
      }
    ]
  },

  "luyen-nghe-a2-0w8puijv6vi": {
    "title": "Luyện Nghe Tiếng Anh Level A2- TỔNG KẾT 2022-",
    "audio_url": "0W8puiJv6VI",
    "repeat_offset": 107.52,
    "sentences": [
      {
        "index": 0,
        "start": 11679,
        "end": 6493,
        "content": "Now listen carefully.",
        "words": generateWordTokens("Now listen carefully."),
        "contentVi": "Bây giờ hãy lắng nghe cẩn thận."
      },
      {
        "index": 1,
        "start": 14240,
        "end": 6973,
        "content": "Excuse me, uncle. This pink dress. Wow.",
        "words": generateWordTokens("Excuse me, uncle. This pink dress. Wow."),
        "contentVi": "Xin lỗi chú. Chiếc váy màu hồng này. Ồ."
      },
      {
        "index": 2,
        "start": 18160,
        "end": 5618,
        "content": "Very, very beautiful. How much?",
        "words": generateWordTokens("Very, very beautiful. How much?"),
        "contentVi": "Rất, rất đẹp. Bao nhiêu?"
      },
      {
        "index": 3,
        "start": 21199,
        "end": 6662,
        "content": "Good morning, sister. This one newest",
        "words": generateWordTokens("Good morning, sister. This one newest"),
        "contentVi": "Chào buổi sáng, chị. Cái này mới nhất"
      },
      {
        "index": 4,
        "start": 23760,
        "end": 5943,
        "content": "style. Super soft real cotton. Only",
        "words": generateWordTokens("style. Super soft real cotton. Only"),
        "contentVi": "phong cách. Chất cotton thật siêu mềm. Chỉ một"
      },
      {
        "index": 5,
        "start": 27840,
        "end": 7708,
        "content": "300,000.",
        "words": generateWordTokens("300,000."),
        "contentVi": "300.000."
      },
      {
        "index": 6,
        "start": 29679,
        "end": 10271,
        "content": "300 too expensive 100,000 I buy now",
        "words": generateWordTokens("300 too expensive 100,000 I buy now"),
        "contentVi": "300 đắt quá 100.000 tôi mua ngay"
      },
      {
        "index": 7,
        "start": 35520,
        "end": 9395,
        "content": "100 sister you want me close shop today",
        "words": generateWordTokens("100 sister you want me close shop today"),
        "contentVi": "100 chị ơi hôm nay chị muốn em đóng cửa hàng nhé"
      },
      {
        "index": 8,
        "start": 39920,
        "end": 9159,
        "content": "this is good brand not cheap fake 280",
        "words": generateWordTokens("this is good brand not cheap fake 280"),
        "contentVi": "đây là thương hiệu tốt không rẻ giả 280"
      },
      {
        "index": 9,
        "start": 44879,
        "end": 9486,
        "content": "all dresses say good brand 120 okay",
        "words": generateWordTokens("all dresses say good brand 120 okay"),
        "contentVi": "tất cả các trang phục đều nói thương hiệu tốt 120 được rồi"
      },
      {
        "index": 10,
        "start": 49039,
        "end": 6530,
        "content": "my cost already 250 cannot 270 last",
        "words": generateWordTokens("my cost already 250 cannot 270 last"),
        "contentVi": "chi phí của tôi đã 250 không thể kéo dài 270"
      },
      {
        "index": 11,
        "start": 54320,
        "end": 5973,
        "content": "price",
        "words": generateWordTokens("price"),
        "contentVi": "giá "
      },
      {
        "index": 12,
        "start": 55520,
        "end": 5816,
        "content": "270 still high same dress Next shop only",
        "words": generateWordTokens("270 still high same dress Next shop only"),
        "contentVi": "270 vẫn cao cùng đầm Next shop thôi"
      },
      {
        "index": 13,
        "start": 60239,
        "end": 4380,
        "content": "150.",
        "words": generateWordTokens("150."),
        "contentVi": "150."
      },
      {
        "index": 14,
        "start": 61280,
        "end": 6461,
        "content": "Next shop. That one thin thin washed two",
        "words": generateWordTokens("Next shop. That one thin thin washed two"),
        "contentVi": "Cửa hàng tiếp theo. Cái đó mỏng mỏng rửa sạch hai"
      },
      {
        "index": 15,
        "start": 64559,
        "end": 7186,
        "content": "times already broken. This one where one",
        "words": generateWordTokens("times already broken. This one where one"),
        "contentVi": "lần đã tan vỡ. Cái này nơi một"
      },
      {
        "index": 16,
        "start": 67680,
        "end": 5827,
        "content": "year still new. 260",
        "words": generateWordTokens("year still new. 260"),
        "contentVi": "năm còn mới. 260"
      },
      {
        "index": 17,
        "start": 71680,
        "end": 3992,
        "content": "160",
        "words": generateWordTokens("160"),
        "contentVi": "160"
      },
      {
        "index": 18,
        "start": 73439,
        "end": 3354,
        "content": "255",
        "words": generateWordTokens("255"),
        "contentVi": "255"
      },
      {
        "index": 19,
        "start": 75600,
        "end": 3036,
        "content": "170",
        "words": generateWordTokens("170"),
        "contentVi": "170"
      },
      {
        "index": 20,
        "start": 76720,
        "end": 3037,
        "content": "250",
        "words": generateWordTokens("250"),
        "contentVi": "250"
      },
      {
        "index": 21,
        "start": 78560,
        "end": 3359,
        "content": "180",
        "words": generateWordTokens("180"),
        "contentVi": "180"
      },
      {
        "index": 22,
        "start": 79680,
        "end": 3440,
        "content": "245",
        "words": generateWordTokens("245"),
        "contentVi": "245"
      },
      {
        "index": 23,
        "start": 81840,
        "end": 2962,
        "content": "190",
        "words": generateWordTokens("190"),
        "contentVi": "190"
      },
      {
        "index": 24,
        "start": 83040,
        "end": 3202,
        "content": "240",
        "words": generateWordTokens("240"),
        "contentVi": "240"
      },
      {
        "index": 25,
        "start": 84720,
        "end": 3285,
        "content": "195",
        "words": generateWordTokens("195"),
        "contentVi": "195"
      },
      {
        "index": 26,
        "start": 86159,
        "end": 4167,
        "content": "235",
        "words": generateWordTokens("235"),
        "contentVi": "235"
      },
      {
        "index": 27,
        "start": 87920,
        "end": 4647,
        "content": "uncle please.",
        "words": generateWordTokens("uncle please."),
        "contentVi": "xin vui lòng chú."
      },
      {
        "index": 28,
        "start": 90240,
        "end": 5850,
        "content": "200 final",
        "words": generateWordTokens("200 final"),
        "contentVi": "200 trận chung kết"
      },
      {
        "index": 29,
        "start": 92479,
        "end": 9133,
        "content": "230 help me little bit sister",
        "words": generateWordTokens("230 help me little bit sister"),
        "contentVi": "230 giúp em với chị ơi"
      },
      {
        "index": 30,
        "start": 96000,
        "end": 7696,
        "content": "I am student I have no money 205",
        "words": generateWordTokens("I am student I have no money 205"),
        "contentVi": "Tôi là sinh viên tôi không có tiền 205"
      },
      {
        "index": 31,
        "start": 101520,
        "end": 3942,
        "content": "225",
        "words": generateWordTokens("225"),
        "contentVi": "225"
      },
      {
        "index": 32,
        "start": 103600,
        "end": 3784,
        "content": "210",
        "words": generateWordTokens("210"),
        "contentVi": "210"
      },
      {
        "index": 33,
        "start": 105360,
        "end": 6504,
        "content": "220",
        "words": generateWordTokens("220"),
        "contentVi": "220"
      },
      {
        "index": 34,
        "start": 107280,
        "end": 10107,
        "content": "okay 215 last last",
        "words": generateWordTokens("okay 215 last last"),
        "contentVi": "được rồi 215 cuối cùng"
      },
      {
        "index": 35,
        "start": 111759,
        "end": 10112,
        "content": "I you kill me 215 I accept my heart",
        "words": generateWordTokens("I you kill me 215 I accept my heart"),
        "contentVi": "Tôi anh giết tôi 215 Tôi chấp nhận trái tim mình"
      },
      {
        "index": 36,
        "start": 117280,
        "end": 5717,
        "content": "break already Really? 215. Thank you,",
        "words": generateWordTokens("break already Really? 215. Thank you,"),
        "contentVi": "đã tan vỡ rồi Thật sao? 215. Cảm ơn bạn,"
      }
    ]
  },

  "luyen-nghe-a2-03_ajexxut0": {
    "title": "Luyện Nghe Tiếng Anh Level A2- TỔNG KẾT 2021-",
    "audio_url": "03_Ajexxut0",
    "repeat_offset": 110.96,
    "sentences": [
      {
        "index": 0,
        "start": 11759,
        "end": 4173,
        "content": "Now listen carefully.",
        "words": generateWordTokens("Now listen carefully."),
        "contentVi": "Bây giờ hãy lắng nghe cẩn thận."
      },
      {
        "index": 1,
        "start": 14240,
        "end": 4654,
        "content": "Mom, I'm home.",
        "words": generateWordTokens("Mom, I'm home."),
        "contentVi": "Mẹ ơi, con về rồi."
      },
      {
        "index": 2,
        "start": 15920,
        "end": 3295,
        "content": "Alex, my son, finally. Come here. Hug",
        "words": generateWordTokens("Alex, my son, finally. Come here. Hug"),
        "contentVi": "Alex, con trai tôi, cuối cùng. Hãy đến đây. Ôm"
      },
      {
        "index": 3,
        "start": 18880,
        "end": 1699,
        "content": "me.",
        "words": generateWordTokens("me."),
        "contentVi": "Tôi."
      },
      {
        "index": 4,
        "start": 19199,
        "end": 4259,
        "content": "I miss you, Mom.",
        "words": generateWordTokens("I miss you, Mom."),
        "contentVi": "Con nhớ mẹ, mẹ."
      },
      {
        "index": 5,
        "start": 20560,
        "end": 4660,
        "content": "Miss me? You only come home two times a",
        "words": generateWordTokens("Miss me? You only come home two times a"),
        "contentVi": "Nhớ tôi à? Bạn chỉ về nhà hai lần một"
      },
      {
        "index": 6,
        "start": 23439,
        "end": 3783,
        "content": "year. Why not come more?",
        "words": generateWordTokens("year. Why not come more?"),
        "contentVi": "năm. Tại sao không đến nhiều hơn?"
      },
      {
        "index": 7,
        "start": 25199,
        "end": 5466,
        "content": "I am very busy with work.",
        "words": generateWordTokens("I am very busy with work."),
        "contentVi": "Tôi rất bận rộn với công việc."
      },
      {
        "index": 8,
        "start": 27199,
        "end": 4668,
        "content": "Busy, busy, busy. Everyone is busy. When",
        "words": generateWordTokens("Busy, busy, busy. Everyone is busy. When"),
        "contentVi": "Bận, bận, bận. Mọi người đều bận rộn. Khi"
      },
      {
        "index": 9,
        "start": 30640,
        "end": 4110,
        "content": "do you get married?",
        "words": generateWordTokens("do you get married?"),
        "contentVi": "bạn có kết hôn không?"
      },
      {
        "index": 10,
        "start": 31840,
        "end": 6112,
        "content": "Mom, I just arrived 2 minutes ago.",
        "words": generateWordTokens("Mom, I just arrived 2 minutes ago."),
        "contentVi": "Mẹ ơi, con vừa tới đây 2 phút trước."
      },
      {
        "index": 11,
        "start": 34719,
        "end": 4836,
        "content": "2 minutes is enough. You almost 29.",
        "words": generateWordTokens("2 minutes is enough. You almost 29."),
        "contentVi": "2 phút là đủ. Bạn gần 29 rồi."
      },
      {
        "index": 12,
        "start": 37920,
        "end": 5558,
        "content": "When? When? When?",
        "words": generateWordTokens("When? When? When?"),
        "contentVi": "Khi? Khi? Khi?"
      },
      {
        "index": 13,
        "start": 39520,
        "end": 6840,
        "content": "I I want good job first. House car.",
        "words": generateWordTokens("I I want good job first. House car."),
        "contentVi": "Tôi muốn công việc tốt trước tiên. Xe nhà."
      },
      {
        "index": 14,
        "start": 43440,
        "end": 5963,
        "content": "House car. My friend's son married with",
        "words": generateWordTokens("House car. My friend's son married with"),
        "contentVi": "Xe nhà. Con trai của bạn tôi lấy vợ"
      },
      {
        "index": 15,
        "start": 46320,
        "end": 5486,
        "content": "nothing. Now they have two babies.",
        "words": generateWordTokens("nothing. Now they have two babies."),
        "contentVi": "Không có gì. Bây giờ họ đã có hai đứa con."
      },
      {
        "index": 16,
        "start": 49360,
        "end": 5888,
        "content": "Mom, I am not your friend's son.",
        "words": generateWordTokens("Mom, I am not your friend's son."),
        "contentVi": "Mẹ ơi, con không phải con của bạn mẹ."
      },
      {
        "index": 17,
        "start": 51760,
        "end": 7331,
        "content": "Okay, tell me truth. Are you gay?",
        "words": generateWordTokens("Okay, tell me truth. Are you gay?"),
        "contentVi": "Được rồi, hãy nói cho tôi sự thật. Bạn có phải là người đồng tính không?"
      },
      {
        "index": 18,
        "start": 55199,
        "end": 5255,
        "content": "Mom, no. Why no girlfriend then? You",
        "words": generateWordTokens("Mom, no. Why no girlfriend then? You"),
        "contentVi": "Mẹ, không. Tại sao lại không có bạn gái? Bạn"
      },
      {
        "index": 19,
        "start": 59039,
        "end": 3980,
        "content": "like boys?",
        "words": generateWordTokens("like boys?"),
        "contentVi": "thích con trai?"
      },
      {
        "index": 20,
        "start": 60399,
        "end": 5421,
        "content": "I like girls very very much.",
        "words": generateWordTokens("I like girls very very much."),
        "contentVi": "Tôi rất thích các cô gái."
      },
      {
        "index": 21,
        "start": 62960,
        "end": 4703,
        "content": "Prove it. Where is she?",
        "words": generateWordTokens("Prove it. Where is she?"),
        "contentVi": "Chứng minh điều đó. Cô ấy ở đâu?"
      },
      {
        "index": 22,
        "start": 65760,
        "end": 6226,
        "content": "She She is shy.",
        "words": generateWordTokens("She She is shy."),
        "contentVi": "Cô ấy nhút nhát."
      },
      {
        "index": 23,
        "start": 67600,
        "end": 6468,
        "content": "Shy for 5 years. Alex, people talk. They",
        "words": generateWordTokens("Shy for 5 years. Alex, people talk. They"),
        "contentVi": "Nhút nhát suốt 5 năm. Alex, mọi người nói chuyện. Họ"
      },
      {
        "index": 24,
        "start": 71920,
        "end": 4072,
        "content": "say Alex must like men.",
        "words": generateWordTokens("say Alex must like men."),
        "contentVi": "nói rằng Alex chắc hẳn phải thích đàn ông."
      },
      {
        "index": 25,
        "start": 74000,
        "end": 5594,
        "content": "Let them talk. I don't care.",
        "words": generateWordTokens("Let them talk. I don't care."),
        "contentVi": "Hãy để họ nói chuyện. Tôi không quan tâm."
      },
      {
        "index": 26,
        "start": 75920,
        "end": 5676,
        "content": "I care. I have no face when I go market.",
        "words": generateWordTokens("I care. I have no face when I go market."),
        "contentVi": "Tôi quan tâm. Tôi không có mặt mũi khi đi chợ."
      },
      {
        "index": 27,
        "start": 79520,
        "end": 5200,
        "content": "Mom, please.",
        "words": generateWordTokens("Mom, please."),
        "contentVi": "Mẹ ơi, làm ơn."
      },
      {
        "index": 28,
        "start": 81520,
        "end": 6562,
        "content": "Okay. Okay. If no girl likes you, no",
        "words": generateWordTokens("Okay. Okay. If no girl likes you, no"),
        "contentVi": "Được rồi. Được rồi. Nếu không có cô gái nào thích bạn thì không"
      },
      {
        "index": 29,
        "start": 84640,
        "end": 5845,
        "content": "problem. Mary Lily next door.",
        "words": generateWordTokens("problem. Mary Lily next door."),
        "contentVi": "vấn đề. Mary Lily bên cạnh."
      },
      {
        "index": 30,
        "start": 88000,
        "end": 5608,
        "content": "Lily, the one with the small baby.",
        "words": generateWordTokens("Lily, the one with the small baby."),
        "contentVi": "Lily, người có đứa con nhỏ."
      },
      {
        "index": 31,
        "start": 90400,
        "end": 6090,
        "content": "Yes, she is single mom now. Very pretty,",
        "words": generateWordTokens("Yes, she is single mom now. Very pretty,"),
        "contentVi": "Vâng, hiện tại cô ấy là mẹ đơn thân. Rất đẹp,"
      },
      {
        "index": 32,
        "start": 93520,
        "end": 4653,
        "content": "very kind, cooks super good.",
        "words": generateWordTokens("very kind, cooks super good."),
        "contentVi": "rất tốt bụng, nấu ăn siêu ngon."
      },
      {
        "index": 33,
        "start": 96400,
        "end": 5775,
        "content": "She already has a kid.",
        "words": generateWordTokens("She already has a kid."),
        "contentVi": "Cô ấy đã có một đứa con rồi."
      },
      {
        "index": 34,
        "start": 98079,
        "end": 5699,
        "content": "She So what? You get wife and free cute",
        "words": generateWordTokens("She So what? You get wife and free cute"),
        "contentVi": "Cô ấy Vậy thì sao? Bạn có được vợ và dễ thương miễn phí"
      },
      {
        "index": 35,
        "start": 102079,
        "end": 4182,
        "content": "baby. Fast family.",
        "words": generateWordTokens("baby. Fast family."),
        "contentVi": "Đứa bé. Gia đình nhanh chóng."
      },
      {
        "index": 36,
        "start": 103680,
        "end": 6183,
        "content": "Mom, I don't even talk to her.",
        "words": generateWordTokens("Mom, I don't even talk to her."),
        "contentVi": "Mẹ, con thậm chí còn không nói chuyện với cô ấy."
      },
      {
        "index": 37,
        "start": 106159,
        "end": 6587,
        "content": "No problem. I talk to her mom tomorrow",
        "words": generateWordTokens("No problem. I talk to her mom tomorrow"),
        "contentVi": "Không có gì. Tôi sẽ nói chuyện với mẹ cô ấy vào ngày mai"
      },
      {
        "index": 38,
        "start": 109759,
        "end": 6351,
        "content": "morning. We fix everything.",
        "words": generateWordTokens("morning. We fix everything."),
        "contentVi": "buổi sáng. Chúng tôi sửa chữa mọi thứ."
      },
      {
        "index": 39,
        "start": 112640,
        "end": 5872,
        "content": "No. Mom, please. No. Why no you don't",
        "words": generateWordTokens("No. Mom, please. No. Why no you don't"),
        "contentVi": "Không, mẹ ơi, làm ơn. Không. Tại sao không, bạn không"
      },
      {
        "index": 40,
        "start": 116000,
        "end": 4195,
        "content": "want pretty wife. So you really really",
        "words": generateWordTokens("want pretty wife. So you really really"),
        "contentVi": "muốn vợ xinh. Vì vậy, bạn thực sự thực sự"
      },
      {
        "index": 41,
        "start": 118399,
        "end": 3719,
        "content": "like boys.",
        "words": generateWordTokens("like boys."),
        "contentVi": "như các chàng trai."
      },
      {
        "index": 42,
        "start": 120079,
        "end": 5241,
        "content": "Mom, I will cry now.",
        "words": generateWordTokens("Mom, I will cry now."),
        "contentVi": "Mẹ ơi, con sẽ khóc bây giờ."
      }
    ]
  },

  "luyen-nghe-a2-dtofl_9_ajq": {
    "title": "Luyện Nghe Tiếng Anh Level A2- TỔNG KẾT 2020-",
    "audio_url": "DtofL_9_AjQ",
    "repeat_offset": 163.6,
    "sentences": [
      {
        "index": 0,
        "start": 11679,
        "end": 5452,
        "content": "Now listen carefully.",
        "words": generateWordTokens("Now listen carefully."),
        "contentVi": "Bây giờ hãy lắng nghe cẩn thận."
      },
      {
        "index": 1,
        "start": 14080,
        "end": 5614,
        "content": "Hey, watch out. You just hit my car.",
        "words": generateWordTokens("Hey, watch out. You just hit my car."),
        "contentVi": "Này, coi chừng. Bạn vừa tông vào xe của tôi."
      },
      {
        "index": 2,
        "start": 17119,
        "end": 3538,
        "content": "Oh my god. I'm so sorry. I didn't see",
        "words": generateWordTokens("Oh my god. I'm so sorry. I didn't see"),
        "contentVi": "Ôi chúa ơi. Tôi rất xin lỗi. Tôi không thấy"
      },
      {
        "index": 3,
        "start": 19680,
        "end": 3220,
        "content": "you turning.",
        "words": generateWordTokens("you turning."),
        "contentVi": "bạn đang quay."
      },
      {
        "index": 4,
        "start": 20640,
        "end": 3061,
        "content": "Look, you scratched my car. What are you",
        "words": generateWordTokens("Look, you scratched my car. What are you"),
        "contentVi": "Này, cậu đã làm xước xe của tôi. bạn là gì"
      },
      {
        "index": 5,
        "start": 22880,
        "end": 3223,
        "content": "doing?",
        "words": generateWordTokens("doing?"),
        "contentVi": "đang làm?"
      },
      {
        "index": 6,
        "start": 23680,
        "end": 6104,
        "content": "I said sorry. Are you okay?",
        "words": generateWordTokens("I said sorry. Are you okay?"),
        "contentVi": "Tôi đã nói xin lỗi. Bạn có ổn không?"
      },
      {
        "index": 7,
        "start": 26080,
        "end": 5065,
        "content": "I'm fine, but my car is not. It's just a",
        "words": generateWordTokens("I'm fine, but my car is not. It's just a"),
        "contentVi": "Tôi ổn, nhưng xe của tôi thì không. Nó chỉ là một"
      },
      {
        "index": 8,
        "start": 29760,
        "end": 4030,
        "content": "small scratch.",
        "words": generateWordTokens("small scratch."),
        "contentVi": "vết xước nhỏ."
      },
      {
        "index": 9,
        "start": 31119,
        "end": 5311,
        "content": "Small scratch? Are you blind?",
        "words": generateWordTokens("Small scratch? Are you blind?"),
        "contentVi": "Vết xước nhỏ? Bạn có bị mù không?"
      },
      {
        "index": 10,
        "start": 33760,
        "end": 4194,
        "content": "Hey, don't shout at me like that. I'm",
        "words": generateWordTokens("Hey, don't shout at me like that. I'm"),
        "contentVi": "Này, đừng hét vào mặt tôi như thế. Tôi"
      },
      {
        "index": 11,
        "start": 36399,
        "end": 3716,
        "content": "trying to be nice.",
        "words": generateWordTokens("trying to be nice."),
        "contentVi": "cố gắng tỏ ra tử tế."
      },
      {
        "index": 12,
        "start": 37920,
        "end": 3638,
        "content": "Sorry is not enough.",
        "words": generateWordTokens("Sorry is not enough."),
        "contentVi": "Xin lỗi là không đủ."
      },
      {
        "index": 13,
        "start": 40079,
        "end": 3241,
        "content": "What do you want then?",
        "words": generateWordTokens("What do you want then?"),
        "contentVi": "Thế bạn muốn gì?"
      },
      {
        "index": 14,
        "start": 41520,
        "end": 4601,
        "content": "Pay for the repair.",
        "words": generateWordTokens("Pay for the repair."),
        "contentVi": "Trả tiền cho việc sửa chữa."
      },
      {
        "index": 15,
        "start": 43280,
        "end": 6043,
        "content": "Pay for this tiny line.",
        "words": generateWordTokens("Pay for this tiny line."),
        "contentVi": "Trả tiền cho dòng nhỏ này."
      },
      {
        "index": 16,
        "start": 46079,
        "end": 6127,
        "content": "Yes, you hit my car. You must pay.",
        "words": generateWordTokens("Yes, you hit my car. You must pay."),
        "contentVi": "Vâng, bạn đã tông vào xe của tôi. Bạn phải trả tiền."
      },
      {
        "index": 17,
        "start": 49280,
        "end": 4689,
        "content": "I'm a student. I don't have money.",
        "words": generateWordTokens("I'm a student. I don't have money."),
        "contentVi": "Tôi là một sinh viên. Tôi không có tiền."
      },
      {
        "index": 18,
        "start": 52160,
        "end": 4212,
        "content": "Not my problem.",
        "words": generateWordTokens("Not my problem."),
        "contentVi": "Không phải vấn đề của tôi."
      },
      {
        "index": 19,
        "start": 53920,
        "end": 5414,
        "content": "Well, it's my problem. I can't pay for a",
        "words": generateWordTokens("Well, it's my problem. I can't pay for a"),
        "contentVi": "Vâng, đó là vấn đề của tôi. Tôi không thể trả tiền cho một"
      },
      {
        "index": 20,
        "start": 56320,
        "end": 4615,
        "content": "scratch this small. Okay, fine. Then",
        "words": generateWordTokens("scratch this small. Okay, fine. Then"),
        "contentVi": "gãi nhỏ thế này. Được rồi, được rồi. Sau đó"
      },
      {
        "index": 21,
        "start": 59280,
        "end": 4299,
        "content": "I'll call the police.",
        "words": generateWordTokens("I'll call the police."),
        "contentVi": "Tôi sẽ gọi cảnh sát."
      },
      {
        "index": 22,
        "start": 60879,
        "end": 4862,
        "content": "What? Police for this?",
        "words": generateWordTokens("What? Police for this?"),
        "contentVi": "Cái gì? Cảnh sát vì điều này?"
      },
      {
        "index": 23,
        "start": 63520,
        "end": 4944,
        "content": "Yes, I'm calling now.",
        "words": generateWordTokens("Yes, I'm calling now."),
        "contentVi": "Vâng, tôi đang gọi bây giờ."
      },
      {
        "index": 24,
        "start": 65680,
        "end": 5586,
        "content": "Oh, really? Call them. Call. Let's see",
        "words": generateWordTokens("Oh, really? Call them. Call. Let's see"),
        "contentVi": "Ồ vậy ư? Gọi cho họ. Gọi. Hãy xem"
      },
      {
        "index": 25,
        "start": 68400,
        "end": 3748,
        "content": "if they come for your little scratch.",
        "words": generateWordTokens("if they come for your little scratch."),
        "contentVi": "nếu họ đến vì vết xước nhỏ của bạn."
      },
      {
        "index": 26,
        "start": 71200,
        "end": 3111,
        "content": "Uh,",
        "words": generateWordTokens("Uh,"),
        "contentVi": "Ờ,"
      },
      {
        "index": 27,
        "start": 72080,
        "end": 3272,
        "content": "you shout. You blame now. You call",
        "words": generateWordTokens("you shout. You blame now. You call"),
        "contentVi": "bạn hét lên. Bây giờ bạn đổ lỗi. Bạn gọi"
      },
      {
        "index": 28,
        "start": 74240,
        "end": 2554,
        "content": "police.",
        "words": generateWordTokens("police."),
        "contentVi": "cảnh sát."
      },
      {
        "index": 29,
        "start": 75280,
        "end": 4315,
        "content": "I I just",
        "words": generateWordTokens("I I just"),
        "contentVi": "tôi tôi chỉ"
      },
      {
        "index": 30,
        "start": 76720,
        "end": 4637,
        "content": "You think I'm scared, huh?",
        "words": generateWordTokens("You think I'm scared, huh?"),
        "contentVi": "Bạn nghĩ tôi sợ hãi phải không?"
      },
      {
        "index": 31,
        "start": 79520,
        "end": 3920,
        "content": "Maybe a little.",
        "words": generateWordTokens("Maybe a little."),
        "contentVi": "Có lẽ một chút."
      },
      {
        "index": 32,
        "start": 81280,
        "end": 4001,
        "content": "Good. You should be scared.",
        "words": generateWordTokens("Good. You should be scared."),
        "contentVi": "Tốt. Bạn nên sợ hãi."
      },
      {
        "index": 33,
        "start": 83360,
        "end": 4723,
        "content": "Okay. Okay, calm down.",
        "words": generateWordTokens("Okay. Okay, calm down."),
        "contentVi": "Được rồi. Được rồi, bình tĩnh nào."
      },
      {
        "index": 34,
        "start": 85200,
        "end": 4965,
        "content": "I am calm. You made me crazy.",
        "words": generateWordTokens("I am calm. You made me crazy."),
        "contentVi": "Tôi bình tĩnh. Bạn làm tôi phát điên."
      },
      {
        "index": 35,
        "start": 88000,
        "end": 4247,
        "content": "I'm sorry. I was too angry.",
        "words": generateWordTokens("I'm sorry. I was too angry."),
        "contentVi": "Tôi xin lỗi. Tôi đã quá tức giận."
      },
      {
        "index": 36,
        "start": 90080,
        "end": 4010,
        "content": "Good. You better be sorry.",
        "words": generateWordTokens("Good. You better be sorry."),
        "contentVi": "Tốt. Tốt nhất là bạn nên xin lỗi."
      },
      {
        "index": 37,
        "start": 92159,
        "end": 4412,
        "content": "Is your scooter damaged?",
        "words": generateWordTokens("Is your scooter damaged?"),
        "contentVi": "Xe tay ga của bạn bị hỏng?"
      },
      {
        "index": 38,
        "start": 94000,
        "end": 4494,
        "content": "A little, but it doesn't matter.",
        "words": generateWordTokens("A little, but it doesn't matter."),
        "contentVi": "Một chút, nhưng nó không quan trọng."
      },
      {
        "index": 39,
        "start": 96479,
        "end": 5056,
        "content": "Do you want me to pay?",
        "words": generateWordTokens("Do you want me to pay?"),
        "contentVi": "Bạn có muốn tôi trả tiền không?"
      },
      {
        "index": 40,
        "start": 98400,
        "end": 4817,
        "content": "No, I don't need your money. I need you",
        "words": generateWordTokens("No, I don't need your money. I need you"),
        "contentVi": "Không, tôi không cần tiền của bạn. tôi cần bạn"
      },
      {
        "index": 41,
        "start": 101439,
        "end": 4182,
        "content": "to stop shouting.",
        "words": generateWordTokens("to stop shouting."),
        "contentVi": "để ngừng la hét."
      },
      {
        "index": 42,
        "start": 103119,
        "end": 6904,
        "content": "Okay. Okay, I won't shout.",
        "words": generateWordTokens("Okay. Okay, I won't shout."),
        "contentVi": "Được rồi. Được rồi, tôi sẽ không hét lên."
      },
      {
        "index": 43,
        "start": 105520,
        "end": 7226,
        "content": "Thank you. Now, do you have insurance?",
        "words": generateWordTokens("Thank you. Now, do you have insurance?"),
        "contentVi": "Cảm ơn. Bây giờ, bạn có bảo hiểm không?"
      },
      {
        "index": 44,
        "start": 109920,
        "end": 6750,
        "content": "Yes. Here's my card and ID.",
        "words": generateWordTokens("Yes. Here's my card and ID."),
        "contentVi": "Đúng. Đây là thẻ và ID của tôi."
      },
      {
        "index": 45,
        "start": 112640,
        "end": 7232,
        "content": "Good. Let's exchange info and go.",
        "words": generateWordTokens("Good. Let's exchange info and go."),
        "contentVi": "Tốt. Hãy trao đổi thông tin và đi."
      },
      {
        "index": 46,
        "start": 116560,
        "end": 4917,
        "content": "Yeah, no one is hurt. That's the",
        "words": generateWordTokens("Yeah, no one is hurt. That's the"),
        "contentVi": "Vâng, không ai bị thương cả. Đó là"
      },
      {
        "index": 47,
        "start": 119759,
        "end": 4041,
        "content": "important thing.",
        "words": generateWordTokens("important thing."),
        "contentVi": "điều quan trọng."
      },
      {
        "index": 48,
        "start": 121360,
        "end": 3160,
        "content": "See, you should have said that from the",
        "words": generateWordTokens("See, you should have said that from the"),
        "contentVi": "Thấy chưa, lẽ ra bạn nên nói điều đó từ"
      },
      {
        "index": 49,
        "start": 123680,
        "end": 3484,
        "content": "beginning.",
        "words": generateWordTokens("beginning."),
        "contentVi": "bắt đầu."
      },
      {
        "index": 50,
        "start": 124399,
        "end": 5085,
        "content": "I know. I overreacted.",
        "words": generateWordTokens("I know. I overreacted."),
        "contentVi": "Tôi biết. Tôi đã phản ứng thái quá."
      },
      {
        "index": 51,
        "start": 127040,
        "end": 3727,
        "content": "Very overreacted.",
        "words": generateWordTokens("Very overreacted."),
        "contentVi": "Phản ứng rất thái quá."
      },
      {
        "index": 52,
        "start": 129360,
        "end": 3809,
        "content": "Very.",
        "words": generateWordTokens("Very."),
        "contentVi": "Rất."
      },
      {
        "index": 53,
        "start": 130640,
        "end": 5571,
        "content": "I get it. I get it.",
        "words": generateWordTokens("I get it. I get it."),
        "contentVi": "Tôi hiểu rồi. Tôi hiểu rồi."
      },
      {
        "index": 54,
        "start": 133040,
        "end": 5093,
        "content": "Next time, use your signal properly.",
        "words": generateWordTokens("Next time, use your signal properly."),
        "contentVi": "Lần sau hãy sử dụng tín hiệu của bạn đúng cách."
      },
      {
        "index": 55,
        "start": 136080,
        "end": 5096,
        "content": "I did use my signal.",
        "words": generateWordTokens("I did use my signal."),
        "contentVi": "Tôi đã sử dụng tín hiệu của mình."
      },
      {
        "index": 56,
        "start": 138000,
        "end": 5658,
        "content": "No, you didn't. I didn't see anything.",
        "words": generateWordTokens("No, you didn't. I didn't see anything."),
        "contentVi": "Không, bạn đã không làm vậy. Tôi không thấy gì cả."
      },
      {
        "index": 57,
        "start": 141040,
        "end": 3741,
        "content": "Maybe you didn't look. You want to start",
        "words": generateWordTokens("Maybe you didn't look. You want to start"),
        "contentVi": "Có lẽ bạn đã không nhìn. Bạn muốn bắt đầu"
      },
      {
        "index": 58,
        "start": 143520,
        "end": 3744,
        "content": "again?",
        "words": generateWordTokens("again?"),
        "contentVi": "lại?"
      },
      {
        "index": 59,
        "start": 144640,
        "end": 3265,
        "content": "No. No. Sorry. Sorry. Let's not fight",
        "words": generateWordTokens("No. No. Sorry. Sorry. Let's not fight"),
        "contentVi": "Không, không, xin lỗi. Lấy làm tiếc. Chúng ta đừng đánh nhau"
      },
      {
        "index": 60,
        "start": 147120,
        "end": 2147,
        "content": "again.",
        "words": generateWordTokens("again."),
        "contentVi": "lại."
      },
      {
        "index": 61,
        "start": 147760,
        "end": 4148,
        "content": "Good choice.",
        "words": generateWordTokens("Good choice."),
        "contentVi": "Lựa chọn tốt."
      },
      {
        "index": 62,
        "start": 149120,
        "end": 3908,
        "content": "Honestly, your shouting is scarier than",
        "words": generateWordTokens("Honestly, your shouting is scarier than"),
        "contentVi": "Thành thật mà nói, tiếng hét của bạn còn đáng sợ hơn"
      },
      {
        "index": 63,
        "start": 151760,
        "end": 3432,
        "content": "the police.",
        "words": generateWordTokens("the police."),
        "contentVi": "cảnh sát."
      },
      {
        "index": 64,
        "start": 152879,
        "end": 4314,
        "content": "Good. Remember that.",
        "words": generateWordTokens("Good. Remember that."),
        "contentVi": "Tốt. Hãy nhớ điều đó."
      },
      {
        "index": 65,
        "start": 155040,
        "end": 4395,
        "content": "Okay. Are we done?",
        "words": generateWordTokens("Okay. Are we done?"),
        "contentVi": "Được rồi. Chúng ta xong chưa?"
      },
      {
        "index": 66,
        "start": 157040,
        "end": 3356,
        "content": "Wait, one more thing.",
        "words": generateWordTokens("Wait, one more thing."),
        "contentVi": "Đợi đã, còn một điều nữa."
      },
      {
        "index": 67,
        "start": 159280,
        "end": 3439,
        "content": "What?",
        "words": generateWordTokens("What?"),
        "contentVi": "Cái gì?"
      },
      {
        "index": 68,
        "start": 160239,
        "end": 4160,
        "content": "Don't ever scream at a girl on a",
        "words": generateWordTokens("Don't ever scream at a girl on a"),
        "contentVi": "Đừng bao giờ hét vào mặt một cô gái trên đường"
      },
      {
        "index": 69,
        "start": 162560,
        "end": 3922,
        "content": "motorbike again.",
        "words": generateWordTokens("motorbike again."),
        "contentVi": "xe máy nữa."
      },
      {
        "index": 70,
        "start": 164239,
        "end": 3685,
        "content": "I won't. I promise.",
        "words": generateWordTokens("I won't. I promise."),
        "contentVi": "Tôi sẽ không. Tôi hứa."
      },
      {
        "index": 71,
        "start": 166319,
        "end": 6806,
        "content": "Drive safely.",
        "words": generateWordTokens("Drive safely."),
        "contentVi": "Lái xe an toàn."
      },
      {
        "index": 72,
        "start": 167760,
        "end": 8367,
        "content": "You, too. And sorry again. Okay. Bye.",
        "words": generateWordTokens("You, too. And sorry again. Okay. Bye."),
        "contentVi": "Bạn cũng vậy. Và xin lỗi một lần nữa. Được rồi. Tạm biệt."
      },
      {
        "index": 73,
        "start": 172959,
        "end": 3173,
        "content": "Bye.",
        "words": generateWordTokens("Bye."),
        "contentVi": "Tạm biệt."
      }
    ]
  },

  "luyen-nghe-a2-c-ri2l21kja": {
    "title": "Luyện Nghe Tiếng Anh Level A2 - A Garden",
    "audio_url": "c-rI2L21KjA",
    "repeat_offset": 179.2,
    "sentences": [
      {
        "index": 0,
        "start": 12000,
        "end": 4652,
        "content": "Now listen carefully.",
        "words": generateWordTokens("Now listen carefully."),
        "contentVi": "Bây giờ hãy lắng nghe cẩn thận."
      },
      {
        "index": 1,
        "start": 14320,
        "end": 3854,
        "content": "Hey Jenny, look what I got for you.",
        "words": generateWordTokens("Hey Jenny, look what I got for you."),
        "contentVi": "Này Jenny, xem tôi có gì cho cô này."
      },
      {
        "index": 2,
        "start": 16640,
        "end": 3537,
        "content": "Huh? What is it?",
        "words": generateWordTokens("Huh? What is it?"),
        "contentVi": "Hả? Nó là gì vậy?"
      },
      {
        "index": 3,
        "start": 18160,
        "end": 5438,
        "content": "Chocolate. Your favorite one.",
        "words": generateWordTokens("Chocolate. Your favorite one."),
        "contentVi": "Sôcôla. Một trong những yêu thích của bạn."
      },
      {
        "index": 4,
        "start": 20160,
        "end": 3780,
        "content": "Oh, chocolate. Wow. I love chocolate.",
        "words": generateWordTokens("Oh, chocolate. Wow. I love chocolate."),
        "contentVi": "Ồ, sô cô la. Ồ. Tôi yêu sô cô la."
      },
      {
        "index": 5,
        "start": 23580,
        "end": 1723,
        "content": "[laughter]",
        "words": generateWordTokens("[laughter]"),
        "contentVi": "[cười]"
      },
      {
        "index": 6,
        "start": 23920,
        "end": 3543,
        "content": "I know.",
        "words": generateWordTokens("I know."),
        "contentVi": "Tôi biết."
      },
      {
        "index": 7,
        "start": 25279,
        "end": 4586,
        "content": "Wait, how do you know that?",
        "words": generateWordTokens("Wait, how do you know that?"),
        "contentVi": "Đợi đã, sao bạn biết điều đó?"
      },
      {
        "index": 8,
        "start": 27439,
        "end": 4588,
        "content": "Easy. All girls love chocolate.",
        "words": generateWordTokens("Easy. All girls love chocolate."),
        "contentVi": "Dễ. Tất cả các cô gái đều thích sô cô la."
      },
      {
        "index": 9,
        "start": 29840,
        "end": 4510,
        "content": "Excuse me? All girls?",
        "words": generateWordTokens("Excuse me? All girls?"),
        "contentVi": "Xin lỗi? Tất cả các cô gái?"
      },
      {
        "index": 10,
        "start": 32000,
        "end": 4591,
        "content": "Yeah. I mean, most girls do.",
        "words": generateWordTokens("Yeah. I mean, most girls do."),
        "contentVi": "Vâng. Ý tôi là hầu hết các cô gái đều như vậy."
      },
      {
        "index": 11,
        "start": 34320,
        "end": 3394,
        "content": "Oh, so you gave chocolate to other girls",
        "words": generateWordTokens("Oh, so you gave chocolate to other girls"),
        "contentVi": "Ồ, vậy ra em đã tặng sô cô la cho những cô gái khác"
      },
      {
        "index": 12,
        "start": 36559,
        "end": 3557,
        "content": "before, right?",
        "words": generateWordTokens("before, right?"),
        "contentVi": "trước đây phải không?"
      },
      {
        "index": 13,
        "start": 37680,
        "end": 4358,
        "content": "What? No, of course not.",
        "words": generateWordTokens("What? No, of course not."),
        "contentVi": "Cái gì? Không, tất nhiên là không."
      },
      {
        "index": 14,
        "start": 40079,
        "end": 2601,
        "content": "Don't lie. You said it like you're an",
        "words": generateWordTokens("Don't lie. You said it like you're an"),
        "contentVi": "Đừng nói dối. Bạn nói như thể bạn là một"
      },
      {
        "index": 15,
        "start": 42000,
        "end": 2761,
        "content": "expert.",
        "words": generateWordTokens("expert."),
        "contentVi": "chuyên gia."
      },
      {
        "index": 16,
        "start": 42640,
        "end": 3163,
        "content": "I'm not an expert. It's just common",
        "words": generateWordTokens("I'm not an expert. It's just common"),
        "contentVi": "Tôi không phải là một chuyên gia. Nó chỉ là phổ biến"
      },
      {
        "index": 17,
        "start": 44719,
        "end": 4365,
        "content": "sense.",
        "words": generateWordTokens("sense."),
        "contentVi": "giác quan."
      },
      {
        "index": 18,
        "start": 45760,
        "end": 3886,
        "content": "Common sense? Wow. So, you study girls",
        "words": generateWordTokens("Common sense? Wow. So, you study girls"),
        "contentVi": "Ý thức chung? Ồ. Vì vậy, bạn nghiên cứu các cô gái"
      },
      {
        "index": 19,
        "start": 49039,
        "end": 3170,
        "content": "now.",
        "words": generateWordTokens("now."),
        "contentVi": "Hiện nay."
      },
      {
        "index": 20,
        "start": 49600,
        "end": 5730,
        "content": "Jenny, stop twisting my words.",
        "words": generateWordTokens("Jenny, stop twisting my words."),
        "contentVi": "Jenny, đừng bóp méo lời tôi nữa."
      },
      {
        "index": 21,
        "start": 52160,
        "end": 5412,
        "content": "I'm not twisting anything. You said all",
        "words": generateWordTokens("I'm not twisting anything. You said all"),
        "contentVi": "Tôi không vặn vẹo gì cả. Bạn đã nói tất cả"
      },
      {
        "index": 22,
        "start": 55280,
        "end": 3174,
        "content": "girls love chocolate. That means you",
        "words": generateWordTokens("girls love chocolate. That means you"),
        "contentVi": "cô gái thích sô cô la. Điều đó có nghĩa là bạn"
      },
      {
        "index": 23,
        "start": 57520,
        "end": 3257,
        "content": "know other girls.",
        "words": generateWordTokens("know other girls."),
        "contentVi": "quen những cô gái khác."
      },
      {
        "index": 24,
        "start": 58399,
        "end": 3339,
        "content": "I know many people. That doesn't mean I",
        "words": generateWordTokens("I know many people. That doesn't mean I"),
        "contentVi": "Tôi biết nhiều người. Điều đó không có nghĩa là tôi"
      },
      {
        "index": 25,
        "start": 60719,
        "end": 3581,
        "content": "love them.",
        "words": generateWordTokens("love them."),
        "contentVi": "yêu họ."
      },
      {
        "index": 26,
        "start": 61680,
        "end": 4142,
        "content": "Oh, really? Then why did you like your",
        "words": generateWordTokens("Oh, really? Then why did you like your"),
        "contentVi": "Ồ vậy ư? Vậy thì tại sao bạn lại thích"
      },
      {
        "index": 27,
        "start": 64239,
        "end": 5185,
        "content": "ex's post last night?",
        "words": generateWordTokens("ex's post last night?"),
        "contentVi": "bài đăng của người yêu cũ tối qua?"
      },
      {
        "index": 28,
        "start": 65760,
        "end": 5186,
        "content": "Oh my god, not again. It was just a",
        "words": generateWordTokens("Oh my god, not again. It was just a"),
        "contentVi": "Ôi Chúa ơi, không phải nữa. Đó chỉ là một"
      },
      {
        "index": 29,
        "start": 69360,
        "end": 5589,
        "content": "picture of her cat.",
        "words": generateWordTokens("picture of her cat."),
        "contentVi": "hình ảnh con mèo của cô ấy."
      },
      {
        "index": 30,
        "start": 70880,
        "end": 6551,
        "content": "Her cat? Sure. You wrote, \"So cute.\"",
        "words": generateWordTokens("Her cat? Sure. You wrote, \"So cute.\""),
        "contentVi": "Con mèo của cô ấy? Chắc chắn. Bạn đã viết: \"Dễ thương quá\"."
      },
      {
        "index": 31,
        "start": 74880,
        "end": 5915,
        "content": "Who's cute? Huh? Her or the cat?",
        "words": generateWordTokens("Who's cute? Huh? Her or the cat?"),
        "contentVi": "Ai dễ thương? Hả? Cô ấy hay con mèo?"
      },
      {
        "index": 32,
        "start": 77360,
        "end": 4397,
        "content": "The cat, Jenny. The cat. I don't care",
        "words": generateWordTokens("The cat, Jenny. The cat. I don't care"),
        "contentVi": "Con mèo, Jenny. Con mèo. tôi không quan tâm"
      },
      {
        "index": 33,
        "start": 80720,
        "end": 3681,
        "content": "about her.",
        "words": generateWordTokens("about her."),
        "contentVi": "về cô ấy."
      },
      {
        "index": 34,
        "start": 81680,
        "end": 4962,
        "content": "You don't care? Then why follow her?",
        "words": generateWordTokens("You don't care? Then why follow her?"),
        "contentVi": "Bạn không quan tâm à? Vậy thì tại sao lại theo dõi cô ấy?"
      },
      {
        "index": 35,
        "start": 84320,
        "end": 3844,
        "content": "Because I forgot to unfollow. I don't",
        "words": generateWordTokens("Because I forgot to unfollow. I don't"),
        "contentVi": "Vì tôi quên hủy theo dõi. Tôi không"
      },
      {
        "index": 36,
        "start": 86560,
        "end": 4167,
        "content": "even look at her page.",
        "words": generateWordTokens("even look at her page."),
        "contentVi": "thậm chí nhìn vào trang của cô ấy."
      },
      {
        "index": 37,
        "start": 88080,
        "end": 3767,
        "content": "Liar. You remember the cat but not to",
        "words": generateWordTokens("Liar. You remember the cat but not to"),
        "contentVi": "Nói dối. Bạn nhớ con mèo nhưng không nhớ"
      },
      {
        "index": 38,
        "start": 90640,
        "end": 4091,
        "content": "unfollow her?",
        "words": generateWordTokens("unfollow her?"),
        "contentVi": "hủy theo dõi cô ấy?"
      },
      {
        "index": 39,
        "start": 91759,
        "end": 5693,
        "content": "Jenny, please. You're being crazy.",
        "words": generateWordTokens("Jenny, please. You're being crazy."),
        "contentVi": "Jenny, làm ơn. Bạn đang bị điên đấy."
      },
      {
        "index": 40,
        "start": 94640,
        "end": 3855,
        "content": "What did you say? Did you just call me",
        "words": generateWordTokens("What did you say? Did you just call me"),
        "contentVi": "Bạn đã nói gì? Bạn vừa gọi cho tôi phải không?"
      },
      {
        "index": 41,
        "start": 97360,
        "end": 3297,
        "content": "crazy?",
        "words": generateWordTokens("crazy?"),
        "contentVi": "điên?"
      },
      {
        "index": 42,
        "start": 98400,
        "end": 4098,
        "content": "No, no, I didn't mean that. I mean,",
        "words": generateWordTokens("No, no, I didn't mean that. I mean,"),
        "contentVi": "Không, không, tôi không có ý đó. Ý tôi là,"
      },
      {
        "index": 43,
        "start": 100560,
        "end": 3461,
        "content": "you're cute crazy.",
        "words": generateWordTokens("you're cute crazy."),
        "contentVi": "bạn thật dễ thương và điên rồ."
      },
      {
        "index": 44,
        "start": 102400,
        "end": 4422,
        "content": "Don't me now.",
        "words": generateWordTokens("Don't me now."),
        "contentVi": "Đừng có nói với tôi bây giờ."
      },
      {
        "index": 45,
        "start": 103920,
        "end": 5224,
        "content": "Jenny, please. I just wanted to give you",
        "words": generateWordTokens("Jenny, please. I just wanted to give you"),
        "contentVi": "Jenny, làm ơn. Tôi chỉ muốn đưa cho bạn"
      },
      {
        "index": 46,
        "start": 106720,
        "end": 5307,
        "content": "chocolate. A sweet gift.",
        "words": generateWordTokens("chocolate. A sweet gift."),
        "contentVi": "sôcôla. Một món quà ngọt ngào."
      },
      {
        "index": 47,
        "start": 109040,
        "end": 4188,
        "content": "Sweet? Yeah, maybe you gave the same one",
        "words": generateWordTokens("Sweet? Yeah, maybe you gave the same one"),
        "contentVi": "Ngọt? Vâng, có lẽ bạn đã đưa ra điều tương tự"
      },
      {
        "index": 48,
        "start": 111920,
        "end": 4351,
        "content": "to your ex, too.",
        "words": generateWordTokens("to your ex, too."),
        "contentVi": "với người yêu cũ của bạn nữa."
      },
      {
        "index": 49,
        "start": 113119,
        "end": 5314,
        "content": "I didn't. I swear. Then why do you know",
        "words": generateWordTokens("I didn't. I swear. Then why do you know"),
        "contentVi": "Tôi đã không làm vậy. Tôi thề. Thế thì tại sao bạn biết"
      },
      {
        "index": 50,
        "start": 116159,
        "end": 2917,
        "content": "what brand she likes? You said it last",
        "words": generateWordTokens("what brand she likes? You said it last"),
        "contentVi": "cô ấy thích nhãn hiệu nào? Bạn đã nói điều đó lần cuối"
      },
      {
        "index": 51,
        "start": 118320,
        "end": 3158,
        "content": "time.",
        "words": generateWordTokens("time."),
        "contentVi": "thời gian."
      },
      {
        "index": 52,
        "start": 118960,
        "end": 3479,
        "content": "Because you told me last week you like",
        "words": generateWordTokens("Because you told me last week you like"),
        "contentVi": "Vì tuần trước bạn đã nói với tôi rằng bạn thích"
      },
      {
        "index": 53,
        "start": 121360,
        "end": 2281,
        "content": "that brand.",
        "words": generateWordTokens("that brand."),
        "contentVi": "thương hiệu đó."
      },
      {
        "index": 54,
        "start": 122320,
        "end": 3961,
        "content": "Oh, did I?",
        "words": generateWordTokens("Oh, did I?"),
        "contentVi": "Ồ, phải không?"
      },
      {
        "index": 55,
        "start": 123520,
        "end": 3564,
        "content": "Yes. You said this chocolate is my",
        "words": generateWordTokens("Yes. You said this chocolate is my"),
        "contentVi": "Đúng. Bạn nói sô cô la này là của tôi"
      },
      {
        "index": 56,
        "start": 126159,
        "end": 2366,
        "content": "favorite.",
        "words": generateWordTokens("favorite."),
        "contentVi": "yêu thích."
      },
      {
        "index": 57,
        "start": 126960,
        "end": 3247,
        "content": "Okay, maybe I said that.",
        "words": generateWordTokens("Okay, maybe I said that."),
        "contentVi": "Được rồi, có lẽ tôi đã nói thế."
      },
      {
        "index": 58,
        "start": 128399,
        "end": 3729,
        "content": "Finally. Thank you.",
        "words": generateWordTokens("Finally. Thank you."),
        "contentVi": "Cuối cùng. Cảm ơn."
      },
      {
        "index": 59,
        "start": 130080,
        "end": 3009,
        "content": "But still, you should have asked before",
        "words": generateWordTokens("But still, you should have asked before"),
        "contentVi": "Nhưng lẽ ra bạn nên hỏi trước"
      },
      {
        "index": 60,
        "start": 132000,
        "end": 3652,
        "content": "buying it.",
        "words": generateWordTokens("buying it."),
        "contentVi": "mua nó."
      },
      {
        "index": 61,
        "start": 132959,
        "end": 4133,
        "content": "What? I buy your favorite chocolate and",
        "words": generateWordTokens("What? I buy your favorite chocolate and"),
        "contentVi": "Cái gì? Tôi mua sô cô la yêu thích của bạn và"
      },
      {
        "index": 62,
        "start": 135520,
        "end": 4215,
        "content": "now it's wrong, too.",
        "words": generateWordTokens("now it's wrong, too."),
        "contentVi": "bây giờ nó cũng sai."
      },
      {
        "index": 63,
        "start": 136959,
        "end": 4698,
        "content": "It's not wrong. It's just suspicious.",
        "words": generateWordTokens("It's not wrong. It's just suspicious."),
        "contentVi": "Nó không sai. Nó chỉ đáng ngờ thôi."
      },
      {
        "index": 64,
        "start": 139599,
        "end": 3581,
        "content": "Jenny, what do you want me to do? Give",
        "words": generateWordTokens("Jenny, what do you want me to do? Give"),
        "contentVi": "Jenny, em muốn anh làm gì? Đưa cho"
      },
      {
        "index": 65,
        "start": 141520,
        "end": 4941,
        "content": "you a pizza next time?",
        "words": generateWordTokens("you a pizza next time?"),
        "contentVi": "lần sau bạn ăn pizza nhé?"
      },
      {
        "index": 66,
        "start": 143040,
        "end": 4303,
        "content": "Don't shout at me. I'm not shouting. I'm",
        "words": generateWordTokens("Don't shout at me. I'm not shouting. I'm"),
        "contentVi": "Đừng hét vào mặt tôi. Tôi không la hét. Tôi"
      },
      {
        "index": 67,
        "start": 146319,
        "end": 3267,
        "content": "explaining.",
        "words": generateWordTokens("explaining."),
        "contentVi": "giải thích."
      },
      {
        "index": 68,
        "start": 147200,
        "end": 4707,
        "content": "Fine. Don't give me chocolate anymore.",
        "words": generateWordTokens("Fine. Don't give me chocolate anymore."),
        "contentVi": "Khỏe. Đừng cho tôi sôcôla nữa."
      },
      {
        "index": 69,
        "start": 149440,
        "end": 4469,
        "content": "Fine. I'll eat it myself.",
        "words": generateWordTokens("Fine. I'll eat it myself."),
        "contentVi": "Khỏe. Tôi sẽ tự ăn nó."
      },
      {
        "index": 70,
        "start": 151760,
        "end": 3672,
        "content": "What? You're so mean.",
        "words": generateWordTokens("What? You're so mean."),
        "contentVi": "Cái gì? Bạn thật xấu tính."
      },
      {
        "index": 71,
        "start": 153760,
        "end": 3594,
        "content": "You said you don't want it.",
        "words": generateWordTokens("You said you don't want it."),
        "contentVi": "Bạn đã nói bạn không muốn nó."
      },
      {
        "index": 72,
        "start": 155280,
        "end": 3915,
        "content": "I changed my mind. Give it back.",
        "words": generateWordTokens("I changed my mind. Give it back."),
        "contentVi": "Tôi đã thay đổi ý định. Trả lại nó đi."
      },
      {
        "index": 73,
        "start": 157200,
        "end": 4637,
        "content": "No way. It's mine now.",
        "words": generateWordTokens("No way. It's mine now."),
        "contentVi": "Không đời nào. Bây giờ nó là của tôi."
      },
      {
        "index": 74,
        "start": 159040,
        "end": 5519,
        "content": "You really don't love me anymore. Huh?",
        "words": generateWordTokens("You really don't love me anymore. Huh?"),
        "contentVi": "Anh thực sự không còn yêu em nữa. Hả?"
      },
      {
        "index": 75,
        "start": 161680,
        "end": 4242,
        "content": "Oh my god. Jenny, I love you more than",
        "words": generateWordTokens("Oh my god. Jenny, I love you more than"),
        "contentVi": "Ôi chúa ơi. Jenny, anh yêu em nhiều hơn"
      },
      {
        "index": 76,
        "start": 164400,
        "end": 2404,
        "content": "chocolate. Okay.",
        "words": generateWordTokens("chocolate. Okay."),
        "contentVi": "sôcôla. Được rồi."
      },
      {
        "index": 77,
        "start": 165760,
        "end": 4406,
        "content": "Really?",
        "words": generateWordTokens("Really?"),
        "contentVi": "Thật sự?"
      },
      {
        "index": 78,
        "start": 166640,
        "end": 4967,
        "content": "Yes. Really? Even when you're mad. Even",
        "words": generateWordTokens("Yes. Really? Even when you're mad. Even"),
        "contentVi": "Đúng. Thật sự? Ngay cả khi bạn đang tức giận. Thậm chí"
      },
      {
        "index": 79,
        "start": 170000,
        "end": 3689,
        "content": "when you shout.",
        "words": generateWordTokens("when you shout."),
        "contentVi": "khi bạn hét lên."
      },
      {
        "index": 80,
        "start": 171440,
        "end": 2891,
        "content": "Fine. You can give me half the",
        "words": generateWordTokens("Fine. You can give me half the"),
        "contentVi": "Khỏe. Bạn có thể cho tôi một nửa"
      },
      {
        "index": 81,
        "start": 173519,
        "end": 3055,
        "content": "chocolate.",
        "words": generateWordTokens("chocolate."),
        "contentVi": "sôcôla."
      },
      {
        "index": 82,
        "start": 174160,
        "end": 4574,
        "content": "Half? You said you didn't want it.",
        "words": generateWordTokens("Half? You said you didn't want it."),
        "contentVi": "Một nửa? Bạn đã nói bạn không muốn nó."
      },
      {
        "index": 83,
        "start": 176400,
        "end": 4176,
        "content": "I changed my mind again.",
        "words": generateWordTokens("I changed my mind again."),
        "contentVi": "Tôi lại đổi ý lần nữa."
      },
      {
        "index": 84,
        "start": 178560,
        "end": 3938,
        "content": "Unbelievable.",
        "words": generateWordTokens("Unbelievable."),
        "contentVi": "Không thể tin được."
      },
      {
        "index": 85,
        "start": 180400,
        "end": 4500,
        "content": "And that's why you love me.",
        "words": generateWordTokens("And that's why you love me."),
        "contentVi": "Và đó là lý do tại sao bạn yêu tôi."
      },
      {
        "index": 86,
        "start": 182319,
        "end": 4343,
        "content": "Yeah, you're impossible.",
        "words": generateWordTokens("Yeah, you're impossible."),
        "contentVi": "Vâng, bạn là không thể."
      },
      {
        "index": 87,
        "start": 184720,
        "end": 4344,
        "content": "And you're mine.",
        "words": generateWordTokens("And you're mine."),
        "contentVi": "Và bạn là của tôi."
      },
      {
        "index": 88,
        "start": 186480,
        "end": 3546,
        "content": "Okay. Okay. Let's eat the chocolate",
        "words": generateWordTokens("Okay. Okay. Let's eat the chocolate"),
        "contentVi": "Được rồi. Được rồi. Hãy ăn sô-cô-la"
      },
      {
        "index": 89,
        "start": 188879,
        "end": 4829,
        "content": "together.",
        "words": generateWordTokens("together."),
        "contentVi": "cùng nhau."
      }
    ]
  },

  "luyen-nghe-a2-ommgzlgvdmc": {
    "title": "Luyện Nghe Tiếng Anh Level A2 - A Gym",
    "audio_url": "OMmgZLGvdMc",
    "repeat_offset": 164.64,
    "sentences": [
      {
        "index": 0,
        "start": 12160,
        "end": 4891,
        "content": "Now listen carefully.",
        "words": generateWordTokens("Now listen carefully."),
        "contentVi": "Bây giờ hãy lắng nghe cẩn thận."
      },
      {
        "index": 1,
        "start": 14639,
        "end": 5216,
        "content": "Mom, can I buy new clothes?",
        "words": generateWordTokens("Mom, can I buy new clothes?"),
        "contentVi": "Mẹ ơi, con có thể mua quần áo mới được không?"
      },
      {
        "index": 2,
        "start": 17039,
        "end": 3938,
        "content": "New clothes? Why? You just bought some",
        "words": generateWordTokens("New clothes? Why? You just bought some"),
        "contentVi": "Quần áo mới? Tại sao? Bạn vừa mua một ít"
      },
      {
        "index": 3,
        "start": 19840,
        "end": 3699,
        "content": "last month.",
        "words": generateWordTokens("last month."),
        "contentVi": "tháng trước."
      },
      {
        "index": 4,
        "start": 20960,
        "end": 3941,
        "content": "But I wore them many times already. They",
        "words": generateWordTokens("But I wore them many times already. They"),
        "contentVi": "Nhưng tôi đã mặc chúng nhiều lần rồi. Họ"
      },
      {
        "index": 5,
        "start": 23519,
        "end": 3704,
        "content": "look old now.",
        "words": generateWordTokens("look old now."),
        "contentVi": "giờ nhìn già rồi"
      },
      {
        "index": 6,
        "start": 24880,
        "end": 4905,
        "content": "Old? They're still new.",
        "words": generateWordTokens("Old? They're still new."),
        "contentVi": "Cũ? Chúng vẫn còn mới."
      },
      {
        "index": 7,
        "start": 27199,
        "end": 4267,
        "content": "No, Mom. I want to look nice. I'm going",
        "words": generateWordTokens("No, Mom. I want to look nice. I'm going"),
        "contentVi": "Không, mẹ. Tôi muốn trông thật đẹp. tôi đang đi"
      },
      {
        "index": 8,
        "start": 29760,
        "end": 5550,
        "content": "out with my friends.",
        "words": generateWordTokens("out with my friends."),
        "contentVi": "ra ngoài với bạn bè của tôi."
      },
      {
        "index": 9,
        "start": 31439,
        "end": 5952,
        "content": "Friends? How important is this outing?",
        "words": generateWordTokens("Friends? How important is this outing?"),
        "contentVi": "Bạn? Chuyến đi chơi này quan trọng thế nào?"
      },
      {
        "index": 10,
        "start": 35280,
        "end": 4515,
        "content": "Very important, Mom.",
        "words": generateWordTokens("Very important, Mom."),
        "contentVi": "Quan trọng lắm mẹ ạ."
      },
      {
        "index": 11,
        "start": 37360,
        "end": 4197,
        "content": "H",
        "words": generateWordTokens("H"),
        "contentVi": "H"
      },
      {
        "index": 12,
        "start": 39760,
        "end": 4999,
        "content": "Are you going with the girl?",
        "words": generateWordTokens("Are you going with the girl?"),
        "contentVi": "Bạn có đi cùng cô gái không?"
      },
      {
        "index": 13,
        "start": 41520,
        "end": 6362,
        "content": "What? No, I mean, yes, maybe.",
        "words": generateWordTokens("What? No, I mean, yes, maybe."),
        "contentVi": "Cái gì? Không, ý tôi là, vâng, có thể."
      },
      {
        "index": 14,
        "start": 44719,
        "end": 4446,
        "content": "Uh-huh. I knew it. So, that's why you",
        "words": generateWordTokens("Uh-huh. I knew it. So, that's why you"),
        "contentVi": "Ờ-huh. Tôi biết điều đó. Vì vậy, đó là lý do tại sao bạn"
      },
      {
        "index": 15,
        "start": 47840,
        "end": 3488,
        "content": "want new clothes.",
        "words": generateWordTokens("want new clothes."),
        "contentVi": "muốn quần áo mới."
      },
      {
        "index": 16,
        "start": 49120,
        "end": 5729,
        "content": "No, it's not like that.",
        "words": generateWordTokens("No, it's not like that."),
        "contentVi": "Không, nó không phải như vậy."
      },
      {
        "index": 17,
        "start": 51280,
        "end": 5650,
        "content": "Sure. Sure. If you were going with boys,",
        "words": generateWordTokens("Sure. Sure. If you were going with boys,"),
        "contentVi": "Chắc chắn. Chắc chắn. Nếu bạn đi cùng các chàng trai,"
      },
      {
        "index": 18,
        "start": 54800,
        "end": 4855,
        "content": "you wouldn't care what you wear.",
        "words": generateWordTokens("you wouldn't care what you wear."),
        "contentVi": "bạn sẽ không quan tâm bạn mặc gì."
      },
      {
        "index": 19,
        "start": 56879,
        "end": 3577,
        "content": "But this time is different. Different.",
        "words": generateWordTokens("But this time is different. Different."),
        "contentVi": "Nhưng lần này thì khác. Khác biệt."
      },
      {
        "index": 20,
        "start": 59600,
        "end": 3339,
        "content": "How?",
        "words": generateWordTokens("How?"),
        "contentVi": "Làm sao?"
      },
      {
        "index": 21,
        "start": 60399,
        "end": 3900,
        "content": "I'm going with a girl from my class. She",
        "words": generateWordTokens("I'm going with a girl from my class. She"),
        "contentVi": "Tôi đang đi với một cô gái trong lớp của tôi. Cô ấy"
      },
      {
        "index": 22,
        "start": 62879,
        "end": 5424,
        "content": "sits next to me.",
        "words": generateWordTokens("sits next to me."),
        "contentVi": "ngồi cạnh tôi."
      },
      {
        "index": 23,
        "start": 64239,
        "end": 4865,
        "content": "Oh, so it is a girl. You're still young,",
        "words": generateWordTokens("Oh, so it is a girl. You're still young,"),
        "contentVi": "Ồ, vậy ra là một cô gái. Bạn vẫn còn trẻ,"
      },
      {
        "index": 24,
        "start": 68240,
        "end": 3828,
        "content": "Ben.",
        "words": generateWordTokens("Ben."),
        "contentVi": "Ben."
      },
      {
        "index": 25,
        "start": 69040,
        "end": 5109,
        "content": "Mom, we're just friends. We're going to",
        "words": generateWordTokens("Mom, we're just friends. We're going to"),
        "contentVi": "Mẹ, chúng ta chỉ là bạn thôi. chúng tôi sẽ"
      },
      {
        "index": 26,
        "start": 72000,
        "end": 5191,
        "content": "eat and talk. That's all.",
        "words": generateWordTokens("eat and talk. That's all."),
        "contentVi": "ăn và nói chuyện. Thế thôi."
      },
      {
        "index": 27,
        "start": 74080,
        "end": 5594,
        "content": "H just friends, huh?",
        "words": generateWordTokens("H just friends, huh?"),
        "contentVi": "H chỉ là bạn bè thôi à?"
      },
      {
        "index": 28,
        "start": 77119,
        "end": 3518,
        "content": "Yes, please, Mom. I just want to look",
        "words": generateWordTokens("Yes, please, Mom. I just want to look"),
        "contentVi": "Vâng, làm ơn đi mẹ. Tôi chỉ muốn nhìn"
      },
      {
        "index": 29,
        "start": 79600,
        "end": 3200,
        "content": "good.",
        "words": generateWordTokens("good."),
        "contentVi": "Tốt."
      },
      {
        "index": 30,
        "start": 80560,
        "end": 3921,
        "content": "All right. All right. You want to",
        "words": generateWordTokens("All right. All right. You want to"),
        "contentVi": "Được rồi. Được rồi. bạn muốn"
      },
      {
        "index": 31,
        "start": 82720,
        "end": 5683,
        "content": "impress her, I see.",
        "words": generateWordTokens("impress her, I see."),
        "contentVi": "gây ấn tượng với cô ấy, tôi hiểu rồi."
      },
      {
        "index": 32,
        "start": 84400,
        "end": 5604,
        "content": "No, I just want to look clean. Clean and",
        "words": generateWordTokens("No, I just want to look clean. Clean and"),
        "contentVi": "Không, tôi chỉ muốn trông sạch sẽ thôi. Sạch sẽ và"
      },
      {
        "index": 33,
        "start": 88320,
        "end": 3448,
        "content": "handsome, right?",
        "words": generateWordTokens("handsome, right?"),
        "contentVi": "đẹp trai phải không?"
      },
      {
        "index": 34,
        "start": 89920,
        "end": 4969,
        "content": "Maybe a little.",
        "words": generateWordTokens("Maybe a little."),
        "contentVi": "Có lẽ một chút."
      },
      {
        "index": 35,
        "start": 91680,
        "end": 5132,
        "content": "Okay, fine. Buy something nice then.",
        "words": generateWordTokens("Okay, fine. Buy something nice then."),
        "contentVi": "Được rồi, được rồi. Thế thì mua cái gì đẹp đi."
      },
      {
        "index": 36,
        "start": 94799,
        "end": 4816,
        "content": "Really? Thanks, Mom.",
        "words": generateWordTokens("Really? Thanks, Mom."),
        "contentVi": "Thật sự? Cảm ơn mẹ."
      },
      {
        "index": 37,
        "start": 96720,
        "end": 5777,
        "content": "Wait, wait, don't be too happy. If you",
        "words": generateWordTokens("Wait, wait, don't be too happy. If you"),
        "contentVi": "Đợi đã, chờ đã, đừng vui quá. Nếu bạn"
      },
      {
        "index": 38,
        "start": 99520,
        "end": 3940,
        "content": "buy new clothes, you must also get a",
        "words": generateWordTokens("buy new clothes, you must also get a"),
        "contentVi": "mua quần áo mới, bạn cũng phải có một"
      },
      {
        "index": 39,
        "start": 102400,
        "end": 4022,
        "content": "haircut.",
        "words": generateWordTokens("haircut."),
        "contentVi": "cắt tóc."
      },
      {
        "index": 40,
        "start": 103360,
        "end": 6182,
        "content": "A haircut? But I like my hair.",
        "words": generateWordTokens("A haircut? But I like my hair."),
        "contentVi": "Cắt tóc à? Nhưng tôi thích mái tóc của mình."
      },
      {
        "index": 41,
        "start": 106320,
        "end": 3945,
        "content": "It looks messy. Girls don't like messy",
        "words": generateWordTokens("It looks messy. Girls don't like messy"),
        "contentVi": "Nó trông có vẻ lộn xộn. Con gái không thích bừa bộn"
      },
      {
        "index": 42,
        "start": 109439,
        "end": 3986,
        "content": "hair.",
        "words": generateWordTokens("hair."),
        "contentVi": "tóc."
      },
      {
        "index": 43,
        "start": 110159,
        "end": 4430,
        "content": "Mom, stop. You're embarrassing me.",
        "words": generateWordTokens("Mom, stop. You're embarrassing me."),
        "contentVi": "Mẹ, dừng lại. Bạn đang làm tôi xấu hổ đấy."
      },
      {
        "index": 44,
        "start": 113316,
        "end": 3997,
        "content": "[laughter]",
        "words": generateWordTokens("[laughter]"),
        "contentVi": "[cười]"
      },
      {
        "index": 45,
        "start": 114479,
        "end": 3714,
        "content": "I'm just helping you. and buy new shoes,",
        "words": generateWordTokens("I'm just helping you. and buy new shoes,"),
        "contentVi": "Tôi chỉ đang giúp bạn thôi. và mua giày mới,"
      },
      {
        "index": 46,
        "start": 117200,
        "end": 3477,
        "content": "too.",
        "words": generateWordTokens("too."),
        "contentVi": "cũng vậy."
      },
      {
        "index": 47,
        "start": 118079,
        "end": 5079,
        "content": "Shoes? Come on, Mom.",
        "words": generateWordTokens("Shoes? Come on, Mom."),
        "contentVi": "Đôi giày? Thôi nào mẹ."
      },
      {
        "index": 48,
        "start": 120560,
        "end": 3881,
        "content": "And maybe some perfume. You want to",
        "words": generateWordTokens("And maybe some perfume. You want to"),
        "contentVi": "Và có thể một ít nước hoa. Bạn muốn"
      },
      {
        "index": 49,
        "start": 123040,
        "end": 3482,
        "content": "smell nice, right?",
        "words": generateWordTokens("smell nice, right?"),
        "contentVi": "mùi thơm quá phải không?"
      },
      {
        "index": 50,
        "start": 124320,
        "end": 4683,
        "content": "Mom, please stop.",
        "words": generateWordTokens("Mom, please stop."),
        "contentVi": "Mẹ ơi, xin hãy dừng lại."
      },
      {
        "index": 51,
        "start": 126399,
        "end": 4206,
        "content": "I'm not done. You should also pay for",
        "words": generateWordTokens("I'm not done. You should also pay for"),
        "contentVi": "Tôi chưa xong đâu. Bạn cũng nên trả tiền cho"
      },
      {
        "index": 52,
        "start": 128879,
        "end": 3890,
        "content": "her food. Okay.",
        "words": generateWordTokens("her food. Okay."),
        "contentVi": "thức ăn của cô ấy. Được rồi."
      },
      {
        "index": 53,
        "start": 130479,
        "end": 5491,
        "content": "What? Why me?",
        "words": generateWordTokens("What? Why me?"),
        "contentVi": "Cái gì? Tại sao lại là tôi?"
      },
      {
        "index": 54,
        "start": 132640,
        "end": 5493,
        "content": "Because you're the man. Be a gentleman.",
        "words": generateWordTokens("Because you're the man. Be a gentleman."),
        "contentVi": "Bởi vì bạn là đàn ông. Hãy là một quý ông."
      },
      {
        "index": 55,
        "start": 135840,
        "end": 5336,
        "content": "But I don't have enough money.",
        "words": generateWordTokens("But I don't have enough money."),
        "contentVi": "Nhưng tôi không có đủ tiền."
      },
      {
        "index": 56,
        "start": 138000,
        "end": 4698,
        "content": "Then ask your dad. Tell him it's for",
        "words": generateWordTokens("Then ask your dad. Tell him it's for"),
        "contentVi": "Sau đó hãy hỏi bố của bạn. Nói với anh ấy là vì"
      },
      {
        "index": 57,
        "start": 141040,
        "end": 5821,
        "content": "true love.",
        "words": generateWordTokens("true love."),
        "contentVi": "tình yêu đích thực."
      },
      {
        "index": 58,
        "start": 142560,
        "end": 5182,
        "content": "Mom, it's not love. Oh, not yet. Maybe",
        "words": generateWordTokens("Mom, it's not love. Oh, not yet. Maybe"),
        "contentVi": "Mẹ ơi, đó không phải là tình yêu. Ồ, chưa. Có lẽ"
      },
      {
        "index": 59,
        "start": 146720,
        "end": 2787,
        "content": "later.",
        "words": generateWordTokens("later."),
        "contentVi": "sau đó."
      },
      {
        "index": 60,
        "start": 147599,
        "end": 5269,
        "content": "You're impossible.",
        "words": generateWordTokens("You're impossible."),
        "contentVi": "Bạn là không thể."
      },
      {
        "index": 61,
        "start": 149360,
        "end": 7429,
        "content": "You'll thank me one day. So, new",
        "words": generateWordTokens("You'll thank me one day. So, new"),
        "contentVi": "Bạn sẽ cảm ơn tôi một ngày nào đó. Vì vậy, mới"
      },
      {
        "index": 62,
        "start": 152720,
        "end": 5672,
        "content": "clothes, haircut, shoes, perfume,",
        "words": generateWordTokens("clothes, haircut, shoes, perfume,"),
        "contentVi": "quần áo, cắt tóc, giày dép, nước hoa,"
      },
      {
        "index": 63,
        "start": 156640,
        "end": 3677,
        "content": "dinner. Got it.",
        "words": generateWordTokens("dinner. Got it."),
        "contentVi": "bữa tối. Hiểu rồi."
      },
      {
        "index": 64,
        "start": 158239,
        "end": 4399,
        "content": "That's too much, Mom.",
        "words": generateWordTokens("That's too much, Mom."),
        "contentVi": "Quá nhiều rồi mẹ ạ."
      },
      {
        "index": 65,
        "start": 160160,
        "end": 5716,
        "content": "That's how you impress a girl.",
        "words": generateWordTokens("That's how you impress a girl."),
        "contentVi": "Đó là cách bạn gây ấn tượng với một cô gái."
      },
      {
        "index": 66,
        "start": 162480,
        "end": 5042,
        "content": "I just wanted a t-shirt, not a wedding.",
        "words": generateWordTokens("I just wanted a t-shirt, not a wedding."),
        "contentVi": "Tôi chỉ muốn một chiếc áo phông chứ không phải một đám cưới."
      },
      {
        "index": 67,
        "start": 165716,
        "end": 5090,
        "content": "[laughter]",
        "words": generateWordTokens("[laughter]"),
        "contentVi": "[cười]"
      },
      {
        "index": 68,
        "start": 167360,
        "end": 7207,
        "content": "Okay, fine. Just buy one t-shirt.",
        "words": generateWordTokens("Okay, fine. Just buy one t-shirt."),
        "contentVi": "Được rồi, được rồi. Chỉ cần mua một chiếc áo phông."
      },
      {
        "index": 69,
        "start": 170640,
        "end": 5371,
        "content": "Finally. But remember, don't come home",
        "words": generateWordTokens("Finally. But remember, don't come home"),
        "contentVi": "Cuối cùng. Nhưng nhớ đừng về nhà nhé"
      },
      {
        "index": 70,
        "start": 174400,
        "end": 3134,
        "content": "too late.",
        "words": generateWordTokens("too late."),
        "contentVi": "quá muộn."
      }
    ]
  },

  "luyen-nghe-a2-tgvepkiupnq": {
    "title": "Luyện Nghe Tiếng Anh Level A2 - A Cafe",
    "audio_url": "tGvePkiUPNQ",
    "repeat_offset": 167.12,
    "sentences": [
      {
        "index": 0,
        "start": 12320,
        "end": 4492,
        "content": "Now listen carefully.",
        "words": generateWordTokens("Now listen carefully."),
        "contentVi": "Bây giờ hãy lắng nghe cẩn thận."
      },
      {
        "index": 1,
        "start": 14960,
        "end": 3775,
        "content": "Mom, can I go out tonight?",
        "words": generateWordTokens("Mom, can I go out tonight?"),
        "contentVi": "Mẹ ơi, tối nay con có thể ra ngoài được không?"
      },
      {
        "index": 2,
        "start": 16800,
        "end": 3697,
        "content": "Out? Where are you going?",
        "words": generateWordTokens("Out? Where are you going?"),
        "contentVi": "Ngoài? Bạn đang đi đâu?"
      },
      {
        "index": 3,
        "start": 18720,
        "end": 3059,
        "content": "Just with my friends. We want to hang",
        "words": generateWordTokens("Just with my friends. We want to hang"),
        "contentVi": "Chỉ với bạn bè của tôi. Chúng tôi muốn treo"
      },
      {
        "index": 4,
        "start": 20480,
        "end": 2979,
        "content": "out and eat something.",
        "words": generateWordTokens("out and eat something."),
        "contentVi": "ra ngoài và ăn gì đó."
      },
      {
        "index": 5,
        "start": 21760,
        "end": 3701,
        "content": "What time will you come home?",
        "words": generateWordTokens("What time will you come home?"),
        "contentVi": "Bạn sẽ về nhà lúc mấy giờ?"
      },
      {
        "index": 6,
        "start": 23439,
        "end": 4984,
        "content": "Maybe around 10:00 p.m.",
        "words": generateWordTokens("Maybe around 10:00 p.m."),
        "contentVi": "Có lẽ vào khoảng 10 giờ tối."
      },
      {
        "index": 7,
        "start": 25439,
        "end": 5306,
        "content": "1000 p.m. That's too late, Ben.",
        "words": generateWordTokens("1000 p.m. That's too late, Ben."),
        "contentVi": "1000 giờ tối Đã quá muộn rồi, Ben."
      },
      {
        "index": 8,
        "start": 28400,
        "end": 3227,
        "content": "Come on, Mom. Just this one time,",
        "words": generateWordTokens("Come on, Mom. Just this one time,"),
        "contentVi": "Thôi nào mẹ. Chỉ một lần này thôi,"
      },
      {
        "index": 9,
        "start": 30720,
        "end": 4030,
        "content": "please.",
        "words": generateWordTokens("please."),
        "contentVi": "Xin vui lòng."
      },
      {
        "index": 10,
        "start": 31599,
        "end": 3793,
        "content": "No, it's dark and not safe outside at",
        "words": generateWordTokens("No, it's dark and not safe outside at"),
        "contentVi": "Không, bên ngoài trời tối và không an toàn"
      },
      {
        "index": 11,
        "start": 34719,
        "end": 2676,
        "content": "night.",
        "words": generateWordTokens("night."),
        "contentVi": "đêm."
      },
      {
        "index": 12,
        "start": 35360,
        "end": 2914,
        "content": "But all my friends can stay out until",
        "words": generateWordTokens("But all my friends can stay out until"),
        "contentVi": "Nhưng tất cả bạn bè của tôi có thể ở ngoài cho đến khi"
      },
      {
        "index": 13,
        "start": 37360,
        "end": 4756,
        "content": "10:00.",
        "words": generateWordTokens("10:00."),
        "contentVi": "10:00."
      },
      {
        "index": 14,
        "start": 38239,
        "end": 4919,
        "content": "You are not all your friends. You are my",
        "words": generateWordTokens("You are not all your friends. You are my"),
        "contentVi": "Bạn không phải là tất cả bạn bè của bạn. bạn là của tôi"
      },
      {
        "index": 15,
        "start": 42079,
        "end": 3723,
        "content": "son.",
        "words": generateWordTokens("son."),
        "contentVi": "con trai."
      },
      {
        "index": 16,
        "start": 43120,
        "end": 4923,
        "content": "Mom, I'm not a kid anymore.",
        "words": generateWordTokens("Mom, I'm not a kid anymore."),
        "contentVi": "Mẹ ơi, con không còn là trẻ con nữa."
      },
      {
        "index": 17,
        "start": 45760,
        "end": 4365,
        "content": "You still live in my house, so you",
        "words": generateWordTokens("You still live in my house, so you"),
        "contentVi": "Bạn vẫn sống trong nhà của tôi, vì vậy bạn"
      },
      {
        "index": 18,
        "start": 48000,
        "end": 5408,
        "content": "follow my rules.",
        "words": generateWordTokens("follow my rules."),
        "contentVi": "tuân theo các quy tắc của tôi."
      },
      {
        "index": 19,
        "start": 50079,
        "end": 5411,
        "content": "Mom, you never let me do anything fun.",
        "words": generateWordTokens("Mom, you never let me do anything fun."),
        "contentVi": "Mẹ, mẹ không bao giờ để con làm điều gì vui vẻ."
      },
      {
        "index": 20,
        "start": 53360,
        "end": 3412,
        "content": "That's not true. You went out last",
        "words": generateWordTokens("That's not true. You went out last"),
        "contentVi": "Điều đó không đúng. Bạn đã ra ngoài lần cuối"
      },
      {
        "index": 21,
        "start": 55440,
        "end": 3735,
        "content": "weekend, remember?",
        "words": generateWordTokens("weekend, remember?"),
        "contentVi": "cuối tuần, nhớ không?"
      },
      {
        "index": 22,
        "start": 56719,
        "end": 5498,
        "content": "But that was just for 2 hours.",
        "words": generateWordTokens("But that was just for 2 hours."),
        "contentVi": "Nhưng đó chỉ là trong 2 giờ."
      },
      {
        "index": 23,
        "start": 59120,
        "end": 5579,
        "content": "That's enough. I worry about you.",
        "words": generateWordTokens("That's enough. I worry about you."),
        "contentVi": "Thế là đủ rồi. Tôi lo lắng cho bạn."
      },
      {
        "index": 24,
        "start": 62160,
        "end": 5902,
        "content": "I'll be careful. I promise.",
        "words": generateWordTokens("I'll be careful. I promise."),
        "contentVi": "Tôi sẽ cẩn thận. Tôi hứa."
      },
      {
        "index": 25,
        "start": 64640,
        "end": 4945,
        "content": "No, Ben. 10 p.m. is too late. You can",
        "words": generateWordTokens("No, Ben. 10 p.m. is too late. You can"),
        "contentVi": "Không, Ben. 10 giờ tối đã quá muộn. bạn có thể"
      },
      {
        "index": 26,
        "start": 68000,
        "end": 4867,
        "content": "come home by 8.",
        "words": generateWordTokens("come home by 8."),
        "contentVi": "về nhà lúc 8 giờ."
      },
      {
        "index": 27,
        "start": 69520,
        "end": 5349,
        "content": "8:00 p.m. That's so early. We haven't",
        "words": generateWordTokens("8:00 p.m. That's so early. We haven't"),
        "contentVi": "8 giờ tối Còn sớm thế. Chúng tôi chưa"
      },
      {
        "index": 28,
        "start": 72799,
        "end": 4234,
        "content": "even finished eating by then.",
        "words": generateWordTokens("even finished eating by then."),
        "contentVi": "thậm chí đã ăn xong rồi."
      },
      {
        "index": 29,
        "start": 74799,
        "end": 4796,
        "content": "Then don't eat too slow.",
        "words": generateWordTokens("Then don't eat too slow."),
        "contentVi": "Vậy thì đừng ăn quá chậm."
      },
      {
        "index": 30,
        "start": 76960,
        "end": 5517,
        "content": "Mom, please. Just this once.",
        "words": generateWordTokens("Mom, please. Just this once."),
        "contentVi": "Mẹ ơi, làm ơn. Chỉ một lần này thôi."
      },
      {
        "index": 31,
        "start": 79520,
        "end": 5359,
        "content": "The answer is still no.",
        "words": generateWordTokens("The answer is still no."),
        "contentVi": "Câu trả lời vẫn là không."
      },
      {
        "index": 32,
        "start": 82400,
        "end": 3362,
        "content": "Fine. Then can I at least get some more",
        "words": generateWordTokens("Fine. Then can I at least get some more"),
        "contentVi": "Khỏe. Vậy thì ít nhất tôi có thể kiếm thêm chút nữa không?"
      },
      {
        "index": 33,
        "start": 84799,
        "end": 3206,
        "content": "money?",
        "words": generateWordTokens("money?"),
        "contentVi": "tiền bạc?"
      },
      {
        "index": 34,
        "start": 85680,
        "end": 3606,
        "content": "More money? I already gave you a h",
        "words": generateWordTokens("More money? I already gave you a h"),
        "contentVi": "Nhiều tiền hơn? Tôi đã cho bạn một h rồi"
      },
      {
        "index": 35,
        "start": 87920,
        "end": 3287,
        "content": "100,000 dong.",
        "words": generateWordTokens("100,000 dong."),
        "contentVi": "100.000 đồng."
      },
      {
        "index": 36,
        "start": 89200,
        "end": 3368,
        "content": "Yeah, but it's not enough.",
        "words": generateWordTokens("Yeah, but it's not enough."),
        "contentVi": "Ừ, nhưng thế vẫn chưa đủ."
      },
      {
        "index": 37,
        "start": 91119,
        "end": 4572,
        "content": "Not enough for what?",
        "words": generateWordTokens("Not enough for what?"),
        "contentVi": "Không đủ để làm gì?"
      },
      {
        "index": 38,
        "start": 92479,
        "end": 4893,
        "content": "For food and maybe some milk tea and",
        "words": generateWordTokens("For food and maybe some milk tea and"),
        "contentVi": "Để ăn và có thể là một ít trà sữa và"
      },
      {
        "index": 39,
        "start": 95600,
        "end": 4416,
        "content": "maybe a taxi home.",
        "words": generateWordTokens("maybe a taxi home."),
        "contentVi": "có lẽ là một chiếc taxi về nhà."
      },
      {
        "index": 40,
        "start": 97280,
        "end": 5057,
        "content": "You don't need a taxi. You can walk.",
        "words": generateWordTokens("You don't need a taxi. You can walk."),
        "contentVi": "Bạn không cần taxi. Bạn có thể đi bộ."
      },
      {
        "index": 41,
        "start": 99920,
        "end": 3299,
        "content": "Mom, that's dangerous. You said it's not",
        "words": generateWordTokens("Mom, that's dangerous. You said it's not"),
        "contentVi": "Mẹ ơi, nguy hiểm lắm. Bạn đã nói là không phải"
      },
      {
        "index": 42,
        "start": 102240,
        "end": 2902,
        "content": "safe.",
        "words": generateWordTokens("safe."),
        "contentVi": "an toàn."
      },
      {
        "index": 43,
        "start": 103119,
        "end": 3304,
        "content": "Don't try to use my words against me,",
        "words": generateWordTokens("Don't try to use my words against me,"),
        "contentVi": "Đừng cố dùng lời nói của tôi để chống lại tôi,"
      },
      {
        "index": 44,
        "start": 105040,
        "end": 4665,
        "content": "young man.",
        "words": generateWordTokens("young man."),
        "contentVi": "chàng trai trẻ."
      },
      {
        "index": 45,
        "start": 106320,
        "end": 6026,
        "content": "Come on, Mom. Please. Just 50,000 more.",
        "words": generateWordTokens("Come on, Mom. Please. Just 50,000 more."),
        "contentVi": "Thôi nào mẹ. Vui lòng. Chỉ còn 50.000 nữa thôi."
      },
      {
        "index": 46,
        "start": 109600,
        "end": 3550,
        "content": "No, Ben. You'll just waste it on games",
        "words": generateWordTokens("No, Ben. You'll just waste it on games"),
        "contentVi": "Không, Ben. Bạn sẽ lãng phí nó vào các trò chơi"
      },
      {
        "index": 47,
        "start": 112240,
        "end": 4512,
        "content": "again.",
        "words": generateWordTokens("again."),
        "contentVi": "lại."
      },
      {
        "index": 48,
        "start": 113040,
        "end": 5872,
        "content": "What? No, I won't. Last time you said",
        "words": generateWordTokens("What? No, I won't. Last time you said"),
        "contentVi": "Cái gì? Không, tôi sẽ không. Lần trước bạn đã nói"
      },
      {
        "index": 49,
        "start": 116640,
        "end": 4276,
        "content": "that and guess what? You bought ice",
        "words": generateWordTokens("that and guess what? You bought ice"),
        "contentVi": "đó và đoán xem? Bạn đã mua đá"
      },
      {
        "index": 50,
        "start": 118799,
        "end": 4600,
        "content": "cream and didn't even eat dinner.",
        "words": generateWordTokens("cream and didn't even eat dinner."),
        "contentVi": "kem và thậm chí không ăn bữa tối."
      },
      {
        "index": 51,
        "start": 120799,
        "end": 4682,
        "content": "That was last time. I've changed.",
        "words": generateWordTokens("That was last time. I've changed."),
        "contentVi": "Đó là lần cuối cùng. Tôi đã thay đổi."
      },
      {
        "index": 52,
        "start": 123280,
        "end": 4523,
        "content": "Really? For 1 week?",
        "words": generateWordTokens("Really? For 1 week?"),
        "contentVi": "Thật sự? Trong 1 tuần?"
      },
      {
        "index": 53,
        "start": 125360,
        "end": 6205,
        "content": "I'm serious, Mom. Please.",
        "words": generateWordTokens("I'm serious, Mom. Please."),
        "contentVi": "Con nghiêm túc đấy mẹ ạ. Vui lòng."
      },
      {
        "index": 54,
        "start": 127680,
        "end": 5407,
        "content": "Fine, but only 30,000 more. And you must",
        "words": generateWordTokens("Fine, but only 30,000 more. And you must"),
        "contentVi": "Được thôi, nhưng chỉ còn 30.000 nữa thôi. Và bạn phải"
      },
      {
        "index": 55,
        "start": 131440,
        "end": 4211,
        "content": "be home by 9.",
        "words": generateWordTokens("be home by 9."),
        "contentVi": "về nhà trước 9 giờ."
      },
      {
        "index": 56,
        "start": 132959,
        "end": 5413,
        "content": "9? You said 8 before.",
        "words": generateWordTokens("9? You said 8 before."),
        "contentVi": "9? Trước đây bạn đã nói là 8."
      },
      {
        "index": 57,
        "start": 135520,
        "end": 3575,
        "content": "Yes, I'm being nice. Don't push your",
        "words": generateWordTokens("Yes, I'm being nice. Don't push your"),
        "contentVi": "Vâng, tôi đang cư xử tử tế. Đừng đẩy bạn"
      },
      {
        "index": 58,
        "start": 138239,
        "end": 4459,
        "content": "luck.",
        "words": generateWordTokens("luck."),
        "contentVi": "may mắn."
      },
      {
        "index": 59,
        "start": 138959,
        "end": 6059,
        "content": "Okay. Okay. 900 p.m. I promise. And",
        "words": generateWordTokens("Okay. Okay. 900 p.m. I promise. And"),
        "contentVi": "Được rồi. Được rồi. 9 giờ tối Tôi hứa. Và"
      },
      {
        "index": 60,
        "start": 142560,
        "end": 4623,
        "content": "don't forget to text me where you are.",
        "words": generateWordTokens("don't forget to text me where you are."),
        "contentVi": "đừng quên nhắn tin cho tôi biết bạn đang ở đâu."
      },
      {
        "index": 61,
        "start": 144879,
        "end": 4946,
        "content": "Yes, Mom. You're the best.",
        "words": generateWordTokens("Yes, Mom. You're the best."),
        "contentVi": "Vâng, mẹ. Bạn là người giỏi nhất."
      },
      {
        "index": 62,
        "start": 147040,
        "end": 3827,
        "content": "I know. Now, go clean your room before",
        "words": generateWordTokens("I know. Now, go clean your room before"),
        "contentVi": "Tôi biết. Bây giờ hãy đi dọn phòng trước đi"
      },
      {
        "index": 63,
        "start": 149680,
        "end": 2310,
        "content": "you go.",
        "words": generateWordTokens("you go."),
        "contentVi": "bạn đi đi."
      },
      {
        "index": 64,
        "start": 150720,
        "end": 4390,
        "content": "What? But",
        "words": generateWordTokens("What? But"),
        "contentVi": "Cái gì? Nhưng"
      },
      {
        "index": 65,
        "start": 151840,
        "end": 4872,
        "content": "No, but you want to go out, you clean",
        "words": generateWordTokens("No, but you want to go out, you clean"),
        "contentVi": "Không, nhưng bạn muốn đi chơi, bạn dọn dẹp"
      },
      {
        "index": 66,
        "start": 154959,
        "end": 2636,
        "content": "first.",
        "words": generateWordTokens("first."),
        "contentVi": "Đầu tiên."
      },
      {
        "index": 67,
        "start": 156560,
        "end": 4556,
        "content": "Fine.",
        "words": generateWordTokens("Fine."),
        "contentVi": "Khỏe."
      },
      {
        "index": 68,
        "start": 157440,
        "end": 4557,
        "content": "And remember, home by 9:00, not 1 minute",
        "words": generateWordTokens("And remember, home by 9:00, not 1 minute"),
        "contentVi": "Và hãy nhớ, về nhà trước 9 giờ chứ không phải 1 phút"
      },
      {
        "index": 69,
        "start": 160959,
        "end": 4642,
        "content": "late.",
        "words": generateWordTokens("late."),
        "contentVi": "muộn."
      },
      {
        "index": 70,
        "start": 161840,
        "end": 6002,
        "content": "I know. I know. 900 p.m. Sharp.",
        "words": generateWordTokens("I know. I know. 900 p.m. Sharp."),
        "contentVi": "Tôi biết. Tôi biết. 9 giờ tối Sắc."
      },
      {
        "index": 71,
        "start": 165440,
        "end": 4405,
        "content": "If you're late, I'll lock the door.",
        "words": generateWordTokens("If you're late, I'll lock the door."),
        "contentVi": "Nếu cậu đến muộn tôi sẽ khóa cửa lại."
      },
      {
        "index": 72,
        "start": 167680,
        "end": 4807,
        "content": "Mom, you're so dramatic.",
        "words": generateWordTokens("Mom, you're so dramatic."),
        "contentVi": "Mẹ, mẹ kịch tính quá."
      },
      {
        "index": 73,
        "start": 169680,
        "end": 5449,
        "content": "I learned from the best. you.",
        "words": generateWordTokens("I learned from the best. you."),
        "contentVi": "Tôi đã học được từ những điều tốt nhất. Bạn."
      },
      {
        "index": 74,
        "start": 172319,
        "end": 7812,
        "content": "Okay. Okay. I'll be back early.",
        "words": generateWordTokens("Okay. Okay. I'll be back early."),
        "contentVi": "Được rồi. Được rồi. Tôi sẽ về sớm."
      },
      {
        "index": 75,
        "start": 174959,
        "end": 5175,
        "content": "Good boy. Now, hurry up.",
        "words": generateWordTokens("Good boy. Now, hurry up."),
        "contentVi": "Chàng trai tốt. Bây giờ, nhanh lên."
      }
    ]
  },

  "luyen-nghe-a2-q_ilbzidxok": {
    "title": "Luyện Nghe Tiếng Anh Level A2 - A Job",
    "audio_url": "q_ilbziDXOk",
    "repeat_offset": 191.84,
    "sentences": [
      {
        "index": 0,
        "start": 11599,
        "end": 5612,
        "content": "Now listen carefully.",
        "words": generateWordTokens("Now listen carefully."),
        "contentVi": "Bây giờ hãy lắng nghe cẩn thận."
      },
      {
        "index": 1,
        "start": 14160,
        "end": 4014,
        "content": "Hey Anna, you look really tired. Are you",
        "words": generateWordTokens("Hey Anna, you look really tired. Are you"),
        "contentVi": "Này Anna, trông bạn có vẻ mệt mỏi quá. Bạn có phải"
      },
      {
        "index": 2,
        "start": 17199,
        "end": 4898,
        "content": "okay?",
        "words": generateWordTokens("okay?"),
        "contentVi": "được rồi?"
      },
      {
        "index": 3,
        "start": 18160,
        "end": 6338,
        "content": "Not really. I feel so tired every day.",
        "words": generateWordTokens("Not really. I feel so tired every day."),
        "contentVi": "Không thực sự. Tôi cảm thấy rất mệt mỏi mỗi ngày."
      },
      {
        "index": 4,
        "start": 22080,
        "end": 5141,
        "content": "Why? Too much studying again?",
        "words": generateWordTokens("Why? Too much studying again?"),
        "contentVi": "Tại sao? Lại học nhiều quá à?"
      },
      {
        "index": 5,
        "start": 24480,
        "end": 5624,
        "content": "Yeah, it never ends. One test after",
        "words": generateWordTokens("Yeah, it never ends. One test after"),
        "contentVi": "Vâng, nó không bao giờ kết thúc. Một bài kiểm tra sau"
      },
      {
        "index": 6,
        "start": 27199,
        "end": 6108,
        "content": "another, one subject after another.",
        "words": generateWordTokens("another, one subject after another."),
        "contentVi": "khác, chủ đề này đến chủ đề khác."
      },
      {
        "index": 7,
        "start": 30080,
        "end": 5310,
        "content": "Same for me. I study all day, then go",
        "words": generateWordTokens("Same for me. I study all day, then go"),
        "contentVi": "Đối với tôi cũng vậy. Tôi học cả ngày rồi đi"
      },
      {
        "index": 8,
        "start": 33280,
        "end": 5152,
        "content": "home and study again.",
        "words": generateWordTokens("home and study again."),
        "contentVi": "về nhà và học lại."
      },
      {
        "index": 9,
        "start": 35360,
        "end": 4914,
        "content": "Exactly. When I finish one exam, another",
        "words": generateWordTokens("Exactly. When I finish one exam, another"),
        "contentVi": "Chính xác. Khi tôi hoàn thành một kỳ thi, một kỳ thi khác"
      },
      {
        "index": 10,
        "start": 38399,
        "end": 5159,
        "content": "one comes right away.",
        "words": generateWordTokens("one comes right away."),
        "contentVi": "một người đến ngay lập tức."
      },
      {
        "index": 11,
        "start": 40239,
        "end": 5961,
        "content": "I know. Sometimes I just want to stop.",
        "words": generateWordTokens("I know. Sometimes I just want to stop."),
        "contentVi": "Tôi biết. Đôi khi tôi chỉ muốn dừng lại."
      },
      {
        "index": 12,
        "start": 43520,
        "end": 4044,
        "content": "But if I stop, I feel scared.",
        "words": generateWordTokens("But if I stop, I feel scared."),
        "contentVi": "Nhưng nếu tôi dừng lại, tôi cảm thấy sợ hãi."
      },
      {
        "index": 13,
        "start": 46160,
        "end": 3886,
        "content": "Scared of what?",
        "words": generateWordTokens("Scared of what?"),
        "contentVi": "Sợ cái gì cơ?"
      },
      {
        "index": 14,
        "start": 47520,
        "end": 4767,
        "content": "Scared that if I don't study, I won't",
        "words": generateWordTokens("Scared that if I don't study, I won't"),
        "contentVi": "Sợ rằng nếu không học thì sẽ không"
      },
      {
        "index": 15,
        "start": 50000,
        "end": 5730,
        "content": "get a good job in the future.",
        "words": generateWordTokens("get a good job in the future."),
        "contentVi": "có được một công việc tốt trong tương lai."
      },
      {
        "index": 16,
        "start": 52239,
        "end": 4852,
        "content": "Yeah, me too. Everyone says, \"Study hard",
        "words": generateWordTokens("Yeah, me too. Everyone says, \"Study hard"),
        "contentVi": "Vâng, tôi cũng vậy. Mọi người đều nói: “Học chăm chỉ"
      },
      {
        "index": 17,
        "start": 55680,
        "end": 4775,
        "content": "or you'll be nothing.\"",
        "words": generateWordTokens("or you'll be nothing.\""),
        "contentVi": "nếu không bạn sẽ chẳng là gì cả.\""
      },
      {
        "index": 18,
        "start": 57039,
        "end": 4298,
        "content": "It's so stressful. I want to rest, but I",
        "words": generateWordTokens("It's so stressful. I want to rest, but I"),
        "contentVi": "Thật là căng thẳng. Tôi muốn nghỉ ngơi nhưng tôi"
      },
      {
        "index": 19,
        "start": 60399,
        "end": 3981,
        "content": "can't.",
        "words": generateWordTokens("can't."),
        "contentVi": "không thể."
      },
      {
        "index": 20,
        "start": 61280,
        "end": 4701,
        "content": "Same here. When I rest, I think I'm",
        "words": generateWordTokens("Same here. When I rest, I think I'm"),
        "contentVi": "Ở đây cũng vậy. Khi tôi nghỉ ngơi, tôi nghĩ tôi"
      },
      {
        "index": 21,
        "start": 64320,
        "end": 4384,
        "content": "wasting time.",
        "words": generateWordTokens("wasting time."),
        "contentVi": "lãng phí thời gian."
      },
      {
        "index": 22,
        "start": 65920,
        "end": 3986,
        "content": "And when I study, I think I can't do",
        "words": generateWordTokens("And when I study, I think I can't do"),
        "contentVi": "Và khi tôi học, tôi nghĩ tôi không thể làm được"
      },
      {
        "index": 23,
        "start": 68640,
        "end": 3269,
        "content": "this anymore.",
        "words": generateWordTokens("this anymore."),
        "contentVi": "cái này nữa."
      },
      {
        "index": 24,
        "start": 69840,
        "end": 4709,
        "content": "That's burnout, Anna.",
        "words": generateWordTokens("That's burnout, Anna."),
        "contentVi": "Đó là sự kiệt sức, Anna."
      },
      {
        "index": 25,
        "start": 71840,
        "end": 4152,
        "content": "Yeah. I feel like I'm on fire, but not",
        "words": generateWordTokens("Yeah. I feel like I'm on fire, but not"),
        "contentVi": "Vâng. Tôi cảm thấy như mình đang bốc cháy, nhưng không phải vậy"
      },
      {
        "index": 26,
        "start": 74479,
        "end": 4555,
        "content": "in a good way.",
        "words": generateWordTokens("in a good way."),
        "contentVi": "một cách tốt đẹp."
      },
      {
        "index": 27,
        "start": 75920,
        "end": 5836,
        "content": "Same. My brain is burning.",
        "words": generateWordTokens("Same. My brain is burning."),
        "contentVi": "Như nhau. Não tôi đang cháy."
      },
      {
        "index": 28,
        "start": 78960,
        "end": 4558,
        "content": "And at home, there's also work to do.",
        "words": generateWordTokens("And at home, there's also work to do."),
        "contentVi": "Và ở nhà cũng có việc phải làm."
      },
      {
        "index": 29,
        "start": 81680,
        "end": 4561,
        "content": "You mean housework?",
        "words": generateWordTokens("You mean housework?"),
        "contentVi": "Ý bạn là việc nhà?"
      },
      {
        "index": 30,
        "start": 83439,
        "end": 4403,
        "content": "Yeah. If I don't help, my parents think",
        "words": generateWordTokens("Yeah. If I don't help, my parents think"),
        "contentVi": "Vâng. Nếu tôi không giúp, bố mẹ tôi sẽ nghĩ"
      },
      {
        "index": 31,
        "start": 86159,
        "end": 4487,
        "content": "I don't care.",
        "words": generateWordTokens("I don't care."),
        "contentVi": "Tôi không quan tâm."
      },
      {
        "index": 32,
        "start": 87759,
        "end": 5289,
        "content": "My mom, too. She says, \"You just study",
        "words": generateWordTokens("My mom, too. She says, \"You just study"),
        "contentVi": "Mẹ tôi cũng vậy. Cô ấy nói: \"Bạn chỉ cần học"
      },
      {
        "index": 33,
        "start": 90560,
        "end": 5371,
        "content": "and do nothing for the family.\"",
        "words": generateWordTokens("and do nothing for the family.\""),
        "contentVi": "và không làm gì cho gia đình cả.\""
      },
      {
        "index": 34,
        "start": 92960,
        "end": 4252,
        "content": "But if we help too much, we have no time",
        "words": generateWordTokens("But if we help too much, we have no time"),
        "contentVi": "Nhưng nếu chúng ta giúp đỡ quá nhiều, chúng ta sẽ không có thời gian"
      },
      {
        "index": 35,
        "start": 95840,
        "end": 4576,
        "content": "to study,",
        "words": generateWordTokens("to study,"),
        "contentVi": "để học,"
      },
      {
        "index": 36,
        "start": 97119,
        "end": 6178,
        "content": "right? It feels like we can't win.",
        "words": generateWordTokens("right? It feels like we can't win."),
        "contentVi": "Phải? Có vẻ như chúng tôi không thể thắng được."
      },
      {
        "index": 37,
        "start": 100320,
        "end": 5780,
        "content": "Yeah. If I study, I feel guilty for not",
        "words": generateWordTokens("Yeah. If I study, I feel guilty for not"),
        "contentVi": "Vâng. Nếu tôi học, tôi cảm thấy có lỗi vì đã không"
      },
      {
        "index": 38,
        "start": 103200,
        "end": 4423,
        "content": "helping. If I help, I feel guilty for",
        "words": generateWordTokens("helping. If I help, I feel guilty for"),
        "contentVi": "giúp đỡ. Nếu tôi giúp đỡ, tôi cảm thấy có lỗi vì"
      },
      {
        "index": 39,
        "start": 106000,
        "end": 5225,
        "content": "not studying.",
        "words": generateWordTokens("not studying."),
        "contentVi": "không học."
      },
      {
        "index": 40,
        "start": 107520,
        "end": 7148,
        "content": "Life is so hard sometimes. I just want",
        "words": generateWordTokens("Life is so hard sometimes. I just want"),
        "contentVi": "Cuộc sống đôi khi thật khó khăn. tôi chỉ muốn"
      },
      {
        "index": 41,
        "start": 111119,
        "end": 4512,
        "content": "one day with no school, no work, no",
        "words": generateWordTokens("one day with no school, no work, no"),
        "contentVi": "một ngày không đi học, không làm việc, không"
      },
      {
        "index": 42,
        "start": 114560,
        "end": 4994,
        "content": "thinking,",
        "words": generateWordTokens("thinking,"),
        "contentVi": "suy nghĩ,"
      },
      {
        "index": 43,
        "start": 115520,
        "end": 7156,
        "content": "a quiet day with sleep and peace.",
        "words": generateWordTokens("a quiet day with sleep and peace."),
        "contentVi": "một ngày yên tĩnh với giấc ngủ và hòa bình."
      },
      {
        "index": 44,
        "start": 119439,
        "end": 5720,
        "content": "And no one asking, \"Did you study yet?\"",
        "words": generateWordTokens("And no one asking, \"Did you study yet?\""),
        "contentVi": "Và không ai hỏi \"Bạn đã học chưa?\""
      },
      {
        "index": 45,
        "start": 122560,
        "end": 5002,
        "content": "or \"When is your next exam?\"",
        "words": generateWordTokens("or \"When is your next exam?\""),
        "contentVi": "hoặc \"Khi nào thì kỳ thi tiếp theo của bạn diễn ra?\""
      },
      {
        "index": 46,
        "start": 125040,
        "end": 3805,
        "content": "Uh, I hate that question.",
        "words": generateWordTokens("Uh, I hate that question."),
        "contentVi": "Uh, tôi ghét câu hỏi đó."
      },
      {
        "index": 47,
        "start": 127439,
        "end": 3567,
        "content": "Me, too.",
        "words": generateWordTokens("Me, too."),
        "contentVi": "Tôi cũng vậy."
      },
      {
        "index": 48,
        "start": 128720,
        "end": 4529,
        "content": "You know what's funny? Everyone says",
        "words": generateWordTokens("You know what's funny? Everyone says"),
        "contentVi": "Bạn biết điều gì buồn cười không? Mọi người đều nói"
      },
      {
        "index": 49,
        "start": 130879,
        "end": 5092,
        "content": "being a student is easy.",
        "words": generateWordTokens("being a student is easy."),
        "contentVi": "trở thành sinh viên thật dễ dàng."
      },
      {
        "index": 50,
        "start": 133120,
        "end": 3972,
        "content": "Yeah, but it's not. It's a full-time",
        "words": generateWordTokens("Yeah, but it's not. It's a full-time"),
        "contentVi": "Ừ, nhưng không phải vậy. Đó là công việc toàn thời gian"
      },
      {
        "index": 51,
        "start": 135840,
        "end": 4535,
        "content": "job.",
        "words": generateWordTokens("job."),
        "contentVi": "công việc."
      },
      {
        "index": 52,
        "start": 136959,
        "end": 4858,
        "content": "True. We study, work, and still worry",
        "words": generateWordTokens("True. We study, work, and still worry"),
        "contentVi": "ĐÚNG VẬY. Chúng ta học tập, làm việc và vẫn lo lắng"
      },
      {
        "index": 53,
        "start": 140239,
        "end": 4780,
        "content": "about the future.",
        "words": generateWordTokens("about the future."),
        "contentVi": "về tương lai."
      },
      {
        "index": 54,
        "start": 141680,
        "end": 5341,
        "content": "Sometimes I wonder, will all this really",
        "words": generateWordTokens("Sometimes I wonder, will all this really"),
        "contentVi": "Đôi khi tôi tự hỏi liệu tất cả những điều này có thực sự"
      },
      {
        "index": 55,
        "start": 144879,
        "end": 4865,
        "content": "make us happy one day?",
        "words": generateWordTokens("make us happy one day?"),
        "contentVi": "làm cho chúng ta hạnh phúc một ngày?"
      },
      {
        "index": 56,
        "start": 146879,
        "end": 5988,
        "content": "I don't know, but I hope so.",
        "words": generateWordTokens("I don't know, but I hope so."),
        "contentVi": "Tôi không biết, nhưng tôi hy vọng như vậy."
      },
      {
        "index": 57,
        "start": 149599,
        "end": 5031,
        "content": "Maybe we just need balance. Study, rest,",
        "words": generateWordTokens("Maybe we just need balance. Study, rest,"),
        "contentVi": "Có lẽ chúng ta chỉ cần sự cân bằng. Học tập, nghỉ ngơi,"
      },
      {
        "index": 58,
        "start": 152720,
        "end": 4153,
        "content": "and live a little.",
        "words": generateWordTokens("and live a little."),
        "contentVi": "và sống một chút."
      },
      {
        "index": 59,
        "start": 154480,
        "end": 4154,
        "content": "Yeah, but it's hard when everyone around",
        "words": generateWordTokens("Yeah, but it's hard when everyone around"),
        "contentVi": "Ừ, nhưng thật khó khi mọi người xung quanh"
      },
      {
        "index": 60,
        "start": 156720,
        "end": 4956,
        "content": "you keeps running.",
        "words": generateWordTokens("you keeps running."),
        "contentVi": "bạn tiếp tục chạy."
      },
      {
        "index": 61,
        "start": 158480,
        "end": 4718,
        "content": "Maybe we don't have to run. Maybe we can",
        "words": generateWordTokens("Maybe we don't have to run. Maybe we can"),
        "contentVi": "Có lẽ chúng ta không cần phải chạy. Có lẽ chúng ta có thể"
      },
      {
        "index": 62,
        "start": 161519,
        "end": 4563,
        "content": "just walk.",
        "words": generateWordTokens("just walk."),
        "contentVi": "chỉ cần đi bộ."
      },
      {
        "index": 63,
        "start": 163040,
        "end": 6002,
        "content": "That sounds nice. I want to walk for",
        "words": generateWordTokens("That sounds nice. I want to walk for"),
        "contentVi": "Điều đó nghe có vẻ hay đấy. tôi muốn đi bộ cho"
      },
      {
        "index": 64,
        "start": 165920,
        "end": 5845,
        "content": "once. Then let's promise to take it",
        "words": generateWordTokens("once. Then let's promise to take it"),
        "contentVi": "một lần. Vậy thì hãy hứa sẽ nhận nó"
      },
      {
        "index": 65,
        "start": 168879,
        "end": 5850,
        "content": "slow, one step at a time.",
        "words": generateWordTokens("slow, one step at a time."),
        "contentVi": "chậm rãi, từng bước một."
      },
      {
        "index": 66,
        "start": 171599,
        "end": 4413,
        "content": "Deal. But only if you promise to sleep",
        "words": generateWordTokens("Deal. But only if you promise to sleep"),
        "contentVi": "Thỏa thuận. Nhưng chỉ khi bạn hứa sẽ ngủ"
      },
      {
        "index": 67,
        "start": 174560,
        "end": 4175,
        "content": "before midnight.",
        "words": generateWordTokens("before midnight."),
        "contentVi": "trước nửa đêm."
      },
      {
        "index": 68,
        "start": 175840,
        "end": 5935,
        "content": "I'll try. You too. Okay.",
        "words": generateWordTokens("I'll try. You too. Okay."),
        "contentVi": "Tôi sẽ cố gắng. Bạn cũng vậy. Được rồi."
      },
      {
        "index": 69,
        "start": 178560,
        "end": 6739,
        "content": "Okay. And maybe tomorrow let's go for",
        "words": generateWordTokens("Okay. And maybe tomorrow let's go for"),
        "contentVi": "Được rồi. Và có lẽ ngày mai chúng ta hãy đi tiếp"
      },
      {
        "index": 70,
        "start": 181599,
        "end": 6423,
        "content": "coffee after class. No study, just talk.",
        "words": generateWordTokens("coffee after class. No study, just talk."),
        "contentVi": "cà phê sau giờ học. Không học, chỉ nói chuyện."
      },
      {
        "index": 71,
        "start": 185120,
        "end": 4024,
        "content": "Perfect. A small break for our tired",
        "words": generateWordTokens("Perfect. A small break for our tired"),
        "contentVi": "Hoàn hảo. Một chút nghỉ ngơi cho sự mệt mỏi của chúng tôi"
      },
      {
        "index": 72,
        "start": 187840,
        "end": 4188,
        "content": "brains.",
        "words": generateWordTokens("brains."),
        "contentVi": "bộ não."
      },
      {
        "index": 73,
        "start": 188959,
        "end": 5790,
        "content": "Yeah, maybe that's what we need. Not",
        "words": generateWordTokens("Yeah, maybe that's what we need. Not"),
        "contentVi": "Vâng, có lẽ đó là những gì chúng ta cần. Không"
      },
      {
        "index": 74,
        "start": 191840,
        "end": 6591,
        "content": "more studying, but more breathing.",
        "words": generateWordTokens("more studying, but more breathing."),
        "contentVi": "học nhiều hơn, nhưng thở nhiều hơn."
      },
      {
        "index": 75,
        "start": 194560,
        "end": 9594,
        "content": "You're right. Let's breathe, not burn.",
        "words": generateWordTokens("You're right. Let's breathe, not burn."),
        "contentVi": "Bạn nói đúng. Hãy thở, đừng đốt cháy."
      },
      {
        "index": 76,
        "start": 198239,
        "end": 5918,
        "content": "Ha, nice line, Tom. I'll remember that.",
        "words": generateWordTokens("Ha, nice line, Tom. I'll remember that."),
        "contentVi": "Ha, câu nói hay đấy, Tom. Tôi sẽ nhớ điều đó."
      }
    ]
  },

  "luyen-nghe-a2-wd7vbworrhe": {
    "title": "Luyện Nghe Tiếng Anh Level A2 - A Class",
    "audio_url": "WD7vbWoRRHE",
    "repeat_offset": 226.32,
    "sentences": [
      {
        "index": 0,
        "start": 11840,
        "end": 4252,
        "content": "Now listen carefully.",
        "words": generateWordTokens("Now listen carefully."),
        "contentVi": "Bây giờ hãy lắng nghe cẩn thận."
      },
      {
        "index": 1,
        "start": 14160,
        "end": 3133,
        "content": "Hey Anna, have you ever thought about",
        "words": generateWordTokens("Hey Anna, have you ever thought about"),
        "contentVi": "Này Anna, bạn đã bao giờ nghĩ tới"
      },
      {
        "index": 2,
        "start": 16080,
        "end": 4736,
        "content": "the future?",
        "words": generateWordTokens("the future?"),
        "contentVi": "tương lai?"
      },
      {
        "index": 3,
        "start": 17279,
        "end": 4258,
        "content": "The future? Like a 100red years from",
        "words": generateWordTokens("The future? Like a 100red years from"),
        "contentVi": "Tương lai? Giống như 100 năm đỏ kể từ"
      },
      {
        "index": 4,
        "start": 20800,
        "end": 2901,
        "content": "now?",
        "words": generateWordTokens("now?"),
        "contentVi": "Hiện nay?"
      },
      {
        "index": 5,
        "start": 21520,
        "end": 3062,
        "content": "Yeah. What do you think cities will look",
        "words": generateWordTokens("Yeah. What do you think cities will look"),
        "contentVi": "Vâng. Bạn nghĩ các thành phố sẽ trông như thế nào"
      },
      {
        "index": 6,
        "start": 23680,
        "end": 5623,
        "content": "like then?",
        "words": generateWordTokens("like then?"),
        "contentVi": "như thế nào?"
      },
      {
        "index": 7,
        "start": 24560,
        "end": 8345,
        "content": "H maybe everything will fly. Flying",
        "words": generateWordTokens("H maybe everything will fly. Flying"),
        "contentVi": "H có lẽ mọi thứ sẽ bay. Đang bay"
      },
      {
        "index": 8,
        "start": 29279,
        "end": 6030,
        "content": "cars, flying buses, flying pizza.",
        "words": generateWordTokens("cars, flying buses, flying pizza."),
        "contentVi": "ô tô, xe buýt bay, pizza bay."
      },
      {
        "index": 9,
        "start": 32880,
        "end": 4673,
        "content": "Flying pizza. I like that idea.",
        "words": generateWordTokens("Flying pizza. I like that idea."),
        "contentVi": "Pizza bay. Tôi thích ý tưởng đó."
      },
      {
        "index": 10,
        "start": 35280,
        "end": 5075,
        "content": "Yeah, the pizza will come to your window",
        "words": generateWordTokens("Yeah, the pizza will come to your window"),
        "contentVi": "Vâng, pizza sẽ đến trước cửa sổ nhà bạn"
      },
      {
        "index": 11,
        "start": 37520,
        "end": 5478,
        "content": "by drone. No more deliverymen.",
        "words": generateWordTokens("by drone. No more deliverymen."),
        "contentVi": "bằng máy bay không người lái. Không còn người giao hàng nữa."
      },
      {
        "index": 12,
        "start": 40320,
        "end": 5080,
        "content": "That's crazy, but cool. I think",
        "words": generateWordTokens("That's crazy, but cool. I think"),
        "contentVi": "Điều đó thật điên rồ, nhưng tuyệt vời. tôi nghĩ"
      },
      {
        "index": 13,
        "start": 42960,
        "end": 4122,
        "content": "buildings will be super tall.",
        "words": generateWordTokens("buildings will be super tall."),
        "contentVi": "các tòa nhà sẽ siêu cao."
      },
      {
        "index": 14,
        "start": 45360,
        "end": 4365,
        "content": "Like touching the clouds.",
        "words": generateWordTokens("Like touching the clouds."),
        "contentVi": "Như chạm vào mây."
      },
      {
        "index": 15,
        "start": 47039,
        "end": 3567,
        "content": "Yeah, maybe people will live inside the",
        "words": generateWordTokens("Yeah, maybe people will live inside the"),
        "contentVi": "Vâng, có lẽ mọi người sẽ sống bên trong"
      },
      {
        "index": 16,
        "start": 49680,
        "end": 3970,
        "content": "clouds.",
        "words": generateWordTokens("clouds."),
        "contentVi": "những đám mây."
      },
      {
        "index": 17,
        "start": 50559,
        "end": 6531,
        "content": "Wow. I want a house in the sky then.",
        "words": generateWordTokens("Wow. I want a house in the sky then."),
        "contentVi": "Ồ. Lúc đó tôi muốn có một ngôi nhà trên bầu trời."
      },
      {
        "index": 18,
        "start": 53600,
        "end": 5333,
        "content": "I want a smart house. The lights turn on",
        "words": generateWordTokens("I want a smart house. The lights turn on"),
        "contentVi": "Tôi muốn có một ngôi nhà thông minh. Đèn bật lên"
      },
      {
        "index": 19,
        "start": 57039,
        "end": 3818,
        "content": "when I say hello.",
        "words": generateWordTokens("when I say hello."),
        "contentVi": "khi tôi nói xin chào."
      },
      {
        "index": 20,
        "start": 58879,
        "end": 4715,
        "content": "And the fridge will talk to you.",
        "words": generateWordTokens("And the fridge will talk to you."),
        "contentVi": "Và tủ lạnh sẽ nói chuyện với bạn."
      },
      {
        "index": 21,
        "start": 60800,
        "end": 3661,
        "content": "Hey Tom, you ate too much cake today.",
        "words": generateWordTokens("Hey Tom, you ate too much cake today."),
        "contentVi": "Này Tom, hôm nay bạn ăn quá nhiều bánh."
      },
      {
        "index": 22,
        "start": 63535,
        "end": 3249,
        "content": "[laughter]",
        "words": generateWordTokens("[laughter]"),
        "contentVi": "[cười]"
      },
      {
        "index": 23,
        "start": 64400,
        "end": 3504,
        "content": "That's funny. I'd hate a fridge that",
        "words": generateWordTokens("That's funny. I'd hate a fridge that"),
        "contentVi": "Điều đó thật buồn cười. Tôi ghét cái tủ lạnh đó"
      },
      {
        "index": 24,
        "start": 66720,
        "end": 4307,
        "content": "judges me.",
        "words": generateWordTokens("judges me."),
        "contentVi": "phán xét tôi."
      },
      {
        "index": 25,
        "start": 67840,
        "end": 5508,
        "content": "In the future, people won't even cook.",
        "words": generateWordTokens("In the future, people won't even cook."),
        "contentVi": "Trong tương lai, mọi người thậm chí sẽ không nấu ăn."
      },
      {
        "index": 26,
        "start": 70960,
        "end": 6311,
        "content": "Robots will do everything.",
        "words": generateWordTokens("Robots will do everything."),
        "contentVi": "Robot sẽ làm mọi thứ."
      },
      {
        "index": 27,
        "start": 73280,
        "end": 5033,
        "content": "So lazy, but sounds nice. I don't like",
        "words": generateWordTokens("So lazy, but sounds nice. I don't like"),
        "contentVi": "Lười quá nhưng nghe hay đấy. tôi không thích"
      },
      {
        "index": 28,
        "start": 77200,
        "end": 3757,
        "content": "washing dishes.",
        "words": generateWordTokens("washing dishes."),
        "contentVi": "rửa bát."
      },
      {
        "index": 29,
        "start": 78240,
        "end": 6238,
        "content": "Me neither. Robots can clean the house,",
        "words": generateWordTokens("Me neither. Robots can clean the house,"),
        "contentVi": "Tôi cũng vậy. Robot có thể dọn dẹp nhà cửa"
      },
      {
        "index": 30,
        "start": 80880,
        "end": 5841,
        "content": "cook dinner, even walk the dog. What if",
        "words": generateWordTokens("cook dinner, even walk the dog. What if"),
        "contentVi": "nấu bữa tối, thậm chí dắt chó đi dạo. Điều gì sẽ xảy ra nếu"
      },
      {
        "index": 31,
        "start": 84400,
        "end": 4163,
        "content": "the robot gets angry and leaves?",
        "words": generateWordTokens("the robot gets angry and leaves?"),
        "contentVi": "robot nổi giận và bỏ đi?"
      },
      {
        "index": 32,
        "start": 86640,
        "end": 4167,
        "content": "Then we'll buy a new one.",
        "words": generateWordTokens("Then we'll buy a new one."),
        "contentVi": "Sau đó chúng ta sẽ mua một cái mới."
      },
      {
        "index": 33,
        "start": 88479,
        "end": 5048,
        "content": "Rich people like you, maybe.",
        "words": generateWordTokens("Rich people like you, maybe."),
        "contentVi": "Có lẽ là những người giàu có như bạn."
      },
      {
        "index": 34,
        "start": 90720,
        "end": 3611,
        "content": "No. No. In the future, everyone will be",
        "words": generateWordTokens("No. No. In the future, everyone will be"),
        "contentVi": "Không. Không. Trong tương lai, mọi người sẽ"
      },
      {
        "index": 35,
        "start": 93439,
        "end": 3614,
        "content": "rich.",
        "words": generateWordTokens("rich."),
        "contentVi": "giàu có."
      },
      {
        "index": 36,
        "start": 94240,
        "end": 3374,
        "content": "Really? I think only robots will be",
        "words": generateWordTokens("Really? I think only robots will be"),
        "contentVi": "Thật sự? Tôi nghĩ chỉ có robot mới có thể"
      },
      {
        "index": 37,
        "start": 96960,
        "end": 1616,
        "content": "rich.",
        "words": generateWordTokens("rich."),
        "contentVi": "giàu có."
      },
      {
        "index": 38,
        "start": 97520,
        "end": 3778,
        "content": "What?",
        "words": generateWordTokens("What?"),
        "contentVi": "Cái gì?"
      },
      {
        "index": 39,
        "start": 98479,
        "end": 5459,
        "content": "Yeah. People will work for robots.",
        "words": generateWordTokens("Yeah. People will work for robots."),
        "contentVi": "Vâng. Mọi người sẽ làm việc cho robot."
      },
      {
        "index": 40,
        "start": 101200,
        "end": 3461,
        "content": "That sounds scary. I don't want a robot",
        "words": generateWordTokens("That sounds scary. I don't want a robot"),
        "contentVi": "Điều đó nghe có vẻ đáng sợ. Tôi không muốn một con robot"
      },
      {
        "index": 41,
        "start": 103840,
        "end": 3304,
        "content": "boss.",
        "words": generateWordTokens("boss."),
        "contentVi": "ông chủ."
      },
      {
        "index": 42,
        "start": 104560,
        "end": 4265,
        "content": "Too late. Maybe your robot will say,",
        "words": generateWordTokens("Too late. Maybe your robot will say,"),
        "contentVi": "Quá muộn. Có thể robot của bạn sẽ nói,"
      },
      {
        "index": 43,
        "start": 107040,
        "end": 3627,
        "content": "\"Tom, you're late again.\"",
        "words": generateWordTokens("\"Tom, you're late again.\""),
        "contentVi": "“Tom, anh lại đến muộn nữa.”"
      },
      {
        "index": 44,
        "start": 108720,
        "end": 4909,
        "content": "I'll delete him then.",
        "words": generateWordTokens("I'll delete him then."),
        "contentVi": "Vậy tôi sẽ xóa anh ta."
      },
      {
        "index": 45,
        "start": 110560,
        "end": 5551,
        "content": "But what about schools in the future? I",
        "words": generateWordTokens("But what about schools in the future? I"),
        "contentVi": "Nhưng còn trường học trong tương lai thì sao? TÔI"
      },
      {
        "index": 46,
        "start": 113520,
        "end": 5073,
        "content": "think no more schools. Students will",
        "words": generateWordTokens("think no more schools. Students will"),
        "contentVi": "đừng nghĩ đến trường học nữa. Học sinh sẽ"
      },
      {
        "index": 47,
        "start": 116000,
        "end": 7235,
        "content": "learn from holograms at home.",
        "words": generateWordTokens("learn from holograms at home."),
        "contentVi": "học từ ảnh ba chiều ở nhà."
      },
      {
        "index": 48,
        "start": 118479,
        "end": 5639,
        "content": "No school. Nice. But then no friends, no",
        "words": generateWordTokens("No school. Nice. But then no friends, no"),
        "contentVi": "Không có trường học. Đẹp. Nhưng rồi không có bạn bè, không"
      },
      {
        "index": 49,
        "start": 123119,
        "end": 3483,
        "content": "fun.",
        "words": generateWordTokens("fun."),
        "contentVi": "vui vẻ."
      },
      {
        "index": 50,
        "start": 124000,
        "end": 6363,
        "content": "True. That would be boring.",
        "words": generateWordTokens("True. That would be boring."),
        "contentVi": "ĐÚNG VẬY. Điều đó sẽ thật nhàm chán."
      },
      {
        "index": 51,
        "start": 126479,
        "end": 6287,
        "content": "Yeah. I'd miss eating snacks in class.",
        "words": generateWordTokens("Yeah. I'd miss eating snacks in class."),
        "contentVi": "Vâng. Tôi nhớ việc ăn đồ ăn nhẹ trong lớp."
      },
      {
        "index": 52,
        "start": 130239,
        "end": 4931,
        "content": "You'd miss sleeping in class, too.",
        "words": generateWordTokens("You'd miss sleeping in class, too."),
        "contentVi": "Bạn cũng sẽ nhớ việc ngủ trong lớp."
      },
      {
        "index": 53,
        "start": 132640,
        "end": 5812,
        "content": "Hey, that was one time.",
        "words": generateWordTokens("Hey, that was one time."),
        "contentVi": "Này, đó là một lần."
      },
      {
        "index": 54,
        "start": 135040,
        "end": 6375,
        "content": "One time. You sleep every math class.",
        "words": generateWordTokens("One time. You sleep every math class."),
        "contentVi": "Một lần. Bạn ngủ mỗi giờ học toán."
      },
      {
        "index": 55,
        "start": 138319,
        "end": 6459,
        "content": "Fine. Maybe robots can study for me",
        "words": generateWordTokens("Fine. Maybe robots can study for me"),
        "contentVi": "Khỏe. Có lẽ robot có thể học giúp tôi"
      },
      {
        "index": 56,
        "start": 141280,
        "end": 7100,
        "content": "instead. Dream on. You'll still fail if",
        "words": generateWordTokens("instead. Dream on. You'll still fail if"),
        "contentVi": "thay vì. Hãy mơ đi. Bạn vẫn sẽ thất bại nếu"
      },
      {
        "index": 57,
        "start": 144640,
        "end": 6545,
        "content": "your robot falls asleep, too. [laughter]",
        "words": generateWordTokens("your robot falls asleep, too. [laughter]"),
        "contentVi": "robot của bạn cũng ngủ thiếp đi. [cười]"
      },
      {
        "index": 58,
        "start": 148239,
        "end": 5189,
        "content": "You're mean. But, you know, I think",
        "words": generateWordTokens("You're mean. But, you know, I think"),
        "contentVi": "Bạn thật xấu tính. Nhưng bạn biết đấy, tôi nghĩ"
      },
      {
        "index": 59,
        "start": 151040,
        "end": 5350,
        "content": "people will live longer, too.",
        "words": generateWordTokens("people will live longer, too."),
        "contentVi": "mọi người cũng sẽ sống lâu hơn."
      },
      {
        "index": 60,
        "start": 153280,
        "end": 6153,
        "content": "Yeah. Maybe 150 years old.",
        "words": generateWordTokens("Yeah. Maybe 150 years old."),
        "contentVi": "Vâng. Có lẽ 150 tuổi."
      },
      {
        "index": 61,
        "start": 156239,
        "end": 3997,
        "content": "No way. I don't want to be old for 80",
        "words": generateWordTokens("No way. I don't want to be old for 80"),
        "contentVi": "Không đời nào. Tôi không muốn già đến 80 tuổi"
      },
      {
        "index": 62,
        "start": 159280,
        "end": 4799,
        "content": "years.",
        "words": generateWordTokens("years."),
        "contentVi": "năm."
      },
      {
        "index": 63,
        "start": 160080,
        "end": 4800,
        "content": "True. Imagine being 120 and still doing",
        "words": generateWordTokens("True. Imagine being 120 and still doing"),
        "contentVi": "ĐÚNG VẬY. Hãy tưởng tượng bạn đã 120 tuổi và vẫn đang làm"
      },
      {
        "index": 64,
        "start": 163920,
        "end": 3203,
        "content": "homework.",
        "words": generateWordTokens("homework."),
        "contentVi": "bài tập về nhà."
      },
      {
        "index": 65,
        "start": 164720,
        "end": 4964,
        "content": "That's the worst future ever.",
        "words": generateWordTokens("That's the worst future ever."),
        "contentVi": "Đó là tương lai tồi tệ nhất từ ​​trước đến nay."
      },
      {
        "index": 66,
        "start": 166959,
        "end": 6087,
        "content": "Okay. Okay. Then we'll just live on Mars",
        "words": generateWordTokens("Okay. Okay. Then we'll just live on Mars"),
        "contentVi": "Được rồi. Được rồi. Sau đó chúng ta sẽ sống trên sao Hỏa"
      },
      {
        "index": 67,
        "start": 169519,
        "end": 6651,
        "content": "instead. Mars. There's no bubble tea",
        "words": generateWordTokens("instead. Mars. There's no bubble tea"),
        "contentVi": "thay vì. Sao Hỏa. Không có trà bong bóng"
      },
      {
        "index": 68,
        "start": 172879,
        "end": 5613,
        "content": "there. No food. No tick tock.",
        "words": generateWordTokens("there. No food. No tick tock."),
        "contentVi": "ở đó. Không có thức ăn. Không có tích tắc."
      },
      {
        "index": 69,
        "start": 176000,
        "end": 5055,
        "content": "Fine. Let's stay on Earth then.",
        "words": generateWordTokens("Fine. Let's stay on Earth then."),
        "contentVi": "Khỏe. Vậy chúng ta hãy ở lại Trái đất nhé."
      },
      {
        "index": 70,
        "start": 178319,
        "end": 5859,
        "content": "Good. But if I can have a flying",
        "words": generateWordTokens("Good. But if I can have a flying"),
        "contentVi": "Tốt. Nhưng nếu tôi có thể bay"
      },
      {
        "index": 71,
        "start": 180879,
        "end": 6662,
        "content": "motorbike and a robot made, I'm happy.",
        "words": generateWordTokens("motorbike and a robot made, I'm happy."),
        "contentVi": "xe máy và robot được tạo ra, tôi rất vui."
      },
      {
        "index": 72,
        "start": 184000,
        "end": 6824,
        "content": "And I want a bed that flies to school so",
        "words": generateWordTokens("And I want a bed that flies to school so"),
        "contentVi": "Và tôi muốn một chiếc giường bay đến trường"
      },
      {
        "index": 73,
        "start": 187360,
        "end": 6747,
        "content": "I can sleep on the way.",
        "words": generateWordTokens("I can sleep on the way."),
        "contentVi": "Tôi có thể ngủ trên đường đi."
      },
      {
        "index": 74,
        "start": 190640,
        "end": 5870,
        "content": "That's so you lazy even in the future.",
        "words": generateWordTokens("That's so you lazy even in the future."),
        "contentVi": "Đó là lý do tại sao bạn lười biếng ngay cả trong tương lai."
      },
      {
        "index": 75,
        "start": 193920,
        "end": 6354,
        "content": "Not lazy, just smart.",
        "words": generateWordTokens("Not lazy, just smart."),
        "contentVi": "Không lười biếng, chỉ cần thông minh."
      },
      {
        "index": 76,
        "start": 196319,
        "end": 4836,
        "content": "Yeah, right. Okay, Mr. Future lazy",
        "words": generateWordTokens("Yeah, right. Okay, Mr. Future lazy"),
        "contentVi": "Vâng, đúng vậy. Được rồi, anh Tương Lai lười biếng"
      },
      {
        "index": 77,
        "start": 200080,
        "end": 2680,
        "content": "genius.",
        "words": generateWordTokens("genius."),
        "contentVi": "thiên tài."
      },
      {
        "index": 78,
        "start": 200959,
        "end": 2761,
        "content": "Thank you. I'll take that as a",
        "words": generateWordTokens("Thank you. I'll take that as a"),
        "contentVi": "Cảm ơn. Tôi sẽ coi đó là một"
      },
      {
        "index": 79,
        "start": 202560,
        "end": 4363,
        "content": "compliment.",
        "words": generateWordTokens("compliment."),
        "contentVi": "lời khen."
      },
      {
        "index": 80,
        "start": 203519,
        "end": 4765,
        "content": "Fine. But if your robot ever gets angry,",
        "words": generateWordTokens("Fine. But if your robot ever gets angry,"),
        "contentVi": "Khỏe. Nhưng nếu robot của bạn nổi giận,"
      },
      {
        "index": 81,
        "start": 206720,
        "end": 3806,
        "content": "don't call me for help.",
        "words": generateWordTokens("don't call me for help."),
        "contentVi": "đừng gọi tôi để được giúp đỡ."
      },
      {
        "index": 82,
        "start": 208080,
        "end": 3408,
        "content": "Too late. You'll be my robot's",
        "words": generateWordTokens("Too late. You'll be my robot's"),
        "contentVi": "Quá muộn. Bạn sẽ là robot của tôi"
      },
      {
        "index": 83,
        "start": 210319,
        "end": 4130,
        "content": "assistant.",
        "words": generateWordTokens("assistant."),
        "contentVi": "trợ lý."
      },
      {
        "index": 84,
        "start": 211280,
        "end": 5250,
        "content": "No way. I quit before I start.",
        "words": generateWordTokens("No way. I quit before I start."),
        "contentVi": "Không đời nào. Tôi bỏ cuộc trước khi bắt đầu."
      },
      {
        "index": 85,
        "start": 214239,
        "end": 3335,
        "content": "Then you'll still be broke in the",
        "words": generateWordTokens("Then you'll still be broke in the"),
        "contentVi": "Khi đó bạn vẫn sẽ bị phá sản"
      },
      {
        "index": 86,
        "start": 216319,
        "end": 3897,
        "content": "future.",
        "words": generateWordTokens("future."),
        "contentVi": "tương lai."
      },
      {
        "index": 87,
        "start": 217360,
        "end": 6057,
        "content": "Maybe. But at least I'll be free.",
        "words": generateWordTokens("Maybe. But at least I'll be free."),
        "contentVi": "Có lẽ. Nhưng ít nhất tôi sẽ được tự do."
      },
      {
        "index": 88,
        "start": 220000,
        "end": 5819,
        "content": "Fair enough. Okay, let's make a deal. If",
        "words": generateWordTokens("Fair enough. Okay, let's make a deal. If"),
        "contentVi": "Đủ công bằng. Được rồi, hãy thỏa thuận nhé. Nếu như"
      },
      {
        "index": 89,
        "start": 223200,
        "end": 4622,
        "content": "we're still aliveundred years later,",
        "words": generateWordTokens("we're still aliveundred years later,"),
        "contentVi": "chúng ta vẫn còn sống hàng trăm năm sau,"
      },
      {
        "index": 90,
        "start": 225599,
        "end": 5267,
        "content": "let's meet in our flying house.",
        "words": generateWordTokens("let's meet in our flying house."),
        "contentVi": "hãy gặp nhau ở ngôi nhà bay của chúng ta nhé."
      },
      {
        "index": 91,
        "start": 227599,
        "end": 5829,
        "content": "Deal. I'll bring the flying pizza.",
        "words": generateWordTokens("Deal. I'll bring the flying pizza."),
        "contentVi": "Thỏa thuận. Tôi sẽ mang bánh pizza bay tới."
      },
      {
        "index": 92,
        "start": 230640,
        "end": 4390,
        "content": "Perfect. Just don't let your robot eat",
        "words": generateWordTokens("Perfect. Just don't let your robot eat"),
        "contentVi": "Hoàn hảo. Đừng để robot của bạn ăn"
      },
      {
        "index": 93,
        "start": 233200,
        "end": 5873,
        "content": "it first.",
        "words": generateWordTokens("it first."),
        "contentVi": "nó đầu tiên."
      },
      {
        "index": 94,
        "start": 234799,
        "end": 4276,
        "content": "I can't promise that.",
        "words": generateWordTokens("I can't promise that."),
        "contentVi": "Tôi không thể hứa điều đó."
      }
    ]
  },

  "luyen-nghe-a2-9mzygioq4c0": {
    "title": "Luyện Nghe Tiếng Anh Level A2 - A Hotel",
    "audio_url": "9MZYgioQ4c0",
    "repeat_offset": 167.84,
    "sentences": [
      {
        "index": 0,
        "start": 11120,
        "end": 5451,
        "content": "Now listen carefully.",
        "words": generateWordTokens("Now listen carefully."),
        "contentVi": "Bây giờ hãy lắng nghe cẩn thận."
      },
      {
        "index": 1,
        "start": 13440,
        "end": 6333,
        "content": "Hey Tom, I watched a super cool Korean",
        "words": generateWordTokens("Hey Tom, I watched a super cool Korean"),
        "contentVi": "Này Tom, tôi đã xem một bộ phim Hàn Quốc cực hay"
      },
      {
        "index": 2,
        "start": 16560,
        "end": 5457,
        "content": "movie last night, Make a Wish. It's so",
        "words": generateWordTokens("movie last night, Make a Wish. It's so"),
        "contentVi": "bộ phim tối qua, Make a Wish. nó là như vậy"
      },
      {
        "index": 3,
        "start": 19760,
        "end": 5619,
        "content": "good. Want to hear about it?",
        "words": generateWordTokens("good. Want to hear about it?"),
        "contentVi": "Tốt. Bạn muốn nghe về nó?"
      },
      {
        "index": 4,
        "start": 22000,
        "end": 5862,
        "content": "Korean movie? Nice. What's it about?",
        "words": generateWordTokens("Korean movie? Nice. What's it about?"),
        "contentVi": "Phim hàn quốc à? Đẹp. Nó nói về cái gì vậy?"
      },
      {
        "index": 5,
        "start": 25359,
        "end": 5146,
        "content": "Tell me everything. Okay, so there's",
        "words": generateWordTokens("Tell me everything. Okay, so there's"),
        "contentVi": "Hãy kể cho tôi mọi chuyện. Được rồi, vậy có"
      },
      {
        "index": 6,
        "start": 27840,
        "end": 5068,
        "content": "this girl who travels to Dubai for a",
        "words": generateWordTokens("this girl who travels to Dubai for a"),
        "contentVi": "cô gái này tới Dubai để nghỉ dưỡng"
      },
      {
        "index": 7,
        "start": 30480,
        "end": 5310,
        "content": "holiday. She goes to the desert, but",
        "words": generateWordTokens("holiday. She goes to the desert, but"),
        "contentVi": "ngày lễ. Cô ấy đi đến sa mạc, nhưng"
      },
      {
        "index": 8,
        "start": 32880,
        "end": 5953,
        "content": "gets lost. Then she trips over an old",
        "words": generateWordTokens("gets lost. Then she trips over an old"),
        "contentVi": "bị lạc. Sau đó cô ấy đi qua một cái cũ"
      },
      {
        "index": 9,
        "start": 35760,
        "end": 6036,
        "content": "lamp. A super handsome genie guy pops",
        "words": generateWordTokens("lamp. A super handsome genie guy pops"),
        "contentVi": "đèn. Một anh chàng thần đèn siêu đẹp trai xuất hiện"
      },
      {
        "index": 10,
        "start": 38800,
        "end": 6118,
        "content": "out and says, \"I give you three wishes.\"",
        "words": generateWordTokens("out and says, \"I give you three wishes.\""),
        "contentVi": "ra và nói: \"Tôi cho bạn ba điều ước.\""
      },
      {
        "index": 11,
        "start": 41760,
        "end": 5321,
        "content": "But she's like, \"No way. Magic's fake.\"",
        "words": generateWordTokens("But she's like, \"No way. Magic's fake.\""),
        "contentVi": "Nhưng cô ấy nói, \"Không thể nào. Phép thuật là giả.\""
      },
      {
        "index": 12,
        "start": 44879,
        "end": 5806,
        "content": "And throws the lamp away.",
        "words": generateWordTokens("And throws the lamp away."),
        "contentVi": "Và ném chiếc đèn đi."
      },
      {
        "index": 13,
        "start": 47039,
        "end": 6768,
        "content": "Throws it. That's wild. What happens",
        "words": generateWordTokens("Throws it. That's wild. What happens"),
        "contentVi": "Ném nó. Điều đó thật hoang dã. Chuyện gì xảy ra"
      },
      {
        "index": 14,
        "start": 50640,
        "end": 6130,
        "content": "next? Does the genie get mad? not mad,",
        "words": generateWordTokens("next? Does the genie get mad? not mad,"),
        "contentVi": "Kế tiếp? Thần đèn có nổi điên không? không điên,"
      },
      {
        "index": 15,
        "start": 53760,
        "end": 5333,
        "content": "but the lamp keeps following her like it",
        "words": generateWordTokens("but the lamp keeps following her like it"),
        "contentVi": "nhưng ngọn đèn cứ đi theo cô ấy như thế"
      },
      {
        "index": 16,
        "start": 56719,
        "end": 4938,
        "content": "shows up in her bag, her hotel,",
        "words": generateWordTokens("shows up in her bag, her hotel,"),
        "contentVi": "xuất hiện trong túi xách của cô ấy, trong khách sạn của cô ấy,"
      },
      {
        "index": 17,
        "start": 59039,
        "end": 5579,
        "content": "everywhere. The genie's so cute, she",
        "words": generateWordTokens("everywhere. The genie's so cute, she"),
        "contentVi": "ở khắp mọi nơi. Thần đèn dễ thương quá cô ơi"
      },
      {
        "index": 18,
        "start": 61600,
        "end": 6462,
        "content": "starts to like him. They talk, laugh,",
        "words": generateWordTokens("starts to like him. They talk, laugh,"),
        "contentVi": "bắt đầu thích anh ấy. Họ nói chuyện, cười đùa,"
      },
      {
        "index": 19,
        "start": 64559,
        "end": 6305,
        "content": "fall in love. But sad part, she dies in",
        "words": generateWordTokens("fall in love. But sad part, she dies in"),
        "contentVi": "phải lòng. Nhưng điều đáng buồn là cô ấy chết trong"
      },
      {
        "index": 20,
        "start": 68000,
        "end": 4468,
        "content": "the end and becomes a genie, too. Stuck",
        "words": generateWordTokens("the end and becomes a genie, too. Stuck"),
        "contentVi": "kết thúc và cũng trở thành thần đèn. Mắc kẹt"
      },
      {
        "index": 21,
        "start": 70799,
        "end": 5032,
        "content": "with him forever.",
        "words": generateWordTokens("with him forever."),
        "contentVi": "với anh mãi mãi."
      },
      {
        "index": 22,
        "start": 72400,
        "end": 6791,
        "content": "In love with the genie and becomes one.",
        "words": generateWordTokens("In love with the genie and becomes one."),
        "contentVi": "Yêu thần đèn và trở thành một."
      },
      {
        "index": 23,
        "start": 75760,
        "end": 5916,
        "content": "That's crazy. If I had three wishes, I'd",
        "words": generateWordTokens("That's crazy. If I had three wishes, I'd"),
        "contentVi": "Điều đó thật điên rồ. Nếu tôi có ba điều ước, tôi sẽ"
      },
      {
        "index": 24,
        "start": 79119,
        "end": 7119,
        "content": "use them fast. What would you wish for,",
        "words": generateWordTokens("use them fast. What would you wish for,"),
        "contentVi": "sử dụng chúng nhanh chóng. Bạn sẽ ước điều gì,"
      },
      {
        "index": 25,
        "start": 81600,
        "end": 6322,
        "content": "Anna? Hm. First, I'd wish for a kind and",
        "words": generateWordTokens("Anna? Hm. First, I'd wish for a kind and"),
        "contentVi": "Anna? Ừm. Đầu tiên, tôi ước một điều gì đó tốt đẹp và"
      },
      {
        "index": 26,
        "start": 86159,
        "end": 4967,
        "content": "handsome boyfriend.",
        "words": generateWordTokens("handsome boyfriend."),
        "contentVi": "bạn trai đẹp trai."
      },
      {
        "index": 27,
        "start": 87840,
        "end": 6808,
        "content": "You and your boyfriend wishes again.",
        "words": generateWordTokens("You and your boyfriend wishes again."),
        "contentVi": "Bạn và bạn trai của bạn mong muốn một lần nữa."
      },
      {
        "index": 28,
        "start": 91040,
        "end": 6091,
        "content": "I'm serious. Second, I'd wish for my",
        "words": generateWordTokens("I'm serious. Second, I'd wish for my"),
        "contentVi": "Tôi nghiêm túc đấy. Thứ hai, tôi ước gì"
      },
      {
        "index": 29,
        "start": 94560,
        "end": 5215,
        "content": "family and friends to always be healthy.",
        "words": generateWordTokens("family and friends to always be healthy."),
        "contentVi": "gia đình và bạn bè luôn khỏe mạnh."
      },
      {
        "index": 30,
        "start": 97040,
        "end": 6257,
        "content": "That's nice. What about the last one?",
        "words": generateWordTokens("That's nice. What about the last one?"),
        "contentVi": "Điều đó thật tuyệt. Còn cái cuối cùng thì sao?"
      },
      {
        "index": 31,
        "start": 99680,
        "end": 4579,
        "content": "My last wish would be to have 1,000 more",
        "words": generateWordTokens("My last wish would be to have 1,000 more"),
        "contentVi": "Mong muốn cuối cùng của tôi là có thêm 1.000"
      },
      {
        "index": 32,
        "start": 103200,
        "end": 2823,
        "content": "wishes.",
        "words": generateWordTokens("wishes."),
        "contentVi": "mong muốn."
      },
      {
        "index": 33,
        "start": 104159,
        "end": 4905,
        "content": "That's cheating.",
        "words": generateWordTokens("That's cheating."),
        "contentVi": "Đó là gian lận."
      },
      {
        "index": 34,
        "start": 105920,
        "end": 4026,
        "content": "No, that's smart. Then I can wish",
        "words": generateWordTokens("No, that's smart. Then I can wish"),
        "contentVi": "Không, điều đó thông minh. Thế thì tôi có thể ước"
      },
      {
        "index": 35,
        "start": 108960,
        "end": 3869,
        "content": "forever.",
        "words": generateWordTokens("forever."),
        "contentVi": "mãi mãi."
      },
      {
        "index": 36,
        "start": 109840,
        "end": 4669,
        "content": "Not smarter than me. Oh, what would you",
        "words": generateWordTokens("Not smarter than me. Oh, what would you"),
        "contentVi": "Không thông minh hơn tôi. Ồ, bạn sẽ làm gì"
      },
      {
        "index": 37,
        "start": 112720,
        "end": 5472,
        "content": "wish for, a smart boy?",
        "words": generateWordTokens("wish for, a smart boy?"),
        "contentVi": "ước gì, một cậu bé thông minh?"
      },
      {
        "index": 38,
        "start": 114399,
        "end": 5715,
        "content": "I'd use only one wish. I'd wish for a",
        "words": generateWordTokens("I'd use only one wish. I'd wish for a"),
        "contentVi": "Tôi sẽ chỉ sử dụng một điều ước. Tôi ước có một"
      },
      {
        "index": 39,
        "start": 118079,
        "end": 3639,
        "content": "real Dormon.",
        "words": generateWordTokens("real Dormon."),
        "contentVi": "Dormon thật."
      },
      {
        "index": 40,
        "start": 120000,
        "end": 2919,
        "content": "Dormon?",
        "words": generateWordTokens("Dormon?"),
        "contentVi": "Dormon?"
      },
      {
        "index": 41,
        "start": 121600,
        "end": 4762,
        "content": "Seriously?",
        "words": generateWordTokens("Seriously?"),
        "contentVi": "Nghiêm túc?"
      },
      {
        "index": 42,
        "start": 122799,
        "end": 6203,
        "content": "Of course. He can help me fly, travel in",
        "words": generateWordTokens("Of course. He can help me fly, travel in"),
        "contentVi": "Tất nhiên rồi. Anh ấy có thể giúp tôi bay, du lịch"
      },
      {
        "index": 43,
        "start": 126240,
        "end": 4606,
        "content": "time, and fix my life.",
        "words": generateWordTokens("time, and fix my life."),
        "contentVi": "thời gian và sửa chữa cuộc đời tôi."
      },
      {
        "index": 44,
        "start": 128879,
        "end": 5010,
        "content": "Or make you lazier?",
        "words": generateWordTokens("Or make you lazier?"),
        "contentVi": "Hoặc làm cho bạn lười biếng hơn?"
      },
      {
        "index": 45,
        "start": 130720,
        "end": 3971,
        "content": "Maybe. But at least I'd be a happy lazy",
        "words": generateWordTokens("Maybe. But at least I'd be a happy lazy"),
        "contentVi": "Có lẽ. Nhưng ít nhất tôi sẽ là một kẻ lười biếng hạnh phúc"
      },
      {
        "index": 46,
        "start": 133760,
        "end": 2854,
        "content": "person.",
        "words": generateWordTokens("person."),
        "contentVi": "người."
      },
      {
        "index": 47,
        "start": 134560,
        "end": 4215,
        "content": "You're impossible, Tom.",
        "words": generateWordTokens("You're impossible, Tom."),
        "contentVi": "Anh thật không thể, Tom."
      },
      {
        "index": 48,
        "start": 136480,
        "end": 5336,
        "content": "Come on. Dorhimmon is better than a",
        "words": generateWordTokens("Come on. Dorhimmon is better than a"),
        "contentVi": "Cố lên. Dorhimmon tốt hơn một"
      },
      {
        "index": 49,
        "start": 138640,
        "end": 5659,
        "content": "thousand wishes. I don't know. I think",
        "words": generateWordTokens("thousand wishes. I don't know. I think"),
        "contentVi": "ngàn lời chúc. Tôi không biết. tôi nghĩ"
      },
      {
        "index": 50,
        "start": 141680,
        "end": 4862,
        "content": "real happiness isn't from wishes.",
        "words": generateWordTokens("real happiness isn't from wishes."),
        "contentVi": "hạnh phúc thực sự không đến từ những điều ước."
      },
      {
        "index": 51,
        "start": 144160,
        "end": 5264,
        "content": "Then where is it from?",
        "words": generateWordTokens("Then where is it from?"),
        "contentVi": "Thế thì nó đến từ đâu?"
      },
      {
        "index": 52,
        "start": 146400,
        "end": 4466,
        "content": "From love, family, and doing something",
        "words": generateWordTokens("From love, family, and doing something"),
        "contentVi": "Từ tình yêu, gia đình và việc gì đó"
      },
      {
        "index": 53,
        "start": 149280,
        "end": 5188,
        "content": "good for others.",
        "words": generateWordTokens("good for others."),
        "contentVi": "tốt cho người khác."
      },
      {
        "index": 54,
        "start": 150720,
        "end": 5511,
        "content": "H, that's true. Maybe that's what the",
        "words": generateWordTokens("H, that's true. Maybe that's what the"),
        "contentVi": "H, đúng vậy. Có lẽ đó chính là điều"
      },
      {
        "index": 55,
        "start": 154319,
        "end": 4714,
        "content": "movie wanted to say, too.",
        "words": generateWordTokens("movie wanted to say, too."),
        "contentVi": "phim cũng muốn nói"
      },
      {
        "index": 56,
        "start": 156080,
        "end": 4156,
        "content": "Yeah. Sometimes the best wish is to not",
        "words": generateWordTokens("Yeah. Sometimes the best wish is to not"),
        "contentVi": "Vâng. Đôi khi điều ước tốt nhất là không"
      },
      {
        "index": 57,
        "start": 158879,
        "end": 4720,
        "content": "wish at all.",
        "words": generateWordTokens("wish at all."),
        "contentVi": "mong muốn chút nào."
      },
      {
        "index": 58,
        "start": 160080,
        "end": 7760,
        "content": "Wow, Anna, that's deep. You sound like a",
        "words": generateWordTokens("Wow, Anna, that's deep. You sound like a"),
        "contentVi": "Wow, Anna, sâu sắc quá. Bạn nghe có vẻ giống như một"
      },
      {
        "index": 59,
        "start": 163440,
        "end": 8242,
        "content": "genie yourself. Maybe I am, but sorry, I",
        "words": generateWordTokens("genie yourself. Maybe I am, but sorry, I"),
        "contentVi": "thần đèn của chính mình. Có lẽ là vậy, nhưng xin lỗi, tôi"
      },
      {
        "index": 60,
        "start": 167680,
        "end": 6888,
        "content": "don't grant wishes for lazy boys.",
        "words": generateWordTokens("don't grant wishes for lazy boys."),
        "contentVi": "đừng ban điều ước cho những chàng trai lười biếng."
      },
      {
        "index": 61,
        "start": 171519,
        "end": 4333,
        "content": "Fine, then I'll just wish to be smarter",
        "words": generateWordTokens("Fine, then I'll just wish to be smarter"),
        "contentVi": "Được thôi, vậy thì tôi chỉ ước mình thông minh hơn thôi"
      },
      {
        "index": 62,
        "start": 174400,
        "end": 5093,
        "content": "next time.",
        "words": generateWordTokens("next time."),
        "contentVi": "lần sau."
      },
      {
        "index": 63,
        "start": 175680,
        "end": 3815,
        "content": "Good luck with that.",
        "words": generateWordTokens("Good luck with that."),
        "contentVi": "Chúc may mắn với điều đó."
      }
    ]
  },

  "luyen-nghe-a2-czfy-ymk6fs": {
    "title": "Luyện Nghe Tiếng Anh Level A2 - A Party",
    "audio_url": "CZFy-Ymk6fs",
    "repeat_offset": 200.32,
    "sentences": [
      {
        "index": 0,
        "start": 11120,
        "end": 5691,
        "content": "I want to talk about unemployment in",
        "words": generateWordTokens("I want to talk about unemployment in"),
        "contentVi": "Tôi muốn nói về tình trạng thất nghiệp ở"
      },
      {
        "index": 1,
        "start": 13679,
        "end": 6735,
        "content": "Vietnam. Unemployment is when people",
        "words": generateWordTokens("Vietnam. Unemployment is when people"),
        "contentVi": "Việt Nam. Thất nghiệp là khi mọi người"
      },
      {
        "index": 2,
        "start": 16800,
        "end": 6017,
        "content": "want to work but cannot find a job. It",
        "words": generateWordTokens("want to work but cannot find a job. It"),
        "contentVi": "muốn làm việc nhưng không tìm được việc làm. Nó"
      },
      {
        "index": 3,
        "start": 20400,
        "end": 5860,
        "content": "happens to many people and makes life",
        "words": generateWordTokens("happens to many people and makes life"),
        "contentVi": "xảy ra với nhiều người và tạo nên cuộc sống"
      },
      {
        "index": 4,
        "start": 22800,
        "end": 6902,
        "content": "hard. Let me share how it affects daily",
        "words": generateWordTokens("hard. Let me share how it affects daily"),
        "contentVi": "cứng. Hãy để tôi chia sẻ nó ảnh hưởng như thế nào hàng ngày"
      },
      {
        "index": 5,
        "start": 26240,
        "end": 6666,
        "content": "life and how people stay strong. In",
        "words": generateWordTokens("life and how people stay strong. In"),
        "contentVi": "cuộc sống và cách mọi người luôn mạnh mẽ. TRONG"
      },
      {
        "index": 6,
        "start": 29679,
        "end": 6111,
        "content": "Vietnam, many people look for jobs,",
        "words": generateWordTokens("Vietnam, many people look for jobs,"),
        "contentVi": "Việt Nam, nhiều người tìm việc làm"
      },
      {
        "index": 7,
        "start": 32880,
        "end": 5313,
        "content": "especially young people. After",
        "words": generateWordTokens("especially young people. After"),
        "contentVi": "đặc biệt là giới trẻ. Sau đó"
      },
      {
        "index": 8,
        "start": 35760,
        "end": 5316,
        "content": "university, they want work, but",
        "words": generateWordTokens("university, they want work, but"),
        "contentVi": "đại học, họ muốn có việc làm, nhưng"
      },
      {
        "index": 9,
        "start": 38160,
        "end": 6117,
        "content": "sometimes there are no jobs. For",
        "words": generateWordTokens("sometimes there are no jobs. For"),
        "contentVi": "đôi khi không có việc làm. Vì"
      },
      {
        "index": 10,
        "start": 41040,
        "end": 6761,
        "content": "example, students study business or",
        "words": generateWordTokens("example, students study business or"),
        "contentVi": "Ví dụ, sinh viên học kinh doanh hoặc"
      },
      {
        "index": 11,
        "start": 44239,
        "end": 6445,
        "content": "English, but companies don't hire them.",
        "words": generateWordTokens("English, but companies don't hire them."),
        "contentVi": "Tiếng Anh, nhưng các công ty không thuê họ."
      },
      {
        "index": 12,
        "start": 47760,
        "end": 5888,
        "content": "They send many job applications, but no",
        "words": generateWordTokens("They send many job applications, but no"),
        "contentVi": "Họ gửi nhiều đơn xin việc nhưng không"
      },
      {
        "index": 13,
        "start": 50640,
        "end": 4691,
        "content": "one calls back. This makes them sad and",
        "words": generateWordTokens("one calls back. This makes them sad and"),
        "contentVi": "một người gọi lại. Điều này khiến họ buồn và"
      },
      {
        "index": 14,
        "start": 53600,
        "end": 5094,
        "content": "worried.",
        "words": generateWordTokens("worried."),
        "contentVi": "lo lắng."
      },
      {
        "index": 15,
        "start": 55280,
        "end": 7415,
        "content": "Unemployment is tough. People need money",
        "words": generateWordTokens("Unemployment is tough. People need money"),
        "contentVi": "Thất nghiệp thật khó khăn. Người ta cần tiền"
      },
      {
        "index": 16,
        "start": 58640,
        "end": 7499,
        "content": "for food, rent, or family. Without a",
        "words": generateWordTokens("for food, rent, or family. Without a"),
        "contentVi": "cho thực phẩm, tiền thuê nhà, hoặc gia đình. Không có"
      },
      {
        "index": 17,
        "start": 62640,
        "end": 5503,
        "content": "job, they feel stressed. Some live with",
        "words": generateWordTokens("job, they feel stressed. Some live with"),
        "contentVi": "công việc, họ cảm thấy căng thẳng. Một số sống với"
      },
      {
        "index": 18,
        "start": 66080,
        "end": 5425,
        "content": "parents because they can't pay for a",
        "words": generateWordTokens("parents because they can't pay for a"),
        "contentVi": "cha mẹ vì họ không thể trả tiền cho một"
      },
      {
        "index": 19,
        "start": 68080,
        "end": 7508,
        "content": "house. In big cities like Hanoi or Ho",
        "words": generateWordTokens("house. In big cities like Hanoi or Ho"),
        "contentVi": "căn nhà. Ở các thành phố lớn như Hà Nội hay Hồ"
      },
      {
        "index": 20,
        "start": 71439,
        "end": 7512,
        "content": "Chi Min City, life is expensive. No job",
        "words": generateWordTokens("Chi Min City, life is expensive. No job"),
        "contentVi": "Thành phố Chí Min, cuộc sống đắt đỏ. Không có việc làm"
      },
      {
        "index": 21,
        "start": 75520,
        "end": 5836,
        "content": "means no money for food or drink. Young",
        "words": generateWordTokens("means no money for food or drink. Young"),
        "contentVi": "có nghĩa là không có tiền ăn uống. Trẻ"
      },
      {
        "index": 22,
        "start": 78880,
        "end": 4719,
        "content": "people feel bad when friends go out, but",
        "words": generateWordTokens("people feel bad when friends go out, but"),
        "contentVi": "mọi người cảm thấy tồi tệ khi bạn bè đi chơi, nhưng"
      },
      {
        "index": 23,
        "start": 81280,
        "end": 5600,
        "content": "they stay home.",
        "words": generateWordTokens("they stay home."),
        "contentVi": "họ ở nhà."
      },
      {
        "index": 24,
        "start": 83520,
        "end": 6084,
        "content": "Some try hard to find work. They go to",
        "words": generateWordTokens("Some try hard to find work. They go to"),
        "contentVi": "Một số cố gắng hết sức để tìm việc làm. Họ đi đến"
      },
      {
        "index": 25,
        "start": 86799,
        "end": 5848,
        "content": "job fairs or use apps like Vietnam",
        "words": generateWordTokens("job fairs or use apps like Vietnam"),
        "contentVi": "hội chợ việc làm hoặc sử dụng các ứng dụng như Việt Nam"
      },
      {
        "index": 26,
        "start": 89520,
        "end": 6329,
        "content": "works. Others learn new skills like",
        "words": generateWordTokens("works. Others learn new skills like"),
        "contentVi": "hoạt động. Những người khác học những kỹ năng mới như"
      },
      {
        "index": 27,
        "start": 92560,
        "end": 7053,
        "content": "cooking or fixing phones, but it takes",
        "words": generateWordTokens("cooking or fixing phones, but it takes"),
        "contentVi": "nấu ăn hoặc sửa điện thoại, nhưng phải mất"
      },
      {
        "index": 28,
        "start": 95759,
        "end": 7217,
        "content": "time and waiting is hard. Many feel they",
        "words": generateWordTokens("time and waiting is hard. Many feel they"),
        "contentVi": "thời gian và sự chờ đợi thật khó khăn. Nhiều người cảm thấy họ"
      },
      {
        "index": 29,
        "start": 99520,
        "end": 5940,
        "content": "are not good enough. Families help, but",
        "words": generateWordTokens("are not good enough. Families help, but"),
        "contentVi": "không đủ tốt. Gia đình giúp đỡ nhưng"
      },
      {
        "index": 30,
        "start": 102880,
        "end": 6982,
        "content": "sometimes parents push them to find jobs",
        "words": generateWordTokens("sometimes parents push them to find jobs"),
        "contentVi": "đôi khi cha mẹ thúc ép họ đi tìm việc làm"
      },
      {
        "index": 31,
        "start": 105360,
        "end": 7544,
        "content": "fast. This adds more stress. In Vietnam,",
        "words": generateWordTokens("fast. This adds more stress. In Vietnam,"),
        "contentVi": "nhanh. Điều này làm tăng thêm căng thẳng. Ở Việt Nam,"
      },
      {
        "index": 32,
        "start": 109759,
        "end": 5711,
        "content": "unemployment touches everyone. Young",
        "words": generateWordTokens("unemployment touches everyone. Young"),
        "contentVi": "thất nghiệp chạm đến tất cả mọi người. Trẻ"
      },
      {
        "index": 33,
        "start": 112799,
        "end": 6433,
        "content": "people want to make parents proud, but",
        "words": generateWordTokens("people want to make parents proud, but"),
        "contentVi": "mọi người muốn làm cha mẹ tự hào, nhưng"
      },
      {
        "index": 34,
        "start": 115360,
        "end": 6834,
        "content": "no job makes it hard. Some lose hope and",
        "words": generateWordTokens("no job makes it hard. Some lose hope and"),
        "contentVi": "không có công việc nào làm khó được. Một số mất hy vọng và"
      },
      {
        "index": 35,
        "start": 119119,
        "end": 5640,
        "content": "stop looking. Others sell things on the",
        "words": generateWordTokens("stop looking. Others sell things on the"),
        "contentVi": "ngừng tìm kiếm. Những người khác bán những thứ trên"
      },
      {
        "index": 36,
        "start": 122079,
        "end": 5482,
        "content": "street, like snacks or flowers to earn a",
        "words": generateWordTokens("street, like snacks or flowers to earn a"),
        "contentVi": "đường phố, như đồ ăn nhẹ hoặc hoa để kiếm tiền"
      },
      {
        "index": 37,
        "start": 124640,
        "end": 7005,
        "content": "little money. It's not easy, but they",
        "words": generateWordTokens("little money. It's not easy, but they"),
        "contentVi": "ít tiền. Điều đó không hề dễ dàng nhưng họ"
      },
      {
        "index": 38,
        "start": 127439,
        "end": 6768,
        "content": "try. But people don't give up. Some find",
        "words": generateWordTokens("try. But people don't give up. Some find"),
        "contentVi": "thử. Nhưng mọi người không bỏ cuộc. Một số tìm thấy"
      },
      {
        "index": 39,
        "start": 131520,
        "end": 5571,
        "content": "small jobs like working at a cafe or",
        "words": generateWordTokens("small jobs like working at a cafe or"),
        "contentVi": "những công việc nhỏ như làm việc ở quán cà phê hoặc"
      },
      {
        "index": 40,
        "start": 134080,
        "end": 5653,
        "content": "teaching kids. Others start small",
        "words": generateWordTokens("teaching kids. Others start small"),
        "contentVi": "dạy dỗ trẻ em. Những người khác bắt đầu nhỏ"
      },
      {
        "index": 41,
        "start": 136959,
        "end": 6378,
        "content": "businesses like selling Bank Me from a",
        "words": generateWordTokens("businesses like selling Bank Me from a"),
        "contentVi": "các doanh nghiệp như bán Bank Me từ một"
      },
      {
        "index": 42,
        "start": 139599,
        "end": 7661,
        "content": "cart. Friends help too. They share job",
        "words": generateWordTokens("cart. Friends help too. They share job"),
        "contentVi": "xe đẩy. Bạn bè cũng giúp đỡ. Họ chia sẻ công việc"
      },
      {
        "index": 43,
        "start": 143200,
        "end": 6863,
        "content": "news or buy food together. In Vietnam,",
        "words": generateWordTokens("news or buy food together. In Vietnam,"),
        "contentVi": "tin tức hoặc mua thức ăn cùng nhau. Ở Việt Nam,"
      },
      {
        "index": 44,
        "start": 147120,
        "end": 7027,
        "content": "people care for each other. When someone",
        "words": generateWordTokens("people care for each other. When someone"),
        "contentVi": "mọi người quan tâm lẫn nhau. Khi ai đó"
      },
      {
        "index": 45,
        "start": 149920,
        "end": 7350,
        "content": "has no job, neighbors give rice or soup.",
        "words": generateWordTokens("has no job, neighbors give rice or soup."),
        "contentVi": "không có việc làm, hàng xóm cho cơm, canh."
      },
      {
        "index": 46,
        "start": 154000,
        "end": 7673,
        "content": "This love keeps them strong.",
        "words": generateWordTokens("This love keeps them strong."),
        "contentVi": "Tình yêu này giúp họ mạnh mẽ."
      },
      {
        "index": 47,
        "start": 157120,
        "end": 7837,
        "content": "Unemployment is sad, but hope is big.",
        "words": generateWordTokens("Unemployment is sad, but hope is big."),
        "contentVi": "Thất nghiệp thì buồn nhưng hy vọng thì lớn."
      },
      {
        "index": 48,
        "start": 161519,
        "end": 7123,
        "content": "People learn to fight. They work hard",
        "words": generateWordTokens("People learn to fight. They work hard"),
        "contentVi": "Người ta học cách chiến đấu. Họ làm việc chăm chỉ"
      },
      {
        "index": 49,
        "start": 164800,
        "end": 7125,
        "content": "and dream of better days. In busy cities",
        "words": generateWordTokens("and dream of better days. In busy cities"),
        "contentVi": "và mơ về những ngày tốt đẹp hơn. Ở những thành phố bận rộn"
      },
      {
        "index": 50,
        "start": 168480,
        "end": 5287,
        "content": "with loud streets and kind hearts, they",
        "words": generateWordTokens("with loud streets and kind hearts, they"),
        "contentVi": "với những con phố ồn ào và trái tim nhân hậu, họ"
      },
      {
        "index": 51,
        "start": 171760,
        "end": 5052,
        "content": "keep going.",
        "words": generateWordTokens("keep going."),
        "contentVi": "tiếp tục đi."
      },
      {
        "index": 52,
        "start": 173599,
        "end": 6415,
        "content": "In conclusion, unemployment in Vietnam",
        "words": generateWordTokens("In conclusion, unemployment in Vietnam"),
        "contentVi": "Tóm lại, thất nghiệp ở Việt Nam"
      },
      {
        "index": 53,
        "start": 176640,
        "end": 6416,
        "content": "makes life hard, especially for young",
        "words": generateWordTokens("makes life hard, especially for young"),
        "contentVi": "làm cho cuộc sống trở nên khó khăn, đặc biệt là đối với giới trẻ"
      },
      {
        "index": 54,
        "start": 179840,
        "end": 6499,
        "content": "people. No job means stress and no",
        "words": generateWordTokens("people. No job means stress and no"),
        "contentVi": "mọi người. Không có việc làm có nghĩa là căng thẳng và không"
      },
      {
        "index": 55,
        "start": 182879,
        "end": 6903,
        "content": "money, but people help each other and",
        "words": generateWordTokens("money, but people help each other and"),
        "contentVi": "tiền, nhưng mọi người giúp đỡ lẫn nhau và"
      },
      {
        "index": 56,
        "start": 186159,
        "end": 7387,
        "content": "try again. Do you know someone without a",
        "words": generateWordTokens("try again. Do you know someone without a"),
        "contentVi": "thử lại. Bạn có biết ai đó không có"
      },
      {
        "index": 57,
        "start": 189599,
        "end": 6031,
        "content": "job? How do they stay strong? Don't",
        "words": generateWordTokens("job? How do they stay strong? Don't"),
        "contentVi": "công việc? Làm thế nào để họ luôn mạnh mẽ? Đừng"
      },
      {
        "index": 58,
        "start": 193360,
        "end": 5152,
        "content": "forget to subscribe to our channel for",
        "words": generateWordTokens("forget to subscribe to our channel for"),
        "contentVi": "quên đăng ký kênh của chúng tôi để"
      },
      {
        "index": 59,
        "start": 195440,
        "end": 7835,
        "content": "more A2 English listening practice",
        "words": generateWordTokens("more A2 English listening practice"),
        "contentVi": "thêm luyện nghe tiếng Anh A2"
      },
      {
        "index": 60,
        "start": 198319,
        "end": 4959,
        "content": "videos. See you next time.",
        "words": generateWordTokens("videos. See you next time."),
        "contentVi": "video. Hẹn gặp lại lần sau."
      },
      {
        "index": 61,
        "start": 204800,
        "end": 6845,
        "content": "Hello everyone. Welcome to this A2",
        "words": generateWordTokens("Hello everyone. Welcome to this A2"),
        "contentVi": "Xin chào tất cả mọi người. Chào mừng đến với A2 này"
      },
      {
        "index": 62,
        "start": 208159,
        "end": 6049,
        "content": "English listening practice video. Today",
        "words": generateWordTokens("English listening practice video. Today"),
        "contentVi": "Video luyện nghe tiếng Anh. Hôm nay"
      }
    ]
  },

  "luyen-nghe-a2-ru7tubgpf0g": {
    "title": "Luyện Nghe Tiếng Anh Level A2 - A Mall",
    "audio_url": "RU7TUBGpF0g",
    "repeat_offset": 254.88,
    "sentences": [
      {
        "index": 0,
        "start": 12719,
        "end": 8413,
        "content": "about convenience stores in Vietnam.",
        "words": generateWordTokens("about convenience stores in Vietnam."),
        "contentVi": "về cửa hàng tiện lợi ở Việt Nam."
      },
      {
        "index": 1,
        "start": 16080,
        "end": 8496,
        "content": "Stores like Circle K, Ministop, and GS25",
        "words": generateWordTokens("Stores like Circle K, Ministop, and GS25"),
        "contentVi": "Các cửa hàng như Circle K, Ministop và GS25"
      },
      {
        "index": 2,
        "start": 21119,
        "end": 6261,
        "content": "are small lights in the busy city life.",
        "words": generateWordTokens("are small lights in the busy city life."),
        "contentVi": "là những ngọn đèn nhỏ trong nhịp sống đô thị tấp nập."
      },
      {
        "index": 3,
        "start": 24560,
        "end": 6265,
        "content": "They're open all night and sell quick",
        "words": generateWordTokens("They're open all night and sell quick"),
        "contentVi": "Họ mở cửa suốt đêm và bán rất nhanh"
      },
      {
        "index": 4,
        "start": 27359,
        "end": 5948,
        "content": "food. But they do more. They bring",
        "words": generateWordTokens("food. But they do more. They bring"),
        "contentVi": "đồ ăn. Nhưng họ còn làm nhiều hơn thế. Họ mang lại"
      },
      {
        "index": 5,
        "start": 30800,
        "end": 5790,
        "content": "comfort and small joys when you feel",
        "words": generateWordTokens("comfort and small joys when you feel"),
        "contentVi": "sự thoải mái và niềm vui nhỏ khi bạn cảm thấy"
      },
      {
        "index": 6,
        "start": 33280,
        "end": 6273,
        "content": "alone. Let me share a story about my",
        "words": generateWordTokens("alone. Let me share a story about my"),
        "contentVi": "một mình. Hãy để tôi chia sẻ một câu chuyện về tôi"
      },
      {
        "index": 7,
        "start": 36559,
        "end": 6838,
        "content": "friend Lan and how these stores changed",
        "words": generateWordTokens("friend Lan and how these stores changed"),
        "contentVi": "bạn Lan và những cửa hàng này đã thay đổi như thế nào"
      },
      {
        "index": 8,
        "start": 39520,
        "end": 7079,
        "content": "her heart. Anna moved to Ho Chi Min City",
        "words": generateWordTokens("her heart. Anna moved to Ho Chi Min City"),
        "contentVi": "trái tim cô ấy. Anna chuyển đến Thành phố Hồ Chí Minh"
      },
      {
        "index": 9,
        "start": 43360,
        "end": 7643,
        "content": "2 years ago. She was 20 and started",
        "words": generateWordTokens("2 years ago. She was 20 and started"),
        "contentVi": "2 năm trước. Cô ấy 20 tuổi và bắt đầu"
      },
      {
        "index": 10,
        "start": 46559,
        "end": 7648,
        "content": "university. The city felt big and cold.",
        "words": generateWordTokens("university. The city felt big and cold."),
        "contentVi": "trường đại học. Thành phố có cảm giác rộng lớn và lạnh lẽo."
      },
      {
        "index": 11,
        "start": 50960,
        "end": 6130,
        "content": "She lived in a tiny room alone, far from",
        "words": generateWordTokens("She lived in a tiny room alone, far from"),
        "contentVi": "Cô sống một mình trong căn phòng nhỏ, cách xa"
      },
      {
        "index": 12,
        "start": 54160,
        "end": 6534,
        "content": "her family in the countryside.",
        "words": generateWordTokens("her family in the countryside."),
        "contentVi": "gia đình cô ở nông thôn."
      },
      {
        "index": 13,
        "start": 57039,
        "end": 6298,
        "content": "At night, she felt sad and missed home.",
        "words": generateWordTokens("At night, she felt sad and missed home."),
        "contentVi": "Đêm về, cô buồn và nhớ nhà."
      },
      {
        "index": 14,
        "start": 60640,
        "end": 5741,
        "content": "She could not sleep, so she walked the",
        "words": generateWordTokens("She could not sleep, so she walked the"),
        "contentVi": "Cô không ngủ được nên đi dạo"
      },
      {
        "index": 15,
        "start": 63280,
        "end": 6942,
        "content": "streets. One night, she saw the red",
        "words": generateWordTokens("streets. One night, she saw the red"),
        "contentVi": "đường phố. Một đêm nọ, cô nhìn thấy màu đỏ"
      },
      {
        "index": 16,
        "start": 66320,
        "end": 7826,
        "content": "light of Circle K. It was open, warm,",
        "words": generateWordTokens("light of Circle K. It was open, warm,"),
        "contentVi": "ánh sáng của Circle K. Nó rộng mở, ấm áp,"
      },
      {
        "index": 17,
        "start": 70159,
        "end": 6471,
        "content": "and full of life. Anna went inside. The",
        "words": generateWordTokens("and full of life. Anna went inside. The"),
        "contentVi": "và tràn đầy sức sống. Anna đi vào trong. các"
      },
      {
        "index": 18,
        "start": 74080,
        "end": 5914,
        "content": "worker smiled and said, \"What can I get",
        "words": generateWordTokens("worker smiled and said, \"What can I get"),
        "contentVi": "công nhân mỉm cười và nói: \"Tôi có thể nhận được gì"
      },
      {
        "index": 19,
        "start": 76560,
        "end": 7276,
        "content": "you?\" She bought a hot coffee and a",
        "words": generateWordTokens("you?\" She bought a hot coffee and a"),
        "contentVi": "còn bạn?\" Cô ấy mua một cốc cà phê nóng và một"
      },
      {
        "index": 20,
        "start": 79920,
        "end": 6000,
        "content": "sandwich. For the first time, she felt",
        "words": generateWordTokens("sandwich. For the first time, she felt"),
        "contentVi": "sandwich. Lần đầu tiên cô cảm thấy"
      },
      {
        "index": 21,
        "start": 83759,
        "end": 4565,
        "content": "safe.",
        "words": generateWordTokens("safe."),
        "contentVi": "an toàn."
      },
      {
        "index": 22,
        "start": 85840,
        "end": 5926,
        "content": "From that night, convenience stores",
        "words": generateWordTokens("From that night, convenience stores"),
        "contentVi": "Từ đêm đó, cửa hàng tiện lợi"
      },
      {
        "index": 23,
        "start": 88240,
        "end": 6327,
        "content": "became Anna's friends. Circle K was near",
        "words": generateWordTokens("became Anna's friends. Circle K was near"),
        "contentVi": "đã trở thành bạn của Anna. Circle K đã ở gần"
      },
      {
        "index": 24,
        "start": 91680,
        "end": 6092,
        "content": "her school. She went there after classes",
        "words": generateWordTokens("her school. She went there after classes"),
        "contentVi": "trường của cô ấy. Cô ấy đến đó sau giờ học"
      },
      {
        "index": 25,
        "start": 94479,
        "end": 6335,
        "content": "to eat yogurt or read books. The bright",
        "words": generateWordTokens("to eat yogurt or read books. The bright"),
        "contentVi": "để ăn sữa chua hoặc đọc sách. Sự tươi sáng"
      },
      {
        "index": 26,
        "start": 97680,
        "end": 6338,
        "content": "lights made her forget loneliness.",
        "words": generateWordTokens("lights made her forget loneliness."),
        "contentVi": "ánh đèn làm cô quên đi nỗi cô đơn."
      },
      {
        "index": 27,
        "start": 100720,
        "end": 6581,
        "content": "One day, she met a boy named Jerry at",
        "words": generateWordTokens("One day, she met a boy named Jerry at"),
        "contentVi": "Một ngày nọ, cô gặp một cậu bé tên Jerry tại"
      },
      {
        "index": 28,
        "start": 103920,
        "end": 6504,
        "content": "Minitop. He was eating ice cream and",
        "words": generateWordTokens("Minitop. He was eating ice cream and"),
        "contentVi": "Minitop. Anh ấy đang ăn kem và"
      },
      {
        "index": 29,
        "start": 107200,
        "end": 6187,
        "content": "studying. They talked about school.",
        "words": generateWordTokens("studying. They talked about school."),
        "contentVi": "học. Họ nói chuyện về trường học."
      },
      {
        "index": 30,
        "start": 110320,
        "end": 5790,
        "content": "Jerry said, \"These stores are like home",
        "words": generateWordTokens("Jerry said, \"These stores are like home"),
        "contentVi": "Jerry nói, \"Những cửa hàng này giống như nhà"
      },
      {
        "index": 31,
        "start": 113280,
        "end": 7473,
        "content": "when you are far away. They became",
        "words": generateWordTokens("when you are far away. They became"),
        "contentVi": "khi bạn ở xa. Họ đã trở thành"
      },
      {
        "index": 32,
        "start": 116000,
        "end": 8676,
        "content": "friends. Now they meet at GS25 for Kimop",
        "words": generateWordTokens("friends. Now they meet at GS25 for Kimop"),
        "contentVi": "bạn. Bây giờ họ gặp nhau tại GS25 vì Kimop"
      },
      {
        "index": 33,
        "start": 120640,
        "end": 7401,
        "content": "and tea. They laugh and share stories.",
        "words": generateWordTokens("and tea. They laugh and share stories."),
        "contentVi": "và trà. Họ cười và chia sẻ những câu chuyện."
      },
      {
        "index": 34,
        "start": 124560,
        "end": 5005,
        "content": "Anna says, \"These places gave me a new",
        "words": generateWordTokens("Anna says, \"These places gave me a new"),
        "contentVi": "Anna nói, \"Những nơi này đã cho tôi một cảm giác mới"
      },
      {
        "index": 35,
        "start": 127920,
        "end": 4288,
        "content": "family.\"",
        "words": generateWordTokens("family.\""),
        "contentVi": "gia đình.\""
      },
      {
        "index": 36,
        "start": 129440,
        "end": 6928,
        "content": "In Vietnam, convenience stores like",
        "words": generateWordTokens("In Vietnam, convenience stores like"),
        "contentVi": "Ở Việt Nam, các cửa hàng tiện lợi như"
      },
      {
        "index": 37,
        "start": 132080,
        "end": 7572,
        "content": "Circle K, Ministop, and GS25",
        "words": generateWordTokens("Circle K, Ministop, and GS25"),
        "contentVi": "Circle K, Ministop và GS25"
      },
      {
        "index": 38,
        "start": 136239,
        "end": 6617,
        "content": "are everywhere. Circle K sells",
        "words": generateWordTokens("are everywhere. Circle K sells"),
        "contentVi": "có ở khắp mọi nơi. Circle K bán"
      },
      {
        "index": 39,
        "start": 139520,
        "end": 6939,
        "content": "sandwiches and coffee. Minitop has",
        "words": generateWordTokens("sandwiches and coffee. Minitop has"),
        "contentVi": "bánh mì và cà phê. Minitop có"
      },
      {
        "index": 40,
        "start": 142720,
        "end": 7742,
        "content": "Japanese treats like hot rice balls.",
        "words": generateWordTokens("Japanese treats like hot rice balls."),
        "contentVi": "Món ăn Nhật Bản như cơm nắm nóng."
      },
      {
        "index": 41,
        "start": 146319,
        "end": 7426,
        "content": "GS25 offers Korean snacks and drinks.",
        "words": generateWordTokens("GS25 offers Korean snacks and drinks."),
        "contentVi": "GS25 cung cấp đồ ăn nhẹ và đồ uống Hàn Quốc."
      },
      {
        "index": 42,
        "start": 150319,
        "end": 6391,
        "content": "They are open 24 hours, so workers grab",
        "words": generateWordTokens("They are open 24 hours, so workers grab"),
        "contentVi": "Họ mở cửa 24 giờ nên công nhân lấy"
      },
      {
        "index": 43,
        "start": 153599,
        "end": 6395,
        "content": "food after late shifts. Students buy",
        "words": generateWordTokens("food after late shifts. Students buy"),
        "contentVi": "thức ăn sau ca làm muộn. Sinh viên mua"
      },
      {
        "index": 44,
        "start": 156560,
        "end": 7196,
        "content": "water before exams. Families get milk",
        "words": generateWordTokens("water before exams. Families get milk"),
        "contentVi": "nước trước kỳ thi. Các gia đình nhận được sữa"
      },
      {
        "index": 45,
        "start": 159840,
        "end": 7360,
        "content": "for kids. During rain, people run inside",
        "words": generateWordTokens("for kids. During rain, people run inside"),
        "contentVi": "dành cho trẻ em. Trời mưa người ta chạy vào nhà"
      },
      {
        "index": 46,
        "start": 163599,
        "end": 7125,
        "content": "for umbrellas. Prices are fair, but",
        "words": generateWordTokens("for umbrellas. Prices are fair, but"),
        "contentVi": "cho những chiếc ô. Giá cả hợp lý, nhưng"
      },
      {
        "index": 47,
        "start": 167040,
        "end": 8407,
        "content": "snacks are not always healthy. Still,",
        "words": generateWordTokens("snacks are not always healthy. Still,"),
        "contentVi": "đồ ăn nhẹ không phải lúc nào cũng tốt cho sức khỏe. Vẫn,"
      },
      {
        "index": 48,
        "start": 170560,
        "end": 8490,
        "content": "they save time in fast city life.",
        "words": generateWordTokens("they save time in fast city life."),
        "contentVi": "họ tiết kiệm thời gian trong cuộc sống thành phố nhanh chóng."
      },
      {
        "index": 49,
        "start": 175280,
        "end": 6655,
        "content": "These stores bring meaning for Anna.",
        "words": generateWordTokens("These stores bring meaning for Anna."),
        "contentVi": "Những cửa hàng này mang lại ý nghĩa cho Anna."
      },
      {
        "index": 50,
        "start": 178879,
        "end": 5220,
        "content": "They were a bridge to happiness. She",
        "words": generateWordTokens("They were a bridge to happiness. She"),
        "contentVi": "Họ là cầu nối dẫn đến hạnh phúc. Cô ấy"
      },
      {
        "index": 51,
        "start": 181760,
        "end": 6021,
        "content": "remembers her first Christmas in the",
        "words": generateWordTokens("remembers her first Christmas in the"),
        "contentVi": "nhớ lại lễ Giáng sinh đầu tiên của cô ấy ở"
      },
      {
        "index": 52,
        "start": 183920,
        "end": 6824,
        "content": "city. She felt homesick, but Jerry",
        "words": generateWordTokens("city. She felt homesick, but Jerry"),
        "contentVi": "thành phố. Cô cảm thấy nhớ nhà, nhưng Jerry"
      },
      {
        "index": 53,
        "start": 187599,
        "end": 5709,
        "content": "invited her to GS25.",
        "words": generateWordTokens("invited her to GS25."),
        "contentVi": "mời cô đến GS25."
      },
      {
        "index": 54,
        "start": 190560,
        "end": 5870,
        "content": "They ate cup noodles and watched the",
        "words": generateWordTokens("They ate cup noodles and watched the"),
        "contentVi": "Họ ăn mì cốc và xem"
      },
      {
        "index": 55,
        "start": 193120,
        "end": 5793,
        "content": "street lights. It was simple, but her",
        "words": generateWordTokens("street lights. It was simple, but her"),
        "contentVi": "đèn đường. Điều đó thật đơn giản nhưng cô ấy"
      },
      {
        "index": 56,
        "start": 196239,
        "end": 6196,
        "content": "heart felt full.",
        "words": generateWordTokens("heart felt full."),
        "contentVi": "trái tim cảm thấy tràn đầy."
      },
      {
        "index": 57,
        "start": 198720,
        "end": 6679,
        "content": "Now Anna works part-time at Circle K.",
        "words": generateWordTokens("Now Anna works part-time at Circle K."),
        "contentVi": "Bây giờ Anna làm việc bán thời gian tại Circle K."
      },
      {
        "index": 58,
        "start": 202239,
        "end": 6282,
        "content": "She smiles at lonely customers just like",
        "words": generateWordTokens("She smiles at lonely customers just like"),
        "contentVi": "Cô ấy mỉm cười với những khách hàng cô đơn giống như"
      },
      {
        "index": 59,
        "start": 205200,
        "end": 5244,
        "content": "the worker did for her. It feels good to",
        "words": generateWordTokens("the worker did for her. It feels good to"),
        "contentVi": "người công nhân đã làm cho cô ấy. Nó cảm thấy tốt để"
      },
      {
        "index": 60,
        "start": 208319,
        "end": 4929,
        "content": "give back.",
        "words": generateWordTokens("give back."),
        "contentVi": "trả lại."
      },
      {
        "index": 61,
        "start": 210239,
        "end": 6930,
        "content": "Convenience stores are small, but they",
        "words": generateWordTokens("Convenience stores are small, but they"),
        "contentVi": "Cửa hàng tiện lợi tuy nhỏ nhưng"
      },
      {
        "index": 62,
        "start": 213040,
        "end": 7253,
        "content": "hold big emotions. In Vietnam's noisy",
        "words": generateWordTokens("hold big emotions. In Vietnam's noisy"),
        "contentVi": "giữ những cảm xúc lớn. Ở Việt Nam ồn ào"
      },
      {
        "index": 63,
        "start": 216959,
        "end": 6137,
        "content": "streets, they are quiet spots for dreams",
        "words": generateWordTokens("streets, they are quiet spots for dreams"),
        "contentVi": "đường phố, chúng là những nơi yên tĩnh cho những giấc mơ"
      },
      {
        "index": 64,
        "start": 220080,
        "end": 5980,
        "content": "and connections. They remind us that",
        "words": generateWordTokens("and connections. They remind us that"),
        "contentVi": "và các kết nối. Họ nhắc nhở chúng ta rằng"
      },
      {
        "index": 65,
        "start": 222879,
        "end": 4943,
        "content": "even in a big city, kindness waits",
        "words": generateWordTokens("even in a big city, kindness waits"),
        "contentVi": "ngay cả trong một thành phố lớn, lòng tốt vẫn chờ đợi"
      },
      {
        "index": 66,
        "start": 225840,
        "end": 5746,
        "content": "around the corner.",
        "words": generateWordTokens("around the corner."),
        "contentVi": "quanh góc."
      },
      {
        "index": 67,
        "start": 227599,
        "end": 5588,
        "content": "In conclusion, Circle K, Minitop, and",
        "words": generateWordTokens("In conclusion, Circle K, Minitop, and"),
        "contentVi": "Tóm lại, Circle K, Minitop và"
      },
      {
        "index": 68,
        "start": 231360,
        "end": 4791,
        "content": "GS25",
        "words": generateWordTokens("GS25"),
        "contentVi": "GS25"
      },
      {
        "index": 69,
        "start": 232959,
        "end": 5914,
        "content": "are more than shops. They help people",
        "words": generateWordTokens("are more than shops. They help people"),
        "contentVi": "nhiều hơn các cửa hàng. Họ giúp đỡ mọi người"
      },
      {
        "index": 70,
        "start": 235920,
        "end": 6236,
        "content": "feel less alone and create warm",
        "words": generateWordTokens("feel less alone and create warm"),
        "contentVi": "cảm thấy bớt cô đơn và tạo ra sự ấm áp"
      },
      {
        "index": 71,
        "start": 238640,
        "end": 7599,
        "content": "memories. Honest Story shows how small",
        "words": generateWordTokens("memories. Honest Story shows how small"),
        "contentVi": "ký ức. Chuyện thật thà cho thấy nhỏ bé thế nào"
      },
      {
        "index": 72,
        "start": 241920,
        "end": 7042,
        "content": "places can change lives. Have you had a",
        "words": generateWordTokens("places can change lives. Have you had a"),
        "contentVi": "những nơi có thể thay đổi cuộc sống Bạn đã có một"
      },
      {
        "index": 73,
        "start": 246000,
        "end": 5845,
        "content": "special moment at a store? Don't forget",
        "words": generateWordTokens("special moment at a store? Don't forget"),
        "contentVi": "khoảnh khắc đặc biệt tại một cửa hàng? Đừng quên"
      },
      {
        "index": 74,
        "start": 248720,
        "end": 5609,
        "content": "to subscribe to our channel for more A2",
        "words": generateWordTokens("to subscribe to our channel for more A2"),
        "contentVi": "đăng ký kênh của chúng tôi để biết thêm A2"
      },
      {
        "index": 75,
        "start": 251599,
        "end": 6133,
        "content": "English listening practice videos. See",
        "words": generateWordTokens("English listening practice videos. See"),
        "contentVi": "Video luyện nghe tiếng Anh. Nhìn thấy"
      },
      {
        "index": 76,
        "start": 254080,
        "end": 3654,
        "content": "you next time.",
        "words": generateWordTokens("you next time."),
        "contentVi": "bạn lần sau."
      },
      {
        "index": 77,
        "start": 259280,
        "end": 6259,
        "content": "Hello everyone. Welcome to this A2",
        "words": generateWordTokens("Hello everyone. Welcome to this A2"),
        "contentVi": "Xin chào tất cả mọi người. Chào mừng đến với A2 này"
      },
      {
        "index": 78,
        "start": 262000,
        "end": 5942,
        "content": "English listening practice video. Today",
        "words": generateWordTokens("English listening practice video. Today"),
        "contentVi": "Video luyện nghe tiếng Anh. Hôm nay"
      }
    ]
  },

  "luyen-nghe-a2-jcxs_emyaky": {
    "title": "Luyện Nghe Tiếng Anh Level A2 - A Park",
    "audio_url": "JcXs_EMYakY",
    "repeat_offset": 154.56,
    "sentences": [
      {
        "index": 0,
        "start": 13280,
        "end": 4493,
        "content": "Hey Anna, we're firstear students in the",
        "words": generateWordTokens("Hey Anna, we're firstear students in the"),
        "contentVi": "Này Anna, chúng tôi là học sinh năm nhất của trường."
      },
      {
        "index": 1,
        "start": 15920,
        "end": 4576,
        "content": "big city now. You like it?",
        "words": generateWordTokens("big city now. You like it?"),
        "contentVi": "thành phố lớn hiện nay. Bạn thích nó?"
      },
      {
        "index": 2,
        "start": 17760,
        "end": 4738,
        "content": "Hi Tom. Yes, the city is fun, but",
        "words": generateWordTokens("Hi Tom. Yes, the city is fun, but"),
        "contentVi": "Chào Tom. Vâng, thành phố này rất vui, nhưng"
      },
      {
        "index": 3,
        "start": 20480,
        "end": 4500,
        "content": "everything costs money.",
        "words": generateWordTokens("everything costs money."),
        "contentVi": "mọi thứ đều tốn tiền."
      },
      {
        "index": 4,
        "start": 22480,
        "end": 4502,
        "content": "True. At home, my parents paid for all.",
        "words": generateWordTokens("True. At home, my parents paid for all."),
        "contentVi": "ĐÚNG VẬY. Ở nhà, bố mẹ tôi trả hết."
      },
      {
        "index": 5,
        "start": 24960,
        "end": 5465,
        "content": "Now I check my wallet all the time.",
        "words": generateWordTokens("Now I check my wallet all the time."),
        "contentVi": "Bây giờ tôi kiểm tra ví của mình mọi lúc."
      },
      {
        "index": 6,
        "start": 26960,
        "end": 5227,
        "content": "Same. I want spicy noodles and milk tea,",
        "words": generateWordTokens("Same. I want spicy noodles and milk tea,"),
        "contentVi": "Như nhau. Tôi muốn mì cay và trà sữa,"
      },
      {
        "index": 7,
        "start": 30400,
        "end": 2510,
        "content": "but I can't buy them every day like with",
        "words": generateWordTokens("but I can't buy them every day like with"),
        "contentVi": "nhưng tôi không thể mua chúng hàng ngày như với"
      },
      {
        "index": 8,
        "start": 32160,
        "end": 3552,
        "content": "my parents.",
        "words": generateWordTokens("my parents."),
        "contentVi": "bố mẹ tôi."
      },
      {
        "index": 9,
        "start": 32880,
        "end": 5392,
        "content": "I miss milk tea, too. Before, mom gave",
        "words": generateWordTokens("I miss milk tea, too. Before, mom gave"),
        "contentVi": "Mình cũng nhớ trà sữa. Trước đây mẹ cho"
      },
      {
        "index": 10,
        "start": 35680,
        "end": 5316,
        "content": "me money. Now I save every penny.",
        "words": generateWordTokens("me money. Now I save every penny."),
        "contentVi": "tiền cho tôi. Bây giờ tôi tiết kiệm từng xu."
      },
      {
        "index": 11,
        "start": 38239,
        "end": 4839,
        "content": "Yes, I see friends eat at Heidi. Looks",
        "words": generateWordTokens("Yes, I see friends eat at Heidi. Looks"),
        "contentVi": "Vâng, tôi thấy bạn bè ăn ở Heidi. Trông"
      },
      {
        "index": 12,
        "start": 40960,
        "end": 5160,
        "content": "so good, but too expensive.",
        "words": generateWordTokens("so good, but too expensive."),
        "contentVi": "quá tốt, nhưng quá đắt."
      },
      {
        "index": 13,
        "start": 43040,
        "end": 5722,
        "content": "Heidily? My wallet says no. I pay for",
        "words": generateWordTokens("Heidily? My wallet says no. I pay for"),
        "contentVi": "Thật là khủng khiếp? Ví của tôi nói không. tôi trả tiền cho"
      },
      {
        "index": 14,
        "start": 46079,
        "end": 5647,
        "content": "rent, food, bus, and school books.",
        "words": generateWordTokens("rent, food, bus, and school books."),
        "contentVi": "tiền thuê nhà, thực phẩm, xe buýt và sách học."
      },
      {
        "index": 15,
        "start": 48719,
        "end": 5650,
        "content": "Me, too. Rent, food, transport, school",
        "words": generateWordTokens("Me, too. Rent, food, transport, school"),
        "contentVi": "Tôi cũng vậy. Thuê nhà, ăn uống, đi lại, trường học"
      },
      {
        "index": 16,
        "start": 51680,
        "end": 5091,
        "content": "stuff. I want Heidi Lao, but no way.",
        "words": generateWordTokens("stuff. I want Heidi Lao, but no way."),
        "contentVi": "chất liệu. Tôi muốn Heidi Lao, nhưng không thể nào."
      },
      {
        "index": 17,
        "start": 54320,
        "end": 5574,
        "content": "So, you work to get money? Yeah, I work",
        "words": generateWordTokens("So, you work to get money? Yeah, I work"),
        "contentVi": "Vậy bạn làm việc để kiếm tiền à? Vâng, tôi làm việc"
      },
      {
        "index": 18,
        "start": 56719,
        "end": 5577,
        "content": "part-time at a cafe. It's hard. I study,",
        "words": generateWordTokens("part-time at a cafe. It's hard. I study,"),
        "contentVi": "bán thời gian tại một quán cà phê. Thật khó khăn. tôi học,"
      },
      {
        "index": 19,
        "start": 59840,
        "end": 4860,
        "content": "I work, and I'm so tired.",
        "words": generateWordTokens("I work, and I'm so tired."),
        "contentVi": "Tôi làm việc và tôi rất mệt mỏi."
      },
      {
        "index": 20,
        "start": 62239,
        "end": 4622,
        "content": "Same. I work at a shop. It helps my",
        "words": generateWordTokens("Same. I work at a shop. It helps my"),
        "contentVi": "Như nhau. Tôi làm việc ở một cửa hàng. Nó giúp tôi"
      },
      {
        "index": 21,
        "start": 64640,
        "end": 2945,
        "content": "family, but I'm stressed. School is",
        "words": generateWordTokens("family, but I'm stressed. School is"),
        "contentVi": "gia đình nhưng tôi thấy căng thẳng. Trường học là"
      },
      {
        "index": 22,
        "start": 66799,
        "end": 3028,
        "content": "important, too,",
        "words": generateWordTokens("important, too,"),
        "contentVi": "cũng quan trọng,"
      },
      {
        "index": 23,
        "start": 67520,
        "end": 5108,
        "content": "right? My family isn't rich. If I don't",
        "words": generateWordTokens("right? My family isn't rich. If I don't"),
        "contentVi": "Phải? Gia đình tôi không giàu có. Nếu tôi không"
      },
      {
        "index": 24,
        "start": 69760,
        "end": 3510,
        "content": "work, my parents work more. I feel sad",
        "words": generateWordTokens("work, my parents work more. I feel sad"),
        "contentVi": "làm việc, bố mẹ tôi làm việc nhiều hơn. tôi cảm thấy buồn"
      },
      {
        "index": 25,
        "start": 72560,
        "end": 3353,
        "content": "for them.",
        "words": generateWordTokens("for them."),
        "contentVi": "cho họ."
      },
      {
        "index": 26,
        "start": 73200,
        "end": 5352,
        "content": "I know. My parents aren't rich either. I",
        "words": generateWordTokens("I know. My parents aren't rich either. I"),
        "contentVi": "Tôi biết. Bố mẹ tôi cũng không giàu có. TÔI"
      },
      {
        "index": 27,
        "start": 75840,
        "end": 5756,
        "content": "work to help, but my grades are bad now.",
        "words": generateWordTokens("work to help, but my grades are bad now."),
        "contentVi": "làm việc để giúp đỡ, nhưng điểm của tôi bây giờ rất tệ."
      },
      {
        "index": 28,
        "start": 78479,
        "end": 6239,
        "content": "So, no. And I'm jealous of rich kids.",
        "words": generateWordTokens("So, no. And I'm jealous of rich kids."),
        "contentVi": "Vì vậy, không. Và tôi ghen tị với những đứa trẻ giàu có."
      },
      {
        "index": 29,
        "start": 81520,
        "end": 5442,
        "content": "They have everything. Nice clothes, good",
        "words": generateWordTokens("They have everything. Nice clothes, good"),
        "contentVi": "Họ có mọi thứ. Quần áo đẹp, tốt"
      },
      {
        "index": 30,
        "start": 84640,
        "end": 4725,
        "content": "phones, no worries about money.",
        "words": generateWordTokens("phones, no worries about money."),
        "contentVi": "điện thoại, không phải lo lắng về tiền bạc."
      },
      {
        "index": 31,
        "start": 86880,
        "end": 4247,
        "content": "Yeah. They buy expensive stuff, don't",
        "words": generateWordTokens("Yeah. They buy expensive stuff, don't"),
        "contentVi": "Vâng. Họ mua những thứ đắt tiền, không"
      },
      {
        "index": 32,
        "start": 89280,
        "end": 3449,
        "content": "think about rent. They have time to",
        "words": generateWordTokens("think about rent. They have time to"),
        "contentVi": "nghĩ về tiền thuê nhà. Họ có thời gian để"
      },
      {
        "index": 33,
        "start": 91040,
        "end": 4891,
        "content": "study and follow dreams.",
        "words": generateWordTokens("study and follow dreams."),
        "contentVi": "học tập và theo đuổi ước mơ."
      },
      {
        "index": 34,
        "start": 92640,
        "end": 6252,
        "content": "Exactly. We have no choice. Work, study,",
        "words": generateWordTokens("Exactly. We have no choice. Work, study,"),
        "contentVi": "Chính xác. Chúng tôi không có sự lựa chọn. Làm việc, học tập,"
      },
      {
        "index": 35,
        "start": 95840,
        "end": 5375,
        "content": "save, and school costs so much. I worry",
        "words": generateWordTokens("save, and school costs so much. I worry"),
        "contentVi": "tiết kiệm, và chi phí học tập rất nhiều. tôi lo lắng"
      },
      {
        "index": 36,
        "start": 98799,
        "end": 5620,
        "content": "if I finish, I find a job or not.",
        "words": generateWordTokens("if I finish, I find a job or not."),
        "contentVi": "nếu học xong tôi có tìm được việc làm hay không."
      },
      {
        "index": 37,
        "start": 101119,
        "end": 4902,
        "content": "True. Many people know jobs now. Scary.",
        "words": generateWordTokens("True. Many people know jobs now. Scary."),
        "contentVi": "ĐÚNG VẬY. Hiện nay có nhiều người biết việc. Đáng sợ."
      },
      {
        "index": 38,
        "start": 104320,
        "end": 3384,
        "content": "I think about learning English or",
        "words": generateWordTokens("I think about learning English or"),
        "contentVi": "Tôi nghĩ về việc học tiếng Anh hoặc"
      },
      {
        "index": 39,
        "start": 105920,
        "end": 4106,
        "content": "Chinese for better future.",
        "words": generateWordTokens("Chinese for better future."),
        "contentVi": "Tiếng Trung cho tương lai tốt đẹp hơn"
      },
      {
        "index": 40,
        "start": 107600,
        "end": 5307,
        "content": "Me too. I want to study IELTS or",
        "words": generateWordTokens("Me too. I want to study IELTS or"),
        "contentVi": "Tôi cũng vậy. Tôi muốn học IELTS hoặc"
      },
      {
        "index": 41,
        "start": 109920,
        "end": 4669,
        "content": "Chinese, but lessons cost a lot. I can't",
        "words": generateWordTokens("Chinese, but lessons cost a lot. I can't"),
        "contentVi": "Tiếng Trung, nhưng bài học tốn rất nhiều tiền. tôi không thể"
      },
      {
        "index": 42,
        "start": 112799,
        "end": 2354,
        "content": "ask my parents. They work too hard",
        "words": generateWordTokens("ask my parents. They work too hard"),
        "contentVi": "hỏi bố mẹ tôi. Họ làm việc quá chăm chỉ"
      },
      {
        "index": 43,
        "start": 114479,
        "end": 3394,
        "content": "already.",
        "words": generateWordTokens("already."),
        "contentVi": "đã."
      },
      {
        "index": 44,
        "start": 115040,
        "end": 5154,
        "content": "Same. My parents are tired. I don't ask",
        "words": generateWordTokens("Same. My parents are tired. I don't ask"),
        "contentVi": "Như nhau. Bố mẹ tôi mệt rồi. tôi không hỏi"
      },
      {
        "index": 45,
        "start": 117759,
        "end": 3559,
        "content": "for money. But without English, hard to",
        "words": generateWordTokens("for money. But without English, hard to"),
        "contentVi": "vì tiền. Nhưng không có tiếng Anh thì khó"
      },
      {
        "index": 46,
        "start": 120079,
        "end": 4361,
        "content": "get good job.",
        "words": generateWordTokens("get good job."),
        "contentVi": "có được công việc tốt."
      },
      {
        "index": 47,
        "start": 121200,
        "end": 5320,
        "content": "So stressful. Work part-time, study, no",
        "words": generateWordTokens("So stressful. Work part-time, study, no"),
        "contentVi": "Thật căng thẳng. Làm việc bán thời gian, học tập, không"
      },
      {
        "index": 48,
        "start": 124320,
        "end": 6123,
        "content": "money for fun. What do we do?",
        "words": generateWordTokens("money for fun. What do we do?"),
        "contentVi": "tiền để giải trí. Chúng ta làm gì?"
      },
      {
        "index": 49,
        "start": 126399,
        "end": 6127,
        "content": "M find free English apps. Or study",
        "words": generateWordTokens("M find free English apps. Or study"),
        "contentVi": "M tìm ứng dụng tiếng Anh miễn phí. Hoặc học"
      },
      {
        "index": 50,
        "start": 130319,
        "end": 2770,
        "content": "together, save money, no expensive",
        "words": generateWordTokens("together, save money, no expensive"),
        "contentVi": "cùng nhau, tiết kiệm tiền, không tốn kém"
      },
      {
        "index": 51,
        "start": 132400,
        "end": 3572,
        "content": "classes.",
        "words": generateWordTokens("classes."),
        "contentVi": "các lớp học."
      },
      {
        "index": 52,
        "start": 132959,
        "end": 5654,
        "content": "Good idea. I saw on Tik Tok a guy who",
        "words": generateWordTokens("Good idea. I saw on Tik Tok a guy who"),
        "contentVi": "Ý tưởng hay. Tôi thấy trên Tik Tok một anh chàng"
      },
      {
        "index": 53,
        "start": 135840,
        "end": 4776,
        "content": "makes videos about self-study IELTS. His",
        "words": generateWordTokens("makes videos about self-study IELTS. His"),
        "contentVi": "làm video về tự học IELTS. Của anh ấy"
      },
      {
        "index": 54,
        "start": 138480,
        "end": 4218,
        "content": "videos are good. He has a YouTube",
        "words": generateWordTokens("videos are good. He has a YouTube"),
        "contentVi": "video rất tốt. Anh ấy có YouTube"
      },
      {
        "index": 55,
        "start": 140480,
        "end": 5100,
        "content": "channel for English listening. All free.",
        "words": generateWordTokens("channel for English listening. All free."),
        "contentVi": "kênh nghe tiếng anh. Tất cả đều miễn phí."
      },
      {
        "index": 56,
        "start": 142560,
        "end": 3663,
        "content": "He's kind and handsome. Let's try his",
        "words": generateWordTokens("He's kind and handsome. Let's try his"),
        "contentVi": "Anh ấy tốt bụng và đẹp trai. Hãy thử của anh ấy"
      },
      {
        "index": 57,
        "start": 145440,
        "end": 3584,
        "content": "lessons.",
        "words": generateWordTokens("lessons."),
        "contentVi": "bài học."
      },
      {
        "index": 58,
        "start": 146080,
        "end": 5426,
        "content": "Wow. Free sounds great. We watch his",
        "words": generateWordTokens("Wow. Free sounds great. We watch his"),
        "contentVi": "Ồ. Âm thanh miễn phí tuyệt vời. Chúng tôi xem của anh ấy"
      },
      {
        "index": 59,
        "start": 148879,
        "end": 5430,
        "content": "videos together. No cost. Learn English.",
        "words": generateWordTokens("videos together. No cost. Learn English."),
        "contentVi": "video cùng nhau. Không có chi phí. Học tiếng Anh."
      },
      {
        "index": 60,
        "start": 151360,
        "end": 5110,
        "content": "Yes. Study at the library. No cost. And",
        "words": generateWordTokens("Yes. Study at the library. No cost. And"),
        "contentVi": "Đúng. Học ở thư viện. Không có chi phí. Và"
      },
      {
        "index": 61,
        "start": 154160,
        "end": 5513,
        "content": "eat cheap noodles, not Heidi.",
        "words": generateWordTokens("eat cheap noodles, not Heidi."),
        "contentVi": "ăn mì rẻ tiền chứ không phải Heidi."
      },
      {
        "index": 62,
        "start": 156319,
        "end": 4557,
        "content": "Yes. Save now. Dream big. Maybe one day",
        "words": generateWordTokens("Yes. Save now. Dream big. Maybe one day"),
        "contentVi": "Đúng. Lưu ngay bây giờ. Hãy mơ lớn. Có lẽ một ngày nào đó"
      },
      {
        "index": 63,
        "start": 159519,
        "end": 3361,
        "content": "we go Heidi Low.",
        "words": generateWordTokens("we go Heidi Low."),
        "contentVi": "chúng ta đi Heidi Low."
      },
      {
        "index": 64,
        "start": 160720,
        "end": 5801,
        "content": "Deal. Tom. Study hard. Save money.",
        "words": generateWordTokens("Deal. Tom. Study hard. Save money."),
        "contentVi": "Thỏa thuận. Tom. Học tập chăm chỉ. Tiết kiệm tiền."
      },
      {
        "index": 65,
        "start": 162720,
        "end": 3803,
        "content": "Heidiow later.",
        "words": generateWordTokens("Heidiow later."),
        "contentVi": "Heidiow sau."
      }
    ]
  },

  "luyen-nghe-a2--lrx0zbbng8": {
    "title": "Luyện Nghe Tiếng Anh Level A2 - A Bank",
    "audio_url": "-lrX0zBbNG8",
    "repeat_offset": 148.96,
    "sentences": [
      {
        "index": 0,
        "start": 13599,
        "end": 5055,
        "content": "Anna, we ate spicy noodles. Now tell me",
        "words": generateWordTokens("Anna, we ate spicy noodles. Now tell me"),
        "contentVi": "Anna, chúng ta đã ăn mì cay rồi. Bây giờ hãy nói cho tôi biết"
      },
      {
        "index": 1,
        "start": 16560,
        "end": 5457,
        "content": "about this boy you like.",
        "words": generateWordTokens("about this boy you like."),
        "contentVi": "về chàng trai mà bạn thích."
      },
      {
        "index": 2,
        "start": 18640,
        "end": 6259,
        "content": "Okay, Tom. His name is Jerry. I met him",
        "words": generateWordTokens("Okay, Tom. His name is Jerry. I met him"),
        "contentVi": "Được rồi, Tom. Tên anh ấy là Jerry. tôi đã gặp anh ấy"
      },
      {
        "index": 3,
        "start": 22000,
        "end": 4662,
        "content": "first day at school. He's so handsome. I",
        "words": generateWordTokens("first day at school. He's so handsome. I"),
        "contentVi": "ngày đầu tiên đến trường. Anh ấy thật đẹp trai. TÔI"
      },
      {
        "index": 4,
        "start": 24880,
        "end": 4824,
        "content": "fall in love.",
        "words": generateWordTokens("fall in love."),
        "contentVi": "phải lòng."
      },
      {
        "index": 5,
        "start": 26640,
        "end": 4267,
        "content": "Handsome? Wow. What's so special about",
        "words": generateWordTokens("Handsome? Wow. What's so special about"),
        "contentVi": "Đẹp trai? Ồ. Có gì đặc biệt về"
      },
      {
        "index": 6,
        "start": 29679,
        "end": 4111,
        "content": "Jerry?",
        "words": generateWordTokens("Jerry?"),
        "contentVi": "Jerry?"
      },
      {
        "index": 7,
        "start": 30880,
        "end": 5471,
        "content": "Oh, he's super smart. Always gets good",
        "words": generateWordTokens("Oh, he's super smart. Always gets good"),
        "contentVi": "Ồ, anh ấy siêu thông minh. Luôn luôn tốt"
      },
      {
        "index": 8,
        "start": 33760,
        "end": 4673,
        "content": "grades. And he's rich. He comes to",
        "words": generateWordTokens("grades. And he's rich. He comes to"),
        "contentVi": "lớp. Và anh ấy giàu có. Anh ấy đến"
      },
      {
        "index": 9,
        "start": 36320,
        "end": 5955,
        "content": "school in a big car.",
        "words": generateWordTokens("school in a big car."),
        "contentVi": "trường học trên một chiếc ô tô lớn."
      },
      {
        "index": 10,
        "start": 38399,
        "end": 5479,
        "content": "A car? Fancy. Sounds like a movie star.",
        "words": generateWordTokens("A car? Fancy. Sounds like a movie star."),
        "contentVi": "Một chiếc ô tô? Si mê. Nghe như một ngôi sao điện ảnh."
      },
      {
        "index": 11,
        "start": 42239,
        "end": 5483,
        "content": "You talk to him?",
        "words": generateWordTokens("You talk to him?"),
        "contentVi": "Bạn nói chuyện với anh ấy?"
      },
      {
        "index": 12,
        "start": 43840,
        "end": 6684,
        "content": "No way. I'm shy. And many girls in class",
        "words": generateWordTokens("No way. I'm shy. And many girls in class"),
        "contentVi": "Không đời nào. Tôi xấu hổ. Và nhiều cô gái trong lớp"
      },
      {
        "index": 13,
        "start": 47680,
        "end": 4048,
        "content": "like him, too. Even my best friend,",
        "words": generateWordTokens("like him, too. Even my best friend,"),
        "contentVi": "cũng giống anh ấy. Ngay cả người bạn thân nhất của tôi,"
      },
      {
        "index": 14,
        "start": 50480,
        "end": 3969,
        "content": "Jenny.",
        "words": generateWordTokens("Jenny."),
        "contentVi": "Jenny."
      },
      {
        "index": 15,
        "start": 51680,
        "end": 5411,
        "content": "Your best friend likes him? Oh, no.",
        "words": generateWordTokens("Your best friend likes him? Oh, no."),
        "contentVi": "Bạn thân nhất của bạn thích anh ấy? Ồ, không."
      },
      {
        "index": 16,
        "start": 54399,
        "end": 3894,
        "content": "That's sad. Does Jenny know you like",
        "words": generateWordTokens("That's sad. Does Jenny know you like"),
        "contentVi": "Điều đó thật đáng buồn. Jenny có biết bạn thích không"
      },
      {
        "index": 17,
        "start": 57039,
        "end": 4618,
        "content": "Jerry?",
        "words": generateWordTokens("Jerry?"),
        "contentVi": "Jerry?"
      },
      {
        "index": 18,
        "start": 58239,
        "end": 6219,
        "content": "No, I don't tell her. I'm scared. What",
        "words": generateWordTokens("No, I don't tell her. I'm scared. What"),
        "contentVi": "Không, tôi không nói với cô ấy. Tôi sợ. Cái gì"
      },
      {
        "index": 19,
        "start": 61600,
        "end": 4941,
        "content": "if she stops being my friend? She's",
        "words": generateWordTokens("if she stops being my friend? She's"),
        "contentVi": "nếu cô ấy ngừng làm bạn tôi? cô ấy"
      },
      {
        "index": 20,
        "start": 64400,
        "end": 5584,
        "content": "prettier than me.",
        "words": generateWordTokens("prettier than me."),
        "contentVi": "xinh hơn tôi."
      },
      {
        "index": 21,
        "start": 66479,
        "end": 6066,
        "content": "Prettier? Come on, Anna. You're awesome.",
        "words": generateWordTokens("Prettier? Come on, Anna. You're awesome."),
        "contentVi": "Đẹp hơn? Thôi nào, Anna. Bạn thật tuyệt vời."
      },
      {
        "index": 22,
        "start": 69920,
        "end": 3830,
        "content": "You're nice and fun. Jerry will like",
        "words": generateWordTokens("You're nice and fun. Jerry will like"),
        "contentVi": "Bạn thật tử tế và vui vẻ. Jerry sẽ thích"
      },
      {
        "index": 23,
        "start": 72479,
        "end": 4873,
        "content": "you.",
        "words": generateWordTokens("you."),
        "contentVi": "Bạn."
      },
      {
        "index": 24,
        "start": 73680,
        "end": 7914,
        "content": "Really? But Jenny is so confident. She",
        "words": generateWordTokens("Really? But Jenny is so confident. She"),
        "contentVi": "Thật sự? Nhưng Jenny rất tự tin. Cô ấy"
      },
      {
        "index": 25,
        "start": 77280,
        "end": 7117,
        "content": "talks to him all the time. I just watch.",
        "words": generateWordTokens("talks to him all the time. I just watch."),
        "contentVi": "nói chuyện với anh ấy mọi lúc. Tôi chỉ quan sát."
      },
      {
        "index": 26,
        "start": 81520,
        "end": 6242,
        "content": "H Don't be sad. You should talk to",
        "words": generateWordTokens("H Don't be sad. You should talk to"),
        "contentVi": "H Đừng buồn. Bạn nên nói chuyện với"
      },
      {
        "index": 27,
        "start": 84320,
        "end": 4563,
        "content": "Jerry. Say hi. Smile. Maybe he likes you",
        "words": generateWordTokens("Jerry. Say hi. Smile. Maybe he likes you"),
        "contentVi": "Jerry. Chào đi. Nụ cười. Có lẽ anh ấy thích bạn"
      },
      {
        "index": 28,
        "start": 87680,
        "end": 4487,
        "content": "back.",
        "words": generateWordTokens("back."),
        "contentVi": "mặt sau."
      },
      {
        "index": 29,
        "start": 88799,
        "end": 5369,
        "content": "But what if Jenny gets mad? I don't want",
        "words": generateWordTokens("But what if Jenny gets mad? I don't want"),
        "contentVi": "Nhưng nếu Jenny nổi giận thì sao? tôi không muốn"
      },
      {
        "index": 30,
        "start": 92079,
        "end": 5693,
        "content": "to lose my friend.",
        "words": generateWordTokens("to lose my friend."),
        "contentVi": "mất đi người bạn của tôi."
      },
      {
        "index": 31,
        "start": 94079,
        "end": 6335,
        "content": "True. Friends are important. Maybe tell",
        "words": generateWordTokens("True. Friends are important. Maybe tell"),
        "contentVi": "ĐÚNG VẬY. Bạn bè rất quan trọng. Có lẽ nói"
      },
      {
        "index": 32,
        "start": 97680,
        "end": 4497,
        "content": "Jenny you like Jerry. Be honest. Good",
        "words": generateWordTokens("Jenny you like Jerry. Be honest. Good"),
        "contentVi": "Jenny bạn thích Jerry. Hãy trung thực. Tốt"
      },
      {
        "index": 33,
        "start": 100320,
        "end": 6100,
        "content": "friends understand.",
        "words": generateWordTokens("friends understand."),
        "contentVi": "bạn bè hiểu."
      },
      {
        "index": 34,
        "start": 102079,
        "end": 5782,
        "content": "You think so? Okay, maybe I try. But I'm",
        "words": generateWordTokens("You think so? Okay, maybe I try. But I'm"),
        "contentVi": "Bạn nghĩ vậy à? Được rồi, có lẽ tôi sẽ thử. Nhưng tôi"
      },
      {
        "index": 35,
        "start": 106320,
        "end": 4506,
        "content": "still scared.",
        "words": generateWordTokens("still scared."),
        "contentVi": "vẫn còn sợ hãi."
      },
      {
        "index": 36,
        "start": 107759,
        "end": 5468,
        "content": "Don't worry, Anna. You're cool. Here's a",
        "words": generateWordTokens("Don't worry, Anna. You're cool. Here's a"),
        "contentVi": "Đừng lo lắng, Anna. Bạn thật tuyệt. Đây là một"
      },
      {
        "index": 37,
        "start": 110720,
        "end": 4431,
        "content": "plan. Ask Jerry to study together.",
        "words": generateWordTokens("plan. Ask Jerry to study together."),
        "contentVi": "kế hoạch. Mời Jerry cùng học."
      },
      {
        "index": 38,
        "start": 113119,
        "end": 6514,
        "content": "You're good at studying, right?",
        "words": generateWordTokens("You're good at studying, right?"),
        "contentVi": "Bạn học giỏi lắm phải không?"
      },
      {
        "index": 39,
        "start": 115040,
        "end": 7395,
        "content": "study me. I sleep in class sometimes.",
        "words": generateWordTokens("study me. I sleep in class sometimes."),
        "contentVi": "nghiên cứu tôi. Thỉnh thoảng tôi ngủ trong lớp."
      },
      {
        "index": 40,
        "start": 119520,
        "end": 4999,
        "content": "No problem. Jerry goes with you, then",
        "words": generateWordTokens("No problem. Jerry goes with you, then"),
        "contentVi": "Không có gì. Jerry đi với bạn rồi"
      },
      {
        "index": 41,
        "start": 122320,
        "end": 5402,
        "content": "ask him to watch a movie or go to the",
        "words": generateWordTokens("ask him to watch a movie or go to the"),
        "contentVi": "rủ anh ấy đi xem phim hoặc đi xem phim"
      },
      {
        "index": 42,
        "start": 124399,
        "end": 7565,
        "content": "park. Have fun, talk more.",
        "words": generateWordTokens("park. Have fun, talk more."),
        "contentVi": "công viên. Vui vẻ, nói chuyện nhiều hơn."
      },
      {
        "index": 43,
        "start": 127600,
        "end": 5648,
        "content": "Movie park? Good idea. But what about",
        "words": generateWordTokens("Movie park? Good idea. But what about"),
        "contentVi": "Công viên phim? Ý tưởng hay. Nhưng còn"
      },
      {
        "index": 44,
        "start": 131840,
        "end": 4132,
        "content": "Jenny?",
        "words": generateWordTokens("Jenny?"),
        "contentVi": "Jenny?"
      },
      {
        "index": 45,
        "start": 133120,
        "end": 5413,
        "content": "Jenny? Leave her to me. I'll ask her to",
        "words": generateWordTokens("Jenny? Leave her to me. I'll ask her to"),
        "contentVi": "Jenny? Để cô ấy cho tôi. Tôi sẽ yêu cầu cô ấy"
      },
      {
        "index": 46,
        "start": 135840,
        "end": 4535,
        "content": "eat spicy noodles and drink milk tea.",
        "words": generateWordTokens("eat spicy noodles and drink milk tea."),
        "contentVi": "ăn mỳ cay và uống trà sữa."
      },
      {
        "index": 47,
        "start": 138400,
        "end": 6538,
        "content": "She'll be happy.",
        "words": generateWordTokens("She'll be happy."),
        "contentVi": "Cô ấy sẽ hạnh phúc."
      },
      {
        "index": 48,
        "start": 140239,
        "end": 7021,
        "content": "You and Jenny? Okay. But if Jerry",
        "words": generateWordTokens("You and Jenny? Okay. But if Jerry"),
        "contentVi": "Bạn và Jenny? Được rồi. Nhưng nếu Jerry"
      },
      {
        "index": 49,
        "start": 144800,
        "end": 5105,
        "content": "doesn't like me, I stop being friends",
        "words": generateWordTokens("doesn't like me, I stop being friends"),
        "contentVi": "không thích tôi, tôi ngừng làm bạn"
      },
      {
        "index": 50,
        "start": 147120,
        "end": 5667,
        "content": "with you and I'll be mad at you.",
        "words": generateWordTokens("with you and I'll be mad at you."),
        "contentVi": "với bạn và tôi sẽ giận bạn."
      },
      {
        "index": 51,
        "start": 149760,
        "end": 5190,
        "content": "What? Me? I'm just helping. Jerry will",
        "words": generateWordTokens("What? Me? I'm just helping. Jerry will"),
        "contentVi": "Cái gì? Tôi? Tôi chỉ giúp thôi. Jerry sẽ"
      },
      {
        "index": 52,
        "start": 152640,
        "end": 3273,
        "content": "like you. Let's get milk tea to plan",
        "words": generateWordTokens("like you. Let's get milk tea to plan"),
        "contentVi": "giống bạn. Hãy lên kế hoạch trà sữa nhé"
      },
      {
        "index": 53,
        "start": 154800,
        "end": 5874,
        "content": "this.",
        "words": generateWordTokens("this."),
        "contentVi": "cái này."
      },
      {
        "index": 54,
        "start": 155760,
        "end": 4915,
        "content": "Deal. But you pay, Tom.",
        "words": generateWordTokens("Deal. But you pay, Tom."),
        "contentVi": "Thỏa thuận. Nhưng anh phải trả tiền, Tom."
      }
    ]
  },

  "luyen-nghe-a2-awp_vfnirtw": {
    "title": "Luyện Nghe Tiếng Anh Level A2 - A Shop",
    "audio_url": "AWp_VfnirTw",
    "repeat_offset": 84.64,
    "sentences": [
      {
        "index": 0,
        "start": 11360,
        "end": 5131,
        "content": "Now listen carefully.",
        "words": generateWordTokens("Now listen carefully."),
        "contentVi": "Bây giờ hãy lắng nghe cẩn thận."
      },
      {
        "index": 1,
        "start": 13840,
        "end": 3533,
        "content": "Hey Anna, you like Blackpink? The Korean",
        "words": generateWordTokens("Hey Anna, you like Blackpink? The Korean"),
        "contentVi": "Này Anna, bạn thích Blackpink phải không? người hàn quốc"
      },
      {
        "index": 2,
        "start": 16480,
        "end": 4256,
        "content": "music group?",
        "words": generateWordTokens("music group?"),
        "contentVi": "nhóm nhạc?"
      },
      {
        "index": 3,
        "start": 17359,
        "end": 5697,
        "content": "Yes, I love Blackpink. They're so cool.",
        "words": generateWordTokens("Yes, I love Blackpink. They're so cool."),
        "contentVi": "Vâng, tôi yêu Blackpink. Họ thật tuyệt vời."
      },
      {
        "index": 4,
        "start": 20720,
        "end": 4261,
        "content": "Cool. Really? Their songs are good. I",
        "words": generateWordTokens("Cool. Really? Their songs are good. I"),
        "contentVi": "Mát mẻ. Thật sự? Bài hát của họ rất hay. TÔI"
      },
      {
        "index": 5,
        "start": 23039,
        "end": 5144,
        "content": "hear them everywhere.",
        "words": generateWordTokens("hear them everywhere."),
        "contentVi": "nghe thấy chúng ở khắp mọi nơi."
      },
      {
        "index": 6,
        "start": 24960,
        "end": 5625,
        "content": "Yes, super good. Their music is fun and",
        "words": generateWordTokens("Yes, super good. Their music is fun and"),
        "contentVi": "Vâng, siêu tốt. Âm nhạc của họ rất vui nhộn và"
      },
      {
        "index": 7,
        "start": 28160,
        "end": 3467,
        "content": "they dance great. I hear them in coffee",
        "words": generateWordTokens("they dance great. I hear them in coffee"),
        "contentVi": "họ nhảy rất tuyệt. Tôi nghe thấy chúng trong cà phê"
      },
      {
        "index": 8,
        "start": 30560,
        "end": 3870,
        "content": "shops all the time.",
        "words": generateWordTokens("shops all the time."),
        "contentVi": "cửa hàng mọi lúc."
      },
      {
        "index": 9,
        "start": 31599,
        "end": 4593,
        "content": "Haha, coffee shops. Okay. Who's your",
        "words": generateWordTokens("Haha, coffee shops. Okay. Who's your"),
        "contentVi": "Haha, quán cà phê. Được rồi. của bạn là ai"
      },
      {
        "index": 10,
        "start": 34399,
        "end": 5075,
        "content": "favorite in Blackpink?",
        "words": generateWordTokens("favorite in Blackpink?"),
        "contentVi": "yêu thích trong Blackpink?"
      },
      {
        "index": 11,
        "start": 36160,
        "end": 5556,
        "content": "I like Ros\u00e9 best. She sings so nice.",
        "words": generateWordTokens("I like Ros\u00e9 best. She sings so nice."),
        "contentVi": "Tôi thích Rosé nhất. Cô ấy hát hay quá"
      },
      {
        "index": 12,
        "start": 39440,
        "end": 5158,
        "content": "Ros, why her? She's special.",
        "words": generateWordTokens("Ros, why her? She's special."),
        "contentVi": "Ros, tại sao lại là cô ấy? Cô ấy thật đặc biệt."
      },
      {
        "index": 13,
        "start": 41680,
        "end": 3562,
        "content": "Yes, she has a song AP.",
        "words": generateWordTokens("Yes, she has a song AP."),
        "contentVi": "Vâng, cô ấy có một bài hát AP."
      },
      {
        "index": 14,
        "start": 44559,
        "end": 4045,
        "content": "Oh, yes.",
        "words": generateWordTokens("Oh, yes."),
        "contentVi": "Ồ, vâng."
      },
      {
        "index": 15,
        "start": 45200,
        "end": 4125,
        "content": "It's with Bruno Mars. So famous. Super",
        "words": generateWordTokens("It's with Bruno Mars. So famous. Super"),
        "contentVi": "Đó là với Bruno Mars. Quá nổi tiếng. siêu"
      },
      {
        "index": 16,
        "start": 48559,
        "end": 3729,
        "content": "catchy.",
        "words": generateWordTokens("catchy."),
        "contentVi": "hấp dẫn."
      },
      {
        "index": 17,
        "start": 49280,
        "end": 3729,
        "content": "Bruno Mars. Wow. Big name. Is AP really",
        "words": generateWordTokens("Bruno Mars. Wow. Big name. Is AP really"),
        "contentVi": "Bruno Mars. Ồ. Tên lớn. AP thực sự là"
      },
      {
        "index": 18,
        "start": 52239,
        "end": 3813,
        "content": "that good?",
        "words": generateWordTokens("that good?"),
        "contentVi": "tốt thế à?"
      },
      {
        "index": 19,
        "start": 52960,
        "end": 3812,
        "content": "Oh, yes. I play it when I study or work.",
        "words": generateWordTokens("Oh, yes. I play it when I study or work."),
        "contentVi": "Ồ, vâng. Tôi chơi nó khi tôi học tập hoặc làm việc."
      },
      {
        "index": 20,
        "start": 56000,
        "end": 2775,
        "content": "Makes me happy.",
        "words": generateWordTokens("Makes me happy."),
        "contentVi": "Làm cho tôi hạnh phúc."
      },
      {
        "index": 21,
        "start": 56719,
        "end": 3338,
        "content": "Nice. Blackpink is super famous, right?",
        "words": generateWordTokens("Nice. Blackpink is super famous, right?"),
        "contentVi": "Đẹp. Blackpink siêu nổi tiếng phải không?"
      },
      {
        "index": 22,
        "start": 58719,
        "end": 3899,
        "content": "They perform all over the world.",
        "words": generateWordTokens("They perform all over the world."),
        "contentVi": "Họ biểu diễn trên khắp thế giới."
      },
      {
        "index": 23,
        "start": 60000,
        "end": 5100,
        "content": "Yes, they go everywhere. Last year, they",
        "words": generateWordTokens("Yes, they go everywhere. Last year, they"),
        "contentVi": "Vâng, họ đi khắp mọi nơi. Năm ngoái, họ"
      },
      {
        "index": 24,
        "start": 62559,
        "end": 5184,
        "content": "had a concert in Vietnam. So cool.",
        "words": generateWordTokens("had a concert in Vietnam. So cool."),
        "contentVi": "đã có buổi hòa nhạc ở Việt Nam. Thật tuyệt."
      },
      {
        "index": 25,
        "start": 65040,
        "end": 3665,
        "content": "Vietnam. Wow. I heard Ji Su had a fan",
        "words": generateWordTokens("Vietnam. Wow. I heard Ji Su had a fan"),
        "contentVi": "Việt Nam. Ồ. Tôi nghe nói Ji Su có một người hâm mộ"
      },
      {
        "index": 26,
        "start": 67680,
        "end": 3507,
        "content": "meeting here, too.",
        "words": generateWordTokens("meeting here, too."),
        "contentVi": "cũng họp ở đây."
      },
      {
        "index": 27,
        "start": 68640,
        "end": 5669,
        "content": "Yeah, Ji Su's fan meeting was at a big",
        "words": generateWordTokens("Yeah, Ji Su's fan meeting was at a big"),
        "contentVi": "Vâng, buổi fanmeeting của Ji Su rất hoành tráng"
      },
      {
        "index": 28,
        "start": 71119,
        "end": 3751,
        "content": "stadium. She wore a Vietnamese hat. So",
        "words": generateWordTokens("stadium. She wore a Vietnamese hat. So"),
        "contentVi": "sân vận động. Cô đội chiếc mũ Việt Nam. Vì thế"
      },
      {
        "index": 29,
        "start": 74240,
        "end": 2633,
        "content": "cute.",
        "words": generateWordTokens("cute."),
        "contentVi": "dễ thương."
      },
      {
        "index": 30,
        "start": 74799,
        "end": 2316,
        "content": "Awesome. Their concerts make big money,",
        "words": generateWordTokens("Awesome. Their concerts make big money,"),
        "contentVi": "Tuyệt vời. Buổi hòa nhạc của họ kiếm được rất nhiều tiền,"
      },
      {
        "index": 31,
        "start": 76799,
        "end": 3278,
        "content": "right?",
        "words": generateWordTokens("right?"),
        "contentVi": "Phải?"
      },
      {
        "index": 32,
        "start": 77040,
        "end": 4397,
        "content": "Oh, yes. One show. They earn millions.",
        "words": generateWordTokens("Oh, yes. One show. They earn millions."),
        "contentVi": "Ồ, vâng. Một chương trình. Họ kiếm được hàng triệu."
      },
      {
        "index": 33,
        "start": 80000,
        "end": 3680,
        "content": "They're superstars.",
        "words": generateWordTokens("They're superstars."),
        "contentVi": "Họ là những siêu sao."
      },
      {
        "index": 34,
        "start": 81360,
        "end": 3520,
        "content": "Millions. Crazy. I want to see their",
        "words": generateWordTokens("Millions. Crazy. I want to see their"),
        "contentVi": "Hàng triệu. Điên. Tôi muốn nhìn thấy họ"
      },
      {
        "index": 35,
        "start": 83600,
        "end": 4243,
        "content": "concert live one day.",
        "words": generateWordTokens("concert live one day."),
        "contentVi": "buổi hòa nhạc trực tiếp một ngày."
      },
      {
        "index": 36,
        "start": 84799,
        "end": 4486,
        "content": "Me, too, Tom. Imagine us at their show",
        "words": generateWordTokens("Me, too, Tom. Imagine us at their show"),
        "contentVi": "Tôi cũng vậy, Tom. Hãy tưởng tượng chúng tôi tại buổi trình diễn của họ"
      },
      {
        "index": 37,
        "start": 87759,
        "end": 3529,
        "content": "dancing to AP.",
        "words": generateWordTokens("dancing to AP."),
        "contentVi": "nhảy theo AP."
      },
      {
        "index": 38,
        "start": 89200,
        "end": 2489,
        "content": "Haha. Deal. But if I dance, don't laugh.",
        "words": generateWordTokens("Haha. Deal. But if I dance, don't laugh."),
        "contentVi": "Haha. Thỏa thuận. Nhưng nếu tôi nhảy, đừng cười."
      },
      {
        "index": 39,
        "start": 91200,
        "end": 5491,
        "content": "Okay.",
        "words": generateWordTokens("Okay."),
        "contentVi": "Được rồi."
      },
      {
        "index": 40,
        "start": 91600,
        "end": 5092,
        "content": "Okay. But we grab coffee after. Deal.",
        "words": generateWordTokens("Okay. But we grab coffee after. Deal."),
        "contentVi": "Được rồi. Nhưng chúng tôi lấy cà phê sau. Thỏa thuận."
      }
    ]
  },

  "luyen-nghe-a2-70t4n1njqqe": {
    "title": "Luyện Nghe Tiếng Anh Level A2 - A Bus",
    "audio_url": "70t4n1nJQQE",
    "repeat_offset": 195.68,
    "sentences": [
      {
        "index": 0,
        "start": 11840,
        "end": 5772,
        "content": "breakfast in Vietnam. Many people,",
        "words": generateWordTokens("breakfast in Vietnam. Many people,"),
        "contentVi": "bữa sáng ở Việt Nam. Nhiều người,"
      },
      {
        "index": 1,
        "start": 14719,
        "end": 5136,
        "content": "especially young people, skip breakfast,",
        "words": generateWordTokens("especially young people, skip breakfast,"),
        "contentVi": "đặc biệt là giới trẻ, bỏ bữa sáng,"
      },
      {
        "index": 2,
        "start": 17600,
        "end": 5138,
        "content": "but others love it and eat every",
        "words": generateWordTokens("but others love it and eat every"),
        "contentVi": "nhưng những người khác lại thích nó và ăn mọi thứ"
      },
      {
        "index": 3,
        "start": 19840,
        "end": 5780,
        "content": "morning. Let me share a story about my",
        "words": generateWordTokens("morning. Let me share a story about my"),
        "contentVi": "buổi sáng. Hãy để tôi chia sẻ một câu chuyện về tôi"
      },
      {
        "index": 4,
        "start": 22720,
        "end": 6342,
        "content": "friend Tom and how breakfast fits into",
        "words": generateWordTokens("friend Tom and how breakfast fits into"),
        "contentVi": "bạn Tom và bữa sáng phù hợp như thế nào"
      },
      {
        "index": 5,
        "start": 25600,
        "end": 6665,
        "content": "life in Vietnam. Tom is 20 and studies",
        "words": generateWordTokens("life in Vietnam. Tom is 20 and studies"),
        "contentVi": "cuộc sống ở Việt Nam. Tom 20 tuổi và đang học"
      },
      {
        "index": 6,
        "start": 29039,
        "end": 5790,
        "content": "at a university in Hanoi. He often skips",
        "words": generateWordTokens("at a university in Hanoi. He often skips"),
        "contentVi": "tại một trường đại học ở Hà Nội. Anh ấy thường bỏ qua"
      },
      {
        "index": 7,
        "start": 32239,
        "end": 5793,
        "content": "breakfast. He wakes up late, sometimes",
        "words": generateWordTokens("breakfast. He wakes up late, sometimes"),
        "contentVi": "bữa sáng. Đôi khi anh ấy thức dậy muộn"
      },
      {
        "index": 8,
        "start": 34800,
        "end": 6114,
        "content": "at noon, and eats lunch instead. Tom",
        "words": generateWordTokens("at noon, and eats lunch instead. Tom"),
        "contentVi": "vào buổi trưa và thay vào đó ăn bữa trưa. tom"
      },
      {
        "index": 9,
        "start": 38000,
        "end": 5958,
        "content": "says, \"Breakfast costs money. I save it",
        "words": generateWordTokens("says, \"Breakfast costs money. I save it"),
        "contentVi": "nói, \"Bữa sáng tốn tiền. Tôi tiết kiệm nó"
      },
      {
        "index": 10,
        "start": 40879,
        "end": 6682,
        "content": "for games or gifts for my girlfriend.\"",
        "words": generateWordTokens("for games or gifts for my girlfriend.\""),
        "contentVi": "để chơi game hoặc tặng quà cho bạn gái của tôi.\""
      },
      {
        "index": 11,
        "start": 43920,
        "end": 6203,
        "content": "Many Gen Z in Vietnam do this. They",
        "words": generateWordTokens("Many Gen Z in Vietnam do this. They"),
        "contentVi": "Nhiều Gen Z ở Việt Nam làm điều này. Họ"
      },
      {
        "index": 12,
        "start": 47520,
        "end": 5247,
        "content": "sleep late, skip breakfast, and use the",
        "words": generateWordTokens("sleep late, skip breakfast, and use the"),
        "contentVi": "ngủ muộn, bỏ bữa sáng và sử dụng"
      },
      {
        "index": 13,
        "start": 50079,
        "end": 6210,
        "content": "money for other things like clothes or",
        "words": generateWordTokens("money for other things like clothes or"),
        "contentVi": "tiền cho những thứ khác như quần áo hoặc"
      },
      {
        "index": 14,
        "start": 52719,
        "end": 6053,
        "content": "phone apps. Students like Tom are busy.",
        "words": generateWordTokens("phone apps. Students like Tom are busy."),
        "contentVi": "ứng dụng điện thoại. Những sinh viên như Tom rất bận rộn."
      },
      {
        "index": 15,
        "start": 56239,
        "end": 5577,
        "content": "They stay up late to study or play games",
        "words": generateWordTokens("They stay up late to study or play games"),
        "contentVi": "Họ thức khuya để học tập hoặc chơi game"
      },
      {
        "index": 16,
        "start": 58719,
        "end": 5499,
        "content": "like Linkun. In the morning, they don't",
        "words": generateWordTokens("like Linkun. In the morning, they don't"),
        "contentVi": "như Linkun. Vào buổi sáng, họ không"
      },
      {
        "index": 17,
        "start": 61760,
        "end": 5662,
        "content": "have time to eat. Some spend their",
        "words": generateWordTokens("have time to eat. Some spend their"),
        "contentVi": "có thời gian để ăn. Một số dành"
      },
      {
        "index": 18,
        "start": 64159,
        "end": 5665,
        "content": "breakfast money on snacks or milk tea.",
        "words": generateWordTokens("breakfast money on snacks or milk tea."),
        "contentVi": "tiền ăn sáng cho đồ ăn nhẹ hoặc trà sữa."
      },
      {
        "index": 19,
        "start": 67360,
        "end": 5907,
        "content": "Tom's friend bought a new phone case",
        "words": generateWordTokens("Tom's friend bought a new phone case"),
        "contentVi": "Bạn của Tom mua một chiếc ốp điện thoại mới"
      },
      {
        "index": 20,
        "start": 69760,
        "end": 6310,
        "content": "instead of eating fur. In Vietnam, young",
        "words": generateWordTokens("instead of eating fur. In Vietnam, young"),
        "contentVi": "thay vì ăn lông thú. Ở Việt Nam, giới trẻ"
      },
      {
        "index": 21,
        "start": 73200,
        "end": 5593,
        "content": "people think breakfast is not important.",
        "words": generateWordTokens("people think breakfast is not important."),
        "contentVi": "mọi người nghĩ bữa sáng không quan trọng"
      },
      {
        "index": 22,
        "start": 76000,
        "end": 5515,
        "content": "They want to save money for fun. But",
        "words": generateWordTokens("They want to save money for fun. But"),
        "contentVi": "Họ muốn tiết kiệm tiền để giải trí. Nhưng"
      },
      {
        "index": 23,
        "start": 78720,
        "end": 5759,
        "content": "skipping breakfast has problems. Tom",
        "words": generateWordTokens("skipping breakfast has problems. Tom"),
        "contentVi": "bỏ bữa sáng có vấn đề. tom"
      },
      {
        "index": 24,
        "start": 81439,
        "end": 6002,
        "content": "feels tired in class. He can't focus",
        "words": generateWordTokens("feels tired in class. He can't focus"),
        "contentVi": "cảm thấy mệt mỏi trong giờ học. Anh ấy không thể tập trung"
      },
      {
        "index": 25,
        "start": 84400,
        "end": 6163,
        "content": "because he's hungry. Many students get",
        "words": generateWordTokens("because he's hungry. Many students get"),
        "contentVi": "bởi vì anh ấy đói. Nhiều học sinh nhận được"
      },
      {
        "index": 26,
        "start": 87360,
        "end": 6087,
        "content": "sick or feel weak without breakfast. A",
        "words": generateWordTokens("sick or feel weak without breakfast. A"),
        "contentVi": "ốm hoặc cảm thấy yếu khi không ăn sáng. MỘT"
      },
      {
        "index": 27,
        "start": 90479,
        "end": 5770,
        "content": "doctor on TV said breakfast gives energy",
        "words": generateWordTokens("doctor on TV said breakfast gives energy"),
        "contentVi": "bác sĩ trên TV nói bữa sáng mang lại năng lượng"
      },
      {
        "index": 28,
        "start": 93360,
        "end": 5773,
        "content": "for the day. Without it, young people",
        "words": generateWordTokens("for the day. Without it, young people"),
        "contentVi": "trong ngày. Không có nó, giới trẻ"
      },
      {
        "index": 29,
        "start": 96159,
        "end": 6337,
        "content": "lose strength. Not everyone skips",
        "words": generateWordTokens("lose strength. Not everyone skips"),
        "contentVi": "mất sức. Không phải ai cũng bỏ qua"
      },
      {
        "index": 30,
        "start": 99040,
        "end": 6259,
        "content": "breakfast. Tom's cousin Anna eats every",
        "words": generateWordTokens("breakfast. Tom's cousin Anna eats every"),
        "contentVi": "bữa sáng. Em họ của Tom là Anna ăn mọi thứ"
      },
      {
        "index": 31,
        "start": 102400,
        "end": 5942,
        "content": "morning. She wakes up at 6:00 a.m. and",
        "words": generateWordTokens("morning. She wakes up at 6:00 a.m. and"),
        "contentVi": "buổi sáng. Cô ấy thức dậy lúc 6 giờ sáng và"
      },
      {
        "index": 32,
        "start": 105200,
        "end": 6585,
        "content": "runs in a park. After she eats a big",
        "words": generateWordTokens("runs in a park. After she eats a big"),
        "contentVi": "chạy trong công viên. Sau khi cô ấy ăn một miếng lớn"
      },
      {
        "index": 33,
        "start": 108240,
        "end": 6667,
        "content": "breakfast like benmi with egg or soy",
        "words": generateWordTokens("breakfast like benmi with egg or soy"),
        "contentVi": "bữa sáng như bemi với trứng hoặc đậu nành"
      },
      {
        "index": 34,
        "start": 111680,
        "end": 6831,
        "content": "sticky rice. Anna says, \"Eating",
        "words": generateWordTokens("sticky rice. Anna says, \"Eating"),
        "contentVi": "gạo nếp. Anna nói: \"Ăn"
      },
      {
        "index": 35,
        "start": 114799,
        "end": 6115,
        "content": "breakfast makes me strong and happy.\"",
        "words": generateWordTokens("breakfast makes me strong and happy.\""),
        "contentVi": "bữa sáng khiến tôi khỏe mạnh và hạnh phúc.\""
      },
      {
        "index": 36,
        "start": 118399,
        "end": 5798,
        "content": "Many people in Vietnam do this. They",
        "words": generateWordTokens("Many people in Vietnam do this. They"),
        "contentVi": "Nhiều người ở Việt Nam làm điều này. Họ"
      },
      {
        "index": 37,
        "start": 120799,
        "end": 5801,
        "content": "wake up early, exercise, and eat well.",
        "words": generateWordTokens("wake up early, exercise, and eat well."),
        "contentVi": "dậy sớm, tập thể dục và ăn uống đầy đủ."
      },
      {
        "index": 38,
        "start": 124079,
        "end": 6125,
        "content": "Some go to street stalls for hot noodle",
        "words": generateWordTokens("Some go to street stalls for hot noodle"),
        "contentVi": "Một số đi đến các quán ăn ven đường để mua mì nóng"
      },
      {
        "index": 39,
        "start": 126479,
        "end": 6847,
        "content": "soup or bread. In Hanoi and Ho Chi Min",
        "words": generateWordTokens("soup or bread. In Hanoi and Ho Chi Min"),
        "contentVi": "súp hoặc bánh mì. Tại Hà Nội và Hồ Chí Minh"
      },
      {
        "index": 40,
        "start": 130080,
        "end": 6770,
        "content": "City, breakfast is cheap and tasty. You",
        "words": generateWordTokens("City, breakfast is cheap and tasty. You"),
        "contentVi": "Thành phố, bữa sáng rẻ và ngon. Bạn"
      },
      {
        "index": 41,
        "start": 133200,
        "end": 6613,
        "content": "can buy fur for 30,000 VND or a Benme",
        "words": generateWordTokens("can buy fur for 30,000 VND or a Benme"),
        "contentVi": "có thể mua lông thú với giá 30.000đ hoặc một con Benme"
      },
      {
        "index": 42,
        "start": 136720,
        "end": 5817,
        "content": "for less. Older people like Tom's",
        "words": generateWordTokens("for less. Older people like Tom's"),
        "contentVi": "ít hơn. Những người lớn tuổi như Tom"
      },
      {
        "index": 43,
        "start": 139680,
        "end": 6059,
        "content": "parents never skip breakfast. They sit",
        "words": generateWordTokens("parents never skip breakfast. They sit"),
        "contentVi": "bố mẹ không bao giờ bỏ bữa sáng. Họ ngồi"
      },
      {
        "index": 44,
        "start": 142400,
        "end": 6142,
        "content": "at small stalls, drink coffee, and eat.",
        "words": generateWordTokens("at small stalls, drink coffee, and eat."),
        "contentVi": "ở những quán nhỏ, uống cà phê và ăn uống."
      },
      {
        "index": 45,
        "start": 145599,
        "end": 5506,
        "content": "They talk about life. For them,",
        "words": generateWordTokens("They talk about life. For them,"),
        "contentVi": "Họ nói về cuộc sống. Đối với họ,"
      },
      {
        "index": 46,
        "start": 148400,
        "end": 6948,
        "content": "breakfast is a time to relax and feel",
        "words": generateWordTokens("breakfast is a time to relax and feel"),
        "contentVi": "bữa sáng là thời gian để thư giãn và cảm nhận"
      },
      {
        "index": 47,
        "start": 150959,
        "end": 6632,
        "content": "good. Tom tried to change. One day, Anna",
        "words": generateWordTokens("good. Tom tried to change. One day, Anna"),
        "contentVi": "Tốt. Tom đã cố gắng thay đổi. Một ngày nọ, Anna"
      },
      {
        "index": 48,
        "start": 155200,
        "end": 5675,
        "content": "invited him to eat breakfast. They went",
        "words": generateWordTokens("invited him to eat breakfast. They went"),
        "contentVi": "mời anh ăn sáng. Họ đã đi"
      },
      {
        "index": 49,
        "start": 157440,
        "end": 6877,
        "content": "to a stall near school. Tom ate buncha",
        "words": generateWordTokens("to a stall near school. Tom ate buncha"),
        "contentVi": "đến một quán gần trường. Tom ăn bó"
      },
      {
        "index": 50,
        "start": 160720,
        "end": 6801,
        "content": "and drank tadada. iced tea. He felt",
        "words": generateWordTokens("and drank tadada. iced tea. He felt"),
        "contentVi": "và uống tadada. trà đá. Anh ấy cảm thấy"
      },
      {
        "index": 51,
        "start": 164160,
        "end": 6484,
        "content": "happy and full of energy. He said maybe",
        "words": generateWordTokens("happy and full of energy. He said maybe"),
        "contentVi": "hạnh phúc và tràn đầy năng lượng. Anh ấy nói có lẽ"
      },
      {
        "index": 52,
        "start": 167360,
        "end": 5766,
        "content": "breakfast is good. Now he tries to eat",
        "words": generateWordTokens("breakfast is good. Now he tries to eat"),
        "contentVi": "bữa sáng rất ngon. Bây giờ anh ấy đang cố gắng ăn"
      },
      {
        "index": 53,
        "start": 170480,
        "end": 6250,
        "content": "more often, even if it's just a small",
        "words": generateWordTokens("more often, even if it's just a small"),
        "contentVi": "thường xuyên hơn, ngay cả khi nó chỉ là một phần nhỏ"
      },
      {
        "index": 54,
        "start": 172959,
        "end": 6334,
        "content": "meal. Breakfast in Vietnam is special.",
        "words": generateWordTokens("meal. Breakfast in Vietnam is special."),
        "contentVi": "bữa ăn. Bữa sáng ở Việt Nam thật đặc biệt."
      },
      {
        "index": 55,
        "start": 176560,
        "end": 4576,
        "content": "For some, it's not important, but for",
        "words": generateWordTokens("For some, it's not important, but for"),
        "contentVi": "Đối với một số người, điều đó không quan trọng, nhưng đối với"
      },
      {
        "index": 56,
        "start": 179120,
        "end": 4899,
        "content": "others, it's a way to start the day",
        "words": generateWordTokens("others, it's a way to start the day"),
        "contentVi": "những người khác, đó là một cách để bắt đầu một ngày"
      },
      {
        "index": 57,
        "start": 180959,
        "end": 5702,
        "content": "right. Tom's story shows that breakfast",
        "words": generateWordTokens("right. Tom's story shows that breakfast"),
        "contentVi": "Phải. Câu chuyện của Tom cho thấy bữa sáng"
      },
      {
        "index": 58,
        "start": 183840,
        "end": 5784,
        "content": "can change how you feel. Do you eat",
        "words": generateWordTokens("can change how you feel. Do you eat"),
        "contentVi": "có thể thay đổi cảm giác của bạn. bạn có ăn không"
      },
      {
        "index": 59,
        "start": 186480,
        "end": 5066,
        "content": "breakfast? What's your favorite food?",
        "words": generateWordTokens("breakfast? What's your favorite food?"),
        "contentVi": "bữa sáng? Món ăn yêu thích của bạn là gì?"
      },
      {
        "index": 60,
        "start": 189440,
        "end": 4509,
        "content": "Don't forget to subscribe to our channel",
        "words": generateWordTokens("Don't forget to subscribe to our channel"),
        "contentVi": "Đừng quên đăng ký kênh của chúng tôi"
      },
      {
        "index": 61,
        "start": 191360,
        "end": 7031,
        "content": "for more A2 English listening practice",
        "words": generateWordTokens("for more A2 English listening practice"),
        "contentVi": "để biết thêm luyện nghe tiếng Anh A2"
      },
      {
        "index": 62,
        "start": 193760,
        "end": 4634,
        "content": "videos. See you next time.",
        "words": generateWordTokens("videos. See you next time."),
        "contentVi": "video. Hẹn gặp lại lần sau."
      },
      {
        "index": 63,
        "start": 200159,
        "end": 5721,
        "content": "Hello everyone. Welcome to this A2",
        "words": generateWordTokens("Hello everyone. Welcome to this A2"),
        "contentVi": "Xin chào tất cả mọi người. Chào mừng đến với A2 này"
      },
      {
        "index": 64,
        "start": 202879,
        "end": 4764,
        "content": "English listening practice video. Today",
        "words": generateWordTokens("English listening practice video. Today"),
        "contentVi": "Video luyện nghe tiếng Anh. Hôm nay"
      },
      {
        "index": 65,
        "start": 205680,
        "end": 4926,
        "content": "I want to tell you a story about",
        "words": generateWordTokens("I want to tell you a story about"),
        "contentVi": "Tôi muốn kể cho bạn nghe một câu chuyện về"
      }
    ]
  },

  "luyen-nghe-a2-w1x7zvrm07o": {
    "title": "Luyện Nghe Tiếng Anh Level A2 - A Car",
    "audio_url": "w1x7ZvrM07o",
    "repeat_offset": 283.2,
    "sentences": [
      {
        "index": 0,
        "start": 12160,
        "end": 6172,
        "content": "in Vietnam. Coffee is a big part of life",
        "words": generateWordTokens("in Vietnam. Coffee is a big part of life"),
        "contentVi": "Ở Việt Nam. Cà phê là một phần lớn của cuộc sống"
      },
      {
        "index": 1,
        "start": 15519,
        "end": 4817,
        "content": "here for older people and young people.",
        "words": generateWordTokens("here for older people and young people."),
        "contentVi": "ở đây dành cho người già và người trẻ."
      },
      {
        "index": 2,
        "start": 18320,
        "end": 5298,
        "content": "It's more than a drink. It's about",
        "words": generateWordTokens("It's more than a drink. It's about"),
        "contentVi": "Nó còn hơn cả một thức uống. Đó là về"
      },
      {
        "index": 3,
        "start": 20320,
        "end": 5860,
        "content": "friends, fun, and studying. Let me share",
        "words": generateWordTokens("friends, fun, and studying. Let me share"),
        "contentVi": "bạn bè, vui vẻ và học tập. Hãy để tôi chia sẻ"
      },
      {
        "index": 4,
        "start": 23600,
        "end": 6344,
        "content": "a story about how people enjoy coffee in",
        "words": generateWordTokens("a story about how people enjoy coffee in"),
        "contentVi": "một câu chuyện về cách mọi người thưởng thức cà phê ở"
      },
      {
        "index": 5,
        "start": 26160,
        "end": 6986,
        "content": "Ho Chi Min City and Hanoi. In Vietnam,",
        "words": generateWordTokens("Ho Chi Min City and Hanoi. In Vietnam,"),
        "contentVi": "Hồ Chí Minh và Hà Nội. Ở Việt Nam,"
      },
      {
        "index": 6,
        "start": 29920,
        "end": 5790,
        "content": "coffee is special. Older people love",
        "words": generateWordTokens("coffee is special. Older people love"),
        "contentVi": "cà phê thật đặc biệt. Người lớn tuổi yêu"
      },
      {
        "index": 7,
        "start": 33120,
        "end": 5632,
        "content": "drinking coffee in the morning. My dad,",
        "words": generateWordTokens("drinking coffee in the morning. My dad,"),
        "contentVi": "uống cà phê vào buổi sáng. Bố tôi,"
      },
      {
        "index": 8,
        "start": 35680,
        "end": 5396,
        "content": "who is 50, wakes up early and goes to a",
        "words": generateWordTokens("who is 50, wakes up early and goes to a"),
        "contentVi": "người 50 tuổi, thức dậy sớm và đi đến một"
      },
      {
        "index": 9,
        "start": 38719,
        "end": 5160,
        "content": "small coffee shop. He sits on a tiny",
        "words": generateWordTokens("small coffee shop. He sits on a tiny"),
        "contentVi": "quán cà phê nhỏ. Anh ấy ngồi trên một chiếc ghế nhỏ"
      },
      {
        "index": 10,
        "start": 41040,
        "end": 5400,
        "content": "chair and drinks Finn coffee, black",
        "words": generateWordTokens("chair and drinks Finn coffee, black"),
        "contentVi": "ghế và đồ uống Cà phê Finn, màu đen"
      },
      {
        "index": 11,
        "start": 43840,
        "end": 5564,
        "content": "coffee with a slow drip. He talks with",
        "words": generateWordTokens("coffee with a slow drip. He talks with"),
        "contentVi": "cà phê nhỏ giọt chậm. Anh ấy nói chuyện với"
      },
      {
        "index": 12,
        "start": 46399,
        "end": 5567,
        "content": "friends about work or news. The smell of",
        "words": generateWordTokens("friends about work or news. The smell of"),
        "contentVi": "bạn bè về công việc hoặc tin tức. Mùi của"
      },
      {
        "index": 13,
        "start": 49360,
        "end": 5329,
        "content": "coffee fills the air and the streets are",
        "words": generateWordTokens("coffee fills the air and the streets are"),
        "contentVi": "cà phê lấp đầy không khí và đường phố"
      },
      {
        "index": 14,
        "start": 51920,
        "end": 5011,
        "content": "quiet. Many adults in Vietnam start",
        "words": generateWordTokens("quiet. Many adults in Vietnam start"),
        "contentVi": "im lặng. Nhiều người lớn ở Việt Nam bắt đầu"
      },
      {
        "index": 15,
        "start": 54640,
        "end": 5335,
        "content": "their day like this. It helps them feel",
        "words": generateWordTokens("their day like this. It helps them feel"),
        "contentVi": "ngày của họ như thế này Nó giúp họ cảm thấy"
      },
      {
        "index": 16,
        "start": 56879,
        "end": 5897,
        "content": "calm and ready. Young people love",
        "words": generateWordTokens("calm and ready. Young people love"),
        "contentVi": "bình tĩnh và sẵn sàng. Giới trẻ yêu thích"
      },
      {
        "index": 17,
        "start": 59920,
        "end": 5259,
        "content": "coffee, too, but it's different. My",
        "words": generateWordTokens("coffee, too, but it's different. My"),
        "contentVi": "cà phê cũng vậy, nhưng nó khác. Của tôi"
      },
      {
        "index": 18,
        "start": 62719,
        "end": 4944,
        "content": "friend Anna is 20 and studies at a",
        "words": generateWordTokens("friend Anna is 20 and studies at a"),
        "contentVi": "bạn Anna 20 tuổi và đang học tại một trường"
      },
      {
        "index": 19,
        "start": 65119,
        "end": 4786,
        "content": "university in Ho Chi Min City. She",
        "words": generateWordTokens("university in Ho Chi Min City. She"),
        "contentVi": "đại học ở thành phố Hồ Chí Minh. Cô ấy"
      },
      {
        "index": 20,
        "start": 67600,
        "end": 5108,
        "content": "doesn't wake up early to study. It's",
        "words": generateWordTokens("doesn't wake up early to study. It's"),
        "contentVi": "không thức dậy sớm để học. Của nó"
      },
      {
        "index": 21,
        "start": 69840,
        "end": 5270,
        "content": "hard. But she wakes up at 6:00 a.m. to",
        "words": generateWordTokens("hard. But she wakes up at 6:00 a.m. to"),
        "contentVi": "cứng. Nhưng cô ấy thức dậy lúc 6 giờ sáng để"
      },
      {
        "index": 22,
        "start": 72640,
        "end": 4713,
        "content": "meet friends at a cool cafe near Zing",
        "words": generateWordTokens("meet friends at a cool cafe near Zing"),
        "contentVi": "gặp gỡ bạn bè tại một quán cà phê mát mẻ gần Zing"
      },
      {
        "index": 23,
        "start": 75040,
        "end": 5675,
        "content": "Duck Lap. They don't always drink",
        "words": generateWordTokens("Duck Lap. They don't always drink"),
        "contentVi": "Vịt Lập. Họ không phải lúc nào cũng uống rượu"
      },
      {
        "index": 24,
        "start": 77280,
        "end": 6556,
        "content": "coffee. Anna loves matcha latte. It's",
        "words": generateWordTokens("coffee. Anna loves matcha latte. It's"),
        "contentVi": "cà phê. Anna thích matcha latte. Của nó"
      },
      {
        "index": 25,
        "start": 80640,
        "end": 5121,
        "content": "green, creamy, and her favorite. Young",
        "words": generateWordTokens("green, creamy, and her favorite. Young"),
        "contentVi": "màu xanh lá cây, màu kem, và món ưa thích của cô ấy. Trẻ"
      },
      {
        "index": 26,
        "start": 83759,
        "end": 4405,
        "content": "people in Vietnam go to cafes like",
        "words": generateWordTokens("people in Vietnam go to cafes like"),
        "contentVi": "người dân việt nam đi uống cà phê như thế nào"
      },
      {
        "index": 27,
        "start": 85680,
        "end": 6006,
        "content": "Highlands or the coffee house to hang",
        "words": generateWordTokens("Highlands or the coffee house to hang"),
        "contentVi": "Tây Nguyên hay quán cà phê để treo"
      },
      {
        "index": 28,
        "start": 88080,
        "end": 6328,
        "content": "out or study. At these cafes, young",
        "words": generateWordTokens("out or study. At these cafes, young"),
        "contentVi": "ra ngoài hoặc học tập. Tại những quán cà phê này, giới trẻ"
      },
      {
        "index": 29,
        "start": 91600,
        "end": 4332,
        "content": "people talk, laugh, and work. Anna",
        "words": generateWordTokens("people talk, laugh, and work. Anna"),
        "contentVi": "mọi người nói chuyện, cười đùa và làm việc. Anna"
      },
      {
        "index": 30,
        "start": 94320,
        "end": 4253,
        "content": "brings her books and studies with a",
        "words": generateWordTokens("brings her books and studies with a"),
        "contentVi": "mang sách và nghiên cứu của cô ấy với một"
      },
      {
        "index": 31,
        "start": 95840,
        "end": 5616,
        "content": "matcha latte, one drink, and she stays",
        "words": generateWordTokens("matcha latte, one drink, and she stays"),
        "contentVi": "matcha latte, một ly, và cô ấy ở lại"
      },
      {
        "index": 32,
        "start": 98479,
        "end": 5459,
        "content": "from morning to afternoon. Many students",
        "words": generateWordTokens("from morning to afternoon. Many students"),
        "contentVi": "từ sáng tới chiều. Nhiều sinh viên"
      },
      {
        "index": 33,
        "start": 101360,
        "end": 5220,
        "content": "in Vietnam do this. They sit in cafes",
        "words": generateWordTokens("in Vietnam do this. They sit in cafes"),
        "contentVi": "ở Việt Nam làm điều này. Họ ngồi trong quán cà phê"
      },
      {
        "index": 34,
        "start": 103840,
        "end": 5304,
        "content": "with Wi-Fi, study for exams, or do",
        "words": generateWordTokens("with Wi-Fi, study for exams, or do"),
        "contentVi": "với Wi-Fi, ôn thi hoặc làm"
      },
      {
        "index": 35,
        "start": 106479,
        "end": 5706,
        "content": "homework. Cafes are quiet and",
        "words": generateWordTokens("homework. Cafes are quiet and"),
        "contentVi": "bài tập về nhà. Những quán cà phê yên tĩnh và"
      },
      {
        "index": 36,
        "start": 109040,
        "end": 5148,
        "content": "comfortable, perfect for learning. But",
        "words": generateWordTokens("comfortable, perfect for learning. But"),
        "contentVi": "thoải mái, hoàn hảo cho việc học tập. Nhưng"
      },
      {
        "index": 37,
        "start": 112079,
        "end": 5152,
        "content": "sometimes Anna and her friends gossip",
        "words": generateWordTokens("sometimes Anna and her friends gossip"),
        "contentVi": "đôi khi Anna và bạn bè của cô ấy buôn chuyện"
      },
      {
        "index": 38,
        "start": 114079,
        "end": 6355,
        "content": "about school or friends. Anna says, \"We",
        "words": generateWordTokens("about school or friends. Anna says, \"We"),
        "contentVi": "về trường học hoặc bạn bè. Anna nói: \"Chúng tôi"
      },
      {
        "index": 39,
        "start": 117119,
        "end": 4998,
        "content": "sit, drink matcha latte, and talk about",
        "words": generateWordTokens("sit, drink matcha latte, and talk about"),
        "contentVi": "ngồi, uống matcha latte và nói về"
      },
      {
        "index": 40,
        "start": 120320,
        "end": 4440,
        "content": "everything.\"",
        "words": generateWordTokens("everything.\""),
        "contentVi": "mọi thứ.\""
      },
      {
        "index": 41,
        "start": 122000,
        "end": 4601,
        "content": "Young people also follow Tik Tok trends.",
        "words": generateWordTokens("Young people also follow Tik Tok trends."),
        "contentVi": "Giới trẻ cũng theo trào lưu Tik Tok."
      },
      {
        "index": 42,
        "start": 124640,
        "end": 4685,
        "content": "Last week, Anna and her friends made a",
        "words": generateWordTokens("Last week, Anna and her friends made a"),
        "contentVi": "Tuần trước, Anna và bạn bè của cô ấy đã thực hiện một"
      },
      {
        "index": 43,
        "start": 126479,
        "end": 5327,
        "content": "dance video at a cafe. They laughed and",
        "words": generateWordTokens("dance video at a cafe. They laughed and"),
        "contentVi": "video khiêu vũ ở quán cà phê. Họ cười và"
      },
      {
        "index": 44,
        "start": 129200,
        "end": 5009,
        "content": "posted it online. Many young people do",
        "words": generateWordTokens("posted it online. Many young people do"),
        "contentVi": "đã đăng nó lên mạng. Nhiều bạn trẻ làm"
      },
      {
        "index": 45,
        "start": 131680,
        "end": 6132,
        "content": "this in Vietnam. Cafes are like a second",
        "words": generateWordTokens("this in Vietnam. Cafes are like a second"),
        "contentVi": "này ở Việt Nam. Quán cà phê giống như một giây"
      },
      {
        "index": 46,
        "start": 134080,
        "end": 6933,
        "content": "home, bright, fun, and full of music.",
        "words": generateWordTokens("home, bright, fun, and full of music."),
        "contentVi": "ngôi nhà tươi sáng, vui vẻ và tràn ngập âm nhạc."
      },
      {
        "index": 47,
        "start": 137680,
        "end": 6218,
        "content": "Some stay up all night at cafes talking",
        "words": generateWordTokens("Some stay up all night at cafes talking"),
        "contentVi": "Có người thức cả đêm ở quán cà phê để trò chuyện"
      },
      {
        "index": 48,
        "start": 140879,
        "end": 5182,
        "content": "until midnight. Or they wake up early,",
        "words": generateWordTokens("until midnight. Or they wake up early,"),
        "contentVi": "cho đến nửa đêm. Hoặc họ thức dậy sớm,"
      },
      {
        "index": 49,
        "start": 143760,
        "end": 5104,
        "content": "not to study, but to take photos at",
        "words": generateWordTokens("not to study, but to take photos at"),
        "contentVi": "không phải để học mà là để chụp ảnh"
      },
      {
        "index": 50,
        "start": 145920,
        "end": 5666,
        "content": "cafes with pretty lights. In Hanoi, they",
        "words": generateWordTokens("cafes with pretty lights. In Hanoi, they"),
        "contentVi": "quán cà phê có đèn đẹp. Ở Hà Nội, họ"
      },
      {
        "index": 51,
        "start": 148720,
        "end": 5509,
        "content": "go to cafes by Hankium Lake. In Ho Chi",
        "words": generateWordTokens("go to cafes by Hankium Lake. In Ho Chi"),
        "contentVi": "đi đến quán cà phê bên hồ Hankium. Ở Hồ Chí"
      },
      {
        "index": 52,
        "start": 151440,
        "end": 5511,
        "content": "Min City, they love Guenu Street. They",
        "words": generateWordTokens("Min City, they love Guenu Street. They"),
        "contentVi": "Thành phố Min, họ yêu phố Guenu. Họ"
      },
      {
        "index": 53,
        "start": 154080,
        "end": 6474,
        "content": "take selfies, drink matcha latte, and",
        "words": generateWordTokens("take selfies, drink matcha latte, and"),
        "contentVi": "chụp ảnh tự sướng, uống matcha latte và"
      },
      {
        "index": 54,
        "start": 156800,
        "end": 6477,
        "content": "share stories. Coffee brings benefits.",
        "words": generateWordTokens("share stories. Coffee brings benefits."),
        "contentVi": "chia sẻ những câu chuyện. Cà phê mang lại lợi ích."
      },
      {
        "index": 55,
        "start": 160400,
        "end": 5279,
        "content": "For older people, it's a time to relax.",
        "words": generateWordTokens("For older people, it's a time to relax."),
        "contentVi": "Đối với người lớn tuổi, đó là thời gian để thư giãn."
      },
      {
        "index": 56,
        "start": 163120,
        "end": 5683,
        "content": "For young people, cafes are a place to",
        "words": generateWordTokens("For young people, cafes are a place to"),
        "contentVi": "Đối với giới trẻ, quán cà phê là nơi để"
      },
      {
        "index": 57,
        "start": 165519,
        "end": 5847,
        "content": "study, meet, and follow trends. Anna",
        "words": generateWordTokens("study, meet, and follow trends. Anna"),
        "contentVi": "nghiên cứu, đáp ứng và theo đuổi các xu hướng. Anna"
      },
      {
        "index": 58,
        "start": 168640,
        "end": 5369,
        "content": "says cafes help her focus on school and",
        "words": generateWordTokens("says cafes help her focus on school and"),
        "contentVi": "cho biết quán cà phê giúp cô tập trung vào việc học và"
      },
      {
        "index": 59,
        "start": 171200,
        "end": 5290,
        "content": "forget stress. Many students find jobs",
        "words": generateWordTokens("forget stress. Many students find jobs"),
        "contentVi": "quên đi căng thẳng. Nhiều sinh viên tìm được việc làm"
      },
      {
        "index": 60,
        "start": 173840,
        "end": 5694,
        "content": "at cafes, like serving drinks. It helps",
        "words": generateWordTokens("at cafes, like serving drinks. It helps"),
        "contentVi": "tại các quán cà phê, như phục vụ đồ uống. Nó giúp"
      },
      {
        "index": 61,
        "start": 176319,
        "end": 5777,
        "content": "them earn money. Cafes also bring people",
        "words": generateWordTokens("them earn money. Cafes also bring people"),
        "contentVi": "họ kiếm được tiền. Quán cà phê cũng đưa mọi người"
      },
      {
        "index": 62,
        "start": 179360,
        "end": 5939,
        "content": "together. Anna meets new friends while",
        "words": generateWordTokens("together. Anna meets new friends while"),
        "contentVi": "cùng nhau. Anna gặp những người bạn mới trong khi"
      },
      {
        "index": 63,
        "start": 181920,
        "end": 6662,
        "content": "studying or dancing for Tik Tok. But",
        "words": generateWordTokens("studying or dancing for Tik Tok. But"),
        "contentVi": "học hay nhảy Tik Tok. Nhưng"
      },
      {
        "index": 64,
        "start": 185120,
        "end": 7145,
        "content": "there are problems, too. Young people",
        "words": generateWordTokens("there are problems, too. Young people"),
        "contentVi": "cũng có vấn đề. Giới trẻ"
      },
      {
        "index": 65,
        "start": 188400,
        "end": 8348,
        "content": "spend a lot of money at cafes. A matcha",
        "words": generateWordTokens("spend a lot of money at cafes. A matcha"),
        "contentVi": "tiêu rất nhiều tiền vào các quán cà phê. Matcha"
      },
      {
        "index": 66,
        "start": 192080,
        "end": 7312,
        "content": "latte can cost 50,000 VND and Anna goes",
        "words": generateWordTokens("latte can cost 50,000 VND and Anna goes"),
        "contentVi": "Lon latte có giá 50.000 đồng và Anna đi"
      },
      {
        "index": 67,
        "start": 196560,
        "end": 6357,
        "content": "three times a week. It's expensive for",
        "words": generateWordTokens("three times a week. It's expensive for"),
        "contentVi": "ba lần một tuần. Nó đắt đối với"
      },
      {
        "index": 68,
        "start": 199200,
        "end": 6359,
        "content": "students. Also, some young people talk",
        "words": generateWordTokens("students. Also, some young people talk"),
        "contentVi": "sinh viên. Ngoài ra, một số bạn trẻ còn nói chuyện"
      },
      {
        "index": 69,
        "start": 202720,
        "end": 5082,
        "content": "too much about others. Anna heard",
        "words": generateWordTokens("too much about others. Anna heard"),
        "contentVi": "quá nhiều về người khác. Anna nghe thấy"
      },
      {
        "index": 70,
        "start": 205360,
        "end": 5004,
        "content": "friends gossip about a classmate. It",
        "words": generateWordTokens("friends gossip about a classmate. It"),
        "contentVi": "bạn bè bàn tán về một người bạn cùng lớp. Nó"
      },
      {
        "index": 71,
        "start": 207599,
        "end": 5329,
        "content": "made her sad. Spending too much time at",
        "words": generateWordTokens("made her sad. Spending too much time at"),
        "contentVi": "làm cô ấy buồn. Dành quá nhiều thời gian vào"
      },
      {
        "index": 72,
        "start": 210159,
        "end": 6131,
        "content": "cafes can also make them tired for",
        "words": generateWordTokens("cafes can also make them tired for"),
        "contentVi": "quán cà phê cũng có thể khiến họ mệt mỏi"
      },
      {
        "index": 73,
        "start": 212720,
        "end": 5732,
        "content": "school. Anna loves cafes, but she tries",
        "words": generateWordTokens("school. Anna loves cafes, but she tries"),
        "contentVi": "trường học. Anna thích quán cà phê nhưng cô ấy cố gắng"
      },
      {
        "index": 74,
        "start": 216080,
        "end": 4696,
        "content": "to balance. She studies at home",
        "words": generateWordTokens("to balance. She studies at home"),
        "contentVi": "để cân bằng. Cô ấy học ở nhà"
      },
      {
        "index": 75,
        "start": 218239,
        "end": 5578,
        "content": "sometimes and only goes to cafes on",
        "words": generateWordTokens("sometimes and only goes to cafes on"),
        "contentVi": "đôi khi và chỉ đi đến quán cà phê"
      },
      {
        "index": 76,
        "start": 220560,
        "end": 5661,
        "content": "weekends. One day she sat at a cafe with",
        "words": generateWordTokens("weekends. One day she sat at a cafe with"),
        "contentVi": "những ngày cuối tuần. Một ngày nọ cô ấy ngồi ở quán cà phê với"
      },
      {
        "index": 77,
        "start": 223599,
        "end": 5584,
        "content": "her mom. They drank matcha latte and",
        "words": generateWordTokens("her mom. They drank matcha latte and"),
        "contentVi": "mẹ cô ấy. Họ uống matcha latte và"
      },
      {
        "index": 78,
        "start": 226000,
        "end": 5185,
        "content": "talked about life. It was special. Anna",
        "words": generateWordTokens("talked about life. It was special. Anna"),
        "contentVi": "đã nói về cuộc sống. Nó thật đặc biệt. Anna"
      },
      {
        "index": 79,
        "start": 228959,
        "end": 5350,
        "content": "learned that coffee in Vietnam is about",
        "words": generateWordTokens("learned that coffee in Vietnam is about"),
        "contentVi": "được biết rằng cà phê ở Việt Nam là về"
      },
      {
        "index": 80,
        "start": 230959,
        "end": 6312,
        "content": "love and connection, not just fun or",
        "words": generateWordTokens("love and connection, not just fun or"),
        "contentVi": "tình yêu và sự kết nối, không chỉ là niềm vui hay"
      },
      {
        "index": 81,
        "start": 234080,
        "end": 5593,
        "content": "studying. For Anna, coffee shops are",
        "words": generateWordTokens("studying. For Anna, coffee shops are"),
        "contentVi": "học. Đối với Anna, quán cà phê là"
      },
      {
        "index": 82,
        "start": 237040,
        "end": 4957,
        "content": "part of her heart. Ho Chi Min City's",
        "words": generateWordTokens("part of her heart. Ho Chi Min City's"),
        "contentVi": "một phần trái tim của cô. Thành phố Hồ Chí Minh"
      },
      {
        "index": 83,
        "start": 239439,
        "end": 5440,
        "content": "busy streets with motorbikes and bright",
        "words": generateWordTokens("busy streets with motorbikes and bright"),
        "contentVi": "đường phố tấp nập xe máy và sáng sủa"
      },
      {
        "index": 84,
        "start": 241760,
        "end": 5361,
        "content": "cafe signs make her happy. She feels",
        "words": generateWordTokens("cafe signs make her happy. She feels"),
        "contentVi": "bảng hiệu quán cà phê làm cô ấy hạnh phúc. Cô ấy cảm thấy"
      },
      {
        "index": 85,
        "start": 244640,
        "end": 6165,
        "content": "free with her friends, drinking matcha",
        "words": generateWordTokens("free with her friends, drinking matcha"),
        "contentVi": "rảnh rỗi cùng bạn bè, uống matcha"
      },
      {
        "index": 86,
        "start": 246879,
        "end": 6568,
        "content": "latte, studying, or laughing. Coffee in",
        "words": generateWordTokens("latte, studying, or laughing. Coffee in"),
        "contentVi": "latte, học tập, hoặc cười. Cà phê ở"
      },
      {
        "index": 87,
        "start": 250560,
        "end": 6731,
        "content": "Vietnam is not just a drink. It's a",
        "words": generateWordTokens("Vietnam is not just a drink. It's a"),
        "contentVi": "Việt Nam không chỉ là đồ uống Đó là một"
      },
      {
        "index": 88,
        "start": 253200,
        "end": 6653,
        "content": "story of joy, work, and friendship.",
        "words": generateWordTokens("story of joy, work, and friendship."),
        "contentVi": "câu chuyện về niềm vui, công việc và tình bạn."
      },
      {
        "index": 89,
        "start": 257040,
        "end": 5296,
        "content": "In conclusion, coffee is a big part of",
        "words": generateWordTokens("In conclusion, coffee is a big part of"),
        "contentVi": "Tóm lại, cà phê là một phần quan trọng trong"
      },
      {
        "index": 90,
        "start": 259600,
        "end": 5299,
        "content": "life in Vietnam. Older people drink it",
        "words": generateWordTokens("life in Vietnam. Older people drink it"),
        "contentVi": "cuộc sống ở Việt Nam. Người lớn tuổi uống nó"
      },
      {
        "index": 91,
        "start": 262079,
        "end": 6102,
        "content": "to start the day. Young people use cafes",
        "words": generateWordTokens("to start the day. Young people use cafes"),
        "contentVi": "để bắt đầu một ngày. Giới trẻ sử dụng quán cà phê"
      },
      {
        "index": 92,
        "start": 264639,
        "end": 6586,
        "content": "to study, meet, and follow trends. It",
        "words": generateWordTokens("to study, meet, and follow trends. It"),
        "contentVi": "để nghiên cứu, đáp ứng và theo đuổi các xu hướng. Nó"
      },
      {
        "index": 93,
        "start": 267919,
        "end": 5869,
        "content": "brings fun, but needs balance. Honest",
        "words": generateWordTokens("brings fun, but needs balance. Honest"),
        "contentVi": "mang lại niềm vui nhưng cần sự cân bằng. Trung thực"
      },
      {
        "index": 94,
        "start": 270960,
        "end": 5711,
        "content": "story shows how coffee makes Vietnam",
        "words": generateWordTokens("story shows how coffee makes Vietnam"),
        "contentVi": "câu chuyện cho thấy cà phê làm nên Việt Nam như thế nào"
      },
      {
        "index": 95,
        "start": 273520,
        "end": 5554,
        "content": "special. Do you like coffee? Where do",
        "words": generateWordTokens("special. Do you like coffee? Where do"),
        "contentVi": "đặc biệt. Bạn có thích cà phê không? làm ở đâu"
      },
      {
        "index": 96,
        "start": 276400,
        "end": 4916,
        "content": "you go? Don't forget to subscribe to our",
        "words": generateWordTokens("you go? Don't forget to subscribe to our"),
        "contentVi": "bạn đi à? Đừng quên đăng ký kênh của chúng tôi"
      },
      {
        "index": 97,
        "start": 278800,
        "end": 7279,
        "content": "channel for more A2 English listening",
        "words": generateWordTokens("channel for more A2 English listening"),
        "contentVi": "kênh để nghe thêm tiếng Anh A2"
      },
      {
        "index": 98,
        "start": 281040,
        "end": 5041,
        "content": "practice videos. See you next time.",
        "words": generateWordTokens("practice videos. See you next time."),
        "contentVi": "video thực hành. Hẹn gặp lại lần sau."
      },
      {
        "index": 99,
        "start": 287919,
        "end": 5568,
        "content": "Hello everyone. Welcome to this A2",
        "words": generateWordTokens("Hello everyone. Welcome to this A2"),
        "contentVi": "Xin chào tất cả mọi người. Chào mừng đến với A2 này"
      },
      {
        "index": 100,
        "start": 290560,
        "end": 5091,
        "content": "English listening practice video. Today",
        "words": generateWordTokens("English listening practice video. Today"),
        "contentVi": "Video luyện nghe tiếng Anh. Hôm nay"
      },
      {
        "index": 101,
        "start": 293199,
        "end": 5814,
        "content": "I want to tell you a story about coffee",
        "words": generateWordTokens("I want to tell you a story about coffee"),
        "contentVi": "Tôi muốn kể cho bạn nghe một câu chuyện về cà phê"
      }
    ]
  },

  "luyen-nghe-a2-1tzyfnifanw": {
    "title": "Luyện Nghe Tiếng Anh Level A2 - Life In Hà Nội",
    "audio_url": "1TzyFniFanw",
    "repeat_offset": 264.96,
    "sentences": [
      {
        "index": 0,
        "start": 11200,
        "end": 6331,
        "content": "I want to tell you a story about Hanoi,",
        "words": generateWordTokens("I want to tell you a story about Hanoi,"),
        "contentVi": "Tôi muốn kể cho bạn nghe một câu chuyện về Hà Nội,"
      },
      {
        "index": 1,
        "start": 14000,
        "end": 8014,
        "content": "Vietnam's capital city. Hanoi is like a",
        "words": generateWordTokens("Vietnam's capital city. Hanoi is like a"),
        "contentVi": "Thủ đô của Việt Nam. Hà Nội giống như một"
      },
      {
        "index": 2,
        "start": 17520,
        "end": 7058,
        "content": "warm home full of love, dreams, and kind",
        "words": generateWordTokens("warm home full of love, dreams, and kind"),
        "contentVi": "ngôi nhà ấm áp tràn đầy tình yêu, ước mơ và lòng tốt"
      },
      {
        "index": 3,
        "start": 22000,
        "end": 6022,
        "content": "people. It's a place where students,",
        "words": generateWordTokens("people. It's a place where students,"),
        "contentVi": "mọi người. Đó là nơi sinh viên,"
      },
      {
        "index": 4,
        "start": 24560,
        "end": 6105,
        "content": "workers, and even foreigners feel happy.",
        "words": generateWordTokens("workers, and even foreigners feel happy."),
        "contentVi": "công nhân, và thậm chí cả người nước ngoài cũng cảm thấy hạnh phúc."
      },
      {
        "index": 5,
        "start": 28000,
        "end": 6587,
        "content": "Let me share a story that shows Hanoi's",
        "words": generateWordTokens("Let me share a story that shows Hanoi's"),
        "contentVi": "Hãy để tôi chia sẻ một câu chuyện cho thấy Hà Nội"
      },
      {
        "index": 6,
        "start": 30640,
        "end": 7391,
        "content": "beauty and heart. My friend Mai is from",
        "words": generateWordTokens("beauty and heart. My friend Mai is from"),
        "contentVi": "vẻ đẹp và trái tim. Bạn tôi Mai đến từ"
      },
      {
        "index": 7,
        "start": 34559,
        "end": 6276,
        "content": "Kangming, a place far from Hanoi. She",
        "words": generateWordTokens("Kangming, a place far from Hanoi. She"),
        "contentVi": "Kangming, một nơi xa Hà Nội. Cô ấy"
      },
      {
        "index": 8,
        "start": 38000,
        "end": 5878,
        "content": "came to Hanoi to study at Foreign Trade",
        "words": generateWordTokens("came to Hanoi to study at Foreign Trade"),
        "contentVi": "đến Hà Nội học Ngoại thương"
      },
      {
        "index": 9,
        "start": 40800,
        "end": 6120,
        "content": "University. At first, she was shy and",
        "words": generateWordTokens("University. At first, she was shy and"),
        "contentVi": "Trường đại học. Lúc đầu cô ấy còn ngại ngùng và"
      },
      {
        "index": 10,
        "start": 43840,
        "end": 6443,
        "content": "missed home. But Hanoi welcomed her like",
        "words": generateWordTokens("missed home. But Hanoi welcomed her like"),
        "contentVi": "nhớ nhà. Nhưng Hà Nội lại chào đón cô như thế"
      },
      {
        "index": 11,
        "start": 46879,
        "end": 6928,
        "content": "a friend. One autumn day, when the air",
        "words": generateWordTokens("a friend. One autumn day, when the air"),
        "contentVi": "một người bạn. Một ngày mùa thu, khi không khí"
      },
      {
        "index": 12,
        "start": 50239,
        "end": 6451,
        "content": "was cool and trees turned yellow, Mai",
        "words": generateWordTokens("was cool and trees turned yellow, Mai"),
        "contentVi": "trời mát cây chuyển vàng rồi Mai"
      },
      {
        "index": 13,
        "start": 53760,
        "end": 6693,
        "content": "walked near a lake. A street seller gave",
        "words": generateWordTokens("walked near a lake. A street seller gave"),
        "contentVi": "đi dạo gần một cái hồ. Một người bán hàng rong đã đưa"
      },
      {
        "index": 14,
        "start": 56640,
        "end": 7656,
        "content": "her a free flower and smiled. That small",
        "words": generateWordTokens("her a free flower and smiled. That small"),
        "contentVi": "tặng cô một bông hoa miễn phí và mỉm cười. Nhỏ đó"
      },
      {
        "index": 15,
        "start": 60399,
        "end": 7981,
        "content": "moment made Mai feel Hanoi was her new",
        "words": generateWordTokens("moment made Mai feel Hanoi was her new"),
        "contentVi": "khoảnh khắc khiến Mai cảm thấy Hà Nội là nơi mới của mình"
      },
      {
        "index": 16,
        "start": 64239,
        "end": 7585,
        "content": "home. Mai made friends at school. They",
        "words": generateWordTokens("home. Mai made friends at school. They"),
        "contentVi": "trang chủ. Mai kết bạn ở trường. Họ"
      },
      {
        "index": 17,
        "start": 68320,
        "end": 5828,
        "content": "loved to sit at a trad stall, iced tea",
        "words": generateWordTokens("loved to sit at a trad stall, iced tea"),
        "contentVi": "thích ngồi quán trà đá"
      },
      {
        "index": 18,
        "start": 71760,
        "end": 4712,
        "content": "on the sidewalk. They sat on tiny",
        "words": generateWordTokens("on the sidewalk. They sat on tiny"),
        "contentVi": "trên vỉa hè. Họ ngồi trên một chiếc ghế nhỏ"
      },
      {
        "index": 19,
        "start": 74080,
        "end": 5834,
        "content": "chairs, laughed, and shared stories",
        "words": generateWordTokens("chairs, laughed, and shared stories"),
        "contentVi": "những chiếc ghế, những tiếng cười và những câu chuyện được chia sẻ"
      },
      {
        "index": 20,
        "start": 76400,
        "end": 6316,
        "content": "about classes. One night, Mai's friend",
        "words": generateWordTokens("about classes. One night, Mai's friend"),
        "contentVi": "về các lớp học. Một đêm nọ, bạn của Mai"
      },
      {
        "index": 21,
        "start": 79840,
        "end": 5679,
        "content": "Lynn told her about a boy she liked.",
        "words": generateWordTokens("Lynn told her about a boy she liked."),
        "contentVi": "Lynn kể cho cô nghe về một chàng trai cô thích."
      },
      {
        "index": 22,
        "start": 82640,
        "end": 5922,
        "content": "They met at a small cinema watching a",
        "words": generateWordTokens("They met at a small cinema watching a"),
        "contentVi": "Họ gặp nhau tại một rạp chiếu phim nhỏ đang xem một bộ phim"
      },
      {
        "index": 23,
        "start": 85439,
        "end": 7926,
        "content": "movie under Hanoi's soft lights. Lynn",
        "words": generateWordTokens("movie under Hanoi's soft lights. Lynn"),
        "contentVi": "phim dưới ánh đèn dịu nhẹ của Hà Nội. Lynn"
      },
      {
        "index": 24,
        "start": 88479,
        "end": 7368,
        "content": "said, \"Hanoi makes love feel special.\"",
        "words": generateWordTokens("said, \"Hanoi makes love feel special.\""),
        "contentVi": "cho biết: “Hà Nội khiến tình yêu trở nên đặc biệt”."
      },
      {
        "index": 25,
        "start": 93280,
        "end": 5693,
        "content": "Mai saw them ride a bike together,",
        "words": generateWordTokens("Mai saw them ride a bike together,"),
        "contentVi": "Mai thấy họ đi xe đạp cùng nhau,"
      },
      {
        "index": 26,
        "start": 95759,
        "end": 7136,
        "content": "eating ice cream and smiling. It was",
        "words": generateWordTokens("eating ice cream and smiling. It was"),
        "contentVi": "ăn kem và mỉm cười. Đó là"
      },
      {
        "index": 27,
        "start": 98880,
        "end": 7378,
        "content": "like Hanoi's air was full of hope.",
        "words": generateWordTokens("like Hanoi's air was full of hope."),
        "contentVi": "như không khí Hà Nội tràn đầy hy vọng."
      },
      {
        "index": 28,
        "start": 102799,
        "end": 6184,
        "content": "As weeks passed, Mai saw more of Hanoi's",
        "words": generateWordTokens("As weeks passed, Mai saw more of Hanoi's"),
        "contentVi": "Nhiều tuần trôi qua, Mai nhìn thấy Hà Nội nhiều hơn."
      },
      {
        "index": 29,
        "start": 106159,
        "end": 5627,
        "content": "magic. Every morning, she walked to",
        "words": generateWordTokens("magic. Every morning, she walked to"),
        "contentVi": "ảo thuật. Mỗi buổi sáng, cô đi bộ đến"
      },
      {
        "index": 30,
        "start": 108880,
        "end": 6028,
        "content": "school through small streets. The smell",
        "words": generateWordTokens("school through small streets. The smell"),
        "contentVi": "trường qua những con đường nhỏ. Mùi"
      },
      {
        "index": 31,
        "start": 111680,
        "end": 6191,
        "content": "of foe from a tiny stall mixed with the",
        "words": generateWordTokens("of foe from a tiny stall mixed with the"),
        "contentVi": "của kẻ thù từ một gian hàng nhỏ trộn lẫn với"
      },
      {
        "index": 32,
        "start": 114799,
        "end": 5636,
        "content": "sweet scent of milk flowers. Old men",
        "words": generateWordTokens("sweet scent of milk flowers. Old men"),
        "contentVi": "hương thơm ngọt ngào của hoa sữa. Ông già"
      },
      {
        "index": 33,
        "start": 117759,
        "end": 6279,
        "content": "played chess under big trees and their",
        "words": generateWordTokens("played chess under big trees and their"),
        "contentVi": "chơi cờ dưới những cái cây lớn và"
      },
      {
        "index": 34,
        "start": 120320,
        "end": 6120,
        "content": "laughter made Mai smile. She felt Hanoi",
        "words": generateWordTokens("laughter made Mai smile. She felt Hanoi"),
        "contentVi": "tiếng cười làm Mai mỉm cười. Cô cảm thấy Hà Nội"
      },
      {
        "index": 35,
        "start": 123920,
        "end": 6364,
        "content": "was alive like a friend who never",
        "words": generateWordTokens("was alive like a friend who never"),
        "contentVi": "đã sống như một người bạn chưa bao giờ"
      },
      {
        "index": 36,
        "start": 126320,
        "end": 6366,
        "content": "sleeps. One evening, Mai joined Lynn and",
        "words": generateWordTokens("sleeps. One evening, Mai joined Lynn and"),
        "contentVi": "ngủ. Một buổi tối, Mai cùng Lynn và"
      },
      {
        "index": 37,
        "start": 130160,
        "end": 5890,
        "content": "Nam at a night market. The market was",
        "words": generateWordTokens("Nam at a night market. The market was"),
        "contentVi": "Nam ở chợ đêm. Thị trường đã"
      },
      {
        "index": 38,
        "start": 132560,
        "end": 7172,
        "content": "bright with colorful lights. Stalls sold",
        "words": generateWordTokens("bright with colorful lights. Stalls sold"),
        "contentVi": "rực rỡ với ánh đèn đầy màu sắc. Gian hàng đã bán"
      },
      {
        "index": 39,
        "start": 135920,
        "end": 6056,
        "content": "hot booncha and sweet ch. Lynn and Num",
        "words": generateWordTokens("hot booncha and sweet ch. Lynn and Num"),
        "contentVi": "booncha nóng và ch ngọt ngào. Lynn và Num"
      },
      {
        "index": 40,
        "start": 139599,
        "end": 5341,
        "content": "shared a bowl of ch feeding each other",
        "words": generateWordTokens("shared a bowl of ch feeding each other"),
        "contentVi": "chung một bát ch đđ cho nhau"
      },
      {
        "index": 41,
        "start": 141840,
        "end": 6621,
        "content": "and giggling. Mai watched them and felt",
        "words": generateWordTokens("and giggling. Mai watched them and felt"),
        "contentVi": "và cười khúc khích. Mai nhìn họ và cảm nhận"
      },
      {
        "index": 42,
        "start": 144800,
        "end": 6465,
        "content": "warm inside. Hanoi's busy streets felt",
        "words": generateWordTokens("warm inside. Hanoi's busy streets felt"),
        "contentVi": "ấm áp bên trong. Hà Nội tấp nập phố phường"
      },
      {
        "index": 43,
        "start": 148319,
        "end": 5669,
        "content": "quiet with love. Young couples walked",
        "words": generateWordTokens("quiet with love. Young couples walked"),
        "contentVi": "lặng lẽ với tình yêu. Đôi vợ chồng trẻ bước đi"
      },
      {
        "index": 44,
        "start": 151120,
        "end": 5671,
        "content": "hand in hand, their faces happy under",
        "words": generateWordTokens("hand in hand, their faces happy under"),
        "contentVi": "tay trong tay, khuôn mặt họ hạnh phúc dưới"
      },
      {
        "index": 45,
        "start": 153840,
        "end": 6234,
        "content": "the soft glow of lanterns.",
        "words": generateWordTokens("the soft glow of lanterns."),
        "contentVi": "ánh sáng dịu nhẹ của đèn lồng."
      },
      {
        "index": 46,
        "start": 156640,
        "end": 6317,
        "content": "Mai started to love Hanoi more each day.",
        "words": generateWordTokens("Mai started to love Hanoi more each day."),
        "contentVi": "Mai bắt đầu yêu Hà Nội hơn mỗi ngày."
      },
      {
        "index": 47,
        "start": 159920,
        "end": 5600,
        "content": "She found a favorite spot, a small bench",
        "words": generateWordTokens("She found a favorite spot, a small bench"),
        "contentVi": "Cô tìm được một chỗ ưa thích, một chiếc ghế dài nhỏ"
      },
      {
        "index": 48,
        "start": 162800,
        "end": 5443,
        "content": "by the lake. She sat there watching",
        "words": generateWordTokens("by the lake. She sat there watching"),
        "contentVi": "bên hồ. Cô ngồi đó nhìn"
      },
      {
        "index": 49,
        "start": 165360,
        "end": 5764,
        "content": "children fly kites and old women sell",
        "words": generateWordTokens("children fly kites and old women sell"),
        "contentVi": "Trẻ em thả diều và bà già bán hàng"
      },
      {
        "index": 50,
        "start": 168080,
        "end": 5687,
        "content": "votus flowers. One day a little boy",
        "words": generateWordTokens("votus flowers. One day a little boy"),
        "contentVi": "hoa votus. Một hôm có một cậu bé"
      },
      {
        "index": 51,
        "start": 170959,
        "end": 5531,
        "content": "dropped his kite. Mai helped him pick it",
        "words": generateWordTokens("dropped his kite. Mai helped him pick it"),
        "contentVi": "thả diều của mình. Mai giúp anh ấy nhặt nó"
      },
      {
        "index": 52,
        "start": 173599,
        "end": 6174,
        "content": "up and his mother said, \"Thank you.",
        "words": generateWordTokens("up and his mother said, \"Thank you."),
        "contentVi": "dậy và mẹ anh nói: \"Cảm ơn con."
      },
      {
        "index": 53,
        "start": 176319,
        "end": 7456,
        "content": "You're so kind.\" That moment reminded",
        "words": generateWordTokens("You're so kind.\" That moment reminded"),
        "contentVi": "Bạn thật tốt bụng.\" Khoảnh khắc đó khiến tôi nhớ lại"
      },
      {
        "index": 54,
        "start": 179599,
        "end": 7781,
        "content": "Mai of Hanoi's heart. People here care,",
        "words": generateWordTokens("Mai of Hanoi's heart. People here care,"),
        "contentVi": "Mai của trái tim Hà Nội. Người dân ở đây quan tâm"
      },
      {
        "index": 55,
        "start": 183599,
        "end": 6505,
        "content": "even for strangers. At school, Mai saw",
        "words": generateWordTokens("even for strangers. At school, Mai saw"),
        "contentVi": "ngay cả đối với người lạ. Ở trường, Mai nhìn thấy"
      },
      {
        "index": 56,
        "start": 187200,
        "end": 5387,
        "content": "how Hanoi brought people together. Her",
        "words": generateWordTokens("how Hanoi brought people together. Her"),
        "contentVi": "Hà Nội đã gắn kết mọi người với nhau như thế nào. Cô ấy"
      },
      {
        "index": 57,
        "start": 189920,
        "end": 6350,
        "content": "classmates came from many places. Fen",
        "words": generateWordTokens("classmates came from many places. Fen"),
        "contentVi": "các bạn cùng lớp đến từ nhiều nơi. Fen"
      },
      {
        "index": 58,
        "start": 192400,
        "end": 7232,
        "content": "Hua, Ning Yen, even Daang. They studied",
        "words": generateWordTokens("Hua, Ning Yen, even Daang. They studied"),
        "contentVi": "Hứa, Ninh Yên, thậm chí cả Đại Đăng. Họ đã nghiên cứu"
      },
      {
        "index": 59,
        "start": 196080,
        "end": 6196,
        "content": "hard but also shared dreams. One night",
        "words": generateWordTokens("hard but also shared dreams. One night"),
        "contentVi": "vất vả nhưng cũng có chung ước mơ. Một đêm"
      },
      {
        "index": 60,
        "start": 199440,
        "end": 5399,
        "content": "they had a small party at school. They",
        "words": generateWordTokens("they had a small party at school. They"),
        "contentVi": "họ đã có một bữa tiệc nhỏ ở trường Họ"
      },
      {
        "index": 61,
        "start": 202080,
        "end": 5882,
        "content": "sang songs and ate bonme under the",
        "words": generateWordTokens("sang songs and ate bonme under the"),
        "contentVi": "hát những bài hát và ăn bonme dưới ánh đèn"
      },
      {
        "index": 62,
        "start": 204640,
        "end": 6925,
        "content": "stars. Lynn and Nam danced slowly and",
        "words": generateWordTokens("stars. Lynn and Nam danced slowly and"),
        "contentVi": "các ngôi sao. Lynn và Nam nhảy chậm rãi và"
      },
      {
        "index": 63,
        "start": 207760,
        "end": 6448,
        "content": "everyone clapped. My thought Hanoi makes",
        "words": generateWordTokens("everyone clapped. My thought Hanoi makes"),
        "contentVi": "mọi người vỗ tay. Suy nghĩ của tôi Hà Nội làm"
      },
      {
        "index": 64,
        "start": 211360,
        "end": 6051,
        "content": "every moment special.",
        "words": generateWordTokens("every moment special."),
        "contentVi": "mọi khoảnh khắc đều đặc biệt."
      },
      {
        "index": 65,
        "start": 214000,
        "end": 6294,
        "content": "For my Hanoi became her heart. The",
        "words": generateWordTokens("For my Hanoi became her heart. The"),
        "contentVi": "Vì Hà Nội của tôi đã trở thành trái tim của cô ấy. các"
      },
      {
        "index": 66,
        "start": 217200,
        "end": 6217,
        "content": "city's soft autumn breeze, the sound of",
        "words": generateWordTokens("city's soft autumn breeze, the sound of"),
        "contentVi": "làn gió mùa thu êm dịu của thành phố, âm thanh của"
      },
      {
        "index": 67,
        "start": 220080,
        "end": 6299,
        "content": "bicycle bells, and the taste of hot foe",
        "words": generateWordTokens("bicycle bells, and the taste of hot foe"),
        "contentVi": "tiếng chuông xe đạp và mùi vị của kẻ thù nóng bỏng"
      },
      {
        "index": 68,
        "start": 223200,
        "end": 6383,
        "content": "made her feel alive. She no longer",
        "words": generateWordTokens("made her feel alive. She no longer"),
        "contentVi": "khiến cô cảm thấy còn sống. Cô ấy không còn"
      },
      {
        "index": 69,
        "start": 226159,
        "end": 6147,
        "content": "missed home because Hanoi was home. It",
        "words": generateWordTokens("missed home because Hanoi was home. It"),
        "contentVi": "nhớ nhà vì Hà Nội là nhà. Nó"
      },
      {
        "index": 70,
        "start": 229360,
        "end": 6549,
        "content": "was where she found friends, saw love",
        "words": generateWordTokens("was where she found friends, saw love"),
        "contentVi": "là nơi cô tìm thấy bạn bè, nhìn thấy tình yêu"
      },
      {
        "index": 71,
        "start": 232080,
        "end": 6072,
        "content": "grow, and learned to dream big. Hanoi's",
        "words": generateWordTokens("grow, and learned to dream big. Hanoi's"),
        "contentVi": "trưởng thành và học cách mơ lớn. của Hà Nội"
      },
      {
        "index": 72,
        "start": 235680,
        "end": 5756,
        "content": "beauty was not just in its streets, but",
        "words": generateWordTokens("beauty was not just in its streets, but"),
        "contentVi": "vẻ đẹp không chỉ ở đường phố mà còn"
      },
      {
        "index": 73,
        "start": 237920,
        "end": 6398,
        "content": "in its people and their stories. In",
        "words": generateWordTokens("in its people and their stories. In"),
        "contentVi": "ở con người và câu chuyện của họ. TRONG"
      },
      {
        "index": 74,
        "start": 241200,
        "end": 5840,
        "content": "conclusion, Hanoi is a city of love and",
        "words": generateWordTokens("conclusion, Hanoi is a city of love and"),
        "contentVi": "Tóm lại, Hà Nội là thành phố của tình yêu và"
      },
      {
        "index": 75,
        "start": 244080,
        "end": 6004,
        "content": "dreams. It's a place where young hearts",
        "words": generateWordTokens("dreams. It's a place where young hearts"),
        "contentVi": "những giấc mơ. Đó là nơi mà những trái tim trẻ"
      },
      {
        "index": 76,
        "start": 246799,
        "end": 6728,
        "content": "like Mai, Lynn, and Nam find joy and",
        "words": generateWordTokens("like Mai, Lynn, and Nam find joy and"),
        "contentVi": "như Mai, Lynn và Nam tìm thấy niềm vui và"
      },
      {
        "index": 77,
        "start": 249840,
        "end": 7609,
        "content": "hope. Hanoi's lights, smells, and",
        "words": generateWordTokens("hope. Hanoi's lights, smells, and"),
        "contentVi": "mong. Ánh đèn, mùi hương của Hà Nội"
      },
      {
        "index": 78,
        "start": 253280,
        "end": 6413,
        "content": "kindness make it a home for everyone. Do",
        "words": generateWordTokens("kindness make it a home for everyone. Do"),
        "contentVi": "lòng tốt biến nó thành ngôi nhà cho mọi người. LÀM"
      },
      {
        "index": 79,
        "start": 257199,
        "end": 4178,
        "content": "you have a city that feels like love?",
        "words": generateWordTokens("you have a city that feels like love?"),
        "contentVi": "bạn có một thành phố mà bạn cảm thấy như tình yêu?"
      },
      {
        "index": 80,
        "start": 259440,
        "end": 4179,
        "content": "Don't forget to subscribe to our channel",
        "words": generateWordTokens("Don't forget to subscribe to our channel"),
        "contentVi": "Đừng quên đăng ký kênh của chúng tôi"
      },
      {
        "index": 81,
        "start": 261120,
        "end": 6780,
        "content": "for more A1 English listening practice",
        "words": generateWordTokens("for more A1 English listening practice"),
        "contentVi": "để biết thêm luyện nghe tiếng Anh A1"
      },
      {
        "index": 82,
        "start": 263360,
        "end": 4542,
        "content": "videos. See you next time.",
        "words": generateWordTokens("videos. See you next time."),
        "contentVi": "video. Hẹn gặp lại lần sau."
      },
      {
        "index": 83,
        "start": 269919,
        "end": 6511,
        "content": "Hello everyone. Welcome to this A2",
        "words": generateWordTokens("Hello everyone. Welcome to this A2"),
        "contentVi": "Xin chào tất cả mọi người. Chào mừng đến với A2 này"
      },
      {
        "index": 84,
        "start": 273120,
        "end": 6113,
        "content": "English listening practice video. Today",
        "words": generateWordTokens("English listening practice video. Today"),
        "contentVi": "Video luyện nghe tiếng Anh. Hôm nay"
      }
    ]
  },

  "luyen-nghe-a2-7yj5fjfeqxo": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 -Hometown",
    "audio_url": "7YJ5fjfEQxo",
    "repeat_offset": 67.28,
    "sentences": [
      {
        "index": 0,
        "start": 12160,
        "end": 5292,
        "content": "My hometown is a coastal state of US.",
        "words": generateWordTokens("My hometown is a coastal state of US."),
        "contentVi": "Quê tôi là một bang ven biển của Mỹ."
      },
      {
        "index": 1,
        "start": 15120,
        "end": 4735,
        "content": "Is it the city or the countryside?",
        "words": generateWordTokens("Is it the city or the countryside?"),
        "contentVi": "Đó là thành phố hay nông thôn?"
      },
      {
        "index": 2,
        "start": 17440,
        "end": 4737,
        "content": "I live in a suburb area.",
        "words": generateWordTokens("I live in a suburb area."),
        "contentVi": "Tôi sống ở một khu vực ngoại ô."
      },
      {
        "index": 3,
        "start": 19840,
        "end": 4980,
        "content": "What's it known for?",
        "words": generateWordTokens("What's it known for?"),
        "contentVi": "Nó được biết đến vì điều gì?"
      },
      {
        "index": 4,
        "start": 22160,
        "end": 5141,
        "content": "It's famous for tobacos.",
        "words": generateWordTokens("It's famous for tobacos."),
        "contentVi": "Nó nổi tiếng với thuốc lá."
      },
      {
        "index": 5,
        "start": 24800,
        "end": 4664,
        "content": "What do people do there?",
        "words": generateWordTokens("What do people do there?"),
        "contentVi": "Mọi người làm gì ở đó?"
      },
      {
        "index": 6,
        "start": 27279,
        "end": 4588,
        "content": "Agriculture is the main industry in my",
        "words": generateWordTokens("Agriculture is the main industry in my"),
        "contentVi": "Nông nghiệp là ngành công nghiệp chính ở nước tôi"
      },
      {
        "index": 7,
        "start": 29439,
        "end": 4669,
        "content": "hometown. Most of the people here plant",
        "words": generateWordTokens("hometown. Most of the people here plant"),
        "contentVi": "quê hương. Hầu hết người dân ở đây trồng"
      },
      {
        "index": 8,
        "start": 31840,
        "end": 5072,
        "content": "and sell tobacos.",
        "words": generateWordTokens("and sell tobacos."),
        "contentVi": "và bán thuốc lá."
      },
      {
        "index": 9,
        "start": 34079,
        "end": 5155,
        "content": "How is the atmosphere there?",
        "words": generateWordTokens("How is the atmosphere there?"),
        "contentVi": "Không khí ở đó thế nào?"
      },
      {
        "index": 10,
        "start": 36880,
        "end": 4197,
        "content": "Well, it's quite peaceful. I enjoy the",
        "words": generateWordTokens("Well, it's quite peaceful. I enjoy the"),
        "contentVi": "Chà, nó khá yên bình. Tôi thích"
      },
      {
        "index": 11,
        "start": 39200,
        "end": 4119,
        "content": "fresh air here.",
        "words": generateWordTokens("fresh air here."),
        "contentVi": "không khí trong lành ở đây."
      },
      {
        "index": 12,
        "start": 41040,
        "end": 5001,
        "content": "How are people there?",
        "words": generateWordTokens("How are people there?"),
        "contentVi": "Mọi người ở đó thế nào?"
      },
      {
        "index": 13,
        "start": 43280,
        "end": 4683,
        "content": "They're friendly and hospitable.",
        "words": generateWordTokens("They're friendly and hospitable."),
        "contentVi": "Họ thân thiện và hiếu khách."
      },
      {
        "index": 14,
        "start": 46000,
        "end": 4366,
        "content": "Would you like to live in your hometown",
        "words": generateWordTokens("Would you like to live in your hometown"),
        "contentVi": "Bạn có muốn sống ở quê hương của bạn không"
      },
      {
        "index": 15,
        "start": 47920,
        "end": 4687,
        "content": "or somewhere else?",
        "words": generateWordTokens("or somewhere else?"),
        "contentVi": "hay ở nơi nào khác?"
      },
      {
        "index": 16,
        "start": 50320,
        "end": 4289,
        "content": "Yes, I would. I just wish I can live",
        "words": generateWordTokens("Yes, I would. I just wish I can live"),
        "contentVi": "Vâng, tôi sẽ làm vậy. Tôi chỉ ước mình có thể sống"
      },
      {
        "index": 17,
        "start": 52559,
        "end": 5174,
        "content": "here forever.",
        "words": generateWordTokens("here forever."),
        "contentVi": "ở đây mãi mãi."
      },
      {
        "index": 18,
        "start": 54559,
        "end": 5816,
        "content": "Is it easy to find a job there?",
        "words": generateWordTokens("Is it easy to find a job there?"),
        "contentVi": "Ở đó có dễ tìm việc làm không?"
      },
      {
        "index": 19,
        "start": 57680,
        "end": 5978,
        "content": "Manual work is easy to find. I'm not",
        "words": generateWordTokens("Manual work is easy to find. I'm not"),
        "contentVi": "Công việc thủ công rất dễ tìm. Tôi không"
      },
      {
        "index": 20,
        "start": 60320,
        "end": 5100,
        "content": "sure about the white collar jobs.",
        "words": generateWordTokens("sure about the white collar jobs."),
        "contentVi": "chắc chắn về công việc cổ trắng."
      },
      {
        "index": 21,
        "start": 63600,
        "end": 3344,
        "content": "Is it a good environment for young",
        "words": generateWordTokens("Is it a good environment for young"),
        "contentVi": "Đây có phải là môi trường tốt cho giới trẻ?"
      },
      {
        "index": 22,
        "start": 65360,
        "end": 3665,
        "content": "people?",
        "words": generateWordTokens("people?"),
        "contentVi": "mọi người?"
      },
      {
        "index": 23,
        "start": 66880,
        "end": 4547,
        "content": "I don't think so. The pace of life here",
        "words": generateWordTokens("I don't think so. The pace of life here"),
        "contentVi": "Tôi không nghĩ vậy. Nhịp sống ở đây"
      },
      {
        "index": 24,
        "start": 68960,
        "end": 4228,
        "content": "is quite slow. If they want to work in a",
        "words": generateWordTokens("is quite slow. If they want to work in a"),
        "contentVi": "khá chậm. Nếu họ muốn làm việc trong một"
      },
      {
        "index": 25,
        "start": 71360,
        "end": 3830,
        "content": "dynamic environment, they'd better move",
        "words": generateWordTokens("dynamic environment, they'd better move"),
        "contentVi": "môi trường năng động, tốt hơn hết họ nên di chuyển"
      },
      {
        "index": 26,
        "start": 73119,
        "end": 4314,
        "content": "to the city.",
        "words": generateWordTokens("to the city."),
        "contentVi": "đến thành phố."
      },
      {
        "index": 27,
        "start": 75119,
        "end": 4395,
        "content": "Is traffic congestion a big problem in",
        "words": generateWordTokens("Is traffic congestion a big problem in"),
        "contentVi": "Ùn tắc giao thông có phải là một vấn đề lớn ở"
      }
    ]
  },

  "luyen-nghe-a2-thsd0isdsnk": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 -Electronic Media",
    "audio_url": "thsd0iSDsNk",
    "repeat_offset": 71.12,
    "sentences": [
      {
        "index": 0,
        "start": 12800,
        "end": 5293,
        "content": "in your country?",
        "words": generateWordTokens("in your country?"),
        "contentVi": "ở nước bạn?"
      },
      {
        "index": 1,
        "start": 14559,
        "end": 5856,
        "content": "There are some popular kinds. Radio, TV,",
        "words": generateWordTokens("There are some popular kinds. Radio, TV,"),
        "contentVi": "Có một số loại phổ biến. Đài phát thanh, truyền hình,"
      },
      {
        "index": 2,
        "start": 18080,
        "end": 4898,
        "content": "and online news.",
        "words": generateWordTokens("and online news."),
        "contentVi": "và tin tức trực tuyến."
      },
      {
        "index": 3,
        "start": 20400,
        "end": 4659,
        "content": "What's your favorite kind?",
        "words": generateWordTokens("What's your favorite kind?"),
        "contentVi": "Loại yêu thích của bạn là gì?"
      },
      {
        "index": 4,
        "start": 22960,
        "end": 4422,
        "content": "I like online news because I have to",
        "words": generateWordTokens("I like online news because I have to"),
        "contentVi": "Tôi thích tin tức trực tuyến bởi vì tôi phải"
      },
      {
        "index": 5,
        "start": 25039,
        "end": 4826,
        "content": "work with computers every day. It's",
        "words": generateWordTokens("work with computers every day. It's"),
        "contentVi": "làm việc với máy tính hàng ngày. Của nó"
      },
      {
        "index": 6,
        "start": 27359,
        "end": 4508,
        "content": "easier for me to read online.",
        "words": generateWordTokens("easier for me to read online."),
        "contentVi": "dễ dàng hơn cho tôi để đọc trực tuyến."
      },
      {
        "index": 7,
        "start": 29840,
        "end": 4429,
        "content": "Why do you like it?",
        "words": generateWordTokens("Why do you like it?"),
        "contentVi": "Tại sao bạn thích nó?"
      },
      {
        "index": 8,
        "start": 31840,
        "end": 3952,
        "content": "Due to its convenience, I love reading",
        "words": generateWordTokens("Due to its convenience, I love reading"),
        "contentVi": "Vì sự tiện lợi của nó nên tôi thích đọc sách"
      },
      {
        "index": 9,
        "start": 34239,
        "end": 3235,
        "content": "anyway.",
        "words": generateWordTokens("anyway."),
        "contentVi": "Dẫu sao thì."
      },
      {
        "index": 10,
        "start": 35760,
        "end": 4355,
        "content": "How often do you have access to that",
        "words": generateWordTokens("How often do you have access to that"),
        "contentVi": "Tần suất bạn có quyền truy cập vào đó"
      },
      {
        "index": 11,
        "start": 37440,
        "end": 5717,
        "content": "kind of electronic media?",
        "words": generateWordTokens("kind of electronic media?"),
        "contentVi": "loại phương tiện truyền thông điện tử?"
      },
      {
        "index": 12,
        "start": 40079,
        "end": 5961,
        "content": "Every morning before I start working.",
        "words": generateWordTokens("Every morning before I start working."),
        "contentVi": "Mỗi buổi sáng trước khi tôi bắt đầu làm việc."
      },
      {
        "index": 13,
        "start": 43120,
        "end": 4763,
        "content": "What's interesting about it?",
        "words": generateWordTokens("What's interesting about it?"),
        "contentVi": "Điều gì thú vị về nó?"
      },
      {
        "index": 14,
        "start": 46000,
        "end": 3966,
        "content": "Instead of watching TV or listening to",
        "words": generateWordTokens("Instead of watching TV or listening to"),
        "contentVi": "Thay vì xem TV hoặc nghe"
      },
      {
        "index": 15,
        "start": 47840,
        "end": 4048,
        "content": "radio passively, I'd rather read and",
        "words": generateWordTokens("radio passively, I'd rather read and"),
        "contentVi": "radio một cách thụ động, tôi thà đọc và"
      },
      {
        "index": 16,
        "start": 49920,
        "end": 4050,
        "content": "think about the news.",
        "words": generateWordTokens("think about the news."),
        "contentVi": "nghĩ về tin tức."
      },
      {
        "index": 17,
        "start": 51840,
        "end": 4291,
        "content": "Is it convenient to access that kind of",
        "words": generateWordTokens("Is it convenient to access that kind of"),
        "contentVi": "Có thuận tiện để truy cập loại đó không"
      },
      {
        "index": 18,
        "start": 53920,
        "end": 4213,
        "content": "electronic media?",
        "words": generateWordTokens("electronic media?"),
        "contentVi": "phương tiện truyền thông điện tử?"
      },
      {
        "index": 19,
        "start": 56079,
        "end": 3817,
        "content": "Yes. With a computer, smartphone",
        "words": generateWordTokens("Yes. With a computer, smartphone"),
        "contentVi": "Đúng. Với máy tính, điện thoại thông minh"
      },
      {
        "index": 20,
        "start": 58079,
        "end": 5099,
        "content": "connected to the internet, you can read",
        "words": generateWordTokens("connected to the internet, you can read"),
        "contentVi": "được kết nối với internet, bạn có thể đọc"
      },
      {
        "index": 21,
        "start": 59840,
        "end": 5180,
        "content": "electronic news anytime and anywhere.",
        "words": generateWordTokens("electronic news anytime and anywhere."),
        "contentVi": "tin điện tử mọi lúc, mọi nơi."
      },
      {
        "index": 22,
        "start": 63120,
        "end": 3903,
        "content": "Does your family like that electronic",
        "words": generateWordTokens("Does your family like that electronic"),
        "contentVi": "Gia đình bạn có thích thiết bị điện tử đó không?"
      },
      {
        "index": 23,
        "start": 64960,
        "end": 5025,
        "content": "media, too?",
        "words": generateWordTokens("media, too?"),
        "contentVi": "phương tiện truyền thông cũng vậy?"
      },
      {
        "index": 24,
        "start": 66960,
        "end": 4707,
        "content": "No, my dad likes radio and my mom likes",
        "words": generateWordTokens("No, my dad likes radio and my mom likes"),
        "contentVi": "Không, bố tôi thích radio và mẹ tôi thích"
      },
      {
        "index": 25,
        "start": 69920,
        "end": 5350,
        "content": "TV.",
        "words": generateWordTokens("TV."),
        "contentVi": "TV."
      },
      {
        "index": 26,
        "start": 71600,
        "end": 7712,
        "content": "How has mass media changed recently?",
        "words": generateWordTokens("How has mass media changed recently?"),
        "contentVi": "Truyền thông đại chúng gần đây đã thay đổi như thế nào?"
      },
      {
        "index": 27,
        "start": 75200,
        "end": 4115,
        "content": "They're more modern and userfriendly.",
        "words": generateWordTokens("They're more modern and userfriendly."),
        "contentVi": "Chúng hiện đại hơn và thân thiện với người dùng hơn."
      }
    ]
  },

  "luyen-nghe-a2-16rpb6o984k": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 -Architecture / Building",
    "audio_url": "16rPb6O984k",
    "repeat_offset": 119.52,
    "sentences": [
      {
        "index": 0,
        "start": 11040,
        "end": 3610,
        "content": "What is the most impressive building you",
        "words": generateWordTokens("What is the most impressive building you"),
        "contentVi": "Tòa nhà ấn tượng nhất với bạn là gì"
      },
      {
        "index": 1,
        "start": 13040,
        "end": 3533,
        "content": "visited?",
        "words": generateWordTokens("visited?"),
        "contentVi": "đã ghé thăm?"
      },
      {
        "index": 2,
        "start": 14639,
        "end": 3456,
        "content": "It's the Petronis Twin Tower in",
        "words": generateWordTokens("It's the Petronis Twin Tower in"),
        "contentVi": "Đó là Tháp đôi Petronis ở"
      },
      {
        "index": 3,
        "start": 16560,
        "end": 3697,
        "content": "Malaysia.",
        "words": generateWordTokens("Malaysia."),
        "contentVi": "Malaysia."
      },
      {
        "index": 4,
        "start": 18080,
        "end": 4418,
        "content": "Where is it located?",
        "words": generateWordTokens("Where is it located?"),
        "contentVi": "Nó nằm ở đâu?"
      },
      {
        "index": 5,
        "start": 20240,
        "end": 4420,
        "content": "It's located in the capital of Malaysia,",
        "words": generateWordTokens("It's located in the capital of Malaysia,"),
        "contentVi": "Nó nằm ở thủ đô của Malaysia,"
      },
      {
        "index": 6,
        "start": 22480,
        "end": 4182,
        "content": "Koala Lumpur.",
        "words": generateWordTokens("Koala Lumpur."),
        "contentVi": "Koala Lumpur."
      },
      {
        "index": 7,
        "start": 24640,
        "end": 3705,
        "content": "How tall is it?",
        "words": generateWordTokens("How tall is it?"),
        "contentVi": "Nó cao bao nhiêu?"
      },
      {
        "index": 8,
        "start": 26640,
        "end": 5466,
        "content": "They were the tallest buildings in the",
        "words": generateWordTokens("They were the tallest buildings in the"),
        "contentVi": "Chúng là những tòa nhà cao nhất ở"
      },
      {
        "index": 9,
        "start": 28320,
        "end": 7468,
        "content": "world from 1998 to 2004. It reaches the",
        "words": generateWordTokens("world from 1998 to 2004. It reaches the"),
        "contentVi": "thế giới từ năm 1998 đến năm 2004. Nó đạt tới"
      },
      {
        "index": 10,
        "start": 32079,
        "end": 6113,
        "content": "height of 451.9 m.",
        "words": generateWordTokens("height of 451.9 m."),
        "contentVi": "chiều cao 451,9 m."
      },
      {
        "index": 11,
        "start": 35760,
        "end": 4756,
        "content": "Who was the architect?",
        "words": generateWordTokens("Who was the architect?"),
        "contentVi": "Kiến trúc sư là ai?"
      },
      {
        "index": 12,
        "start": 38160,
        "end": 4117,
        "content": "Cesar P, an Argentine American",
        "words": generateWordTokens("Cesar P, an Argentine American"),
        "contentVi": "Cesar P, một người Mỹ gốc Argentina"
      },
      {
        "index": 13,
        "start": 40480,
        "end": 4920,
        "content": "architect.",
        "words": generateWordTokens("architect."),
        "contentVi": "kiến trúc sư."
      },
      {
        "index": 14,
        "start": 42239,
        "end": 5003,
        "content": "Is it well known all over the world?",
        "words": generateWordTokens("Is it well known all over the world?"),
        "contentVi": "Nó có được biết đến rộng rãi trên toàn thế giới không?"
      },
      {
        "index": 15,
        "start": 45360,
        "end": 3885,
        "content": "Sure. Tourists can't miss it when",
        "words": generateWordTokens("Sure. Tourists can't miss it when"),
        "contentVi": "Chắc chắn. Du khách không thể bỏ lỡ khi"
      },
      {
        "index": 16,
        "start": 47200,
        "end": 3726,
        "content": "visiting Malaysia.",
        "words": generateWordTokens("visiting Malaysia."),
        "contentVi": "thăm Malaysia."
      },
      {
        "index": 17,
        "start": 49200,
        "end": 4209,
        "content": "Do you have to purchase a ticket in",
        "words": generateWordTokens("Do you have to purchase a ticket in"),
        "contentVi": "Bạn có phải mua vé vào"
      },
      {
        "index": 18,
        "start": 50879,
        "end": 5172,
        "content": "order to visit the tower?",
        "words": generateWordTokens("order to visit the tower?"),
        "contentVi": "đặt hàng tham quan tháp?"
      },
      {
        "index": 19,
        "start": 53360,
        "end": 4693,
        "content": "Yes, I do. It's sold online.",
        "words": generateWordTokens("Yes, I do. It's sold online."),
        "contentVi": "Em đồng ý. Nó được bán trực tuyến."
      },
      {
        "index": 20,
        "start": 56000,
        "end": 4696,
        "content": "When did you see it?",
        "words": generateWordTokens("When did you see it?"),
        "contentVi": "Bạn đã nhìn thấy nó khi nào?"
      },
      {
        "index": 21,
        "start": 58000,
        "end": 5417,
        "content": "I saw it two years ago.",
        "words": generateWordTokens("I saw it two years ago."),
        "contentVi": "Tôi đã nhìn thấy nó hai năm trước."
      },
      {
        "index": 22,
        "start": 60640,
        "end": 4781,
        "content": "Will you come back there again?",
        "words": generateWordTokens("Will you come back there again?"),
        "contentVi": "Bạn sẽ quay lại đó lần nữa chứ?"
      },
      {
        "index": 23,
        "start": 63359,
        "end": 5304,
        "content": "Of course. I'm looking forward to seeing",
        "words": generateWordTokens("Of course. I'm looking forward to seeing"),
        "contentVi": "Tất nhiên rồi. Tôi rất mong được nhìn thấy"
      },
      {
        "index": 24,
        "start": 65360,
        "end": 3305,
        "content": "again someday.",
        "words": generateWordTokens("again someday."),
        "contentVi": "một lần nữa vào một ngày nào đó."
      },
      {
        "index": 25,
        "start": 70880,
        "end": 3670,
        "content": "What is the most impressive building you",
        "words": generateWordTokens("What is the most impressive building you"),
        "contentVi": "Tòa nhà ấn tượng nhất với bạn là gì"
      },
      {
        "index": 26,
        "start": 72960,
        "end": 3513,
        "content": "visited?",
        "words": generateWordTokens("visited?"),
        "contentVi": "đã ghé thăm?"
      },
      {
        "index": 27,
        "start": 74479,
        "end": 3595,
        "content": "It's the Petronis Twin Tower in",
        "words": generateWordTokens("It's the Petronis Twin Tower in"),
        "contentVi": "Đó là Tháp đôi Petronis ở"
      },
      {
        "index": 28,
        "start": 76400,
        "end": 3756,
        "content": "Malaysia.",
        "words": generateWordTokens("Malaysia."),
        "contentVi": "Malaysia."
      },
      {
        "index": 29,
        "start": 78000,
        "end": 4398,
        "content": "Where is it located?",
        "words": generateWordTokens("Where is it located?"),
        "contentVi": "Nó nằm ở đâu?"
      },
      {
        "index": 30,
        "start": 80080,
        "end": 4479,
        "content": "It's located in the capital of Malaysia,",
        "words": generateWordTokens("It's located in the capital of Malaysia,"),
        "contentVi": "Nó nằm ở thủ đô của Malaysia,"
      },
      {
        "index": 31,
        "start": 82320,
        "end": 4322,
        "content": "Koala Lumpur.",
        "words": generateWordTokens("Koala Lumpur."),
        "contentVi": "Koala Lumpur."
      },
      {
        "index": 32,
        "start": 84479,
        "end": 3845,
        "content": "How tall is it?",
        "words": generateWordTokens("How tall is it?"),
        "contentVi": "Nó cao bao nhiêu?"
      },
      {
        "index": 33,
        "start": 86560,
        "end": 5527,
        "content": "They were the tallest buildings in the",
        "words": generateWordTokens("They were the tallest buildings in the"),
        "contentVi": "Chúng là những tòa nhà cao nhất ở"
      },
      {
        "index": 34,
        "start": 88240,
        "end": 7528,
        "content": "world from 1998 to 2004. It reaches the",
        "words": generateWordTokens("world from 1998 to 2004. It reaches the"),
        "contentVi": "thế giới từ năm 1998 đến năm 2004. Nó đạt tới"
      },
      {
        "index": 35,
        "start": 92000,
        "end": 6092,
        "content": "height of 451.9 m.",
        "words": generateWordTokens("height of 451.9 m."),
        "contentVi": "chiều cao 451,9 m."
      },
      {
        "index": 36,
        "start": 95680,
        "end": 4736,
        "content": "Who was the architect?",
        "words": generateWordTokens("Who was the architect?"),
        "contentVi": "Kiến trúc sư là ai?"
      },
      {
        "index": 37,
        "start": 98000,
        "end": 4177,
        "content": "Cesar P, an Argentine American",
        "words": generateWordTokens("Cesar P, an Argentine American"),
        "contentVi": "Cesar P, một người Mỹ gốc Argentina"
      },
      {
        "index": 38,
        "start": 100320,
        "end": 5060,
        "content": "architect.",
        "words": generateWordTokens("architect."),
        "contentVi": "kiến trúc sư."
      },
      {
        "index": 39,
        "start": 102079,
        "end": 5142,
        "content": "Is it well known all over the world?",
        "words": generateWordTokens("Is it well known all over the world?"),
        "contentVi": "Nó có được biết đến rộng rãi trên toàn thế giới không?"
      },
      {
        "index": 40,
        "start": 105280,
        "end": 3865,
        "content": "Sure. Tourists can't miss it when",
        "words": generateWordTokens("Sure. Tourists can't miss it when"),
        "contentVi": "Chắc chắn. Du khách không thể bỏ lỡ khi"
      },
      {
        "index": 41,
        "start": 107119,
        "end": 3708,
        "content": "visiting Malaysia.",
        "words": generateWordTokens("visiting Malaysia."),
        "contentVi": "thăm Malaysia."
      },
      {
        "index": 42,
        "start": 109040,
        "end": 4269,
        "content": "Do you have to purchase a ticket in",
        "words": generateWordTokens("Do you have to purchase a ticket in"),
        "contentVi": "Bạn có phải mua vé vào"
      },
      {
        "index": 43,
        "start": 110720,
        "end": 5311,
        "content": "order to visit the tower?",
        "words": generateWordTokens("order to visit the tower?"),
        "contentVi": "đặt hàng tham quan tháp?"
      },
      {
        "index": 44,
        "start": 113200,
        "end": 4833,
        "content": "Yes, I do. It's sold online.",
        "words": generateWordTokens("Yes, I do. It's sold online."),
        "contentVi": "Em đồng ý. Nó được bán trực tuyến."
      },
      {
        "index": 45,
        "start": 115920,
        "end": 4756,
        "content": "When did you see it?",
        "words": generateWordTokens("When did you see it?"),
        "contentVi": "Bạn đã nhìn thấy nó khi nào?"
      },
      {
        "index": 46,
        "start": 117920,
        "end": 5478,
        "content": "I saw it two years ago.",
        "words": generateWordTokens("I saw it two years ago."),
        "contentVi": "Tôi đã nhìn thấy nó hai năm trước."
      },
      {
        "index": 47,
        "start": 120560,
        "end": 4761,
        "content": "Will you come back there again?",
        "words": generateWordTokens("Will you come back there again?"),
        "contentVi": "Bạn sẽ quay lại đó lần nữa chứ?"
      },
      {
        "index": 48,
        "start": 123280,
        "end": 5363,
        "content": "Of course. I'm looking forward to seeing",
        "words": generateWordTokens("Of course. I'm looking forward to seeing"),
        "contentVi": "Tất nhiên rồi. Tôi rất mong được nhìn thấy"
      },
      {
        "index": 49,
        "start": 125200,
        "end": 3445,
        "content": "again someday.",
        "words": generateWordTokens("again someday."),
        "contentVi": "một lần nữa vào một ngày nào đó."
      }
    ]
  },

  "luyen-nghe-a2-4rqduugtdpg": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 -Traffic Jam",
    "audio_url": "4RQDUuGtdpg",
    "repeat_offset": 95.36,
    "sentences": [
      {
        "index": 0,
        "start": 13679,
        "end": 4575,
        "content": "Well, I watch a lot but the one I like",
        "words": generateWordTokens("Well, I watch a lot but the one I like"),
        "contentVi": "Ờ, tôi xem nhiều nhưng có cái tôi thích"
      },
      {
        "index": 1,
        "start": 15759,
        "end": 5777,
        "content": "best is How It's Made.",
        "words": generateWordTokens("best is How It's Made."),
        "contentVi": "tốt nhất là nó được tạo ra như thế nào."
      },
      {
        "index": 2,
        "start": 18240,
        "end": 6018,
        "content": "Is that an international TV program?",
        "words": generateWordTokens("Is that an international TV program?"),
        "contentVi": "Đó có phải là chương trình truyền hình quốc tế không?"
      },
      {
        "index": 3,
        "start": 21520,
        "end": 5062,
        "content": "Yes, it is. It's available in Canada,",
        "words": generateWordTokens("Yes, it is. It's available in Canada,"),
        "contentVi": "Vâng, đúng vậy. Nó có sẵn ở Canada,"
      },
      {
        "index": 4,
        "start": 24240,
        "end": 5704,
        "content": "Europe, Australia, New Zealand,",
        "words": generateWordTokens("Europe, Australia, New Zealand,"),
        "contentVi": "Châu Âu, Úc, New Zealand,"
      },
      {
        "index": 5,
        "start": 26560,
        "end": 6026,
        "content": "Southeast Asia, and so on.",
        "words": generateWordTokens("Southeast Asia, and so on."),
        "contentVi": "Đông Nam Á, v.v."
      },
      {
        "index": 6,
        "start": 29920,
        "end": 4750,
        "content": "What is the TV program about?",
        "words": generateWordTokens("What is the TV program about?"),
        "contentVi": "Chương trình truyền hình nói về cái gì?"
      },
      {
        "index": 7,
        "start": 32559,
        "end": 3873,
        "content": "Its name somehow describes the content",
        "words": generateWordTokens("Its name somehow describes the content"),
        "contentVi": "Tên của nó phần nào mô tả được nội dung"
      },
      {
        "index": 8,
        "start": 34640,
        "end": 4595,
        "content": "which is about the process of making",
        "words": generateWordTokens("which is about the process of making"),
        "contentVi": "đó là về quá trình làm"
      },
      {
        "index": 9,
        "start": 36399,
        "end": 6196,
        "content": "things like lipsticks, balls, candy,",
        "words": generateWordTokens("things like lipsticks, balls, candy,"),
        "contentVi": "những thứ như son môi, quả bóng, kẹo,"
      },
      {
        "index": 10,
        "start": 39200,
        "end": 6918,
        "content": "toys, chocolate, and so on.",
        "words": generateWordTokens("toys, chocolate, and so on."),
        "contentVi": "đồ chơi, sô cô la, v.v."
      },
      {
        "index": 11,
        "start": 42559,
        "end": 6363,
        "content": "How often do you watch that TV program?",
        "words": generateWordTokens("How often do you watch that TV program?"),
        "contentVi": "Bạn có thường xuyên xem chương trình TV đó không?"
      },
      {
        "index": 12,
        "start": 46079,
        "end": 5727,
        "content": "Almost every day after dinner.",
        "words": generateWordTokens("Almost every day after dinner."),
        "contentVi": "Hầu như mỗi ngày sau bữa tối."
      },
      {
        "index": 13,
        "start": 48879,
        "end": 5249,
        "content": "Who watches that program with you?",
        "words": generateWordTokens("Who watches that program with you?"),
        "contentVi": "Ai xem chương trình đó với bạn?"
      },
      {
        "index": 14,
        "start": 51760,
        "end": 4052,
        "content": "My family watches it together. My",
        "words": generateWordTokens("My family watches it together. My"),
        "contentVi": "Gia đình tôi cùng nhau xem nó. Của tôi"
      },
      {
        "index": 15,
        "start": 54079,
        "end": 3895,
        "content": "younger brother can't wait to turn on",
        "words": generateWordTokens("younger brother can't wait to turn on"),
        "contentVi": "em trai nóng lòng muốn bật lên"
      },
      {
        "index": 16,
        "start": 55760,
        "end": 4535,
        "content": "the TV.",
        "words": generateWordTokens("the TV."),
        "contentVi": "cái tivi."
      },
      {
        "index": 17,
        "start": 57920,
        "end": 4537,
        "content": "What channel is it on?",
        "words": generateWordTokens("What channel is it on?"),
        "contentVi": "Nó ở kênh nào?"
      },
      {
        "index": 18,
        "start": 60239,
        "end": 4221,
        "content": "A very common one, Discovery Channel,",
        "words": generateWordTokens("A very common one, Discovery Channel,"),
        "contentVi": "Một kênh rất phổ biến, Discovery Channel,"
      },
      {
        "index": 19,
        "start": 62399,
        "end": 4462,
        "content": "which focuses on popular science,",
        "words": generateWordTokens("which focuses on popular science,"),
        "contentVi": "tập trung vào khoa học đại chúng,"
      },
      {
        "index": 20,
        "start": 64400,
        "end": 5424,
        "content": "technology, and history.",
        "words": generateWordTokens("technology, and history."),
        "contentVi": "công nghệ và lịch sử."
      },
      {
        "index": 21,
        "start": 66799,
        "end": 5028,
        "content": "Why do you like that TV program?",
        "words": generateWordTokens("Why do you like that TV program?"),
        "contentVi": "Tại sao bạn thích chương trình truyền hình đó?"
      },
      {
        "index": 22,
        "start": 69760,
        "end": 4390,
        "content": "I love learning new things, especially",
        "words": generateWordTokens("I love learning new things, especially"),
        "contentVi": "Tôi thích học những điều mới, đặc biệt là"
      },
      {
        "index": 23,
        "start": 71760,
        "end": 3832,
        "content": "about how everything is produced. I",
        "words": generateWordTokens("about how everything is produced. I"),
        "contentVi": "về cách mọi thứ được sản xuất. TÔI"
      },
      {
        "index": 24,
        "start": 74080,
        "end": 4153,
        "content": "would love to run a business about",
        "words": generateWordTokens("would love to run a business about"),
        "contentVi": "rất thích điều hành một doanh nghiệp về"
      },
      {
        "index": 25,
        "start": 75520,
        "end": 5596,
        "content": "handmade cosmetics.",
        "words": generateWordTokens("handmade cosmetics."),
        "contentVi": "mỹ phẩm thủ công."
      },
      {
        "index": 26,
        "start": 78159,
        "end": 5038,
        "content": "How does that TV program change you?",
        "words": generateWordTokens("How does that TV program change you?"),
        "contentVi": "Chương trình truyền hình đó thay đổi bạn như thế nào?"
      },
      {
        "index": 27,
        "start": 81040,
        "end": 4160,
        "content": "I know more about the world around me.",
        "words": generateWordTokens("I know more about the world around me."),
        "contentVi": "Tôi biết nhiều hơn về thế giới xung quanh tôi."
      },
      {
        "index": 28,
        "start": 83119,
        "end": 4324,
        "content": "It also supports me in my career path to",
        "words": generateWordTokens("It also supports me in my career path to"),
        "contentVi": "Nó cũng hỗ trợ tôi trên con đường sự nghiệp"
      },
      {
        "index": 29,
        "start": 85119,
        "end": 4966,
        "content": "make my dream come true.",
        "words": generateWordTokens("make my dream come true."),
        "contentVi": "biến giấc mơ của tôi thành hiện thực."
      },
      {
        "index": 30,
        "start": 87360,
        "end": 4806,
        "content": "Who is its target audience?",
        "words": generateWordTokens("Who is its target audience?"),
        "contentVi": "Đối tượng mục tiêu của nó là ai?"
      },
      {
        "index": 31,
        "start": 90000,
        "end": 4249,
        "content": "It particularly aims at families and",
        "words": generateWordTokens("It particularly aims at families and"),
        "contentVi": "Nó đặc biệt hướng tới các gia đình và"
      },
      {
        "index": 32,
        "start": 92079,
        "end": 4172,
        "content": "younger audiences.",
        "words": generateWordTokens("younger audiences."),
        "contentVi": "khán giả trẻ hơn."
      },
      {
        "index": 33,
        "start": 94159,
        "end": 3855,
        "content": "Would you recommend that TV program to",
        "words": generateWordTokens("Would you recommend that TV program to"),
        "contentVi": "Bạn có muốn giới thiệu chương trình truyền hình đó cho"
      },
      {
        "index": 34,
        "start": 96159,
        "end": 3777,
        "content": "your friends?",
        "words": generateWordTokens("your friends?"),
        "contentVi": "bạn bè của bạn?"
      },
      {
        "index": 35,
        "start": 97920,
        "end": 6058,
        "content": "Yes, of course. They would be crazy",
        "words": generateWordTokens("Yes, of course. They would be crazy"),
        "contentVi": "Vâng tất nhiên. Họ sẽ phát điên"
      },
      {
        "index": 36,
        "start": 99840,
        "end": 4140,
        "content": "about the program, I bet.",
        "words": generateWordTokens("about the program, I bet."),
        "contentVi": "về chương trình, tôi cá là vậy."
      }
    ]
  },

  "luyen-nghe-a2-hgan-orndd0": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 -Traffic Jam",
    "audio_url": "HGAn-OrNdD0",
    "repeat_offset": 61.68,
    "sentences": [
      {
        "index": 0,
        "start": 13200,
        "end": 5133,
        "content": "Not at all. I feel annoyed.",
        "words": generateWordTokens("Not at all. I feel annoyed."),
        "contentVi": "Không có gì. Tôi cảm thấy khó chịu."
      },
      {
        "index": 1,
        "start": 16320,
        "end": 3696,
        "content": "Why does it happen?",
        "words": generateWordTokens("Why does it happen?"),
        "contentVi": "Tại sao nó xảy ra?"
      },
      {
        "index": 2,
        "start": 18320,
        "end": 4498,
        "content": "Because there are too many vehicles on",
        "words": generateWordTokens("Because there are too many vehicles on"),
        "contentVi": "Vì trên đường có quá nhiều xe"
      },
      {
        "index": 3,
        "start": 20000,
        "end": 5780,
        "content": "the streets during rush hours. I bet.",
        "words": generateWordTokens("the streets during rush hours. I bet."),
        "contentVi": "đường phố trong giờ cao điểm. Tôi cá là."
      },
      {
        "index": 4,
        "start": 22800,
        "end": 5223,
        "content": "How often do you sit in a traffic jam?",
        "words": generateWordTokens("How often do you sit in a traffic jam?"),
        "contentVi": "Bạn có thường xuyên ngồi trong tình trạng kẹt xe không?"
      },
      {
        "index": 5,
        "start": 25760,
        "end": 4426,
        "content": "Just every day when I finish office hour",
        "words": generateWordTokens("Just every day when I finish office hour"),
        "contentVi": "Chỉ mỗi ngày khi tôi kết thúc giờ hành chính"
      },
      {
        "index": 6,
        "start": 28000,
        "end": 3948,
        "content": "and go back home.",
        "words": generateWordTokens("and go back home."),
        "contentVi": "và trở về nhà."
      },
      {
        "index": 7,
        "start": 30160,
        "end": 4190,
        "content": "What time in a day are you usually",
        "words": generateWordTokens("What time in a day are you usually"),
        "contentVi": "Bạn thường đến vào lúc mấy giờ trong ngày"
      },
      {
        "index": 8,
        "start": 31920,
        "end": 6432,
        "content": "caught in a traffic jam?",
        "words": generateWordTokens("caught in a traffic jam?"),
        "contentVi": "bị kẹt xe?"
      },
      {
        "index": 9,
        "start": 34320,
        "end": 5874,
        "content": "In rush hour at 7:00 a.m. and 5:00 p.m.",
        "words": generateWordTokens("In rush hour at 7:00 a.m. and 5:00 p.m."),
        "contentVi": "Trong giờ cao điểm lúc 7 giờ sáng và 5 giờ chiều."
      },
      {
        "index": 10,
        "start": 38320,
        "end": 4038,
        "content": "How long does it take to escape from the",
        "words": generateWordTokens("How long does it take to escape from the"),
        "contentVi": "Mất bao lâu để thoát khỏi"
      },
      {
        "index": 11,
        "start": 40160,
        "end": 4599,
        "content": "traffic jam?",
        "words": generateWordTokens("traffic jam?"),
        "contentVi": "tắc đường?"
      },
      {
        "index": 12,
        "start": 42320,
        "end": 4281,
        "content": "At least half an hour.",
        "words": generateWordTokens("At least half an hour."),
        "contentVi": "Ít nhất nửa giờ."
      },
      {
        "index": 13,
        "start": 44719,
        "end": 3246,
        "content": "What do you do while waiting in a long",
        "words": generateWordTokens("What do you do while waiting in a long"),
        "contentVi": "Bạn làm gì trong khi chờ đợi lâu"
      },
      {
        "index": 14,
        "start": 46559,
        "end": 4527,
        "content": "line?",
        "words": generateWordTokens("line?"),
        "contentVi": "đường kẻ?"
      },
      {
        "index": 15,
        "start": 47920,
        "end": 5007,
        "content": "I often glance at my watch, actually.",
        "words": generateWordTokens("I often glance at my watch, actually."),
        "contentVi": "Thực ra tôi thường liếc nhìn đồng hồ của mình."
      },
      {
        "index": 16,
        "start": 51039,
        "end": 3972,
        "content": "Have you ever had any trouble caused by",
        "words": generateWordTokens("Have you ever had any trouble caused by"),
        "contentVi": "Bạn đã bao giờ gặp rắc rối nào do"
      },
      {
        "index": 17,
        "start": 52879,
        "end": 4294,
        "content": "a traffic jam?",
        "words": generateWordTokens("a traffic jam?"),
        "contentVi": "ùn tắc giao thông?"
      },
      {
        "index": 18,
        "start": 54960,
        "end": 4935,
        "content": "Yes, just yesterday I was late for an",
        "words": generateWordTokens("Yes, just yesterday I was late for an"),
        "contentVi": "Vâng, mới hôm qua tôi đã đến muộn"
      },
      {
        "index": 19,
        "start": 57120,
        "end": 4937,
        "content": "important meeting with my clients.",
        "words": generateWordTokens("important meeting with my clients."),
        "contentVi": "cuộc họp quan trọng với khách hàng của tôi."
      },
      {
        "index": 20,
        "start": 59840,
        "end": 4140,
        "content": "How has the traffic situation changed",
        "words": generateWordTokens("How has the traffic situation changed"),
        "contentVi": "Tình hình giao thông đã thay đổi như thế nào"
      },
      {
        "index": 21,
        "start": 62000,
        "end": 3662,
        "content": "recently?",
        "words": generateWordTokens("recently?"),
        "contentVi": "gần đây?"
      },
      {
        "index": 22,
        "start": 63920,
        "end": 6104,
        "content": "There are more vehicles which makes",
        "words": generateWordTokens("There are more vehicles which makes"),
        "contentVi": "Có nhiều phương tiện hơn khiến"
      },
      {
        "index": 23,
        "start": 65600,
        "end": 4426,
        "content": "traffic jam more and more serious.",
        "words": generateWordTokens("traffic jam more and more serious."),
        "contentVi": "ùn tắc giao thông ngày càng nghiêm trọng."
      }
    ]
  },

  "luyen-nghe-a2-ihudpavlpis": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 -LUẬT PHÁP",
    "audio_url": "IHudPAVLpIs",
    "repeat_offset": 68.0,
    "sentences": [
      {
        "index": 0,
        "start": 12080,
        "end": 4812,
        "content": "I like the traffic law of wearing the",
        "words": generateWordTokens("I like the traffic law of wearing the"),
        "contentVi": "Tôi thích luật giao thông khi đeo"
      },
      {
        "index": 1,
        "start": 13920,
        "end": 6014,
        "content": "helmet when traveling by motorbike.",
        "words": generateWordTokens("helmet when traveling by motorbike."),
        "contentVi": "đội mũ bảo hiểm khi đi xe máy."
      },
      {
        "index": 2,
        "start": 16880,
        "end": 5297,
        "content": "Is that an international law?",
        "words": generateWordTokens("Is that an international law?"),
        "contentVi": "Đó có phải là luật quốc tế không?"
      },
      {
        "index": 3,
        "start": 19920,
        "end": 3060,
        "content": "Yes, people around the world follow this",
        "words": generateWordTokens("Yes, people around the world follow this"),
        "contentVi": "Vâng, mọi người trên khắp thế giới đều làm theo điều này"
      },
      {
        "index": 4,
        "start": 22160,
        "end": 3301,
        "content": "law.",
        "words": generateWordTokens("law."),
        "contentVi": "pháp luật."
      },
      {
        "index": 5,
        "start": 22960,
        "end": 4582,
        "content": "When was it issued?",
        "words": generateWordTokens("When was it issued?"),
        "contentVi": "Khi nào nó được ban hành?"
      },
      {
        "index": 6,
        "start": 25439,
        "end": 3945,
        "content": "I'm not quite sure, but I guess a long",
        "words": generateWordTokens("I'm not quite sure, but I guess a long"),
        "contentVi": "Tôi không chắc chắn lắm, nhưng tôi đoán là lâu"
      },
      {
        "index": 7,
        "start": 27519,
        "end": 4349,
        "content": "time ago.",
        "words": generateWordTokens("time ago."),
        "contentVi": "thời gian trước đây."
      },
      {
        "index": 8,
        "start": 29359,
        "end": 5229,
        "content": "Who told you that law?",
        "words": generateWordTokens("Who told you that law?"),
        "contentVi": "Ai bảo bạn luật đó?"
      },
      {
        "index": 9,
        "start": 31840,
        "end": 5392,
        "content": "I learned it at school.",
        "words": generateWordTokens("I learned it at school."),
        "contentVi": "Tôi đã học nó ở trường."
      },
      {
        "index": 10,
        "start": 34559,
        "end": 4596,
        "content": "Is it easy to follow that law?",
        "words": generateWordTokens("Is it easy to follow that law?"),
        "contentVi": "Việc tuân theo luật đó có dễ dàng không?"
      },
      {
        "index": 11,
        "start": 37200,
        "end": 4437,
        "content": "Yes, it is. It doesn't cause any",
        "words": generateWordTokens("Yes, it is. It doesn't cause any"),
        "contentVi": "Vâng, đúng vậy. Nó không gây ra bất kỳ"
      },
      {
        "index": 12,
        "start": 39120,
        "end": 4919,
        "content": "inconvenience at all.",
        "words": generateWordTokens("inconvenience at all."),
        "contentVi": "bất tiện chút nào."
      },
      {
        "index": 13,
        "start": 41600,
        "end": 4442,
        "content": "What do you think about that law?",
        "words": generateWordTokens("What do you think about that law?"),
        "contentVi": "Bạn nghĩ sao về điều luật đó?"
      },
      {
        "index": 14,
        "start": 44000,
        "end": 3724,
        "content": "The traffic law is so necessary for",
        "words": generateWordTokens("The traffic law is so necessary for"),
        "contentVi": "Luật giao thông rất cần thiết đối với"
      },
      {
        "index": 15,
        "start": 46000,
        "end": 3246,
        "content": "traffic participants when they're on the",
        "words": generateWordTokens("traffic participants when they're on the"),
        "contentVi": "người tham gia giao thông khi họ đang trên đường"
      },
      {
        "index": 16,
        "start": 47680,
        "end": 3407,
        "content": "road.",
        "words": generateWordTokens("road."),
        "contentVi": "đường."
      },
      {
        "index": 17,
        "start": 49200,
        "end": 3489,
        "content": "What benefit can you get from following",
        "words": generateWordTokens("What benefit can you get from following"),
        "contentVi": "Bạn có thể nhận được lợi ích gì khi theo dõi"
      },
      {
        "index": 18,
        "start": 51039,
        "end": 3411,
        "content": "that law?",
        "words": generateWordTokens("that law?"),
        "contentVi": "luật đó?"
      },
      {
        "index": 19,
        "start": 52640,
        "end": 3013,
        "content": "It may keep me safe from traffic",
        "words": generateWordTokens("It may keep me safe from traffic"),
        "contentVi": "Nó có thể giúp tôi an toàn khỏi giao thông"
      },
      {
        "index": 20,
        "start": 54399,
        "end": 4135,
        "content": "accidents.",
        "words": generateWordTokens("accidents."),
        "contentVi": "tai nạn."
      },
      {
        "index": 21,
        "start": 55600,
        "end": 5015,
        "content": "Why should people obey the law strictly?",
        "words": generateWordTokens("Why should people obey the law strictly?"),
        "contentVi": "Tại sao người dân phải tuân thủ pháp luật một cách nghiêm ngặt?"
      },
      {
        "index": 22,
        "start": 58480,
        "end": 5338,
        "content": "Following law is a good way to protect",
        "words": generateWordTokens("Following law is a good way to protect"),
        "contentVi": "Tuân theo pháp luật là một cách tốt để bảo vệ"
      },
      {
        "index": 23,
        "start": 60559,
        "end": 5182,
        "content": "themselves as well as others.",
        "words": generateWordTokens("themselves as well as others."),
        "contentVi": "bản thân họ cũng như những người khác."
      },
      {
        "index": 24,
        "start": 63760,
        "end": 4144,
        "content": "What can be done to encourage people to",
        "words": generateWordTokens("What can be done to encourage people to"),
        "contentVi": "Có thể làm gì để khuyến khích mọi người"
      },
      {
        "index": 25,
        "start": 65680,
        "end": 4786,
        "content": "follow the law?",
        "words": generateWordTokens("follow the law?"),
        "contentVi": "tuân theo pháp luật?"
      },
      {
        "index": 26,
        "start": 67840,
        "end": 4468,
        "content": "Obeying law is people's responsibility.",
        "words": generateWordTokens("Obeying law is people's responsibility."),
        "contentVi": "Tuân thủ pháp luật là trách nhiệm của mọi người."
      },
      {
        "index": 27,
        "start": 70400,
        "end": 5550,
        "content": "If they go against the law, they'll put",
        "words": generateWordTokens("If they go against the law, they'll put"),
        "contentVi": "Nếu họ đi ngược lại pháp luật, họ sẽ đưa"
      },
      {
        "index": 28,
        "start": 72240,
        "end": 3712,
        "content": "themselves in trouble.",
        "words": generateWordTokens("themselves in trouble."),
        "contentVi": "bản thân họ đang gặp rắc rối."
      },
      {
        "index": 29,
        "start": 76010,
        "end": 4146,
        "content": "[Music]",
        "words": generateWordTokens("[Music]"),
        "contentVi": "[Âm nhạc]"
      },
      {
        "index": 30,
        "start": 77680,
        "end": 4318,
        "content": "What law do you like?",
        "words": generateWordTokens("What law do you like?"),
        "contentVi": "Bạn thích luật nào?"
      }
    ]
  },

  "luyen-nghe-a2-qu_wdqgj0z8": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 -NATURAL SCENERY",
    "audio_url": "QU_WDQGj0Z8",
    "repeat_offset": 80.32,
    "sentences": [
      {
        "index": 0,
        "start": 13440,
        "end": 5293,
        "content": "Yes, I do. Being close to nature helps",
        "words": generateWordTokens("Yes, I do. Being close to nature helps"),
        "contentVi": "Em đồng ý. Gần gũi với thiên nhiên sẽ giúp ích"
      },
      {
        "index": 1,
        "start": 16240,
        "end": 4336,
        "content": "me release stress and worry.",
        "words": generateWordTokens("me release stress and worry."),
        "contentVi": "tôi giải tỏa căng thẳng và lo lắng."
      },
      {
        "index": 2,
        "start": 18720,
        "end": 4338,
        "content": "What's the most impressive natural",
        "words": generateWordTokens("What's the most impressive natural"),
        "contentVi": "Điều gì ấn tượng nhất tự nhiên"
      },
      {
        "index": 3,
        "start": 20560,
        "end": 4261,
        "content": "scenery you've ever seen?",
        "words": generateWordTokens("scenery you've ever seen?"),
        "contentVi": "phong cảnh bạn từng thấy?"
      },
      {
        "index": 4,
        "start": 23039,
        "end": 4023,
        "content": "That's the horseshoe of the Colorado",
        "words": generateWordTokens("That's the horseshoe of the Colorado"),
        "contentVi": "Đó là móng ngựa của Colorado"
      },
      {
        "index": 5,
        "start": 24800,
        "end": 4504,
        "content": "River in Arizona. It's such a great",
        "words": generateWordTokens("River in Arizona. It's such a great"),
        "contentVi": "Sông ở Arizona. Nó thật tuyệt vời"
      },
      {
        "index": 6,
        "start": 27039,
        "end": 4187,
        "content": "scenic place on Earth.",
        "words": generateWordTokens("scenic place on Earth."),
        "contentVi": "địa điểm danh lam thắng cảnh trên trái đất."
      },
      {
        "index": 7,
        "start": 29279,
        "end": 5309,
        "content": "When did you see it?",
        "words": generateWordTokens("When did you see it?"),
        "contentVi": "Bạn đã nhìn thấy nó khi nào?"
      },
      {
        "index": 8,
        "start": 31199,
        "end": 5231,
        "content": "I visited the place last summer holiday.",
        "words": generateWordTokens("I visited the place last summer holiday."),
        "contentVi": "Tôi đã đến thăm nơi này vào kỳ nghỉ hè năm ngoái."
      },
      {
        "index": 9,
        "start": 34559,
        "end": 4436,
        "content": "Who went with you?",
        "words": generateWordTokens("Who went with you?"),
        "contentVi": "Ai đã đi cùng bạn?"
      },
      {
        "index": 10,
        "start": 36399,
        "end": 4356,
        "content": "I went there with my family. We camped",
        "words": generateWordTokens("I went there with my family. We camped"),
        "contentVi": "Tôi đã đến đó với gia đình tôi. Chúng tôi cắm trại"
      },
      {
        "index": 11,
        "start": 38960,
        "end": 4119,
        "content": "near the place.",
        "words": generateWordTokens("near the place."),
        "contentVi": "gần nơi đó."
      },
      {
        "index": 12,
        "start": 40719,
        "end": 4362,
        "content": "What's special about it?",
        "words": generateWordTokens("What's special about it?"),
        "contentVi": "Nó có gì đặc biệt?"
      },
      {
        "index": 13,
        "start": 43040,
        "end": 4123,
        "content": "I'm fond of the great nature there. It's",
        "words": generateWordTokens("I'm fond of the great nature there. It's"),
        "contentVi": "Tôi thích thiên nhiên tuyệt vời ở đó. Của nó"
      },
      {
        "index": 14,
        "start": 45040,
        "end": 3724,
        "content": "a horseshoe shaped meander of Colorado",
        "words": generateWordTokens("a horseshoe shaped meander of Colorado"),
        "contentVi": "khúc quanh hình móng ngựa của Colorado"
      },
      {
        "index": 15,
        "start": 47120,
        "end": 4287,
        "content": "River.",
        "words": generateWordTokens("River."),
        "contentVi": "Dòng sông."
      },
      {
        "index": 16,
        "start": 48719,
        "end": 5409,
        "content": "How has it changed recently?",
        "words": generateWordTokens("How has it changed recently?"),
        "contentVi": "Gần đây nó đã thay đổi như thế nào?"
      },
      {
        "index": 17,
        "start": 51360,
        "end": 4691,
        "content": "It doesn't change much, actually.",
        "words": generateWordTokens("It doesn't change much, actually."),
        "contentVi": "Thực ra nó không thay đổi nhiều."
      },
      {
        "index": 18,
        "start": 54079,
        "end": 3895,
        "content": "What's the next natural scenery you",
        "words": generateWordTokens("What's the next natural scenery you"),
        "contentVi": "Phong cảnh thiên nhiên tiếp theo bạn là gì?"
      },
      {
        "index": 19,
        "start": 56000,
        "end": 3976,
        "content": "would like to visit?",
        "words": generateWordTokens("would like to visit?"),
        "contentVi": "muốn ghé thăm?"
      },
      {
        "index": 20,
        "start": 57920,
        "end": 4537,
        "content": "My next destination would be the maroon",
        "words": generateWordTokens("My next destination would be the maroon"),
        "contentVi": "Điểm đến tiếp theo của tôi sẽ là hạt dẻ"
      },
      {
        "index": 21,
        "start": 59920,
        "end": 4140,
        "content": "bells in Colorado. I fell in love with",
        "words": generateWordTokens("bells in Colorado. I fell in love with"),
        "contentVi": "chuông ở Colorado. Tôi đã yêu"
      },
      {
        "index": 22,
        "start": 62399,
        "end": 3263,
        "content": "mountain ranges and yellow flowers",
        "words": generateWordTokens("mountain ranges and yellow flowers"),
        "contentVi": "dãy núi và hoa màu vàng"
      },
      {
        "index": 23,
        "start": 64000,
        "end": 3264,
        "content": "there.",
        "words": generateWordTokens("there."),
        "contentVi": "ở đó."
      },
      {
        "index": 24,
        "start": 65600,
        "end": 3905,
        "content": "What can people get from visiting",
        "words": generateWordTokens("What can people get from visiting"),
        "contentVi": "Mọi người có thể nhận được gì khi ghé thăm"
      },
      {
        "index": 25,
        "start": 67200,
        "end": 4787,
        "content": "natural places?",
        "words": generateWordTokens("natural places?"),
        "contentVi": "địa điểm tự nhiên?"
      },
      {
        "index": 26,
        "start": 69439,
        "end": 4069,
        "content": "People will get closer to mother nature.",
        "words": generateWordTokens("People will get closer to mother nature."),
        "contentVi": "Con người sẽ đến gần hơn với mẹ thiên nhiên."
      },
      {
        "index": 27,
        "start": 71920,
        "end": 4392,
        "content": "Children have more motivation to",
        "words": generateWordTokens("Children have more motivation to"),
        "contentVi": "Trẻ có thêm động lực để"
      },
      {
        "index": 28,
        "start": 73439,
        "end": 4874,
        "content": "discover the world around them.",
        "words": generateWordTokens("discover the world around them."),
        "contentVi": "khám phá thế giới xung quanh họ."
      },
      {
        "index": 29,
        "start": 76240,
        "end": 3916,
        "content": "What are some famous natural attractions",
        "words": generateWordTokens("What are some famous natural attractions"),
        "contentVi": "Một số thắng cảnh thiên nhiên nổi tiếng"
      },
      {
        "index": 30,
        "start": 78240,
        "end": 3997,
        "content": "in your country?",
        "words": generateWordTokens("in your country?"),
        "contentVi": "ở nước bạn?"
      },
      {
        "index": 31,
        "start": 80080,
        "end": 4479,
        "content": "There are many such as Death Valley,",
        "words": generateWordTokens("There are many such as Death Valley,"),
        "contentVi": "Có rất nhiều như Thung lũng chết,"
      },
      {
        "index": 32,
        "start": 82159,
        "end": 5693,
        "content": "Niagara Falls, the Redwoods, and the",
        "words": generateWordTokens("Niagara Falls, the Redwoods, and the"),
        "contentVi": "Thác Niagara, Rừng Đỏ và"
      },
      {
        "index": 33,
        "start": 84479,
        "end": 5395,
        "content": "Grand Canyon to name a few.",
        "words": generateWordTokens("Grand Canyon to name a few."),
        "contentVi": "Grand Canyon để kể tên một vài."
      },
      {
        "index": 34,
        "start": 87770,
        "end": 2108,
        "content": "[music]",
        "words": generateWordTokens("[music]"),
        "contentVi": "[âm nhạc]"
      }
    ]
  },

  "luyen-nghe-a2-kz76rm8hg80": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 -A MUSIC BAND",
    "audio_url": "kZ76rM8hG80",
    "repeat_offset": 75.44,
    "sentences": [
      {
        "index": 0,
        "start": 13040,
        "end": 4733,
        "content": "I'm a big fan of One Direction. There",
        "words": generateWordTokens("I'm a big fan of One Direction. There"),
        "contentVi": "Tôi là một fan hâm mộ lớn của One Direction. Ở đó"
      },
      {
        "index": 1,
        "start": 15280,
        "end": 5535,
        "content": "are five singers in the band.",
        "words": generateWordTokens("are five singers in the band."),
        "contentVi": "có năm ca sĩ trong ban nhạc."
      },
      {
        "index": 2,
        "start": 17760,
        "end": 5537,
        "content": "Is it famous around the world?",
        "words": generateWordTokens("Is it famous around the world?"),
        "contentVi": "Nó có nổi tiếng khắp thế giới không?"
      },
      {
        "index": 3,
        "start": 20800,
        "end": 5061,
        "content": "Yes, it is. The band is well known",
        "words": generateWordTokens("Yes, it is. The band is well known"),
        "contentVi": "Vâng, đúng vậy. Ban nhạc được nhiều người biết đến"
      },
      {
        "index": 4,
        "start": 23279,
        "end": 4263,
        "content": "around the world. Almost all teenagers",
        "words": generateWordTokens("around the world. Almost all teenagers"),
        "contentVi": "trên khắp thế giới. Hầu như tất cả thanh thiếu niên"
      },
      {
        "index": 5,
        "start": 25840,
        "end": 4186,
        "content": "love them.",
        "words": generateWordTokens("love them."),
        "contentVi": "yêu họ."
      },
      {
        "index": 6,
        "start": 27519,
        "end": 4908,
        "content": "What's their taste of music?",
        "words": generateWordTokens("What's their taste of music?"),
        "contentVi": "Sở thích âm nhạc của họ là gì?"
      },
      {
        "index": 7,
        "start": 30000,
        "end": 5470,
        "content": "They sing pop music. Their most famous",
        "words": generateWordTokens("They sing pop music. Their most famous"),
        "contentVi": "Họ hát nhạc pop. Nổi tiếng nhất của họ"
      },
      {
        "index": 8,
        "start": 32399,
        "end": 5313,
        "content": "song may be What Makes You Beautiful?",
        "words": generateWordTokens("song may be What Makes You Beautiful?"),
        "contentVi": "bài hát có thể là Điều gì khiến bạn xinh đẹp?"
      },
      {
        "index": 9,
        "start": 35440,
        "end": 4834,
        "content": "Are they good at dancing?",
        "words": generateWordTokens("Are they good at dancing?"),
        "contentVi": "Họ có giỏi nhảy không?"
      },
      {
        "index": 10,
        "start": 37680,
        "end": 4838,
        "content": "Yes, I think so. I fall in love with",
        "words": generateWordTokens("Yes, I think so. I fall in love with"),
        "contentVi": "Vâng, tôi nghĩ vậy. Tôi yêu"
      },
      {
        "index": 11,
        "start": 40239,
        "end": 4921,
        "content": "their every step.",
        "words": generateWordTokens("their every step."),
        "contentVi": "từng bước đi của họ."
      },
      {
        "index": 12,
        "start": 42480,
        "end": 5641,
        "content": "Have you ever seen them in real life?",
        "words": generateWordTokens("Have you ever seen them in real life?"),
        "contentVi": "Bạn đã bao giờ nhìn thấy họ ngoài đời chưa?"
      },
      {
        "index": 13,
        "start": 45120,
        "end": 5164,
        "content": "Nope. I just watch them on media. I wish",
        "words": generateWordTokens("Nope. I just watch them on media. I wish"),
        "contentVi": "Không. Tôi chỉ xem chúng trên phương tiện truyền thông. tôi ước"
      },
      {
        "index": 14,
        "start": 48079,
        "end": 5089,
        "content": "I will see them one day.",
        "words": generateWordTokens("I will see them one day."),
        "contentVi": "Tôi sẽ gặp họ vào một ngày nào đó."
      },
      {
        "index": 15,
        "start": 50239,
        "end": 5411,
        "content": "How often do you come to their show?",
        "words": generateWordTokens("How often do you come to their show?"),
        "contentVi": "Bạn có thường xuyên đến buổi biểu diễn của họ không?"
      },
      {
        "index": 16,
        "start": 53120,
        "end": 4453,
        "content": "I watch videos almost every day.",
        "words": generateWordTokens("I watch videos almost every day."),
        "contentVi": "Tôi xem video hầu như mỗi ngày."
      },
      {
        "index": 17,
        "start": 55600,
        "end": 3736,
        "content": "Listening to their songs helps me chill",
        "words": generateWordTokens("Listening to their songs helps me chill"),
        "contentVi": "Nghe những bài hát của họ giúp tôi thư giãn"
      },
      {
        "index": 18,
        "start": 57520,
        "end": 4617,
        "content": "out.",
        "words": generateWordTokens("out."),
        "contentVi": "ngoài."
      },
      {
        "index": 19,
        "start": 59280,
        "end": 5419,
        "content": "Can you sing their songs?",
        "words": generateWordTokens("Can you sing their songs?"),
        "contentVi": "Bạn có thể hát những bài hát của họ không?"
      },
      {
        "index": 20,
        "start": 62079,
        "end": 4623,
        "content": "Yes, but only one song. I just keep",
        "words": generateWordTokens("Yes, but only one song. I just keep"),
        "contentVi": "Có, nhưng chỉ có một bài hát thôi. tôi chỉ giữ"
      },
      {
        "index": 21,
        "start": 64640,
        "end": 3904,
        "content": "singing it over and over again every",
        "words": generateWordTokens("singing it over and over again every"),
        "contentVi": "hát đi hát lại mỗi lần"
      },
      {
        "index": 22,
        "start": 66640,
        "end": 3987,
        "content": "day.",
        "words": generateWordTokens("day."),
        "contentVi": "ngày."
      },
      {
        "index": 23,
        "start": 68479,
        "end": 3989,
        "content": "Do your friends like them?",
        "words": generateWordTokens("Do your friends like them?"),
        "contentVi": "Bạn bè của bạn có thích họ không?"
      },
      {
        "index": 24,
        "start": 70560,
        "end": 5271,
        "content": "Of course. We usually watch their",
        "words": generateWordTokens("Of course. We usually watch their"),
        "contentVi": "Tất nhiên rồi. Chúng tôi thường xem"
      },
      {
        "index": 25,
        "start": 72400,
        "end": 6232,
        "content": "performances and discuss it together.",
        "words": generateWordTokens("performances and discuss it together."),
        "contentVi": "biểu diễn và cùng nhau thảo luận."
      },
      {
        "index": 26,
        "start": 75760,
        "end": 8036,
        "content": "Do they have antifans?",
        "words": generateWordTokens("Do they have antifans?"),
        "contentVi": "Họ có antifan không?"
      },
      {
        "index": 27,
        "start": 78560,
        "end": 5239,
        "content": "Yes, every famous singer has anti fans.",
        "words": generateWordTokens("Yes, every famous singer has anti fans."),
        "contentVi": "Đúng là ca sĩ nổi tiếng nào cũng có antifan."
      }
    ]
  },

  "luyen-nghe-a2-izpocyz3jga": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 - Lễ Hội",
    "audio_url": "iZpOcYz3JGA",
    "repeat_offset": 102.64,
    "sentences": [
      {
        "index": 0,
        "start": 12000,
        "end": 4972,
        "content": "your country?",
        "words": generateWordTokens("your country?"),
        "contentVi": "đất nước của bạn?"
      },
      {
        "index": 1,
        "start": 14000,
        "end": 6014,
        "content": "There are many. New Year's Day, Martin",
        "words": generateWordTokens("There are many. New Year's Day, Martin"),
        "contentVi": "Có rất nhiều. Ngày đầu năm mới, Martin"
      },
      {
        "index": 2,
        "start": 16960,
        "end": 7057,
        "content": "Luther King Day, Valentine's Day, St.",
        "words": generateWordTokens("Luther King Day, Valentine's Day, St."),
        "contentVi": "Ngày Luther King, Ngày lễ tình nhân, Ngày lễ St."
      },
      {
        "index": 3,
        "start": 20000,
        "end": 6020,
        "content": "Patrick's Day, Easter, etc.",
        "words": generateWordTokens("Patrick's Day, Easter, etc."),
        "contentVi": "Ngày Thánh Patrick, lễ Phục sinh, v.v."
      },
      {
        "index": 4,
        "start": 24000,
        "end": 4584,
        "content": "What is the most important festival in",
        "words": generateWordTokens("What is the most important festival in"),
        "contentVi": "lễ hội quan trọng nhất ở việt nam là gì"
      },
      {
        "index": 5,
        "start": 26000,
        "end": 4666,
        "content": "your country? I believe that New Year's",
        "words": generateWordTokens("your country? I believe that New Year's"),
        "contentVi": "đất nước của bạn? Tôi tin rằng năm mới"
      },
      {
        "index": 6,
        "start": 28560,
        "end": 4589,
        "content": "Day is the most important one since it's",
        "words": generateWordTokens("Day is the most important one since it's"),
        "contentVi": "Ngày là ngày quan trọng nhất vì nó"
      },
      {
        "index": 7,
        "start": 30640,
        "end": 4431,
        "content": "a chance for family reunion and parties.",
        "words": generateWordTokens("a chance for family reunion and parties."),
        "contentVi": "cơ hội đoàn tụ gia đình và tiệc tùng."
      },
      {
        "index": 8,
        "start": 33120,
        "end": 3793,
        "content": "People gather together to welcome the",
        "words": generateWordTokens("People gather together to welcome the"),
        "contentVi": "Mọi người tụ tập lại để chào đón"
      },
      {
        "index": 9,
        "start": 35040,
        "end": 3874,
        "content": "new year.",
        "words": generateWordTokens("new year."),
        "contentVi": "năm mới."
      },
      {
        "index": 10,
        "start": 36880,
        "end": 4917,
        "content": "When does it take place?",
        "words": generateWordTokens("When does it take place?"),
        "contentVi": "Khi nào nó diễn ra?"
      },
      {
        "index": 11,
        "start": 38879,
        "end": 5800,
        "content": "It occurs on January 1st.",
        "words": generateWordTokens("It occurs on January 1st."),
        "contentVi": "Nó xảy ra vào ngày 1 tháng 1."
      },
      {
        "index": 12,
        "start": 41760,
        "end": 4841,
        "content": "Where's the festival celebrated?",
        "words": generateWordTokens("Where's the festival celebrated?"),
        "contentVi": "Lễ hội được tổ chức ở đâu?"
      },
      {
        "index": 13,
        "start": 44640,
        "end": 4525,
        "content": "The New Year's Day is celebrated all",
        "words": generateWordTokens("The New Year's Day is celebrated all"),
        "contentVi": "Ngày đầu năm mới được tổ chức tất cả"
      },
      {
        "index": 14,
        "start": 46559,
        "end": 5248,
        "content": "over the country. Each family has its",
        "words": generateWordTokens("over the country. Each family has its"),
        "contentVi": "trên khắp đất nước. Mỗi gia đình đều có"
      },
      {
        "index": 15,
        "start": 49120,
        "end": 4529,
        "content": "own way to celebrate the day.",
        "words": generateWordTokens("own way to celebrate the day."),
        "contentVi": "cách riêng để ăn mừng ngày này."
      },
      {
        "index": 16,
        "start": 51760,
        "end": 3572,
        "content": "What do people do to prepare for the",
        "words": generateWordTokens("What do people do to prepare for the"),
        "contentVi": "Mọi người làm gì để chuẩn bị cho"
      },
      {
        "index": 17,
        "start": 53600,
        "end": 3653,
        "content": "festival?",
        "words": generateWordTokens("festival?"),
        "contentVi": "lễ hội?"
      },
      {
        "index": 18,
        "start": 55280,
        "end": 4134,
        "content": "Before New Year's Day, people go",
        "words": generateWordTokens("Before New Year's Day, people go"),
        "contentVi": "Trước ngày đầu năm mới, mọi người đi"
      },
      {
        "index": 19,
        "start": 57199,
        "end": 5018,
        "content": "shopping for food and drinks, repair the",
        "words": generateWordTokens("shopping for food and drinks, repair the"),
        "contentVi": "mua thực phẩm và đồ uống, sửa chữa"
      },
      {
        "index": 20,
        "start": 59359,
        "end": 5340,
        "content": "house, or put up decor.",
        "words": generateWordTokens("house, or put up decor."),
        "contentVi": "ngôi nhà, hoặc trang trí."
      },
      {
        "index": 21,
        "start": 62160,
        "end": 5341,
        "content": "Who can join the festival?",
        "words": generateWordTokens("Who can join the festival?"),
        "contentVi": "Ai có thể tham gia lễ hội?"
      },
      {
        "index": 22,
        "start": 64640,
        "end": 5584,
        "content": "It's a day for everybody.",
        "words": generateWordTokens("It's a day for everybody."),
        "contentVi": "Đó là một ngày dành cho tất cả mọi người."
      },
      {
        "index": 23,
        "start": 67439,
        "end": 5107,
        "content": "What do people do in the festival?",
        "words": generateWordTokens("What do people do in the festival?"),
        "contentVi": "Mọi người làm gì trong lễ hội?"
      },
      {
        "index": 24,
        "start": 70159,
        "end": 4871,
        "content": "On New Year's Eve, people have a party",
        "words": generateWordTokens("On New Year's Eve, people have a party"),
        "contentVi": "Vào đêm giao thừa, mọi người tổ chức tiệc"
      },
      {
        "index": 25,
        "start": 72479,
        "end": 4233,
        "content": "with traditional food and drinks. After",
        "words": generateWordTokens("with traditional food and drinks. After"),
        "contentVi": "với các món ăn và đồ uống truyền thống. Sau đó"
      },
      {
        "index": 26,
        "start": 74960,
        "end": 3835,
        "content": "that, they may visit friends or",
        "words": generateWordTokens("that, they may visit friends or"),
        "contentVi": "rằng họ có thể đến thăm bạn bè hoặc"
      },
      {
        "index": 27,
        "start": 76640,
        "end": 3997,
        "content": "relatives, go to the movies, or watch",
        "words": generateWordTokens("relatives, go to the movies, or watch"),
        "contentVi": "người thân, đi xem phim hoặc xem"
      },
      {
        "index": 28,
        "start": 78720,
        "end": 4798,
        "content": "sports.",
        "words": generateWordTokens("sports."),
        "contentVi": "thể thao."
      },
      {
        "index": 29,
        "start": 80560,
        "end": 4640,
        "content": "What's special about that festival?",
        "words": generateWordTokens("What's special about that festival?"),
        "contentVi": "Lễ hội đó có gì đặc biệt?"
      },
      {
        "index": 30,
        "start": 83439,
        "end": 3844,
        "content": "It marks the end of a year and",
        "words": generateWordTokens("It marks the end of a year and"),
        "contentVi": "Nó đánh dấu sự kết thúc của một năm và"
      },
      {
        "index": 31,
        "start": 85119,
        "end": 3846,
        "content": "celebrates a new year. People believe",
        "words": generateWordTokens("celebrates a new year. People believe"),
        "contentVi": "chào mừng một năm mới. Người ta tin"
      },
      {
        "index": 32,
        "start": 87200,
        "end": 3607,
        "content": "that the things they do on the first day",
        "words": generateWordTokens("that the things they do on the first day"),
        "contentVi": "rằng những việc họ làm vào ngày đầu tiên"
      },
      {
        "index": 33,
        "start": 88880,
        "end": 4729,
        "content": "will bring good luck and prosperity to",
        "words": generateWordTokens("will bring good luck and prosperity to"),
        "contentVi": "sẽ mang lại may mắn và thịnh vượng cho"
      },
      {
        "index": 34,
        "start": 90720,
        "end": 6331,
        "content": "them during the whole year.",
        "words": generateWordTokens("them during the whole year."),
        "contentVi": "chúng trong suốt cả năm."
      },
      {
        "index": 35,
        "start": 93520,
        "end": 5454,
        "content": "Is the festival culturally related?",
        "words": generateWordTokens("Is the festival culturally related?"),
        "contentVi": "Lễ hội có liên quan đến văn hóa không?"
      },
      {
        "index": 36,
        "start": 96960,
        "end": 4097,
        "content": "Sure, the festival is an integral part",
        "words": generateWordTokens("Sure, the festival is an integral part"),
        "contentVi": "Chắc chắn lễ hội là một phần không thể thiếu"
      },
      {
        "index": 37,
        "start": 98880,
        "end": 5059,
        "content": "of culture.",
        "words": generateWordTokens("of culture."),
        "contentVi": "của văn hóa."
      },
      {
        "index": 38,
        "start": 100960,
        "end": 4821,
        "content": "Why is a festival important?",
        "words": generateWordTokens("Why is a festival important?"),
        "contentVi": "Tại sao một lễ hội lại quan trọng?"
      },
      {
        "index": 39,
        "start": 103840,
        "end": 3784,
        "content": "It adds structure to our social lives",
        "words": generateWordTokens("It adds structure to our social lives"),
        "contentVi": "Nó bổ sung thêm cấu trúc cho đời sống xã hội của chúng ta"
      },
      {
        "index": 40,
        "start": 105680,
        "end": 4946,
        "content": "and connects us with our families and",
        "words": generateWordTokens("and connects us with our families and"),
        "contentVi": "và kết nối chúng tôi với gia đình và"
      },
      {
        "index": 41,
        "start": 107520,
        "end": 3108,
        "content": "backgrounds.",
        "words": generateWordTokens("backgrounds."),
        "contentVi": "hình nền."
      },
      {
        "index": 42,
        "start": 112640,
        "end": 4113,
        "content": "How many popular festivals are there in",
        "words": generateWordTokens("How many popular festivals are there in"),
        "contentVi": "Có bao nhiêu lễ hội nổi tiếng ở"
      }
    ]
  },

  "luyen-nghe-a2-qp9qqeecxlw": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 -A SCHOOL",
    "audio_url": "qp9qqeeCXlw",
    "repeat_offset": 66.0,
    "sentences": [
      {
        "index": 0,
        "start": 12320,
        "end": 4572,
        "content": "I went to Millennium High School,",
        "words": generateWordTokens("I went to Millennium High School,"),
        "contentVi": "Tôi học ở trường trung học Millennium,"
      },
      {
        "index": 1,
        "start": 14080,
        "end": 5454,
        "content": "founded in 1999.",
        "words": generateWordTokens("founded in 1999."),
        "contentVi": "được thành lập vào năm 1999."
      },
      {
        "index": 2,
        "start": 16880,
        "end": 5057,
        "content": "Where is the school located?",
        "words": generateWordTokens("Where is the school located?"),
        "contentVi": "Trường nằm ở đâu?"
      },
      {
        "index": 3,
        "start": 19520,
        "end": 3939,
        "content": "It's located in New York City, United",
        "words": generateWordTokens("It's located in New York City, United"),
        "contentVi": "Nó nằm ở thành phố New York, Hoa Kỳ"
      },
      {
        "index": 4,
        "start": 21920,
        "end": 3221,
        "content": "States.",
        "words": generateWordTokens("States."),
        "contentVi": "Hoa Kỳ."
      },
      {
        "index": 5,
        "start": 23439,
        "end": 3064,
        "content": "Do you like the architecture of the",
        "words": generateWordTokens("Do you like the architecture of the"),
        "contentVi": "Bạn có thích kiến ​​trúc của"
      },
      {
        "index": 6,
        "start": 25119,
        "end": 3945,
        "content": "school?",
        "words": generateWordTokens("school?"),
        "contentVi": "trường học?"
      },
      {
        "index": 7,
        "start": 26480,
        "end": 4346,
        "content": "Yes, I do. The architecture is not",
        "words": generateWordTokens("Yes, I do. The architecture is not"),
        "contentVi": "Em đồng ý. Kiến trúc không"
      },
      {
        "index": 8,
        "start": 29039,
        "end": 3549,
        "content": "really impressive, but I like it that",
        "words": generateWordTokens("really impressive, but I like it that"),
        "contentVi": "thực sự ấn tượng, nhưng tôi thích nó"
      },
      {
        "index": 9,
        "start": 30800,
        "end": 3790,
        "content": "the building's architects left plenty of",
        "words": generateWordTokens("the building's architects left plenty of"),
        "contentVi": "các kiến ​​trúc sư của tòa nhà đã để lại rất nhiều"
      },
      {
        "index": 10,
        "start": 32559,
        "end": 4914,
        "content": "space for lounging.",
        "words": generateWordTokens("space for lounging."),
        "contentVi": "không gian để thư giãn."
      },
      {
        "index": 11,
        "start": 34559,
        "end": 4676,
        "content": "What are the teachers like?",
        "words": generateWordTokens("What are the teachers like?"),
        "contentVi": "Các giáo viên là người như thế nào?"
      },
      {
        "index": 12,
        "start": 37440,
        "end": 4197,
        "content": "Most of the teachers there are helpful",
        "words": generateWordTokens("Most of the teachers there are helpful"),
        "contentVi": "Hầu hết các giáo viên ở đó đều hữu ích"
      },
      {
        "index": 13,
        "start": 39200,
        "end": 5319,
        "content": "and friendly. I especially like Mr.",
        "words": generateWordTokens("and friendly. I especially like Mr."),
        "contentVi": "và thân thiện. Tôi đặc biệt thích Mr."
      },
      {
        "index": 14,
        "start": 41600,
        "end": 5321,
        "content": "Mike, my physics teacher.",
        "words": generateWordTokens("Mike, my physics teacher."),
        "contentVi": "Mike, giáo viên vật lý của tôi."
      },
      {
        "index": 15,
        "start": 44480,
        "end": 4603,
        "content": "How long have you spent there?",
        "words": generateWordTokens("How long have you spent there?"),
        "contentVi": "Bạn đã ở đó bao lâu rồi?"
      },
      {
        "index": 16,
        "start": 46879,
        "end": 3968,
        "content": "I have spent 3 years of upper secondary",
        "words": generateWordTokens("I have spent 3 years of upper secondary"),
        "contentVi": "Tôi đã trải qua 3 năm trung học phổ thông"
      },
      {
        "index": 17,
        "start": 49039,
        "end": 4690,
        "content": "school there.",
        "words": generateWordTokens("school there."),
        "contentVi": "trường học ở đó."
      },
      {
        "index": 18,
        "start": 50800,
        "end": 6611,
        "content": "Is that a single sex school?",
        "words": generateWordTokens("Is that a single sex school?"),
        "contentVi": "Đó có phải là trường học dành riêng cho một giới tính không?"
      },
      {
        "index": 19,
        "start": 53680,
        "end": 6294,
        "content": "No, it isn't. This is a unisex school.",
        "words": generateWordTokens("No, it isn't. This is a unisex school."),
        "contentVi": "Không, không phải vậy. Đây là một trường học unisex."
      },
      {
        "index": 20,
        "start": 57360,
        "end": 4297,
        "content": "Do you like the school uniform?",
        "words": generateWordTokens("Do you like the school uniform?"),
        "contentVi": "Bạn có thích đồng phục của trường không?"
      },
      {
        "index": 21,
        "start": 59920,
        "end": 3179,
        "content": "We don't wear uniforms at school,",
        "words": generateWordTokens("We don't wear uniforms at school,"),
        "contentVi": "Chúng tôi không mặc đồng phục ở trường,"
      },
      {
        "index": 22,
        "start": 61600,
        "end": 4302,
        "content": "actually.",
        "words": generateWordTokens("actually."),
        "contentVi": "Thực ra."
      },
      {
        "index": 23,
        "start": 63039,
        "end": 4463,
        "content": "Why do you enjoy the time there?",
        "words": generateWordTokens("Why do you enjoy the time there?"),
        "contentVi": "Tại sao bạn tận hưởng thời gian ở đó?"
      },
      {
        "index": 24,
        "start": 65840,
        "end": 3906,
        "content": "Although I had to deal with quite a",
        "words": generateWordTokens("Although I had to deal with quite a"),
        "contentVi": "Mặc dù tôi đã phải đối mặt với khá nhiều"
      },
      {
        "index": 25,
        "start": 67439,
        "end": 3908,
        "content": "heavy workload, I enjoy the relaxing",
        "words": generateWordTokens("heavy workload, I enjoy the relaxing"),
        "contentVi": "khối lượng công việc nặng nhọc, tôi tận hưởng sự thư giãn"
      },
      {
        "index": 26,
        "start": 69680,
        "end": 4310,
        "content": "atmosphere when hanging out with friends",
        "words": generateWordTokens("atmosphere when hanging out with friends"),
        "contentVi": "không khí khi đi chơi cùng bạn bè"
      },
      {
        "index": 27,
        "start": 71280,
        "end": 4791,
        "content": "in the cafeteria there.",
        "words": generateWordTokens("in the cafeteria there."),
        "contentVi": "trong quán cà phê ở đó."
      },
      {
        "index": 28,
        "start": 73920,
        "end": 3273,
        "content": "What important lesson did you learn from",
        "words": generateWordTokens("What important lesson did you learn from"),
        "contentVi": "Bài học quan trọng nào bạn đã học được từ"
      },
      {
        "index": 29,
        "start": 76000,
        "end": 2956,
        "content": "school?",
        "words": generateWordTokens("school?"),
        "contentVi": "trường học?"
      }
    ]
  },

  "luyen-nghe-a2-koiaztxaxyi": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 -KỸ NĂNG THỰC TẾ",
    "audio_url": "KOiAztXaxyI",
    "repeat_offset": 99.68,
    "sentences": [
      {
        "index": 0,
        "start": 13519,
        "end": 4655,
        "content": "Cooking is a practical skill that I have",
        "words": generateWordTokens("Cooking is a practical skill that I have"),
        "contentVi": "Nấu ăn là một kỹ năng thực tế mà tôi có"
      },
      {
        "index": 1,
        "start": 15839,
        "end": 4817,
        "content": "practiced recently.",
        "words": generateWordTokens("practiced recently."),
        "contentVi": "đã luyện tập gần đây."
      },
      {
        "index": 2,
        "start": 18160,
        "end": 5057,
        "content": "Who taught you that skill?",
        "words": generateWordTokens("Who taught you that skill?"),
        "contentVi": "Ai đã dạy bạn kỹ năng đó?"
      },
      {
        "index": 3,
        "start": 20640,
        "end": 4580,
        "content": "My mom is the best cook. She taught me",
        "words": generateWordTokens("My mom is the best cook. She taught me"),
        "contentVi": "Mẹ tôi là người nấu ăn ngon nhất. Cô ấy đã dạy tôi"
      },
      {
        "index": 4,
        "start": 23199,
        "end": 6103,
        "content": "everything about how to make soup,",
        "words": generateWordTokens("everything about how to make soup,"),
        "contentVi": "mọi thứ về cách nấu súp,"
      },
      {
        "index": 5,
        "start": 25199,
        "end": 6025,
        "content": "salad, omelets, cake, etc.",
        "words": generateWordTokens("salad, omelets, cake, etc."),
        "contentVi": "salad, trứng tráng, bánh, v.v."
      },
      {
        "index": 6,
        "start": 29279,
        "end": 4110,
        "content": "How did you learn it?",
        "words": generateWordTokens("How did you learn it?"),
        "contentVi": "Bạn đã học nó như thế nào?"
      },
      {
        "index": 7,
        "start": 31199,
        "end": 4032,
        "content": "She shows me how to buy food, prepare",
        "words": generateWordTokens("She shows me how to buy food, prepare"),
        "contentVi": "Cô ấy chỉ cho tôi cách mua đồ ăn, chuẩn bị"
      },
      {
        "index": 8,
        "start": 33360,
        "end": 4193,
        "content": "ingredients, and cook meals whenever",
        "words": generateWordTokens("ingredients, and cook meals whenever"),
        "contentVi": "nguyên liệu và nấu các bữa ăn bất cứ khi nào"
      },
      {
        "index": 9,
        "start": 35200,
        "end": 7234,
        "content": "she's in the kitchen. I learn how to",
        "words": generateWordTokens("she's in the kitchen. I learn how to"),
        "contentVi": "cô ấy đang ở trong bếp. Tôi học cách"
      },
      {
        "index": 10,
        "start": 37520,
        "end": 6838,
        "content": "boil, grill, steam, fry, braze, etc. Day",
        "words": generateWordTokens("boil, grill, steam, fry, braze, etc. Day"),
        "contentVi": "luộc, nướng, hấp, chiên, ninh, v.v. Ngày"
      },
      {
        "index": 11,
        "start": 42399,
        "end": 4202,
        "content": "by day.",
        "words": generateWordTokens("by day."),
        "contentVi": "theo ngày."
      },
      {
        "index": 12,
        "start": 44320,
        "end": 4123,
        "content": "Why did you learn it?",
        "words": generateWordTokens("Why did you learn it?"),
        "contentVi": "Tại sao bạn học nó?"
      },
      {
        "index": 13,
        "start": 46559,
        "end": 4288,
        "content": "I just want to be a good cook like my",
        "words": generateWordTokens("I just want to be a good cook like my"),
        "contentVi": "Tôi chỉ muốn trở thành một đầu bếp giỏi như tôi"
      },
      {
        "index": 14,
        "start": 48399,
        "end": 4208,
        "content": "mom when I get married. I will prepare",
        "words": generateWordTokens("mom when I get married. I will prepare"),
        "contentVi": "mẹ khi con lấy chồng. tôi sẽ chuẩn bị"
      },
      {
        "index": 15,
        "start": 50800,
        "end": 3490,
        "content": "the best dishes for my husband and",
        "words": generateWordTokens("the best dishes for my husband and"),
        "contentVi": "những món ăn ngon nhất cho chồng tôi và"
      },
      {
        "index": 16,
        "start": 52559,
        "end": 3334,
        "content": "children.",
        "words": generateWordTokens("children."),
        "contentVi": "những đứa trẻ."
      },
      {
        "index": 17,
        "start": 54239,
        "end": 3095,
        "content": "How long did it take for you to learn",
        "words": generateWordTokens("How long did it take for you to learn"),
        "contentVi": "Bạn mất bao lâu để học"
      },
      {
        "index": 18,
        "start": 55840,
        "end": 4376,
        "content": "it?",
        "words": generateWordTokens("it?"),
        "contentVi": "Nó?"
      },
      {
        "index": 19,
        "start": 57280,
        "end": 4457,
        "content": "I learned it in 4 years. The skill seems",
        "words": generateWordTokens("I learned it in 4 years. The skill seems"),
        "contentVi": "Tôi đã học nó trong 4 năm. Kỹ năng này có vẻ"
      },
      {
        "index": 20,
        "start": 60160,
        "end": 4300,
        "content": "to be strengthened when I live apart",
        "words": generateWordTokens("to be strengthened when I live apart"),
        "contentVi": "được tiếp thêm sức mạnh khi tôi sống xa nhau"
      },
      {
        "index": 21,
        "start": 61680,
        "end": 5662,
        "content": "from my family for studying.",
        "words": generateWordTokens("from my family for studying."),
        "contentVi": "của gia đình tôi để đi học."
      },
      {
        "index": 22,
        "start": 64400,
        "end": 6143,
        "content": "How often do you use this skill?",
        "words": generateWordTokens("How often do you use this skill?"),
        "contentVi": "Bạn có thường xuyên sử dụng kỹ năng này không?"
      },
      {
        "index": 23,
        "start": 67280,
        "end": 4787,
        "content": "I cook everyday. I also love homemade",
        "words": generateWordTokens("I cook everyday. I also love homemade"),
        "contentVi": "Tôi nấu ăn hàng ngày. Tôi cũng thích tự làm"
      },
      {
        "index": 24,
        "start": 70479,
        "end": 4151,
        "content": "food.",
        "words": generateWordTokens("food."),
        "contentVi": "đồ ăn."
      },
      {
        "index": 25,
        "start": 72000,
        "end": 4551,
        "content": "How has this skill helped you?",
        "words": generateWordTokens("How has this skill helped you?"),
        "contentVi": "Kỹ năng này đã giúp bạn như thế nào?"
      },
      {
        "index": 26,
        "start": 74560,
        "end": 4155,
        "content": "It makes me more confident whenever I go",
        "words": generateWordTokens("It makes me more confident whenever I go"),
        "contentVi": "Nó làm tôi tự tin hơn mỗi khi đi"
      },
      {
        "index": 27,
        "start": 76479,
        "end": 5197,
        "content": "on a picnic outside. I'm always",
        "words": generateWordTokens("on a picnic outside. I'm always"),
        "contentVi": "trong một chuyến dã ngoại bên ngoài. Tôi luôn luôn"
      },
      {
        "index": 28,
        "start": 78640,
        "end": 4639,
        "content": "responsible for the barbecue.",
        "words": generateWordTokens("responsible for the barbecue."),
        "contentVi": "chịu trách nhiệm về món nướng."
      },
      {
        "index": 29,
        "start": 81600,
        "end": 3522,
        "content": "Do people in your family know this",
        "words": generateWordTokens("Do people in your family know this"),
        "contentVi": "Mọi người trong gia đình bạn có biết điều này không?"
      },
      {
        "index": 30,
        "start": 83200,
        "end": 3603,
        "content": "skill, too?",
        "words": generateWordTokens("skill, too?"),
        "contentVi": "kỹ năng nữa à?"
      },
      {
        "index": 31,
        "start": 85040,
        "end": 5125,
        "content": "My younger sister knows how to cook,",
        "words": generateWordTokens("My younger sister knows how to cook,"),
        "contentVi": "Em gái tôi biết nấu ăn,"
      },
      {
        "index": 32,
        "start": 86720,
        "end": 6486,
        "content": "too. She has just started learning.",
        "words": generateWordTokens("too. She has just started learning."),
        "contentVi": "cũng vậy. Cô ấy mới bắt đầu học."
      },
      {
        "index": 33,
        "start": 90080,
        "end": 7290,
        "content": "Do all skills need learning?",
        "words": generateWordTokens("Do all skills need learning?"),
        "contentVi": "Có phải tất cả các kỹ năng đều cần phải học?"
      },
      {
        "index": 34,
        "start": 93119,
        "end": 7294,
        "content": "Yes, they do. Practice makes perfect.",
        "words": generateWordTokens("Yes, they do. Practice makes perfect."),
        "contentVi": "Vâng, họ làm vậy. Thực hành tạo nên sự hoàn hảo."
      },
      {
        "index": 35,
        "start": 97280,
        "end": 5777,
        "content": "How is this skill important to you?",
        "words": generateWordTokens("How is this skill important to you?"),
        "contentVi": "Kỹ năng này quan trọng với bạn như thế nào?"
      },
      {
        "index": 36,
        "start": 100320,
        "end": 4500,
        "content": "It's an essential life skill. All women",
        "words": generateWordTokens("It's an essential life skill. All women"),
        "contentVi": "Đó là một kỹ năng sống thiết yếu. Tất cả phụ nữ"
      },
      {
        "index": 37,
        "start": 102960,
        "end": 5423,
        "content": "need to know this to keep their family",
        "words": generateWordTokens("need to know this to keep their family"),
        "contentVi": "cần biết điều này để giữ gia đình của họ"
      },
      {
        "index": 38,
        "start": 104720,
        "end": 3665,
        "content": "warm and happy.",
        "words": generateWordTokens("warm and happy."),
        "contentVi": "ấm áp và hạnh phúc."
      }
    ]
  },

  "luyen-nghe-a2-ixokecbr5rw": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 -ANIMALS",
    "audio_url": "iXOKecbR5Rw",
    "repeat_offset": 79.36,
    "sentences": [
      {
        "index": 0,
        "start": 12639,
        "end": 6094,
        "content": "Yes, I am. I love animals.",
        "words": generateWordTokens("Yes, I am. I love animals."),
        "contentVi": "Vâng, đúng vậy. Tôi yêu động vật."
      },
      {
        "index": 1,
        "start": 16080,
        "end": 6096,
        "content": "Are you raising any pets?",
        "words": generateWordTokens("Are you raising any pets?"),
        "contentVi": "Bạn có đang nuôi thú cưng nào không?"
      },
      {
        "index": 2,
        "start": 18720,
        "end": 5539,
        "content": "Yes, I have a pitbull puppy at home.",
        "words": generateWordTokens("Yes, I have a pitbull puppy at home."),
        "contentVi": "Vâng, tôi có một chú chó pitbull ở nhà."
      },
      {
        "index": 3,
        "start": 22160,
        "end": 4102,
        "content": "What is it like?",
        "words": generateWordTokens("What is it like?"),
        "contentVi": "Nó như thế nào?"
      },
      {
        "index": 4,
        "start": 24240,
        "end": 4584,
        "content": "My puppy is friendly, highly",
        "words": generateWordTokens("My puppy is friendly, highly"),
        "contentVi": "Con chó con của tôi rất thân thiện, rất thân thiện"
      },
      {
        "index": 5,
        "start": 26240,
        "end": 4346,
        "content": "intelligent, and well behaved. He always",
        "words": generateWordTokens("intelligent, and well behaved. He always"),
        "contentVi": "thông minh và cư xử tốt. Anh ấy luôn"
      },
      {
        "index": 6,
        "start": 28800,
        "end": 4109,
        "content": "waves his tail and licks my hand to",
        "words": generateWordTokens("waves his tail and licks my hand to"),
        "contentVi": "vẫy đuôi và liếm tay tôi"
      },
      {
        "index": 7,
        "start": 30560,
        "end": 4271,
        "content": "welcome me home.",
        "words": generateWordTokens("welcome me home."),
        "contentVi": "chào mừng tôi về nhà."
      },
      {
        "index": 8,
        "start": 32880,
        "end": 4113,
        "content": "What does it look like?",
        "words": generateWordTokens("What does it look like?"),
        "contentVi": "Nó trông như thế nào?"
      },
      {
        "index": 9,
        "start": 34800,
        "end": 5715,
        "content": "He's a medium-sized puppy with a strong",
        "words": generateWordTokens("He's a medium-sized puppy with a strong"),
        "contentVi": "Nó là một chú chó con cỡ trung bình với một cơ thể khỏe mạnh."
      },
      {
        "index": 10,
        "start": 36960,
        "end": 5717,
        "content": "neck, broad chest, and brown hair.",
        "words": generateWordTokens("neck, broad chest, and brown hair."),
        "contentVi": "cổ, ngực rộng và tóc nâu."
      },
      {
        "index": 11,
        "start": 40480,
        "end": 4600,
        "content": "What are its habits?",
        "words": generateWordTokens("What are its habits?"),
        "contentVi": "Thói quen của nó là gì?"
      },
      {
        "index": 12,
        "start": 42640,
        "end": 5163,
        "content": "My pitbull puppy loves doing exercise",
        "words": generateWordTokens("My pitbull puppy loves doing exercise"),
        "contentVi": "Chú chó pitbull của tôi thích tập thể dục"
      },
      {
        "index": 13,
        "start": 45040,
        "end": 4205,
        "content": "everyday. When he plays, he plays to",
        "words": generateWordTokens("everyday. When he plays, he plays to"),
        "contentVi": "hàng ngày. Khi anh ấy chơi, anh ấy chơi để"
      },
      {
        "index": 14,
        "start": 47760,
        "end": 3808,
        "content": "win.",
        "words": generateWordTokens("win."),
        "contentVi": "thắng."
      },
      {
        "index": 15,
        "start": 49200,
        "end": 4769,
        "content": "What do you usually do with it?",
        "words": generateWordTokens("What do you usually do with it?"),
        "contentVi": "Bạn thường làm gì với nó?"
      },
      {
        "index": 16,
        "start": 51520,
        "end": 5332,
        "content": "We usually play tennis together. My",
        "words": generateWordTokens("We usually play tennis together. My"),
        "contentVi": "Chúng tôi thường chơi quần vợt cùng nhau. Của tôi"
      },
      {
        "index": 17,
        "start": 53920,
        "end": 5254,
        "content": "puppy helps me pick up tennis balls.",
        "words": generateWordTokens("puppy helps me pick up tennis balls."),
        "contentVi": "chú chó con giúp tôi nhặt quả bóng tennis."
      },
      {
        "index": 18,
        "start": 56800,
        "end": 4937,
        "content": "What is it like to eat?",
        "words": generateWordTokens("What is it like to eat?"),
        "contentVi": "Ăn như thế nào?"
      },
      {
        "index": 19,
        "start": 59120,
        "end": 4379,
        "content": "He loves beef, chicken, and some dairy",
        "words": generateWordTokens("He loves beef, chicken, and some dairy"),
        "contentVi": "Anh ấy thích thịt bò, thịt gà và một ít sữa"
      },
      {
        "index": 20,
        "start": 61680,
        "end": 4142,
        "content": "products.",
        "words": generateWordTokens("products."),
        "contentVi": "các sản phẩm."
      },
      {
        "index": 21,
        "start": 63440,
        "end": 5183,
        "content": "What do you learn from it?",
        "words": generateWordTokens("What do you learn from it?"),
        "contentVi": "Bạn học được gì từ nó?"
      },
      {
        "index": 22,
        "start": 65760,
        "end": 5346,
        "content": "He teaches me loyalty. An adult pitbull",
        "words": generateWordTokens("He teaches me loyalty. An adult pitbull"),
        "contentVi": "Anh ấy dạy tôi lòng trung thành. Chó pitbull trưởng thành"
      },
      {
        "index": 23,
        "start": 68560,
        "end": 5189,
        "content": "may make me feel safe.",
        "words": generateWordTokens("may make me feel safe."),
        "contentVi": "có thể khiến tôi cảm thấy an toàn."
      },
      {
        "index": 24,
        "start": 71040,
        "end": 4551,
        "content": "Why do people keep pets?",
        "words": generateWordTokens("Why do people keep pets?"),
        "contentVi": "Tại sao mọi người nuôi thú cưng?"
      },
      {
        "index": 25,
        "start": 73680,
        "end": 3513,
        "content": "They consider pets as their loyal",
        "words": generateWordTokens("They consider pets as their loyal"),
        "contentVi": "Họ coi thú cưng là người trung thành của mình"
      },
      {
        "index": 26,
        "start": 75520,
        "end": 3516,
        "content": "companions, which make their life",
        "words": generateWordTokens("companions, which make their life"),
        "contentVi": "những người bạn đồng hành tạo nên cuộc sống của họ"
      },
      {
        "index": 27,
        "start": 77119,
        "end": 3757,
        "content": "better.",
        "words": generateWordTokens("better."),
        "contentVi": "tốt hơn."
      },
      {
        "index": 28,
        "start": 78960,
        "end": 3119,
        "content": "Are pets well looked after in your",
        "words": generateWordTokens("Are pets well looked after in your"),
        "contentVi": "Vật nuôi của bạn có được chăm sóc tốt không"
      },
      {
        "index": 29,
        "start": 80799,
        "end": 6441,
        "content": "country?",
        "words": generateWordTokens("country?"),
        "contentVi": "quốc gia?"
      },
      {
        "index": 30,
        "start": 82000,
        "end": 5241,
        "content": "Yes, people in my country love pets.",
        "words": generateWordTokens("Yes, people in my country love pets."),
        "contentVi": "Vâng, người dân ở nước tôi rất yêu thích thú cưng."
      },
      {
        "index": 31,
        "start": 87710,
        "end": 4378,
        "content": "[Music]",
        "words": generateWordTokens("[Music]"),
        "contentVi": "[Âm nhạc]"
      },
      {
        "index": 32,
        "start": 89360,
        "end": 6168,
        "content": "Are you an animal lover?",
        "words": generateWordTokens("Are you an animal lover?"),
        "contentVi": "Bạn có phải là người yêu động vật?"
      }
    ]
  },

  "luyen-nghe-a2-lrthklpzmpo": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 -PARTIES",
    "audio_url": "lrtHKLpzMPo",
    "repeat_offset": 70.16,
    "sentences": [
      {
        "index": 0,
        "start": 11759,
        "end": 3453,
        "content": "country celebrate parties?",
        "words": generateWordTokens("country celebrate parties?"),
        "contentVi": "đất nước tổ chức tiệc tùng?"
      },
      {
        "index": 1,
        "start": 13679,
        "end": 3775,
        "content": "There are many occasions when people",
        "words": generateWordTokens("There are many occasions when people"),
        "contentVi": "Có rất nhiều dịp khi người ta"
      },
      {
        "index": 2,
        "start": 15200,
        "end": 4975,
        "content": "throw parties such as New Year's Eve,",
        "words": generateWordTokens("throw parties such as New Year's Eve,"),
        "contentVi": "tổ chức các bữa tiệc như đêm giao thừa,"
      },
      {
        "index": 3,
        "start": 17440,
        "end": 5696,
        "content": "wedding engagements, family reunions,",
        "words": generateWordTokens("wedding engagements, family reunions,"),
        "contentVi": "đám cưới, đoàn tụ gia đình,"
      },
      {
        "index": 4,
        "start": 20160,
        "end": 4899,
        "content": "birthdays, etc. But sometimes people",
        "words": generateWordTokens("birthdays, etc. But sometimes people"),
        "contentVi": "sinh nhật, v.v. Nhưng đôi khi mọi người"
      },
      {
        "index": 5,
        "start": 23119,
        "end": 4183,
        "content": "hold parties just when they meet up and",
        "words": generateWordTokens("hold parties just when they meet up and"),
        "contentVi": "tổ chức các bữa tiệc chỉ khi họ gặp nhau và"
      },
      {
        "index": 6,
        "start": 25039,
        "end": 4746,
        "content": "want to have something fun to do.",
        "words": generateWordTokens("want to have something fun to do."),
        "contentVi": "muốn có điều gì đó thú vị để làm."
      },
      {
        "index": 7,
        "start": 27279,
        "end": 4987,
        "content": "Are you a party animal?",
        "words": generateWordTokens("Are you a party animal?"),
        "contentVi": "Bạn có phải là người thích tiệc tùng không?"
      },
      {
        "index": 8,
        "start": 29760,
        "end": 4669,
        "content": "Yes, I am. I am crazy about going to",
        "words": generateWordTokens("Yes, I am. I am crazy about going to"),
        "contentVi": "Vâng, đúng vậy. Tôi phát điên vì phải đi"
      },
      {
        "index": 9,
        "start": 32239,
        "end": 4113,
        "content": "parties. I love meeting friends,",
        "words": generateWordTokens("parties. I love meeting friends,"),
        "contentVi": "các bữa tiệc. Tôi thích gặp gỡ bạn bè,"
      },
      {
        "index": 10,
        "start": 34399,
        "end": 4835,
        "content": "drinking, and talking.",
        "words": generateWordTokens("drinking, and talking."),
        "contentVi": "uống rượu và nói chuyện."
      },
      {
        "index": 11,
        "start": 36320,
        "end": 5236,
        "content": "When do parties often start and finish?",
        "words": generateWordTokens("When do parties often start and finish?"),
        "contentVi": "Khi nào các bữa tiệc thường bắt đầu và kết thúc?"
      },
      {
        "index": 12,
        "start": 39200,
        "end": 4119,
        "content": "It depends on what kind of party it is.",
        "words": generateWordTokens("It depends on what kind of party it is."),
        "contentVi": "Nó phụ thuộc vào loại bữa tiệc."
      },
      {
        "index": 13,
        "start": 41520,
        "end": 4362,
        "content": "I believe the perfect time to have a",
        "words": generateWordTokens("I believe the perfect time to have a"),
        "contentVi": "Tôi tin rằng thời điểm hoàn hảo để có một"
      },
      {
        "index": 14,
        "start": 43280,
        "end": 3642,
        "content": "party is in the evening from 8 to 11:00",
        "words": generateWordTokens("party is in the evening from 8 to 11:00"),
        "contentVi": "tiệc diễn ra vào buổi tối từ 8 đến 11 giờ"
      },
      {
        "index": 15,
        "start": 45840,
        "end": 3406,
        "content": "p.m.",
        "words": generateWordTokens("p.m."),
        "contentVi": "chiều"
      },
      {
        "index": 16,
        "start": 46879,
        "end": 5088,
        "content": "Where are the parties thrown?",
        "words": generateWordTokens("Where are the parties thrown?"),
        "contentVi": "Các bữa tiệc được ném ở đâu?"
      },
      {
        "index": 17,
        "start": 49200,
        "end": 4369,
        "content": "They are held inside or outside. Some",
        "words": generateWordTokens("They are held inside or outside. Some"),
        "contentVi": "Chúng được tổ chức bên trong hoặc bên ngoài. Một số"
      },
      {
        "index": 18,
        "start": 51920,
        "end": 4211,
        "content": "formal events like weddings,",
        "words": generateWordTokens("formal events like weddings,"),
        "contentVi": "những sự kiện trang trọng như đám cưới,"
      },
      {
        "index": 19,
        "start": 53520,
        "end": 4214,
        "content": "housewarmings are organized inside while",
        "words": generateWordTokens("housewarmings are organized inside while"),
        "contentVi": "tân gia được tổ chức bên trong trong khi"
      },
      {
        "index": 20,
        "start": 56079,
        "end": 4056,
        "content": "others like family reunions and",
        "words": generateWordTokens("others like family reunions and"),
        "contentVi": "những người khác thích đoàn tụ gia đình và"
      },
      {
        "index": 21,
        "start": 57680,
        "end": 4218,
        "content": "birthdays may be held outside.",
        "words": generateWordTokens("birthdays may be held outside."),
        "contentVi": "sinh nhật có thể được tổ chức bên ngoài."
      },
      {
        "index": 22,
        "start": 60079,
        "end": 3261,
        "content": "What do you usually wear when you come",
        "words": generateWordTokens("What do you usually wear when you come"),
        "contentVi": "Bạn thường mặc gì khi đến"
      },
      {
        "index": 23,
        "start": 61840,
        "end": 3741,
        "content": "to a party?",
        "words": generateWordTokens("to a party?"),
        "contentVi": "đến một bữa tiệc?"
      },
      {
        "index": 24,
        "start": 63280,
        "end": 4143,
        "content": "I often wear casual clothes like a",
        "words": generateWordTokens("I often wear casual clothes like a"),
        "contentVi": "Tôi thường mặc quần áo bình thường như một"
      },
      {
        "index": 25,
        "start": 65519,
        "end": 4627,
        "content": "t-shirt and jeans if I go to informal",
        "words": generateWordTokens("t-shirt and jeans if I go to informal"),
        "contentVi": "áo phông và quần jean nếu tôi đi chơi bình thường"
      },
      {
        "index": 26,
        "start": 67360,
        "end": 4547,
        "content": "parties and a dress for formal ones.",
        "words": generateWordTokens("parties and a dress for formal ones."),
        "contentVi": "các bữa tiệc và một chiếc váy cho những người trang trọng."
      },
      {
        "index": 27,
        "start": 70080,
        "end": 2950,
        "content": "What do people do in the parties you",
        "words": generateWordTokens("What do people do in the parties you"),
        "contentVi": "Mọi người làm gì trong bữa tiệc của bạn?"
      },
      {
        "index": 28,
        "start": 71840,
        "end": 3512,
        "content": "attended?",
        "words": generateWordTokens("attended?"),
        "contentVi": "đã tham dự?"
      },
      {
        "index": 29,
        "start": 72960,
        "end": 4473,
        "content": "At the party, people talk, eat, and",
        "words": generateWordTokens("At the party, people talk, eat, and"),
        "contentVi": "Trong bữa tiệc, mọi người trò chuyện, ăn uống và"
      },
      {
        "index": 30,
        "start": 75280,
        "end": 4635,
        "content": "drink together. Some go there to find",
        "words": generateWordTokens("drink together. Some go there to find"),
        "contentVi": "uống cùng nhau. Một số đến đó để tìm"
      },
      {
        "index": 31,
        "start": 77360,
        "end": 4637,
        "content": "business opportunities and new partners.",
        "words": generateWordTokens("business opportunities and new partners."),
        "contentVi": "cơ hội kinh doanh và đối tác mới."
      },
      {
        "index": 32,
        "start": 79840,
        "end": 3280,
        "content": "Do you enjoy drinking alcohol at the",
        "words": generateWordTokens("Do you enjoy drinking alcohol at the"),
        "contentVi": "Bạn có thích uống rượu ở"
      }
    ]
  },

  "luyen-nghe-a2-xfmtwdhbxwy": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A1 - Future",
    "audio_url": "XfmTwDHBXwY",
    "repeat_offset": 71.28,
    "sentences": [
      {
        "index": 0,
        "start": 11679,
        "end": 3453,
        "content": "Why are you leaving early?",
        "words": generateWordTokens("Why are you leaving early?"),
        "contentVi": "Tại sao bạn lại rời đi sớm?"
      },
      {
        "index": 1,
        "start": 13360,
        "end": 3613,
        "content": "I'm going to the dentist.",
        "words": generateWordTokens("I'm going to the dentist."),
        "contentVi": "Tôi đang đi đến nha sĩ."
      },
      {
        "index": 2,
        "start": 15120,
        "end": 4174,
        "content": "Why do you have a toothache?",
        "words": generateWordTokens("Why do you have a toothache?"),
        "contentVi": "Tại sao bạn bị đau răng?"
      },
      {
        "index": 3,
        "start": 16960,
        "end": 4416,
        "content": "No, I'm getting my teeth cleaned.",
        "words": generateWordTokens("No, I'm getting my teeth cleaned."),
        "contentVi": "Không, tôi đang đi làm sạch răng."
      },
      {
        "index": 4,
        "start": 19279,
        "end": 3460,
        "content": "Well, if you are leaving early, I'm",
        "words": generateWordTokens("Well, if you are leaving early, I'm"),
        "contentVi": "Chà, nếu bạn về sớm, tôi sẽ"
      },
      {
        "index": 5,
        "start": 21359,
        "end": 4181,
        "content": "leaving early, too.",
        "words": generateWordTokens("leaving early, too."),
        "contentVi": "cũng ra đi sớm."
      },
      {
        "index": 6,
        "start": 22720,
        "end": 4902,
        "content": "Fine with me.",
        "words": generateWordTokens("Fine with me."),
        "contentVi": "Ổn thôi với tôi."
      },
      {
        "index": 7,
        "start": 25519,
        "end": 4347,
        "content": "Conversation two.",
        "words": generateWordTokens("Conversation two."),
        "contentVi": "Cuộc trò chuyện thứ hai."
      },
      {
        "index": 8,
        "start": 27599,
        "end": 3868,
        "content": "What are you doing tonight? I'm meeting",
        "words": generateWordTokens("What are you doing tonight? I'm meeting"),
        "contentVi": "Tối nay bạn đang làm gì? tôi đang họp"
      },
      {
        "index": 9,
        "start": 29840,
        "end": 3630,
        "content": "my mom for dinner.",
        "words": generateWordTokens("my mom for dinner."),
        "contentVi": "mẹ tôi đi ăn tối."
      },
      {
        "index": 10,
        "start": 31439,
        "end": 4272,
        "content": "Oh, where are you going?",
        "words": generateWordTokens("Oh, where are you going?"),
        "contentVi": "Ồ, bạn đang đi đâu vậy?"
      },
      {
        "index": 11,
        "start": 33440,
        "end": 3473,
        "content": "We are going to the new Thai restaurant.",
        "words": generateWordTokens("We are going to the new Thai restaurant."),
        "contentVi": "Chúng tôi đang đi đến nhà hàng Thái mới."
      },
      {
        "index": 12,
        "start": 35680,
        "end": 3156,
        "content": "Join us.",
        "words": generateWordTokens("Join us."),
        "contentVi": "Tham gia cùng chúng tôi."
      },
      {
        "index": 13,
        "start": 36880,
        "end": 3396,
        "content": "Thanks, but I can't. I'm playing",
        "words": generateWordTokens("Thanks, but I can't. I'm playing"),
        "contentVi": "Cảm ơn, nhưng tôi không thể. tôi đang chơi"
      },
      {
        "index": 14,
        "start": 38800,
        "end": 4759,
        "content": "football tonight.",
        "words": generateWordTokens("football tonight."),
        "contentVi": "bóng đá tối nay."
      },
      {
        "index": 15,
        "start": 40239,
        "end": 5561,
        "content": "Well, maybe next time.",
        "words": generateWordTokens("Well, maybe next time."),
        "contentVi": "Vâng, có lẽ lần sau."
      },
      {
        "index": 16,
        "start": 43520,
        "end": 4844,
        "content": "Conversation three.",
        "words": generateWordTokens("Conversation three."),
        "contentVi": "Cuộc trò chuyện thứ ba."
      },
      {
        "index": 17,
        "start": 45760,
        "end": 5165,
        "content": "What classes are you taking next term?",
        "words": generateWordTokens("What classes are you taking next term?"),
        "contentVi": "Học kỳ tiếp theo bạn sẽ học lớp nào?"
      },
      {
        "index": 18,
        "start": 48320,
        "end": 4927,
        "content": "I'm taking math and history.",
        "words": generateWordTokens("I'm taking math and history."),
        "contentVi": "Tôi đang học toán và lịch sử."
      },
      {
        "index": 19,
        "start": 50879,
        "end": 4452,
        "content": "Nice. I'm taking math, too.",
        "words": generateWordTokens("Nice. I'm taking math, too."),
        "contentVi": "Đẹp. Mình cũng đang học toán."
      },
      {
        "index": 20,
        "start": 53199,
        "end": 4374,
        "content": "Who is teaching the class?",
        "words": generateWordTokens("Who is teaching the class?"),
        "contentVi": "Ai đang dạy lớp này?"
      },
      {
        "index": 21,
        "start": 55280,
        "end": 5895,
        "content": "Professor Smith is teaching it.",
        "words": generateWordTokens("Professor Smith is teaching it."),
        "contentVi": "Giáo sư Smith đang giảng dạy nó."
      },
      {
        "index": 22,
        "start": 57520,
        "end": 5737,
        "content": "Oh, no. Oh, I hear he is hard.",
        "words": generateWordTokens("Oh, no. Oh, I hear he is hard."),
        "contentVi": "Ồ, không. Ồ, tôi nghe nói anh ấy khó tính lắm."
      },
      {
        "index": 23,
        "start": 61120,
        "end": 3820,
        "content": "Conversation four.",
        "words": generateWordTokens("Conversation four."),
        "contentVi": "Cuộc trò chuyện thứ tư."
      },
      {
        "index": 24,
        "start": 63199,
        "end": 3424,
        "content": "What is going on tonight?",
        "words": generateWordTokens("What is going on tonight?"),
        "contentVi": "Chuyện gì đang xảy ra tối nay vậy?"
      },
      {
        "index": 25,
        "start": 64879,
        "end": 4146,
        "content": "Bill is having a party.",
        "words": generateWordTokens("Bill is having a party."),
        "contentVi": "Bill đang có một bữa tiệc."
      },
      {
        "index": 26,
        "start": 66560,
        "end": 4467,
        "content": "Oh, really? When and where?",
        "words": generateWordTokens("Oh, really? When and where?"),
        "contentVi": "Ồ vậy ư? Khi nào và ở đâu?"
      },
      {
        "index": 27,
        "start": 68960,
        "end": 3749,
        "content": "He's having it at his house. It is",
        "words": generateWordTokens("He's having it at his house. It is"),
        "contentVi": "Anh ấy đang tổ chức nó ở nhà mình. Đó là"
      },
      {
        "index": 28,
        "start": 70960,
        "end": 3191,
        "content": "starting at 6:00.",
        "words": generateWordTokens("starting at 6:00."),
        "contentVi": "bắt đầu lúc 6 giờ."
      },
      {
        "index": 29,
        "start": 72640,
        "end": 4893,
        "content": "Who's going?",
        "words": generateWordTokens("Who's going?"),
        "contentVi": "Ai sẽ đi?"
      },
      {
        "index": 30,
        "start": 74080,
        "end": 6984,
        "content": "Everyone's going. You should come.",
        "words": generateWordTokens("Everyone's going. You should come."),
        "contentVi": "Mọi người đang đi. Bạn nên đến."
      },
      {
        "index": 31,
        "start": 77460,
        "end": 3607,
        "content": "[Music]",
        "words": generateWordTokens("[Music]"),
        "contentVi": "[Âm nhạc]"
      },
      {
        "index": 32,
        "start": 81280,
        "end": 3441,
        "content": "Conversation one.",
        "words": generateWordTokens("Conversation one."),
        "contentVi": "Cuộc trò chuyện một."
      }
    ]
  },

  "luyen-nghe-a2-xlv5xmtco-8": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A1 -A teacher",
    "audio_url": "xLV5xMtCO-8",
    "repeat_offset": 71.84,
    "sentences": [
      {
        "index": 0,
        "start": 12480,
        "end": 4012,
        "content": "I like Mr. Tom the most. He is my",
        "words": generateWordTokens("I like Mr. Tom the most. He is my"),
        "contentVi": "Tôi thích ông Tom nhất. Anh ấy là của tôi"
      },
      {
        "index": 1,
        "start": 14880,
        "end": 4254,
        "content": "English teacher.",
        "words": generateWordTokens("English teacher."),
        "contentVi": "Giáo viên tiếng Anh."
      },
      {
        "index": 2,
        "start": 16480,
        "end": 5376,
        "content": "Is he a foreign teacher?",
        "words": generateWordTokens("Is he a foreign teacher?"),
        "contentVi": "Anh ấy là giáo viên nước ngoài phải không?"
      },
      {
        "index": 3,
        "start": 19119,
        "end": 5460,
        "content": "Yes, he's from the US.",
        "words": generateWordTokens("Yes, he's from the US."),
        "contentVi": "Vâng, anh ấy đến từ Mỹ."
      },
      {
        "index": 4,
        "start": 21840,
        "end": 4662,
        "content": "What do you like about his lessons?",
        "words": generateWordTokens("What do you like about his lessons?"),
        "contentVi": "Bạn thích điều gì ở bài học của anh ấy?"
      },
      {
        "index": 5,
        "start": 24560,
        "end": 3785,
        "content": "I have fallen in love with his American",
        "words": generateWordTokens("I have fallen in love with his American"),
        "contentVi": "Tôi đã yêu người Mỹ của anh ấy"
      },
      {
        "index": 6,
        "start": 26480,
        "end": 3145,
        "content": "accent and he always shows us something",
        "words": generateWordTokens("accent and he always shows us something"),
        "contentVi": "giọng nói và anh ấy luôn cho chúng tôi thấy điều gì đó"
      },
      {
        "index": 7,
        "start": 28320,
        "end": 2987,
        "content": "new about the world outside of",
        "words": generateWordTokens("new about the world outside of"),
        "contentVi": "mới về thế giới bên ngoài"
      },
      {
        "index": 8,
        "start": 29599,
        "end": 3391,
        "content": "textbooks.",
        "words": generateWordTokens("textbooks."),
        "contentVi": "sách giáo khoa."
      },
      {
        "index": 9,
        "start": 31279,
        "end": 3872,
        "content": "What's he like?",
        "words": generateWordTokens("What's he like?"),
        "contentVi": "Anh ấy thế nào?"
      },
      {
        "index": 10,
        "start": 32960,
        "end": 4593,
        "content": "He's not only knowledgeable but also",
        "words": generateWordTokens("He's not only knowledgeable but also"),
        "contentVi": "Anh ấy không chỉ có kiến ​​thức mà còn"
      },
      {
        "index": 11,
        "start": 35120,
        "end": 4915,
        "content": "very friendly. He always treats us like",
        "words": generateWordTokens("very friendly. He always treats us like"),
        "contentVi": "rất thân thiện. Anh ấy luôn đối xử với chúng tôi như"
      },
      {
        "index": 12,
        "start": 37520,
        "end": 4518,
        "content": "friends, not students.",
        "words": generateWordTokens("friends, not students."),
        "contentVi": "bạn bè, không phải sinh viên."
      },
      {
        "index": 13,
        "start": 40000,
        "end": 3240,
        "content": "What does he usually wear when coming to",
        "words": generateWordTokens("What does he usually wear when coming to"),
        "contentVi": "Anh ấy thường mặc gì khi đến"
      },
      {
        "index": 14,
        "start": 42000,
        "end": 3162,
        "content": "class?",
        "words": generateWordTokens("class?"),
        "contentVi": "lớp học?"
      },
      {
        "index": 15,
        "start": 43200,
        "end": 3722,
        "content": "He usually wears a gray suit when he",
        "words": generateWordTokens("He usually wears a gray suit when he"),
        "contentVi": "Anh ấy thường mặc bộ đồ màu xám khi"
      },
      {
        "index": 16,
        "start": 45120,
        "end": 4045,
        "content": "comes to class.",
        "words": generateWordTokens("comes to class."),
        "contentVi": "đến lớp."
      },
      {
        "index": 17,
        "start": 46879,
        "end": 5488,
        "content": "Do you love his subject?",
        "words": generateWordTokens("Do you love his subject?"),
        "contentVi": "Bạn có yêu thích chủ đề của anh ấy không?"
      },
      {
        "index": 18,
        "start": 49120,
        "end": 6128,
        "content": "Yes, I enjoy English a lot.",
        "words": generateWordTokens("Yes, I enjoy English a lot."),
        "contentVi": "Vâng, tôi rất thích tiếng Anh."
      },
      {
        "index": 19,
        "start": 52320,
        "end": 5652,
        "content": "Do students in your class like him?",
        "words": generateWordTokens("Do students in your class like him?"),
        "contentVi": "Học sinh trong lớp của bạn có thích anh ấy không?"
      },
      {
        "index": 20,
        "start": 55199,
        "end": 5976,
        "content": "Yes, all of us admire him.",
        "words": generateWordTokens("Yes, all of us admire him."),
        "contentVi": "Vâng, tất cả chúng tôi đều ngưỡng mộ anh ấy."
      },
      {
        "index": 21,
        "start": 57920,
        "end": 5898,
        "content": "Do you want to be a teacher like him?",
        "words": generateWordTokens("Do you want to be a teacher like him?"),
        "contentVi": "Bạn có muốn trở thành giáo viên như anh ấy không?"
      },
      {
        "index": 22,
        "start": 61120,
        "end": 5021,
        "content": "No. Although I am like him, my dream is",
        "words": generateWordTokens("No. Although I am like him, my dream is"),
        "contentVi": "Không. Mặc dù tôi giống anh ấy nhưng ước mơ của tôi là"
      },
      {
        "index": 23,
        "start": 63760,
        "end": 3984,
        "content": "not to become a teacher. I would like to",
        "words": generateWordTokens("not to become a teacher. I would like to"),
        "contentVi": "không trở thành giáo viên. tôi muốn"
      },
      {
        "index": 24,
        "start": 66080,
        "end": 4226,
        "content": "be a chef.",
        "words": generateWordTokens("be a chef."),
        "contentVi": "làm đầu bếp."
      },
      {
        "index": 25,
        "start": 67680,
        "end": 5507,
        "content": "Have you ever been punished by him?",
        "words": generateWordTokens("Have you ever been punished by him?"),
        "contentVi": "Bạn đã bao giờ bị anh ta trừng phạt chưa?"
      },
      {
        "index": 26,
        "start": 70240,
        "end": 5350,
        "content": "No, he rarely punishes anyone.",
        "words": generateWordTokens("No, he rarely punishes anyone."),
        "contentVi": "Không, anh ấy hiếm khi trừng phạt ai."
      },
      {
        "index": 27,
        "start": 73119,
        "end": 6914,
        "content": "Do you want to see him again?",
        "words": generateWordTokens("Do you want to see him again?"),
        "contentVi": "Bạn có muốn gặp lại anh ấy không?"
      },
      {
        "index": 28,
        "start": 75520,
        "end": 4516,
        "content": "Of course. He's a great mentor.",
        "words": generateWordTokens("Of course. He's a great mentor."),
        "contentVi": "Tất nhiên rồi. Anh ấy là một người cố vấn tuyệt vời."
      },
      {
        "index": 29,
        "start": 81759,
        "end": 5043,
        "content": "Who is your favorite teacher?",
        "words": generateWordTokens("Who is your favorite teacher?"),
        "contentVi": "Giáo viên yêu thích của bạn là ai?"
      }
    ]
  },

  "luyen-nghe-a2-n7mbgvn7ebs": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 -A FOREIGN COUNTRY",
    "audio_url": "N7mBGVn7EBs",
    "repeat_offset": 79.36,
    "sentences": [
      {
        "index": 0,
        "start": 12800,
        "end": 4572,
        "content": "country was it?",
        "words": generateWordTokens("country was it?"),
        "contentVi": "đất nước phải không?"
      },
      {
        "index": 1,
        "start": 14480,
        "end": 4733,
        "content": "Yes, I have. I traveled to the USA last",
        "words": generateWordTokens("Yes, I have. I traveled to the USA last"),
        "contentVi": "Vâng, tôi có. Tôi đã đến Mỹ lần cuối"
      },
      {
        "index": 2,
        "start": 17359,
        "end": 4178,
        "content": "year with my family.",
        "words": generateWordTokens("year with my family."),
        "contentVi": "năm với gia đình tôi."
      },
      {
        "index": 3,
        "start": 19199,
        "end": 5859,
        "content": "Where is that country located?",
        "words": generateWordTokens("Where is that country located?"),
        "contentVi": "Đất nước đó nằm ở đâu?"
      },
      {
        "index": 4,
        "start": 21520,
        "end": 5861,
        "content": "The USA is located in North America.",
        "words": generateWordTokens("The USA is located in North America."),
        "contentVi": "Hoa Kỳ nằm ở Bắc Mỹ."
      },
      {
        "index": 5,
        "start": 25039,
        "end": 4265,
        "content": "What is it famous for?",
        "words": generateWordTokens("What is it famous for?"),
        "contentVi": "Nó nổi tiếng vì điều gì?"
      },
      {
        "index": 6,
        "start": 27359,
        "end": 4588,
        "content": "The USA is known for its cultural",
        "words": generateWordTokens("The USA is known for its cultural"),
        "contentVi": "Nước Mỹ nổi tiếng với nền văn hóa"
      },
      {
        "index": 7,
        "start": 29279,
        "end": 4590,
        "content": "achievements and landmarks.",
        "words": generateWordTokens("achievements and landmarks."),
        "contentVi": "thành tựu và dấu mốc."
      },
      {
        "index": 8,
        "start": 31920,
        "end": 3792,
        "content": "What are the special food and drinks of",
        "words": generateWordTokens("What are the special food and drinks of"),
        "contentVi": "Đồ ăn và đồ uống đặc biệt của"
      },
      {
        "index": 9,
        "start": 33840,
        "end": 4114,
        "content": "that country?",
        "words": generateWordTokens("that country?"),
        "contentVi": "đất nước đó?"
      },
      {
        "index": 10,
        "start": 35680,
        "end": 5716,
        "content": "There are many. They are known for fast",
        "words": generateWordTokens("There are many. They are known for fast"),
        "contentVi": "Có rất nhiều. Họ nổi tiếng nhanh chóng"
      },
      {
        "index": 11,
        "start": 37920,
        "end": 6357,
        "content": "food, dairy, and many beverages.",
        "words": generateWordTokens("food, dairy, and many beverages."),
        "contentVi": "thực phẩm, sữa và nhiều loại đồ uống."
      },
      {
        "index": 12,
        "start": 41360,
        "end": 4920,
        "content": "What do you like about that country?",
        "words": generateWordTokens("What do you like about that country?"),
        "contentVi": "Bạn thích điều gì ở đất nước đó?"
      },
      {
        "index": 13,
        "start": 44239,
        "end": 4285,
        "content": "I like the fast pace of life and the",
        "words": generateWordTokens("I like the fast pace of life and the"),
        "contentVi": "Tôi thích nhịp sống nhanh và"
      },
      {
        "index": 14,
        "start": 46239,
        "end": 3886,
        "content": "various subcultures.",
        "words": generateWordTokens("various subcultures."),
        "contentVi": "các tiểu văn hóa khác nhau."
      },
      {
        "index": 15,
        "start": 48480,
        "end": 3168,
        "content": "How many citizens are there in that",
        "words": generateWordTokens("How many citizens are there in that"),
        "contentVi": "Có bao nhiêu công dân ở đó"
      },
      {
        "index": 16,
        "start": 50079,
        "end": 3331,
        "content": "country?",
        "words": generateWordTokens("country?"),
        "contentVi": "quốc gia?"
      },
      {
        "index": 17,
        "start": 51600,
        "end": 4612,
        "content": "The current population of the United",
        "words": generateWordTokens("The current population of the United"),
        "contentVi": "Dân số hiện tại của Hoa Kỳ"
      },
      {
        "index": 18,
        "start": 53360,
        "end": 6533,
        "content": "States of America was over 324 million",
        "words": generateWordTokens("States of America was over 324 million"),
        "contentVi": "Hoa Kỳ là hơn 324 triệu"
      },
      {
        "index": 19,
        "start": 56160,
        "end": 6295,
        "content": "in 2016, which accounts for 4.3% of the",
        "words": generateWordTokens("in 2016, which accounts for 4.3% of the"),
        "contentVi": "vào năm 2016, chiếm 4,3% trong"
      },
      {
        "index": 20,
        "start": 59840,
        "end": 5659,
        "content": "total world population.",
        "words": generateWordTokens("total world population."),
        "contentVi": "tổng dân số thế giới."
      },
      {
        "index": 21,
        "start": 62399,
        "end": 5263,
        "content": "What language do people there speak?",
        "words": generateWordTokens("What language do people there speak?"),
        "contentVi": "Người dân ở đó nói ngôn ngữ gì?"
      },
      {
        "index": 22,
        "start": 65439,
        "end": 5266,
        "content": "The national language is English, but",
        "words": generateWordTokens("The national language is English, but"),
        "contentVi": "Ngôn ngữ quốc gia là tiếng Anh nhưng"
      },
      {
        "index": 23,
        "start": 67600,
        "end": 5587,
        "content": "many people also speak Spanish, French,",
        "words": generateWordTokens("many people also speak Spanish, French,"),
        "contentVi": "nhiều người cũng nói được tiếng Tây Ban Nha, tiếng Pháp,"
      },
      {
        "index": 24,
        "start": 70640,
        "end": 5271,
        "content": "German, and Chinese.",
        "words": generateWordTokens("German, and Chinese."),
        "contentVi": "Tiếng Đức và tiếng Trung Quốc."
      },
      {
        "index": 25,
        "start": 73119,
        "end": 4154,
        "content": "Do you want to go back there again?",
        "words": generateWordTokens("Do you want to go back there again?"),
        "contentVi": "Bạn có muốn quay lại đó lần nữa không?"
      },
      {
        "index": 26,
        "start": 75840,
        "end": 4395,
        "content": "Sure.",
        "words": generateWordTokens("Sure."),
        "contentVi": "Chắc chắn."
      },
      {
        "index": 27,
        "start": 77200,
        "end": 5036,
        "content": "Why do people like to travel abroad?",
        "words": generateWordTokens("Why do people like to travel abroad?"),
        "contentVi": "Tại sao mọi người thích đi du lịch nước ngoài?"
      },
      {
        "index": 28,
        "start": 80159,
        "end": 4080,
        "content": "They just want to discover new places,",
        "words": generateWordTokens("They just want to discover new places,"),
        "contentVi": "Họ chỉ muốn khám phá những địa điểm mới,"
      },
      {
        "index": 29,
        "start": 82159,
        "end": 5082,
        "content": "learn new cultures, and maybe speak new",
        "words": generateWordTokens("learn new cultures, and maybe speak new"),
        "contentVi": "tìm hiểu những nền văn hóa mới và có thể nói những điều mới"
      },
      {
        "index": 30,
        "start": 84159,
        "end": 3084,
        "content": "languages.",
        "words": generateWordTokens("languages."),
        "contentVi": "ngôn ngữ."
      },
      {
        "index": 31,
        "start": 87710,
        "end": 4537,
        "content": "[Music]",
        "words": generateWordTokens("[Music]"),
        "contentVi": "[Âm nhạc]"
      }
    ]
  },

  "luyen-nghe-a2-4nhwzev5gzi": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 - A MUSEUM",
    "audio_url": "4NHWZev5gZI",
    "repeat_offset": 68.72,
    "sentences": [
      {
        "index": 0,
        "start": 12400,
        "end": 3692,
        "content": "country?",
        "words": generateWordTokens("country?"),
        "contentVi": "quốc gia?"
      },
      {
        "index": 1,
        "start": 13759,
        "end": 5775,
        "content": "There are many types of museums but the",
        "words": generateWordTokens("There are many types of museums but the"),
        "contentVi": "Có nhiều loại bảo tàng nhưng"
      },
      {
        "index": 2,
        "start": 16080,
        "end": 5536,
        "content": "most popular are historical museums.",
        "words": generateWordTokens("most popular are historical museums."),
        "contentVi": "phổ biến nhất là bảo tàng lịch sử."
      },
      {
        "index": 3,
        "start": 19520,
        "end": 3779,
        "content": "What is the most famous museum in your",
        "words": generateWordTokens("What is the most famous museum in your"),
        "contentVi": "Bảo tàng nổi tiếng nhất ở bạn là gì?"
      },
      {
        "index": 4,
        "start": 21600,
        "end": 3941,
        "content": "country?",
        "words": generateWordTokens("country?"),
        "contentVi": "quốc gia?"
      },
      {
        "index": 5,
        "start": 23279,
        "end": 3943,
        "content": "That would be the British Museum located",
        "words": generateWordTokens("That would be the British Museum located"),
        "contentVi": "Đó sẽ là Bảo tàng Anh nằm"
      },
      {
        "index": 6,
        "start": 25519,
        "end": 4026,
        "content": "in London.",
        "words": generateWordTokens("in London."),
        "contentVi": "ở Luân Đôn."
      },
      {
        "index": 7,
        "start": 27199,
        "end": 4107,
        "content": "What's special about it?",
        "words": generateWordTokens("What's special about it?"),
        "contentVi": "Nó có gì đặc biệt?"
      },
      {
        "index": 8,
        "start": 29519,
        "end": 5230,
        "content": "I'm impressed by its large amount of",
        "words": generateWordTokens("I'm impressed by its large amount of"),
        "contentVi": "Tôi rất ấn tượng bởi số lượng lớn của nó"
      },
      {
        "index": 9,
        "start": 31279,
        "end": 5232,
        "content": "historical art and cultural work.",
        "words": generateWordTokens("historical art and cultural work."),
        "contentVi": "công trình văn hóa, nghệ thuật lịch sử."
      },
      {
        "index": 10,
        "start": 34719,
        "end": 2996,
        "content": "How many times have you visited that",
        "words": generateWordTokens("How many times have you visited that"),
        "contentVi": "Bạn đã ghé thăm đó bao nhiêu lần rồi"
      },
      {
        "index": 11,
        "start": 36480,
        "end": 4196,
        "content": "museum?",
        "words": generateWordTokens("museum?"),
        "contentVi": "bảo tàng?"
      },
      {
        "index": 12,
        "start": 37680,
        "end": 4998,
        "content": "I have visited the museum twice.",
        "words": generateWordTokens("I have visited the museum twice."),
        "contentVi": "Tôi đã đến thăm bảo tàng hai lần."
      },
      {
        "index": 13,
        "start": 40640,
        "end": 3960,
        "content": "What do you usually do when visiting a",
        "words": generateWordTokens("What do you usually do when visiting a"),
        "contentVi": "Bạn thường làm gì khi đến thăm một"
      },
      {
        "index": 14,
        "start": 42640,
        "end": 3723,
        "content": "museum?",
        "words": generateWordTokens("museum?"),
        "contentVi": "bảo tàng?"
      },
      {
        "index": 15,
        "start": 44559,
        "end": 4686,
        "content": "I usually listen to the tour guide and",
        "words": generateWordTokens("I usually listen to the tour guide and"),
        "contentVi": "Tôi thường nghe hướng dẫn viên du lịch và"
      },
      {
        "index": 16,
        "start": 46320,
        "end": 5646,
        "content": "take notes about important information.",
        "words": generateWordTokens("take notes about important information."),
        "contentVi": "ghi chú về những thông tin quan trọng."
      },
      {
        "index": 17,
        "start": 49200,
        "end": 4689,
        "content": "Are you allowed to take pictures there?",
        "words": generateWordTokens("Are you allowed to take pictures there?"),
        "contentVi": "Bạn có được phép chụp ảnh ở đó không?"
      },
      {
        "index": 18,
        "start": 51920,
        "end": 3892,
        "content": "No, the guards did not allow us to bring",
        "words": generateWordTokens("No, the guards did not allow us to bring"),
        "contentVi": "Không, lính canh không cho phép chúng tôi mang theo"
      },
      {
        "index": 19,
        "start": 53840,
        "end": 4933,
        "content": "the camera in.",
        "words": generateWordTokens("the camera in."),
        "contentVi": "máy ảnh vào."
      },
      {
        "index": 20,
        "start": 55760,
        "end": 5976,
        "content": "How did you feel after visiting there?",
        "words": generateWordTokens("How did you feel after visiting there?"),
        "contentVi": "Bạn cảm thấy thế nào sau khi đến thăm nơi đó?"
      },
      {
        "index": 21,
        "start": 58719,
        "end": 4860,
        "content": "The overall experience was fantastic and",
        "words": generateWordTokens("The overall experience was fantastic and"),
        "contentVi": "Trải nghiệm tổng thể thật tuyệt vời và"
      },
      {
        "index": 22,
        "start": 61680,
        "end": 3662,
        "content": "I learned so many things in just a few",
        "words": generateWordTokens("I learned so many things in just a few"),
        "contentVi": "Tôi đã học được rất nhiều điều chỉ trong một vài"
      },
      {
        "index": 23,
        "start": 63520,
        "end": 3424,
        "content": "hours.",
        "words": generateWordTokens("hours."),
        "contentVi": "giờ."
      },
      {
        "index": 24,
        "start": 65280,
        "end": 4145,
        "content": "What do you think is the importance of",
        "words": generateWordTokens("What do you think is the importance of"),
        "contentVi": "Bạn nghĩ gì về tầm quan trọng của"
      },
      {
        "index": 25,
        "start": 66880,
        "end": 4547,
        "content": "museums in history?",
        "words": generateWordTokens("museums in history?"),
        "contentVi": "bảo tàng trong lịch sử?"
      },
      {
        "index": 26,
        "start": 69360,
        "end": 4148,
        "content": "Museums are an integral part of any",
        "words": generateWordTokens("Museums are an integral part of any"),
        "contentVi": "Bảo tàng là một phần không thể thiếu của bất kỳ"
      },
      {
        "index": 27,
        "start": 71360,
        "end": 4721,
        "content": "country's history and they keep history",
        "words": generateWordTokens("country's history and they keep history"),
        "contentVi": "lịch sử đất nước và họ lưu giữ lịch sử"
      },
      {
        "index": 28,
        "start": 73439,
        "end": 5594,
        "content": "alive.",
        "words": generateWordTokens("alive."),
        "contentVi": "còn sống."
      },
      {
        "index": 29,
        "start": 76010,
        "end": 5266,
        "content": "[Music]",
        "words": generateWordTokens("[Music]"),
        "contentVi": "[Âm nhạc]"
      }
    ]
  },

  "luyen-nghe-a2-v61vst9kale": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 - NEWSPAPER/ MAGAZINE",
    "audio_url": "v61vsT9kALE",
    "repeat_offset": 87.68,
    "sentences": [
      {
        "index": 0,
        "start": 11040,
        "end": 4171,
        "content": "What are the benefits of reading a",
        "words": generateWordTokens("What are the benefits of reading a"),
        "contentVi": "Lợi ích của việc đọc một"
      },
      {
        "index": 1,
        "start": 12639,
        "end": 4974,
        "content": "newspaper or magazine?",
        "words": generateWordTokens("newspaper or magazine?"),
        "contentVi": "báo hay tạp chí?"
      },
      {
        "index": 2,
        "start": 15200,
        "end": 4174,
        "content": "Newspapers magazines can broaden your",
        "words": generateWordTokens("Newspapers magazines can broaden your"),
        "contentVi": "Báo chí tạp chí có thể mở rộng phạm vi của bạn"
      },
      {
        "index": 3,
        "start": 17600,
        "end": 3617,
        "content": "mind about thousands of things without",
        "words": generateWordTokens("mind about thousands of things without"),
        "contentVi": "tâm trí về hàng ngàn thứ mà không có"
      },
      {
        "index": 4,
        "start": 19359,
        "end": 4260,
        "content": "the need to travel.",
        "words": generateWordTokens("the need to travel."),
        "contentVi": "nhu cầu đi lại."
      },
      {
        "index": 5,
        "start": 21199,
        "end": 5142,
        "content": "How often do you read it?",
        "words": generateWordTokens("How often do you read it?"),
        "contentVi": "Bạn có thường xuyên đọc nó không?"
      },
      {
        "index": 6,
        "start": 23600,
        "end": 4264,
        "content": "I read it every day.",
        "words": generateWordTokens("I read it every day."),
        "contentVi": "Tôi đọc nó mỗi ngày."
      },
      {
        "index": 7,
        "start": 26320,
        "end": 3305,
        "content": "What's the best time to read the",
        "words": generateWordTokens("What's the best time to read the"),
        "contentVi": "Thời điểm nào là tốt nhất để đọc"
      },
      {
        "index": 8,
        "start": 27840,
        "end": 3547,
        "content": "newspaper?",
        "words": generateWordTokens("newspaper?"),
        "contentVi": "báo?"
      },
      {
        "index": 9,
        "start": 29599,
        "end": 4271,
        "content": "I think the best time is in the morning",
        "words": generateWordTokens("I think the best time is in the morning"),
        "contentVi": "Tôi nghĩ thời điểm tốt nhất là vào buổi sáng"
      },
      {
        "index": 10,
        "start": 31359,
        "end": 4672,
        "content": "when you start a new day.",
        "words": generateWordTokens("when you start a new day."),
        "contentVi": "khi bạn bắt đầu một ngày mới."
      },
      {
        "index": 11,
        "start": 33840,
        "end": 3634,
        "content": "What types of magazines do you usually",
        "words": generateWordTokens("What types of magazines do you usually"),
        "contentVi": "Bạn thường đọc những loại tạp chí nào"
      },
      {
        "index": 12,
        "start": 36000,
        "end": 3476,
        "content": "read?",
        "words": generateWordTokens("read?"),
        "contentVi": "đọc?"
      },
      {
        "index": 13,
        "start": 37440,
        "end": 4357,
        "content": "I usually read politics and fashion",
        "words": generateWordTokens("I usually read politics and fashion"),
        "contentVi": "Tôi thường đọc chính trị và thời trang"
      },
      {
        "index": 14,
        "start": 39440,
        "end": 4678,
        "content": "magazines. I also enjoy reading about",
        "words": generateWordTokens("magazines. I also enjoy reading about"),
        "contentVi": "tạp chí. Tôi cũng thích đọc về"
      },
      {
        "index": 15,
        "start": 41760,
        "end": 5161,
        "content": "culture and tourism.",
        "words": generateWordTokens("culture and tourism."),
        "contentVi": "văn hóa và du lịch."
      },
      {
        "index": 16,
        "start": 44079,
        "end": 5004,
        "content": "What's your favorite magazine?",
        "words": generateWordTokens("What's your favorite magazine?"),
        "contentVi": "Tạp chí yêu thích của bạn là gì?"
      },
      {
        "index": 17,
        "start": 46879,
        "end": 3887,
        "content": "My favorite is the New York Times, which",
        "words": generateWordTokens("My favorite is the New York Times, which"),
        "contentVi": "Tờ báo tôi yêu thích nhất là tờ New York Times, tờ này"
      },
      {
        "index": 18,
        "start": 49039,
        "end": 5810,
        "content": "writes about all sorts of things:",
        "words": generateWordTokens("writes about all sorts of things:"),
        "contentVi": "viết về đủ thứ:"
      },
      {
        "index": 19,
        "start": 50719,
        "end": 7411,
        "content": "business, sports, movies, travel, books,",
        "words": generateWordTokens("business, sports, movies, travel, books,"),
        "contentVi": "kinh doanh, thể thao, phim ảnh, du lịch, sách,"
      },
      {
        "index": 20,
        "start": 54800,
        "end": 6775,
        "content": "jobs, education, and real estate.",
        "words": generateWordTokens("jobs, education, and real estate."),
        "contentVi": "việc làm, giáo dục và bất động sản."
      },
      {
        "index": 21,
        "start": 58079,
        "end": 6939,
        "content": "Do you read the paper or online news?",
        "words": generateWordTokens("Do you read the paper or online news?"),
        "contentVi": "Bạn có đọc báo hoặc tin tức trực tuyến không?"
      },
      {
        "index": 22,
        "start": 61520,
        "end": 5422,
        "content": "I prefer online news to save money.",
        "words": generateWordTokens("I prefer online news to save money."),
        "contentVi": "Tôi thích tin tức trực tuyến hơn để tiết kiệm tiền."
      },
      {
        "index": 23,
        "start": 64960,
        "end": 4224,
        "content": "How much does it cost you to buy paper",
        "words": generateWordTokens("How much does it cost you to buy paper"),
        "contentVi": "Bạn mua giấy bao nhiêu tiền"
      },
      {
        "index": 24,
        "start": 66880,
        "end": 4467,
        "content": "newspaper per month?",
        "words": generateWordTokens("newspaper per month?"),
        "contentVi": "báo mỗi tháng?"
      },
      {
        "index": 25,
        "start": 69119,
        "end": 4790,
        "content": "I only buy a monthly newspaper, so it",
        "words": generateWordTokens("I only buy a monthly newspaper, so it"),
        "contentVi": "Tôi chỉ mua một tờ báo hàng tháng, vì vậy nó"
      },
      {
        "index": 26,
        "start": 71280,
        "end": 3910,
        "content": "doesn't cost much money, around $5 a",
        "words": generateWordTokens("doesn't cost much money, around $5 a"),
        "contentVi": "không tốn nhiều tiền, khoảng 5 đô la một"
      },
      {
        "index": 27,
        "start": 73840,
        "end": 3274,
        "content": "month.",
        "words": generateWordTokens("month."),
        "contentVi": "tháng."
      },
      {
        "index": 28,
        "start": 75119,
        "end": 3755,
        "content": "What is the most popular magazine in",
        "words": generateWordTokens("What is the most popular magazine in"),
        "contentVi": "Tạp chí nào được yêu thích nhất ở"
      },
      {
        "index": 29,
        "start": 77040,
        "end": 3997,
        "content": "your country?",
        "words": generateWordTokens("your country?"),
        "contentVi": "đất nước của bạn?"
      },
      {
        "index": 30,
        "start": 78799,
        "end": 3759,
        "content": "I think it would be Forbes magazine, a",
        "words": generateWordTokens("I think it would be Forbes magazine, a"),
        "contentVi": "Tôi nghĩ đó sẽ là tạp chí Forbes, một"
      },
      {
        "index": 31,
        "start": 80960,
        "end": 4401,
        "content": "leading source for reliable business",
        "words": generateWordTokens("leading source for reliable business"),
        "contentVi": "nguồn hàng đầu cho doanh nghiệp đáng tin cậy"
      },
      {
        "index": 32,
        "start": 82479,
        "end": 5123,
        "content": "news and financial information.",
        "words": generateWordTokens("news and financial information."),
        "contentVi": "tin tức và thông tin tài chính."
      },
      {
        "index": 33,
        "start": 85280,
        "end": 4244,
        "content": "With the popularity of internet, do you",
        "words": generateWordTokens("With the popularity of internet, do you"),
        "contentVi": "Với sự phổ biến của Internet, bạn có"
      },
      {
        "index": 34,
        "start": 87520,
        "end": 3768,
        "content": "think newspapers and magazines will",
        "words": generateWordTokens("think newspapers and magazines will"),
        "contentVi": "nghĩ rằng báo và tạp chí sẽ"
      },
      {
        "index": 35,
        "start": 89439,
        "end": 4010,
        "content": "disappear?",
        "words": generateWordTokens("disappear?"),
        "contentVi": "biến mất?"
      },
      {
        "index": 36,
        "start": 91200,
        "end": 5491,
        "content": "Yes. Unfortunately, it's just a matter",
        "words": generateWordTokens("Yes. Unfortunately, it's just a matter"),
        "contentVi": "Đúng. Thật không may, đó chỉ là vấn đề"
      },
      {
        "index": 37,
        "start": 93360,
        "end": 3333,
        "content": "of time.",
        "words": generateWordTokens("of time."),
        "contentVi": "của thời gian."
      }
    ]
  },

  "luyen-nghe-a2-lzc2csueuw0": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 - So Sánh Nhất",
    "audio_url": "lzc2cSueuw0",
    "repeat_offset": 96.16,
    "sentences": [
      {
        "index": 0,
        "start": 12400,
        "end": 3291,
        "content": "What is the fastest way to get to the",
        "words": generateWordTokens("What is the fastest way to get to the"),
        "contentVi": "Cách nhanh nhất để đến được"
      },
      {
        "index": 1,
        "start": 14400,
        "end": 4653,
        "content": "airport?",
        "words": generateWordTokens("airport?"),
        "contentVi": "sân bay?"
      },
      {
        "index": 2,
        "start": 15679,
        "end": 5456,
        "content": "By taxi, but it's the most expensive.",
        "words": generateWordTokens("By taxi, but it's the most expensive."),
        "contentVi": "Bằng taxi, nhưng nó đắt nhất."
      },
      {
        "index": 3,
        "start": 19039,
        "end": 5220,
        "content": "What's the cheapest?",
        "words": generateWordTokens("What's the cheapest?"),
        "contentVi": "Cái gì rẻ nhất?"
      },
      {
        "index": 4,
        "start": 21119,
        "end": 4742,
        "content": "The local bus, but is by far the slowest",
        "words": generateWordTokens("The local bus, but is by far the slowest"),
        "contentVi": "Xe buýt địa phương, nhưng cho đến nay là chậm nhất"
      },
      {
        "index": 5,
        "start": 24240,
        "end": 5864,
        "content": "way to get there.",
        "words": generateWordTokens("way to get there."),
        "contentVi": "cách để đến đó."
      },
      {
        "index": 6,
        "start": 25840,
        "end": 7706,
        "content": "H I better spring for a taxi then.",
        "words": generateWordTokens("H I better spring for a taxi then."),
        "contentVi": "H: Tốt nhất là tôi nên bắt taxi."
      },
      {
        "index": 7,
        "start": 30080,
        "end": 6669,
        "content": "Yeah, it's best if you do.",
        "words": generateWordTokens("Yeah, it's best if you do."),
        "contentVi": "Ừ, tốt nhất là cậu làm thế."
      },
      {
        "index": 8,
        "start": 33520,
        "end": 5634,
        "content": "Conversation two.",
        "words": generateWordTokens("Conversation two."),
        "contentVi": "Cuộc trò chuyện thứ hai."
      },
      {
        "index": 9,
        "start": 36719,
        "end": 3877,
        "content": "What is the best place to visit in your",
        "words": generateWordTokens("What is the best place to visit in your"),
        "contentVi": "Nơi tốt nhất để ghé thăm ở bạn là gì"
      },
      {
        "index": 10,
        "start": 39120,
        "end": 4199,
        "content": "country?",
        "words": generateWordTokens("country?"),
        "contentVi": "quốc gia?"
      },
      {
        "index": 11,
        "start": 40559,
        "end": 4041,
        "content": "I think the West Coast. It has the best",
        "words": generateWordTokens("I think the West Coast. It has the best"),
        "contentVi": "Tôi nghĩ là Bờ Tây. Nó có thứ tốt nhất"
      },
      {
        "index": 12,
        "start": 43280,
        "end": 3642,
        "content": "weather.",
        "words": generateWordTokens("weather."),
        "contentVi": "thời tiết."
      },
      {
        "index": 13,
        "start": 44559,
        "end": 4606,
        "content": "What about the cost?",
        "words": generateWordTokens("What about the cost?"),
        "contentVi": "Còn chi phí thì sao?"
      },
      {
        "index": 14,
        "start": 46879,
        "end": 4368,
        "content": "The costs are very high. Our most",
        "words": generateWordTokens("The costs are very high. Our most"),
        "contentVi": "Chi phí rất cao. nhất của chúng tôi"
      },
      {
        "index": 15,
        "start": 49120,
        "end": 6449,
        "content": "expensive cities are there.",
        "words": generateWordTokens("expensive cities are there."),
        "contentVi": "những thành phố đắt đỏ đang ở đó."
      },
      {
        "index": 16,
        "start": 51200,
        "end": 7011,
        "content": "Oh, that's too bad. What about the food?",
        "words": generateWordTokens("Oh, that's too bad. What about the food?"),
        "contentVi": "Ôi, tệ quá. Còn đồ ăn thì sao?"
      },
      {
        "index": 17,
        "start": 55520,
        "end": 5575,
        "content": "It's great. It has the best restaurants",
        "words": generateWordTokens("It's great. It has the best restaurants"),
        "contentVi": "Thật tuyệt vời. Nó có những nhà hàng tốt nhất"
      },
      {
        "index": 18,
        "start": 58160,
        "end": 5498,
        "content": "in the country.",
        "words": generateWordTokens("in the country."),
        "contentVi": "trong nước."
      },
      {
        "index": 19,
        "start": 61039,
        "end": 5102,
        "content": "Conversation three.",
        "words": generateWordTokens("Conversation three."),
        "contentVi": "Cuộc trò chuyện thứ ba."
      },
      {
        "index": 20,
        "start": 63600,
        "end": 5424,
        "content": "How was the movie last night?",
        "words": generateWordTokens("How was the movie last night?"),
        "contentVi": "Bộ phim tối qua thế nào?"
      },
      {
        "index": 21,
        "start": 66080,
        "end": 4785,
        "content": "Oh, it was great. It was the scariest",
        "words": generateWordTokens("Oh, it was great. It was the scariest"),
        "contentVi": "Ồ, nó thật tuyệt. Đó là điều đáng sợ nhất"
      },
      {
        "index": 22,
        "start": 68960,
        "end": 4789,
        "content": "movie I've ever seen.",
        "words": generateWordTokens("movie I've ever seen."),
        "contentVi": "bộ phim tôi từng xem."
      },
      {
        "index": 23,
        "start": 70799,
        "end": 5032,
        "content": "Oh, really? That scary?",
        "words": generateWordTokens("Oh, really? That scary?"),
        "contentVi": "Ồ vậy ư? Đáng sợ thế?"
      },
      {
        "index": 24,
        "start": 73680,
        "end": 3114,
        "content": "Yes, I was screaming throughout the",
        "words": generateWordTokens("Yes, I was screaming throughout the"),
        "contentVi": "Vâng, tôi đã la hét suốt"
      },
      {
        "index": 25,
        "start": 75760,
        "end": 2636,
        "content": "film.",
        "words": generateWordTokens("film."),
        "contentVi": "phim ảnh."
      },
      {
        "index": 26,
        "start": 76720,
        "end": 3677,
        "content": "Was it crowded?",
        "words": generateWordTokens("Was it crowded?"),
        "contentVi": "Nó có đông đúc không?"
      },
      {
        "index": 27,
        "start": 78320,
        "end": 4318,
        "content": "Yeah, it was the most packed I've ever",
        "words": generateWordTokens("Yeah, it was the most packed I've ever"),
        "contentVi": "Vâng, đó là nơi đông đúc nhất mà tôi từng có"
      },
      {
        "index": 28,
        "start": 80320,
        "end": 5120,
        "content": "seen the theater.",
        "words": generateWordTokens("seen the theater."),
        "contentVi": "đã xem rạp."
      },
      {
        "index": 29,
        "start": 82560,
        "end": 6163,
        "content": "Conversation four.",
        "words": generateWordTokens("Conversation four."),
        "contentVi": "Cuộc trò chuyện thứ tư."
      },
      {
        "index": 30,
        "start": 85360,
        "end": 5844,
        "content": "What is the oldest city in your country?",
        "words": generateWordTokens("What is the oldest city in your country?"),
        "contentVi": "Thành phố lâu đời nhất ở nước bạn là gì?"
      },
      {
        "index": 31,
        "start": 88640,
        "end": 4489,
        "content": "I think it's the capital.",
        "words": generateWordTokens("I think it's the capital."),
        "contentVi": "Tôi nghĩ đó là thủ đô."
      },
      {
        "index": 32,
        "start": 91119,
        "end": 4492,
        "content": "Is it the biggest?",
        "words": generateWordTokens("Is it the biggest?"),
        "contentVi": "Nó có phải là lớn nhất không?"
      },
      {
        "index": 33,
        "start": 93040,
        "end": 5293,
        "content": "It was, but not anymore.",
        "words": generateWordTokens("It was, but not anymore."),
        "contentVi": "Đã từng như vậy, nhưng không còn nữa."
      },
      {
        "index": 34,
        "start": 95520,
        "end": 5216,
        "content": "Why are people moving out?",
        "words": generateWordTokens("Why are people moving out?"),
        "contentVi": "Tại sao mọi người lại chuyển đi?"
      },
      {
        "index": 35,
        "start": 98240,
        "end": 5498,
        "content": "Well, it's not the most modern place to",
        "words": generateWordTokens("Well, it's not the most modern place to"),
        "contentVi": "Chà, đó không phải là nơi hiện đại nhất để"
      },
      {
        "index": 36,
        "start": 100640,
        "end": 3101,
        "content": "live.",
        "words": generateWordTokens("live."),
        "contentVi": "sống."
      }
    ]
  },

  "luyen-nghe-a2-rva8yov3koe": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 - HISTORICAL PLACE",
    "audio_url": "RVA8yov3KOE",
    "repeat_offset": 99.52,
    "sentences": [
      {
        "index": 0,
        "start": 12480,
        "end": 4651,
        "content": "when traveling? Historical places or",
        "words": generateWordTokens("when traveling? Historical places or"),
        "contentVi": "khi đi du lịch? Địa điểm lịch sử hoặc"
      },
      {
        "index": 1,
        "start": 15040,
        "end": 4495,
        "content": "natural landmarks?",
        "words": generateWordTokens("natural landmarks?"),
        "contentVi": "địa danh tự nhiên?"
      },
      {
        "index": 2,
        "start": 17119,
        "end": 4658,
        "content": "Well, historical places are always my",
        "words": generateWordTokens("Well, historical places are always my"),
        "contentVi": "Vâng, những địa điểm lịch sử luôn là của tôi"
      },
      {
        "index": 3,
        "start": 19520,
        "end": 4260,
        "content": "first choice when traveling.",
        "words": generateWordTokens("first choice when traveling."),
        "contentVi": "lựa chọn hàng đầu khi đi du lịch."
      },
      {
        "index": 4,
        "start": 21760,
        "end": 4262,
        "content": "What do you usually do when visiting",
        "words": generateWordTokens("What do you usually do when visiting"),
        "contentVi": "Bạn thường làm gì khi đến thăm"
      },
      {
        "index": 5,
        "start": 23760,
        "end": 4024,
        "content": "historical places?",
        "words": generateWordTokens("historical places?"),
        "contentVi": "địa điểm lịch sử?"
      },
      {
        "index": 6,
        "start": 26000,
        "end": 3545,
        "content": "I usually listen to the tour guide",
        "words": generateWordTokens("I usually listen to the tour guide"),
        "contentVi": "Tôi thường nghe hướng dẫn viên du lịch"
      },
      {
        "index": 7,
        "start": 27760,
        "end": 4908,
        "content": "introducing the sites and take notes",
        "words": generateWordTokens("introducing the sites and take notes"),
        "contentVi": "giới thiệu các trang web và ghi chú"
      },
      {
        "index": 8,
        "start": 29519,
        "end": 5230,
        "content": "about important historical events.",
        "words": generateWordTokens("about important historical events."),
        "contentVi": "về những sự kiện lịch sử quan trọng."
      },
      {
        "index": 9,
        "start": 32640,
        "end": 3792,
        "content": "Can you name some historical places you",
        "words": generateWordTokens("Can you name some historical places you"),
        "contentVi": "Bạn có thể kể tên một số địa điểm lịch sử được không?"
      },
      {
        "index": 10,
        "start": 34719,
        "end": 3796,
        "content": "have visited?",
        "words": generateWordTokens("have visited?"),
        "contentVi": "đã ghé thăm?"
      },
      {
        "index": 11,
        "start": 36399,
        "end": 3957,
        "content": "Whenever I travel to a foreign country,",
        "words": generateWordTokens("Whenever I travel to a foreign country,"),
        "contentVi": "Bất cứ khi nào tôi đi du lịch đến một đất nước xa lạ,"
      },
      {
        "index": 12,
        "start": 38480,
        "end": 4198,
        "content": "I always visit its famous historical",
        "words": generateWordTokens("I always visit its famous historical"),
        "contentVi": "Tôi luôn ghé thăm lịch sử nổi tiếng của nó"
      },
      {
        "index": 13,
        "start": 40320,
        "end": 5320,
        "content": "places. Some of them are the pyramids in",
        "words": generateWordTokens("places. Some of them are the pyramids in"),
        "contentVi": "địa điểm. Một số trong số đó là các kim tự tháp ở"
      },
      {
        "index": 14,
        "start": 42640,
        "end": 6442,
        "content": "Egypt, Ankorwat in Cambodia, Stonehenge",
        "words": generateWordTokens("Egypt, Ankorwat in Cambodia, Stonehenge"),
        "contentVi": "Ai Cập, Ankorwat ở Campuchia, Stonehenge"
      },
      {
        "index": 15,
        "start": 45600,
        "end": 5566,
        "content": "in England, and the Taj Mahal in India.",
        "words": generateWordTokens("in England, and the Taj Mahal in India."),
        "contentVi": "ở Anh và Taj Mahal ở Ấn Độ."
      },
      {
        "index": 16,
        "start": 49039,
        "end": 5889,
        "content": "What's your most favorite historical",
        "words": generateWordTokens("What's your most favorite historical"),
        "contentVi": "Lịch sử yêu thích nhất của bạn là gì"
      },
      {
        "index": 17,
        "start": 51120,
        "end": 6211,
        "content": "place? Why? I love the pyramids the",
        "words": generateWordTokens("place? Why? I love the pyramids the"),
        "contentVi": "địa điểm? Tại sao? Tôi yêu các kim tự tháp"
      },
      {
        "index": 18,
        "start": 54879,
        "end": 4055,
        "content": "most. Taking a tour around the pyramids,",
        "words": generateWordTokens("most. Taking a tour around the pyramids,"),
        "contentVi": "hầu hết. Đi một vòng quanh các kim tự tháp,"
      },
      {
        "index": 19,
        "start": 57280,
        "end": 3737,
        "content": "I can not only enjoy the gorgeous",
        "words": generateWordTokens("I can not only enjoy the gorgeous"),
        "contentVi": "Tôi không chỉ có thể tận hưởng vẻ đẹp tuyệt đẹp"
      },
      {
        "index": 20,
        "start": 58879,
        "end": 4059,
        "content": "architecture, but also learn cultural",
        "words": generateWordTokens("architecture, but also learn cultural"),
        "contentVi": "kiến trúc mà còn tìm hiểu văn hóa"
      },
      {
        "index": 21,
        "start": 60960,
        "end": 4141,
        "content": "and historical values of the ancient",
        "words": generateWordTokens("and historical values of the ancient"),
        "contentVi": "và giá trị lịch sử cổ xưa"
      },
      {
        "index": 22,
        "start": 62879,
        "end": 4384,
        "content": "Egyptian culture.",
        "words": generateWordTokens("Egyptian culture."),
        "contentVi": "Văn hóa Ai Cập."
      },
      {
        "index": 23,
        "start": 65040,
        "end": 4225,
        "content": "What is the most famous historical place",
        "words": generateWordTokens("What is the most famous historical place"),
        "contentVi": "Địa điểm lịch sử nổi tiếng nhất là gì"
      },
      {
        "index": 24,
        "start": 67200,
        "end": 4387,
        "content": "in your country?",
        "words": generateWordTokens("in your country?"),
        "contentVi": "ở nước bạn?"
      },
      {
        "index": 25,
        "start": 69200,
        "end": 4229,
        "content": "It's definitely the Statue of Liberty in",
        "words": generateWordTokens("It's definitely the Statue of Liberty in"),
        "contentVi": "Đó chắc chắn là Tượng Nữ thần Tự do ở"
      },
      {
        "index": 26,
        "start": 71520,
        "end": 3991,
        "content": "New York City.",
        "words": generateWordTokens("New York City."),
        "contentVi": "Thành phố New York."
      },
      {
        "index": 27,
        "start": 73360,
        "end": 4073,
        "content": "What's special about it?",
        "words": generateWordTokens("What's special about it?"),
        "contentVi": "Nó có gì đặc biệt?"
      },
      {
        "index": 28,
        "start": 75439,
        "end": 4156,
        "content": "The statue was gifted by the people of",
        "words": generateWordTokens("The statue was gifted by the people of"),
        "contentVi": "Bức tượng được người dân tặng quà"
      },
      {
        "index": 29,
        "start": 77360,
        "end": 4397,
        "content": "France. It is a symbol of freedom for",
        "words": generateWordTokens("France. It is a symbol of freedom for"),
        "contentVi": "Pháp. Đó là biểu tượng của tự do cho"
      },
      {
        "index": 30,
        "start": 79520,
        "end": 4080,
        "content": "the US as well as a welcoming site to",
        "words": generateWordTokens("the US as well as a welcoming site to"),
        "contentVi": "Hoa Kỳ cũng như một địa điểm chào đón"
      },
      {
        "index": 31,
        "start": 81680,
        "end": 3682,
        "content": "people coming to the US from another",
        "words": generateWordTokens("people coming to the US from another"),
        "contentVi": "những người đến Mỹ từ nơi khác"
      },
      {
        "index": 32,
        "start": 83520,
        "end": 4323,
        "content": "country.",
        "words": generateWordTokens("country."),
        "contentVi": "quốc gia."
      },
      {
        "index": 33,
        "start": 85280,
        "end": 4885,
        "content": "Where is it located?",
        "words": generateWordTokens("Where is it located?"),
        "contentVi": "Nó nằm ở đâu?"
      },
      {
        "index": 34,
        "start": 87759,
        "end": 5209,
        "content": "It's located on Liberty Island in New",
        "words": generateWordTokens("It's located on Liberty Island in New"),
        "contentVi": "Nó nằm trên đảo Liberty ở New"
      },
      {
        "index": 35,
        "start": 90080,
        "end": 5050,
        "content": "York Harbor, NYC.",
        "words": generateWordTokens("York Harbor, NYC."),
        "contentVi": "Cảng York, New York."
      },
      {
        "index": 36,
        "start": 92880,
        "end": 5053,
        "content": "Should the youth visit historical places",
        "words": generateWordTokens("Should the youth visit historical places"),
        "contentVi": "Giới trẻ có nên ghé thăm những địa điểm lịch sử"
      },
      {
        "index": 37,
        "start": 95040,
        "end": 5455,
        "content": "instead of other places?",
        "words": generateWordTokens("instead of other places?"),
        "contentVi": "thay vì những nơi khác?"
      },
      {
        "index": 38,
        "start": 97840,
        "end": 4578,
        "content": "Sure. Nowadays, the youth should visit",
        "words": generateWordTokens("Sure. Nowadays, the youth should visit"),
        "contentVi": "Chắc chắn. Ngày nay giới trẻ nên ghé thăm"
      },
      {
        "index": 39,
        "start": 100400,
        "end": 3940,
        "content": "these kind of places more often in order",
        "words": generateWordTokens("these kind of places more often in order"),
        "contentVi": "những nơi như thế này thường xuyên hơn theo thứ tự"
      },
      {
        "index": 40,
        "start": 102320,
        "end": 5742,
        "content": "to preserve historical and cultural",
        "words": generateWordTokens("to preserve historical and cultural"),
        "contentVi": "để bảo tồn lịch sử và văn hóa"
      },
      {
        "index": 41,
        "start": 104240,
        "end": 3824,
        "content": "values of their country.",
        "words": generateWordTokens("values of their country."),
        "contentVi": "giá trị của đất nước họ."
      }
    ]
  },

  "luyen-nghe-a2-gt00ysa_uck": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 - So Sánh",
    "audio_url": "gT00ySa_Uck",
    "repeat_offset": 218.08,
    "sentences": [
      {
        "index": 0,
        "start": 13519,
        "end": 6095,
        "content": "I see you got a new phone.",
        "words": generateWordTokens("I see you got a new phone."),
        "contentVi": "Tôi thấy bạn có một chiếc điện thoại mới."
      },
      {
        "index": 1,
        "start": 16240,
        "end": 5055,
        "content": "Yeah, I just got it yesterday.",
        "words": generateWordTokens("Yeah, I just got it yesterday."),
        "contentVi": "Ừ, tôi mới lấy nó hôm qua."
      },
      {
        "index": 2,
        "start": 19600,
        "end": 5619,
        "content": "How is it?",
        "words": generateWordTokens("How is it?"),
        "contentVi": "Nó thế nào rồi?"
      },
      {
        "index": 3,
        "start": 21279,
        "end": 6181,
        "content": "Great. It is better than my last phone.",
        "words": generateWordTokens("Great. It is better than my last phone."),
        "contentVi": "Tuyệt vời. Nó tốt hơn chiếc điện thoại cuối cùng của tôi."
      },
      {
        "index": 4,
        "start": 25199,
        "end": 4986,
        "content": "It is also lighter.",
        "words": generateWordTokens("It is also lighter."),
        "contentVi": "Nó cũng nhẹ hơn."
      },
      {
        "index": 5,
        "start": 27439,
        "end": 4267,
        "content": "How's the camera? Does it take better",
        "words": generateWordTokens("How's the camera? Does it take better"),
        "contentVi": "Máy ảnh thế nào? Liệu nó có tốt hơn không"
      },
      {
        "index": 6,
        "start": 30160,
        "end": 5470,
        "content": "pictures?",
        "words": generateWordTokens("pictures?"),
        "contentVi": "hình ảnh?"
      },
      {
        "index": 7,
        "start": 31679,
        "end": 7072,
        "content": "Yes, the pictures are great. The images",
        "words": generateWordTokens("Yes, the pictures are great. The images"),
        "contentVi": "Vâng, những bức ảnh thật tuyệt vời. Những hình ảnh"
      },
      {
        "index": 8,
        "start": 35600,
        "end": 5876,
        "content": "are brighter and sharper.",
        "words": generateWordTokens("are brighter and sharper."),
        "contentVi": "sáng hơn và sắc nét hơn."
      },
      {
        "index": 9,
        "start": 38719,
        "end": 6039,
        "content": "Much prettier than before.",
        "words": generateWordTokens("Much prettier than before."),
        "contentVi": "Đẹp hơn trước rất nhiều."
      },
      {
        "index": 10,
        "start": 41440,
        "end": 4680,
        "content": "Sounds great. I should get a new phone",
        "words": generateWordTokens("Sounds great. I should get a new phone"),
        "contentVi": "Âm thanh tuyệt vời. Tôi nên mua một chiếc điện thoại mới"
      },
      {
        "index": 11,
        "start": 44719,
        "end": 5565,
        "content": "as well.",
        "words": generateWordTokens("as well."),
        "contentVi": "cũng vậy."
      },
      {
        "index": 12,
        "start": 46079,
        "end": 5647,
        "content": "Well, if you do, buy it online. It's",
        "words": generateWordTokens("Well, if you do, buy it online. It's"),
        "contentVi": "Vâng, nếu bạn làm thế, hãy mua nó trực tuyến. Của nó"
      },
      {
        "index": 13,
        "start": 50239,
        "end": 5491,
        "content": "cheaper.",
        "words": generateWordTokens("cheaper."),
        "contentVi": "rẻ hơn."
      },
      {
        "index": 14,
        "start": 51680,
        "end": 7492,
        "content": "Good advice. I think I'll do that.",
        "words": generateWordTokens("Good advice. I think I'll do that."),
        "contentVi": "Lời khuyên tốt. Tôi nghĩ tôi sẽ làm điều đó."
      },
      {
        "index": 15,
        "start": 55680,
        "end": 5336,
        "content": "Conversation two. How is your online",
        "words": generateWordTokens("Conversation two. How is your online"),
        "contentVi": "Cuộc trò chuyện thứ hai. Mạng của bạn thế nào"
      },
      {
        "index": 16,
        "start": 59120,
        "end": 5659,
        "content": "class going?",
        "words": generateWordTokens("class going?"),
        "contentVi": "lớp học đang diễn ra?"
      },
      {
        "index": 17,
        "start": 60960,
        "end": 7341,
        "content": "Good. It is better than I expected.",
        "words": generateWordTokens("Good. It is better than I expected."),
        "contentVi": "Tốt. Nó tốt hơn tôi mong đợi."
      },
      {
        "index": 18,
        "start": 64720,
        "end": 6625,
        "content": "Oh, I'm happy to hear that.",
        "words": generateWordTokens("Oh, I'm happy to hear that."),
        "contentVi": "Ồ, tôi rất vui khi nghe điều đó."
      },
      {
        "index": 19,
        "start": 68240,
        "end": 7267,
        "content": "Yeah, it's more convenient to study at",
        "words": generateWordTokens("Yeah, it's more convenient to study at"),
        "contentVi": "Ừ, học ở đó thuận tiện hơn"
      },
      {
        "index": 20,
        "start": 71280,
        "end": 6071,
        "content": "home and it is also more relaxing.",
        "words": generateWordTokens("home and it is also more relaxing."),
        "contentVi": "về nhà và nó cũng thư giãn hơn."
      },
      {
        "index": 21,
        "start": 75439,
        "end": 5596,
        "content": "How so?",
        "words": generateWordTokens("How so?"),
        "contentVi": "Làm sao vậy?"
      },
      {
        "index": 22,
        "start": 77280,
        "end": 5837,
        "content": "Well, I don't have to get dressed or go",
        "words": generateWordTokens("Well, I don't have to get dressed or go"),
        "contentVi": "Chà, tôi không cần phải mặc quần áo hay đi"
      },
      {
        "index": 23,
        "start": 80960,
        "end": 6801,
        "content": "sit at a desk.",
        "words": generateWordTokens("sit at a desk."),
        "contentVi": "ngồi vào bàn làm việc."
      },
      {
        "index": 24,
        "start": 83040,
        "end": 8802,
        "content": "Plus, you can get up later. Yes, that is",
        "words": generateWordTokens("Plus, you can get up later. Yes, that is"),
        "contentVi": "Ngoài ra, bạn có thể thức dậy muộn hơn. Vâng, đó là"
      },
      {
        "index": 25,
        "start": 87680,
        "end": 7048,
        "content": "a big advantage. However, it is more",
        "words": generateWordTokens("a big advantage. However, it is more"),
        "contentVi": "một lợi thế lớn. Tuy nhiên, nó còn hơn thế nữa"
      },
      {
        "index": 26,
        "start": 91759,
        "end": 4893,
        "content": "interesting to study with people in",
        "words": generateWordTokens("interesting to study with people in"),
        "contentVi": "thú vị để học với mọi người trong"
      },
      {
        "index": 27,
        "start": 94640,
        "end": 5295,
        "content": "class.",
        "words": generateWordTokens("class."),
        "contentVi": "lớp học."
      },
      {
        "index": 28,
        "start": 96560,
        "end": 6097,
        "content": "Yeah, for some, I suppose, but not",
        "words": generateWordTokens("Yeah, for some, I suppose, but not"),
        "contentVi": "Vâng, đối với một số người, tôi cho là vậy, nhưng không"
      },
      {
        "index": 29,
        "start": 99840,
        "end": 5379,
        "content": "everyone.",
        "words": generateWordTokens("everyone."),
        "contentVi": "mọi người."
      },
      {
        "index": 30,
        "start": 102560,
        "end": 7622,
        "content": "Conversation three.",
        "words": generateWordTokens("Conversation three."),
        "contentVi": "Cuộc trò chuyện thứ ba."
      },
      {
        "index": 31,
        "start": 105119,
        "end": 8425,
        "content": "So, do you prefer cats or dogs?",
        "words": generateWordTokens("So, do you prefer cats or dogs?"),
        "contentVi": "Vậy bạn thích mèo hay chó hơn?"
      },
      {
        "index": 32,
        "start": 110079,
        "end": 4991,
        "content": "I prefer dogs. They're much more",
        "words": generateWordTokens("I prefer dogs. They're much more"),
        "contentVi": "Tôi thích chó hơn. Họ còn nhiều hơn thế nữa"
      },
      {
        "index": 33,
        "start": 113439,
        "end": 5714,
        "content": "playful.",
        "words": generateWordTokens("playful."),
        "contentVi": "vui tươi."
      },
      {
        "index": 34,
        "start": 114960,
        "end": 7475,
        "content": "That may be true, but cats are cheaper.",
        "words": generateWordTokens("That may be true, but cats are cheaper."),
        "contentVi": "Điều đó có thể đúng, nhưng mèo thì rẻ hơn."
      },
      {
        "index": 35,
        "start": 119040,
        "end": 8198,
        "content": "They don't eat as much as dogs.",
        "words": generateWordTokens("They don't eat as much as dogs."),
        "contentVi": "Chúng không ăn nhiều như chó."
      },
      {
        "index": 36,
        "start": 122320,
        "end": 8761,
        "content": "That is true. Dogs eat a lot, so they",
        "words": generateWordTokens("That is true. Dogs eat a lot, so they"),
        "contentVi": "Đó là sự thật. Chó ăn rất nhiều nên chúng"
      },
      {
        "index": 37,
        "start": 127119,
        "end": 7648,
        "content": "usually are more expensive. However,",
        "words": generateWordTokens("usually are more expensive. However,"),
        "contentVi": "thường đắt hơn. Tuy nhiên,"
      },
      {
        "index": 38,
        "start": 130959,
        "end": 7892,
        "content": "smaller dogs don't eat so much.",
        "words": generateWordTokens("smaller dogs don't eat so much."),
        "contentVi": "những con chó nhỏ hơn không ăn nhiều."
      },
      {
        "index": 39,
        "start": 134640,
        "end": 7655,
        "content": "Also, cats are easier to take care of.",
        "words": generateWordTokens("Also, cats are easier to take care of."),
        "contentVi": "Ngoài ra, mèo còn dễ chăm sóc hơn."
      },
      {
        "index": 40,
        "start": 138720,
        "end": 7259,
        "content": "Dogs are more demanding",
        "words": generateWordTokens("Dogs are more demanding"),
        "contentVi": "Chó đòi hỏi khắt khe hơn"
      },
      {
        "index": 41,
        "start": 142160,
        "end": 5502,
        "content": "usually. Plus, you don't have to walk",
        "words": generateWordTokens("usually. Plus, you don't have to walk"),
        "contentVi": "thường xuyên. Ngoài ra, bạn không cần phải đi bộ"
      },
      {
        "index": 42,
        "start": 145840,
        "end": 5986,
        "content": "cats.",
        "words": generateWordTokens("cats."),
        "contentVi": "mèo."
      },
      {
        "index": 43,
        "start": 147520,
        "end": 7108,
        "content": "I want a dog, actually, but I need a",
        "words": generateWordTokens("I want a dog, actually, but I need a"),
        "contentVi": "Thực ra tôi muốn có một con chó, nhưng tôi cần một"
      },
      {
        "index": 44,
        "start": 151680,
        "end": 8392,
        "content": "bigger place if I get one.",
        "words": generateWordTokens("bigger place if I get one."),
        "contentVi": "nơi lớn hơn nếu tôi có được một cái."
      },
      {
        "index": 45,
        "start": 154480,
        "end": 8234,
        "content": "You would. Your place is too small.",
        "words": generateWordTokens("You would. Your place is too small."),
        "contentVi": "Bạn sẽ làm vậy. Chỗ của bạn quá nhỏ."
      },
      {
        "index": 46,
        "start": 159920,
        "end": 6000,
        "content": "Conversation four.",
        "words": generateWordTokens("Conversation four."),
        "contentVi": "Cuộc trò chuyện thứ tư."
      },
      {
        "index": 47,
        "start": 162560,
        "end": 6562,
        "content": "What do you usually do for dinner?",
        "words": generateWordTokens("What do you usually do for dinner?"),
        "contentVi": "Bạn thường làm gì cho bữa tối?"
      },
      {
        "index": 48,
        "start": 165760,
        "end": 5766,
        "content": "I usually cook at home.",
        "words": generateWordTokens("I usually cook at home."),
        "contentVi": "Tôi thường nấu ăn ở nhà."
      },
      {
        "index": 49,
        "start": 168959,
        "end": 8410,
        "content": "I never go out.",
        "words": generateWordTokens("I never go out."),
        "contentVi": "Tôi không bao giờ đi ra ngoài."
      },
      {
        "index": 50,
        "start": 171360,
        "end": 8971,
        "content": "Really? I never cook. I always eat out.",
        "words": generateWordTokens("Really? I never cook. I always eat out."),
        "contentVi": "Thật sự? Tôi không bao giờ nấu ăn. Tôi luôn ăn ngoài."
      },
      {
        "index": 51,
        "start": 177200,
        "end": 5936,
        "content": "You should cook more. It's much",
        "words": generateWordTokens("You should cook more. It's much"),
        "contentVi": "Bạn nên nấu ăn nhiều hơn. nó nhiều lắm"
      },
      {
        "index": 52,
        "start": 180160,
        "end": 7220,
        "content": "healthier and cheaper.",
        "words": generateWordTokens("healthier and cheaper."),
        "contentVi": "khỏe mạnh và rẻ hơn."
      },
      {
        "index": 53,
        "start": 182959,
        "end": 7224,
        "content": "Maybe, but eating out is more convenient",
        "words": generateWordTokens("Maybe, but eating out is more convenient"),
        "contentVi": "Có thể, nhưng đi ăn ngoài sẽ tiện hơn"
      },
      {
        "index": 54,
        "start": 187200,
        "end": 7387,
        "content": "and it's easier.",
        "words": generateWordTokens("and it's easier."),
        "contentVi": "và nó dễ dàng hơn."
      },
      {
        "index": 55,
        "start": 190000,
        "end": 8190,
        "content": "Not always. Plus, it is much more",
        "words": generateWordTokens("Not always. Plus, it is much more"),
        "contentVi": "Không phải lúc nào cũng vậy. Hơn nữa, nó còn hơn thế nữa"
      },
      {
        "index": 56,
        "start": 194400,
        "end": 6673,
        "content": "expensive to eat out all the time.",
        "words": generateWordTokens("expensive to eat out all the time."),
        "contentVi": "đắt tiền đi ăn ngoài luôn."
      },
      {
        "index": 57,
        "start": 198000,
        "end": 6918,
        "content": "Cooking is much cheaper.",
        "words": generateWordTokens("Cooking is much cheaper."),
        "contentVi": "Nấu ăn rẻ hơn nhiều."
      },
      {
        "index": 58,
        "start": 200879,
        "end": 7802,
        "content": "Not for me. When I buy groceries, I",
        "words": generateWordTokens("Not for me. When I buy groceries, I"),
        "contentVi": "Không dành cho tôi. Khi tôi mua đồ tạp hóa, tôi"
      },
      {
        "index": 59,
        "start": 204720,
        "end": 6925,
        "content": "always end up wasting it. Plus, cooking",
        "words": generateWordTokens("always end up wasting it. Plus, cooking"),
        "contentVi": "luôn luôn lãng phí nó. Ngoài ra, nấu ăn"
      },
      {
        "index": 60,
        "start": 208480,
        "end": 5967,
        "content": "is more stressful. It is more relaxing",
        "words": generateWordTokens("is more stressful. It is more relaxing"),
        "contentVi": "căng thẳng hơn. Nó thư giãn hơn"
      },
      {
        "index": 61,
        "start": 211440,
        "end": 7570,
        "content": "to eat in a restaurant.",
        "words": generateWordTokens("to eat in a restaurant."),
        "contentVi": "đi ăn ở nhà hàng."
      },
      {
        "index": 62,
        "start": 214239,
        "end": 10015,
        "content": "Maybe, but cooking is more enjoyable. I",
        "words": generateWordTokens("Maybe, but cooking is more enjoyable. I"),
        "contentVi": "Có thể, nhưng nấu ăn thú vị hơn. TÔI"
      },
      {
        "index": 63,
        "start": 218799,
        "end": 5460,
        "content": "could never eat out every night.",
        "words": generateWordTokens("could never eat out every night."),
        "contentVi": "không bao giờ có thể đi ăn ngoài mỗi tối."
      }
    ]
  },

  "luyen-nghe-a2-xadlqr_bdci": {
    "title": "Luyện Nghe Tiếng Anh Cơ Bản A2 - Life Moments",
    "audio_url": "XADlqr_bDcI",
    "repeat_offset": 142.56,
    "sentences": [
      {
        "index": 0,
        "start": 12960,
        "end": 4893,
        "content": "How is your new job?",
        "words": generateWordTokens("How is your new job?"),
        "contentVi": "Công việc mới của bạn thế nào?"
      },
      {
        "index": 1,
        "start": 15040,
        "end": 4735,
        "content": "It's good. The job is interesting and",
        "words": generateWordTokens("It's good. The job is interesting and"),
        "contentVi": "Nó tốt. Công việc thật thú vị và"
      },
      {
        "index": 2,
        "start": 17840,
        "end": 4098,
        "content": "the people are nice.",
        "words": generateWordTokens("the people are nice."),
        "contentVi": "mọi người rất tốt."
      },
      {
        "index": 3,
        "start": 19760,
        "end": 5220,
        "content": "Is it near your house?",
        "words": generateWordTokens("Is it near your house?"),
        "contentVi": "Nó có gần nhà bạn không?"
      },
      {
        "index": 4,
        "start": 21920,
        "end": 5782,
        "content": "No, it is in the city so it's far away.",
        "words": generateWordTokens("No, it is in the city so it's far away."),
        "contentVi": "Không, nó ở trong thành phố nên rất xa."
      },
      {
        "index": 5,
        "start": 24960,
        "end": 5945,
        "content": "It takes an hour to get there.",
        "words": generateWordTokens("It takes an hour to get there."),
        "contentVi": "Phải mất một giờ để đến đó."
      },
      {
        "index": 6,
        "start": 27680,
        "end": 6668,
        "content": "Oh no. How is the commute?",
        "words": generateWordTokens("Oh no. How is the commute?"),
        "contentVi": "Ồ không. Việc đi lại thế nào?"
      },
      {
        "index": 7,
        "start": 30880,
        "end": 5710,
        "content": "It's long and it is expensive, but I",
        "words": generateWordTokens("It's long and it is expensive, but I"),
        "contentVi": "Nó dài và đắt tiền, nhưng tôi"
      },
      {
        "index": 8,
        "start": 34320,
        "end": 4514,
        "content": "don't mind too much.",
        "words": generateWordTokens("don't mind too much."),
        "contentVi": "đừng bận tâm quá nhiều."
      },
      {
        "index": 9,
        "start": 36559,
        "end": 3238,
        "content": "Why don't you take the bus? It's really",
        "words": generateWordTokens("Why don't you take the bus? It's really"),
        "contentVi": "Tại sao bạn không đi xe buýt? Nó thực sự"
      },
      {
        "index": 10,
        "start": 38800,
        "end": 4039,
        "content": "cheap.",
        "words": generateWordTokens("cheap."),
        "contentVi": "rẻ."
      },
      {
        "index": 11,
        "start": 39760,
        "end": 5880,
        "content": "I would, but the bus is really slow and",
        "words": generateWordTokens("I would, but the bus is really slow and"),
        "contentVi": "Tôi sẽ làm vậy, nhưng xe buýt chạy rất chậm và"
      },
      {
        "index": 12,
        "start": 42800,
        "end": 5322,
        "content": "crowded. I can't get a seat.",
        "words": generateWordTokens("crowded. I can't get a seat."),
        "contentVi": "đông đúc. Tôi không thể có được một chỗ ngồi."
      },
      {
        "index": 13,
        "start": 45600,
        "end": 4606,
        "content": "Yeah, it is crowded.",
        "words": generateWordTokens("Yeah, it is crowded."),
        "contentVi": "Vâng, nó đông đúc."
      },
      {
        "index": 14,
        "start": 48079,
        "end": 3729,
        "content": "Conversation two.",
        "words": generateWordTokens("Conversation two."),
        "contentVi": "Cuộc trò chuyện thứ hai."
      },
      {
        "index": 15,
        "start": 50160,
        "end": 4530,
        "content": "How was your weekend?",
        "words": generateWordTokens("How was your weekend?"),
        "contentVi": "Cuối tuần của bạn thế nào?"
      },
      {
        "index": 16,
        "start": 51760,
        "end": 5252,
        "content": "Good. I went to the new mall.",
        "words": generateWordTokens("Good. I went to the new mall."),
        "contentVi": "Tốt. Tôi đã đi đến trung tâm mua sắm mới."
      },
      {
        "index": 17,
        "start": 54640,
        "end": 6294,
        "content": "Oh, yeah. How was it?",
        "words": generateWordTokens("Oh, yeah. How was it?"),
        "contentVi": "Ồ, vâng. Nó thế nào?"
      },
      {
        "index": 18,
        "start": 56960,
        "end": 7177,
        "content": "Great. It has a really nice food court.",
        "words": generateWordTokens("Great. It has a really nice food court."),
        "contentVi": "Tuyệt vời. Nó có một khu ẩm thực thực sự tốt đẹp."
      },
      {
        "index": 19,
        "start": 60879,
        "end": 6142,
        "content": "Oh, cool. How was the food?",
        "words": generateWordTokens("Oh, cool. How was the food?"),
        "contentVi": "Ồ, tuyệt. Thức ăn thế nào?"
      },
      {
        "index": 20,
        "start": 64080,
        "end": 5024,
        "content": "Really good. The food was delicious and",
        "words": generateWordTokens("Really good. The food was delicious and"),
        "contentVi": "Thực sự tốt. Thức ăn rất ngon và"
      },
      {
        "index": 21,
        "start": 66960,
        "end": 3747,
        "content": "not expensive.",
        "words": generateWordTokens("not expensive."),
        "contentVi": "không đắt tiền."
      },
      {
        "index": 22,
        "start": 69040,
        "end": 4148,
        "content": "Was it healthy?",
        "words": generateWordTokens("Was it healthy?"),
        "contentVi": "Nó có khỏe mạnh không?"
      },
      {
        "index": 23,
        "start": 70640,
        "end": 3671,
        "content": "Not really, but the portions are really",
        "words": generateWordTokens("Not really, but the portions are really"),
        "contentVi": "Không thực sự, nhưng các phần thực sự là"
      },
      {
        "index": 24,
        "start": 73119,
        "end": 4474,
        "content": "big.",
        "words": generateWordTokens("big."),
        "contentVi": "to lớn."
      },
      {
        "index": 25,
        "start": 74240,
        "end": 5674,
        "content": "Oh, that's good to know.",
        "words": generateWordTokens("Oh, that's good to know."),
        "contentVi": "Ồ, thật tốt khi biết điều đó."
      },
      {
        "index": 26,
        "start": 77520,
        "end": 4878,
        "content": "Conversation three.",
        "words": generateWordTokens("Conversation three."),
        "contentVi": "Cuộc trò chuyện thứ ba."
      },
      {
        "index": 27,
        "start": 79840,
        "end": 5999,
        "content": "How is your new computer?",
        "words": generateWordTokens("How is your new computer?"),
        "contentVi": "Máy tính mới của bạn thế nào?"
      },
      {
        "index": 28,
        "start": 82320,
        "end": 4962,
        "content": "Good. It is fast and has lots of cool",
        "words": generateWordTokens("Good. It is fast and has lots of cool"),
        "contentVi": "Tốt. Nó nhanh và có nhiều điều thú vị"
      },
      {
        "index": 29,
        "start": 85759,
        "end": 4086,
        "content": "features.",
        "words": generateWordTokens("features."),
        "contentVi": "đặc trưng."
      },
      {
        "index": 30,
        "start": 87200,
        "end": 5847,
        "content": "It looks expensive though.",
        "words": generateWordTokens("It looks expensive though."),
        "contentVi": "Tuy nhiên nó có vẻ đắt tiền."
      },
      {
        "index": 31,
        "start": 89759,
        "end": 4410,
        "content": "Yeah, it's not cheap, but I need it for",
        "words": generateWordTokens("Yeah, it's not cheap, but I need it for"),
        "contentVi": "Vâng, nó không rẻ, nhưng tôi cần nó"
      },
      {
        "index": 32,
        "start": 92960,
        "end": 4572,
        "content": "work.",
        "words": generateWordTokens("work."),
        "contentVi": "công việc."
      },
      {
        "index": 33,
        "start": 94079,
        "end": 6255,
        "content": "Is it light? It doesn't look very heavy.",
        "words": generateWordTokens("Is it light? It doesn't look very heavy."),
        "contentVi": "Nó có nhẹ không? Nó trông không nặng lắm."
      },
      {
        "index": 34,
        "start": 97439,
        "end": 4498,
        "content": "Yes, it is very light. It only weighs 1",
        "words": generateWordTokens("Yes, it is very light. It only weighs 1"),
        "contentVi": "Vâng, nó rất nhẹ. Nó chỉ nặng 1"
      },
      {
        "index": 35,
        "start": 100240,
        "end": 4900,
        "content": "kg.",
        "words": generateWordTokens("kg."),
        "contentVi": "kg."
      },
      {
        "index": 36,
        "start": 101840,
        "end": 4902,
        "content": "Wow, that is light. My computer is so",
        "words": generateWordTokens("Wow, that is light. My computer is so"),
        "contentVi": "Wow, thật nhẹ nhàng. Máy tính của tôi là vậy"
      },
      {
        "index": 37,
        "start": 105040,
        "end": 4184,
        "content": "big and heavy.",
        "words": generateWordTokens("big and heavy."),
        "contentVi": "to và nặng."
      },
      {
        "index": 38,
        "start": 106640,
        "end": 5307,
        "content": "Is your computer old?",
        "words": generateWordTokens("Is your computer old?"),
        "contentVi": "Máy tính của bạn có cũ không?"
      },
      {
        "index": 39,
        "start": 109119,
        "end": 4429,
        "content": "Yes, it's over 5 years old. It's time",
        "words": generateWordTokens("Yes, it's over 5 years old. It's time"),
        "contentVi": "Vâng, nó đã hơn 5 tuổi. Đã đến lúc"
      },
      {
        "index": 40,
        "start": 111840,
        "end": 5952,
        "content": "for a new one.",
        "words": generateWordTokens("for a new one."),
        "contentVi": "cho một cái mới."
      },
      {
        "index": 41,
        "start": 113439,
        "end": 6514,
        "content": "Yeah, that is pretty old for a computer.",
        "words": generateWordTokens("Yeah, that is pretty old for a computer."),
        "contentVi": "Vâng, cái đó khá cũ đối với máy tính."
      },
      {
        "index": 42,
        "start": 117680,
        "end": 4678,
        "content": "Conversation four.",
        "words": generateWordTokens("Conversation four."),
        "contentVi": "Cuộc trò chuyện thứ tư."
      },
      {
        "index": 43,
        "start": 119840,
        "end": 6120,
        "content": "How is your math class?",
        "words": generateWordTokens("How is your math class?"),
        "contentVi": "Lớp toán của bạn thế nào?"
      },
      {
        "index": 44,
        "start": 122240,
        "end": 6442,
        "content": "Not good. It is very difficult.",
        "words": generateWordTokens("Not good. It is very difficult."),
        "contentVi": "Không tốt. Nó rất khó khăn."
      },
      {
        "index": 45,
        "start": 125840,
        "end": 5646,
        "content": "Oh, I thought you liked math.",
        "words": generateWordTokens("Oh, I thought you liked math."),
        "contentVi": "Ồ, tôi tưởng bạn thích toán."
      },
      {
        "index": 46,
        "start": 128560,
        "end": 5808,
        "content": "I do, but the class is hard and the",
        "words": generateWordTokens("I do, but the class is hard and the"),
        "contentVi": "Tôi biết, nhưng lớp học khó và"
      },
      {
        "index": 47,
        "start": 131360,
        "end": 5251,
        "content": "teacher is really boring.",
        "words": generateWordTokens("teacher is really boring."),
        "contentVi": "thầy chán thật."
      },
      {
        "index": 48,
        "start": 134239,
        "end": 5335,
        "content": "Oh, that's too bad.",
        "words": generateWordTokens("Oh, that's too bad."),
        "contentVi": "Ôi, tệ quá."
      },
      {
        "index": 49,
        "start": 136480,
        "end": 5656,
        "content": "Plus, the room is really old and the",
        "words": generateWordTokens("Plus, the room is really old and the"),
        "contentVi": "Thêm vào đó, căn phòng thực sự cũ và"
      },
      {
        "index": 50,
        "start": 139440,
        "end": 5658,
        "content": "chairs are uncomfortable.",
        "words": generateWordTokens("chairs are uncomfortable."),
        "contentVi": "ghế không thoải mái."
      },
      {
        "index": 51,
        "start": 142000,
        "end": 6502,
        "content": "That doesn't sound like a fun class.",
        "words": generateWordTokens("That doesn't sound like a fun class."),
        "contentVi": "Nghe có vẻ không phải là một lớp học vui vẻ."
      },
      {
        "index": 52,
        "start": 144959,
        "end": 3546,
        "content": "It's not.",
        "words": generateWordTokens("It's not."),
        "contentVi": "Không phải vậy."
      },
      {
        "index": 53,
        "start": 148730,
        "end": 4019,
        "content": "[Music]",
        "words": generateWordTokens("[Music]"),
        "contentVi": "[Âm nhạc]"
      }
    ]
  }
};
