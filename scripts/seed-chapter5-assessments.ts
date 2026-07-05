import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
    env[key] = val;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase URL or Service Role Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- PREREQUISITE QUESTIONS (Grade 6 Data Handling) ---
const PREREQ_POOL = [
  { question: "Biểu đồ tranh dùng các biểu tượng để biểu diễn:", options: ["Số lượng dữ liệu", "Thời gian", "Tên đối tượng", "Tỉ lệ phần trăm"], correct_index: 0, explanation: "Mỗi biểu tượng thay thế cho một số lượng đơn vị nhất định.", difficulty: 1.0 },
  { question: "Biểu đồ cột dùng để làm gì?", options: ["So sánh số liệu giữa các đối tượng", "Thể hiện xu hướng thời gian", "So sánh cơ cấu phần trăm", "Tính toán trung bình"], correct_index: 0, explanation: "Biểu đồ cột trực quan hóa số lượng tuyệt đối để dễ so sánh.", difficulty: 1.0 },
  { question: "Dữ liệu thu thập được từ một cuộc điều tra thường được ghi vào:", options: ["Bảng dữ liệu ban đầu", "Bản đồ", "Hình vẽ", "Sách giáo khoa"], correct_index: 0, explanation: "Bảng dữ liệu ban đầu là nơi ghi nhận kết quả thô.", difficulty: 1.0 },
  { question: "Trong biểu đồ cột, chiều cao của cột thể hiện:", options: ["Số liệu của đối tượng", "Tên đối tượng", "Độ rộng của dữ liệu", "Màu sắc dữ liệu"], correct_index: 0, explanation: "Cột càng cao thì số liệu càng lớn.", difficulty: 1.0 },
  { question: "Nếu 1 biểu tượng 🍎 đại diện cho 5 quả táo. Vậy 4 biểu tượng 🍎🍎🍎🍎 đại diện cho bao nhiêu quả?", options: ["20 quả", "15 quả", "25 quả", "10 quả"], correct_index: 0, explanation: "$4 \\cdot 5 = 20$.", difficulty: 1.0 },
  { question: "Bảng thống kê giúp chúng ta:", options: ["Dễ dàng theo dõi và so sánh dữ liệu", "Làm cho dữ liệu khó hiểu hơn", "Tăng số lượng dữ liệu", "Thay thế cho việc quan sát"], correct_index: 0, explanation: "Bảng thống kê sắp xếp dữ liệu khoa học.", difficulty: 1.0 },
  { question: "Kết quả kiểm tra môn Toán của một tổ: 7, 8, 9, 8, 10. Điểm 8 xuất hiện bao nhiêu lần?", options: ["2 lần", "1 lần", "3 lần", "4 lần"], correct_index: 0, explanation: "Đếm số lần xuất hiện của số 8.", difficulty: 1.0 },
  { question: "Loại biểu đồ nào thể hiện số liệu dưới dạng các cột đứng?", options: ["Biểu đồ cột", "Biểu đồ tranh", "Biểu đồ quạt", "Sơ đồ đoạn thẳng"], correct_index: 0, explanation: "Đặc điểm của biểu đồ cột.", difficulty: 1.0 },
  { question: "Trong biểu đồ cột kép, ta có thể so sánh:", options: ["Từng cặp số liệu của hai đại lượng", "Chỉ một đại lượng duy nhất", "Tỉ lệ phần trăm", "Diện tích hình tròn"], correct_index: 0, explanation: "Cột kép dùng so sánh song song.", difficulty: 1.2 },
  { question: "Khi đọc biểu đồ cột, trục nằm ngang thường ghi:", options: ["Tên các đối tượng", "Số lượng", "Đơn vị tính", "Thời gian chính xác"], correct_index: 0, explanation: "Đối tượng khảo sát nằm trên trục ngang.", difficulty: 1.0 },
  { question: "Để tìm hiểu môn thể thao yêu thích của học sinh lớp 6A, ta nên dùng phương pháp nào?", options: ["Khảo sát (lập phiếu hỏi)", "Làm thí nghiệm", "Quan sát ảnh vệ tinh", "Tra cứu lịch sử"], correct_index: 0, explanation: "Khảo sát trực tiếp là nhanh nhất.", difficulty: 1.0 },
  { question: "Dữ liệu là số được gọi là gì?", options: ["Số liệu", "Chữ liệu", "Hình ảnh", "Video"], correct_index: 0, explanation: "Thuật ngữ toán học.", difficulty: 1.0 },
  { question: "Biểu đồ cột kép thường có:", options: ["Hai cột đứng cạnh nhau cho mỗi đối tượng", "Một cột duy nhất", "Một hình tròn", "Các đoạn nối tiếp"], correct_index: 0, explanation: "Cấu tạo biểu đồ cột kép.", difficulty: 1.2 },
  { question: "Dựa vào bảng số liệu, nếu số lượng học sinh giỏi là 15, khá là 20. Tổng số học sinh là:", options: ["35", "5", "300", "15"], correct_index: 0, explanation: "$15 + 20 = 35$.", difficulty: 1.0 },
  { question: "Tên biểu đồ thường được đặt ở vị trí nào?", options: ["Phía trên hoặc phía dưới biểu đồ", "Trong các cột", "Ở trục đứng", "Ở trục ngang"], correct_index: 0, explanation: "Vị trí tiêu đề biểu đồ.", difficulty: 1.0 }
];

// --- BAI 13: THU THAP VA PHAN LOAI ---
const BAI_13_SPECIFIC = [
  { question: "Dữ liệu nào sau đây là dữ liệu định tính (không phải số)?", options: ["Tên các loài hoa", "Số lượng cánh hoa", "Chiều cao của cây", "Nhiệt độ phòng"], correct_index: 0, explanation: "Tên gọi là chữ.", difficulty: 1.0 },
  { question: "Dãy số liệu nào là không hợp lí về tuổi của học sinh lớp 7?", options: ["$12, 13, 14, 80$", "$12, 13$", "$13, 13, 14$", "$12, 12, 13$"], correct_index: 0, explanation: "80 tuổi không thể là học sinh lớp 7.", difficulty: 1.0 },
  { question: "Khi thu thập dữ liệu bằng phiếu hỏi, ta cần đảm bảo câu hỏi:", options: ["Rõ ràng, dễ hiểu, bám sát mục đích", "Càng dài càng tốt", "Phải là câu hỏi mẹo", "Không liên quan đến chủ đề"], correct_index: 0, explanation: "Nguyên tắc lập phiếu hỏi.", difficulty: 1.0 },
  { question: "Dữ liệu điểm thi: $5; 7; 8; 11; 9$. Giá trị nào bất hợp lý?", options: ["$11$", "$5$", "$9$", "Không có giá trị nào"], correct_index: 0, explanation: "Điểm tối đa là 10.", difficulty: 1.0 },
  { question: "Phân loại dữ liệu giúp chúng ta:", options: ["Lựa chọn cách biểu diễn và xử lý phù hợp", "Làm dữ liệu đẹp hơn", "Tăng kích thước dữ liệu", "Giảm thời gian đọc"], correct_index: 0, explanation: "Mục đích phân loại.", difficulty: 1.2 },
  { question: "Số điện thoại có định dạng: 0912... là loại dữ liệu gì?", options: ["Dữ liệu không phải là số (định danh)", "Số liệu (định lượng)", "Dữ liệu thực nghiệm", "Dữ liệu quan sát"], correct_index: 0, explanation: "Số điện thoại dùng để định danh, không dùng để tính toán cộng trừ.", difficulty: 1.5 },
  { question: "Nguồn dữ liệu nào sau đây được coi là gián tiếp?", options: ["Tra cứu từ Internet", "Phát phiếu khảo sát", "Quan sát thực tế", "Làm thí nghiệm"], correct_index: 0, explanation: "Dữ liệu có sẵn từ nguồn khác.", difficulty: 1.2 },
  { question: "Một khảo sát về sở thích phim ảnh chỉ hỏi 3 bạn trong lớp 40 người có đảm bảo đại diện không?", options: ["Không đảm bảo vì mẫu quá nhỏ", "Đảm bảo vì các bạn trung thực", "Đảm bảo vì là khảo sát trực tiếp", "Đảm bảo vì 3 là số lẻ"], correct_index: 0, explanation: "Cần số lượng mẫu đủ lớn.", difficulty: 1.2 },
  { question: "Dữ liệu 'Hạng kiểm: Tốt, Khá, Trung bình' là loại dữ liệu gì?", options: ["Dữ liệu định tính", "Dữ liệu số", "Số liệu", "Dữ liệu đo lường"], correct_index: 0, explanation: "Hạng kiểm là tính chất.", difficulty: 1.0 },
  { question: "Kiểm tra tính hợp lí của dữ liệu dân số một xã: 1000 người, -50 người, 1200 người. Số nào sai?", options: ["$-50$ người", "$1000$ người", "$1200$ người", "Không có số nào sai"], correct_index: 0, explanation: "Dân số không thể âm.", difficulty: 1.0 }
];

// --- BAI 14: BIEU DO QUAT TRON ---
const BAI_14_SPECIFIC = [
  { question: "Hình tròn trong biểu đồ quạt đại diện cho bao nhiêu phần trăm?", options: ["$100\\%$", "$50\\%$", "$360\\%$", "$10\\%$"], correct_index: 0, explanation: "Toàn bộ dữ liệu.", difficulty: 1.0 },
  { question: "Nếu một thành phần chiếm nửa hình tròn thì tỉ lệ là:", options: ["$50\\%$", "$25\\%$", "$100\\%$", "$75\\%$"], correct_index: 0, explanation: "$1/2 = 50%$.", difficulty: 1.0 },
  { question: "Tổng các tỉ lệ phần trăm ghi trên biểu đồ quạt tròn là:", options: ["$100\\%$", "$360\\%$", "$90\\%$", "$50\\%$"], correct_index: 0, explanation: "Bắt buộc bằng 100%.", difficulty: 1.0 },
  { question: "Một hình quạt có góc ở tâm $90^\\circ$ chiếm tỉ lệ:", options: ["$25\\%$", "$50\\%$", "$10\\%$", "$75\\%$"], correct_index: 0, explanation: "$90/360 = 25%$.", difficulty: 1.2 },
  { question: "Biểu đồ quạt có 4 phần bằng nhau. Mỗi phần chiếm:", options: ["$25\\%$", "$20\\%$", "$50\\%$", "$40\\%$"], correct_index: 0, explanation: "$100 : 4 = 25%$.", difficulty: 1.0 },
  { question: "Thành phần A chiếm 40%, thành phần B chiếm 35%. Còn lại là C. Tính C.", options: ["$25\\%$", "$35\\%$", "$15\\%$", "$20\\%$"], correct_index: 0, explanation: "$100 - (40+35) = 25$.", difficulty: 1.2 },
  { question: "Diện tích hình quạt càng lớn thì tỉ lệ phần trăm:", options: ["Càng cao", "Càng thấp", "Không đổi", "Bằng 0"], correct_index: 0, explanation: "Tỷ lệ thuận.", difficulty: 1.0 },
  { question: "Biểu đồ quạt tròn phù hợp nhất để thể hiện:", options: ["Cơ cấu phần trăm các thành phần", "Xu hướng tăng trưởng qua 10 năm", "So sánh chiều cao chính xác", "Lịch trình làm việc"], correct_index: 0, explanation: "Chuyên dùng cho cơ cấu.", difficulty: 1.0 },
  { question: "Để vẽ biểu đồ quạt tròn, ta thường bắt đầu bằng cách vẽ một:", options: ["Hình tròn", "Hình vuông", "Trục tọa độ", "Đường thẳng"], correct_index: 0, explanation: "Cấu tạo cơ bản.", difficulty: 1.0 },
  { question: "Nếu tổng số học sinh là 200, thành phần 'Thích Toán' chiếm 30%. Số học sinh thích Toán là:", options: ["60 học sinh", "30 học sinh", "20 học sinh", "100 học sinh"], correct_index: 0, explanation: "$200 \\cdot 0.3 = 60$.", difficulty: 1.5 }
];

// --- BAI 15: BIEU DO DOAN THANG ---
const BAI_15_SPECIFIC = [
  { question: "Trục ngang của biểu đồ đoạn thẳng thường ghi gì?", options: ["Thời gian", "Số lượng", "Tên người", "Đơn vị"], correct_index: 0, explanation: "Quy ước biểu đồ.", difficulty: 1.0 },
  { question: "Đoạn thẳng nằm ngang thể hiện đại lượng:", options: ["Không thay đổi", "Tăng mạnh", "Giảm mạnh", "Biến thiên liên tục"], correct_index: 0, explanation: "Giá trị bằng nhau.", difficulty: 1.0 },
  { question: "Đoạn thẳng đi lên từ trái sang phải thể hiện:", options: ["Xu hướng tăng", "Xu hướng giảm", "Không đổi", "Giá trị bằng 0"], correct_index: 0, explanation: "Giá trị tăng dần theo thời gian.", difficulty: 1.0 },
  { question: "Điểm trên biểu đồ đoạn thẳng biểu thị:", options: ["Giá trị tại một thời điểm", "Tổng cộng", "Tỉ lệ phần trăm", "Tên biểu đồ"], correct_index: 0, explanation: "Dòng từ trục ngang và trục đứng.", difficulty: 1.0 },
  { question: "Biểu đồ đoạn thẳng dùng để biểu diễn:", options: ["Sự thay đổi theo thời gian", "So sánh các danh mục", "Cơ cấu thành phần", "Mật độ dân số"], correct_index: 0, explanation: "Ưu điểm của biểu đồ đoạn thẳng.", difficulty: 1.0 },
  { question: "Nếu giá trị tại mốc 1 là 50, mốc 2 là 30. Xu hướng là:", options: ["Giảm", "Tăng", "Không đổi", "Gấp đôi"], correct_index: 0, explanation: "$30 < 50$.", difficulty: 1.0 },
  { question: "Trục đứng của biểu đồ đoạn thẳng thường ghi:", options: ["Số liệu của đại lượng quan tâm", "Thời gian", "Tên các năm", "Tiêu đề"], correct_index: 0, explanation: "Hệ trục tọa độ biểu đồ.", difficulty: 1.0 },
  { question: "Để so sánh doanh thu 5 năm qua, ta nên dùng:", options: ["Biểu đồ đoạn thẳng", "Biểu đồ quạt", "Hình vẽ", "Bảng chữ"], correct_index: 0, explanation: "Thể hiện biến động thời gian.", difficulty: 1.2 },
  { question: "Độ dốc của đoạn thẳng càng lớn thì:", options: ["Đại lượng thay đổi càng nhanh", "Đại lượng không đổi", "Đại lượng thay đổi chậm", "Đại lượng bằng 100"], correct_index: 0, explanation: "Tính chất hình học.", difficulty: 1.5 },
  { question: "Có thể có nhiều đường biểu diễn trên cùng một biểu đồ đoạn thẳng không?", options: ["Có, để so sánh giữa các đối tượng", "Không bao giờ", "Chỉ được vẽ một đường", "Chỉ vẽ được đường nằm ngang"], correct_index: 0, explanation: "Biểu đồ đoạn thẳng kép.", difficulty: 1.2 }
];

// --- LUYEN TAP CHUNG ---
const LUYEN_TAP_SPECIFIC = [
  { question: "Dữ liệu định lượng là dữ liệu:", options: ["Biểu thị bằng số", "Biểu thị bằng chữ", "Biểu thị bằng hình ảnh", "Không thể đo lường"], correct_index: 0, explanation: "Số liệu.", difficulty: 1.0 },
  { question: "Loại biểu đồ nào tốt nhất để so sánh cơ cấu chi tiêu của gia đình?", options: ["Biểu đồ quạt tròn", "Biểu đồ đoạn thẳng", "Biểu đồ tranh", "Biểu đồ cột"], correct_index: 0, explanation: "Cơ cấu phần trăm.", difficulty: 1.0 },
  { question: "Dãy số liệu nhiệt độ ($^\\circ C$): $25; 28; 100; 26$. Số nào nghi ngờ sai?", options: ["$100$", "$25$", "$28$", "Không có số nào"], correct_index: 0, explanation: "Nhiệt độ thời tiết không thể 100°C.", difficulty: 1.0 },
  { question: "Để thể hiện lượng mưa các tháng trong năm, ta dùng:", options: ["Biểu đồ đoạn thẳng hoặc biểu đồ cột", "Biểu đồ quạt tròn", "Hình tròn", "Bảng tên"], correct_index: 0, explanation: "Dữ liệu theo thời gian.", difficulty: 1.0 },
  { question: "Tổng tỷ lệ phần trăm trong biểu đồ quạt tròn là:", options: ["$100\\%$", "$360\\%$", "$200\\%$", "$50\\%$"], correct_index: 0, explanation: "Quy tắc 100%.", difficulty: 1.0 },
  { question: "Đoạn thẳng trên biểu đồ dốc xuống thể hiện sự:", options: ["Giảm", "Tăng", "Bình ổn", "Không thay đổi"], correct_index: 0, explanation: "Xu hướng.", difficulty: 1.0 },
  { question: "Mẫu khảo sát cần đảm bảo tính:", options: ["Đại diện", "Ngẫu nhiên và đủ lớn", "Đúng đối tượng", "Tất cả các ý trên"], correct_index: 3, explanation: "Nguyên tắc thống kê.", difficulty: 1.2 },
  { question: "Nếu một đối tượng chiếm 10% trong tổng số 500 người, số người là:", options: ["50 người", "10 người", "100 người", "5 người"], correct_index: 0, explanation: "$500 \\cdot 0.1 = 50$.", difficulty: 1.2 },
  { question: "Dữ liệu 'Họ và tên' là:", options: ["Dữ liệu định tính", "Dữ liệu định lượng", "Số liệu", "Dữ liệu đo lường"], correct_index: 0, explanation: "Không phải số.", difficulty: 1.0 },
  { question: "Biểu đồ đoạn thẳng có điểm cao nhất tương ứng với giá trị:", options: ["Lớn nhất", "Nhỏ nhất", "Trung bình", "Khởi đầu"], correct_index: 0, explanation: "Trục đứng y cao nhất.", difficulty: 1.0 }
];

// --- ON TAP CHUONG 5 ---
const ON_TAP_SPECIFIC = [
  { question: "Dữ liệu thu thập được có thể là:", options: ["Số hoặc không phải là số", "Chỉ là số", "Chỉ là chữ", "Chỉ là hình ảnh"], correct_index: 0, explanation: "Tính đa dạng của dữ liệu.", difficulty: 1.0 },
  { question: "Biểu đồ quạt tròn biểu diễn dữ liệu dưới dạng:", options: ["Tỉ lệ phần trăm", "Độ dài cm", "Khối lượng kg", "Số lượng con người"], correct_index: 0, explanation: "Đơn vị thường dùng trên quạt.", difficulty: 1.0 },
  { question: "Xu hướng thay đổi dân số thường được vẽ bằng:", options: ["Biểu đồ đoạn thẳng", "Biểu đồ quạt tròn", "Biểu đồ tranh", "Hình tam giác"], correct_index: 0, explanation: "Đại lượng theo thời gian.", difficulty: 1.0 },
  { question: "Để dữ liệu có tính hợp lí, nó cần:", options: ["Phù hợp với thực tế và đúng định dạng", "Phải là số nguyên", "Càng lớn càng tốt", "Phải là số dương"], correct_index: 0, explanation: "Kiểm tra tính hợp lí.", difficulty: 1.2 },
  { question: "Một hình tròn tương ứng với góc bao nhiêu độ?", options: ["$360^\\circ$", "$180^\\circ$", "$90^\\circ$", "$100^\\circ$"], correct_index: 0, explanation: "Góc ở tâm hình tròn.", difficulty: 1.0 },
  { question: "Nếu tỉ lệ phần trăm của 4 phần là bằng nhau, mỗi phần chiếm:", options: ["$25\\%$", "$20\\%$", "$50\\%$", "$100\\%$"], correct_index: 0, explanation: "$100 : 4 = 25$.", difficulty: 1.0 },
  { question: "Biểu đồ đoạn thẳng giúp ta nhận xét nhanh về:", options: ["Sự tăng, giảm của đại lượng", "Màu sắc của đối tượng", "Vị trí địa lý", "Tên các thành viên"], correct_index: 0, explanation: "Trực quan hóa xu hướng.", difficulty: 1.0 },
  { question: "Dữ liệu 'Điểm trung bình học kì' là:", options: ["Dữ liệu số (số liệu)", "Dữ liệu không phải là số", "Dữ liệu quan sát", "Dữ liệu định tính"], correct_index: 0, explanation: "Số liệu thực tế.", difficulty: 1.0 },
  { question: "Trong biểu đồ quạt, phần nào lớn nhất thì thành phần đó:", options: ["Chiếm tỉ lệ cao nhất", "Chiếm tỉ lệ thấp nhất", "Bằng 0", "Không xác định"], correct_index: 0, explanation: "Diện tích tương ứng tỉ lệ.", difficulty: 1.0 },
  { question: "Việc thu thập dữ liệu có thể thực hiện bằng:", options: ["Nhiều cách khác nhau (khảo sát, thí nghiệm, quan sát...)", "Chỉ một cách duy nhất", "Đọc sách giáo khoa", "Ngồi suy đoán"], correct_index: 0, explanation: "Phương pháp thu thập.", difficulty: 1.0 }
];

// Helper to shuffle array and take N
function getQuestions(prereqPool: any[], specificPool: any[], count: number = 20) {
  const shuffledPrereq = [...prereqPool].sort(() => 0.5 - Math.random());
  const shuffledSpecific = [...specificPool].sort(() => 0.5 - Math.random());
  
  // Take 10 from each to make 20
  return [...shuffledPrereq.slice(0, 10), ...shuffledSpecific.slice(0, 10)];
}

async function seed() {
  console.log("🚀 Starting Chapter 5 assessments seeding...");

  // 1. Fetch Subject Math
  const { data: subject } = await supabase
    .from('universal_subjects')
    .select('id')
    .eq('slug', 'toan')
    .single();

  if (!subject) {
    console.error("❌ Subject 'toan' not found!");
    process.exit(1);
  }

  // 2. Ensure curriculum_units entry for Chapter 5
  console.log("Ensuring curriculum_units entry for Chapter 5...");
  const { data: existingUnit } = await supabase
    .from('curriculum_units')
    .select('id')
    .eq('subject', 'toan')
    .eq('grade', 7)
    .eq('unit_number', 5)
    .maybeSingle();

  let unitId = '';
  if (existingUnit) {
    unitId = existingUnit.id;
    console.log(`✅ curriculum_units already exists (ID: ${unitId})`);
  } else {
    const { data: newUnit, error: unitError } = await supabase
      .from('curriculum_units')
      .insert({
        subject: 'toan',
        grade: 7,
        title: 'Chương 5: Thu thập và biểu diễn dữ liệu',
        unit_number: 5,
        subject_id: subject.id,
        book_name: 'Toán 7 - Kết nối tri thức'
      })
      .select()
      .single();

    if (unitError) {
      console.error("❌ Error inserting curriculum_units:", unitError.message);
      process.exit(1);
    }
    unitId = newUnit.id;
    console.log(`✅ curriculum_units created (ID: ${unitId})`);
  }

  // 3. Ensure assessment_collections for Chapter 5
  const collectionTitle = 'Toán 7 - Tập 1 (Chương 5)';
  const { data: existingCol } = await supabase
    .from('assessment_collections')
    .select('id, units')
    .eq('subject_slug', 'toan')
    .eq('grade', 7)
    .eq('title', collectionTitle)
    .maybeSingle();

  let collectionId = '';
  if (existingCol) {
    collectionId = existingCol.id;
    console.log(`✅ assessment_collections already exists (ID: ${collectionId})`);
  } else {
    const { data: newCol, error: colError } = await supabase
      .from('assessment_collections')
      .insert({
        title: collectionTitle,
        subject_slug: 'toan',
        grade: 7,
        volume: 1,
        units: [5],
        status: 'published'
      })
      .select()
      .single();

    if (colError) {
      console.error("❌ Error inserting assessment_collections:", colError.message);
      process.exit(1);
    }
    collectionId = newCol.id;
    console.log(`✅ assessment_collections created (ID: ${collectionId})`);
  }

  // 4. Ensure "Luyện tập chung" node exists in curriculum_nodes for Chapter 5
  console.log("Ensuring 'Luyện tập chung' node exists for Chapter 5...");
  const { data: source } = await supabase.from('content_sources').select('id').eq('slug', 'toan-7-ket-noi').single();
  const { data: chapterNode } = await supabase.from('curriculum_nodes').select('id').eq('slug', 'chuong-5-thu-thap-bieu-dien-du-lieu').single();
  
  if (source && chapterNode) {
    const { data: ltcNode } = await supabase
      .from('curriculum_nodes')
      .upsert({
        source_id: source.id,
        parent_id: chapterNode.id,
        type: 'lesson',
        slug: 'luyen-tap-chung-chuong-5',
        title: 'Luyện tập chung (Chương 5)',
        path: `toan_7.chuong_5.luyen_tap_chung`,
        depth: 2,
        sort_key: 4, // After Lesson 15
        metadata: { skill_focus: 'grammar' }
      }, { onConflict: 'source_id,slug' })
      .select()
      .single();
    
    if (ltcNode) {
       console.log("✅ 'Luyện tập chung' node ensured.");
       // Link concept
       const { data: concept } = await supabase.from('concepts').upsert({
        source_id: source.id,
        slug: 'concept-luyen-tap-chung-chuong-5',
        title: `Kiến thức Luyện tập chung (Chương 5)`,
        description: `Ôn tập tổng hợp về thu thập dữ liệu và biểu đồ.`
      }, { onConflict: 'slug' }).select().single();

      if (concept) {
        await supabase.from('lesson_concepts').upsert({
          lesson_id: ltcNode.id,
          concept_id: concept.id
        }, { onConflict: 'lesson_id,concept_id' });
      }
    }
  }

  // Define mapping for lesson mappings
  const LESSON_MAPPINGS = [
    {
      slug: 'bai-13-thu-thap-phan-loai-du-lieu',
      conceptSlug: 'concept-bai-13-thu-thap-phan-loai-du-lieu',
      titlePrefix: "Bài 13: Thu thập và phân loại dữ liệu",
      specificPool: BAI_13_SPECIFIC
    },
    {
      slug: 'bai-14-bieu-do-hinh-quat-tron',
      conceptSlug: 'concept-bai-14-bieu-do-hinh-quat-tron',
      titlePrefix: "Bài 14: Biểu đồ hình quạt tròn",
      specificPool: BAI_14_SPECIFIC
    },
    {
      slug: 'bai-15-bieu-do-doan-thang',
      conceptSlug: 'concept-bai-15-bieu-do-doan-thang',
      titlePrefix: "Bài 15: Biểu đồ đoạn thẳng",
      specificPool: BAI_15_SPECIFIC
    },
    {
        slug: 'luyen-tap-chung-chuong-5',
        conceptSlug: 'concept-luyen-tap-chung-chuong-5',
        titlePrefix: "Luyện tập chung (Chương 5)",
        specificPool: LUYEN_TAP_SPECIFIC
    },
    {
        slug: 'kiem-tra-chuong-5',
        conceptSlug: 'concept-kiem-tra-chuong-5',
        titlePrefix: "Ôn tập chương 5",
        specificPool: ON_TAP_SPECIFIC
    }
  ];

  for (const lessonMapping of LESSON_MAPPINGS) {
    console.log(`\n-------------------------------------`);
    console.log(`Processing: ${lessonMapping.slug}`);

    const { data: lessonNode } = await supabase.from('curriculum_nodes').select('id').eq('slug', lessonMapping.slug).single();
    const { data: concept } = await supabase.from('concepts').select('id').eq('slug', lessonMapping.conceptSlug).single();

    if (!lessonNode || !concept) {
      console.error(`❌ Node or Concept not found for ${lessonMapping.slug}`);
      continue;
    }

    // Clear previous
    await supabase.from('exercise_sets').delete().eq('metadata->>node_id', lessonNode.id).like('title', 'Đề luyện tập số%');
    const { data: existingExams } = await supabase.from('exams').select('id').eq('collection_id', collectionId).like('title', `${lessonMapping.titlePrefix}%`);
    if (existingExams && existingExams.length > 0) {
      const ids = existingExams.map(e => e.id);
      await supabase.from('exam_questions').delete().in('exam_id', ids);
      await supabase.from('exams').delete().in('id', ids);
    }

    for (let i = 1; i <= 4; i++) {
      const title = `Đề luyện tập số ${i}: ${lessonMapping.titlePrefix}`;
      console.log(`  -> Creating exam: ${title}`);

      const { data: exSet } = await supabase.from('exercise_sets').insert({
        title, type: 'practice', metadata: { node_id: lessonNode.id, concept_id: concept.id, sequence: i }
      }).select().single();

      const { data: exam } = await supabase.from('exams').insert({
        collection_id: collectionId, title, exam_number: i, total_questions: 20, generation_mode: 'balanced'
      }).select().single();

      if (exSet && exam) {
        const questions = getQuestions(PREREQ_POOL, lessonMapping.specificPool, 20);
        for (let qIdx = 0; qIdx < questions.length; qIdx++) {
          const q = questions[qIdx];
          const { data: newQ } = await supabase.from('question_bank').insert({
            concept_id: concept.id, type: 'multiple_choice', difficulty: q.difficulty || 1.2,
            metadata_json: { question: q.question, options: q.options, correct_index: q.correct_index, explanation: q.explanation },
            source: 'handcrafted', status: 'approved', grade: 7, subject_slug: 'toan'
          }).select().single();

          if (newQ) {
            await supabase.from('exercise_questions').insert({ set_id: exSet.id, question_id: newQ.id, sort_key: qIdx });
            await supabase.from('exam_questions').insert({ exam_id: exam.id, question_bank_id: newQ.id, order_index: qIdx });
          }
        }
        console.log(`    ✅ Inserted 20 questions.`);
      }
    }
  }

  console.log("\n🎉 Chapter 5 assessments seeding completed successfully!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
