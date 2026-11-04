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
  kai: {name: 'Kai', role: '業務', tag: '業務', color: '#d6502b', about: '離客戶最近，所以最先聽到壞消息，也最先大聲說出來。嗓門很大，心不壞。'},
  ethan: {name: 'Ethan', role: 'RD 工程師', tag: 'RD', color: '#7a4fd6', about: '負責產品的電路與韌體。講話精準，問他問題要問清楚，他不會替你猜你想問什麼。'},
  grace: {name: 'Grace', role: '電腦 Team PM', tag: 'PM', color: '#2f9a6a', about: '另一個電腦 Team 的 PM，負責跟產品搭配的工業平板與電腦。手邊有樣品機，也有測試台，線材能不能用，她那邊的實機說了算。'},
  leo: {name: 'Leo', role: '包材 RD', tag: 'RD', color: '#7a4fd6', about: '專門做包裝與落摔測試的 RD。紙箱、泡棉、護角各種材質的脾氣他都懂，講話慢，但數字很準。'},
  walter: {name: 'Walter', role: '總裁', tag: 'CEO', color: '#8a6d1f', about: '不常出現在產品部。一出現，通常是事情已經大到沒人能決定。'},
  victor: {name: 'Victor', role: 'SI（系統整合公司）窗口', tag: 'SI', color: '#8d4a6b', about: '系統整合公司（SI）的窗口，棲光的大客戶。客氣的時候很客氣，翻臉的時候也很快。'},
  amy: {name: 'Amy', role: '線材廠業務', tag: '供應商', color: '#4a7f2b', about: '合作的線材廠業務。報價、打樣、交期都找她，MOQ 她也說得算一半。'},
  lena: {name: 'Lena', role: '行銷經理', tag: '行銷', color: '#c2417a', about: '負責型錄、展覽和品牌。想法很多，每個都很有道理，改方向的速度比你整理資料還快。'},
  zoe: {name: 'Zoe', role: '行銷專員', tag: '行銷', color: '#c2417a', about: '行銷部的設計與排版。喜歡用「情境」和「故事」講產品，也喜歡在會議裡補充「我覺得還可以…」。'},
  ian: {name: 'Ian', role: 'ID（工業設計師）', tag: 'ID', color: '#b8892a', about: '產品外觀的設計師，也是渲染圖的人。一個人服務三個部門，要什麼先寫清楚，他才開始動。'},
  nora: {name: 'Nora', role: '副總', tag: 'VP', color: '#6b4f9a', about: '管整個產品事業群。一個問題問到底：「所以呢？數字在哪裡？下一步是什麼？」不喜歡聽藉口，也不討厭壞消息，只要你講得清楚。'},
  hank: {name: 'Hank', role: '智慧零售與交通業務', tag: '業務', color: '#d6502b', about: '負責零售與交通客戶的業務，客戶跟你有一點重疊。熱心，愛交朋友，常說「我的客戶也有這個需求」。'},
  dani: {name: 'Dani', role: '海外經銷商窗口', tag: '經銷', color: '#9a7a2f', about: '在東南亞幫棲光賣設備。說話直接，很清楚當地客戶要什麼價格。只用電話和 email 出現。'},
  tina: {name: 'Tina', role: '人資（HR）', tag: 'HR', color: '#3d8f7a', about: '人力資源部門。平常負責入職、薪資與請假，說話輕、條理清楚。你只會在最不想見到她的那天，才真的跟她說上話。'},
  owen: {name: 'Owen', role: '機殼廠業務', tag: '供應商', color: '#4a7f2b', about: '合作的機殼加工廠業務。開模、CNC 加工、打樣的價格與交期都找他。習慣先報一個最高的價，再看你怎麼回。只用電話出現。'},
  cora: {name: 'Cora', role: '客戶・採購與專案窗口', tag: '客戶', color: '#5d6d77', about: '智慧倉儲自走車公司的採購兼專案負責人。很懂行情，禮貌，但一定會殺價。技術細節要你直接跟她說，Kai 轉述不清楚。只用電話與視訊出現。'},
  huang: {name: 'Mr. Huang', role: '終端客戶・廠務主管', tag: '客戶', color: '#5d6d77', about: '真的在用這批設備的人。他不管誰的錯，他只要設備能開機。'},
  mia: {name: 'Mia', role: '財務', tag: '財務', color: '#2a8a8a', about: '管報價核准後的帳。說話很快，喝咖啡的時間很短。'},
  jay: {name: 'Jay', role: '採購', tag: '採購', color: '#8a6a2a', about: '跟供應商殺價殺了十年。愛開玩笑，嘴上很鬆。'},
  ella: {name: 'Ella', role: '品保', tag: '品保', color: '#5a7fa0', about: '產品出貨前最後一道關。看起來嚴肅，其實很愛聊天。'},
  sam: {name: 'Sam', role: '資訊', tag: '資訊', color: '#4a6a8a', about: '公司的電腦與網路都找他。每天最早到，咖啡一定喝兩杯。'},
  ben: {name: 'Ben', role: '倉管', tag: '廠務', color: '#c07a2a', about: '倉庫的帳與貨，他都記在腦子裡。'},
  joe: {name: 'Joe', role: '產線作業員', tag: '廠務', color: '#c07a2a', about: '在產線上組裝，也負責把成品搬進倉庫。'},
  sue: {name: 'Sue', role: '產線作業員', tag: '廠務', color: '#c07a2a', about: '在產線上組裝，也負責把物料領進工廠。'},
  max: {name: 'Max', role: '插車司機', tag: '廠務', color: '#c07a2a', about: '開電動插車，把整棧板的成品從工廠運進倉庫。'},
  dan: {name: 'Dan', role: '插車司機', tag: '廠務', color: '#c07a2a', about: '開電動插車，把整棧板的物料從倉庫運進工廠。'},
  ray: {name: 'Ray', role: '產線領班', tag: '廠務', color: '#c07a2a', about: '管產線的領班，嗓門大，什麼事都說得很好笑。'},
  kim: {name: 'Kim', role: '產線作業員', tag: '廠務', color: '#c07a2a', about: '在產線上做檢查，也是領班最愛的聊天對象。'}
};
WORLD.cast = {
  me: {label: '你・PM', fill: '#f2b01e', ink: '#231800', cloth: 0x3b4a5a, color: 0xc98a00, hair: 0x2b2320, node: 'start', face: Math.PI / 2},
  kp: {label: 'KP・主管', fill: '#2b6bd6', ink: '#ffffff', cloth: 0x2f4f7f, color: 0x2b6bd6, hair: 0x1c1c1c, node: 'kp', face: Math.PI / 2},
  maggie: {label: 'Maggie・導師', fill: '#2f9a6a', ink: '#ffffff', cloth: 0x3f7f64, color: 0x2f9a6a, hair: 0x4a2b1b, long: true, node: 'maggie', face: 0},
  kai: {label: 'Kai・業務', fill: '#d6502b', ink: '#ffffff', cloth: 0x8a3b2a, color: 0xd6502b, hair: 0x3a2a1c, node: 'kaiW', face: -Math.PI / 2, hidden: true},
  ethan: {label: 'Ethan・RD', fill: '#7a4fd6', ink: '#ffffff', cloth: 0x4b3a7f, color: 0x7a4fd6, hair: 0x23201c, node: 'ethan', face: 0},
  grace: {label: 'Grace・PM', fill: '#2f9a6a', ink: '#ffffff', cloth: 0x2b6f78, color: 0x2f9a6a, hair: 0x2a1c18, long: true, node: 'hk', face: 0},
  walter: {label: 'Walter・總裁', fill: '#8a6d1f', ink: '#ffffff', cloth: 0x3a3a3a, color: 0x8a6d1f, hair: 0x8f8f8f, node: 'mtw', face: 0, hidden: true},
  lena: {label: 'Lena・行銷', fill: '#c2417a', ink: '#ffffff', cloth: 0x7a3a5a, color: 0xc2417a, hair: 0x3b2a22, long: true, node: 'mk2', face: 0, hidden: true},
  zoe: {label: 'Zoe・行銷', fill: '#c2417a', ink: '#ffffff', cloth: 0x9a6a3a, color: 0xc2417a, hair: 0x5a3a22, long: true, node: 'mk1', face: 0, hidden: true},
  ian: {label: 'Ian・ID', fill: '#b8892a', ink: '#ffffff', cloth: 0x4a4a3a, color: 0xb8892a, hair: 0x2a2420, node: 'id1', face: 0, hidden: true},
  nora: {label: 'Nora・副總', fill: '#6b4f9a', ink: '#ffffff', cloth: 0x3a2f55, color: 0x6b4f9a, hair: 0x2a2a2e, long: true, node: 'mtw', face: 0, hidden: true},
  hank: {label: 'Hank・業務', fill: '#d6502b', ink: '#ffffff', cloth: 0x2f5a6a, color: 0xd6502b, hair: 0x3a2a1c, node: 'hkD', face: 0, hidden: true},
  leo: {label: 'Leo・包材 RD', fill: '#7a4fd6', ink: '#ffffff', cloth: 0x5a4a8a, color: 0x7a4fd6, hair: 0x23201c, node: 'leoD', face: 0, hidden: true},
  mia: {label: 'Mia・財務', fill: '#2a8a8a', ink: '#ffffff', cloth: 0x2f6f6f, color: 0x2a8a8a, hair: 0x2a2020, node: 'a1c', face: 0, long: true, hidden: true, speed: 3.4},
  jay: {label: 'Jay・採購', fill: '#8a6a2a', ink: '#ffffff', cloth: 0x5a4a2a, color: 0x8a6a2a, hair: 0x2a2420, node: 'a1c', face: 0, hidden: true, speed: 3.4},
  ella: {label: 'Ella・品保', fill: '#5a7fa0', ink: '#ffffff', cloth: 0x3a5a7a, color: 0x5a7fa0, hair: 0x3b2a22, node: 'a1c', face: 0, long: true, hidden: true, speed: 3.4},
  sam: {label: 'Sam・資訊', fill: '#4a6a8a', ink: '#ffffff', cloth: 0x3a4a5a, color: 0x4a6a8a, hair: 0x1c1c1c, node: 'a1c', face: 0, hidden: true, speed: 3.4},
  ben: {label: '倉管・Ben', fill: '#c07a2a', ink: '#ffffff', cloth: 0x8a5a2a, color: 0xc07a2a, hair: 0x2a2420, node: 'wh1', face: 0, carry: true, speed: 2.8},
  joe: {label: '作業員・Joe', fill: '#c07a2a', ink: '#ffffff', cloth: 0x3b6fb5, color: 0xc07a2a, hair: 0x2a2420, node: 'fac1', face: 0, carry: true, speed: 3.0},
  sue: {label: '作業員・Sue', fill: '#c07a2a', ink: '#ffffff', cloth: 0xe8892f, color: 0xc07a2a, hair: 0x3b2a22, node: 'wh1', face: 0, long: true, carry: true, speed: 3.0},
  max: {label: '插車・Max', fill: '#c07a2a', ink: '#ffffff', cloth: 0xe8892f, color: 0xc07a2a, hair: 0x2a2420, node: 'fac1', face: 0, rig: 'forklift', speed: 3.2},
  dan: {label: '插車・Dan', fill: '#c07a2a', ink: '#ffffff', cloth: 0x3b6fb5, color: 0xc07a2a, hair: 0x1c1c1c, node: 'wh1', face: 0, rig: 'forklift', speed: 3.2, rigColor: 0x3b8fd6},
  ray: {label: '領班・Ray', fill: '#c07a2a', ink: '#ffffff', cloth: 0xe8892f, color: 0xc07a2a, hair: 0x2a2420, node: 'chw1', face: 1.6},
  kim: {label: '作業員・Kim', fill: '#c07a2a', ink: '#ffffff', cloth: 0x3b6fb5, color: 0xc07a2a, hair: 0x3b2a22, node: 'chw2', face: -1.5, long: true},
  tina: {label: 'Tina・HR', fill: '#3d8f7a', ink: '#ffffff', cloth: 0x2f6f5f, color: 0x3d8f7a, hair: 0x2a2020, long: true, node: 'mt1', face: 0, hidden: true},
  victor: {label: 'Victor・SI', fill: '#8d4a6b', ink: '#ffffff', cloth: 0x5b3a4b, color: 0x8d4a6b, hair: 0x1f1a17, node: 'mt1', face: 0, hidden: true}
};

/* 走過去用的地方（不是人）：自己的座位、大會議室 A。at 是站的位置，mark 是「！」浮的地方。 */
STORY.places = {
  desk: {name: '你的座位', at: [-2.9, -1.4], mark: [-2.9, 2.5, -2.9], go: '回自己的座位'},
  warehouse: {name: '倉庫', at: [9.65, -13.0], mark: [6.95, 3.0, -15.8], go: '去倉庫'},
  factory: {name: '工廠', at: [-5.4, -13.3], mark: [-8.5, 3.0, -14.6], go: '去工廠'},
  shop_bento: {name: '大福便當', at: [-31.4, -5.0], mark: [-31.4, 3.5, -4.6], go: '去大福便當'},
  shop_dumpling: {name: '老張水餃', at: [-27.4, -5.0], mark: [-27.4, 3.5, -4.6], go: '去老張水餃'},
  shop_buffet: {name: '家常自助餐', at: [-23.4, -5.0], mark: [-23.4, 3.5, -4.6], go: '去家常自助餐'},
  shop_mart: {name: '全時超商', at: [-19.4, -5.0], mark: [-19.4, 3.5, -4.6], go: '去全時超商'},
  pantry: {name: '茶水間', at: [12.7, -5.2], mark: [13.3, 2.6, -6.6], go: '去茶水間'},
  mdesk: {name: 'Maggie 的座位', at: [-0.8, -1.85], mark: [-0.8, 2.5, -2.9], go: '去 Maggie 的座位'},
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
  ['EVT', '工程驗證。新產品的第一關：做出少量工程樣品，目的是找問題，不是證明沒問題。'],
  ['DVT', '設計驗證。EVT 的問題修完之後，再做一批更接近成品的樣品，驗證設計能不能通過各種測試與認證。'],
  ['PVT', '試產。在工廠實際跑一小批，確認量產的流程順不順、品質穩不穩。'],
  ['MP', '量產。正式開始大量生產與出貨，跟試產不同，這時候交期與品質都要穩。'],
  ['資遣', '公司因為績效或組織調整，終止勞動契約。依規定要提前通知，並給資遣費。通常由主管說明原因，人資負責辦手續。'],
  ['HR / 人資', '人力資源部門。負責招募、薪資、請假，也負責離職與資遣的手續。'],
  ['八卦指數', '你在茶水間聽了多少八卦。聽得少，什麼都不知道；聽得多，有時能拿到有用的資訊，有時同事會覺得你太愛打聽。'],
  ['客製 / 客製化', '依照單一客戶的需求，修改標準產品的一部分：換接頭、換面板、加模組、印客戶的標誌。通常要多花一筆開發費，量要夠大才划算。'],
  ['NRE / 開模費', '一次性的開發費用，例如開模具、治具、認證。不管後來賣幾台都要付，所以要攤到每一台的價格裡。'],
  ['毛利 / 毛利率', '賣價扣掉成本剩下的錢叫毛利；毛利除以賣價就是毛利率。公司通常有一條最低線，低於它就不接。'],
  ['殺價', '客戶要求降價。常見的回法：不降但說明價值、用數量或長約換折扣、或直接降。每一種的代價不同。'],
  ['樣品 / 工程樣品', '做出來給客戶看或測試的少量機器。免費給、收費給、先給外觀模型，各有不同的成本與效果。'],
  ['落摔測試', '把包好的產品從固定高度、不同角度摔下去，看看有沒有壞。包材設計得好不好，要靠它驗證。'],
  ['BOM / BOM 表', '一台產品用到的所有零件清單與價格。看它就知道錢花在哪：通常前幾大零件就占了大部分成本。'],
  ['老化測試 / burn-in', '出貨前讓機器在高溫下長時間滿載運轉，把容易早期故障的挑出來。跑得越久，挑得越乾淨，但出貨也越晚。'],
  ['過熱降速', '處理器太熱時自動降低速度保護自己。機器沒壞，但跑得變慢。無風扇的機器特別要注意。'],
  ['認證', '特定場合（例如車載、軌道）要求的檢測證明，沒有就不能投標。要花時間也要花錢。'],
  ['漏斗 / pipeline', '把銷售拆成階段：被看到、有興趣、試用、報價、下單。每個階段都會掉一些人。拿到名片只是開始，不是接近成交。'],
  ['SI', '系統整合公司，替客戶把機器、軟體、現場設備組成一套完整方案，常是工控機的實際買家。'],
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
