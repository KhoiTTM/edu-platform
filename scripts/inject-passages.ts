import * as fs from 'fs';
import * as path from 'path';

const passages = {
  "Bài 1": "Kể từ ngày nghỉ hè, Chi không được gặp sơn ca, Sơn ca đã theo bố mẹ về quê. Mới đó mà đã ba tháng.\n\nHôm nay, Chi dậy sớm. Cửa sổ mở toang, gió thổi mát rượi. Có tiếng lích chích. Sơn ca đậu trên ngọn cây, đang chuyền cành.\n– Bạn có khỏe không? – Chi gọi nhỏ.\n– Mình khỏe. Chào bạn! – Sơn ca đáp lại.\n\nSơn ca kể cho Chi nghe bao nhiêu chuyện. Sơn ca được đi bơi, được chèo thuyền, được cưỡi ngựa,... Chi kể cho sơn ca nghe chuyện về những người bạn mới. Sơn ca chăm chú nghe, bộ lông óng mượt rung lên vì thích thú.\n\nCuộc trò chuyện của hai người bạn không biết khi nào mới kết thúc.",
  "Bài 2": "Nghỉ hè em thích nhất\nĐược theo mẹ về quê\nBà em cũng mừng ghê\nKhi thấy em vào ngõ.\n\nMảnh vườn quê bé nhỏ\nBao nhiêu là thứ cây\nBà mỗi năm mỗi gầy\nChắc bà luôn vất vả.\n\nVườn bà có nhiều quả\nChẳng mấy lúc bà ăn\nBà bảo thích để dành\nCho cháu về ra hái.\n\nEm mồ hôi nhễ nhại\nBà theo quạt liền tay\nTừ tay bà đến gió\nThơm bao hương quả vườn.\n\nThoáng nghe bà kể chuyện\nGió thơm say chập chờn.",
  "Bài 3": "Làng tôi ở lưng Trường Sơn, giữa vùng núi non trùng điệp. Một lần, tôi và mấy đứa bạn được ông tôi cho đi thăm rừng. Đứa nào cũng vui.\n\nHôm đó là một ngày nắng ráo. Ông đưa cho mỗi đứa một tàu lá cọ che nắng. Chưa hết mùa mưa, đâu đâu cũng thấy cây ra thêm chồi và cỏ mọc xanh um. Đi trong rừng, nghe rất rõ tiếng suối róc rách và tiếng chim hót líu lo.\n\nMặt trời chiếu những luồng sáng qua kẽ lá. Cây cối vươn ngọn lên cao tít đón nắng. Nhiều cây thân thẳng tắp, tán lá tròn xoe. Những con sóc nâu cong đuôi nhảy thoăn thoắt qua các cành cây. Thấy có người đi tới, chúng dừng cả lại, nhìn ngơ ngác.\n\nKhi nắng đã nhạt màu trên những vòm cây, chúng tôi ra về trong tiếc nuối. Trên đường, ông kể về những cánh rừng thuở xưa. Biết bao cảnh sắc như hiện ra trước mắt chúng tôi: bầy vượn tinh nghịch đánh đu trên cành cao, đàn hươu nai xinh đẹp và hiền lành rủ nhau ra suối, những vạt cỏ đẫm sương long lanh trong nắng.",
  "Bài 4": "A! Biển! Biển đây rồi. Thích quá!\nThắng reo toáng lên, vượt qua bố và anh Thái chạy ào ra bãi cát. Từ thuở bé đến giờ, Thắng đã được thấy biển bao giờ đâu. Cậu đứng ngây ra nhìn biển: Ôi! Biển rộng quá, xanh quá, chẳng nhìn thấy bờ bên kia đâu.\n\nThắng đi xuống gần mép nước. Ồ! Có con gì bé tẹo đang chạy trên cát. Thắng rón rén đến gần, nhưng vụt một cái, nó biến ngay vào hang.\n\n– Cậu có biết con gì đấy không?\nThắng giật mình ngẩng lên nhìn, thấy một bạn trai đang đứng cười.\nThắng cũng cười làm quen:\n– Con gì mà chạy nhanh thế nhỉ?\n– Con còng gió. Cậu không biết sao?\n– Không, bây giờ tớ mới được ra biển. Thế tên cậu là gì?\n– Tớ là Hải. Còn tên cậu?\n– Tớ là Thắng. Nhà tớ ở Hà Nội. Nghỉ hè, tớ được bố cho vào Quy Nhơn thăm bác tớ.\n– Hà Nội không có biển à?\nThắng cười:\n– Hà Nội chỉ có Hồ Gươm, Hồ Tây, sông Hồng thôi. Hồ Tây rộng lắm nhưng không rộng bằng biển thế này.\n\nHải dẫn Thắng đi dọc bờ biển, chỉ cho bạn Mũi Én, Ghềnh Ráng. Lúc tạm biệt, hai đứa hẹn chiều mai lại gặp nhau.",
  "Bài 5": "Ngày... tháng... năm...\nMình quyết định phải học bơi. Khởi động... Chạy vòng quanh bể... Đang chạy thì mẹ gọi mình lại, bảo: \"Con phải tập bơi trên cạn trước đã!\". Thật là chán!\n\nNgày... tháng... năm...\nHôm nay mình được xuống nước. Nước lạnh nhưng mà thích! Bố giữ tay mình, bảo mình tập đạp chân... Thế rồi mình cứ chìm nghỉm. Uống bao nhiêu là nước.\n\nNgày... tháng... năm...\nMình đã biết lặn. Hóa ra, lặn không khó như mình nghĩ. Chỉ cần nhắm mắt, nín thở và hụp xuống nước. Mình làm đi làm lại trò này không biết chán.\n\nNgày... tháng... năm...\nMình biết bơi rồi! Mình nổi được trên mặt nước, cứ đạp chân là tiến về phía trước. Bố bảo bơi như thế gọi là \"bơi chó\". Mình không thích \"bơi chó\". Mình thích bơi ếch giống bố. Mình sẽ cố gắng học bơi ếch.",
  "Bài 6": "Sớm nay em thức dậy\nTrời sáng tự bao giờ\nMùa hè kì lạ chưa\nMặt trời ưa dậy sớm.\n\nNắng cho cây chóng lớn\nCho hoa lá thêm màu\nCho mình chơi thật lâu\nNgày hè dài bất tận.\n\nBuổi chiều trôi thật chậm\nMặt trời mải rong chơi\nĐủng đỉnh mãi chân trời\nMà vẫn chưa lặn xuống.\n\nMùa hè thật sung sướng\nCó nắng lại có kem\nCó những cơn gió êm\nVà ngày dài lấp lánh.",
  "Bài 7": "Hôm nay, mình vào bếp cùng mẹ. Mẹ dạy mình nấu món trứng đúc thịt.\n\nMẹ bảo: \"Món này dễ làm, con có thể tự làm để ăn sáng hoặc ăn cùng cơm\".\n\nCách làm món trứng đúc thịt:\n\n1. Chuẩn bị:\n- Hai quả trứng gà, một ít thịt lợn nạc vai băm nhỏ.\n- Hành khô, nước mắm, muối, hạt tiêu, dầu ăn.\n\n2. Các bước làm:\n- Đập trứng vào bát, cho thịt băm và hành khô thái nhỏ vào.\n- Nêm thêm một chút nước mắm, muối, hạt tiêu.\n- Dùng đũa đánh đều tay để các nguyên liệu hòa quyện vào nhau.\n- Cho dầu ăn vào chảo đun nóng.\n- Đổ hỗn hợp trứng và thịt vào chảo, dàn đều.\n- Vặn nhỏ lửa, đậy vung khoảng 3 - 5 phút cho thịt chín.\n- Lật mặt kia để trứng chín đều và có màu vàng ươm.\n- Cho trứng ra đĩa, cắt thành từng miếng vừa ăn.\n\nLần đầu tiên mình làm món này. Mình thấy rất ngon. Mẹ khen mình khéo tay. Mình vui lắm!",
  "Bài 8": "Đêm nay, Diệu nằm mãi mà không ngủ được vì háo hức chờ sớm mai đến lớp. Sau kì nghỉ hè, bạn bè gặp nhau sẽ có bao nhiêu chuyện vui để kể. Các bạn chắc chắn sẽ kể về những chuyến du lịch kì thú của mình: ra biển, lên núi, đến thăm những thành phố lớn,... Còn Diệu, Diệu sẽ kể với các bạn những gì nhỉ?\n\nMùa hè của Diệu đơn giản lắm. Chiều nào Diệu cũng theo mẹ đi các vườn thu hái quả. Hết chôm chôm lại đến bơ, sầu riêng,... Được đến nhiều mảnh vườn với vô vàn cây trái khác nhau thật là thích!\n\nMùa hè của Diệu là những lần đến chơi nhà bà cụ Khởi ở cuối làng. Bà bị mù nhưng vẫn có thể làm hết mọi việc trong nhà. Bà đi không cần gậy dò đường. Diệu thường tỉ tê trò chuyện với bà. Bà là cả một kho chuyện thú vị.\n\nMùa hè của Diệu là những buổi ra chợ cùng mẹ. Khu chợ quê nghèo ấy thật giản dị mà gần gũi, thân quen. Diệu yêu những người cô, người bác tảo tần bán từng giỏ cua, mớ tép; yêu cả những người bà sáng nào cũng dắt cháu đi mua một ít kẹo bột, vài chiếc bánh mì,...\n\nTạm biệt mùa hè, mai Diệu sẽ bước vào năm học mới..."
};

function inject() {
  const jsonPath = path.join(process.cwd(), 'docs', 'Assement Studio', 'Tieng_Viet_3_Tap1_JSON', 'chu_diem_1_exams.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  data.exams.forEach((exam: any) => {
    exam.questions.forEach((q: any) => {
      if (q.skill === 'đọc_hiểu' || (q.lesson && q.lesson.includes('Đọc hiểu'))) {
        if (q.lesson.includes('Bài 1')) q.reading_passage = passages['Bài 1'];
        if (q.lesson.includes('Bài 2')) q.reading_passage = passages['Bài 2'];
        if (q.lesson.includes('Bài 3')) q.reading_passage = passages['Bài 3'];
        if (q.lesson.includes('Bài 4')) q.reading_passage = passages['Bài 4'];
        if (q.lesson.includes('Bài 5')) q.reading_passage = passages['Bài 5'];
        if (q.lesson.includes('Bài 6')) q.reading_passage = passages['Bài 6'];
        if (q.lesson.includes('Bài 7')) q.reading_passage = passages['Bài 7'];
        if (q.lesson.includes('Bài 8')) q.reading_passage = passages['Bài 8'];
      }
    });
  });

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  console.log('Injected passages successfully!');
}

inject();
