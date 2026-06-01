export interface WritingTask {
  unitNum: number;
  title: string;
  topicTitle: string;
  prompt: string;
  wordLimit: string;
  focusPoint: string;
  structure: string[];
  vocabBank: { word: string; meaning: string }[];
  checklist: string[];
  modelAnswer: string;
  modelAnswerTranslation: string;
}

export const ieltsWritingTasks: Record<number, WritingTask> = {
  1: {
    unitNum: 1,
    title: "Jack's Daily Routine",
    topicTitle: "Unit 1: Daily Life (Writing focus)",
    prompt: "Write a short paragraph (50-80 words) describing your typical daily routine. Mention what time you wake up, your main school activities, and what you do in the evening.",
    wordLimit: "50 - 80 từ",
    focusPoint: "Thì Hiện tại đơn, sử dụng đúng dấu câu (Punctuation) và chữ viết hoa (Capital letters).",
    structure: [
      "Introduction: Giới thiệu ngắn về bản thân và thời gian thức dậy.",
      "Body: Các hoạt động học tập chính vào ban ngày.",
      "Conclusion: Các hoạt động giải trí và ăn uống vào buổi tối cùng gia đình."
    ],
    vocabBank: [
      { word: "routine", meaning: "thói quen hàng ngày" },
      { word: "prepare", meaning: "chuẩn bị" },
      { word: "delicious", meaning: "ngon miệng" },
      { word: "prefer", meaning: "thích hơn" },
      { word: "homework", meaning: "bài tập về nhà" }
    ],
    checklist: [
      "Viết hoa chữ cái đầu tiên của câu và tên riêng (ví dụ: 'Jack', 'I', 'Monday').",
      "Sử dụng đúng dấu chấm (.) cuối câu và dấu phẩy (,) khi liệt kê.",
      "Chia động từ số ít/số nhiều chính xác ở thì Hiện tại đơn."
    ],
    modelAnswer: "My daily routine is simple. Every day, I wake up at 6:30 AM. After breakfast, I catch the bus to school. My classes start at 8:00 AM and finish at 3:00 PM. In the afternoon, I help my mother in the garden. In the evening, we have dinner together. My grandmother is an amazing cook, so the food is always delicious. I always do my homework and go to bed before 10:00 PM.",
    modelAnswerTranslation: "Thói quen hàng ngày của tôi rất đơn giản. Mỗi ngày, tôi thức dậy lúc 6:30 sáng. Sau bữa sáng, tôi bắt xe buýt đến trường. Các tiết học của tôi bắt đầu lúc 8:00 sáng và kết thúc lúc 3:00 chiều. Vào buổi chiều, tôi giúp mẹ làm vườn. Vào buổi tối, chúng tôi ăn tối cùng nhau. Bà của tôi là một đầu bếp tuyệt vời, vì vậy thức ăn luôn luôn ngon. Tôi luôn làm bài tập về nhà và đi ngủ trước 10:00 tối."
  },
  2: {
    unitNum: 2,
    title: "Describing Your Home",
    topicTitle: "Unit 2: House and Home (Writing focus)",
    prompt: "Write a short paragraph (50-80 words) describing your house or apartment. Explain how many rooms it has and what furniture is inside your favorite room.",
    wordLimit: "50 - 80 từ",
    focusPoint: "Cấu trúc There is / There are và giới từ chỉ nơi chốn (Prepositions of place: in, on, next to, under).",
    structure: [
      "Introduction: Giới thiệu loại nhà ở và vị trí tầng.",
      "Body: Mô tả số lượng phòng và các tiện nghi cơ bản.",
      "Conclusion: Mô tả căn phòng yêu thích nhất và vị trí các đồ đạc."
    ],
    vocabBank: [
      { word: "apartment", meaning: "căn hộ chung cư" },
      { word: "comfortable", meaning: "tiện nghi, thoải mái" },
      { word: "balcony", meaning: "ban công" },
      { word: "wardrobe", meaning: "tủ quần áo" },
      { word: "living room", meaning: "phòng khách" }
    ],
    checklist: [
      "Sử dụng đúng 'There is' cho danh từ số ít và 'There are' cho danh từ số nhiều.",
      "Kết hợp ít nhất 3 giới từ chỉ vị trí (in, on, next to, between).",
      "Đảm bảo viết đúng chính tả các phòng trong nhà."
    ],
    modelAnswer: "I live in a comfortable apartment on the third floor. It has four main rooms: a kitchen, a living room, a bedroom, and a bathroom. My favorite room is the living room because there is a small balcony next to it. In this room, there is a soft sofa. Next to the sofa, there is a dining table. A large television is on the wall. I like my home because it is clean and quiet.",
    modelAnswerTranslation: "Tôi sống trong một căn hộ tiện nghi ở tầng ba. Nó có bốn phòng chính: một phòng bếp, một phòng khách, một phòng ngủ và một phòng tắm. Căn phòng yêu thích nhất của tôi là phòng khách vì có một ban công nhỏ ngay cạnh đó. Trong phòng này có một chiếc ghế sofa mềm mại. Bên cạnh sofa là một chiếc bàn ăn. Một chiếc tivi lớn được treo trên tường. Tôi thích ngôi nhà của mình vì nó sạch sẽ và yên tĩnh."
  },
  3: {
    unitNum: 3,
    title: "Writing About Hobbies",
    topicTitle: "Unit 3: Hobbies (Writing focus)",
    prompt: "Write a paragraph (60-90 words) explaining your favorite hobby. What do you like doing in your free time, how often do you do it, and why do you enjoy it?",
    wordLimit: "60 - 90 từ",
    focusPoint: "Các liên từ (and, but, because) và động từ đi kèm sở thích (play, do, go).",
    structure: [
      "Introduction: Tuyên bố sở thích yêu thích nhất là gì.",
      "Body: Tần suất thực hiện và các chi tiết liên quan (làm cùng ai, ở đâu).",
      "Conclusion: Lý do tại sao hoạt động đó giúp bạn thư giãn."
    ],
    vocabBank: [
      { word: "hobby", meaning: "sở thích lúc rảnh rỗi" },
      { word: "relax", meaning: "thư giãn, nghỉ ngơi" },
      { word: "active", meaning: "năng động, hoạt bát" },
      { word: "competitive", meaning: "mang tính cạnh tranh" }
    ],
    checklist: [
      "Sử dụng đúng động từ cho sở thích: 'play' cho thể thao có bóng, 'go' cho động từ đuôi -ing, 'do' cho võ thuật/yoga.",
      "Nối các ý bằng liên từ 'and', 'but', và 'because' để viết câu phức đơn giản.",
      "Tránh lặp từ 'like' quá nhiều bằng cách dùng 'enjoy' hoặc 'prefer'."
    ],
    modelAnswer: "My favorite hobby is reading books. I enjoy this activity because it helps me relax after busy hours at school. I usually read for thirty minutes every evening before going to sleep. Sometimes, I also play football with my friends on Saturdays. Playing football is active and keeps my body healthy, but reading is my absolute favorite. It is quiet and opens up new worlds for me.",
    modelAnswerTranslation: "Sở thích yêu thích của tôi là đọc sách. Tôi thích hoạt động này vì nó giúp tôi thư giãn sau những giờ học bận rộn ở trường. Tôi thường đọc sách khoảng ba mươi phút mỗi tối trước khi đi ngủ. Thỉnh thoảng, tôi cũng chơi bóng đá với bạn bè vào các ngày thứ Bảy. Chơi bóng đá giúp tôi vận động và giữ cơ thể khỏe mạnh, nhưng đọc sách vẫn là sở thích số một của tôi. Nó yên tĩnh và mở ra những thế giới mới cho tôi."
  },
  4: {
    unitNum: 4,
    title: "Writing a Travel Postcard",
    topicTitle: "Unit 4: Travel (Writing focus)",
    prompt: "Write a short travel postcard (50-80 words) to a friend about a holiday you had. Mention where you went, what you did, and how the accommodation was.",
    wordLimit: "50 - 80 từ",
    focusPoint: "Thì Quá khứ đơn (Past Simple) với động từ có quy tắc và bất quy tắc.",
    structure: [
      "Greeting: Lời chào thân mật gửi bạn (ví dụ: 'Dear Mary,').",
      "Body: Điểm du lịch trong quá khứ, các hoạt động tham quan đã trải qua.",
      "Conclusion: Mô tả ngắn về đồ ăn/nơi ở và lời hứa hẹn ngày về."
    ],
    vocabBank: [
      { word: "destination", meaning: "điểm đến" },
      { word: "itinerary", meaning: "lịch trình" },
      { word: "accommodation", meaning: "chỗ ở" },
      { word: "souvenir", meaning: "quà lưu niệm" }
    ],
    checklist: [
      "Chia đúng các động từ ở thì Quá khứ đơn (ví dụ: 'go -> went', 'have -> had', 'visit -> visited').",
      "Sử dụng trạng từ chỉ thời gian quá khứ phù hợp (last year, yesterday, last week).",
      "Viết hoa chữ cái đầu dòng của lời chào và lời chúc cuối thư."
    ],
    modelAnswer: "Dear Mary, last week I went on a wonderful holiday to Da Nang with my family. We traveled by plane and stayed in a comfortable eco-lodge near the beach. The accommodation was clean and quiet. We visited the famous mountains and ate delicious seafood every evening. I bought some beautiful souvenirs for you. See you soon! Best, Jack.",
    modelAnswerTranslation: "Mary thân mến, tuần trước tớ đã có một kỳ nghỉ tuyệt vời ở Đà Nẵng cùng gia đình. Chúng tớ đã đi bằng máy bay và ở trong một nhà nghỉ sinh thái tiện nghi gần bãi biển. Chỗ ở sạch sẽ và yên tĩnh. Chúng tớ đã tham quan những ngọn núi nổi tiếng và ăn hải sản ngon mỗi tối. Tớ đã mua vài món quà lưu niệm đẹp cho cậu. Hẹn sớm gặp lại nhé! Thân ái, Jack."
  },
  5: {
    unitNum: 5,
    title: "Describing a Simple Recipe",
    topicTitle: "Unit 5: Food (Writing focus)",
    prompt: "Write a short guide (60-90 words) describing the steps to make a simple salad or dish. Use ordering words like 'First', 'Next', 'Then', and 'Finally'.",
    wordLimit: "60 - 90 từ",
    focusPoint: "Từ chỉ thứ tự (Ordering sequencers) và danh từ đếm được/không đếm được.",
    structure: [
      "Introduction: Giới thiệu món ăn chuẩn bị làm và nguyên liệu cần thiết.",
      "Body: Mô tả chi tiết từng bước chuẩn bị và chế biến món ăn.",
      "Conclusion: Cách trình bày món ăn ra đĩa và thưởng thức."
    ],
    vocabBank: [
      { word: "ingredients", meaning: "các nguyên liệu" },
      { word: "recipe", meaning: "công thức" },
      { word: "fresh", meaning: "tươi sạch" },
      { word: "homemade", meaning: "tự làm ở nhà" }
    ],
    checklist: [
      "Đặt dấu phẩy ngay sau các từ chuyển ý (First, Next, Then, Finally,).",
      "Sử dụng đúng lượng từ (some, a few, a little) trước các nguyên liệu.",
      "Viết đúng dạng động từ mệnh lệnh không chia (ví dụ: 'cut', 'mix', 'pour')."
    ],
    modelAnswer: "To make a healthy salad, you need to prepare some fresh ingredients. First, wash the vegetables carefully. Next, chop two tomatoes and one cucumber into small pieces. Then, place everything in a large bowl and add a little olive oil. Finally, mix all the ingredients together and serve it fresh. This homemade recipe is simple, cheap, and very good for your health.",
    modelAnswerTranslation: "Để làm món sa-lát lành mạnh, bạn cần chuẩn bị một vài nguyên liệu tươi sạch. Đầu tiên, hãy rửa sạch rau củ thật cẩn thận. Tiếp theo, thái nhỏ hai quả cà chua và một quả dưa chuột thành những miếng nhỏ. Sau đó, đặt mọi thứ vào một chiếc bát lớn và thêm một chút dầu ô-liu. Cuối cùng, trộn tất cả các nguyên liệu lại với nhau và thưởng thức khi còn tươi. Công thức tự làm này rất đơn giản, rẻ tiền và rất tốt cho sức khỏe của bạn."
  },
  6: {
    unitNum: 6,
    title: "Comparing Two Ways of Traveling",
    topicTitle: "Unit 6: Transport (Writing focus)",
    prompt: "Write a paragraph (60-90 words) comparing traveling by train and traveling by private car. Which one is faster, cheaper, and better for the environment?",
    wordLimit: "60 - 90 từ",
    focusPoint: "Cấu trúc So sánh hơn (Comparative adjectives) của tính từ ngắn và tính từ dài.",
    structure: [
      "Introduction: Giới thiệu hai phương tiện giao thông (train vs car).",
      "Body: So sánh chi tiết về khía cạnh tốc độ, chi phí và mức độ ô nhiễm.",
      "Conclusion: Khẳng định phương tiện nào là lựa chọn tốt nhất đối với cá nhân."
    ],
    vocabBank: [
      { word: "commute", meaning: "đi lại hàng ngày" },
      { word: "congestion", meaning: "ùn tắc giao thông" },
      { word: "environment", meaning: "môi trường" },
      { word: "public", meaning: "công cộng" }
    ],
    checklist: [
      "Sử dụng đúng đuôi '-er' cho tính từ ngắn (faster, cheaper, cleaner) và 'more' cho tính từ dài (more expensive, more comfortable).",
      "Sử dụng từ so sánh 'than' sau tính từ so sánh.",
      "Đảm bảo câu văn khách quan khi so sánh."
    ],
    modelAnswer: "In big cities, traveling by train is much better than driving a private car. First, taking the train is faster because trains do not get stuck in traffic jams during the rush hour. Second, train tickets are cheaper than petrol costs. Finally, train travel is more environmentally friendly because it reduces carbon emissions on the roads. Therefore, using public transport is the best choice for city commuters.",
    modelAnswerTranslation: "Ở các thành phố lớn, di chuyển bằng tàu hỏa tốt hơn nhiều so với tự lái xe ô tô cá nhân. Thứ nhất, đi tàu hỏa nhanh hơn vì tàu hỏa không bị kẹt xe vào giờ cao điểm. Thứ hai, vé tàu hỏa rẻ hơn so với chi phí mua xăng dầu. Cuối cùng, đi lại bằng tàu hỏa thân thiện với môi trường hơn vì nó giảm lượng khí thải carbon trên đường phố. Do đó, sử dụng phương tiện giao thông công cộng là lựa chọn tốt nhất cho những người đi làm ở thành phố."
  },
  7: {
    unitNum: 7,
    title: "My Future Career Goal",
    topicTitle: "Unit 7: Jobs (Writing focus)",
    prompt: "Write a short paragraph (50-80 words) describing a job you would like to do in the future. What are the main activities of this job, and why does it interest you?",
    wordLimit: "50 - 80 từ",
    focusPoint: "Cấu trúc 'would like to + Verb' và sử dụng động từ khuyết thiếu 'should' để nói về yêu cầu công việc.",
    structure: [
      "Introduction: Nêu tên công việc mong ước trong tương lai.",
      "Body: Các nhiệm vụ hàng ngày của công việc đó và môi trường làm việc.",
      "Conclusion: Kỹ năng hoặc bằng cấp cần chuẩn bị ngay từ bây giờ."
    ],
    vocabBank: [
      { word: "office", meaning: "văn phòng" },
      { word: "manual", meaning: "thủ công" },
      { word: "qualifications", meaning: "bằng cấp" },
      { word: "colleagues", meaning: "đồng nghiệp" }
    ],
    checklist: [
      "Sử dụng chính xác cụm từ 'would like to' để diễn tả mong ước, thay vì dùng 'like' thông thường.",
      "Sử dụng động từ khuyết thiếu 'should' để diễn tả lời khuyên chuẩn bị.",
      "Tránh viết tắt trong các câu học thuật nếu có thể."
    ],
    modelAnswer: "In the future, I would like to work as an English teacher in a school. I want this job because I love helping young children learn new languages. Every day, I should prepare fun lessons and support my students in the classroom. This is not a manual job, so I need to study at university to get good qualifications. Working with nice colleagues will also make me very happy.",
    modelAnswerTranslation: "Trong tương lai, tôi muốn làm giáo viên tiếng Anh trong một trường học. Tôi muốn công việc này vì tôi thích giúp đỡ trẻ nhỏ học ngôn ngữ mới. Mỗi ngày, tôi nên chuẩn bị các bài học vui nhộn và hỗ trợ học sinh của mình trong lớp học. Đây không phải là một công việc chân tay, vì vậy tôi cần phải học đại học để lấy bằng cấp tốt. Làm việc với các đồng nghiệp tốt cũng sẽ khiến tôi rất hạnh phúc."
  },
  8: {
    unitNum: 8,
    title: "Writing a Health Advice Letter",
    topicTitle: "Unit 8: Health (Writing focus)",
    prompt: "Write a short message (50-80 words) giving advice to a friend who cannot sleep well at night. Recommend what they should and shouldn't do.",
    wordLimit: "50 - 80 từ",
    focusPoint: "Cấu trúc lời khuyên dùng 'should / shouldn't' và 'had better / had better not'.",
    structure: [
      "Greeting: Chào hỏi bạn bè thân mật.",
      "Body: Lời khuyên nên làm (should do) để có giấc ngủ tốt.",
      "Conclusion: Cảnh báo những điều không nên làm (should not do) và lời chúc sức khỏe."
    ],
    vocabBank: [
      { word: "insomnia", meaning: "chứng mất ngủ" },
      { word: "symptom", meaning: "triệu chứng" },
      { word: "recommendation", meaning: "khuyến nghị" },
      { word: "strain", meaning: "sự mệt mỏi/căng mắt" }
    ],
    checklist: [
      "Sử dụng cấu trúc 'should + động từ nguyên mẫu' và 'should not + động từ nguyên mẫu'.",
      "Sử dụng cấu trúc mạnh mẽ 'had better + Verb' để đưa ra lời khuyên thiết thực.",
      "Giữ thái độ chân thành, quan tâm lo lắng cho bạn bè."
    ],
    modelAnswer: "Hi Tom, I am sorry to hear about your insomnia. To sleep better, you should avoid looking at phone screens at least one hour before bed. The blue light causes serious eye strain. Instead, you had better read a paper book under a warm lamp. You shouldn't drink any coffee or tea in the evening. Keeping your bedroom quiet and cool will also help you rest. Take care! Jack.",
    modelAnswerTranslation: "Chào Tom, tớ rất tiếc khi biết về chứng mất ngủ của cậu. Để ngủ ngon hơn, cậu nên tránh nhìn vào màn hình điện thoại ít nhất một giờ trước khi đi ngủ. Ánh sáng xanh gây mỏi mắt rất nghiêm trọng. Thay vào đó, tốt hơn hết cậu nên đọc một cuốn sách giấy dưới ánh đèn ấm áp. Cậu không nên uống bất kỳ loại cà phê hay trà nào vào buổi tối. Giữ phòng ngủ yên tĩnh và mát mẻ cũng sẽ giúp cậu nghỉ ngơi. Giữ gìn sức khỏe nhé! Jack."
  },
  9: {
    unitNum: 9,
    title: "My Vocabulary Study Plan",
    topicTitle: "Unit 9: Language (Writing focus)",
    prompt: "Write a short paragraph (50-80 words) about your plans to learn English vocabulary next month. What are you going to do to achieve your goal?",
    wordLimit: "50 - 80 từ",
    focusPoint: "Thì Tương lai gần dùng cấu trúc 'be going to + Verb' để diễn tả kế hoạch định trước.",
    structure: [
      "Introduction: Tuyên bố mục tiêu học từ vựng tiếng Anh vào tháng tới.",
      "Body: Các hành động cụ thể sẽ thực hiện (ví dụ: dùng flashcard, đọc sách).",
      "Conclusion: Kết quả mong đợi đạt được sau kế hoạch."
    ],
    vocabBank: [
      { word: "bilingual", meaning: "song ngữ" },
      { word: "fluency", meaning: "sự trôi chảy" },
      { word: "opportunities", meaning: "các cơ hội" },
      { word: "native", meaning: "người bản xứ" }
    ],
    checklist: [
      "Chia đúng dạng động từ to-be theo chủ ngữ (I am going to, We are going to).",
      "Sử dụng đúng cụm từ 'going to' kèm động từ nguyên thể không chia.",
      "Trình bày mạch lạc bằng các trạng từ nối (First, Also, Finally)."
    ],
    modelAnswer: "Next month, I am going to practice English vocabulary every day because I want to achieve fluency. First, I am going to learn five new words every morning. Also, I am going to use flashcards to review them during my commute. Finally, I am going to read simple English books in the evening. These actions will help me become bilingual and open up great opportunities for my future studies.",
    modelAnswerTranslation: "Tháng tới, tôi dự định thực hành từ vựng tiếng Anh mỗi ngày vì tôi muốn đạt được sự trôi chảy. Đầu tiên, tôi định học năm từ mới vào mỗi buổi sáng. Ngoài ra, tôi định sử dụng thẻ flashcard để ôn tập chúng trong hành trình đi lại hàng ngày. Cuối cùng, tôi định đọc sách tiếng Anh đơn giản vào buổi tối. Những hành động này sẽ giúp tôi sử dụng song ngữ và mở ra những cơ hội tuyệt vời cho việc học tập trong tương lai."
  },
  10: {
    unitNum: 10,
    title: "Predictions About Tech in 2050",
    topicTitle: "Unit 10: Tech (Writing focus)",
    prompt: "Write a short paragraph (60-90 words) making predictions about technology in our homes in the year 2050. What will or won't be different?",
    wordLimit: "60 - 90 từ",
    focusPoint: "Thì Tương lai đơn để đưa ra dự đoán cá nhân: 'will / won't + Verb'.",
    structure: [
      "Introduction: Đặt vấn đề về viễn cảnh công nghệ gia đình năm 2050.",
      "Body: Các dự báo cụ thể về thiết bị thông minh (sẽ làm gì và không cần làm gì).",
      "Conclusion: Ý kiến cá nhân về việc con người có quá phụ thuộc vào máy móc không."
    ],
    vocabBank: [
      { word: "gadget", meaning: "thiết bị nhỏ thông minh" },
      { word: "automatically", meaning: "một cách tự động" },
      { word: "artificial", meaning: "nhân tạo (AI)" },
      { word: "predict", meaning: "dự đoán" }
    ],
    checklist: [
      "Sử dụng 'will' cho các dự đoán khẳng định và 'won't (will not)' cho các dự đoán phủ định.",
      "Không dùng to-be sau 'will/won't' trừ khi là thể bị động hoặc động từ chính là 'be'.",
      "Mở đầu bằng các từ dự đoán như 'I predict that', 'In my opinion,', 'I believe that'."
    ],
    modelAnswer: "I predict that technology will change our homes completely in 2050. First, our houses will contain many smart gadgets connected to the internet. We won't need to clean floors because robot vacuum cleaners will perform all tasks automatically. In my opinion, artificial intelligence will also prepare gourmet meals in our kitchen. However, we should be careful not to become too dependent on these modern devices.",
    modelAnswerTranslation: "Tôi dự đoán rằng công nghệ sẽ thay đổi hoàn toàn ngôi nhà của chúng ta vào năm 2050. Đầu tiên, nhà của chúng ta sẽ chứa nhiều thiết bị thông minh kết nối với internet. Chúng ta sẽ không cần lau sàn nhà vì robot hút bụi sẽ thực hiện tất cả các tác vụ một cách tự động. Theo tôi, trí tuệ nhân tạo cũng sẽ chuẩn bị các bữa ăn ngon trong nhà bếp của chúng ta. Tuy nhiên, chúng ta nên cẩn thận không để bị quá phụ thuộc vào các thiết bị hiện đại này."
  }
};

export function getWritingTaskForUnit(unitNumber: number): WritingTask {
  const normalized = Math.max(1, Math.min(10, unitNumber));
  return ieltsWritingTasks[normalized] || ieltsWritingTasks[1];
}
