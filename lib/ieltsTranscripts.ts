export interface TranscriptLine {
  english: string;
  vietnamese: string;
  time?: string;
  keyPhrase?: string;
  phraseNote?: string;
}

export interface IELTSTranscript {
  title: string;
  unitTitle: string;
  description: string;
  keyVocabulary: { word: string; meaning: string; pronunciation: string }[];
  lines: TranscriptLine[];
}

export const ieltsTranscripts: Record<string, IELTSTranscript> = {
  "2r7kEF70Afs": {
    title: "Jack's Family & Hobbies",
    unitTitle: "Unit 1: Daily Life (Listening & Writing)",
    description: "Lắng nghe Jack kể cho Carlos nghe về các thành viên trong gia đình và những sở thích, kỹ năng đặc biệt của họ.",
    keyVocabulary: [
      { word: "building", meaning: "việc xây dựng, lắp ráp", pronunciation: "/ˈbɪldɪŋ/" },
      { word: "talented", meaning: "có tài năng, năng khiếu", pronunciation: "/ˈtæləntɪd/" },
      { word: "gardening", meaning: "việc làm vườn", pronunciation: "/ˈɡɑːdnɪŋ/" }
    ],
    lines: [
      { 
        english: "I'm really excited about my trip to Australia. Tell me about your family, Jack.", 
        vietnamese: "Mình rất hào hứng với chuyến đi Úc. Hãy kể cho mình nghe về gia đình bạn đi, Jack.",
        keyPhrase: "really excited about",
        phraseNote: "Rất hào hứng về điều gì đó"
      },
      { 
        english: "Well, my brother is great at building things. He's always fixing stuff and even made some of our furniture.", 
        vietnamese: "À, anh trai mình rất giỏi xây dựng. Anh ấy luôn sửa đồ đạc và thậm chí còn tự đóng một số đồ nội thất trong nhà.",
        keyPhrase: "great at building",
        phraseNote: "Giỏi làm việc gì đó (V-ing)"
      },
      { 
        english: "That's cool! And your grandma?", 
        vietnamese: "Tuyệt quá! Còn bà của bạn thì sao?",
        keyPhrase: "That's cool",
        phraseNote: "Cách khen ngợi tự nhiên"
      },
      { 
        english: "She's an amazing cook. She makes all our meals, and the food is always delicious.", 
        vietnamese: "Bà là một đầu bếp tuyệt vời. Bà nấu tất cả các bữa ăn cho cả nhà, và đồ ăn luôn rất ngon.",
        keyPhrase: "amazing cook",
        phraseNote: "Đầu bếp tuyệt vời"
      },
      { 
        english: "What about your parents? What do they like doing?", 
        vietnamese: "Còn bố mẹ bạn thì sao? Họ thích làm gì?",
        keyPhrase: "What about",
        phraseNote: "Cách hỏi gợi ý tiếp nối hội thoại"
      },
      { 
        english: "My mom loves gardening; she's always planting flowers. My dad is a bit lazy, he prefers staying at home and reading.", 
        vietnamese: "Mẹ mình thích làm vườn; bà luôn trồng hoa. Còn bố mình thì hơi lười một chút, ông ấy thích ở nhà và đọc sách hơn.",
        keyPhrase: "prefers staying",
        phraseNote: "Thích làm gì đó hơn (Prefer + V-ing)"
      }
    ]
  },
  "RCuvLzqdBZ8": {
    title: "Giorgio's Flat Description",
    unitTitle: "Unit 2: House and Home (Listening & Reading)",
    description: "Lắng nghe Giorgio mô tả căn hộ ấm cúng của anh ấy ở Ý, cấu trúc ban công, trần nhà và cách sắp xếp nội thất phòng khách.",
    keyVocabulary: [
      { word: "apartment/flat", meaning: "căn hộ chung cư", pronunciation: "/əˈpɑːtmənt/ /flæt/" },
      { word: "balcony", meaning: "ban công", pronunciation: "/ˈbælkəni/" },
      { word: "ceiling", meaning: "trần nhà", pronunciation: "/ˈsiːlɪŋ/" }
    ],
    lines: [
      { 
        english: "Hi guys, I'm Giorgio from Milan. I want to share a description of my current flat with you.", 
        vietnamese: "Chào các bạn, tôi là Giorgio đến từ Milan. Tôi muốn chia sẻ mô tả về căn hộ hiện tại của mình với các bạn.",
        keyPhrase: "share a description",
        phraseNote: "Chia sẻ một bản mô tả"
      },
      { 
        english: "My apartment has a small but beautiful balcony where I enjoy drinking coffee in the morning.", 
        vietnamese: "Căn hộ của tôi có một ban công nhỏ nhưng xinh xắn, nơi tôi thích thưởng thức cà phê vào buổi sáng.",
        keyPhrase: "enjoy drinking",
        phraseNote: "Thưởng thức việc làm gì đó (Enjoy + V-ing)"
      },
      { 
        english: "In the living room, there is a large cozy sofa right next to the window, offering lots of sunlight.", 
        vietnamese: "Trong phòng khách, có một chiếc ghế sofa lớn ấm cúng đặt cạnh cửa sổ, đón nhận rất nhiều ánh nắng.",
        keyPhrase: "right next to",
        phraseNote: "Ngay bên cạnh (vị trí chính xác)"
      },
      { 
        english: "The ceiling is quite high, which makes the rooms feel much bigger and brighter than they are.", 
        vietnamese: "Trần nhà khá cao, điều này giúp các căn phòng có cảm giác rộng rãi và sáng sủa hơn nhiều so với thực tế.",
        keyPhrase: "feel much bigger",
        phraseNote: "Cảm giác rộng hơn nhiều (So sánh hơn)"
      },
      { 
        english: "It is located in a quiet street, and it has a garage underneath the building to park my car.", 
        vietnamese: "Căn hộ nằm trên một con phố yên tĩnh và có một ga-ra ở bên dưới tòa nhà để đỗ xe ô tô của tôi.",
        keyPhrase: "located in",
        phraseNote: "Nằm tại/Tọa lạc tại"
      }
    ]
  },
  "LRPNZf_5j-I": {
    title: "Smart Homes & Prepositions of Place",
    unitTitle: "Unit 2: House and Home (Grammar & Listening)",
    description: "Cuộc hội thoại giữa nhân viên tư vấn bất động sản và khách hàng về việc thuê một ngôi nhà thông minh tiện nghi.",
    keyVocabulary: [
      { word: "smart home", meaning: "ngôi nhà thông minh", pronunciation: "/smɑːt həʊm/" },
      { word: "next to", meaning: "bên cạnh, sát bên", pronunciation: "/nekst tuː/" },
      { word: "underneath", meaning: "bên dưới, dưới lòng", pronunciation: "/ˌʌndəˈniːθ/" }
    ],
    lines: [
      { 
        english: "Welcome back! Today we are discussing modern accommodation: smart homes.", 
        vietnamese: "Chào mừng trở lại! Hôm nay chúng ta cùng thảo luận về chỗ ở hiện đại: những ngôi nhà thông minh.",
        keyPhrase: "discussing modern accommodation",
        phraseNote: "Thảo luận về chỗ ở hiện đại"
      },
      { 
        english: "A smart home has appliances that are controlled automatically using internet technology.", 
        vietnamese: "Một ngôi nhà thông minh có các thiết bị gia dụng được điều khiển tự động thông qua công nghệ internet.",
        keyPhrase: "controlled automatically",
        phraseNote: "Được điều khiển tự động"
      },
      { 
        english: "For example, the smart lights are located on the ceiling and turn on when you walk in.", 
        vietnamese: "Ví dụ, những chiếc đèn thông minh được lắp đặt trên trần nhà và sẽ tự động bật khi bạn bước vào.",
        keyPhrase: "turn on when",
        phraseNote: "Tự động bật khi (mệnh đề thời gian)"
      },
      { 
        english: "The control tablet is usually on the wall right next to the dining room table.", 
        vietnamese: "Máy tính bảng điều khiển thường nằm trên tường, ngay bên cạnh bàn phòng ăn.",
        keyPhrase: "on the wall",
        phraseNote: "Trên tường (Giới từ 'on')"
      },
      { 
        english: "It is extremely efficient and makes living in modern houses much easier and safer.", 
        vietnamese: "Nó vô cùng hiệu quả và giúp cuộc sống trong các ngôi nhà hiện đại trở nên dễ dàng và an toàn hơn nhiều.",
        keyPhrase: "easier and safer",
        phraseNote: "Dễ dàng và an toàn hơn"
      }
    ]
  },
  "gzoYfpWvh7Q": {
    title: "Extreme Sports & Adventure Hobbies",
    unitTitle: "Unit 3: Hobbies (Vocabulary & Listening)",
    description: "Khám phá từ vựng và bài nghe về sở thích phiêu lưu mạo hiểm, chơi thể thao cảm giác mạnh tại trung tâm giải trí.",
    keyVocabulary: [
      { word: "extreme sports", meaning: "thể thao mạo hiểm cảm giác mạnh", pronunciation: "/ɪkˈstriːm spɔːts/" },
      { word: "leisure center", meaning: "trung tâm thể thao giải trí", pronunciation: "/ˈleʒə ˌsentə/" },
      { word: "competitive", meaning: "mang tính cạnh tranh", pronunciation: "/kəmˈpetətɪv/" }
    ],
    lines: [
      { 
        english: "Some people prefer relaxing hobbies like photography, but others love extreme sports.", 
        vietnamese: "Một số người thích các sở thích thư giãn như nhiếp ảnh, nhưng những người khác lại đam mê thể thao mạo hiểm.",
        keyPhrase: "prefer relaxing hobbies",
        phraseNote: "Thích các sở thích thư giãn hơn"
      },
      { 
        english: "Activities such as rock climbing and skydiving are popular examples of adventure hobbies.", 
        vietnamese: "Các hoạt động như leo núi và nhảy dù là những ví dụ phổ biến của các sở thích phiêu lưu.",
        keyPhrase: "popular examples of",
        phraseNote: "Các ví dụ phổ biến của..."
      },
      { 
        english: "These sports require intense training, and people often practice them at the local leisure center.", 
        vietnamese: "Những môn thể thao này đòi hỏi phải luyện tập cường độ cao và mọi người thường tập ở trung tâm thể thao địa phương.",
        keyPhrase: "require intense training",
        phraseNote: "Yêu cầu luyện tập cường độ cao"
      },
      { 
        english: "It is a highly competitive environment, but it gives you an amazing rush of adrenaline.", 
        vietnamese: "Đó là một môi trường cạnh tranh rất cao, nhưng nó mang lại cho bạn cảm giác hưng phấn adrenaline tuyệt vời.",
        keyPhrase: "rush of adrenaline",
        phraseNote: "Sự phấn khích tột độ (adrenaline)"
      },
      { 
        english: "Remember to always wear safety equipment to avoid injuries during practice.", 
        vietnamese: "Hãy nhớ luôn đeo thiết bị bảo hộ an toàn để tránh chấn thương trong quá trình luyện tập.",
        keyPhrase: "avoid injuries",
        phraseNote: "Tránh các chấn thương"
      }
    ]
  },
  "rkOatFNUGt4": {
    title: "Anna's Ecotourism Holiday",
    unitTitle: "Unit 4: Travel (Listening & Speaking)",
    description: "Anna nói về chuyến du lịch sinh thái gần đây của cô ấy, hành trình chuyến đi và trải nghiệm lưu trú bảo vệ môi trường.",
    keyVocabulary: [
      { word: "ecotourism", meaning: "du lịch sinh thái", pronunciation: "/ˈiːkəʊˌtʊərɪzəm/" },
      { word: "itinerary", meaning: "lịch trình chuyến đi", pronunciation: "/aɪˈtɪnərəri/" },
      { word: "accommodation", meaning: "chỗ ở lưu trú", pronunciation: "/əˌkɒməˈdeɪʃn/" }
    ],
    lines: [
      { 
        english: "Hello, my name is Anna. Last year, I decided to go on an ecotourism holiday in Costa Rica.", 
        vietnamese: "Xin chào, mình tên là Anna. Năm ngoái, mình quyết định đi nghỉ dưỡng theo hình thức du lịch sinh thái ở Costa Rica.",
        keyPhrase: "decided to go on",
        phraseNote: "Quyết định thực hiện chuyến đi"
      },
      { 
        english: "Our itinerary was fully planned to protect the local environment and wild animals.", 
        vietnamese: "Lịch trình của chúng mình được lên kế hoạch đầy đủ để bảo vệ môi trường địa phương và động vật hoang dã.",
        keyPhrase: "fully planned to",
        phraseNote: "Được lên kế hoạch đầy đủ để..."
      },
      { 
        english: "We stayed in a traditional green accommodation built entirely from bamboo and recycled materials.", 
        vietnamese: "Chúng mình lưu trú tại một cơ sở nghỉ dưỡng xanh truyền thống được xây dựng hoàn toàn từ tre và vật liệu tái chế.",
        keyPhrase: "built entirely from",
        phraseNote: "Được xây dựng hoàn toàn từ (Vật liệu)"
      },
      { 
        english: "It was a wonderful travel experience, and we learned how to minimize our carbon footprint.", 
        vietnamese: "Đó là một trải nghiệm du lịch tuyệt vời và chúng mình đã học được cách giảm thiểu lượng khí thải carbon.",
        keyPhrase: "minimize our carbon footprint",
        phraseNote: "Giảm thiểu dấu chân carbon (bảo vệ môi trường)"
      },
      { 
        english: "I highly recommend package holidays that focus on ecotourism and green living.", 
        vietnamese: "Mình thực sự khuyên bạn nên chọn các kỳ nghỉ trọn gói tập trung vào du lịch sinh thái và cuộc sống xanh.",
        keyPhrase: "highly recommend",
        phraseNote: "Rất khuyến khích/gợi ý"
      }
    ]
  },
  "RXLcmf5GZQ": {
    title: "Street Food Festival & Key Ingredients",
    unitTitle: "Unit 5: Food (Vocabulary & Listening)",
    description: "Bài phỏng vấn tại lễ hội ẩm thực đường phố về các nguyên liệu tươi ngon và phương pháp chiên rán độc đáo.",
    keyVocabulary: [
      { word: "ingredients", meaning: "nguyên liệu nấu ăn", pronunciation: "/ɪnˈɡriːdiənts/" },
      { word: "street food", meaning: "đồ ăn đường phố", pronunciation: "/striːt fuːd/" },
      { word: "recipe", meaning: "công thức nấu ăn", pronunciation: "/ˈresəpi/" }
    ],
    lines: [
      { 
        english: "Welcome to the Annual International Street Food Festival here in London!", 
        vietnamese: "Chào mừng đến với Lễ hội Ẩm thực Đường phố Quốc tế Thường niên tại London!",
        keyPhrase: "Annual International Festival",
        phraseNote: "Lễ hội quốc tế thường niên"
      },
      { 
        english: "Chefs from all over the world are showing off their unique recipes and culinary cultures.", 
        vietnamese: "Các đầu bếp từ khắp nơi trên thế giới đang trình diễn những công thức nấu ăn và văn hóa ẩm thực độc đáo của họ.",
        keyPhrase: "showing off",
        phraseNote: "Phô diễn/Khoe ra (Phrasal verb)"
      },
      { 
        english: "The most important thing to make delicious food is using organic and fresh ingredients.", 
        vietnamese: "Điều quan trọng nhất để làm ra món ăn ngon là sử dụng các nguyên liệu hữu cơ và tươi sạch.",
        keyPhrase: "most important thing",
        phraseNote: "Điều quan trọng nhất (Cấu trúc nhấn mạnh)"
      },
      { 
        english: "Today, we are cooking traditional spicy dumplings by deep-frying them in hot oil.", 
        vietnamese: "Hôm nay, chúng tôi đang chế biến món sủi cảo cay truyền thống bằng cách chiên ngập chúng trong dầu nóng.",
        keyPhrase: "deep-frying",
        phraseNote: "Chiên ngập dầu (Kỹ thuật nấu ăn)"
      },
      { 
        english: "Street food is not only cheap and fast, but it is also extremely tasty and popular.", 
        vietnamese: "Ẩm thực đường phố không chỉ rẻ và nhanh gọn, mà còn vô cùng ngon miệng và được ưa chuộng.",
        keyPhrase: "not only... but also",
        phraseNote: "Không chỉ... mà còn (Cấu trúc tương quan)"
      }
    ]
  },
  "WnqLsvQuwZk": {
    title: "The Process of Making Dumplings",
    unitTitle: "Unit 5: Food (Reading & Listening)",
    description: "Lắng nghe hướng dẫn từng bước chuẩn bị nhân bánh sủi cảo và cách hấp bánh chín đều thơm ngon.",
    keyVocabulary: [
      { word: "ingredients", meaning: "nguyên liệu", pronunciation: "/ɪnˈɡriːdiənts/" },
      { word: "steam", meaning: "hấp bằng hơi nước", pronunciation: "/stiːm/" },
      { word: "vegetarians", meaning: "người ăn chay", pronunciation: "/ˌvedʒəˈteəriənz/" }
    ],
    lines: [
      { 
        english: "Let's learn how to make traditional homemade dumplings from scratch.", 
        vietnamese: "Chúng ta hãy cùng học cách làm món bánh sủi cảo truyền thống tự làm tại nhà nhé.",
        keyPhrase: "from scratch",
        phraseNote: "Bắt đầu từ con số không/tự làm từ đầu"
      },
      { 
        english: "First, you need to prepare the ingredients: minced meat, cabbage, and chopped onions.", 
        vietnamese: "Đầu tiên, bạn cần chuẩn bị các nguyên liệu: thịt băm, bắp cải và hành tây thái nhỏ.",
        keyPhrase: "prepare the ingredients",
        phraseNote: "Chuẩn bị các nguyên liệu"
      },
      { 
        english: "For vegetarians, you can easily replace the pork meat with tofu and fresh mushrooms.", 
        vietnamese: "Đối với người ăn chay, bạn có thể dễ dàng thay thế thịt heo bằng đậu phụ và nấm tươi.",
        keyPhrase: "replace with",
        phraseNote: "Thay thế bằng (Giới từ 'with')"
      },
      { 
        english: "Mix everything together, wrap it in round dough sheets, and seal the edges carefully.", 
        vietnamese: "Trộn đều mọi thứ lại với nhau, bọc trong các lá bột tròn và khéo léo dán kín các mép bánh.",
        keyPhrase: "seal the edges",
        phraseNote: "Dán kín/Bịt kín các mép"
      },
      { 
        english: "Finally, steam the dumplings in a bamboo steamer for twelve minutes until fully cooked.", 
        vietnamese: "Cuối cùng, hấp sủi cảo trong xửng hấp bằng tre trong vòng 12 phút cho đến khi chín hoàn toàn.",
        keyPhrase: "until fully cooked",
        phraseNote: "Cho đến khi chín hoàn toàn"
      }
    ]
  },
  "_f8Ciy-r8bM": {
    title: "Northfields Town Map & Public Transport",
    unitTitle: "Unit 6: Transport (Listening & Grammar)",
    description: "Bài nghe định hướng sơ đồ giao thông thị trấn Northfields, so sánh giữa xe buýt và tàu điện ngầm giờ cao điểm.",
    keyVocabulary: [
      { word: "commute", meaning: "hành trình đi lại hàng ngày", pronunciation: "/kəˈmjuːt/" },
      { word: "rush hour", meaning: "giờ cao điểm tắc đường", pronunciation: "/rʌʃ ˈaʊə/" },
      { word: "metro/subway", meaning: "tàu điện ngầm", pronunciation: "/ˈmetrəʊ/ /ˈsʌbweɪ/" }
    ],
    lines: [
      { 
        english: "Please look at the map of Northfields town. I will show you how commuters travel daily.", 
        vietnamese: "Vui lòng nhìn vào bản đồ của thị trấn Northfields. Tôi sẽ chỉ cho bạn cách người đi làm di chuyển hàng ngày.",
        keyPhrase: "show you how",
        phraseNote: "Chỉ cho bạn cách mà..."
      },
      { 
        english: "The main bus stop is located in the center, directly next to the Northfields train station.", 
        vietnamese: "Trạm dừng xe buýt chính nằm ở trung tâm, ngay cạnh ga xe lửa Northfields.",
        keyPhrase: "directly next to",
        phraseNote: "Ngay sát cạnh (nhấn mạnh khoảng cách)"
      },
      { 
        english: "During the evening rush hour, traditional roads suffer from heavy congestion.", 
        vietnamese: "Trong giờ cao điểm buổi tối, các con đường truyền thống phải hứng chịu tình trạng ùn tắc giao thông nghiêm trọng.",
        keyPhrase: "suffer from",
        phraseNote: "Chịu đựng/Mắc phải (vấn đề tiêu cực)"
      },
      { 
        english: "Therefore, going by the underground metro is much faster and cheaper than taking a taxi.", 
        vietnamese: "Vì vậy, đi bằng tàu điện ngầm dưới lòng đất nhanh hơn và rẻ hơn nhiều so với việc đi taxi.",
        keyPhrase: "much faster and cheaper",
        phraseNote: "Nhanh và rẻ hơn nhiều (So sánh hơn nhấn mạnh)"
      },
      { 
        english: "It is the most efficient and environmentally friendly public transport in our town.", 
        vietnamese: "Đó là phương tiện giao thông công cộng hiệu quả và thân thiện với môi trường nhất trong thị trấn của chúng tôi.",
        keyPhrase: "environmentally friendly",
        phraseNote: "Thân thiện với môi trường"
      }
    ]
  },
  "jsjIWseiTfM": {
    title: "Jack Riley's Career & Future Automation",
    unitTitle: "Unit 7: Jobs (Vocabulary & Listening)",
    description: "Lắng nghe câu chuyện nghề nghiệp của Jack Riley, tác động của tự động hóa và sự quan trọng của kỹ năng số.",
    keyVocabulary: [
      { word: "automation", meaning: "sự tự động hóa", pronunciation: "/ˌɔːtəˈmeɪʃn/" },
      { word: "salary", meaning: "tiền lương tháng", pronunciation: "/ˈsæləri/" },
      { word: "digital skills", meaning: "kỹ năng kỹ thuật số", pronunciation: "/ˈdɪdʒɪtl skɪlz/" }
    ],
    lines: [
      { 
        english: "Welcome to our podcast! Today, we are interviewing Jack Riley about his professional career.", 
        vietnamese: "Chào mừng đến với podcast của chúng tôi! Hôm nay, chúng ta phỏng vấn Jack Riley về sự nghiệp chuyên nghiệp của ông ấy.",
        keyPhrase: "professional career",
        phraseNote: "Sự nghiệp chuyên nghiệp"
      },
      { 
        english: "Jack, do you think automation will completely replace human workers in the future?", 
        vietnamese: "Jack, bạn có nghĩ tự động hóa sẽ hoàn toàn thay thế công nhân con người trong tương lai không?",
        keyPhrase: "completely replace",
        phraseNote: "Thay thế hoàn toàn"
      },
      { 
        english: "Well, many simple summer jobs and manual office roles can be automated very soon.", 
        vietnamese: "Ồ, nhiều công việc mùa hè đơn giản và vai trò văn phòng thủ công có thể được tự động hóa rất sớm.",
        keyPhrase: "manual office roles",
        phraseNote: "Các vai trò văn phòng thủ công"
      },
      { 
        english: "However, creative jobs that require social skills will always need human beings.", 
        vietnamese: "Tuy nhiên, các công việc sáng tạo đòi hỏi kỹ năng xã hội sẽ luôn cần đến con người.",
        keyPhrase: "require social skills",
        phraseNote: "Yêu cầu kỹ năng xã hội"
      },
      { 
        english: "Young candidates should focus on learning digital skills to get a higher starting salary.", 
        vietnamese: "Các ứng viên trẻ nên tập trung học các kỹ năng số để nhận được mức lương khởi điểm cao hơn.",
        keyPhrase: "starting salary",
        phraseNote: "Mức lương khởi điểm"
      }
    ]
  },
  "SPurU5V7pxw": {
    title: "Sleep Cycle & Insomnia Health Advice",
    unitTitle: "Unit 8: Health (Listening & Vocabulary)",
    description: "Lời khuyên bảo vệ sức khỏe từ chuyên gia dinh dưỡng về chất lượng giấc ngủ và chứng mất ngủ do dùng điện thoại.",
    keyVocabulary: [
      { word: "insomnia", meaning: "chứng mất ngủ khó ngủ", pronunciation: "/ɪnˈsɒmniə/" },
      { word: "balanced diet", meaning: "chế độ ăn uống cân đối", pronunciation: "/ˌbælənst ˈdaɪət/" },
      { word: "symptom", meaning: "triệu chứng bệnh", pronunciation: "/ˈsɪmptəm/" }
    ],
    lines: [
      { 
        english: "Good health starts with two main factors: a balanced diet and deep sleep.", 
        vietnamese: "Sức khỏe tốt bắt đầu từ hai yếu tố chính: một chế độ ăn uống cân đối và giấc ngủ sâu.",
        keyPhrase: "starts with",
        phraseNote: "Bắt đầu với (Yếu tố)"
      },
      { 
        english: "Many young adults are suffering from insomnia, which causes severe tiredness the next day.", 
        vietnamese: "Nhiều người trẻ tuổi đang mắc chứng mất ngủ, điều này gây ra sự mệt mỏi nghiêm trọng vào ngày hôm sau.",
        keyPhrase: "suffering from",
        phraseNote: "Chịu đựng/Mắc chứng bệnh (Giới từ 'from')"
      },
      { 
        english: "A common symptom is lying awake for hours looking at smart screens in bed.", 
        vietnamese: "Một triệu chứng phổ biến là nằm trằn trọc hàng giờ liền để nhìn vào màn hình điện thoại thông minh trên giường.",
        keyPhrase: "common symptom",
        phraseNote: "Triệu chứng phổ biến"
      },
      { 
        english: "You had better avoid using any gadgets or drinking caffeine after 8 PM.", 
        vietnamese: "Bạn tốt nhất nên tránh sử dụng bất kỳ thiết bị điện tử nào hoặc uống caffein sau 8 giờ tối.",
        keyPhrase: "had better avoid",
        phraseNote: "Tốt nhất là nên tránh (Lời khuyên mạnh)"
      },
      { 
        english: "Exercising regularly during the day will also help you fall asleep much faster at night.", 
        vietnamese: "Tập thể dục đều đặn trong ngày cũng sẽ giúp bạn đi vào giấc ngủ nhanh hơn nhiều vào ban đêm.",
        keyPhrase: "help you fall asleep",
        phraseNote: "Giúp bạn đi vào giấc ngủ"
      }
    ]
  },
  "mWPZhFuPkF0": {
    title: "Exercising in the Heat & Mental Health",
    unitTitle: "Unit 8: Health (Reading & Listening)",
    description: "Lắng nghe huấn luyện viên chia sẻ phương pháp tập luyện an toàn dưới thời tiết nóng bức để duy trì thể chất.",
    keyVocabulary: [
      { word: "mental health", meaning: "sức khỏe tinh thần", pronunciation: "/ˈmentl helθ/" },
      { word: "physical health", meaning: "sức khỏe thể chất", pronunciation: "/ˈfɪzɪkl helθ/" },
      { word: "hydration", meaning: "sự giữ nước, bù nước", pronunciation: "/haɪˈdreɪʃn/" }
    ],
    lines: [
      { 
        english: "Today, we are talking about exercising safely under high temperature and direct sunlight.", 
        vietnamese: "Hôm nay, chúng ta cùng nói về việc tập thể dục an toàn dưới nhiệt độ cao và ánh nắng trực tiếp.",
        keyPhrase: "exercising safely",
        phraseNote: "Tập thể dục một cách an toàn"
      },
      { 
        english: "Working out in the hot summer poses unique challenges to our physical health.", 
        vietnamese: "Tập luyện trong mùa hè nóng bức đặt ra những thách thức độc đáo cho sức khỏe thể chất của chúng ta.",
        keyPhrase: "poses unique challenges",
        phraseNote: "Đặt ra những thử thách độc đáo"
      },
      { 
        english: "To protect your body, proper hydration is absolutely vital. You must drink enough water.", 
        vietnamese: "Để bảo vệ cơ thể, việc bù nước đầy đủ là vô cùng quan trọng. Bạn phải uống đủ nước lọc.",
        keyPhrase: "absolutely vital",
        phraseNote: "Cực kỳ quan trọng/sống còn"
      },
      { 
        english: "Yoga and light stretching inside cool air-conditioned rooms are great alternatives.", 
        vietnamese: "Tập yoga và giãn cơ nhẹ nhàng trong các phòng mát mẻ có điều hòa là những lựa chọn thay thế tuyệt vời.",
        keyPhrase: "great alternatives",
        phraseNote: "Những sự lựa chọn thay thế tuyệt vời"
      },
      { 
        english: "Physical activity is closely connected to mental health, helping to relieve stress and anxiety.", 
        vietnamese: "Hoạt động thể chất có mối liên hệ chặt chẽ với sức khỏe tinh thần, giúp giải tỏa căng thẳng và lo âu.",
        keyPhrase: "relieve stress and anxiety",
        phraseNote: "Giải tỏa căng thẳng và lo âu"
      }
    ]
  },
  "wr8M6uUzHnY": {
    title: "Smartphones & The Future of Artificial Intelligence",
    unitTitle: "Unit 10: Tech (Listening & Grammar)",
    description: "Bài giảng về sự bùng nổ của thiết bị thông minh và những dự đoán thú vị về robot nấu ăn trong tương lai.",
    keyVocabulary: [
      { word: "artificial intelligence", meaning: "trí tuệ nhân tạo (AI)", pronunciation: "/ˌɑːtɪfɪʃl ɪnˈtelɪdʒəns/" },
      { word: "gadget", meaning: "thiết bị công nghệ nhỏ", pronunciation: "/ˈɡædʒɪt/" },
      { word: "predict/prediction", meaning: "dự báo, dự đoán", pronunciation: "/prɪˈdɪkt/ /prɪˈdɪkʃn/" }
    ],
    lines: [
      { 
        english: "Let's explore technology in 2050. Many things in our daily life will be different.", 
        vietnamese: "Hãy cùng khám phá công nghệ vào năm 2050. Nhiều thứ trong cuộc sống hàng ngày của chúng ta sẽ khác biệt.",
        keyPhrase: "will be different",
        phraseNote: "Sẽ khác biệt (Dự đoán tương lai)"
      },
      { 
        english: "Our homes will contain many smart gadgets connected to the internet at all times.", 
        vietnamese: "Ngôi nhà của chúng ta sẽ chứa rất nhiều thiết bị thông minh luôn được kết nối internet.",
        keyPhrase: "at all times",
        phraseNote: "Mọi lúc/luôn luôn"
      },
      { 
        english: "I predict that artificial intelligence will manage all home tasks automatically.", 
        vietnamese: "Tôi dự đoán rằng trí tuệ nhân tạo sẽ quản lý tất cả các công việc nhà một cách tự động.",
        keyPhrase: "manage home tasks",
        phraseNote: "Quản lý các công việc nhà"
      },
      { 
        english: "We won't need to cook because robot chefs will prepare gourmet meals in the kitchen.", 
        vietnamese: "Chúng ta sẽ không cần phải nấu ăn vì các đầu bếp robot sẽ chuẩn bị những bữa ăn tuyệt ngon trong nhà bếp.",
        keyPhrase: "won't need to",
        phraseNote: "Sẽ không cần phải (Phủ định tương lai)"
      },
      { 
        english: "However, we should be careful not to become too dependent on these devices.", 
        vietnamese: "Tuy nhiên, chúng ta nên cênt hận không để mình bị quá phụ thuộc vào những thiết bị này.",
        keyPhrase: "too dependent on",
        phraseNote: "Quá phụ thuộc vào (Giới từ 'on')"
      }
    ]
  },
  "ZN_why11kpc": {
    title: "Lorenzo's Phone Dependency Experience",
    unitTitle: "Unit 10: Tech (Listening & Speaking)",
    description: "Lorenzo chia sẻ về thói quen nghiện điện thoại thông minh và lời khuyên giúp cai nghiện màn hình hiệu quả.",
    keyVocabulary: [
      { word: "dependent on", meaning: "phụ thuộc vào, nghiện", pronunciation: "/dɪˈpendənt ɒn/" },
      { word: "cybersecurity", meaning: "an ninh mạng, bảo mật", pronunciation: "/ˌsaɪbəsɪˈkjʊərəti/" },
      { word: "smartwatch", meaning: "đồng hồ thông minh đeo tay", pronunciation: "/ˈsmɑːtwɒtʃ/" }
    ],
    lines: [
      { 
        english: "Hello, my name is Lorenzo. I want to talk about being extremely dependent on smartphones.", 
        vietnamese: "Xin chào, mình tên là Lorenzo. Mình muốn nói về tình trạng cực kỳ bị phụ thuộc vào điện thoại thông minh.",
        keyPhrase: "extremely dependent on",
        phraseNote: "Cực kỳ phụ thuộc vào"
      },
      { 
        english: "A few months ago, I realized I was spending over seven hours a day checking social media.", 
        vietnamese: "Vài tháng trước, mình nhận ra mình đã dành hơn 7 tiếng một ngày chỉ để lướt mạng xã hội.",
        keyPhrase: "spending over seven hours",
        phraseNote: "Dành hơn 7 tiếng đồng hồ"
      },
      { 
        english: "It was a serious problem, so I started using a smartwatch to filter notifications.", 
        vietnamese: "Đó là một vấn đề nghiêm trọng, vì vậy mình bắt đầu sử dụng đồng hồ thông minh để lọc bớt các thông báo.",
        keyPhrase: "filter notifications",
        phraseNote: "Lọc các thông báo"
      },
      { 
        english: "I also set my screen to greyscale mode and turned off the phone during meals.", 
        vietnamese: "Mình cũng đặt màn hình về chế độ thang màu xám và tắt nguồn điện thoại trong các bữa ăn.",
        keyPhrase: "greyscale mode",
        phraseNote: "Chế độ thang màu xám (đen trắng)"
      },
      { 
        english: "Now, I feel much better and have more time to study and connect with real friends.", 
        vietnamese: "Bây giờ, mình cảm thấy tốt hơn nhiều và có thêm thời gian để học tập cũng như kết nối với những người bạn thực sự.",
        keyPhrase: "connect with",
        phraseNote: "Kết nối với ai đó"
      }
    ]
  },
  "unit-9-placeholder": {
    title: "The Secrets of Language Learning",
    unitTitle: "Unit 9: Language (Listening & Speaking)",
    description: "Lắng nghe chuyên gia ngôn ngữ chia sẻ về lộ trình trở thành người song ngữ và dự định học tập trong tương lai.",
    keyVocabulary: [
      { word: "bilingual", meaning: "song ngữ", pronunciation: "/ˌbaɪˈlɪŋɡwəl/" },
      { word: "fluency", meaning: "sự trôi chảy", pronunciation: "/ˈfluːənsi/" },
      { word: "immersion", meaning: "sự đắm mình vào ngôn ngữ", pronunciation: "/ɪˈmɜːʃn/" }
    ],
    lines: [
      { 
        english: "I am going to move to London next month to practice my English every day.", 
        vietnamese: "Tôi dự định sẽ chuyển đến London vào tháng tới để thực hành tiếng Anh hàng ngày.",
        keyPhrase: "going to move to",
        phraseNote: "Dự định di chuyển (Thì tương lai gần)"
      },
      { 
        english: "Being bilingual opens up so many career opportunities in the global market.", 
        vietnamese: "Việc sử dụng song ngữ mở ra rất nhiều cơ hội nghề nghiệp trong thị trường toàn cầu.",
        keyPhrase: "opens up opportunities",
        phraseNote: "Mở ra nhiều cơ hội"
      },
      { 
        english: "To achieve fluency, you need to surround yourself with the language.", 
        vietnamese: "Để đạt được sự trôi chảy, bạn cần bao quanh mình bởi ngôn ngữ đó.",
        keyPhrase: "achieve fluency",
        phraseNote: "Đạt được sự trôi chảy"
      },
      { 
        english: "My brother is going to sign up for an intensive immersion course this summer.", 
        vietnamese: "Anh trai tôi định đăng ký một khóa học đắm mình chuyên sâu vào mùa hè này.",
        keyPhrase: "going to sign up",
        phraseNote: "Dự định đăng ký (Thì tương lai gần)"
      },
      { 
        english: "Learning a new language is a journey, not just a destination.", 
        vietnamese: "Học một ngôn ngữ mới là một hành trình, không chỉ là một đích đến.",
        keyPhrase: "is a journey",
        phraseNote: "Là một hành trình (Cách nói hình ảnh)"
      }
    ]
  }
};
