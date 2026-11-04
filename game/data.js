/* PM 的一天：人物、名詞、地方、主頁。
   全部都是虛構的：棲光科技、裡面的人、產品與事件，都與任何真實公司無關。 */

/* 主頁 */
HOME.title = 'PM 的一天';
HOME.sub = '在棲光科技接手一條工業電腦產品線：一個爛攤子，從出事到收尾';
HOME.fine = '棲光科技與裡面的人、產品、事件都是虛構的，與任何真實公司無關。';
/* 你自己的贊助連結（主頁與結算卡會顯示），例如：
   HOME.support = {url: 'https://buymeacoffee.com/你的名字', label: '☕ 喜歡的話，請我喝杯咖啡'};
   遊戲內容不能因為有沒有贊助而不同。 */
HOME.support = null;

/* 遊戲裡的人。
   STORY.cast：對話框與圖鑑裡的樣子（about 是圖鑑的介紹）。
   WORLD.cast：3D 場景裡的身體（只有真的在場的人）。
   只用電話出現的人（Amy、Mr. Huang）只有 STORY.cast。Victor 會來公司吵，所以也有身體（一開始不在場）。 */
STORY.cast = {
  me: {name: '你', role: '產品經理（PM），剛接手新產品線', tag: '你', color: '#c98a00'},
  kp: {name: 'KP', role: '產品部主管', tag: 'KP', color: '#2b6bd6', about: '講話不快，但每個決定都會問一句「為什麼」。最近被客戶的事追著跑，沒什麼耐心。'},
  maggie: {name: 'Maggie', role: '資深 PM・你的導師', tag: 'M', color: '#2f9a6a', about: '帶你的前輩，做過很多案子。有問題都可以問她。你被罵得最慘的時候，她會出現在你桌邊。'},
  kai: {name: 'Kai', role: '業務', tag: 'Kai', color: '#d6502b', about: '離客戶最近，所以最先聽到壞消息，也最先大聲說出來。嗓門很大，心不壞。'},
  ethan: {name: 'Ethan', role: 'RD 工程師', tag: 'RD', color: '#7a4fd6', about: '負責產品的電路與韌體。講話精準，問他問題要問清楚，他不會替你猜你想問什麼。'},
  grace: {name: 'Grace', role: '電腦 Team 工程師', tag: 'PC', color: '#0f8f9a', about: '負責跟產品搭配的工業平板與電腦。手邊有樣品，也有測試台，線材能不能用她說了算。'},
  walter: {name: 'Walter', role: '總裁', tag: 'CEO', color: '#8a6d1f', about: '不常出現在產品部。一出現，通常是事情已經大到沒人能決定。'},
  victor: {name: 'Victor', role: 'SI（系統整合公司）窗口', tag: 'SI', color: '#8d4a6b', about: '系統整合公司（SI）的窗口，棲光的大客戶。客氣的時候很客氣，翻臉的時候也很快。'},
  amy: {name: 'Amy', role: '線材廠業務', tag: '線材', color: '#4a7f2b', about: '合作的線材廠業務。報價、打樣、交期都找她，MOQ 她也說得算一半。'},
  lena: {name: 'Lena', role: '行銷經理', tag: '行銷', color: '#c2417a', about: '負責型錄、展覽和品牌。想法很多，每個都很有道理，改方向的速度比你整理資料還快。'},
  zoe: {name: 'Zoe', role: '行銷專員', tag: 'Zoe', color: '#e0803a', about: '行銷部的設計與排版。喜歡用「情境」和「故事」講產品，也喜歡在會議裡補充「我覺得還可以…」。'},
  ian: {name: 'Ian', role: 'ID（工業設計師）', tag: 'ID', color: '#b8892a', about: '產品外觀的設計師，也是渲染圖的人。一個人服務三個部門，要什麼先寫清楚，他才開始動。'},
  huang: {name: 'Mr. Huang', role: '終端客戶・廠務主管', tag: '客戶', color: '#5d6d77', about: '真的在用這批設備的人。他不管誰的錯，他只要設備能開機。'}
};
WORLD.cast = {
  me: {label: '你・PM', fill: '#f2b01e', ink: '#231800', cloth: 0x3b4a5a, color: 0xc98a00, hair: 0x2b2320, node: 'start', face: Math.PI / 2},
  kp: {label: 'KP・主管', fill: '#2b6bd6', ink: '#ffffff', cloth: 0x2f4f7f, color: 0x2b6bd6, hair: 0x1c1c1c, node: 'kpdoor', face: Math.PI},
  maggie: {label: 'Maggie・導師', fill: '#2f9a6a', ink: '#ffffff', cloth: 0x3f7f64, color: 0x2f9a6a, hair: 0x4a2b1b, long: true, node: 'maggie', face: 0},
  kai: {label: 'Kai・業務', fill: '#d6502b', ink: '#ffffff', cloth: 0x8a3b2a, color: 0xd6502b, hair: 0x3a2a1c, node: 'kaiW', face: -Math.PI / 2, hidden: true},
  ethan: {label: 'Ethan・RD', fill: '#7a4fd6', ink: '#ffffff', cloth: 0x4b3a7f, color: 0x7a4fd6, hair: 0x23201c, node: 'ethan', face: 0},
  grace: {label: 'Grace・電腦 Team', fill: '#0f8f9a', ink: '#ffffff', cloth: 0x2b6f78, color: 0x0f8f9a, hair: 0x2a1c18, long: true, node: 'grace', face: 0},
  walter: {label: 'Walter・總裁', fill: '#8a6d1f', ink: '#ffffff', cloth: 0x3a3a3a, color: 0x8a6d1f, hair: 0x8f8f8f, node: 'mtw', face: 0, hidden: true},
  lena: {label: 'Lena・行銷', fill: '#c2417a', ink: '#ffffff', cloth: 0x7a3a5a, color: 0xc2417a, hair: 0x3b2a22, long: true, node: 'mk2', face: 0, hidden: true},
  zoe: {label: 'Zoe・行銷', fill: '#e0803a', ink: '#ffffff', cloth: 0x9a6a3a, color: 0xe0803a, hair: 0x5a3a22, long: true, node: 'mk1', face: 0, hidden: true},
  ian: {label: 'Ian・ID', fill: '#b8892a', ink: '#ffffff', cloth: 0x4a4a3a, color: 0xb8892a, hair: 0x2a2420, node: 'id1', face: 0, hidden: true},
  victor: {label: 'Victor・SI', fill: '#8d4a6b', ink: '#ffffff', cloth: 0x5b3a4b, color: 0x8d4a6b, hair: 0x1f1a17, node: 'mt1', face: 0, hidden: true}
};

/* 走過去用的地方（不是人）：自己的座位、大會議室 A。at 是站的位置，mark 是「！」浮的地方。 */
STORY.places = {
  desk: {name: '你的座位', at: [-2.9, -1.4], mark: [-2.9, 2.5, -2.9], go: '回自己的座位'},
  warehouse: {name: '倉庫', at: [9.65, -13.0], mark: [6.95, 3.0, -15.8], go: '去倉庫'},
  meeting: {name: '大會議室 A', at: [-8.6, -2.9], mark: [-8.6, 2.9, -3.0], go: '去大會議室 A'}
};

/* 玩家可以點的詞，點了跳出白話解釋。[詞, 解釋]。同一個意思的幾種寫法用「 / 」隔開。 */
const GLOSS = [
  ['PM / 產品經理', '產品經理。負責決定做什麼產品、怎麼賣，並且在研發、業務、客戶之間協調，讓事情真的做出來。'],
  ['工業電腦', '專門放在工廠、機房這類嚴苛環境，要長時間不間斷運作的電腦。不像辦公室電腦，壞了就換一台。'],
  ['工業平板', '給工廠、倉庫這類現場用的平板電腦，比一般平板更耐用、更耐操。'],
  ['SI / 系統整合公司', 'SI 是「系統整合」（System Integration）的縮寫，指系統整合公司：把各家的設備、軟體組起來，賣整套方案給最後使用者的公司。棲光把產品賣給 SI，SI 再裝到客戶現場。'],
  ['終端客戶', '最後真正使用設備的公司。他們通常不認識棲光，只認識 SI。'],
  ['DC 圓頭線 / DC 圓頭 / DC plug', '一種傳統的圓形小插頭電源線，很多電子設備用它供電。'],
  ['Type-C', '一種扁扁的、正反都能插的插頭。現在很多手機、筆電、平板都用它來充電。'],
  ['轉接頭', '把一種插頭轉成另一種插頭的小配件。'],
  ['規格表', '把產品的尺寸、接頭、供電方式這些細節寫清楚的一張表。出貨前要靠它確認有沒有搞錯。'],
  ['業務', '負責跟客戶談生意、接訂單的同事。他們最了解客戶要什麼，也最常第一個接到客戶的抱怨。'],
  ['RD / 研發', '研發工程師，負責把產品設計出來：電路、韌體、結構。'],
  ['電腦 Team', '負責跟棲光產品搭配的工業電腦與平板的團隊。他們手上有樣品和測試台，可以驗證線材、配件能不能真的用。'],
  ['打樣', '正式量產之前，先做少量樣品出來試。確定沒問題，才下大量訂單。'],
  ['MOQ', '最小訂購量。廠商規定「至少要買這麼多」才肯做，量太少他們不接。'],
  ['報價', '廠商或我們開出的價格。通常會依數量、規格和交期不同。'],
  ['PD / Power Delivery', 'Type-C 上的一種充電協定，可以讓電源和設備先「談好」要送多少電，最高到幾十瓦。'],
  ['e-marker', '藏在高功率 Type-C 線裡的小晶片，告訴設備「這條線撐得住大電流」。沒有它，設備會把充電功率降下來保命。'],
  ['賠償', '因為我們的錯，客戶遭受的損失由我們負責補償，通常是錢。'],
  ['回收', '把已經出貨的東西收回來，換成正確的。成本高，但最乾淨。'],
  ['樣品機 / 實機', '真正的設備本體。規格表上寫的數字，最後要拿實機接上去量過，才算數。'],
  ['量產', '開始大量製造。打樣沒問題之後，才會進入量產。'],
  ['data sheet / 規格書', '產品的正式規格文件，每一項規格、接頭、供電範圍都寫在裡面，由 PM 和 RD 維護。內容完整，但業務要在客戶電話裡快速查，常常嫌它太長。'],
  ['型錄', '把公司所有產品的規格、照片和賣點印成（或做成檔案的）一本冊子，給業務拿去給客戶看。'],
  ['ID / 工業設計', '工業設計師。負責產品的外觀、造型和顏色，產品的 3D 渲染圖通常出自他們。'],
  ['渲染圖', '用電腦畫出來、看起來像照片的產品圖。產品還沒做出來、或不方便拍照的時候，型錄和簡報都靠它。'],
  ['行銷', '負責品牌、型錄、展覽、廣告這些「讓人知道你的產品」的同事。'],
  ['會議紀錄', '開完會後寫下來的：決議了什麼、誰負責、什麼時候要完成。寄給所有人，之後就有依據。'],
  ['brief', '給設計師或外包的一頁需求說明：要做什麼、給誰看、需要幾張、什麼時候要。寫不清楚，對方只能猜。'],
  ['校稿', '印出來之前，把稿子裡的字、數字、圖逐一對過，找錯字和錯誤的規格。'],
  ['勘誤 / 勘誤貼紙', '印出去才發現錯，只好貼一張小貼紙或附一張更正單。看起來不專業，但便宜、快。'],
  ['書面確認 / 書面同意 / 白紙黑字', '用信件或簽名文件留下的同意。口頭說「OK」，出事的時候很容易變成「我沒說過」。']
];
termsSet(GLOSS, ' / ', [], []);
