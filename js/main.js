// 残ポイントを計算する関数
function calculateStatus() {
  // 入力フィールドを取得
  const baseLv = parseInt(document.getElementById("baseLv").value) || 0;
  const jobLv = parseInt(document.getElementById("jobLv").value) || 0;
  const str = parseInt(document.getElementById("str").value) || 0;
  const agi = parseInt(document.getElementById("agi").value) || 0;
  const int = parseInt(document.getElementById("int").value) || 0;
  const vit = parseInt(document.getElementById("vit").value) || 0;
  const dex = parseInt(document.getElementById("dex").value) || 0;
  const luk = parseInt(document.getElementById("luk").value) || 0;

  const attack = str * 2 + baseLv * 1.5;
  const defense = vit * 1.8 + jobLv * 1.2;
  const otherStats = agi + int + dex + luk;

  // 結果を表示
  document.getElementById("results").innerHTML = `
    MaxHP: <br>
    MaxSP: <br>
    物理攻撃: ${attack.toFixed(2)}<br>
    魔法攻撃: ${attack.toFixed(2)}<br>
    物理防御: ${defense.toFixed(2)}<br>
    魔法防御: ${defense.toFixed(2)}<br>
    Hit: <br>
    Flee: <br>
    CRI: <br>
    CRI回避: <br>
    ASPD: <br>
    ヘイスト: <br>
    その他のステータス: ${otherStats.toFixed(2)}
  `;

  // 合計ポイントを計算
  const totalPointsUsed = str + agi + int + vit + dex + luk;

  // 最大ポイント = BaseLv + JobLv に基づく例
  const maxPoints = 6 + baseLv * 9;

  // 残りポイントを計算
  const remainingPoints = maxPoints - totalPointsUsed;

  // 残ポイントを更新
  const remainingPointsElement = document.querySelector(".remaining-points");
  remainingPointsElement.textContent = `残りポイント: ${remainingPoints}`;
  
  // ポイントがマイナスの場合に色を変更
  if (remainingPoints < 0) {
    remainingPointsElement.classList.add("negative");
  } else {
    remainingPointsElement.classList.remove("negative");
  }
}

// 入力欄にイベントリスナーを設定
document.querySelectorAll(".input-pair input").forEach((input) => {
  input.addEventListener("input", calculateStatus);
});

// 職業リスト
const jobs = [
  "Swordsman",
  "Mage",
  "Archer",
  "Thief",
  "Merchant",
  "Acolyte"
];

// セレクトボックスの構築
const jobSelect = document.getElementById("jobSelect");

// 職業リストからオプションを動的生成
jobs.forEach(job => {
  const option = document.createElement("option");
  option.value = job.toLowerCase(); // 値は小文字に統一
  option.textContent = job;        // 表示名
  jobSelect.appendChild(option);
});

// イベントリスナーの例（選択時に処理を実行）
jobSelect.addEventListener("change", (event) => {
  const selectedJob = event.target.value;
  console.log(`Selected Job: ${selectedJob}`);
  // 選んだ職業に応じた処理を追加できます
});

// 初回の計算を実行
calculateStatus();
