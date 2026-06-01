import type { QuizQuestion } from "@/types/database";

// Define a structured IELTS script step
export interface ScriptStep {
  text: string;
  expectedInput?: string;
}

export interface UnitScript {
  unitTitle: string;
  vocabularyWord: string;
  vocabularyMeaning: string;
  grammarRule: string;
  grammarExample: string;
  steps: ScriptStep[];
}

// 1. Get Guided Scripts for 10 IELTS Units (handles 90% of flow locally with 0 API calls)
export function getScriptForUnit(unitNumber: number, studentName: string, pageHint: string): UnitScript {
  const normalizedUnit = Math.max(1, Math.min(10, unitNumber));
  
  const unitData: Record<number, Omit<UnitScript, "steps">> = {
    1: {
      unitTitle: "Unit 1: Daily Life (Reading & Vocabulary)",
      vocabularyWord: "routine",
      vocabularyMeaning: "thói quen hàng ngày, các hoạt động lặp đi lặp lại theo trình tự cố định.",
      grammarRule: "Thì Hiện tại đơn (Present Simple) để tả thói quen, kết hợp trạng từ tần suất (always, usually, sometimes...).",
      grammarExample: "I usually wake up at 6 AM and set my alarm clock every night.",
    },
    2: {
      unitTitle: "Unit 2: House and Home (Vocabulary & Speaking)",
      vocabularyWord: "balcony",
      vocabularyMeaning: "ban công, phần nhô ra ngoài hiên từ các tầng cao của tòa nhà.",
      grammarRule: "Giới từ chỉ nơi chốn (Prepositions of place): in, on, under, next to, between.",
      grammarExample: "The key is on the dining room table next to the sofa.",
    },
    3: {
      unitTitle: "Unit 3: Hobbies (Vocabulary & Listening)",
      vocabularyWord: "adventure",
      vocabularyMeaning: "cuộc phiêu lưu, trải nghiệm mạo hiểm và thú vị.",
      grammarRule: "Phân biệt Thì Hiện tại đơn (thói quen lâu dài) và Hiện tại tiếp diễn (đang diễn ra tạm thời).",
      grammarExample: "I play football every Saturday, but today I am practicing photography.",
    },
    4: {
      unitTitle: "Unit 4: Travel (Reading & Vocabulary)",
      vocabularyWord: "itinerary",
      vocabularyMeaning: "lịch trình chi tiết của một chuyến đi du lịch.",
      grammarRule: "Thì Quá khứ đơn (Past Simple) với động từ bất quy tắc (go -> went, take -> took, buy -> bought).",
      grammarExample: "Yesterday, we went to the airport and bought an ecotourism tour.",
    },
    5: {
      unitTitle: "Unit 5: Food (Vocabulary & Listening)",
      vocabularyWord: "ingredients",
      vocabularyMeaning: "các nguyên liệu cần thiết để chế biến một món ăn.",
      grammarRule: "Danh từ đếm được và không đếm được (Countable & Uncountable nouns) kèm lượng từ (some, any, much, many).",
      grammarExample: "There are some tomatoes, but there isn't much milk in the fridge.",
    },
    6: {
      unitTitle: "Unit 6: Transport (Vocabulary & Reading)",
      vocabularyWord: "commute",
      vocabularyMeaning: "quãng đường hoặc hành trình di chuyển đi làm/đi học hàng ngày bằng phương tiện giao thông.",
      grammarRule: "Cấu trúc So sánh hơn và So sánh nhất của tính từ (Comparative & Superlative adjectives).",
      grammarExample: "Going by train is faster than driving a car during the rush hour.",
    },
    7: {
      unitTitle: "Unit 7: Jobs (Vocabulary & Listening)",
      vocabularyWord: "automation",
      vocabularyMeaning: "sự tự động hóa, thay thế sức lao động của con người bằng máy móc.",
      grammarRule: "Động từ khuyết thiếu (Modal verbs) diễn tả khả năng và lời khuyên: can, could, should.",
      grammarExample: "Students should learn digital skills because many summer jobs can be automated.",
    },
    8: {
      unitTitle: "Unit 8: Health (Listening & Vocabulary)",
      vocabularyWord: "insomnia",
      vocabularyMeaning: "chứng mất ngủ, khó ngủ kéo dài gây mệt mỏi.",
      grammarRule: "Lời khuyên bảo vệ sức khỏe dùng cấu trúc: should, shouldn't, ought to, had better.",
      grammarExample: "You should avoid using your phone before bed to prevent insomnia.",
    },
    9: {
      unitTitle: "Unit 9: Language (Vocabulary & Listening)",
      vocabularyWord: "bilingual",
      vocabularyMeaning: "song ngữ, khả năng nói trôi chảy hai ngôn ngữ.",
      grammarRule: "Thì Tương lai gần diễn tả dự định/kế hoạch cụ thể: be going to + Verb.",
      grammarExample: "I am going to practice English vocabulary online every day to become bilingual.",
    },
    10: {
      unitTitle: "Unit 10: Tech (Vocabulary & Reading)",
      vocabularyWord: "gadget",
      vocabularyMeaning: "thiết bị công nghệ nhỏ gọn, hữu ích và thông minh (ví dụ: máy nghe nhạc, đồng hồ thông minh...).",
      grammarRule: "Dự đoán tương lai với cấu trúc: will / won't + Verb.",
      grammarExample: "In the future, artificial intelligence will control most smart home gadgets.",
    },
  };

  const data = unitData[normalizedUnit];

  const steps: ScriptStep[] = [
    {
      text: `👋 Chào em, ${studentName}! Thầy/Cô rất vui được đồng hành cùng em trong buổi học hôm nay.
Chủ đề học của chúng ta: **${data.unitTitle}**.
Mục tiêu là bám sát phần kiến thức **${pageHint || "trong sách giáo trình"}**.

Em đã sẵn sàng mở sách học chưa? Hãy gõ **"Sẵn sàng"** hoặc **"Em sẵn sàng"** để chúng ta bắt đầu ôn tập nhé!`,
    },
    {
      text: `🌟 Tuyệt vời! Đầu tiên, thầy cô muốn kiểm tra vốn Từ vựng (Vocabulary) của em một chút.
Trong Unit này có một từ vựng rất quan trọng là: **"${data.vocabularyWord}"** (nghĩa là: ${data.vocabularyMeaning}).

Em hãy viết một câu tiếng Anh đơn giản có chứa từ **"${data.vocabularyWord}"** để chứng tỏ em đã nắm vững từ này nhé!`,
    },
    {
      text: `Phản hồi rất xuất sắc! Bây giờ chúng ta sẽ chuyển sang tiêu điểm Ngữ pháp (Grammar/Usage).
Trong chủ đề này, chúng ta cần ghi nhớ kỹ cấu trúc:
👉 **${data.grammarRule}**
*Ví dụ:* ${data.grammarExample}

Bây giờ, em hãy thử viết một câu ngắn áp dụng cấu trúc ngữ pháp này nhé!`,
    },
    {
      text: `Rất tốt! Em áp dụng cấu trúc ngữ pháp rất chuẩn rồi đấy.
Tiếp theo, thầy cô khuyên em nên dành khoảng 5 - 10 phút để thực hành **Bài tập trắc nghiệm (15-20 câu)** ở ngay cột bên trái màn hình. Bài tập này được biên soạn bám sát đề thi IELTS thực tế để giúp em nhớ sâu từ vựng & cấu trúc của Unit này.

Khi đã làm xong bài tập trắc nghiệm, em hãy gõ **"Đã xong quiz"** để thầy cô tổng kết buổi học nhé!`,
    },
    {
      text: `🎉 Chúc mừng em đã hoàn thành xuất sắc bài học hôm nay! Em đã nắm rất chắc kiến thức từ vựng và ngữ pháp của **${data.unitTitle}**.

Em hãy nhớ kiểm tra hoặc nhắc ba mẹ tích chọn vào các ô checkbox "Dành cho Phụ huynh" ở bên dưới nhé.
Nếu em có bất kỳ câu hỏi nào cần thầy cô giải thích thêm hoặc muốn dịch từ, em cứ gõ trực tiếp câu hỏi tại đây (ví dụ: *"Giải thích giúp em câu hỏi số 3"*), thầy cô sẽ giải thích chi tiết realtime ngay cho em!`,
    }
  ];

  return {
    ...data,
    steps,
  };
}

// 2. Fallback Quiz questions for the 10 units (Guarantees 15 questions per lesson under all circumstances)
export function getFallbackQuestionsForUnit(unitNumber: number, quizId: string): QuizQuestion[] {
  const normalizedUnit = Math.max(1, Math.min(10, unitNumber));

  const questionsData: Record<number, Omit<QuizQuestion, "id" | "quiz_id" | "order_index">[]> = {
    1: [
      { question: "What is Jack's brother good at?", options: ["Cooking", "Building things", "Painting", "Gardening"], correct_index: 1, explanation: "Jack mentioned his brother is great at building things and fixing stuff." },
      { question: "Who makes the meals in Jack's family?", options: ["His mother", "His father", "His grandma", "Jack himself"], correct_index: 2, explanation: "Jack said his grandma is an amazing cook and makes all their meals." },
      { question: "What does Jack's sister enjoy doing?", options: ["Gardening", "Reading", "Painting and drawing", "Building furniture"], correct_index: 2, explanation: "Jack mentioned his sister is talented at painting and drawing." },
      { question: "What is Jack's mother's hobby?", options: ["Gardening", "Cooking", "Reading", "Gym"], correct_index: 0, explanation: "Jack said his mother loves gardening and planting flowers." },
      { question: "How does Jack describe his father?", options: ["Very active", "A bit lazy", "A great cook", "Good at fixing things"], correct_index: 1, explanation: "Jack mentioned his father is a bit lazy and prefers staying at home." },
      { question: "Jack's brother even made some of their ______.", options: ["Clothes", "Furniture", "Toys", "Food"], correct_index: 1, explanation: "Jack's brother is so good at building that he made some furniture." },
      { question: "Where does Jack's father prefer to stay?", options: ["At the gym", "At home", "In the garden", "At work"], correct_index: 1, explanation: "Jack said his father prefers staying at home and reading." },
      { question: "What does Jack's mother plant?", options: ["Vegetables", "Trees", "Flowers", "Fruit"], correct_index: 2, explanation: "Jack specifically mentioned she is always planting flowers." },
      { question: "Does Jack's father use his gym membership often?", options: ["Yes, every day", "Yes, twice a week", "No, rarely", "No, never"], correct_index: 2, explanation: "Jack mentioned his father has a gym membership but rarely goes." },
      { question: "What is Jack's sister talented at?", options: ["Music", "Cooking", "Art (Painting/Drawing)", "Sports"], correct_index: 2, explanation: "Jack said she is talented at painting and drawing." },
      { question: "The word 'delicious' in the audio refers to...", options: ["The garden", "The furniture", "The grandma's food", "The sister's paintings"], correct_index: 2, explanation: "Jack said the food his grandma makes is always delicious." },
      { question: "Jack's brother is always ______ stuff.", options: ["Breaking", "Fixing", "Selling", "Buying"], correct_index: 1, explanation: "Jack mentioned his brother is always fixing stuff around the house." },
      { question: "Carlos is going to Australia to stay with ______.", options: ["His own family", "Jack's family", "His teacher", "His brother"], correct_index: 1, explanation: "Carlos is visiting Jack and staying with Jack's family." },
      { question: "What gift does Carlos suggest for the grandma?", options: ["A painting", "A recipe book", "A toolkit", "Flowers"], correct_index: 1, explanation: "Carlos suggested bringing a recipe book from the US." },
      { question: "Overall, Jack's family members have ______.", options: ["No hobbies", "The same hobby", "Different skills and interests", "Only indoor hobbies"], correct_index: 2, explanation: "Each family member has a unique skill or interest (building, cooking, art, gardening, reading)." }
    ],
    2: [
      { question: "What is another word for an 'apartment'?", options: ["House", "Flat", "Garden", "Garage"], correct_index: 1, explanation: "Flat là từ tiếng Anh-Anh tương đương với apartment (căn hộ)." },
      { question: "Where do you usually cook meals?", options: ["Bedroom", "Kitchen", "Bathroom", "Living room"], correct_index: 1, explanation: "Kitchen (nhà bếp) là nơi nấu ăn." },
      { question: "A 'balcony' is usually found...", options: ["Dưới hầm", "Nhô ra ngoài hiên từ các tầng cao", "Trong nhà vệ sinh", "Trong ga-ra"], correct_index: 1, explanation: "Balcony là ban công nhô ra ngoài tòa nhà từ các tầng trên." },
      { question: "Where do you sleep?", options: ["Living room", "Dining room", "Bedroom", "Hall"], correct_index: 2, explanation: "Bedroom (phòng ngủ) là nơi ngủ nghỉ." },
      { question: "What are 'stairs' used for?", options: ["Nấu ăn", "Ngủ", "Di chuyển giữa các tầng nhà", "Tắm rửa"], correct_index: 2, explanation: "Stairs (cầu thang) dùng để di chuyển lên xuống giữa các tầng." },
      { question: "A 'garage' is a place to...", options: ["Trồng hoa", "Đậu xe ô tô", "Tắm", "Ăn tối"], correct_index: 1, explanation: "Garage là nhà để xe ô tô." },
      { question: "What is a 'garden'?", options: ["Khu vườn trồng cỏ và hoa", "Phòng để ngủ", "Bếp nấu ăn", "Mái nhà"], correct_index: 0, explanation: "Garden là mảnh vườn xung quanh nhà." },
      { question: "The 'roof' of a house is located at the...", options: ["Dưới cùng", "Giữa", "Trên cùng", "Bên trong"], correct_index: 2, explanation: "Roof (mái nhà) nằm ở phần trên cùng của ngôi nhà." },
      { question: "Where do you usually have dinner with family?", options: ["Bathroom", "Garage", "Dining room", "Hall"], correct_index: 2, explanation: "Dining room là phòng ăn gia đình." },
      { question: "What is the 'ceiling'?", options: ["Sàn nhà", "Trần nhà", "Bức tường", "Cửa sổ"], correct_index: 1, explanation: "Ceiling là trần nhà." },
      { question: "What do you call the entrance area of a house?", options: ["Kitchen", "Hall", "Balcony", "Roof"], correct_index: 1, explanation: "Hall là sảnh hoặc lối đi ngay cửa vào." },
      { question: "You use a 'window' to...", options: ["Đi xuyên qua", "Nhìn ra bên ngoài", "Ngủ lên trên", "Nấu ăn"], correct_index: 1, explanation: "Cửa sổ (window) dùng để đón ánh sáng và nhìn ra ngoài." },
      { question: "What is 'wall' in Vietnamese?", options: ["Cửa sổ", "Bức tường", "Sàn nhà", "Mái nhà"], correct_index: 1, explanation: "Wall nghĩa là bức tường." },
      { question: "Which room usually has a sofa and a TV?", options: ["Kitchen", "Living room", "Bathroom", "Dining room"], correct_index: 1, explanation: "Living room (phòng khách) thường có sofa và TV." },
      { question: "What is the 'floor'?", options: ["Mái nhà", "Sàn nhà", "Tường", "Cửa chính"], correct_index: 1, explanation: "Floor là sàn nhà để chúng ta đi lại." }
    ],
    3: [
      { question: "What is 'photography'?", options: ["Nghệ thuật chụp ảnh", "Nghệ thuật vẽ tranh", "Chơi nhạc cụ", "Đọc sách"], correct_index: 0, explanation: "Photography là nhiếp ảnh hoặc chụp ảnh." },
      { question: "Which verb goes with 'football'?", options: ["Play", "Do", "Go", "Make"], correct_index: 0, explanation: "Play football: chơi bóng đá (dùng play với môn thể thao đồng đội/có bóng)." },
      { question: "Which verb goes with 'swimming'?", options: ["Play", "Do", "Go", "Make"], correct_index: 2, explanation: "Go swimming: đi bơi (dùng go với các môn kết thúc bằng đuôi -ing)." },
      { question: "Which verb goes with 'yoga'?", options: ["Play", "Do", "Go", "Make"], correct_index: 1, explanation: "Do yoga: tập yoga (dùng do với các môn tự luyện hoặc không dùng bóng)." },
      { question: "What is an 'adventure'?", options: ["Cuộc phiêu lưu mạo hiểm", "Bữa tối", "Giờ ngủ trưa", "Lớp học bài"], correct_index: 0, explanation: "Adventure là cuộc phiêu lưu đầy thú vị." },
      { question: "What is the meaning of 'competitive'?", options: ["Mang tính cạnh tranh", "Lười biếng", "Nhút nhát", "Thân thiện"], correct_index: 0, explanation: "Competitive nghĩa là có tính ganh đua, cạnh tranh cao." },
      { question: "Choose the correct sentence in Present Continuous:", options: ["I am reading a book now.", "I read a book every day.", "I will read a book.", "I readed a book."], correct_index: 0, explanation: "Thì hiện tại tiếp diễn tả hành động đang diễn ra: S + am/is/are + V-ing." },
      { question: "What is a 'hobby'?", options: ["Sở thích làm lúc rảnh rỗi", "Công việc bắt buộc", "Môn học trên lớp", "Địa điểm du lịch"], correct_index: 0, explanation: "Hobby là sở thích lúc rảnh rỗi." },
      { question: "If a hobby is a 'career', it means...", options: ["Nó là nghề nghiệp tạo ra thu nhập", "Nó chỉ là trò chơi", "Nó rất tốn kém", "Nó rất nhàm chán"], correct_index: 0, explanation: "Career có nghĩa là sự nghiệp/nghề nghiệp lâu dài." },
      { question: "What is 'extreme sports'?", options: ["Thể thao mạo hiểm cảm giác mạnh", "Thể thao trong nhà", "Cờ vua", "Đi bộ nhẹ nhàng"], correct_index: 0, explanation: "Extreme sports là các môn thể thao mạo hiểm cao như nhảy dù, leo núi." },
      { question: "What do you do in a 'leisure center'?", options: ["Tập luyện thể thao giải trí", "Mua thuốc", "Sửa xe ô tô", "Đóng tiền học"], correct_index: 0, explanation: "Leisure center là trung tâm thể dục thể thao và giải trí." },
      { question: "What is 'camping'?", options: ["Cắm trại ngoài trời", "Đi xem phim", "Đi nhà hàng", "Học tiếng Anh"], correct_index: 0, explanation: "Camping là hoạt động cắm trại ngoài thiên nhiên." },
      { question: "Complete: 'My father is busy. He ______ a competitive sport right now.'", options: ["plays", "is playing", "played", "will play"], correct_index: 1, explanation: "'Right now' chỉ hành động đang diễn ra nên dùng hiện tại tiếp diễn 'is playing'." },
      { question: "Which is NOT a hobby?", options: ["Reading books", "Playing video games", "Doing homework", "Collecting stamps"], correct_index: 2, explanation: "Doing homework (làm bài tập) là nhiệm vụ bắt buộc, không phải sở thích giải trí." },
      { question: "What does 'popularity' mean?", options: ["Sự phổ biến, được yêu thích rộng rãi", "Sự đắt đỏ", "Sự nhàm chán", "Sự nguy hiểm"], correct_index: 0, explanation: "Popularity là sự phổ biến hoặc được nhiều người ưa chuộng." }
    ],
    4: [
      { question: "What is 'ecotourism'?", options: ["Du lịch sinh thái bảo vệ môi trường", "Du lịch vũ trụ", "Du lịch mua sắm", "Du lịch mạo hiểm cực đoan"], correct_index: 0, explanation: "Ecotourism là du lịch sinh thái có trách nhiệm bảo vệ môi trường." },
      { question: "What does 'itinerary' mean?", options: ["Lịch trình chi tiết chuyến đi", "Hộ chiếu", "Vé máy bay", "Vali đựng quần áo"], correct_index: 0, explanation: "Itinerary là lịch trình di chuyển chi tiết của chuyến đi." },
      { question: "Past tense of 'go' is...", options: ["goes", "went", "goed", "going"], correct_index: 1, explanation: "Went là dạng quá khứ bất quy tắc của go." },
      { question: "Past tense of 'buy' is...", options: ["buys", "bought", "buyed", "buying"], correct_index: 1, explanation: "Bought là dạng quá khứ của buy." },
      { question: "What do you catch at an 'airport'?", options: ["Bus", "Train", "Plane", "Taxi"], correct_index: 2, explanation: "Ta bắt máy bay (plane) tại sân bay (airport)." },
      { question: "What is a 'package holiday'?", options: ["Kỳ nghỉ trọn gói từ A-Z", "Đi phượt tự túc", "Chuyến đi trong ngày", "Chuyến công tác ngắn"], correct_index: 0, explanation: "Package holiday là chuyến du lịch trọn gói gồm cả vé, phòng, ăn uống." },
      { question: "Complete: 'Last year, we ______ to Paris for ecotourism.'", options: ["travel", "travelled", "travelling", "will travel"], correct_index: 1, explanation: "'Last year' chỉ thời điểm trong quá khứ nên dùng quá khứ đơn 'travelled'." },
      { question: "What does 'souvenir' mean?", options: ["Quà lưu niệm", "Khách sạn", "Bản đồ", "Nhà hàng"], correct_index: 0, explanation: "Souvenir là món quà lưu niệm mua khi đi chơi xa." },
      { question: "A person who visits a place for holiday is a...", options: ["Teacher", "Doctor", "Tourist", "Pilot"], correct_index: 2, explanation: "Tourist là khách du lịch." },
      { question: "What is 'accommodation'?", options: ["Nơi ở, chỗ trú chân khi du lịch", "Thức ăn", "Xe cộ", "Máy bay"], correct_index: 0, explanation: "Accommodation là chỗ ở (như khách sạn, nhà nghỉ)." },
      { question: "Which is a travel mode on water?", options: ["Ferry/Ship", "Bus", "Train", "Plane"], correct_index: 0, explanation: "Ferry (phà) hoặc Ship (tàu thủy) chạy trên nước." },
      { question: "What does 'guided tour' mean?", options: ["Chuyến đi có hướng dẫn viên", "Tự đi một mình", "Chuyến đi ảo qua mạng", "Chuyến bay dài"], correct_index: 0, explanation: "Guided tour là tour du lịch có hướng dẫn viên dẫn đoàn." },
      { question: "Past tense of 'take' is...", options: ["taken", "took", "takes", "taking"], correct_index: 1, explanation: "Took là dạng quá khứ đơn của take." },
      { question: "What does 'sightseeing' mean?", options: ["Đi ngắm cảnh danh lam thắng cảnh", "Mua sắm", "Nấu ăn tại khách sạn", "Đọc sách ở thư viện"], correct_index: 0, explanation: "Sightseeing là hoạt động đi tham quan, ngắm cảnh." },
      { question: "Complete the sentence: 'We ______ a lot of beautiful photos during our trip last week.'", options: ["take", "took", "taken", "takes"], correct_index: 1, explanation: "'Last week' chỉ quá khứ nên dùng 'took'." }
    ],
    5: [
      { question: "What are 'ingredients'?", options: ["Các nguyên liệu làm món ăn", "Dụng cụ nhà bếp", "Bát đĩa ăn cơm", "Bàn ghế ăn"], correct_index: 0, explanation: "Ingredients là các nguyên liệu chế biến thức ăn." },
      { question: "What is a 'recipe'?", options: ["Công thức hướng dẫn nấu ăn", "Nhà hàng ăn uống", "Đầu bếp", "Hóa đơn thanh toán"], correct_index: 0, explanation: "Recipe là công thức nấu ăn." },
      { question: "Which noun is uncountable?", options: ["Apple", "Water", "Tomato", "Egg"], correct_index: 1, explanation: "Water (nước) là danh từ không đếm được." },
      { question: "Which noun is countable?", options: ["Milk", "Rice", "Banana", "Salt"], correct_index: 2, explanation: "Banana (quả chuối) có thể đếm được." },
      { question: "Complete: 'There isn't ______ milk left in the bottle.'", options: ["many", "much", "some", "a few"], correct_index: 1, explanation: "Milk là danh từ không đếm được, câu phủ định dùng 'much'." },
      { question: "Complete: 'I have ______ apples in my basket.'", options: ["some", "much", "any", "a little"], correct_index: 0, explanation: "Apples là danh từ đếm được số nhiều, câu khẳng định dùng 'some'." },
      { question: "What is 'ultra-processed food'?", options: ["Thực phẩm siêu chế biến nhiều hóa chất", "Đồ ăn tươi sống", "Trái cây tự nhiên", "Rau xanh hữu cơ"], correct_index: 0, explanation: "Ultra-processed food là thực phẩm đóng hộp qua nhiều công đoạn chế biến công nghiệp." },
      { question: "What does 'street food' mean?", options: ["Đồ ăn đường phố", "Bữa tiệc buffet lớn", "Món ăn cung đình", "Đồ ăn tự nấu ở nhà"], correct_index: 0, explanation: "Street food là đồ ăn bán ở vỉa hè hoặc đường phố." },
      { question: "A person who cooks professionally in a restaurant is a...", options: ["Server", "Chef", "Customer", "Manager"], correct_index: 1, explanation: "Chef là đầu bếp chuyên nghiệp." },
      { question: "What is 'vegetarian'?", options: ["Người ăn chay", "Người ăn thịt", "Đầu bếp", "Chủ nhà hàng"], correct_index: 0, explanation: "Vegetarian là người ăn chay (chỉ ăn rau củ quả)." },
      { question: "What does 'sour' taste mean?", options: ["Chua", "Ngọt", "Mặn", "Cay"], correct_index: 0, explanation: "Sour nghĩa là có vị chua (như chanh)." },
      { question: "Which is a cooking method in hot oil?", options: ["Boil", "Fry", "Steam", "Bake"], correct_index: 1, explanation: "Fry là rán hoặc chiên trong dầu nóng." },
      { question: "What does 'nutritious' mean?", options: ["Giàu dinh dưỡng có lợi cho sức khỏe", "Độc hại", "Đắt tiền", "Rất cay"], correct_index: 0, explanation: "Nutritious nghĩa là bổ dưỡng." },
      { question: "Complete: 'Are there ______ carrots in the fridge?'", options: ["any", "much", "a little", "some"], correct_index: 0, explanation: "Carrots là danh từ đếm được, câu hỏi dùng 'any'." },
      { question: "What is 'seafood'?", options: ["Hải sản", "Thịt gia cầm", "Rau quả", "Sữa và bơ"], correct_index: 0, explanation: "Seafood là các món ăn chế biến từ hải sản." }
    ],
    6: [
      { question: "What is a 'traffic jam'?", options: ["Sự tắc nghẽn giao thông, kẹt xe", "Tai nạn giao thông", "Xe buýt nhanh", "Trạm xăng"], correct_index: 0, explanation: "Traffic jam là sự kẹt xe, tắc nghẽn giao thông." },
      { question: "What does 'commute' mean?", options: ["Hành trình đi làm/đi học hàng ngày", "Đi du lịch nghỉ dưỡng", "Đi mua sắm", "Sửa xe"], correct_index: 0, explanation: "Commute là việc di chuyển đi lại thường xuyên giữa nhà và nơi làm/học." },
      { question: "Comparative of 'fast' is...", options: ["fastest", "faster", "more fast", "fasted"], correct_index: 1, explanation: "Faster là dạng so sánh hơn của tính từ ngắn fast." },
      { question: "Superlative of 'expensive' is...", options: ["more expensive", "expensiver", "the most expensive", "the expensivest"], correct_index: 2, explanation: "Most expensive là dạng so sánh nhất của tính từ dài expensive." },
      { question: "Which is a 'public transport'?", options: ["Private car", "Bicycle", "Bus/Metro", "Motorbike"], correct_index: 2, explanation: "Bus (xe buýt) và Metro (tàu điện ngầm) là phương tiện giao thông công cộng." },
      { question: "What is 'pedestrian'?", options: ["Người đi bộ", "Tài xế lái xe", "Hành khách", "Phi công"], correct_index: 0, explanation: "Pedestrian là người đi bộ trên đường." },
      { question: "Complete: 'Traveling by train is ______ than going by taxi during rush hours.'", options: ["cheap", "cheaper", "cheapest", "more cheap"], correct_index: 1, explanation: "So sánh hơn của cheap là cheaper." },
      { question: "What does 'fare' mean?", options: ["Tiền vé xe/vé tàu", "Giá xăng", "Tốc độ xe chạy", "Bản đồ đường đi"], correct_index: 0, explanation: "Fare là tiền vé phải trả khi đi tàu xe." },
      { question: "Which vehicle runs underground?", options: ["Ferry", "Subway/Metro", "Airplane", "Truck"], correct_index: 1, explanation: "Subway/Metro chạy dưới lòng đất." },
      { question: "What is the 'rush hour'?", options: ["Giờ cao điểm tắc đường", "Giờ ngủ trưa", "Nửa đêm", "Sáng sớm"], correct_index: 0, explanation: "Rush hour là giờ cao điểm khi mọi người cùng ra đường đi làm hoặc tan sở." },
      { question: "Complete: 'This is ______ traffic jam I have ever seen!'", options: ["worse", "the worst", "badder", "the baddest"], correct_index: 1, explanation: "So sánh nhất bất quy tắc của bad là 'the worst'." },
      { question: "What does 'environmentally friendly' mean?", options: ["Thân thiện với môi trường", "Độc hại", "Đắt đỏ", "Ồn ào"], correct_index: 0, explanation: "Environmentally friendly có nghĩa là an toàn, bảo vệ môi trường." },
      { question: "Which vehicle is powered only by human legs?", options: ["Motorbike", "Bicycle", "Car", "Train"], correct_index: 1, explanation: "Bicycle (xe đạp) hoạt động bằng sức đạp của chân người." },
      { question: "What does 'congestion' mean?", options: ["Sự quá tải, tắc nghẽn", "Đường thông thoáng", "Bến xe", "Luật giao thông"], correct_index: 0, explanation: "Congestion đồng nghĩa với traffic jam (sự tắc nghẽn)." },
      { question: "Complete: 'Electric cars are ______ than traditional petrol cars.'", options: ["quiet", "quieter", "quietest", "more quiet"], correct_index: 1, explanation: "Quieter là dạng so sánh hơn của quiet." }
    ],
    7: [
      { question: "What does 'automation' mean?", options: ["Sự tự động hóa bằng máy móc", "Sự thủ công", "Việc thất nghiệp", "Kế toán viên"], correct_index: 0, explanation: "Automation là xu hướng tự động hóa, dùng robot thay thế con người." },
      { question: "What is a 'summer job'?", options: ["Công việc làm thêm vào mùa hè", "Công việc trọn đời", "Lớp học hè", "Kỳ nghỉ hè"], correct_index: 0, explanation: "Summer job là công việc bán thời gian học sinh thường làm vào kỳ nghỉ hè." },
      { question: "Which modal verb expresses strict advice or duty?", options: ["can", "could", "should", "may"], correct_index: 2, explanation: "Should dùng để diễn tả lời khuyên nên làm gì." },
      { question: "Which modal verb expresses ability in the past?", options: ["can", "could", "should", "will"], correct_index: 1, explanation: "Could là dạng quá khứ của can, diễn tả khả năng trong quá khứ." },
      { question: "What is a 'colleague'?", options: ["Đồng nghiệp cùng cơ quan", "Khách hàng", "Đối thủ cạnh tranh", "Sếp"], correct_index: 0, explanation: "Colleague là bạn đồng nghiệp." },
      { question: "What does 'qualification' mean?", options: ["Bằng cấp, chứng chỉ chuyên môn", "Mức lương", "Giờ làm việc", "Kinh nghiệm"], correct_index: 0, explanation: "Qualification là bằng cấp hoặc chứng chỉ chuyên môn tối thiểu." },
      { question: "A person who designs buildings is an...", options: ["Architect", "Engineer", "Doctor", "Artist"], correct_index: 0, explanation: "Architect là kiến trúc sư thiết kế nhà cửa bản vẽ." },
      { question: "What is the 'salary'?", options: ["Tiền lương hàng tháng", "Thuế", "Nơi làm việc", "Hợp đồng"], correct_index: 0, explanation: "Salary là tiền lương cố định hàng tháng." },
      { question: "What does 'working from home' mean?", options: ["Làm việc tại nhà qua mạng", "Làm việc ngoài đồng", "Thất nghiệp", "Làm việc ở văn phòng"], correct_index: 0, explanation: "Working from home (WFH) là làm việc từ xa tại nhà." },
      { question: "Complete: 'When I was five, I ______ speak English fluently.'", options: ["can", "could", "should", "must"], correct_index: 1, explanation: "'When I was five' chỉ quá khứ nên dùng khả năng 'could'." },
      { question: "What is a 'four-day work week'?", options: ["Tuần làm việc 4 ngày nghỉ 3 ngày", "Chế độ làm việc không lương", "Chỉ làm nửa ngày", "Làm cả cuối tuần"], correct_index: 0, explanation: "Four-day work week là chế độ làm việc 4 ngày một tuần để tăng thời gian nghỉ ngơi." },
      { question: "Which job is responsible for curing sick animals?", options: ["Dentist", "Veterinarian (Vet)", "Nurse", "Chef"], correct_index: 1, explanation: "Veterinarian (Vet) là bác sĩ thú y chữa bệnh cho động vật." },
      { question: "What is 'part-time job'?", options: ["Công việc bán thời gian làm vài tiếng", "Công việc toàn thời gian 8 tiếng", "Việc làm không lương", "Kỳ nghỉ phép"], correct_index: 0, explanation: "Part-time job là công việc làm bán thời gian." },
      { question: "What does 'application form' mean?", options: ["Đơn xin việc", "Hợp đồng lao động", "Sơ yếu lý lịch", "Thư giới thiệu"], correct_index: 0, explanation: "Application form là mẫu đơn đăng ký xin việc." },
      { question: "Complete: 'Every candidate ______ send their CV before the interview.'", options: ["should", "could", "can", "might"], correct_index: 0, explanation: "Nên gửi CV trước buổi phỏng vấn (lời khuyên chuẩn nên dùng should)." }
    ],
    8: [
      { question: "What is 'insomnia'?", options: ["Chứng mất ngủ kéo dài", "Bệnh cảm cúm", "Sự đau đầu", "Sự thèm ăn"], correct_index: 0, explanation: "Insomnia là chứng mất ngủ, khó ngủ." },
      { question: "Which is a 'healthy lifestyle'?", options: ["Ăn đồ ăn nhanh và thức khuya", "Tập thể dục đều đặn và ăn rau xanh", "Ngồi một chỗ cả ngày", "Hút thuốc lá"], correct_index: 1, explanation: "Tập thể thao và ăn uống cân đối cấu thành lối sống lành mạnh." },
      { question: "Complete: 'You ______ drink more water instead of sugary sodas.'", options: ["should", "shouldn't", "couldn't", "won't"], correct_index: 0, explanation: "Should (nên) khuyên uống nhiều nước lọc hơn." },
      { question: "What does 'stressful' mean?", options: ["Căng thẳng mệt mỏi áp lực", "Vui vẻ", "Nhàn hạ", "Dễ dàng"], correct_index: 0, explanation: "Stressful nghĩa là đầy áp lực căng thẳng." },
      { question: "Which is NOT a recommendation for good sleep?", options: ["Avoid caffeine before bed", "Turn off smart screens", "Drink a coffee at 9 PM", "Keep the bedroom cool"], correct_index: 2, explanation: "Uống cà phê lúc 9h tối sẽ gây khó ngủ do chứa caffeine." },
      { question: "What is 'mental health'?", options: ["Sức khỏe tinh thần", "Sức khỏe thể chất", "Bệnh viện", "Thuốc bổ"], correct_index: 0, explanation: "Mental health là sức khỏe tâm thần, tinh thần." },
      { question: "What is the meaning of 'exercising'?", options: ["Tập thể dục", "Ăn kiêng", "Ngủ nướng", "Xem phim"], correct_index: 0, explanation: "Exercising là hoạt động tập luyện thể dục thể thao." },
      { question: "What does 'nutritionist' mean?", options: ["Chuyên gia dinh dưỡng", "Bác sĩ phẫu thuật", "Dược sĩ", "Y tá"], correct_index: 0, explanation: "Nutritionist là chuyên gia tư vấn chế độ ăn uống dinh dưỡng." },
      { question: "Complete: 'If you have a high fever, you ______ go to see a doctor.'", options: ["had better", "shouldn't", "couldn't", "won't"], correct_index: 0, explanation: "Had better (nên/tốt hơn hết) khuyên đi khám bác sĩ khẩn cấp." },
      { question: "What is 'symptom' in Vietnamese?", options: ["Triệu chứng bệnh", "Đơn thuốc", "Bệnh viện", "Vắc-xin"], correct_index: 0, explanation: "Symptom nghĩa là triệu chứng của căn bệnh." },
      { question: "Which activity helps to relax the mind?", options: ["Meditation/Yoga", "Playing violent video games", "Drinking energy drinks", "Staying up late to study"], correct_index: 0, explanation: "Thiền (Meditation) hoặc Yoga giúp tâm trí thư giãn sâu." },
      { question: "What is 'physical health'?", options: ["Sức khỏe thể chất", "Sức khỏe tinh thần", "Chế độ ăn", "Cơ bắp"], correct_index: 0, explanation: "Physical health là sức khỏe của cơ thể vật lý, thể chất." },
      { question: "Complete: 'We ______ eat too much fast food because it is bad for our heart.'", options: ["shouldn't", "should", "could", "ought to"], correct_index: 0, explanation: "Shouldn't (không nên) ăn nhiều đồ ăn nhanh vì có hại cho tim mạch." },
      { question: "What does 'balanced diet' mean?", options: ["Chế độ ăn uống cân bằng đủ chất", "Chế độ ăn kiêng hoàn toàn", "Chỉ ăn thịt", "Chỉ uống nước lọc"], correct_index: 0, explanation: "Balanced diet là chế độ ăn uống cân đối, đủ nhóm dưỡng chất." },
      { question: "If someone is 'stressed out', they need to...", options: ["Take a rest and relax", "Work harder", "Drink caffeine", "Sleep less"], correct_index: 0, explanation: "Khi bị căng thẳng quá mức, cần nghỉ ngơi và thư giãn giải tỏa." }
    ],
    9: [
      { question: "What does 'bilingual' mean?", options: ["Nói trôi chảy 2 ngôn ngữ", "Chỉ nói 1 ngôn ngữ", "Nói 5 ngôn ngữ", "Không nói được tiếng Anh"], correct_index: 0, explanation: "Bilingual nghĩa là song ngữ (nói được 2 ngôn ngữ trôi chảy)." },
      { question: "What is the meaning of 'fluent'?", options: ["Trôi chảy, lưu loát", "Nói chậm và vấp", "Không biết nói", "Ngọng nghịu"], correct_index: 0, explanation: "Fluent nghĩa là nói hoặc viết ngôn ngữ cực kỳ lưu loát trôi chảy." },
      { question: "Complete the grammar form of be going to: 'I ______ study English tonight.'", options: ["am going to", "is going to", "are going to", "will going to"], correct_index: 0, explanation: "Chủ ngữ I đi với am: 'I am going to'." },
      { question: "Complete: 'Look at those dark clouds! It ______ rain.'", options: ["is going to", "will", "going to", "are going to"], correct_index: 0, explanation: "Có bằng chứng rõ ràng (mây đen) nên dùng tương lai gần 'is going to' dự đoán." },
      { question: "What does 'vocabulary' mean?", options: ["Từ vựng", "Ngữ pháp", "Phát âm", "Bảng chữ cái"], correct_index: 0, explanation: "Vocabulary là từ vựng trong ngôn ngữ." },
      { question: "A 'bilingual brain' is proved to be...", options: ["More active and flexible", "Slower than monolingual", "Smaller", "Bad at math"], correct_index: 0, explanation: "Não bộ song ngữ linh hoạt và hoạt động nhạy bén hơn." },
      { question: "What is 'slang'?", options: ["Từ lóng, ngôn ngữ thân mật hàng ngày", "Từ điển", "Tiếng Anh học thuật", "Ngữ pháp nâng cao"], correct_index: 0, explanation: "Slang là từ lóng được dùng phổ biến trong giao tiếp bình dân thường nhật." },
      { question: "Where do you look up the meaning of new words?", options: ["Dictionary", "Comic book", "Calculator", "Calendar"], correct_index: 0, explanation: "Dictionary (từ điển) dùng để tra cứu nghĩa của từ." },
      { question: "What does 'pronunciation' mean?", options: ["Sự phát âm", "Sự viết chính tả", "Ý nghĩa của từ", "Cấu trúc câu"], correct_index: 0, explanation: "Pronunciation là cách hoặc sự phát âm từ ngữ." },
      { question: "Which is a way to practice English speaking?", options: ["Shadowing and talking with peers", "Reading silently", "Doing grammar drills only", "Sleeping early"], correct_index: 0, explanation: "Nói đuổi (shadowing) và giao tiếp với bạn bè là cách luyện nói tuyệt vời." },
      { question: "Complete: 'They ______ move to Canada next month because they got their visas.'", options: ["are going to", "is going to", "am going to", "will to"], correct_index: 0, explanation: "Chủ ngữ They đi với 'are going to' để nói về kế hoạch chắc chắn." },
      { question: "What does 'native speaker' mean?", options: ["Người bản xứ nói tiếng mẹ đẻ", "Người học ngoại ngữ", "Giáo viên", "Học sinh tiểu học"], correct_index: 0, explanation: "Native speaker là người bản xứ sử dụng ngôn ngữ mẹ đẻ từ nhỏ." },
      { question: "What is 'academic English'?", options: ["Tiếng Anh học thuật dùng trong nghiên cứu/thi cử", "Tiếng Anh giao tiếp vỉa hè", "Từ lóng", "Ký hiệu tay"], correct_index: 0, explanation: "Academic English là tiếng Anh học thuật hàn lâm." },
      { question: "What does 'monolingual' mean?", options: ["Chỉ nói được 1 ngôn ngữ duy nhất", "Nói 2 thứ tiếng", "Nói 3 thứ tiếng", "Không nói ngôn ngữ nào"], correct_index: 0, explanation: "Mono nghĩa là đơn/một, monolingual là người đơn ngữ." },
      { question: "Complete: 'What ______ you going to do this weekend?'", options: ["are", "is", "am", "will"], correct_index: 0, explanation: "Cấu trúc câu hỏi: Wh-word + be (are) + you + going to + V?" }
    ],
    10: [
      { question: "What is a 'gadget'?", options: ["Thiết bị công nghệ nhỏ tiện ích", "Đồ gỗ gia dụng", "Quần áo thời trang", "Phương tiện công cộng"], correct_index: 0, explanation: "Gadget là các món đồ công nghệ nhỏ, thông minh." },
      { question: "What does 'artificial intelligence (AI)' mean?", options: ["Trí tuệ nhân tạo", "Trí khôn tự nhiên", "Mạng xã hội", "Robot hút bụi"], correct_index: 0, explanation: "Artificial intelligence (AI) là trí tuệ nhân tạo." },
      { question: "Complete with future prediction: 'I think robot chefs ______ replace human chefs soon.'", options: ["will", "won't", "are going to", "goes to"], correct_index: 0, explanation: "Dự đoán cá nhân (I think) trong tương lai dùng 'will'." },
      { question: "What does 'dependent on phones' mean?", options: ["Bị phụ thuộc/nghiện điện thoại", "Không dùng điện thoại", "Bán điện thoại", "Sửa điện thoại"], correct_index: 0, explanation: "Dependent on phones nghĩa là bị phụ thuộc hoặc nghiện sử dụng điện thoại." },
      { question: "What is 'social media'?", options: ["Mạng xã hội (Facebook, TikTok...)", "Đài truyền hình", "Báo giấy", "Sách giáo khoa"], correct_index: 0, explanation: "Social media là mạng xã hội trực tuyến." },
      { question: "Which describes a home with connected smart gadgets?", options: ["Smart home", "Old cottage", "Greenhouse", "Castle"], correct_index: 0, explanation: "Smart home là ngôi nhà thông minh được tự động hóa bằng công nghệ." },
      { question: "What is the opposite of 'will' in predictions?", options: ["won't (will not)", "shouldn't", "can't", "couldn't"], correct_index: 0, explanation: "Won't là dạng phủ định của will." },
      { question: "What does 'automated' mean?", options: ["Được tự động hóa hoàn toàn", "Phải làm bằng tay", "Rất đắt", "Bị hỏng"], correct_index: 0, explanation: "Automated nghĩa là tự động vận hành không cần con người." },
      { question: "A very small computer that you wear on your wrist is a...", options: ["Smartwatch", "Laptop", "Desktop", "Television"], correct_index: 0, explanation: "Smartwatch là đồng hồ thông minh đeo trên cổ tay." },
      { question: "What does 'virtual reality (VR)' mean?", options: ["Thực tế ảo", "Thế giới thực", "Màn hình tivi", "Kính cận thị"], correct_index: 0, explanation: "Virtual reality (VR) là công nghệ thực tế ảo." },
      { question: "Complete: 'In 2050, petrol cars ______ exist anymore. Everyone will use electric cars.'", options: ["won't", "will", "should", "can"], correct_index: 0, explanation: "Dự đoán phủ định trong tương lai: 'won't exist' (sẽ không tồn tại)." },
      { question: "What is a 'smartphone'?", options: ["Điện thoại di động thông minh", "Máy tính bàn", "Đồng hồ cát", "Đài radio cổ"], correct_index: 0, explanation: "Smartphone là điện thoại thông minh kết nối internet." },
      { question: "What does 'cybersecurity' mean?", options: ["An ninh mạng, bảo mật thông tin", "Mạng xã hội", "Bộ nhớ máy tính", "Dịch vụ sửa chữa phần mềm"], correct_index: 0, explanation: "Cybersecurity là ngành an ninh mạng hoặc bảo mật thông tin." },
      { question: "Which device is portable and has a touch screen larger than a phone?", options: ["Tablet (máy tính bảng)", "Desktop", "Smart speaker", "Fridge"], correct_index: 0, explanation: "Tablet (máy tính bảng) to hơn điện thoại và có màn hình cảm ứng di động." },
      { question: "Complete: 'I am sure technology ______ make our life much easier in the future.'", options: ["will", "won't", "is going to", "goes to"], correct_index: 0, explanation: "Dự đoán chắc chắn trong tương lai dùng 'will'." }
    ]
  };

  const rawQuestions = questionsData[normalizedUnit] || questionsData[1];
  
  return rawQuestions.map((q, idx) => ({
    id: `${quizId}-fallback-${idx}`,
    quiz_id: quizId,
    question: q.question,
    options: q.options,
    correct_index: q.correct_index,
    order_index: idx,
    explanation: q.explanation
  }));
}

// 3. Static database of all key vocabulary across the 10 IELTS units for spaced retrieval
export interface IELTSVocabularyWord {
  unit: number;
  word: string;
  meaning: string;
  pronunciation: string;
}

export const ieltsVocabularyDB: IELTSVocabularyWord[] = [
  // Unit 1
  { unit: 1, word: "routine", meaning: "thói quen hàng ngày, trình tự làm việc cố định", pronunciation: "/ruːˈtiːn/" },
  { unit: 1, word: "prepare", meaning: "chuẩn bị, sửa soạn", pronunciation: "/prɪˈpeə(r)/" },
  { unit: 1, word: "gardening", meaning: "việc làm vườn, chăm sóc cây", pronunciation: "/ˈɡɑːdnɪŋ/" },
  { unit: 1, word: "handcrafts", meaning: "đồ thủ công tự tay làm", pronunciation: "/ˈhændɪkrɑːfts/" },
  { unit: 1, word: "delicious", meaning: "ngon miệng, có hương vị tuyệt vời", pronunciation: "/dɪˈlɪʃəs/" },
  // Unit 2
  { unit: 2, word: "apartment", meaning: "căn hộ chung cư", pronunciation: "/əˈpɑːtmənt/" },
  { unit: 2, word: "comfortable", meaning: "thoải mái, tiện nghi", pronunciation: "/ˈkʌmftəbl/" },
  { unit: 2, word: "wardrobe", meaning: "tủ quần áo", pronunciation: "/ˈwɔːdrəʊb/" },
  { unit: 2, word: "balcony", meaning: "ban công hiên nhà", pronunciation: "/ˈbælkəni/" },
  { unit: 2, word: "garage", meaning: "nhà để xe ô tô", pronunciation: "/ˈɡærɑːʒ/" },
  // Unit 3
  { unit: 3, word: "photography", meaning: "nhiếp ảnh, nghệ thuật chụp ảnh", pronunciation: "/fəˈtɒɡrəfi/" },
  { unit: 3, word: "adventure", meaning: "cuộc phiêu lưu mạo hiểm thú vị", pronunciation: "/ədˈventʃə(r)/" },
  { unit: 3, word: "competitive", meaning: "mang tính cạnh tranh, ganh đua", pronunciation: "/kəmˈpetətɪv/" },
  { unit: 3, word: "hobby", meaning: "sở thích lúc rảnh rỗi", pronunciation: "/ˈhɒbi/" },
  { unit: 3, word: "leisure center", meaning: "trung tâm thể dục thể thao giải trí", pronunciation: "/ˈleʒə ˈsentə(r)/" },
  // Unit 4
  { unit: 4, word: "destination", meaning: "điểm đến của chuyến đi", pronunciation: "/ˌdestɪˈneɪʃn/" },
  { unit: 4, word: "itinerary", meaning: "lịch trình chi tiết của chuyến du lịch", pronunciation: "/aɪˈtɪnərəri/" },
  { unit: 4, word: "suitcase", meaning: "vali đựng quần áo đồ đạc", pronunciation: "/ˈsuːtkeɪs/" },
  { unit: 4, word: "ecotourism", meaning: "du lịch sinh thái bảo vệ môi trường", pronunciation: "/ˈiːkəʊtʊərɪzəm/" },
  { unit: 4, word: "sightseeing", meaning: "đi tham quan, ngắm cảnh đẹp", pronunciation: "/ˈsaɪtsiːɪŋ/" },
  // Unit 5
  { unit: 5, word: "ingredients", meaning: "các nguyên liệu nấu ăn", pronunciation: "/ɪnˈɡriːdiənts/" },
  { unit: 5, word: "recipe", meaning: "công thức hướng dẫn nấu ăn", pronunciation: "/ˈresəpi/" },
  { unit: 5, word: "organic", meaning: "hữu cơ, tự nhiên sạch", pronunciation: "/ɔːˈɡænɪk/" },
  { unit: 5, word: "homemade", meaning: "nhà làm, tự làm tại nhà", pronunciation: "/ˌhəʊmˈmeɪd/" },
  { unit: 5, word: "nutritious", meaning: "bổ dưỡng, giàu chất dinh dưỡng", pronunciation: "/njuˈtrɪʃəs/" },
  // Unit 6
  { unit: 6, word: "commute", meaning: "hành trình di chuyển đi làm/đi học hàng ngày", pronunciation: "/kəˈmjuːt/" },
  { unit: 6, word: "rush hour", meaning: "giờ cao điểm kẹt xe", pronunciation: "/rʌʃ ˈaʊə(r)/" },
  { unit: 6, word: "traffic jam", meaning: "sự kẹt xe, ùn tắc giao thông", pronunciation: "/ˈtræfɪk dʒæm/" },
  { unit: 6, word: "environmentally friendly", meaning: "thân thiện với môi trường, không độc hại", pronunciation: "/ɪnˌvaɪrənˈmentəli ˈfrendli/" },
  // Unit 7
  { unit: 7, word: "automation", meaning: "sự tự động hóa bằng máy móc", pronunciation: "/ˌɔːtəˈmeɪʃn/" },
  { unit: 7, word: "colleagues", meaning: "đồng nghiệp cùng cơ quan", pronunciation: "/ˈkɒliːɡz/" },
  { unit: 7, word: "qualifications", meaning: "bằng cấp, chứng chỉ chuyên môn", pronunciation: "/ˌkwɒlɪfɪˈkeɪʃnz/" },
  { unit: 7, word: "working from home", meaning: "làm việc từ xa tại nhà qua mạng", pronunciation: "/ˈwɜːkɪŋ frɒm həʊm/" },
  // Unit 8
  { unit: 8, word: "insomnia", meaning: "chứng mất ngủ kéo dài", pronunciation: "/ɪnˈsɒmniə/" },
  { unit: 8, word: "strain", meaning: "sự căng thẳng, mệt mỏi cơ hoặc mắt", pronunciation: "/streɪn/" },
  { unit: 8, word: "recommendation", meaning: "khuyến nghị, lời khuyên của chuyên gia", pronunciation: "/ˌrekəmenˈdeɪʃn/" },
  { unit: 8, word: "balanced diet", meaning: "chế độ ăn uống cân đối đủ chất", pronunciation: "/ˈbælənst ˈdaɪət/" },
  // Unit 9
  { unit: 9, word: "bilingual", meaning: "song ngữ, nói được 2 thứ tiếng lưu loát", pronunciation: "/ˌbaɪˈlɪŋɡwəl/" },
  { unit: 9, word: "fluently", meaning: "một cách trôi chảy, lưu loát", pronunciation: "/ˈfluːəntli/" },
  { unit: 9, word: "opportunities", meaning: "các cơ hội, thời cơ tốt trong cuộc sống", pronunciation: "/ˌɒpəˈtjuːnətiz/" },
  { unit: 9, word: "native speaker", meaning: "người bản xứ nói tiếng mẹ đẻ", pronunciation: "/ˈneɪtɪv ˈspiːkə(r)/" },
  // Unit 10
  { unit: 10, word: "gadget", meaning: "thiết bị công nghệ nhỏ tiện ích", pronunciation: "/ˈɡædʒɪt/" },
  { unit: 10, word: "automatically", meaning: "một cách tự động bằng máy", pronunciation: "/ˌɔːtəˈmætɪkli/" },
  { unit: 10, word: "predict", meaning: "dự đoán, dự báo trước tương lai", pronunciation: "/prɪˈdɪkt/" },
  { unit: 10, word: "artificial intelligence", meaning: "trí tuệ nhân tạo (AI)", pronunciation: "/ˌɑːtɪˈfɪʃl ɪnˈtelɪdʒəns/" }
];

// Helper to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * 4. Generate Cumulative Spaced Retrieval Vocabulary Quiz for Warmup
 * Pulls words from Unit 1 to (unitNumber - 1). If unitNumber is 1, pulls from Unit 1.
 */
export function getCumulativeVocabularyQuiz(unitNumber: number, quizId: string, count: number = 10): QuizQuestion[] {
  const currentUnit = Math.max(1, Math.min(10, unitNumber));
  
  // Filter vocabulary: if unit > 1, get words from unit 1 to unit - 1. Otherwise, get words from unit 1.
  let pool = ieltsVocabularyDB.filter(w => currentUnit > 1 ? w.unit < currentUnit : w.unit === 1);
  if (pool.length === 0) pool = ieltsVocabularyDB; // Fallback

  const selectedWords = shuffleArray(pool).slice(0, count);
  const allMeanings = ieltsVocabularyDB.map(w => w.meaning);

  return selectedWords.map((vocab, index) => {
    // Collect distractors: 3 other random meanings
    const correctMeaning = vocab.meaning;
    const distinctOtherMeanings = shuffleArray(allMeanings.filter(m => m !== correctMeaning)).slice(0, 3);
    
    // Combine and shuffle options
    const options = shuffleArray([correctMeaning, ...distinctOtherMeanings]);
    const correct_index = options.indexOf(correctMeaning);

    return {
      id: `${quizId}-vocab-${vocab.word}-${index}`,
      quiz_id: quizId,
      question: `Từ vựng "${vocab.word}" (${vocab.pronunciation}) mang ý nghĩa nào sau đây?`,
      options,
      correct_index,
      order_index: index,
      explanation: `Từ vựng "${vocab.word}" có phát âm là ${vocab.pronunciation}, mang ý nghĩa: "${vocab.meaning}". (Unit ${vocab.unit})`
    };
  });
}

/**
 * 5. Generate Cumulative Spaced-Retrieval Questions for Unit
 * Combines 15 questions from the current unit and 5 questions from previous units (if applicable).
 */
export function getCumulativeQuestionsForUnit(unitNumber: number, quizId: string, totalCount: number = 20): QuizQuestion[] {
  const currentUnit = Math.max(1, Math.min(10, unitNumber));
  
  // 1. Get fallback questions for current unit (usually 15 questions)
  const currentUnitQuestions = getFallbackQuestionsForUnit(currentUnit, quizId);
  
  if (currentUnit === 1) {
    // If unit 1, we can't accumulate from past units, so we return the first 20 questions or padding from Unit 1 fallback
    return currentUnitQuestions.slice(0, totalCount);
  }

  // 2. Collect past unit questions as pool
  const pastUnitsQuestions: QuizQuestion[] = [];
  for (let u = 1; u < currentUnit; u++) {
    pastUnitsQuestions.push(...getFallbackQuestionsForUnit(u, quizId));
  }

  // 3. Shuffle past questions and pick 5 questions (or totalCount - currentUnitCount)
  const accumulatedCount = Math.max(2, totalCount - currentUnitQuestions.length);
  const selectedPastQuestions = shuffleArray(pastUnitsQuestions).slice(0, accumulatedCount);

  // 4. Combine current questions and selected past questions
  const finalQuestions = [...currentUnitQuestions, ...selectedPastQuestions];
  
  // Re-index order
  return finalQuestions.map((q, idx) => ({
    ...q,
    id: `${quizId}-cumulative-${idx}`,
    order_index: idx
  }));
}

