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
    title: "Jack's Daily Routine and Family Life",
    unitTitle: "Unit 1: Daily Life (Reading & Vocabulary)",
    description: "Đọc hiểu về cuộc sống thường nhật đơn giản của Jack, các thành viên gia đình và các thói quen hàng ngày.",
    paragraphs: [
      {
        english: "My name is Jack, and I live with my family in a small house. Every day, my routine is simple. I usually wake up at 6:30 AM. After washing my face, I prepare a simple breakfast for my younger sister and me. At 7:30 AM, we walk to the bus stop and catch the bus to school. Our school is not very far, so the ride only takes fifteen minutes.",
        vietnamese: "Tên tôi là Jack, và tôi sống cùng gia đình trong một ngôi nhà nhỏ. Mỗi ngày, thói quen của tôi rất đơn giản. Tôi thường thức dậy lúc 6:30 sáng. Sau khi rửa mặt, tôi chuẩn bị một bữa sáng đơn giản cho em gái và tôi. Lúc 7:30 sáng, chúng tôi đi bộ đến trạm xe buýt và bắt xe buýt đến trường. Trường của chúng tôi không xa lắm, vì vậy chuyến xe chỉ mất mười lăm phút."
      },
      {
        english: "Classes start at 8:00 AM and finish at 3:00 PM. I study many subjects, but my favorite is English. After school, I return home and help my mother in the garden. She loves planting colorful flowers. My brother, Tony, does not like gardening. He prefers staying in his room and building wooden models because he is very good at handcrafts.",
        vietnamese: "Các tiết học bắt đầu lúc 8:00 sáng và kết thúc lúc 3:00 chiều. Tôi học nhiều môn, nhưng môn học yêu thích nhất của tôi là tiếng Anh. Sau giờ học, tôi trở về nhà và giúp mẹ làm vườn. Mẹ tôi rất thích trồng những bông hoa nhiều màu sắc. Anh trai tôi, Tony, không thích làm vườn. Anh ấy thích ở trong phòng của mình và lắp ráp các mô hình bằng gỗ vì anh ấy rất giỏi thủ công."
      },
      {
        english: "In the evening, we have dinner together at 7:00 PM. My grandmother is an amazing cook, and she always makes delicious meals for us. After dinner, I do my homework and read a book for thirty minutes before sleeping. I always try to go to bed before 10:00 PM because getting enough sleep is important.",
        vietnamese: "Vào buổi tối, chúng tôi ăn tối cùng nhau lúc 7:00 tối. Bà của tôi là một đầu bếp tuyệt vời, và bà luôn nấu những bữa ăn ngon cho chúng tôi. Sau bữa tối, tôi làm bài tập về nhà và đọc sách khoảng ba mươi phút trước khi đi ngủ. Tôi luôn cố gắng đi ngủ trước 10:00 tối vì ngủ đủ giấc là rất quan trọng."
      }
    ],
    vocabulary: [
      { word: "routine", meaning: "thói quen hàng ngày, trình tự làm việc", pronunciation: "/ruːˈtiːn/" },
      { word: "prepare", meaning: "chuẩn bị, sửa soạn", pronunciation: "/prɪˈpeə(r)/" },
      { word: "gardening", meaning: "việc làm vườn, chăm sóc cây", pronunciation: "/ˈɡɑːdnɪŋ/" },
      { word: "handcrafts", meaning: "đồ thủ công tự tay làm", pronunciation: "/ˈhændɪkrɑːfts/" },
      { word: "delicious", meaning: "ngon miệng, có hương vị tuyệt vời", pronunciation: "/dɪˈlɪʃəs/" }
    ],
    questions: [
      {
        id: "r-u1-q1",
        question: "What time does Jack usually wake up in the morning?",
        options: ["At 6:00 AM", "At 6:30 AM", "At 7:30 AM", "At 8:00 AM"],
        correct_index: 1,
        explanation: "Đoạn 1 nêu rõ: 'I usually wake up at 6:30 AM.'"
      },
      {
        id: "r-u1-q2",
        question: "How do Jack and his sister go to school?",
        options: ["They ride bicycles", "They walk all the way", "They take the school bus", "They catch the public bus"],
        correct_index: 3,
        explanation: "Đoạn 1 viết: 'we walk to the bus stop and catch the bus to school.'"
      },
      {
        id: "r-u1-q3",
        question: "What is Jack's favorite subject at school?",
        options: ["Math", "English", "Science", "History"],
        correct_index: 1,
        explanation: "Đoạn 2 ghi rõ: 'I study many subjects, but my favorite is English.'"
      },
      {
        id: "r-u1-q4",
        question: "Why does Jack's brother prefer building wooden models?",
        options: ["Because he hates staying in his room", "Because he is very good at handcrafts", "Because his mother forces him to do it", "Because he wants to sell them for money"],
        correct_index: 1,
        explanation: "Đoạn 2 nêu: 'He prefers staying in his room and building wooden models because he is very good at handcrafts.'"
      },
      {
        id: "r-u1-q5",
        question: "Who prepares the evening meals in Jack's family?",
        options: ["Jack's mother", "Jack's sister", "Jack's grandmother", "Jack himself"],
        correct_index: 2,
        explanation: "Đoạn 3 chỉ ra: 'My grandmother is an amazing cook, and she always makes delicious meals for us.'"
      }
    ]
  },
  2: {
    unitNum: 2,
    title: "A Description of My New Apartment",
    unitTitle: "Unit 2: House and Home (Reading & Writing)",
    description: "Đọc hiểu về cấu trúc căn hộ mới của Giorgio, cách bố trí các phòng và ban công nhỏ xinh.",
    paragraphs: [
      {
        english: "Hi, I am Giorgio, and I want to describe my new apartment in Milan. It is on the third floor of a modern building. My flat is small but very comfortable. There are four main rooms: a kitchen, a living room, a bedroom, and a bathroom. There is also a small balcony next to the living room where I can sit and look at the street.",
        vietnamese: "Xin chào, tôi là Giorgio, và tôi muốn mô tả căn hộ mới của tôi ở Milan. Nó nằm trên tầng ba của một tòa nhà hiện đại. Căn hộ của tôi nhỏ nhưng rất thoải mái. Có bốn phòng chính: nhà bếp, phòng khách, phòng ngủ và phòng tắm. Ngoài ra còn có một ban công nhỏ bên cạnh phòng khách nơi tôi có thể ngồi và nhìn ngắm đường phố."
      },
      {
        english: "In the living room, there is a soft gray sofa and a television on the wall. Next to the sofa, I have a small dining table with four chairs. The bedroom has a comfortable bed and a large wardrobe for my clothes. The kitchen is clean and has a modern fridge to keep food fresh. I like my new home because it is clean and quiet.",
        vietnamese: "Trong phòng khách, có một chiếc ghế sofa màu xám mềm mại và một chiếc tivi treo trên tường. Bên cạnh chiếc ghế sofa, tôi có một chiếc bàn ăn nhỏ với bốn chiếc ghế. Phòng ngủ có một chiếc giường êm ái và một chiếc tủ quần áo lớn để đựng quần áo. Nhà bếp thì sạch sẽ và có một chiếc tủ lạnh hiện đại để giữ thực phẩm tươi ngon. Tôi thích ngôi nhà mới của mình vì nó sạch sẽ và yên tĩnh."
      }
    ],
    vocabulary: [
      { word: "apartment", meaning: "căn hộ chung cư", pronunciation: "/əˈpɑːtmənt/" },
      { word: "comfortable", meaning: "thoải mái, tiện nghi", pronunciation: "/ˈkʌmftəbl/" },
      { word: "wardrobe", meaning: "tủ quần áo", pronunciation: "/ˈwɔːdrəʊb/" },
      { word: "balcony", meaning: "ban công", pronunciation: "/ˈbælkəni/" }
    ],
    questions: [
      {
        id: "r-u2-q1",
        question: "Which floor is Giorgio's new apartment on?",
        options: ["The first floor", "The second floor", "The third floor", "The fourth floor"],
        correct_index: 2,
        explanation: "Đoạn 1 nêu: 'It is on the third floor of a modern building.'"
      },
      {
        id: "r-u2-q2",
        question: "How many main rooms are there in Giorgio's apartment?",
        options: ["Three", "Four", "Five", "Six"],
        correct_index: 1,
        explanation: "Đoạn 1 ghi: 'There are four main rooms: a kitchen, a living room, a bedroom, and a bathroom.'"
      },
      {
        id: "r-u2-q3",
        question: "Where is the dining table located?",
        options: ["In the kitchen", "In the bedroom", "Next to the sofa in the living room", "On the balcony"],
        correct_index: 2,
        explanation: "Đoạn 2 chỉ ra: 'In the living room... Next to the sofa, I have a small dining table...'"
      }
    ]
  },
  3: {
    unitNum: 3,
    title: "Popular Hobbies for Students",
    unitTitle: "Unit 3: Hobbies (Reading & Vocabulary)",
    description: "Đọc hiểu về các sở thích phổ biến của học sinh, so sánh hoạt động trong nhà và ngoài trời.",
    paragraphs: [
      {
        english: "Hobbies are activities we do in our free time for fun. They help us relax after busy hours at school. Today, students have many different interests. Some prefer active outdoor hobbies like playing football, riding bicycles, or swimming. These outdoor activities are excellent because they keep our bodies strong and healthy.",
        vietnamese: "Sở thích là những hoạt động chúng ta làm trong thời gian rảnh rỗi để giải trí. Chúng giúp chúng ta thư giãn sau những giờ học bận rộn ở trường. Ngày nay, học sinh có nhiều sở thích khác nhau. Một số thích các sở thích ngoài trời năng động như chơi bóng đá, đi xe đạp hoặc bơi lội. Những hoạt động ngoài trời này rất tuyệt vời vì chúng giúp cơ thể chúng ta khỏe mạnh."
      },
      {
        english: "On the other hand, many students enjoy indoor hobbies. For example, some like reading books, drawing pictures, or playing video games. Playing video games is fun and helps connect with friends online, but students should not spend too much time looking at screens. It is important to balance screen time with physical exercise.",
        vietnamese: "Mặt khác, nhiều học sinh thích các sở thích trong nhà. Ví dụ, một số thích đọc sách, vẽ tranh hoặc chơi trò chơi điện tử. Chơi trò chơi điện tử rất vui và giúp kết nối với bạn bè trực tuyến, nhưng học sinh không nên dành quá nhiều thời gian nhìn vào màn hình. Việc cân bằng giữa thời gian sử dụng màn hình và tập thể dục thể chất là rất quan trọng."
      }
    ],
    vocabulary: [
      { word: "hobby", meaning: "sở thích lúc rảnh rỗi", pronunciation: "/ˈhɒbi/" },
      { word: "relax", meaning: "thư giãn, giải tỏa căng thẳng", pronunciation: "/rɪˈlæks/" },
      { word: "active", meaning: "năng động, hoạt bát", pronunciation: "/ˈæktɪv/" },
      { word: "balance", meaning: "sự cân bằng", pronunciation: "/ˈbæləns/" }
    ],
    questions: [
      {
        id: "r-u3-q1",
        question: "Why are outdoor hobbies like football and swimming good for students?",
        options: ["They make students tired", "They keep bodies strong and healthy", "They are very expensive", "They require computer screens"],
        correct_index: 1,
        explanation: "Đoạn 1 nêu: 'These outdoor activities are excellent because they keep our bodies strong and healthy.'"
      },
      {
        id: "r-u3-q2",
        question: "Which of the following is an indoor hobby mentioned in the text?",
        options: ["Riding bicycles", "Playing football", "Reading books", "Swimming"],
        correct_index: 2,
        explanation: "Đoạn 2 ghi: 'indoor hobbies. For example, some like reading books...'"
      },
      {
        id: "r-u3-q3",
        question: "What warning does the writer give about video games?",
        options: ["They are too difficult to learn", "Students should not spend too much time looking at screens", "They are only for adults", "They cost too much money"],
        correct_index: 1,
        explanation: "Đoạn 2 chỉ ra: 'students should not spend too much time looking at screens.'"
      }
    ]
  },
  4: {
    unitNum: 4,
    title: "Planning a Holiday Trip",
    unitTitle: "Unit 4: Travel (Reading & Vocabulary)",
    description: "Đọc hiểu cách chuẩn bị hành lý và lên lịch trình chi tiết cho một chuyến du lịch gia đình.",
    paragraphs: [
      {
        english: "Travel is a wonderful way to learn about new places. Before going on a holiday, it is important to plan carefully. First, you need to choose your destination. Some people love relaxing on warm beaches, while others prefer exploring cool mountains. Second, you must pack your suitcase with correct clothes and travel documents like passports and tickets.",
        vietnamese: "Du lịch là một cách tuyệt vời để tìm hiểu về những địa điểm mới. Trước khi đi nghỉ mát, việc lập kế hoạch cẩn thận là rất quan trọng. Đầu tiên, bạn cần chọn điểm đến của mình. Một số người thích thư giãn trên các bãi biển ấm áp, trong khi những người khác lại thích khám phá những vùng núi mát mẻ. Thứ hai, bạn phải xếp vào vali quần áo phù hợp và các giấy tờ du lịch như hộ chiếu và vé."
      },
      {
        english: "It is also useful to write a simple travel itinerary. An itinerary is a list of activities you want to do each day. For example, on the first day, you can check into the hotel and walk around the local town. Writing everything down helps you remember important tasks and avoids wasting time during your trip.",
        vietnamese: "Viết một lịch trình du lịch đơn giản cũng rất hữu ích. Lịch trình là danh sách các hoạt động bạn muốn làm mỗi ngày. Ví dụ, vào ngày đầu tiên, bạn có thể nhận phòng khách sạn và đi dạo quanh thị trấn địa phương. Viết mọi thứ ra giấy giúp bạn ghi nhớ các nhiệm vụ quan trọng và tránh lãng phí thời gian trong suốt chuyến đi."
      }
    ],
    vocabulary: [
      { word: "destination", meaning: "điểm đến của chuyến đi", pronunciation: "/ˌdestɪˈneɪʃn/" },
      { word: "itinerary", meaning: "lịch trình chi tiết", pronunciation: "/aɪˈtɪnərəri/" },
      { word: "suitcase", meaning: "vali đựng quần áo đồ đạc", pronunciation: "/ˈsuːtkeɪs/" },
      { word: "pack", meaning: "thu xếp, đóng gói hành lý", pronunciation: "/pæk/" }
    ],
    questions: [
      {
        id: "r-u4-q1",
        question: "What is the first step before going on a holiday?",
        options: ["Buying a new suitcase", "Choosing your destination", "Writing an itinerary", "Checking into the hotel"],
        correct_index: 1,
        explanation: "Đoạn 1 nêu: 'First, you need to choose your destination.'"
      },
      {
        id: "r-u4-q2",
        question: "What travel documents are mentioned in the text?",
        options: ["Credit cards and maps", "Passports and tickets", "Books and diaries", "Driving licenses"],
        correct_index: 1,
        explanation: "Đoạn 1 chỉ ra: 'travel documents like passports and tickets.'"
      },
      {
        id: "r-u4-q3",
        question: "What is a travel 'itinerary'?",
        options: ["A heavy suitcase", "A list of activities to do each day", "A type of local transport", "A luxury hotel room"],
        correct_index: 1,
        explanation: "Đoạn 2 định nghĩa: 'An itinerary is a list of activities you want to do each day.'"
      }
    ]
  },
  5: {
    unitNum: 5,
    title: "Healthy Cooking at Home",
    unitTitle: "Unit 5: Food (Reading & Vocabulary)",
    description: "Đọc hiểu về cách nấu ăn lành mạnh tại nhà và cách chọn các nguyên liệu tươi sạch.",
    paragraphs: [
      {
        english: "Eating healthy food is important for our health. Cooking at home is one of the best ways to stay healthy. When we cook our own meals, we can choose fresh ingredients. Fresh vegetables, organic fruits, and clean meat are much better than packaged food from supermarkets. Preparing ingredients from scratch is fun and good for our bodies.",
        vietnamese: "Ăn thực phẩm lành mạnh là quan trọng đối với sức khỏe của chúng ta. Nấu ăn tại nhà là một trong những cách tốt nhất để giữ sức khỏe. Khi chúng ta tự nấu các bữa ăn, chúng ta có thể chọn các nguyên liệu tươi sạch. Rau tươi, trái cây hữu cơ và thịt sạch tốt hơn nhiều so với thực phẩm đóng gói từ siêu thị. Chuẩn bị các nguyên liệu từ đầu rất vui và tốt cho cơ thể của chúng ta."
      },
      {
        english: "Many children like sweet snacks and fried food, but these items contain too much sugar and fat. Instead, we can make simple healthy recipes at home. For example, steaming vegetables and boiling chicken are healthy cooking methods. Homemade food has less salt and keeps essential vitamins to help children grow strong.",
        vietnamese: "Nhiều trẻ em thích đồ ăn vặt ngọt và đồ chiên rán, nhưng những mặt hàng này chứa quá nhiều đường và chất béo. Thay vào đó, chúng ta có thể làm những công thức nấu ăn lành mạnh đơn giản tại nhà. Ví dụ, hấp rau và luộc gà là những phương pháp nấu ăn lành mạnh. Thực phẩm tự làm ở nhà có ít muối hơn và giữ được các vitamin thiết yếu giúp trẻ phát triển khỏe mạnh."
      }
    ],
    vocabulary: [
      { word: "ingredients", meaning: "các nguyên liệu nấu ăn", pronunciation: "/ɪnˈɡriːdiənts/" },
      { word: "recipe", meaning: "công thức nấu ăn", pronunciation: "/ˈresəpi/" },
      { word: "organic", meaning: "hữu cơ, tự nhiên sạch", pronunciation: "/ɔːˈɡænɪk/" },
      { word: "homemade", meaning: "nhà làm, tự làm tại nhà", pronunciation: "/ˌhəʊmˈmeɪd/" }
    ],
    questions: [
      {
        id: "r-u5-q1",
        question: "Why is cooking at home good for our health?",
        options: ["Because it is faster than supermarkets", "Because we can choose fresh ingredients", "Because it uses more sugar and fat", "Because children hate sweet snacks"],
        correct_index: 1,
        explanation: "Đoạn 1 nêu: 'Cooking at home is one of the best ways... we can choose fresh ingredients.'"
      },
      {
        id: "r-u5-q2",
        question: "Which of the following is described as a healthy cooking method?",
        options: ["Deep-frying food in oil", "Steaming vegetables and boiling chicken", "Buying sweet snacks from supermarket", "Adding a lot of salt to soup"],
        correct_index: 1,
        explanation: "Đoạn 2 ghi: 'steaming vegetables and boiling chicken are healthy cooking methods.'"
      },
      {
        id: "r-u5-q3",
        question: "Homemade food is better because it keeps...",
        options: ["Sugar and sodium chemicals", "Essential vitamins", "Supermarket package tags", "Packaged preservation powders"],
        correct_index: 1,
        explanation: "Đoạn 2 chỉ ra: 'Homemade food has less salt and keeps essential vitamins...'"
      }
    ]
  },
  6: {
    unitNum: 6,
    title: "Traveling to Work in Big Cities",
    unitTitle: "Unit 6: Transport (Reading & Vocabulary)",
    description: "Đọc hiểu về việc đi lại hàng ngày và so sánh lợi ích của tàu điện ngầm so với xe buýt.",
    paragraphs: [
      {
        english: "In big cities, traveling to work can be difficult. Every morning, millions of people commute at the same time. This is called the rush hour. During this time, the roads are very busy, and traffic jams are common. Many people choose to drive their private cars, which causes heavy pollution and delays.",
        vietnamese: "Ở các thành phố lớn, việc di chuyển đi làm có thể gặp khó khăn. Mỗi sáng, hàng triệu người đi lại cùng một lúc. Đây được gọi là giờ cao điểm. Trong thời gian này, các con đường rất bận rộn và ùn tắc giao thông là phổ biến. Nhiều người chọn lái xe ô tô riêng của họ, điều này gây ra ô nhiễm nghiêm trọng và chậm trễ."
      },
      {
        english: "To avoid traffic jams, taking public transport is a great choice. Using the underground train or subway is much faster than taking a bus because trains do not get stuck on roads. Riding a bicycle is also an environmentally friendly choice that helps keep the air clean and reduces traffic on city streets.",
        vietnamese: "Để tránh ùn tắc giao thông, đi phương tiện giao thông công cộng là một lựa chọn tuyệt vời. Sử dụng tàu hỏa dưới lòng đất hoặc tàu điện ngầm nhanh hơn nhiều so với đi xe buýt vì tàu hỏa không bị kẹt trên đường. Đi xe đạp cũng là một lựa chọn thân thiện với môi trường giúp giữ không khí sạch và giảm lưu lượng giao thông trên đường phố."
      }
    ],
    vocabulary: [
      { word: "commute", meaning: "hành trình đi lại hàng ngày", pronunciation: "/kəˈmjuːt/" },
      { word: "rush hour", meaning: "giờ cao điểm kẹt xe", pronunciation: "/rʌʃ ˈaʊə(r)/" },
      { word: "traffic jam", meaning: "sự kẹt xe, ùn tắc", pronunciation: "/ˈtræfɪk dʒæm/" },
      { word: "public", meaning: "công cộng, dành cho mọi người", pronunciation: "/ˈpʌblɪk/" }
    ],
    questions: [
      {
        id: "r-u6-q1",
        question: "What is the 'rush hour'?",
        options: ["A quiet hour at midnight", "The time in the morning when millions of people commute", "An hour to play sports in the garden", "A cooking class at school"],
        correct_index: 1,
        explanation: "Đoạn 1 nêu: 'Every morning, millions of people commute at the same time. This is called the rush hour.'"
      },
      {
        id: "r-u6-q2",
        question: "Why is the underground train faster than a bus?",
        options: ["Because trains do not get stuck on roads", "Because train tickets are more expensive", "Because buses only run in the afternoon", "Because trains have more comfortable seats"],
        correct_index: 0,
        explanation: "Đoạn 2 giải thích: 'Using the underground train... is much faster than taking a bus because trains do not get stuck on roads.'"
      },
      {
        id: "r-u6-q3",
        question: "Which transport choice is described as environmentally friendly?",
        options: ["Driving a private petrol car", "Taking a diesel taxi", "Riding a bicycle", "Renting a speed motorboat"],
        correct_index: 2,
        explanation: "Đoạn 2 chỉ ra: 'Riding a bicycle is also an environmentally friendly choice...'"
      }
    ]
  },
  7: {
    unitNum: 7,
    title: "Different Kinds of Jobs",
    unitTitle: "Unit 7: Jobs (Reading & Vocabulary)",
    description: "Đọc hiểu các loại công việc khác nhau, yêu cầu bằng cấp và xu hướng làm việc từ xa.",
    paragraphs: [
      {
        english: "Everyone needs to work to earn money. There are many different types of jobs. Some people work in offices. They sit at desks and use computers to write emails or manage numbers. Other people do manual work outside, like builders who construct houses, or farmers who grow food. To get a professional job, people often need to study at university to get qualifications.",
        vietnamese: "Mọi người đều cần làm việc để kiếm tiền. Có nhiều loại công việc khác nhau. Một số người làm việc trong các văn phòng. Họ ngồi ở bàn làm việc và sử dụng máy tính để viết email hoặc quản lý các con số. Những người khác làm công việc chân tay ngoài trời, như những người thợ xây dựng nhà cửa, hoặc những người nông dân trồng trọt thực phẩm. Để có được một công việc chuyên nghiệp, mọi người thường cần học đại học để lấy bằng cấp."
      },
      {
        english: "In recent years, many office workers are working from home. They do not travel to their offices daily. Instead, they connect with their colleagues through internet video calls. This trend makes working hours more flexible and helps parents spend more time with their children.",
        vietnamese: "Trong những năm gần đây, nhiều nhân viên văn phòng đang làm việc tại nhà. Họ không di chuyển đến văn phòng hàng ngày. Thay vào đó, họ kết nối với đồng nghiệp của mình thông qua các cuộc gọi video trên internet. Xu hướng này giúp thời gian làm việc linh hoạt hơn và giúp cha mẹ dành nhiều thời gian hơn cho con cái."
      }
    ],
    vocabulary: [
      { word: "office", meaning: "văn phòng làm việc", pronunciation: "/ˈɒfɪs/" },
      { word: "manual", meaning: "thủ công, làm bằng chân tay", pronunciation: "/ˈmænjuəl/" },
      { word: "qualifications", meaning: "bằng cấp, chứng chỉ", pronunciation: "/ˌkwɒlɪfɪˈkeɪʃnz/" },
      { word: "colleagues", meaning: "đồng nghiệp cùng cơ quan", pronunciation: "/ˈkɒliːɡz/" }
    ],
    questions: [
      {
        id: "r-u7-q1",
        question: "What do builders do as their manual work?",
        options: ["Write office emails", "Construct houses", "Study at university", "Make video calls"],
        correct_index: 1,
        explanation: "Đoạn 1 nêu: 'manual work outside, like builders who construct houses...'"
      },
      {
        id: "r-u7-q2",
        question: "Why do people study at university to get qualifications?",
        options: ["To buy cheaper computers", "To get a professional job", "To work in the garden with family", "To travel by bus for free"],
        correct_index: 1,
        explanation: "Đoạn 1 ghi: 'To get a professional job, people often need to study at university to get qualifications.'"
      },
      {
        id: "r-u7-q3",
        question: "How do work-from-home employees connect with their colleagues?",
        options: ["Through internet video calls", "By writing paper letters", "By meeting in local coffee shops", "By taking train trips together"],
        correct_index: 0,
        explanation: "Đoạn 2 chỉ ra: 'they connect with their colleagues through internet video calls.'"
      }
    ]
  },
  8: {
    unitNum: 8,
    title: "Healthy Habits for a Good Sleep",
    unitTitle: "Unit 8: Health (Reading & Vocabulary)",
    description: "Đọc hiểu các thói quen lành mạnh để có giấc ngủ tốt, giảm mỏi mắt do sử dụng điện thoại.",
    paragraphs: [
      {
        english: "A good sleep is very important for our health. It helps our brain rest and keeps us active the next day. However, many students do not get enough sleep because they use smartphones or tablets late at night. The bright screen light stops the body from sleeping, causing eye strain and tiredness.",
        vietnamese: "Một giấc ngủ ngon là rất quan trọng đối với sức khỏe của chúng ta. Nó giúp bộ não của chúng ta nghỉ ngơi và giữ cho chúng ta năng động vào ngày hôm sau. Tuy nhiên, nhiều học sinh không ngủ đủ giấc vì sử dụng điện thoại thông minh hoặc máy tính bảng muộn vào ban đêm. Ánh sáng màn hình sáng ngăn cơ thể đi vào giấc ngủ, gây mỏi mắt và mệt mỏi."
      },
      {
        english: "To sleep better, you should avoid looking at screens at least one hour before bed. Instead, you can read a paper book under a soft warm lamp or listen to relaxing music. Keeping your bedroom quiet, cool, and dark is also a great recommendation from doctors to improve your health.",
        vietnamese: "Để ngủ ngon hơn, bạn nên tránh nhìn vào màn hình ít nhất một giờ trước khi đi ngủ. Thay vào đó, bạn có thể đọc một cuốn sách giấy dưới ánh đèn ấm áp dịu nhẹ hoặc nghe nhạc thư giãn. Giữ cho phòng ngủ của bạn yên tĩnh, mát mẻ và tối cũng là một khuyến nghị tuyệt vời từ các bác sĩ để cải thiện sức khỏe của bạn."
      }
    ],
    vocabulary: [
      { word: "deficient", meaning: "thiếu hụt, không đầy đủ", pronunciation: "/dɪˈfɪʃnt/" },
      { word: "insomnia", meaning: "chứng mất ngủ", pronunciation: "/ɪnˈsɒmniə/" },
      { word: "strain", meaning: "sự mệt mỏi, căng thẳng cơ/mắt", pronunciation: "/streɪn/" },
      { word: "recommendation", meaning: "khuyến nghị, lời khuyên", pronunciation: "/ˌrekəmenˈdeɪʃn/" }
    ],
    questions: [
      {
        id: "r-u8-q1",
        question: "Why do many students not get enough sleep at night?",
        options: ["Because they study history books", "Because they use smartphones or tablets late at night", "Because they sleep during class hours", "Because they eat too many fresh fruits"],
        correct_index: 1,
        explanation: "Đoạn 1 nêu: 'many students do not get enough sleep because they use smartphones or tablets late at night.'"
      },
      {
        id: "r-u8-q2",
        question: "How long before bed should you stop looking at screens?",
        options: ["At least ten minutes", "At least one hour", "At least three hours", "Immediately when you wake up"],
        correct_index: 1,
        explanation: "Đoạn 2 khuyên: 'you should avoid looking at screens at least one hour before bed.'"
      },
      {
        id: "r-u8-q3",
        question: "Which bedroom condition is recommended by doctors?",
        options: ["Hot and noisy", "Bright and warm", "Quiet, cool, and dark", "Equipped with large computer tables"],
        correct_index: 2,
        explanation: "Đoạn 2 ghi: 'Keeping your bedroom quiet, cool, and dark is also a great recommendation...'"
      }
    ]
  },
  9: {
    unitNum: 9,
    title: "Learning a Foreign Language",
    unitTitle: "Unit 9: Language (Reading & Vocabulary)",
    description: "Đọc hiểu về việc học ngoại ngữ mới và các phương pháp giúp nói trôi chảy nhanh hơn.",
    paragraphs: [
      {
        english: "Learning a new language is an exciting journey. In the global world, speaking English opens up many opportunities to study and make friends from different countries. A person who speaks two languages fluently is called bilingual. People who are bilingual can communicate easily and learn about new cultures.",
        vietnamese: "Học một ngôn ngữ mới là một hành trình thú vị. Trong thế giới toàn cầu, việc nói tiếng Anh mở ra nhiều cơ hội để học tập và kết bạn từ các quốc gia khác nhau. Một người nói trôi chảy hai ngôn ngữ được gọi là song ngữ. Những người song ngữ có thể giao tiếp dễ dàng và tìm hiểu về các nền văn hóa mới."
      },
      {
        english: "To learn a language well, daily practice is necessary. You should practice vocabulary, listen to foreign songs, and try to speak with native speakers. Do not be afraid of making mistakes, because mistakes help you learn faster. With regular effort, anyone can achieve fluency and talk confidently.",
        vietnamese: "Để học tốt một ngôn ngữ, việc luyện tập hàng ngày là cần thiết. Bạn nên luyện từ vựng, nghe các bài hát nước ngoài và cố gắng nói chuyện với người bản xứ. Đừng sợ mắc lỗi, vì lỗi sai giúp bạn học nhanh hơn. Với nỗ lực đều đặn, bất kỳ ai cũng có thể đạt được sự trôi chảy và nói chuyện tự tin."
      }
    ],
    vocabulary: [
      { word: "bilingual", meaning: "song ngữ (nói được 2 thứ tiếng)", pronunciation: "/ˌbaɪˈlɪŋɡwəl/" },
      { word: "fluently", meaning: "một cách trôi chảy, lưu loát", pronunciation: "/ˈfluːəntli/" },
      { word: "opportunities", meaning: "các cơ hội, thời cơ tốt", pronunciation: "/ˌɒpəˈtjuːnətiz/" },
      { word: "native", meaning: "bản xứ, gốc bản địa", pronunciation: "/ˈneɪtɪv/" }
    ],
    questions: [
      {
        id: "r-u9-q1",
        question: "What is a 'bilingual' person?",
        options: ["A person who speaks only one language", "A person who speaks two languages fluently", "An English school teacher", "A foreign travel guide"],
        correct_index: 1,
        explanation: "Đoạn 1 định nghĩa: 'A person who speaks two languages fluently is called bilingual.'"
      },
      {
        id: "r-u9-q2",
        question: "What is necessary to learn a language well?",
        options: ["Buying a large television", "Daily practice of vocabulary and listening", "Avoiding native speakers completely", "Sleeping more hours before exams"],
        correct_index: 1,
        explanation: "Đoạn 2 nêu: 'To learn a language well, daily practice is necessary. You should practice vocabulary, listen...'"
      },
      {
        id: "r-u9-q3",
        question: "Why should language students not be afraid of making mistakes?",
        options: ["Because mistakes help them learn faster", "Because teachers never check mistakes", "Because mistakes make grammar easier", "Because mistakes cost a lot of money"],
        correct_index: 0,
        explanation: "Đoạn 2 giải thích: 'Do not be afraid of making mistakes, because mistakes help you learn faster.'"
      }
    ]
  },
  10: {
    unitNum: 10,
    title: "Technology in Our Homes",
    unitTitle: "Unit 10: Tech (Reading & Vocabulary)",
    description: "Đọc hiểu về việc sử dụng các thiết bị thông minh trong ngôi nhà hiện đại để tiết kiệm thời gian.",
    paragraphs: [
      {
        english: "Technology is changing the way we live. Today, many houses have smart devices connected to the internet. These gadgets help us manage our homes easily. For example, you can use your smartphone to turn on the lights or control the room temperature. Some families even have robot vacuum cleaners that clean floors automatically while everyone is away.",
        vietnamese: "Công nghệ đang thay đổi cách chúng ta sống. Ngày nay, nhiều ngôi nhà có các thiết bị thông minh kết nối với internet. Những thiết bị này giúp chúng ta quản lý ngôi nhà của mình một cách dễ dàng. Ví dụ, bạn có thể sử dụng điện thoại thông minh để bật đèn hoặc điều khiển nhiệt độ phòng. Một số gia đình thậm chí còn có robot hút bụi tự động lau sàn khi mọi người đi vắng."
      },
      {
        english: "In the future, technology will be even more advanced. Experts predict that smart houses will automatically cook meals and security cameras will use artificial intelligence to protect families. These modern machines save time and make everyday life much safer and more comfortable.",
        vietnamese: "Trong tương lai, công nghệ sẽ còn tiên tiến hơn nữa. Các chuyên gia dự đoán rằng các ngôi nhà thông minh sẽ tự động nấu các bữa ăn và camera an ninh sẽ sử dụng trí tuệ nhân tạo để bảo vệ các gia đình. Những cỗ máy hiện đại này tiết kiệm thời gian và giúp cuộc sống hàng ngày trở nên an toàn và thoải mái hơn nhiều."
      }
    ],
    vocabulary: [
      { word: "gadget", meaning: "thiết bị công nghệ nhỏ tiện ích", pronunciation: "/ˈɡædʒɪt/" },
      { word: "automatically", meaning: "một cách tự động", pronunciation: "/ˌɔːtəˈmætɪkli/" },
      { word: "predict", meaning: "dự đoán, dự báo trước", pronunciation: "/prɪˈdɪkt/" },
      { word: "artificial", meaning: "nhân tạo (không tự nhiên)", pronunciation: "/ˌɑːtɪˈfɪʃl/" }
    ],
    questions: [
      {
        id: "r-u10-q1",
        question: "How can smart home owners control room lights and temperature?",
        options: ["By using their smartphones", "By calling local electricity workers", "By building wooden models", "By turning off the internet connection"],
        correct_index: 0,
        explanation: "Đoạn 1 nêu: 'you can use your smartphone to turn on the lights or control the room temperature.'"
      },
      {
        id: "r-u10-q2",
        question: "What do robot vacuum cleaners do?",
        options: ["They cook gourmet meals", "They clean floors automatically", "They display security videos", "They teach English vocabulary"],
        correct_index: 1,
        explanation: "Đoạn 1 ghi: 'robot vacuum cleaners that clean floors automatically...'"
      },
      {
        id: "r-u10-q3",
        question: "What do experts predict about future smart houses?",
        options: ["They will become much cheaper to build", "They will automatically cook meals", "They won't have any windows", "They will only be built in small towns"],
        correct_index: 1,
        explanation: "Đoạn 2 chỉ ra: 'Experts predict that smart houses will automatically cook meals...'"
      }
    ]
  }
};

export function getReadingLessonForUnit(unitNumber: number): IELTSReadingLesson {
  const normalized = Math.max(1, Math.min(10, unitNumber));
  return ieltsReadingLessons[normalized] || ieltsReadingLessons[1];
}
