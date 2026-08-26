# Prompt cho Claude Design - mock UI "Kame to Taipei"

Cách dùng: mở Claude Design, đính kèm 4 ảnh (hero-home.png, poster-day2.png, pose-cheer.png, food-bubbletea.png trong bộ asset đã xử lý) rồi dán nguyên khối dưới đây. Đính ảnh là bắt buộc, vì mock phải xây quanh tranh thật chứ không phải placeholder.

---

Design a mobile app UI (390px width, iOS) for "カメと台北" - a Japanese-language app that teaches a 16-year-old Japanese student practical Mandarin phrases for a 3-day trip to Taipei. The attached images are the app's real illustration assets (hero scene, a day poster, the mascot cheering, a bubble tea spot illustration). Build the UI around them - do not replace them with icons, emoji, stock photos or your own illustrations. Every image in the UI must be one of the attached assets or an empty slot clearly labeled for one.

Art direction - "warm paper travel journal":
- Background: cream paper #FBF2DC, deeper cream #F2E4C6 for sections
- Text: deep green ink #2F5E52, soft #6B8579 for secondary
- Accents: turtle-shell green #8FC9A8 (deep #4E9E85), lantern red #D9483F for the single primary CTA, backpack orange #E08A4A for progress and highlights, border sand #E8D5A9
- Typography: rounded Japanese (Zen Maru Gothic feel) for UI text; Traditional Chinese phrases in a handwritten-brush style (LXGW WenKai TC feel), always the largest element on a phrase card
- Shapes: large radius 16-24px, thin sand borders, primary buttons with a solid 4px bottom shadow like a physical pressable button
- Absolutely no glossy gradients, no glassmorphism, no icon fonts, no emoji. Navigation may use minimal thin-stroke arrows and a speaker glyph only

Screens to mock (5 artboards):

1. Home: greeting 你好！/ 台北へ、いこう, countdown pill 出発まで あと24日, the attached hero image full-bleed in a rounded card, three level cards (Day 1 台北にとうちゃく / Day 2 九份とゆうやけ / Day 3 おみやげとバイバイ) each with a small progress ring, big red button つづきから, bottom nav with 5 Japanese labels ホーム・旅・ポスター・ことば・シール

2. Phrase learn card: eyebrow "Day 3・タピオカを注文する", the bubble tea illustration centered, then the 4-layer phrase: 珍珠奶茶 (largest, brush style), zhēn zhū nǎi chá (pinyin, green), タピオカミルクティー (Japanese meaning), ジェンジュー ナイチャー (small katakana hint with dot separators), outlined pill button 発音を聞く with speaker glyph, thin progress bar on top at 40%

3. Practice - matching: title ペアをつくろう, green progress bar 60%, grid of 8 rounded tiles (4 hanzi: 半糖・少冰・大杯・好喝 and 4 Japanese: 甘さ半分・氷少なめ・Lサイズ・おいしい), one matched pair shown faded with a subtle check, one selected tile with green border

4. Lesson complete: the attached cheering mascot large and centered, レッスンクリア！, +1 シール reward chip, a row of 3 small circular sticker slots (1 filled, 2 empty), secondary button つぎのレッスンへ and text link ホームにもどる

5. Trip day detail: header Day 2・9月20日(日), vertical timeline 10:00 台北101 / 12:30 小籠包のお店 / 15:00 九份へ移動 / 17:30 九份老街, the attached day poster as a tappable thumbnail card on top, each timeline row with a small れんしゅう button

Tone: warm, storybook, but teen-appropriate - use normal kanji in all Japanese copy, never all-hiragana baby style. Show all 5 artboards on the cream paper background, consistent spacing, ready to be translated into Tailwind components.

---

Ghi chú khi nhận kết quả:
- Soi chữ Hán trong mock: phải là phồn thể (珍珠奶茶, 半糖), thấy giản thể ở đâu bắt sửa
- Mock chỉ để chốt layout và cảm giác, code thật vẫn theo kame-project-plan.md, nếu mock và plan lệch nhau thì plan thắng
- Nếu muốn vòng 2: yêu cầu riêng từng màn một và đính thêm asset liên quan (badge, poster khác) để mock sát hơn
