# KAME TO TAIPEI - Project Plan (bàn giao cho Claude Code)

Tài liệu này là nguồn sự thật duy nhất của dự án. Đọc hết trước khi viết dòng code nào.

## 1. Bối cảnh

App học tiếng Trung dạng game cho một bạn 16 tuổi người Nhật (sống ở Okinawa, đọc được kanji cơ bản) chuẩn bị đi Đài Bắc 3 ngày 2 đêm, khởi hành 2026-09-19, bay từ Naha khoảng 1 tiếng rưỡi.

App clone cấu trúc của "Pip to Japan" (app do Grok build, đã phân tích kỹ) và nâng cấp cho phù hợp đối tượng 16 tuổi. Mascot: chú rùa biển Okinawa (mai xanh có hoa hibiscus san hô, bụng kem, balo cam). Toàn bộ asset hình đã sinh xong bằng GPT Image 2 và đã xử lý sẵn.

Người dùng cuối là 1 người (cháu của chủ dự án), không cần backend, không cần đăng nhập, không thu thập dữ liệu.

## 2. Input có sẵn (không tự tạo lại)

| File | Nội dung |
|---|---|
| `kame-vocab.json` | 89 từ vựng, 3 level x 4 bài, kèm lịch trình từng ngày. Cấu trúc xem mục 4 |
| `kame-assets-processed.zip` | 43 asset đã cắt, nền trong suốt, webp + png, kèm `manifest.json` (tên, kích thước từng file). Giải nén thành `public/art/` |
| `kame-assets.md` | Prompt sinh ảnh gốc, dùng khi cần sinh lại hoặc sinh 3 tấm còn thiếu |

Asset còn thiếu (không chặn build, sinh sau): sticker có nhân vật (tạm dùng bộ `badge-*`), app icon (tạm crop `pose-wave`), màn hoàn thành (tạm dùng `pose-cheer`).

Quan trọng: KHÔNG tự vẽ SVG thay thế illustration, KHÔNG dùng icon font hay emoji làm hình. Chủ dự án cấm icon, mọi hình trong app phải là illustration đã sinh. Icon điều hướng (mũi tên back, loa) được phép dùng SVG stroke tối giản, ngoài ra không.

## 3. Đối chiếu app gốc Pip: giữ gì, nâng gì

### Giữ nguyên từ Pip (đã chứng minh hiệu quả)
- ~~PIN gate mở app~~ ĐÃ BỎ (chủ dự án chốt 2026-08-27): app mở thẳng vào Home, không hỏi mã. Code PIN cũ còn trong git history nếu cần lấy lại
- Home: lời chào + countdown ("台北まで あと N日"), thẻ level to, nút tiếp tục nổi bật
- Trang "Our trip": lịch trình thật từng ngày (giờ, địa điểm), mỗi ngày có nút nhảy vào bài học của ngày đó
- Level = pack độc lập: code-split theo level, vào level nào load level đó
- Library: poster từng ngày, bấm phóng to, từ poster nhảy sang bài học ngày đó
- Cơ chế học kiểu Duolingo (Pip đã sửa thành dạng này sau feedback): học hết từ trước, luyện tập sau, câu sai quay lại cuối bài, không timer, không tim, không phạt. Thanh tiến độ xanh trên đầu là thước đo duy nhất
- Phần thưởng: sao/sticker sau mỗi bài, bản đồ mở khóa dần theo ngày
- Travel Phrasebook: gom mọi từ đã học để tra lại
- Offline toàn phần sau lần mở đầu có mạng
- PWA cài lên home screen iPhone

### Nâng cấp so với Pip
- Đối tượng 16 tuổi: UI tiếng Nhật dùng kanji bình thường (台北, 出発), không viết toàn hiragana kiểu trẻ con, giọng copy thân thiện nhưng không dỗ trẻ
- Thẻ từ 4 lớp theo thứ tự: **chữ Hán phồn thể** (to nhất) → **pinyin** → **nghĩa tiếng Nhật** → katakana gần đúng (nhỏ, phụ). Đài Loan dùng phồn thể, tuyệt đối không để lọt giản thể
- Phát âm: Web Speech API `speechSynthesis`, voice `zh-TW`, không cloud voice, không API key. Đây là chỗ Pip phải trả tiền còn mình free
- Ngày đi lấy từ `_meta.tripDate` một chỗ duy nhất, countdown và ngày các level tự tính
- Bài "gọi trà sữa" (半糖/微糖/少冰/去冰) là bài đinh, cho nó một chút đặc biệt về trình bày nếu tiện
- Tiến độ lưu `localStorage` (app thật nên dùng được, không phải artifact), không cần Clerk/đăng nhập như Pip

## 4. Dữ liệu

`kame-vocab.json` cấu trúc:

```
_meta: { tripDate, tripDays, ... }
levels[3]:
  id, day, date, title (JP), subtitle, 
  schedule[]: { time, place, ja }
  lessons[4]:
    id (d1l1...), title (JP), scene (JP)
    words[6-8]: { hanzi, pinyin, ja, kana }
```

89 từ tổng. Data này đã được review, không tự sửa nội dung từ vựng. Nếu phát hiện lỗi chính tả tiếng Trung/Nhật thì báo lại chứ không tự đổi.

## 5. Stack và cấu trúc

- Next.js (App Router) + TypeScript + Tailwind, static export được càng tốt (`output: 'export'`) vì không có server logic. Nếu static export gây khó cho PWA plugin thì để default cũng được
- Deploy: Vercel (kết nối GitHub repo)
- Font self-host qua `next/font/local`, đã cắt subset (chốt 2026-08-27, kéo lên sớm từ chunk 5):
  - Tiếng Nhật + Latin: **Zen Maru Gothic** 400/500/700/900
  - Chữ Hán phồn thể: **LXGW WenKai TC** 400 (nét bút viết tay), fallback Noto Sans TC
  - `npm run fonts` cắt font còn đúng số chữ app dùng (~676 chữ, 463KB thay vì 18MB nếu để nguyên bộ CJK). `npm run build` tự chạy `check-fonts` và fail nếu copy mới có chữ chưa nằm trong subset
- State: React state + localStorage, không cần thư viện state ngoài
- Không thêm dependency nặng. Không UI kit. Tự viết component theo design tokens

### Design tokens (lấy từ chính bộ tranh, đã dùng trong POC)

```css
--paper:#FBF2DC;   /* nền kem giấy */
--paper-deep:#F2E4C6;
--ink:#2F5E52;     /* chữ chính, xanh đậm */
--ink-soft:#6B8579;
--sea:#8FC9A8;     /* xanh mai rùa */
--sea-deep:#4E9E85;
--lantern:#D9483F; /* đỏ đèn lồng, CTA */
--sand:#E8D5A9;    /* viền */
--gold:#E08A4A;    /* cam balo, accent */
--shell:#F5E9C0;
```

Bo góc lớn (16-24px), viền mảnh màu sand, nút CTA đỏ lantern có shadow đặc 4px phía dưới kiểu nút bấm vật lý. Không gradient bóng bẩy, không glassmorphism. Cảm giác chung: sổ tay du lịch giấy ấm.

### Routes

```
/            Home: hero-home.webp, chào, countdown, 3 thẻ level, nút つづきから
/trip        Lịch trình 3 ngày từ schedule[], mỗi ngày link tới bài học
/level/[id]  Danh sách 4 bài của level + tiến độ
/lesson/[id] Màn học (2 phase, xem mục 6)
/library     3 poster, bấm phóng to, link về ngày
/book        Phrasebook: mọi từ đã học, có nút nghe
/stickers    Bộ sticker đã đạt
```

Bottom nav 5 mục: Home / Trip / Library / Book / Stickers. Nhãn tiếng Nhật, dùng spot illustration nhỏ làm hình nav nếu vừa vặn, không thì chữ thuần.

## 6. Lesson engine (lõi app, làm kỹ nhất)

Phase 1 - Học (まなぶ):
- Lướt từng thẻ từ: illustration (map theo bảng mục 7) + hanzi to + pinyin + nghĩa JP + kana nhỏ
- Nút 発音を聞く phát TTS zh-TW đọc `hanzi`
- Next qua hết các từ, không hỏi gì cả

Phase 2 - Luyện (れんしゅう), trộn 3 dạng:
1. Ghép cặp: 4-5 cặp hanzi ↔ nghĩa JP, bấm 2 thẻ khớp thì mờ đi
2. Nghe chọn: phát TTS, chọn 1 trong 4 hanzi
3. Chọn nghĩa: hiện hanzi + pinyin, chọn 1 trong 4 nghĩa JP

- Sai: hiện đáp án đúng nhẹ nhàng ("おしい！"), câu đó đẩy lại cuối hàng đợi
- Đúng: "いいね！" và tiến thanh progress
- Xong bài: màn chúc mừng (tạm pose-cheer), +1 sticker, cập nhật localStorage

TTS hook lưu ý iOS Safari:
- `speechSynthesis.getVoices()` load async, phải nghe event `voiceschanged`
- Phát âm phải xuất phát từ user gesture (tap), không autoplay
- Chọn voice `lang === 'zh-TW'`, fallback `zh-CN` kèm ghi chú nhỏ, fallback cuối là không có nút loa
- `rate` khoảng 0.85 cho dễ nghe

## 7. Map từ vựng sang illustration

Không phải từ nào cũng có hình riêng, dùng hình theo scene của bài:

| Bài | Illustration chính |
|---|---|
| d1l1 chào hỏi | pose-wave |
| d1l2 EasyCard/MRT | go-card, go-mrt, pose-card |
| d1l3 hotel | pose-sleep |
| d1l4 chợ đêm | place-nightmarket, food-chicken, food-shavedice |
| d2l1 Taipei 101 | place-101, item-phone |
| d2l2 tiểu long bao | food-xiaolongbao, food-tea |
| d2l3 đi Cửu Phần | go-bus, go-map, pose-think |
| d2l4 老街 + trà | place-jiufen-stairs, place-teahouse, item-lantern, item-skylantern |
| d3l1 Ximending | place-ximending, item-bag, pose-point |
| d3l2 trà sữa | food-bubbletea |
| d3l3 quà + tính tiền | food-pineapplecake, item-coins, item-postcard |
| d3l4 bye bye | place-airport, go-plane, pose-surprise |

Mapping cụ thể từng từ để trong 1 file `art-map.ts`, từ nào không có hình hợp thì dùng hình scene của bài, không để ô trống xấu.

## 8. Offline / PWA

- `manifest.webmanifest`: name "カメと台北", theme màu paper, icon tạm crop vuông từ pose-wave (512, 192, apple-touch 180)
- Service worker: chiến lược precache-all vì tổng asset chỉ ~1.6MB webp + JS. Đọc danh sách file từ `public/art/manifest.json` + font + routes. Cách đơn giản nhất: viết SW tay (install: cache.addAll, fetch: cache-first, version bump để bust), hoặc dùng `@serwist/next` nếu ổn định với version Next hiện tại. KHÔNG dùng next-pwa bản cũ đã bỏ maintain
- Mục tiêu nghiệm thu: mở app 1 lần có mạng, bật airplane mode, reload, mọi thứ vẫn chạy kể cả hình và font. TTS dùng voice trên máy nên vẫn kêu

## 9. Trình tự build theo chunk

Làm đúng thứ tự, xong mỗi chunk DỪNG lại chờ chủ dự án review rồi mới đi tiếp (giống flow đã dùng với Grok):

| Chunk | Nội dung | Nghiệm thu |
|---|---|---|
| 1 | Scaffold + tokens + font + layout/bottom nav + Home tĩnh | Mở trên iPhone thấy Home đẹp, countdown đúng |
| 2 | Trip + Library + Level list (đọc từ vocab JSON) | Đi lại giữa các trang mượt, poster phóng to được |
| 3 | Lesson engine đủ 2 phase + TTS | Học trọn 1 bài trên iPhone thật, TTS kêu tiếng Trung |
| 4 | Progress localStorage + sticker + bản đồ mở khóa | Học xong bài thì sticker và bản đồ cập nhật, reload không mất |
| 5 | PWA + offline + deploy Vercel (subset font đã làm sớm ở chunk 2) | Test airplane mode pass, add to home screen có icon |
| 6 | Polish: transition, âm lượng chữ, empty state, tinh chỉnh theo review | Chủ dự án gật đầu |

Mỗi chunk kết thúc bằng: chạy được, không lỗi console, commit git message rõ ràng.

## 10. Những điều cấm

- Không giản thể ở bất kỳ đâu
- Không icon (trừ back/loa tối giản), không emoji trong UI
- Không thêm tính năng ngoài spec khi chưa hỏi
- Không gọi API ngoài nào hết (kể cả font CDN, font phải self-host qua next/font)
- Không sửa nội dung từ vựng
- Ký tự "—" không được xuất hiện trong UI copy lẫn tài liệu, dùng "-"

## 11. Sau khi xong

Còn dư credit sinh ảnh (~2700/3000), nếu review thấy chỗ nào cần hình riêng (ví dụ bài trà sữa muốn hình topping, màn 100% hoàn thành muốn cảnh riêng) thì ghi lại thành danh sách, chủ dự án sinh thêm theo template trong `kame-assets.md`.
