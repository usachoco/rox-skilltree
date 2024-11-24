function loadSkillData(jsonPath) {
    return fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${jsonPath}: ${response.statusText}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
            throw error; // エラーを再スローして呼び出し側に伝える
        });
}

// DOM要素を取得
const skillTreeContainer = document.getElementById("skill-tree");
const connections = document.getElementById("connections");

// スキルツリーを生成
function createSkillTree(data) {
    const skillElements = {};

    data.skills.forEach(skill => {
        const skillElement = document.createElement("div");
        skillElement.className = "skill";
        skillElement.dataset.id = skill.id;
        skillElement.textContent = `${skill.name} (Lv.${skill.maxlv})`;

        // イベントリスナー（例: スキルポイント割り振り）
        skillElement.addEventListener("click", () => {
            skillElement.classList.toggle("active");
        });

        skillTreeContainer.appendChild(skillElement);
        skillElements[skill.id] = skillElement;
    });

    return skillElements;
}

// 親子関係の線を描画
function drawConnections(data, skillElements) {
    data.skills.forEach(skill => {
        skill.dependencies.forEach(([parentId, requiredLevel]) => {
            const parentElement = skillElements[parentId];
            const childElement = skillElements[skill.id];

            if (parentElement && childElement) {
                drawLineBetweenElements(parentElement, childElement);
            }
        });
    });
}

// 矢印を描画
function drawLineBetweenElements(parent, child) {
    const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();

    const startX = parentRect.left + parentRect.width / 2;
    const startY = parentRect.bottom;
    const endX = childRect.left + childRect.width / 2;
    const endY = childRect.top;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", startX);
    line.setAttribute("y1", startY);
    line.setAttribute("x2", endX);
    line.setAttribute("y2", endY);
    line.setAttribute("stroke", "#000");
    line.setAttribute("stroke-width", "2");
    connections.appendChild(line);
}

// 初期化
const jsonPath = 'skill.json';
loadSkillData(jsonPath).then(skillData => {
    const skillElements = createSkillTree(skillData);
    drawConnections(skillData, skillElements);
});
