/* PM 的一天：人物、名詞、地方、主頁。
   全部都是虛構的：棲光科技、裡面的人、產品與事件，都與任何真實公司無關。 */

/* 主頁 */
HOME.title = 'PM 的一天';
HOME.sub = '在棲光科技接手一條工業電腦產品線的第二個禮拜';
HOME.fine = '棲光科技與裡面的人、產品、事件都是虛構的，與任何真實公司無關。';
/* 你自己的贊助連結（主頁與結算卡會顯示），例如：
   HOME.support = {url: 'https://buymeacoffee.com/你的名字', label: '☕ 喜歡的話，請我喝杯咖啡'};
   遊戲內容不能因為有沒有贊助而不同。 */
HOME.support = null;

/* 遊戲裡的人。
   STORY.cast：對話框與圖鑑裡的樣子（about 是圖鑑的介紹）。
   WORLD.cast：3D 場景裡的身體（只有真的在場的人）。 */
STORY.cast = {
  me: {name: '你', role: '產品經理（PM），剛接手新產品線', tag: '你', color: '#c98a00'},
  boss: {name: '周經理', role: '你的主管', tag: '主管', color: '#2b6bd6', about: '講話不快，但每個決定他都會問一句「為什麼」。'},
  sales: {name: '阿凱', role: '業務', tag: '業務', color: '#d6502b', about: '離客戶最近，所以最先聽到壞消息，也最先大聲說出來。'},
  lan: {name: '小嵐', role: '同事', tag: '同事', color: '#2f9a6a', about: '坐在你隔壁。抽屜裡永遠有餅乾，而且好像剛好知道你什麼時候需要。'}
};
WORLD.cast = {
  me: {label: '你・PM', fill: '#f2b01e', ink: '#231800', cloth: 0x3b4a5a, color: 0xc98a00, hair: 0x2b2320, node: 'start', face: Math.PI},
  boss: {label: '周經理・主管', fill: '#2b6bd6', ink: '#ffffff', cloth: 0x2f4f7f, color: 0x2b6bd6, hair: 0x1c1c1c, node: 'boss', face: -Math.PI / 2},
  sales: {label: '阿凱・業務', fill: '#d6502b', ink: '#ffffff', cloth: 0x8a3b2a, color: 0xd6502b, hair: 0x3a2a1c, node: 'sales', face: Math.PI / 2, hidden: true},
  lan: {label: '小嵐・同事', fill: '#2f9a6a', ink: '#ffffff', cloth: 0x3f7f64, color: 0x2f9a6a, hair: 0x4a2b1b, long: true, node: 'lan', face: 0}
};

/* 走過去用的地方（不是人）。這一幕只找人，所以先空著。 */
STORY.places = {};

/* 玩家可以點的詞，點了跳出白話解釋。[詞, 解釋]。同一個意思的幾種寫法用「 / 」隔開。 */
const GLOSS = [
  ['PM / 產品經理', '產品經理。負責決定做什麼產品、怎麼賣，並且在研發、業務、客戶之間協調，讓事情真的做出來。'],
  ['工業電腦', '專門放在工廠、機房這類嚴苛環境，要長時間不間斷運作的電腦。不像辦公室電腦，壞了就換一台。'],
  ['工業平板', '給工廠、倉庫這類現場用的平板電腦，比一般平板更耐用、更耐操。'],
  ['DC 圓頭線 / DC 圓頭 / DC plug', '一種傳統的圓形小插頭電源線，很多電子設備用它供電。'],
  ['Type-C', '一種扁扁的、正反都能插的插頭。現在很多手機、筆電、平板都用它來充電。'],
  ['轉接頭', '把一種插頭轉成另一種插頭的小配件。'],
  ['規格表', '把產品的尺寸、接頭、供電方式這些細節寫清楚的一張表。出貨前要靠它確認有沒有搞錯。'],
  ['業務', '負責跟客戶談生意、接訂單的同事。他們最了解客戶要什麼，也最常第一個接到客戶的抱怨。']
];
termsSet(GLOSS, ' / ', [], []);
