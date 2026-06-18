export interface ReadingParagraph {
  english: string;
  vietnamese: string;
}

export interface ReadingVocab {
  word: string;
  meaning: string;
  pronunciation: string;
}

export interface ReadingQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export interface IELTSReadingLesson {
  unitNum: number;
  title: string;
  unitTitle: string;
  description: string;
  paragraphs: ReadingParagraph[];
  vocabulary: ReadingVocab[];
  questions: ReadingQuestion[];
}

export const ieltsReadingLessons: Record<number, IELTSReadingLesson> = {
  1: {
    unitNum: 1,
    title: "A Day in the Life: Teenagers' Daily Routines",
    unitTitle: "Unit 1: Daily Life (Reading & Vocabulary)",
    description: "Đọc hiểu về cuộc sống thường nhật của ba bạn học sinh Nina (Na Uy), Ava (Úc), và Michael (Brazil) để trả lời các câu hỏi chọn đáp án đúng.",
    paragraphs: [
      {
        english: "NINA (NORWAY): I live in a village on Norway's Atlantic coast. I get up at 7:30am and walk to college. Classes begin at 8:30am and finish at 3pm. After that, I go to one of the college clubs. These are not very expensive and there are lots to choose from: I do athletics and football but you can also do things like folk dancing and cross-country skiing. When my parents come home from work, my dad makes dinner and we all eat together. After that, my mum takes me out for a driving lesson. I've got my test soon and I need to practise!",
        vietnamese: "NINA (NA UY): Tôi sống ở một ngôi làng trên bờ biển Đại Tây Dương của Na Uy. Tôi thức dậy lúc 7:30 sáng và đi bộ đến trường cao đẳng. Các tiết học bắt đầu lúc 8:30 sáng và kết thúc lúc 3 giờ chiều. Sau đó, tôi tham gia một trong các câu lạc bộ của trường. Những câu lạc bộ này không đắt lắm và có rất nhiều lựa chọn: tôi chơi điền kinh và bóng đá nhưng bạn cũng có thể tham gia các hoạt động như khiêu vũ dân gian và trượt tuyết băng đồng. Khi bố mẹ đi làm về, bố tôi nấu bữa tối và tất cả chúng tôi cùng ăn. Sau đó, mẹ đưa tôi đi tập lái xe. Tôi sắp có bài kiểm tra và cần phải luyện tập!"
      },
      {
        english: "AVA (AUSTRALIA): I'm from a small town in Queensland. Most people in Australia live near the coast, but we live on a cattle farm in the centre of the country. I get up at around 7am and have breakfast. My mum teaches at my college, so I usually go with her in the car instead of taking the bus. College starts at 8:30am and finishes at 4pm. When I get home, I help my dad on the farm for a few hours. In the evenings, I try to watch TV but I'm usually too tired. I go to bed at about 10:00pm.",
        vietnamese: "AVA (ÚC): Tôi đến từ một thị trấn nhỏ ở Queensland. Hầu hết người dân ở Úc sống gần bờ biển, nhưng chúng tôi sống ở một trang trại chăn nuôi gia súc ở miền trung đất nước. Tôi thức dậy vào khoảng 7 giờ sáng và ăn sáng. Mẹ tôi dạy ở trường cao đẳng của tôi, vì vậy tôi thường đi cùng mẹ bằng ô tô thay vì đi xe buýt. Trường học bắt đầu lúc 8:30 sáng và kết thúc lúc 4 giờ chiều. Khi về nhà, tôi giúp bố làm việc ở trang trại vài giờ. Vào buổi tối, tôi cố gắng xem TV nhưng thường quá mệt. Tôi đi ngủ vào khoảng 10 giờ tối."
      },
      {
        english: "MICHAEL (BRAZIL): I live in Rio de Janeiro. I get up at 6am and catch a bus to college at 6:30am. Lessons start at 7:20am. We have a break at 9:50am and then study until 12:30pm. I get home at about 1:40pm. After that, I often go to the beach with my friends to swim in the ocean or play beach volleyball, but I sometimes also just stay at home to sleep or study. In the evenings, I cook dinner for my family; then we watch TV or listen to the radio before bed. I switch off my light at about 10pm.",
        vietnamese: "MICHAEL (BRAZIL): Tôi sống ở Rio de Janeiro. Tôi thức dậy lúc 6 giờ sáng và bắt xe buýt đến trường lúc 6:30 sáng. Các tiết học bắt đầu lúc 7:20 sáng. Chúng tôi được nghỉ giải lao lúc 9:50 sáng và sau đó học cho đến 12:30 trưa. Tôi về nhà lúc khoảng 1:40 chiều. Sau đó, tôi thường ra bãi biển cùng bạn bè để bơi hoặc chơi bóng chuyền bãi biển, nhưng đôi khi tôi cũng chỉ ở nhà ngủ hoặc học bài. Vào buổi tối, tôi nấu bữa tối cho gia đình; sau đó chúng tôi xem TV hoặc nghe đài trước khi đi ngủ. Tôi tắt đèn đi ngủ vào khoảng 10 giờ tối."
      }
    ],
    vocabulary: [
      { word: "routine", meaning: "thói quen hàng ngày, trình tự làm việc cố định", pronunciation: "/ruːˈtiːn/" },
      { word: "cattle farm", meaning: "trang trại chăn nuôi gia súc (bò, trâu...)", pronunciation: "/ˈkæt.əl fɑːm/" },
      { word: "athletics", meaning: "môn điền kinh", pronunciation: "/æθˈlet.ɪks/" },
      { word: "switch off", meaning: "tắt (đèn, thiết bị)", pronunciation: "/swɪtʃ ɒf/" },
      { word: "practise", meaning: "luyện tập, thực hành", pronunciation: "/ˈpræk.tɪs/" }
    ],
    questions: [
      {
        id: "r-u1-q1",
        question: "Who works with a member of the family after college?",
        options: ["Ava", "Michael", "Nina"],
        correct_index: 0,
        explanation: "Ava nói: 'When I get home, I help my dad on the farm for a few hours' (Khi về nhà, tôi giúp bố làm việc ở trang trại vài giờ)."
      },
      {
        id: "r-u1-q2",
        question: "Who goes out in the car in the evenings?",
        options: ["Ava", "Michael", "Nina"],
        correct_index: 2,
        explanation: "Nina nói: 'In the evenings... my mum takes me out for a driving lesson' (Mẹ đưa tôi đi tập lái xe vào buổi tối)."
      },
      {
        id: "r-u1-q3",
        question: "Who gets a lift in a car to college most mornings?",
        options: ["Ava", "Michael", "Nina"],
        correct_index: 0,
        explanation: "Ava nói: 'My mum teaches at my college, so I usually go with her in the car instead of taking the bus' (Tôi thường đi cùng mẹ bằng ô tô thay vì đi xe buýt)."
      },
      {
        id: "r-u1-q4",
        question: "Who prepares the evening meal for the family?",
        options: ["Ava", "Michael", "Nina"],
        correct_index: 1,
        explanation: "Michael nói: 'In the evenings, I cook dinner for my family' (Tôi nấu bữa tối cho gia đình vào buổi tối). Lưu ý: Đối với Nina, bố của cô ấy mới là người nấu ăn ('my dad makes dinner')."
      },
      {
        id: "r-u1-q5",
        question: "Who pays to do extra activities in the afternoons?",
        options: ["Ava", "Michael", "Nina"],
        correct_index: 2,
        explanation: "Nina nói về các câu lạc bộ sau giờ học: 'These are not very expensive' (Những câu lạc bộ này không đắt lắm), ngụ ý việc tham gia các câu lạc bộ này phải trả phí."
      },
      {
        id: "r-u1-q6",
        question: "Who finds it difficult to watch TV in the evenings?",
        options: ["Ava", "Michael", "Nina"],
        correct_index: 0,
        explanation: "Ava nói: 'In the evenings, I try to watch TV but I'm usually too tired' (Tôi cố gắng xem TV nhưng thường quá mệt để xem)."
      },
      {
        id: "r-u1-q7",
        question: "Who lives a long way from the sea / coast?",
        options: ["Ava", "Michael", "Nina"],
        correct_index: 0,
        explanation: "Ava nói: 'Most people in Australia live near the coast, but we live on a cattle farm in the centre of the country' (Chúng tôi sống ở miền trung đất nước - xa bờ biển)."
      },
      {
        id: "r-u1-sc1",
        question: "[Sentence Completion] Dan usually ___ (get up) at 8am and ___ (have) a shower.",
        options: ["get up / has", "gets up / have", "gets up / has", "getting up / having"],
        correct_index: 2,
        explanation: "Chủ ngữ là ngôi thứ ba số ít 'Dan' nên động từ 'get up' chia thành 'gets up', 'have' chia thành 'has' ở thì hiện tại đơn."
      },
      {
        id: "r-u1-sc2",
        question: "[Sentence Completion] Dan always ___ (study) for a few hours and then he ___ (go) home.",
        options: ["studies / goes", "studys / goes", "study / go", "studying / going"],
        correct_index: 0,
        explanation: "Chủ ngữ 'Dan' (số ít) nên động từ 'study' đổi y thành i + es -> 'studies', 'go' tận cùng bằng 'o' thêm es -> 'goes'."
      },
      {
        id: "r-u1-sc3",
        question: "[Sentence Completion] Dan never ___ (go) to bed early, but usually ___ (fall) asleep at around midnight.",
        options: ["goes / falls", "goes / fall", "go / falls", "going / falling"],
        correct_index: 0,
        explanation: "Chủ ngữ 'Dan' chia động từ ở thì hiện tại đơn: 'goes' và 'falls'."
      },
      {
        id: "r-u1-match1",
        question: "[Matching] Match the phrase: 'do the laundry' has a similar meaning to...",
        options: ["take out the bins (vứt rác)", "prepare a meal (chuẩn bị bữa ăn)", "wash the clothes (giặt quần áo)", "clean the dishes (rửa bát đĩa)"],
        correct_index: 2,
        explanation: "'Do the laundry' và 'wash the clothes' đều có nghĩa là giặt giũ quần áo."
      },
      {
        id: "r-u1-match2",
        question: "[Matching] Match the phrase: 'tidy up' has a similar meaning to...",
        options: ["clean the dishes (rửa bát đĩa)", "put things away (dọn dẹp, cất đồ đạc ngăn nắp)", "do the housework (làm việc nhà)", "take out the bins (vứt rác)"],
        correct_index: 1,
        explanation: "'Tidy up' và 'put things away' đều mang nghĩa dọn dẹp, sắp xếp cất gọn đồ đạc."
      },
      {
        id: "r-u1-match3",
        question: "[Matching] Match the phrase: 'wash up' has a similar meaning to...",
        options: ["prepare a meal (chuẩn bị bữa ăn)", "do the housework (làm việc nhà)", "clean the dishes (rửa bát đĩa)", "wash the clothes (giặt quần áo)"],
        correct_index: 2,
        explanation: "'Wash up' và 'clean the dishes' đều mang nghĩa rửa chén bát sau khi ăn."
      },
      {
        id: "r-u1-match4",
        question: "[Matching] Match the phrase: 'make lunch/dinner' has a similar meaning to...",
        options: ["prepare a meal (chuẩn bị bữa ăn)", "take out the bins (vứt rác)", "do the housework (làm việc nhà)", "clean the dishes (rửa bát đĩa)"],
        correct_index: 0,
        explanation: "'Make lunch/dinner' có nghĩa tương đương với 'prepare a meal' (nấu ăn, chuẩn bị bữa ăn)."
      },
      {
        id: "r-u1-match5",
        question: "[Matching] Match the phrase: 'put the rubbish out' has a similar meaning to...",
        options: ["wash the clothes (giặt quần áo)", "put things away (dọn dẹp đồ đạc)", "clean the dishes (rửa bát đĩa)", "take out the bins (mang rác ra thùng)"],
        correct_index: 3,
        explanation: "'Put the rubbish out' tương đương với 'take out the bins' (đổ rác, đem rác ra xe/thùng)."
      }
    ]
  },
  2: {
    unitNum: 2,
    title: "Finding Accommodation, Dialogues, and Routines",
    unitTitle: "Unit 2: House and Home (Reading & Writing)",
    description: "Đọc hiểu toàn bộ các phần của Unit 2 bao gồm: quảng cáo thuê nhà của Andrew Taylor, email khuyên nhủ của Gavin, cuộc hội thoại giữa Giorgio và ông Taylor, mô tả căn hộ mới của Giorgio và nhật ký hoạt động thường nhật của cậu ấy.",
    paragraphs: [
      {
        english: "TAYLOR PRIME LOCATION AGENCY (Page 24): We find accommodation for university students coming to the UK. We are based in our office in London, but we have flats and rooms in locations all over the country. Contact details: 020 7219 4386 or email andrewtaylor@uniaccom.co.uk. Office hours: Monday to Saturday. (Note: Advert has a mistake. The email address finishes with .co.uk and not .com).",
        vietnamese: "ĐẠI LÝ NHÀ Ở TAYLOR PRIME LOCATION (Trang 24): Chúng tôi tìm chỗ ở cho sinh viên đại học đến Vương quốc Anh. Văn phòng của chúng tôi đặt tại Luân Đôn, nhưng chúng tôi có các căn hộ và phòng cho thuê ở khắp cả nước. Liên hệ: 020 7219 4386 hoặc email andrewtaylor@uniaccom.co.uk. Giờ làm việc: Thứ Hai đến Thứ Bảy. (Lưu ý: Quảng cáo có lỗi sai. Địa chỉ email kếtthuốc bằng .co.uk chứ không phải .com)."
      },
      {
        english: "GIORGIO'S EMAIL REPLY (Page 31): Hi Gavin, we're both university students now! I live in private accommodation. I am very happy with my room. My bed is very comfortable. I have a big desk for studying and I have posters on the wall. The Wi-Fi here is very fast. I am happy about that because when I am in my bedroom I can speak to my parents online. I can also play online games. Do you have Wi-Fi in your room? Is the food nice where you live? Write soon, Giorgio.",
        vietnamese: "EMAIL PHẢN HỒI CỦA GIORGIO (Trang 31): Chào Gavin, cả hai chúng ta đều là sinh viên đại học rồi! Mình sống ở phòng trọ tư nhân bên ngoài. Mình rất hài lòng với căn phòng của mình. Giường ngủ rất thoải mái. Mình có một chiếc bàn học lớn để học tập và dán áp phích trên tường. Wi-Fi ở đây rất nhanh. Mình rất vui vì khi ở trong phòng ngủ mình có thể nói chuyện trực tuyến với bố mẹ. Mình cũng có thể chơi trò chơi điện tử trực tuyến. Phòng cậu có Wi-Fi không? Đồ ăn ở chỗ cậu có ngon không? Viết cho mình sớm nhé, Giorgio."
      },
      {
        english: "GIORGIO'S DAILY ROUTINE (Page 28): Every weekday morning, my alarm goes off at 8:30am. This gives me enough time to get ready before my lectures start at 10:00am. Then, I get up and go downstairs. I'm often too tired to eat breakfast, so I sometimes go to the fridge and just get some juice. I always talk to my housemates if they are there, in the kitchen. After that, I head back upstairs to get ready. I go to the bathroom, brush my teeth, and sometimes tidy my room. When it's time to leave, I pack my bag and go to college. At the end of the day when I get back home, I sometimes help the others with the housework; if we don't do it, all the rooms we share get very messy. When the house is clean again, we usually spend some time in the living room. We sit down together on the sofa and play games online for a while. Before I go to sleep, I sit at my desk and do my homework. I never forget to do it. At the weekend, I can finally relax. I have a lie in until about 11:30am.",
        vietnamese: "THÓI QUEN HÀNG NGÀY CỦA GIORGIO (Trang 28): Mỗi sáng ngày trong tuần, báo thức của tôi reo lúc 8:30 sáng. Thời gian này đủ để tôi chuẩn bị trước khi bài giảng bắt đầu lúc 10:00 sáng. Sau đó, tôi thức dậy và đi xuống lầu. Tôi thường quá mệt để ăn sáng, nên đôi khi tôi chỉ đến tủ lạnh lấy ít nước trái cây. Tôi luôn trò chuyện với những người bạn cùng nhà nếu họ ở đó, trong bếp. Sau đó, tôi đi ngược lên lầu để chuẩn bị. Tôi vào phòng tắm, đánh răng và đôi khi dọn dẹp phòng mình. Đến giờ đi học, tôi thu xếp cặp và đến trường. Cuối ngày khi về nhà, đôi khi tôi giúp những người khác làm việc nhà; nếu không làm, tất cả các phòng chung sẽ rất bừa bộn. Khi nhà cửa sạch sẽ, chúng tôi thường dành thời gian ở phòng khách. Chúng tôi ngồi cùng nhau trên ghế sofa và chơi trò chơi trực tuyến một lúc. Trước khi đi ngủ, tôi ngồi vào bàn học và làm bài tập. Tôi không bao giờ quên làm bài tập. Cuối tuần, tôi cuối cùng cũng có thể thư giãn. Tôi ngủ nướng đến khoảng 11:30 trưa."
      }
    ],
    vocabulary: [
      { word: "accommodation", meaning: "chỗ ở, phòng trọ tiện nghi", pronunciation: "/əˌkɒm.əˈdeɪ.ʃən/" },
      { word: "agent", meaning: "người môi giới nhà đất", pronunciation: "/ˈeɪ.dʒənt/" },
      { word: "catered", meaning: "chỗ ở bao gồm phục vụ ăn uống", pronunciation: "/ˈkeɪ.təd/" },
      { word: "housework", meaning: "công việc dọn dẹp nhà cửa", pronunciation: "/ˈhaʊs.wɜːk/" },
      { word: "lie in", meaning: "việc ngủ nướng, ngủ dậy muộn", pronunciation: "/ˌlaɪ ˈɪn/" },
      { word: "sofa", meaning: "ghế sofa, ghế bành dài", pronunciation: "/ˈsəʊ.fə/" }
    ],
    questions: [
      {
        id: "r-u2-ex9-1",
        question: "[Note Taking] What is the office location of Taylor Prime Location Agency?",
        options: ["London", "Milan", "Queensland", "Rio"],
        correct_index: 0,
        explanation: "Quảng cáo của Taylor Agency ghi rõ: 'We are based in our office in London'."
      },
      {
        id: "r-u2-ex9-2",
        question: "[Note Taking] What is the correct email of Andrew Taylor?",
        options: ["andrewtaylor@uniaccom.com", "andrewtaylor@uniaccom.co.uk", "gavin@uniaccom.co.uk", "giorgio@milan.it"],
        correct_index: 1,
        explanation: "Gavin chỉ ra lỗi sai trong quảng cáo: 'His email address finishes with .co.uk and not .com'."
      },
      {
        id: "r-u2-ex10-1",
        question: "[Who Says This?] 'Are you a student?'",
        options: ["Giorgio (Học sinh)", "Andrew Taylor (Môi giới)"],
        correct_index: 1,
        explanation: "Andrew Taylor là người môi giới nhà đất nên sẽ hỏi khách hàng: 'Are you a student?'"
      },
      {
        id: "r-u2-ex10-2",
        question: "[Who Says This?] 'I live with my parents at the moment.'",
        options: ["Giorgio (Học sinh)", "Andrew Taylor (Môi giới)"],
        correct_index: 0,
        explanation: "Giorgio là học sinh đi tìm nhà trọ nên sẽ cung cấp thông tin: 'I live with my parents at the moment.'"
      },
      {
        id: "r-u2-ex10-3",
        question: "[Who Says This?] 'What do you want to study?'",
        options: ["Giorgio (Học sinh)", "Andrew Taylor (Môi giới)"],
        correct_index: 1,
        explanation: "Người môi giới Andrew Taylor cần hỏi ngành học của Giorgio để tư vấn ký túc xá."
      },
      {
        id: "r-u2-ex14-1",
        question: "[Dialogue choice 1] 'Good afternoon, Prime Location Agency, Andrew Taylor ___.'",
        options: ["speak", "speaks", "speaking"],
        correct_index: 2,
        explanation: "Mẫu câu đàm thoại điện thoại lịch sự: '[Name] speaking'."
      },
      {
        id: "r-u2-ex14-2",
        question: "[Dialogue choice 2] 'Oh, hello, Giorgio. Thank you for your call, ___ have some questions for you.'",
        options: ["I hope that you don't mind.", "I hope that you mind.", "Do you mind?"],
        correct_index: 0,
        explanation: "'I hope that you don't mind' (Tôi hy vọng bạn không phiền) là cách diễn đạt lịch sự khi muốn hỏi ai đó."
      },
      {
        id: "r-u2-ex14-3",
        question: "[Dialogue choice 3] 'First of all, ___ in a room on campus or in private accommodation?'",
        options: ["Where you want to live?", "Where you do want to live?", "Where do you want to live?"],
        correct_index: 2,
        explanation: "Câu hỏi Wh-questions ở thì Hiện tại đơn: 'Where do you want to live?'"
      },
      {
        id: "r-u2-ex14-4",
        question: "[Dialogue choice 4] 'I'm not sure. ___?'",
        options: ["You can give me some advice?", "Can you give me some advice?", "Can give me you some advice?"],
        correct_index: 1,
        explanation: "Câu hỏi yêu cầu lịch sự với Can: 'Can you give me some advice?'"
      },
      {
        id: "r-u2-ex14-5",
        question: "[Dialogue choice 5] 'Well, tell me a little about your personality and your preferences. ___?'",
        options: ["Are you a sociable person?", "You are a sociable person?", "Do you be a sociable person?"],
        correct_index: 0,
        explanation: "Câu hỏi Yes/No với động từ to be: 'Are you a sociable person?'"
      },
      {
        id: "r-u2-ex14-6",
        question: "[Dialogue choice 6] 'OK, that's great. ___ sometimes have a quiet room where you can study in private?'",
        options: ["Do you also like to", "You also like to", "Do you also like"],
        correct_index: 0,
        explanation: "Cấu trúc 'like + to V': 'Do you also like to... have a quiet room?'"
      },
      {
        id: "r-u2-ex14-7",
        question: "[Dialogue choice 7] '___?' 'If you live in private accommodation, you have a quiet life...'",
        options: ["What you think?", "What you do think?", "What do you think?"],
        correct_index: 2,
        explanation: "Câu hỏi xin ý kiến: 'What do you think?' (Bạn nghĩ sao?)"
      },
      {
        id: "r-u2-ex14-8",
        question: "[Dialogue choice 8] 'OK, one final question. Would you prefer catered or self-catered? ___?'",
        options: ["What is catered mean?", "What does catered mean?", "What means catered?"],
        correct_index: 1,
        explanation: "Câu hỏi hỏi ý nghĩa từ vựng: 'What does catered mean?'"
      },
      {
        id: "r-u2-ex16-2",
        question: "[Dialogue Sentence 2] Andrew: 'The house has superfast broadband. The Wi-Fi is sometimes very busy and slow on campus.' - Giorgio: ___",
        options: [
          "Oh, that's good to know. I really like playing online games, you see. (G)",
          "Oh, great. Do the rooms on campus also have TVs? (A)",
          "Really? I like the idea of having a roommate. (B)",
          "Yes, but I prefer to study alone. (E)"
        ],
        correct_index: 0,
        explanation: "Giorgio phản hồi về tốc độ Wi-Fi vì thích chơi game: 'Oh, that's good to know. I really like playing online games, you see.'"
      },
      {
        id: "r-u2-ex16-3",
        question: "[Dialogue Sentence 3] Andrew: 'You also have a TV in the private room; so you can connect your computer and play games on the TV.' - Giorgio: ___",
        options: [
          "Oh, great. Do the rooms on campus also have TVs? (A)",
          "Really? I like the idea of having a roommate. (B)",
          "Yes, but I prefer to study alone. (E)",
          "Yes, that's a good idea. They always give me good advice. (F)"
        ],
        correct_index: 0,
        explanation: "Giorgio hỏi tiếp về phòng ở campus có TV không: 'Oh, great. Do the rooms on campus also have TVs?'"
      },
      {
        id: "r-u2-ex16-4",
        question: "[Dialogue Sentence 4] Andrew: 'No, but you or your roommate can bring one.' - Giorgio: ___",
        options: [
          "Really? I like the idea of having a roommate. (B)",
          "Yes, but I prefer to study alone. (E)",
          "Yes, that's a good idea. They always give me good advice. (F)",
          "Oh, that's good to know. (G)"
        ],
        correct_index: 0,
        explanation: "Giorgio phản ứng lại với thông tin về roommate: 'Really? I like the idea of having a roommate.'"
      },
      {
        id: "r-u2-ex16-5",
        question: "[Dialogue Sentence 5] Andrew: 'Yes, it's good because you can study together.' - Giorgio: ___",
        options: [
          "Yes, but I prefer to study alone. Oh, I don't know what to choose. (E)",
          "Yes, that's a good idea. They always give me good advice. (F)",
          "Really? I like the idea of having a roommate. (B)",
          "Oh, great. Do the rooms on campus also have TVs? (A)"
        ],
        correct_index: 0,
        explanation: "Giorgio phân vân và nói thích học một mình hơn: 'Yes, but I prefer to study alone. Oh, I don't know what to choose.'"
      },
      {
        id: "r-u2-ex16-6",
        question: "[Dialogue Sentence 6] Andrew: 'Would you like to discuss everything with your parents?' - Giorgio: ___",
        options: [
          "Yes, that's a good idea. They always give me good advice. (F)",
          "Yes, but I prefer to study alone. (E)",
          "Really? I like the idea of having a roommate. (B)",
          "Oh, great. Do the rooms on campus also have TVs? (A)"
        ],
        correct_index: 0,
        explanation: "Giorgio đồng ý thảo luận với bố mẹ: 'Yes, that's a good idea. They always give me good advice.'"
      },
      {
        id: "r-u2-ex18-1",
        question: "[Routine Cloze 1] 'Every weekday morning, my alarm goes ___ at 8:30am.'",
        options: ["up", "on", "off"],
        correct_index: 2,
        explanation: "Cụm động từ 'go off' có nghĩa là (chuông báo thức) reo."
      },
      {
        id: "r-u2-ex18-2",
        question: "[Routine Cloze 2] 'This gives me enough time to get ready... Then, I ___ up and go downstairs.'",
        options: ["get", "go", "put"],
        correct_index: 0,
        explanation: "'Get up' có nghĩa là thức dậy, ra khỏi giường."
      },
      {
        id: "r-u2-ex18-3",
        question: "[Routine Cloze 3] '...so I sometimes go to the ___ and just get some juice.'",
        options: ["fridge", "sink", "freezer"],
        correct_index: 0,
        explanation: "Nước trái cây (juice) thường cất trong tủ lạnh để uống lạnh mát -> 'fridge'."
      },
      {
        id: "r-u2-ex18-4",
        question: "[Routine Cloze 4] 'I always talk to my housemates... in the ___.'",
        options: ["basement", "kitchen", "bathroom"],
        correct_index: 1,
        explanation: "Họ gặp nhau ăn sáng/uống nước ở trong bếp -> 'kitchen'."
      },
      {
        id: "r-u2-ex18-5",
        question: "[Routine Cloze 5] 'I head back upstairs... go to the bathroom, ___ my teeth.'",
        options: ["wash", "tidy", "brush"],
        correct_index: 2,
        explanation: "Cụm từ cố định: 'brush one's teeth' (đánh răng)."
      },
      {
        id: "r-u2-ex18-6",
        question: "[Routine Cloze 6] '...and sometimes ___ my room.'",
        options: ["wash", "tidy", "brush"],
        correct_index: 1,
        explanation: "Dọn dẹp phòng ngủ của mình trật tự ngăn nắp -> 'tidy'."
      },
      {
        id: "r-u2-ex18-7",
        question: "[Routine Cloze 7] 'I sometimes help the others with the ___.'",
        options: ["homework", "housework", "workhouse"],
        correct_index: 1,
        explanation: "Dọn dẹp các phòng chung trong nhà thuê -> làm việc nhà -> 'housework'."
      },
      {
        id: "r-u2-ex18-8",
        question: "[Routine Cloze 8] 'We sit down together on the ___ and play games online.'",
        options: ["chair", "desk", "sofa"],
        correct_index: 2,
        explanation: "Ngồi cùng nhau ở phòng khách thì ngồi trên ghế sofa rộng -> 'sofa'."
      },
      {
        id: "r-u2-ex18-9",
        question: "[Routine Cloze 9] 'Before I go to sleep, I sit at my ___ and do my homework.'",
        options: ["desk", "bed", "drawers"],
        correct_index: 0,
        explanation: "Làm bài tập thì ngồi ở bàn học -> 'desk'."
      },
      {
        id: "r-u2-ex18-10",
        question: "[Routine Cloze 10] 'At the weekend, I can finally relax. I have a lie ___ until about 11:30am.'",
        options: ["on", "up", "in"],
        correct_index: 2,
        explanation: "Cụm từ cố định: 'have a lie in' (ngủ nướng, ngủ dậy muộn vào ngày nghỉ)."
      },
      {
        id: "r-u2-ex20-1",
        question: "[Grammar - Adverb Position] When we use the verb 'to be', the adverb of frequency comes ___ the verb.",
        options: ["before (trước)", "after (sau)"],
        correct_index: 1,
        explanation: "Đối với động từ 'to be', trạng từ tần suất đứng sau (ví dụ: 'I am often too tired')."
      },
      {
        id: "r-u2-ex20-2",
        question: "[Grammar - Adverb Position] When we use other verbs, the adverb of frequency comes ___ the verb.",
        options: ["before (trước)", "after (sau)"],
        correct_index: 0,
        explanation: "Đối với động từ thường, trạng từ tần suất đứng trước (ví dụ: 'We usually spend some time')."
      },
      {
        id: "r-u2-ex21-1",
        question: "[Grammar - Position of Never] Add 'never' to: 'I am late for school.'",
        options: ["I never am late for school.", "I am never late for school.", "I am late never for school.", "I am late for school never."],
        correct_index: 1,
        explanation: "'never' là trạng từ tần suất, đứng sau động từ to be 'am' -> 'I am never late for school.'"
      },
      {
        id: "r-u2-ex21-2",
        question: "[Grammar - Position of Never] Add 'never' to: 'I forget to do my homework.'",
        options: ["I forget never to do my homework.", "I forget to do my homework never.", "I never forget to do my homework.", "Never I forget to do my homework."],
        correct_index: 2,
        explanation: "'never' đứng trước động từ thường 'forget' -> 'I never forget to do my homework.'"
      },
      {
        id: "r-u2-vocab1",
        question: "[Vocabulary - Home Places] This is the place where you keep the car.",
        options: ["bedroom", "hallway", "garage", "garden"],
        correct_index: 2,
        explanation: "Garage (Nhà để xe) là nơi đỗ ô tô."
      },
      {
        id: "r-u2-vocab2",
        question: "[Vocabulary - Home Places] This is the place that you walk through to move from one room to another.",
        options: ["attic", "hallway (hành lang)", "basement", "kitchen"],
        correct_index: 1,
        explanation: "Hành lang nối giữa các phòng trong nhà là 'hallway'."
      }
    ]
  },
  3: {
    unitNum: 3,
    title: "Aimee Fuller: Snowboarding Star",
    unitTitle: "Unit 3: Hobbies (Reading & Vocabulary)",
    description: "Đọc hiểu bài viết về ngôi sao trượt tuyết Aimee Fuller để trả lời các câu hỏi True/False/Not Given. Luyện tập phân biệt các trạng từ tần suất (Adverbs of Frequency) và các thì Hiện tại đơn so với Hiện tại tiếp diễn qua các hội thoại thực tế.",
    paragraphs: [
      {
        english: "AIMEE FULLER - SNOWBOARDING STAR (Page 39): Aimee Fuller was born in England but now lives in the USA. She moved to the east coast of the United States at the age of 12 because she knew she wanted to be a professional snowboarder. It wasn't possible to train properly in her hometown because it hardly ever snowed. There was a dry ski slope in her town, where she learnt how to ski and snowboard, but there weren't any mountains with snow to practise the sport.",
        vietnamese: "AIMEE FULLER - NGÔI SAO TRƯỢT TUYẾT (Trang 39): Aimee Fuller sinh ra ở Anh nhưng hiện sống ở Mỹ. Cô chuyển đến bờ biển phía đông nước Mỹ năm 12 tuổi vì biết mình muốn trở thành vận động viên trượt tuyết chuyên nghiệp. Cô không thể tập luyện tử tế ở quê nhà vì ở đó hầu như không bao giờ có tuyết. Ở thị trấn của cô có một đường trượt tuyết khô, nơi cô học cách trượt tuyết và trượt ván, nhưng không có những ngọn núi phủ đầy tuyết để thực hành môn thể thao này."
      },
      {
        english: "AIMEE'S COACH AND DREAMS (Page 39): Aimee quickly found sponsors and a coach when she arrived in the USA, and she is now a successful and well-known snowboarding star. She has done really well in many national competitions and her dream is to win an Olympic medal one day. Aimee spends most of her time practising on the snow, and trains in the gym four to five times a week. She also goes cycling and running.",
        vietnamese: "HUẤN LUYỆN VIÊN VÀ ƯỚC MƠ CỦA AIMEE (Trang 39): Aimee nhanh chóng tìm được nhà tài trợ và huấn luyện viên khi đến Mỹ, và hiện cô là một ngôi sao trượt ván tuyết thành công và nổi tiếng. Cô đã thi đấu rất tốt trong nhiều giải quốc gia và ước mơ của cô là một ngày nào đó giành được huy chương Olympic. Aimee dành phần lớn thời gian tập luyện trên tuyết và tập gym 4 đến 5 lần một tuần. Cô ấy cũng đi đạp xe và chạy bộ."
      },
      {
        english: "FITNESS AND FREE TIME (Page 39): Aimee says it is very important to keep fit because that helps her stay safe when she is doing snowboarding tricks and jumps. Her advice to people who want to learn how to do jumps, is to start small and only do bigger jumps when they feel ready. During her free time, Aimee likes to spend time at home, switch off her phone and laptop and hang out with her friends and family.",
        vietnamese: "SỰ KHỎE MẠNH VÀ THỜI GIAN RẢNH (Trang 39): Aimee nói rằng việc giữ thể lực là rất quan trọng vì điều đó giúp cô an toàn khi thực hiện các động tác kỹ thuật và nhảy ván tuyết. Lời khuyên của cô cho những ai muốn học nhảy là hãy bắt đầu từ những cú nhảy nhỏ và chỉ thực hiện những cú nhảy lớn hơn khi đã sẵn sàng. Trong thời gian rảnh rỗi, Aimee thích dành thời gian ở nhà, tắt điện thoại, laptop và đi chơi cùng bạn bè, gia đình."
      }
    ],
    vocabulary: [
      { word: "professional", meaning: "vận động viên chuyên nghiệp (được trả tiền)", pronunciation: "/prəˈfeʃ.ən.əl/" },
      { word: "train", meaning: "tập luyện, rèn luyện thể thao", pronunciation: "/treɪn/" },
      { word: "successful", meaning: "thành công, gặt hái nhiều kết quả", pronunciation: "/səkˈses.fəl/" },
      { word: "fit", meaning: "khỏe mạnh, sung sức thể hình", pronunciation: "/fɪt/" },
      { word: "advice", meaning: "lời khuyên, chỉ dẫn", pronunciation: "/ədˈvaɪs/" }
    ],
    questions: [
      {
        id: "r-u3-ex13-1",
        question: "[True/False/Not Given] Aimee learnt to ski before she started snowboarding.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correct_index: 2,
        explanation: "Bài đọc chỉ nói cô học trượt tuyết và trượt ván tại sườn dốc khô ('where she learnt how to ski and snowboard'), không nói rõ học môn nào trước (NOT GIVEN)."
      },
      {
        id: "r-u3-ex13-2",
        question: "[True/False/Not Given] It often snowed during winter in Aimee's hometown.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correct_index: 1,
        explanation: "Bài đọc ghi: 'it wasn't possible to train properly in her hometown because it hardly ever snowed' (hầu như không bao giờ có tuyết) nên phát biểu thường có tuyết rơi là Sai (FALSE)."
      },
      {
        id: "r-u3-ex13-3",
        question: "[True/False/Not Given] It took Aimee a long time to find a coach after she moved to the USA.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correct_index: 1,
        explanation: "Bài đọc viết: 'Aimee quickly found sponsors and a coach when she arrived in the USA' (nhanh chóng tìm được) nên phát biểu mất nhiều thời gian là Sai (FALSE)."
      },
      {
        id: "r-u3-ex13-4",
        question: "[True/False/Not Given] Aimee has won an Olympic medal.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correct_index: 1,
        explanation: "Bài đọc ghi: 'her dream is to win an Olympic medal one day' (ước mơ giành huy chương Olympic) nghĩa là hiện tại cô ấy chưa có huy chương (FALSE)."
      },
      {
        id: "r-u3-ex13-5",
        question: "[True/False/Not Given] Aimee practises snowboarding in the mountains at least three times a week.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correct_index: 2,
        explanation: "Bài viết chỉ ghi cô dành phần lớn thời gian tập luyện trên tuyết ('spends most of her time practising on the snow'), không đề cập chi tiết có phải ở trên núi ít nhất 3 lần một tuần hay không (NOT GIVEN)."
      },
      {
        id: "r-u3-ex13-6",
        question: "[True/False/Not Given] Aimee thinks that snowboarding is more dangerous for her when she is not fit.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correct_index: 0,
        explanation: "Đoạn 3 viết: 'Aimee says it is very important to keep fit because that helps her stay safe' (giúp cô ấy an toàn) tức là không fit sẽ nguy hiểm hơn (TRUE)."
      },
      {
        id: "r-u3-ex13-7",
        question: "[True/False/Not Given] In her free time, Aimee prefers being with people to spending time on her laptop.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correct_index: 0,
        explanation: "Đoạn 3 ghi: 'likes to spend time at home, switch off her phone and laptop and hang out with her friends and family' nên là Đúng (TRUE)."
      },
      {
        id: "r-u3-ex14-1",
        question: "[Vocab Match] This is someone who is paid to do a sport or other activity.",
        options: ["sponsors", "coach", "professional", "fit"],
        correct_index: 2,
        explanation: "'Professional' là người chuyên nghiệp, làm việc/chơi thể thao để nhận tiền thù lao."
      },
      {
        id: "r-u3-ex14-2",
        question: "[Vocab Match] This means to practise your sport.",
        options: ["train", "play", "win", "lose"],
        correct_index: 0,
        explanation: "'Train' là tập luyện, rèn luyện kỹ năng thể thao."
      },
      {
        id: "r-u3-ex14-3",
        question: "[Vocab Match] This word describes someone who is doing well in his/her life.",
        options: ["well-known", "successful", "active", "professional"],
        correct_index: 1,
        explanation: "'Successful' có nghĩa là thành công."
      },
      {
        id: "r-u3-ex14-4",
        question: "[Vocab Match] When you are this, you don't get tired easily when you exercise or do sport.",
        options: ["dry", "proper", "safe", "fit"],
        correct_index: 3,
        explanation: "'Fit' nghĩa là có thể lực tốt, sung sức, khỏe mạnh."
      },
      {
        id: "r-u3-ex14-5",
        question: "[Vocab Match] You ask someone for this when you want to know what to do.",
        options: ["tricks", "jumps", "advice", "dream"],
        correct_index: 2,
        explanation: "'Advice' là lời khuyên."
      },
      {
        id: "r-u3-sp1",
        question: "[Sports Verbs] Which verb goes with: 'badminton, chess, football'?",
        options: ["play", "do", "go"],
        correct_index: 0,
        explanation: "Ta dùng 'play' cho các môn thể thao đồng đội hoặc có dụng cụ thi đấu/trò chơi trí tuệ."
      },
      {
        id: "r-u3-sp2",
        question: "[Sports Verbs] Which verb goes with: 'gymnastics, taekwondo, karate'?",
        options: ["play", "do", "go"],
        correct_index: 1,
        explanation: "Ta dùng 'do' cho các môn thể thao võ thuật, thể dục cá nhân không bóng."
      },
      {
        id: "r-u3-sp3",
        question: "[Sports Verbs] Which verb goes with: 'cycling, hiking, sailing'?",
        options: ["play", "do", "go"],
        correct_index: 2,
        explanation: "Ta dùng 'go' cho các hoạt động di chuyển ngoài trời tận cùng bằng đuôi -ing."
      },
      {
        id: "r-u3-ex3-1",
        question: "[Verb Completion] I\'m playing in a tennis tournament tomorrow. I hope to ___ some of my matches.",
        options: ["score", "win", "kick", "beat"],
        correct_index: 1,
        explanation: "'win a match' (thắng trận đấu)."
      },
      {
        id: "r-u3-ex3-2",
        question: "[Verb Completion] Our school football team is not doing well. Every team we play against ___ us.",
        options: ["loses", "wins", "beats", "scores"],
        correct_index: 2,
        explanation: "'beat someone' (đánh bại ai đó), chủ ngữ số ít chia 'beats'."
      },
      {
        id: "r-u3-ex3-3",
        question: "[Verb Completion] In football, players must move the ball by ___ it.",
        options: ["catching", "kicking", "throwing", "hitting"],
        correct_index: 1,
        explanation: "Trong bóng đá phải sút/đá bóng -> 'kicking'."
      },
      {
        id: "r-u3-ex8-1",
        question: "[Grammar] I ___ (not know) how to play tennis, but I would like to learn.",
        options: ["don't know", "am not knowing"],
        correct_index: 0,
        explanation: "'know' là động từ trạng thái (state verb), không dùng ở thì tiếp diễn."
      },
      {
        id: "r-u3-ex8-2",
        question: "[Grammar] I\'m very sorry, I ___ (not remember) your name.",
        options: ["don't remember", "am not remembering"],
        correct_index: 0,
        explanation: "'remember' là động từ trạng thái tâm lý, không dùng ở dạng tiếp diễn."
      },
      {
        id: "r-u3-ex8-3",
        question: "[Grammar] Can you help me? I ___ (not understand) this question.",
        options: ["don't understand", "am not understanding"],
        correct_index: 0,
        explanation: "'understand' là động từ chỉ tri thức/trạng thái -> dùng 'don't understand'."
      },
      {
        id: "r-u3-ex8-4",
        question: "[Grammar] John ___ a great time on holiday. Look at these pictures!",
        options: ["has", "is having"],
        correct_index: 1,
        explanation: "Diễn tả hành động trải nghiệm khoảnh khắc đang xảy ra trên kỳ nghỉ -> dùng 'is having'."
      },
      {
        id: "r-u3-ex8-5",
        question: "[Grammar] I\'m afraid you can\'t borrow that book. It ___ to my sister and she ___ it at the moment.",
        options: ["belongs / is reading", "is belonging / is reading", "belongs / reads", "is belonging / reads"],
        correct_index: 0,
        explanation: "'belong' là động từ sở hữu trạng thái -> chia 'belongs'. Việc đọc sách đang xảy ra dùng tiếp diễn -> 'is reading'."
      },
      {
        id: "r-u3-ex8-6",
        question: "[Grammar] I ___ to go out tonight. I\'m too tired!",
        options: ["don't want", "am not wanting"],
        correct_index: 0,
        explanation: "'want' chỉ ý muốn/trạng thái -> dùng Hiện tại đơn 'don't want'."
      },
      {
        id: "r-u3-ex9-1",
        question: "[Katy's Email] Hi William, I ___ (have) a great time here in Leeds.",
        options: ["have", "am having", "has", "am have"],
        correct_index: 1,
        explanation: "Katy đang trải qua kỳ học tại Leeds và viết thư chia sẻ ở hiện tại tiếp diễn: 'am having'."
      },
      {
        id: "r-u3-ex9-2",
        question: "[Katy's Email] The city is really big and it ___ (got) so many interesting places to visit.",
        options: ["has got", "is getting", "have got", "gets"],
        correct_index: 0,
        explanation: "Thành phố (số ít) có nhiều nơi -> cấu trúc 'has got'."
      },
      {
        id: "r-u3-ex9-3",
        question: "[Katy's Email] I ___ (stay) in one of the halls of residence this year.",
        options: ["stay", "am staying", "stays", "stayed"],
        correct_index: 1,
        explanation: "Việc lưu trú tạm thời trong năm học này -> dùng Hiện tại tiếp diễn 'am staying'."
      },
      {
        id: "r-u3-ex10-1",
        question: "[Short Answer Match] 'Is that your brother playing tennis over there?'",
        options: ["No, I'm not.", "Yes, I do.", "Yes, he is.", "No, they don't."],
        correct_index: 2,
        explanation: "Câu hỏi 'Is that your brother...' (số ít nam) trả lời bằng 'Yes, he is.'"
      },
      {
        id: "r-u3-ex10-2",
        question: "[Short Answer Match] 'Do you always get up so early?'",
        options: ["No, I'm not.", "Yes, I do.", "Yes, he is.", "No, they don't."],
        correct_index: 1,
        explanation: "Câu hỏi với 'Do you...' trả lời bằng 'Yes, I do.'"
      },
      {
        id: "r-u3-ex10-3",
        question: "[Short Answer Match] 'Are your parents staying in a hotel?'",
        options: ["No, they aren't.", "Yes, he is.", "No, I'm not.", "Yes, I do."],
        correct_index: 0,
        explanation: "Câu hỏi 'Are your parents...' (số nhiều) trả lời bằng 'No, they aren't.'"
      }
    ]
  },
  4: {
    unitNum: 4,
    title: "Planning Holidays and Ecotourism",
    unitTitle: "Unit 4: Travel (Reading & Vocabulary)",
    description: "Đọc hiểu các thông tin chi tiết về du lịch: phân loại 8 hình thức kỳ nghỉ, đọc email trải nghiệm chuyến đi của Simon và Sarah để hoàn thành các bài tập ngữ pháp Thì Quá khứ đơn (Past Simple) và liên từ chỉ nguyên nhân/kết quả.",
    paragraphs: [
      {
        english: "TYPES OF HOLIDAYS (Page 50): Ecotourism has become popular, where tourists travel responsibly to protect the environment and support local residents. Beach Escape is perfect to relax at resorts with water sports. Fun Family Holidays offer activities at zoos and water parks. Language Exchange gives you the chance to stay with host families and practice speaking. Delicious Food Tours visit popular markets to prepare meals. Adventure Holidays are for the great outdoors (mountain climbing, horse riding, cycling tours). Sailing Experience is for learning sailing. City Breaks are cultural tours in Europe to visit art galleries, museums, or famous buildings.",
        vietnamese: "CÁC LOẠI HÌNH KỲ NGHỈ (Trang 50): Du lịch sinh thái đã trở nên phổ biến, nơi du khách đi du lịch có trách nhiệm để bảo vệ môi trường và hỗ trợ người dân địa phương. Beach Escape (Trốn đến bãi biển) là lựa chọn hoàn hảo để thư giãn tại các khu nghỉ dưỡng kèm thể thao dưới nước. Fun Family Holidays (Kỳ nghỉ gia đình vui nhộn) cung cấp các hoạt động tại sở thú, công viên nước. Language Exchange (Trao đổi ngôn ngữ) cho phép ở cùng gia đình bản xứ để luyện nói. Delicious Food Tours (Tour ẩm thực ngon) tham quan các chợ để tự chuẩn bị bữa ăn. Adventure Holidays (Kỳ nghỉ mạo hiểm) dành cho hoạt động ngoài trời (leo núi, cưỡi ngựa, đạp xe). Sailing Experience (Trải nghiệm chèo thuyền) để học chèo thuyền. City Breaks (Kỳ nghỉ ngắn ngày tại thành phố) là các tour văn hóa ở Châu Âu để tham quan bảo tàng, phòng triển lãm nghệ thuật, công trình nổi tiếng."
      },
      {
        english: "SIMON'S EMAIL ABOUT MADRID (Page 54): Hi Tony, I went to Madrid for my last holiday - it was great! On the first day, I visited some of the famous sights here including the Prado museum and the Royal Palace. It is different to my usual holidays. Normally, I go to hot places and relax on the beach. At the moment, it's the opposite and it is quite cold here. On my second day, I went shopping and bought some souvenirs. That night it was really interesting because I ate in a Spanish restaurant. I usually don't try new food when I go on holiday, but I am very happy that I did this time. I tried a traditional meal of soup, vegetables and meat. It was delicious. It was only a short holiday, but I really enjoyed it. I took lots of photos. What did you do on your holiday? Where did you go?",
        vietnamese: "EMAIL CỦA SIMON VỀ MADRID (Trang 54): Chào Tony, mình đã đến Madrid trong kỳ nghỉ vừa rồi - thật tuyệt vời! Ngày đầu tiên, mình đã tham quan một số địa điểm nổi tiếng ở đây bao gồm bảo tàng Prado và Cung điện Hoàng gia. Chuyến đi này khác với các kỳ nghỉ thông thường của mình. Bình thường, mình hay đến những nơi ấm áp và thư giãn trên bãi biển. Hiện tại thì ngược lại và ở đây khá lạnh. Ngày thứ hai, mình đi mua sắm và mua một số quà lưu niệm. Đêm đó thực sự thú vị vì mình đã ăn ở một nhà hàng Tây Ban Nha. Mình thường không thử món ăn mới khi đi nghỉ, nhưng mình rất vui vì lần này đã thử. Mình đã ăn thử một bữa ăn truyền thống gồm súp, rau và thịt. Nó thật ngon. Đó chỉ là một kỳ nghỉ ngắn, nhưng mình thực sự thích nó. Mình đã chụp rất nhiều ảnh. Cậu đã làm gì trong kỳ nghỉ của mình? Cậu đã đi đâu thế?"
      },
      {
        english: "SARAH'S EMAIL ABOUT BERLIN (Page 58): Hi Tony, I went to Germany with my family last February. My family and I don't like beach holidays; we decided to go to Berlin for a weekend. Usually on holiday, I enjoy visiting lots of famous museums and monuments but we didn't have time to see everything, so we just saw the main ones, like the Berlin Wall and the Brandenburg Gate. In my opinion, they were both very interesting monuments - we learnt about them at school last year. We felt cold a lot of time because it was the middle of winter. Where do you like going on holiday? Do you prefer city breaks in winter or beach holidays in the summer?",
        vietnamese: "EMAIL CỦA SARAH VỀ BERLIN (Trang 58): Chào Tony, mình đã đi Đức với gia đình vào tháng Hai năm ngoái. Gia đình mình và mình không thích các kỳ nghỉ ở bãi biển; bọn mình đã quyết định đi Berlin vào cuối tuần. Thông thường khi đi nghỉ, mình thích tham quan nhiều bảo tàng và di tích nổi tiếng nhưng bọn mình không có thời gian để xem mọi thứ, vì vậy bọn mình chỉ xem những địa điểm chính, như Bức tường Berlin và Cổng Brandenburg. Theo mình, cả hai đều là những di tích rất thú vị - bọn mình đã được học về chúng ở trường năm ngoái. Bọn mình cảm thấy lạnh hầu hết thời gian vì đó là giữa mùa đông. Cậu thích đi nghỉ mát ở đâu? Cậu thích đi thành phố vào mùa đông hay đi bãi biển vào mùa hè hơn?"
      }
    ],
    vocabulary: [
      { word: "itinerary", meaning: "lịch trình chuyến đi chi tiết", pronunciation: "/aɪˈtɪn.ər.ər.i/" },
      { word: "ecotourism", meaning: "du lịch sinh thái bảo vệ môi trường", pronunciation: "/ˈiː.kəʊˌtʊə.rɪ.zəm/" },
      { word: "reservation", meaning: "sự đặt trước phòng/vé", pronunciation: "/ˌrez.əˈveɪ.ʃən/" },
      { word: "backpacking", meaning: "du lịch phượt, xách ba lô đi du lịch bụi", pronunciation: "/ˈbæk.pæk.ɪŋ/" },
      { word: "destination", meaning: "điểm đến", pronunciation: "/ˌdes.tɪˈneɪ.ʃən/" }
    ],
    questions: [
      {
        id: "r-u4-ex5-1",
        question: "[Holiday Match] Tom is 19, active, loves outdoors and sports. He has done sailing & windsurfing in the past, but wants to do something DIFFERENT this year. He got bored at the beach last year. Which holiday is best?",
        options: ["Beach Escape", "Language Exchange", "Adventure Holidays", "Sailing Experience"],
        correct_index: 2,
        explanation: "Tom muốn làm gì đó KHÁC BIỆT so với các môn thể thao dưới nước hay bãi biển đã thử ở các năm trước, nên 'Adventure Holidays' (leo núi, đạp xe, cưỡi ngựa ngoài trời) là hợp lý nhất."
      },
      {
        id: "r-u4-ex5-2",
        question: "[Holiday Match] Julia is 16, traveling with her best friend. They want to visit local attractions, try new food, and improve their Spanish for an exam next year. They must be in a safe environment without parents. Which holiday is best?",
        options: ["Delicious Food Tours", "Language Exchange", "City Breaks", "Wildlife Experience"],
        correct_index: 1,
        explanation: "Họ học tiếng Tây Ban Nha và chuẩn bị thi, đồng thời đi cùng gia đình bản xứ ('host families') giúp đảm bảo an toàn không cần bố mẹ đi cùng -> 'Language Exchange'."
      },
      {
        id: "r-u4-ex5-3",
        question: "[Holiday Match] Charlie is 21, prefers the countryside to beaches or cities. He wants to do something interesting with friends and wants to get a job working with animals in the future. Which holiday is best?",
        options: ["Wildlife Experience", "City Breaks", "Sailing Experience", "Beach Escape"],
        correct_index: 0,
        explanation: "Charlie yêu thích động vật và muốn làm việc với động vật trong tương lai -> 'Wildlife Experience' là phù hợp nhất."
      },
      {
        id: "r-u4-ex5-4",
        question: "[Holiday Match] Joanna is 32, very tired after a busy term at school. She wants to go somewhere hot and near the sea to relax and not do very much. Which holiday is best?",
        options: ["Adventure Holidays", "Beach Escape", "City Breaks", "Language Exchange"],
        correct_index: 1,
        explanation: "Joanna muốn đi biển, nơi ấm áp và thư giãn không hoạt động nhiều -> 'Beach Escape'."
      },
      {
        id: "r-u4-ex5-5",
        question: "[Holiday Match] Roger is 50, traveling with his wife and two children. He wants some cultural activities (museums, galleries), shopping, but also fun activities to entertain his kids. Which holiday is best?",
        options: ["City Breaks", "Adventure Holidays", "Fun Family Holidays", "Delicious Food Tours"],
        correct_index: 2,
        explanation: "Roger đi cùng cả nhà và cần có cả các hoạt động vui chơi giải trí cho trẻ em (zoo, water park) kèm ăn uống, tham quan trọn gói -> 'Fun Family Holidays'."
      },
      {
        id: "r-u4-ex17-1",
        question: "[Simon\'s Email Verb] 'I ___ (go) to Madrid for my last holiday - it ___ (be) great!'",
        options: ["go / was", "went / was", "went / is", "goes / was"],
        correct_index: 1,
        explanation: "Diễn tả hành động xảy ra trong kỳ nghỉ trước (quá khứ đơn) -> 'went' và 'was'."
      },
      {
        id: "r-u4-ex17-2",
        question: "[Simon\'s Email Verb] 'Normally, I ___ (go) to hot places and relax on the beach. At the moment, it is opposite...'",
        options: ["go", "went", "am going", "gone"],
        correct_index: 0,
        explanation: "Từ chỉ tần suất 'Normally' chỉ thói quen thường lệ ở hiện tại -> dùng hiện tại đơn 'go'."
      },
      {
        id: "r-u4-ex17-3",
        question: "[Simon\'s Email Verb] 'On my second day, I ___ (go) shopping and ___ (buy) some souvenirs.'",
        options: ["go / buy", "went / buy", "went / bought", "go / bought"],
        correct_index: 2,
        explanation: "Diễn tả chuỗi hành động đã kết thúc trong quá khứ -> 'went' và 'bought'."
      },
      {
        id: "r-u4-ex17-4",
        question: "[Simon\'s Email Verb] 'I usually ___ (not try) new food when I ___ (go) on holiday...'",
        options: ["don't try / go", "don't try / went", "didn't try / go", "not try / go"],
        correct_index: 0,
        explanation: "Từ 'usually' chỉ thói quen chung -> Hiện tại đơn dạng phủ định 'don't try' và khẳng định 'go'."
      },
      {
        id: "r-u4-ex4-1",
        question: "[Adjective Completion] The USA is a very ___ country to visit. Last year, it had over a million visitors.",
        options: ["traditional", "popular", "boring", "natural"],
        correct_index: 1,
        explanation: "Được nhiều người chọn đến tham quan thì nước đó rất nổi tiếng, phổ biến -> 'popular'."
      },
      {
        id: "r-u4-ex4-2",
        question: "[Adjective Completion] I would prefer to see animals in their ___ environment than in a zoo.",
        options: ["traditional", "natural", "cultural", "delicious"],
        correct_index: 1,
        explanation: "Môi trường hoang dã tự nhiên của động vật -> 'natural environment'."
      },
      {
        id: "r-u4-ex4-3",
        question: "[Adjective Completion] I prefer to do ___ activities on holiday, like visiting museums and art galleries.",
        options: ["cultural", "boring", "delicious", "popular"],
        correct_index: 0,
        explanation: "Hoạt động thăm bảo tàng, phòng triển lãm mang tính chất văn hóa -> 'cultural activities'."
      },
      {
        id: "r-u4-ex5-d1",
        question: "[Dialogue Underline] A: '___ you like going on holiday?' - B: 'Yes, I ___.'",
        options: ["Do / do", "Do / did", "Did / do", "Are / do"],
        correct_index: 0,
        explanation: "Câu hỏi thăm dò sở thích chung ở Hiện tại đơn: 'Do you like...' -> 'Yes, I do.'"
      },
      {
        id: "r-u4-ex5-d2",
        question: "[Dialogue Underline] A: 'Where ___ you usually go?' - B: 'Usually we go on beach holiday but last summer we ___ on a city break.'",
        options: ["do / went", "did / went", "do / go", "did / go"],
        correct_index: 0,
        explanation: "Vế đầu hỏi thói quen thường lệ 'usually' dùng 'do'. Vế sau nói mốc thời gian quá khứ 'last summer' dùng 'went'."
      },
      {
        id: "r-u4-ex5-d3",
        question: "[Dialogue Underline] B: 'thought that, too; but this one ___ boring at all.'",
        options: ["wasn't", "didn't"],
        correct_index: 0,
        explanation: "Sau đó là tính từ 'boring' nên ta dùng to be phủ định ở quá khứ 'wasn't' (didn't phải đi với động từ nguyên mẫu)."
      },
      {
        id: "r-u4-ex6-1",
        question: "[Sarah\'s Email] My family and I don\'t like beach holidays; we ___ (decide) to go to Berlin.",
        options: ["decide", "decided", "are deciding", "decides"],
        correct_index: 1,
        explanation: "Sự việc quyết định đi Berlin đã diễn ra vào tháng Hai năm ngoái -> 'decided'."
      },
      {
        id: "r-u4-ex6-2",
        question: "[Sarah\'s Email] ...but we ___ (not have) time to see everything, so we just ___ (see) the main ones.",
        options: ["don't have / see", "didn't have / saw", "didn't have / see", "don't have / saw"],
        correct_index: 1,
        explanation: "Diễn tả hành động phủ định và khẳng định xen kẽ trong quá khứ -> 'didn't have' và 'saw'."
      },
      {
        id: "r-u4-ex8-1",
        question: "[Conjunctions] We decided to go on an adventure holiday this year ___ we enjoy kayaking.",
        options: ["so (vì thế)", "as (bởi vì)", "although (mặc dù)"],
        correct_index: 1,
        explanation: "'as' mang nghĩa bởi vì, dùng trước mệnh đề chỉ nguyên nhân (bởi vì chúng tôi thích chèo thuyền kayak)."
      },
      {
        id: "r-u4-ex8-2",
        question: "[Conjunctions] We prefer city breaks ___ we enjoy exploring new places.",
        options: ["so", "because", "as long as"],
        correct_index: 1,
        explanation: "Chỉ nguyên nhân kết nối: chúng tôi thích đi thành phố 'because' (bởi vì) chúng tôi thích khám phá địa điểm mới."
      }
    ]
  },
  5: {
    unitNum: 5,
    title: "Healthy Cooking Recipes and Ingredient Instructions",
    unitTitle: "Unit 5: Food (Reading & Vocabulary)",
    description: "Đọc hiểu hướng dẫn nấu ăn tốt cho sức khỏe, phân biệt danh từ đếm được/không đếm được và luyện viết công thức nấu ăn cơ bản.",
    paragraphs: [
      {
        english: "HEALTHY FOOD AND DIET (Page 60): Preparing meals using organic fresh ingredients is beneficial for our digestive system. Fast food and packaged items contain excessive sodium and preservatives. Steaming fresh broccoli, boiling chicken breasts, and adding some fresh tomatoes make a healthy, balanced dinner. It is also a good idea to limit sugar intake by replacing sweet drinks with clean mineral water.",
        vietnamese: "THỰC PHẨM VÀ CHẾ ĐỘ ĂN LÀNH MẠNH (Trang 60): Chuẩn bị bữa ăn bằng nguyên liệu tươi hữu cơ có lợi cho hệ tiêu hóa của chúng ta. Đồ ăn nhanh và đồ đóng hộp chứa nhiều muối natri và chất bảo quản. Hấp bông cải xanh tươi, luộc ức gà và thêm vài quả cà chua tươi tạo nên một bữa tối lành mạnh, cân bằng. Cũng nên hạn chế lượng đường bằng cách thay nước ngọt bằng nước khoáng sạch."
      },
      {
        english: "RECIPE INSTRUCTIONS (Page 65): A standard cooking recipe lists ingredients first, followed by clear verb instructions. Verbs like 'chop', 'boil', 'steam', and 'mix' guide the chef. For example, 'first chop the onions, then boil the water, next add some salt, and finally steam the vegetables for ten minutes.'",
        vietnamese: "HƯỚNG DẪN CÔNG THỨC (Trang 65): Một công thức nấu ăn chuẩn liệt kê các nguyên liệu trước, tiếp theo là các động từ hướng dẫn rõ ràng. Các động từ như 'chop' (thái nhỏ), 'boil' (đun sôi), 'steam' (hấp), và 'mix' (trộn) định hướng cho đầu bếp. Ví dụ: 'đầu tiên thái hành, sau đó đun nước sôi, tiếp theo thêm ít muối, và cuối cùng hấp rau trong mười phút'."
      }
    ],
    vocabulary: [
      { word: "ingredients", meaning: "các nguyên liệu cần thiết", pronunciation: "/ɪnˈɡriː.di.ənts/" },
      { word: "recipe", meaning: "công thức nấu ăn chuẩn", pronunciation: "/ˈres.ɪ.pi/" },
      { word: "organic", meaning: "hữu cơ, tự nhiên không hóa chất", pronunciation: "/ɔːˈgæn.ɪk/" },
      { word: "steaming", meaning: "phương pháp hấp chín bằng hơi nước", pronunciation: "/ˈstiː.mɪŋ/" },
      { word: "homemade", meaning: "nhà tự làm", pronunciation: "/ˌhəʊmˈmeɪd/" }
    ],
    questions: [
      {
        id: "r-u5-ex1-1",
        question: "Why should we avoid packaged supermarket foods?",
        options: ["Because they are too fresh", "Because they contain excessive sodium and preservatives", "Because they require steaming", "Because they have no labels"],
        correct_index: 1,
        explanation: "Đoạn 1 viết: 'packaged items contain excessive sodium and preservatives' (chứa quá nhiều muối và chất bảo quản)."
      },
      {
        id: "r-u5-sc1",
        question: "[Sentence Completion] In the recipe: 'First ___ the onions, then ___ the vegetables.'",
        options: ["steam / mix", "chop / steam", "boil / chop", "drink / eat"],
        correct_index: 1,
        explanation: "Thứ tự nấu ăn hợp lý: đầu tiên là thái hành ('chop'), sau đó mới hấp rau quả ('steam')."
      },
      {
        id: "r-u5-g1",
        question: "[Grammar - Quantifiers] 'There are ___ tomatoes, but there isn\'t ___ milk in the fridge.'",
        options: ["some / any", "any / some", "much / many", "many / some"],
        correct_index: 0,
        explanation: "Dùng 'some' cho câu khẳng định danh từ đếm được số nhiều ('some tomatoes') và 'any' cho câu phủ định danh từ không đếm được ('isn't any milk')."
      }
    ]
  },
  6: {
    unitNum: 6,
    title: "Urban Commutes and Public Transport Management",
    unitTitle: "Unit 6: Transport (Reading & Vocabulary)",
    description: "Đọc hiểu về việc di chuyển đi lại trong các đô thị lớn, luật lệ giao thông và so sánh hiệu quả các phương tiện công cộng.",
    paragraphs: [
      {
        english: "URBAN COMMUTING DIFFICULTIES (Page 72): In modern cities, traffic congestion during rush hours is a persistent headache. Millions of commuters travel simultaneously, creating massive bottlenecks on main highways. Many drivers prefer private cars for comfort, which exacerbates environmental pollution and leads to parking shortages.",
        vietnamese: "KHÓ KHĂN ĐI LẠI Ở ĐÔ THỊ (Trang 72): Tại các thành phố hiện đại, tắc nghẽn giao thông vào giờ cao điểm là nỗi đau đầu dai dẳng. Hàng triệu người đi làm cùng lúc, tạo ra các điểm nghẽn lớn trên đường cao tốc. Nhiều người thích xe riêng vì thoải mái, điều này làm trầm trọng thêm ô nhiễm môi trường và dẫn đến thiếu bãi đỗ xe."
      },
      {
        english: "PUBLIC TRANSPORT BENEFITS (Page 72): To mitigate congestion, city councils promote public transport systems. Underground trains and metro links offer the fastest transit because they are fully separated from surface road traffic. Furthermore, double-decker buses and light rail lines carry massive numbers of passengers, making them highly efficient.",
        vietnamese: "LỢI ÍCH GIAO THÔNG CÔNG CỘNG (Trang 72): Để giảm tắc nghẽn, các hội đồng thành phố khuyến khích hệ thống giao thông công cộng. Tàu điện ngầm và các tuyến metro mang lại tốc độ di chuyển nhanh nhất vì chúng tách biệt hoàn toàn với giao thông đường bộ. Hơn nữa, xe buýt hai tầng và tàu điện nhẹ vận chuyển lượng lớn hành khách, giúp tăng hiệu quả."
      }
    ],
    vocabulary: [
      { word: "commute", meaning: "quãng đường đi lại hàng ngày", pronunciation: "/kəˈmjuːt/" },
      { word: "congestion", meaning: "sự kẹt xe, tắc nghẽn", pronunciation: "/kənˈdʒes.tʃən/" },
      { word: "passenger", meaning: "hành khách đi tàu xe", pronunciation: "/ˈpæs.ən.dʒər/" },
      { word: "efficient", meaning: "hiệu quả, tiết kiệm công sức thời gian", pronunciation: "/ɪˈfɪʃ.ənt/" },
      { word: "delay", meaning: "sự trì hoãn, chậm giờ", pronunciation: "/dɪˈleɪ/" }
    ],
    questions: [
      {
        id: "r-u6-ex1-1",
        question: "Why do underground trains offer the fastest transit in cities?",
        options: ["Because they carry fewer passengers", "Because they are fully separated from surface road traffic", "Because tickets are free", "Because they run only on Sundays"],
        correct_index: 1,
        explanation: "Đoạn 2 chỉ ra: 'because they are fully separated from surface road traffic' (không bị ảnh hưởng bởi ùn tắc đường bộ trên mặt đất)."
      },
      {
        id: "r-u6-g1",
        question: "[Grammar - Comparatives] 'Going by train is ___ (fast) than driving a car, and it is also the ___ (efficient) choice.'",
        options: ["faster / most efficient", "fastest / more efficient", "more fast / efficientest", "faster / efficienter"],
        correct_index: 0,
        explanation: "Tính từ ngắn 'fast' dùng dạng so sánh hơn -> 'faster'. Tính từ dài 'efficient' dùng so sánh nhất -> 'the most efficient'."
      },
      {
        id: "r-u6-match1",
        question: "[Matching] 'traffic congestion' is closest in meaning to...",
        options: ["clean atmosphere", "traffic jam", "car racing track", "empty street"],
        correct_index: 1,
        explanation: "'Traffic congestion' và 'traffic jam' đều chỉ tình trạng kẹt xe, tắc nghẽn giao thông."
      }
    ]
  },
  7: {
    unitNum: 7,
    title: "Student Summer Jobs and Future Career Skills",
    unitTitle: "Unit 7: Jobs (Reading & Vocabulary)",
    description: "Phân tích lợi ích các công việc bán thời gian mùa hè cho học sinh, rèn luyện kỹ năng đọc True/False/Not Given chuẩn xác.",
    paragraphs: [
      {
        english: "SUMMER JOBS FOR STUDENTS (Page 85): Taking a part-time summer job is an excellent way for college students to earn extra income and gain qualifications. Common jobs include camp counselors, retail shop helpers, and office assistants. These positions do not require high professional degrees but demand manual diligence or good communication skills.",
        vietnamese: "CÔNG VIỆC MÙA HÈ CHO HỌC SINH (Trang 85): Nhận một công việc bán thời gian mùa hè là cách tuyệt vời để sinh viên kiếm thêm thu nhập và tích lũy kinh nghiệm. Các công việc phổ biến gồm hướng dẫn viên trại hè, nhân viên bán lẻ và trợ lý văn phòng. Những vị trí này không đòi hỏi bằng cấp chuyên môn cao nhưng yêu cầu sự chăm chỉ chân tay hoặc kỹ năng giao tiếp tốt."
      },
      {
        english: "AUTOMATION THREATS AND ADVANTAGES (Page 85): Although simple tasks like retail cashiering or database entering can be automated by software in the future, jobs that require human empathy and complex problem-solving are safe. Students should focus on learning digital literacy and creative teamwork to ensure career safety.",
        vietnamese: "MỐI ĐE DỌA TỰ ĐỘNG HÓA VÀ LỢI THẾ (Trang 85): Mặc dù các công việc đơn giản như thu ngân bán lẻ hoặc nhập liệu có thể bị tự động hóa bằng phần mềm trong tương lai, nhưng những công việc đòi hỏi sự đồng cảm của con người và giải quyết vấn đề phức tạp vẫn an toàn. Học sinh nên tập trung vào việc học kỹ năng công nghệ số và làm việc nhóm sáng tạo để đảm bảo an toàn nghề nghiệp."
      }
    ],
    vocabulary: [
      { word: "qualifications", meaning: "bằng cấp chuyên môn, kinh nghiệm", pronunciation: "/ˌkwɒl.ɪ.fɪˈkeɪ.ʃənz/" },
      { word: "automation", meaning: "sự tự động hóa bằng máy móc/phần mềm", pronunciation: "/ˌɔː.təˈmeɪ.ʃən/" },
      { word: "counselor", meaning: "người cố vấn, hướng dẫn viên trại hè", pronunciation: "/ˈkaʊn.səl.ər/" },
      { word: "diligent", meaning: "siêng năng, cần cù chịu khó", pronunciation: "/ˈdɪl.ɪ.dʒənt/" },
      { word: "empathy", meaning: "sự thấu cảm, đặt mình vào vị trí người khác", pronunciation: "/ˈem.pə.θi/" }
    ],
    questions: [
      {
        id: "r-u7-ex1-1",
        question: "According to the text, which type of jobs will be safest from future automation?",
        options: ["Simple database entering", "Jobs requiring human empathy and complex problem-solving", "Retail shop cashiering", "Repetitive sorting tasks"],
        correct_index: 1,
        explanation: "Đoạn 2 nêu rõ: 'jobs that require human empathy and complex problem-solving are safe' từ sự đe dọa của robot/tự động hóa."
      },
      {
        id: "r-u7-g1",
        question: "[Grammar - Modals] 'To secure their future careers, students ___ learn digital skills.' (strong recommendation)",
        options: ["should", "could", "must not", "might"],
        correct_index: 0,
        explanation: "Dùng động từ khuyết thiếu 'should' để đưa ra lời khuyên hoặc đề xuất mạnh mẽ."
      },
      {
        id: "r-u7-tfng1",
        question: "[True/False/Not Given] Camp counselor is a common job for college students in the summer.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correct_index: 0,
        explanation: "Đoạn 1 xác nhận: 'Common jobs include camp counselors...' nên câu phát biểu này là Đúng (TRUE)."
      },
      {
        id: "r-u7-tfng2",
        question: "[True/False/Not Given] Retail cashiers earn higher salaries than camp counselors.",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correct_index: 2,
        explanation: "Văn bản không so sánh mức lương cụ thể của hai công việc này, nên đáp án là NOT GIVEN."
      }
    ]
  },
  8: {
    unitNum: 8,
    title: "Sleep Quality, Screen Dependency and Health Advice",
    unitTitle: "Unit 8: Health (Reading & Vocabulary)",
    description: "Đọc hiểu cấu trúc một bài luận nêu quan điểm (opinion essay) về giấc ngủ từ trang 95 của sách giáo khoa để phân tích tác hại của ánh sáng xanh điện thoại.",
    paragraphs: [
      {
        english: "OPINION ESSAY ON SLEEP DEPRAVATION (Page 95): It is argued that modern technology has a negative impact on human physical health. I fully agree with this statement. Studies show that looking at smartphone screens directly exposes eyes to harmful blue lights. This suppresses the secretion of melatonin, a chemical hormone necessary to regulate our natural sleep cycles.",
        vietnamese: "BÀI LUẬN QUAN ĐIỂM VỀ THIẾU NGỦ (Trang 95): Có ý kiến cho rằng công nghệ hiện đại có tác động tiêu cực đến sức khỏe thể chất của con người. Tôi hoàn toàn đồng ý với nhận định này. Các nghiên cứu chỉ ra rằng việc nhìn trực tiếp vào màn hình điện thoại thông minh để lộ mắt trước ánh sáng xanh có hại. Điều này ức chế sự tiết melatonin, một hormone hóa học cần thiết để điều chỉnh chu kỳ giấc ngủ tự nhiên."
      },
      {
        english: "CONSEQUENCES OF INSOMNIA (Page 95): Constant lack of sleep leads to insomnia, chronic headaches, and eye strain. Furthermore, sleepy students fail to concentrate during school lectures, reducing their academic performance. Doctors advise that children had better leave all gadgets outside their bedroom at night.",
        vietnamese: "HẬU QUẢ CỦA MẤT NGỦ (Trang 95): Thiếu ngủ liên tục dẫn đến mất ngủ, đau đầu mãn tính và mỏi mắt. Hơn nữa, học sinh ngủ gật không thể tập trung trong các bài giảng ở trường, làm giảm hiệu suất học tập. Các bác sĩ khuyên rằng trẻ em tốt hơn nên để tất cả các thiết bị công nghệ bên ngoài phòng ngủ vào ban đêm."
      }
    ],
    vocabulary: [
      { word: "insomnia", meaning: "chứng mất ngủ kinh niên", pronunciation: "/ɪnˈsɒm.ni.ə/" },
      { word: "strain", meaning: "sự mệt mỏi, nhức mỏi (mắt/cơ)", pronunciation: "/streɪn/" },
      { word: "hormone", meaning: "hoóc-môn, chất sinh học điều tiết cơ thể", pronunciation: "/ˈhɔː.məʊn/" },
      { word: "dependency", meaning: "sự phụ thuộc quá mức", pronunciation: "/dɪˈpen.dən.si/" },
      { word: "concentrate", meaning: "tập trung trí lực", pronunciation: "/ˈkɒn.sən.treɪt/" }
    ],
    questions: [
      {
        id: "r-u8-ex1-1",
        question: "Why does looking at smartphone screens before bed stop us from falling asleep?",
        options: ["Because it makes our room too cold", "Because blue light suppresses the chemical hormone melatonin", "Because the screen makes a loud noise", "Because it exposes eyes to clean wind"],
        correct_index: 1,
        explanation: "Đoạn 1 giải thích: 'blue lights... suppresses the secretion of melatonin, a chemical hormone necessary to regulate our natural sleep cycles.'"
      },
      {
        id: "r-u8-g1",
        question: "[Grammar - Advice] 'You ___ avoid using smartphones before bedtime to prevent insomnia.'",
        options: ["should", "shouldn't", "had better not", "must not"],
        correct_index: 0,
        explanation: "Dùng cấu trúc khuyên bảo khẳng định 'should' (bạn nên tránh sử dụng điện thoại trước khi đi ngủ)."
      },
      {
        id: "r-u8-g2",
        question: "[Grammar - Advice] 'You ___ look at bright screens directly at night.' (negative advice)",
        options: ["had better not", "ought to", "had better", "should"],
        correct_index: 0,
        explanation: "Cấu trúc khuyên bảo phủ định mạnh mẽ: 'had better not + V' (tốt nhất là không nên nhìn trực tiếp vào màn hình sáng)."
      }
    ]
  },
  9: {
    unitNum: 9,
    title: "Bilingual Advantages and Global Language Learning",
    unitTitle: "Unit 9: Language (Reading & Vocabulary)",
    description: "Đọc hiểu về lợi thế của việc thành thạo hai ngôn ngữ, các cụm từ kết hợp (collocations) phổ biến trong tiếng Anh giao tiếp từ trang 107 của sách.",
    paragraphs: [
      {
        english: "THE BILINGUAL BRAIN (Page 107): Speaking more than one language fluently is an invaluable asset. Bilingual individuals possess higher cognitive flexibility. They can switch between different vocabulary systems effortlessly. Research confirms that learning a foreign language at an early age makes the brain more adaptable to complex logic tasks and delays memory loss in seniors.",
        vietnamese: "BỘ NÃO SONG NGỮ (Trang 107): Nói trôi chảy hơn một ngôn ngữ là một tài sản vô giá. Những cá nhân song ngữ có sự linh hoạt trong nhận thức cao hơn. Họ có thể chuyển đổi giữa các hệ thống từ vựng khác nhau một cách dễ dàng. Nghiên cứu xác nhận rằng học ngoại ngữ từ nhỏ giúp bộ não thích ứng tốt hơn với các tác vụ logic phức tạp và làm chậm sự suy giảm trí nhớ ở người lớn tuổi."
      },
      {
        english: "GLOBAL OPPORTUNITIES (Page 107): English acts as a global mother tongue for business and scientific research. Being fluent allows people to interpret international events directly, make foreign friends, and land high-paying jobs. Successful language learners practice collocations daily rather than studying isolated grammar rules.",
        vietnamese: "CƠ HỘI TOÀN CẦU (Trang 107): Tiếng Anh đóng vai trò là ngôn ngữ chung toàn cầu cho kinh doanh và nghiên cứu khoa học. Việc thành thạo cho phép mọi người phiên dịch trực tiếp các sự kiện quốc tế, kết bạn nước ngoài và tìm được những công việc lương cao. Những người học ngôn ngữ thành công luyện tập các cụm từ kết hợp hàng ngày thay vì học các quy tắc ngữ pháp riêng lẻ."
      }
    ],
    vocabulary: [
      { word: "bilingual", meaning: "song ngữ, nói trôi chảy hai thứ tiếng", pronunciation: "/ˌbaɪˈlɪŋ.ɡwəl/" },
      { word: "fluently", meaning: "một cách lưu loát, trôi chảy", pronunciation: "/ˈfluː.ənt.li/" },
      { word: "interpret", meaning: "phiên dịch, giải nghĩa thông dịch", pronunciation: "/ɪnˈtɜː.prɪt/" },
      { word: "mother tongue", meaning: "tiếng mẹ đẻ", pronunciation: "/ˈmʌð.ə ˌtʌŋ/" },
      { word: "collocations", meaning: "các cụm từ hay đi cùng nhau một cách tự nhiên", pronunciation: "/ˌkɒl.əˈkeɪ.ʃənz/" }
    ],
    questions: [
      {
        id: "r-u9-ex1-1",
        question: "What cognitive advantage do bilingual people have?",
        options: ["They sleep more hours", "They have higher cognitive flexibility and switch between languages easily", "They have larger eyes", "They run faster than monolingual people"],
        correct_index: 1,
        explanation: "Đoạn 1 nêu: 'Bilingual individuals possess higher cognitive flexibility. They can switch between different vocabulary systems effortlessly.'"
      },
      {
        id: "r-u9-sc1",
        question: "[Collocations] Complete the phrase: 'He speaks English ___' (he speaks like a native).",
        options: ["fluently", "hardly", "beautifully", "badly"],
        correct_index: 0,
        explanation: "Cụm collocation phổ biến: 'speak a language fluently' (nói một ngôn ngữ trôi chảy)."
      },
      {
        id: "r-u9-g1",
        question: "[Grammar - Future Plans] 'I ___ (practice) English vocabulary online every day to become bilingual.'",
        options: ["am going to practice", "practiced", "practice", "practices"],
        correct_index: 0,
        explanation: "Dùng 'be going to + V' để diễn tả kế hoạch/dự định cụ thể cho tương lai: 'I am going to practice'."
      }
    ]
  },
  10: {
    unitNum: 10,
    title: "Tech Gadgets, Smart Homes and Smart Phone Construction",
    unitTitle: "Unit 10: Tech (Reading & Vocabulary)",
    description: "Khám phá các thiết bị công nghệ thông minh, các bộ phận của điện thoại di động và luyện kỹ năng suy luận câu trả lời đúng từ trang 116 của sách.",
    paragraphs: [
      {
        english: "SMART PHONES AND TECH GADGETS (Page 116): Modern smartphones are packed with sophisticated components. A touch screen allows users to input commands directly. High-precision sensors detect orientation and light conditions automatically. Furthermore, built-in voice control chips process spoken phrases, turning the phone into a responsive personal assistant.",
        vietnamese: "ĐIỆN THOẠI THÔNG MINH VÀ THIẾT BỊ CÔNG NGHỆ (Trang 116): Điện thoại thông minh hiện đại chứa các linh kiện tinh vi. Màn hình cảm ứng cho phép người dùng nhập lệnh trực tiếp. Các cảm biến độ chính xác cao tự động phát hiện hướng và điều kiện ánh sáng. Hơn nữa, chip điều khiển bằng giọng nói tích hợp xử lý các cụm từ nói, biến điện thoại thành một trợ lý cá nhân nhạy bén."
      },
      {
        english: "SMART HOMES OF THE FUTURE (Page 117): In the near future, smart homes will use artificial intelligence to optimize energy consumption. Robot vacuums will clean rooms, smart security cameras will monitor gates, and voice commands will control all appliances. These automatic technologies will save a massive amount of electric energy.",
        vietnamese: "NGÔI NHÀ THÔNG MINH TRONG TƯƠNG LAI (Trang 117): Trong tương lai gần, các ngôi nhà thông minh sẽ sử dụng trí tuệ nhân tạo để tối ưu hóa việc tiêu thụ năng lượng. Robot hút bụi sẽ dọn dẹp phòng, camera an ninh thông minh giám sát cổng và lệnh thoại sẽ điều khiển tất cả thiết bị. Các công nghệ tự động này sẽ tiết kiệm lượng lớn điện năng."
      }
    ],
    vocabulary: [
      { word: "gadget", meaning: "thiết bị công nghệ nhỏ gọn hữu ích", pronunciation: "/ˈgædʒ.ɪt/" },
      { word: "sensor", meaning: "cảm biến, bộ phận cảm thụ", pronunciation: "/ˈsen.sər/" },
      { word: "automatic", meaning: "tự động, không cần điều khiển tay", pronunciation: "/ˌɔː.təˈmæt.ɪk/" },
      { word: "artificial", meaning: "nhân tạo, do con người làm ra", pronunciation: "/ˌɑː.tɪˈfɪʃ.əl/" },
      { word: "components", meaning: "các linh kiện, bộ phận cấu thành", pronunciation: "/kəmˈpəʊ.nənts/" }
    ],
    questions: [
      {
        id: "r-u10-ex1-1",
        question: "How do modern smartphones detect screen orientation changes?",
        options: ["By using voice commands", "By using high-precision sensors", "By using charging cables", "By using manual volume buttons"],
        correct_index: 1,
        explanation: "Đoạn 1 nêu: 'High-precision sensors detect orientation and light conditions automatically.'"
      },
      {
        id: "r-u10-sc1",
        question: "[Sentence Completion] A ___ screen allows smartphone users to tap and input commands.",
        options: ["glass", "touch", "metal", "dark"],
        correct_index: 1,
        explanation: "Linh kiện quen thuộc: 'touch screen' (màn hình cảm ứng)."
      },
      {
        id: "r-u10-g1",
        question: "[Grammar - Future Predictions] 'In the future, artificial intelligence ___ control most smart home gadgets.'",
        options: ["will", "was", "went", "is going to"],
        correct_index: 0,
        explanation: "Để đưa ra dự đoán dài hạn về tương lai công nghệ, ta dùng cấu trúc 'will + V'."
      }
    ]
  }
};

export function getReadingLessonForUnit(unitNumber: number): IELTSReadingLesson {
  const normalized = Math.max(1, Math.min(10, unitNumber));
  return ieltsReadingLessons[normalized] || ieltsReadingLessons[1];
}
