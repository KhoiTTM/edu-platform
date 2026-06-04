import * as fs from 'fs';
import * as path from 'path';

const passages = {
  "Bài 1": "Chi mở tung cửa sổ đón những tia nắng đầu thu. Thế là hết hè rồi.\nNgày mai bắt đầu năm học mới.\nCó tiếng gọi ngoài cổng. Chi nhìn ra, thấy Sơn giơ chiếc diều rất xinh, vẫy rối rít:\n– Cho cậu này.\nChi mừng rỡ chạy ra. Sơn về quê từ đầu hè, giờ gặp lại, hai bạn có bao nhiêu chuyện. Sơn kể ở quê, cậu được theo ông bà đi trồng rau, câu cá. Chiều chiều, cậu thường cùng bạn thả diều. Khi diều lên cao, cậu nằm lăn ra bãi cỏ ngắm trời. Cánh diều đứng im như ngủ thiếp đi trên bầu trời xanh.\n\nNhìn Sơn đen nhẻm, mắt lấp lánh khi kể chuyện, Chi chợt thấy buồn:\n– Tớ chẳng được đi đâu.\n– Nhưng mẹ tớ bảo cậu biết đi xe đạp rồi.\n– Ừ, tớ ở nhà tập xe thôi.\n– Thế cậu được đạp xe đi khắp nơi mà.\nChi cười:\n– Ừ nhỉ.\nThế là Chi kể bố dạy Chi đi xe đạp. Bây giờ, Chi đã đạp xe bon bon. Con đường quen thuộc bỗng trở nên mới mẻ.\nCứ như vậy, hai bạn thi nhau kể những trải nghiệm mùa hè.\nNgày mai đi học rồi, nhưng mùa hè chắc sẽ theo các bạn vào lớp học.",
  "Bài 5": "Ngày... tháng...\nHôm nay, mẹ đưa mình đi tập bơi. Mình rất phấn khích vì được mẹ chuẩn bị cho một chiếc mũ bơi cùng cặp kính bơi màu hồng rất đẹp. Cô giáo cũng khen đồ bơi của mình đáng yêu. Đầu tiên, cô dạy mình tập thở. Nhưng khi thở dưới nước, mình toàn bị sặc. Mình sợ đến mức không dám xuống nước nữa. Mẹ bảo do mình chưa quen. Mẹ vỗ về, động viên mình mãi. Thế là mình tiếp tục tập luyện. Cuối buổi, mình vẫn chưa thở dưới nước được. Mình thấy hơi buồn. Mình nghĩ lần sau, mình sẽ tập tốt hơn.\n\nNgày... tháng...\nHôm nay, mình đã có cảm giác thích đi bơi. Mình không còn bị sặc nữa. Mình đã quen thở dưới nước rồi. Cô dạy mình động tác bơi ếch. Động tác đó thật lạ! Khi đạp chân, mình giống hệt như một con ếch ộp.\nNgày... tháng...\nHọc bơi chẳng dễ một chút nào. Thế mà mình đã biết bơi rồi. Mình như chú cá nhỏ tung tăng trong nước. Kể cũng lạ, hôm trước mình giống ếch, hôm nay mình lại giống cá. Chẳng sao, con nào cũng biết bơi mà. Giống như mình ấy.",
  "Bài 7": "Hôm nay, mình vào bếp cùng mẹ và học được công thức làm món trứng đúc thịt. Món này dễ làm mà lại ngon. Mình chia sẻ với các bạn. Các bạn thử tham khảo nhé!\n\nCÁCH LÀM\nTrứng đúc thịt\n\nNGUYÊN LIỆU\nTrứng gà: 3 quả\nThịt nạc vai: 1 lạng\nDầu ăn, nước mắm, muối, hành khô\n\nCÁC BƯỚC THỰC HIỆN\n- Rửa sạch thịt, băm nhỏ hoặc xay nhuyễn.\n- Đập trứng vào bát, cho thêm thịt xay, hành khô băm nhỏ, một chút muối, một chút nước mắm, đánh đều.\n- Cho dầu ăn vào chảo, đun nóng. Cho hỗn hợp trứng và thịt vào dàn đều khắp chảo, rán vàng mặt dưới (từ 5 - 7 phút) với lửa nhỏ. Lật mặt còn lại, rán vàng.\n- Bày ra đĩa."
};

function inject() {
  const jsonPath = path.join(process.cwd(), 'docs', 'Assement Studio', 'Tieng_Viet_3_Tap1_JSON', 'chu_diem_1_exams.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  data.exams[0].questions.forEach((q: any) => {
    if (q.skill === 'đọc_hiểu' || (q.lesson && q.lesson.includes('diễn biến'))) {
      if (q.lesson.includes('Bài 1')) {
        q.reading_passage = passages['Bài 1'];
      } else if (q.lesson.includes('Bài 5')) {
        q.reading_passage = passages['Bài 5'];
      } else if (q.lesson.includes('Bài 7')) {
        q.reading_passage = passages['Bài 7'];
      }
    }
  });

  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  console.log('Injected passages successfully!');
}
inject();
