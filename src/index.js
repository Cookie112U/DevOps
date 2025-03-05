import { sendTelegramNotification } from './sendNotification.js';

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gridSize = 50;

const costMap = {
  '_': 1,
  '1': 0,
  'F': 0,
  'R': 0.5,
  'G': 1,
  'S': 5,
  'H': 4,
  'W': Infinity,
  'M': Infinity
};

function drawLabyrinth(labyrinth) {
  const rows = labyrinth.length;
  const cols = labyrinth[0].length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = labyrinth[i][j];
      ctx.fillStyle = getColor(cell);
      ctx.fillRect(j * gridSize, i * gridSize, gridSize, gridSize);
      ctx.strokeRect(j * gridSize, i * gridSize, gridSize, gridSize);
    }
  }
}

function getColor(cell) {
  switch(cell) {
    case '_': return 'white';
    case '1': return 'lightgray';
    case 'F': return 'green';
    case '#': return 'black';
    case 'R': return 'orange';
    case 'G': return 'lightgreen';
    case 'S': return 'darkgreen';
    case 'H': return 'brown';
    case 'W': return 'blue';
    case 'M': return 'gray';
    default: return 'white';
  }
}

function bfsWithCost(labyrinth, start) {
  const rows = labyrinth.length;
  const cols = labyrinth[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const prev = Array.from({ length: rows }, () => Array(cols).fill(null));
  const queue = [[...start, 0]];
  const [startX, startY] = start;
  dist[startX][startY] = 0;
  visited[startX][startY] = true;

  while (queue.length > 0) {
    const [x, y, d] = queue.shift();

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && !visited[nx][ny] && labyrinth[nx][ny] !== '#') {
        const newDist = d + costMap[labyrinth[nx][ny]];
        if (newDist < dist[nx][ny]) {
          dist[nx][ny] = newDist;
          prev[nx][ny] = [x, y];
          queue.push([nx, ny, newDist]);
          visited[nx][ny] = true;
        }
      }
    }
  }

  return { dist, prev };
}

function reconstructPath(prev, start, end) {
  let path = [];
  let current = end;
  while (current) {
    path.unshift(current);
    current = prev[current[0]][current[1]];
  }
  return path.length > 1 ? path : null;
}

function startSearch() {
  const rows = parseInt(document.getElementById('rows').value);
  const cols = parseInt(document.getElementById('cols').value);
  const labyrinthInput = document.getElementById('labyrinthInput').value.trim().split('\n');
  const labyrinth = labyrinthInput.map(row => row.split(''));

  let start = null;
  let end = null;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (labyrinth[i][j] === '1') start = [i, j];
      if (labyrinth[i][j] === 'F') end = [i, j];
    }
  }

  if (!start || !end) {
    document.getElementById('output').textContent = 'Start or finish not found.';
    drawLabyrinth(labyrinth);
    return;
  }

  const { dist, prev } = bfsWithCost(labyrinth, start);
  const path = reconstructPath(prev, start, end);

  if (path) {
    let result = 'Path:\n';
    path.forEach(([x, y]) => {
      result += ` x:${x + 1}, y:${y + 1}\n`;
    });
    document.getElementById('output').textContent = result;
    drawLabyrinth(labyrinth);

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.beginPath();
    path.forEach(([x, y], idx) => {
      if (idx === 0) {
        ctx.moveTo(y * gridSize + gridSize / 2, x * gridSize + gridSize / 2);
      } else {
        ctx.lineTo(y * gridSize + gridSize / 2, x * gridSize + gridSize / 2);
      }
    });
    ctx.stroke();

    showResultDialog("Victory", "Вы нашли верный путь!", "victory");
  } else {
    document.getElementById('output').textContent = 'No path found.';
    drawLabyrinth(labyrinth);
    showResultDialog("Defeat", "К сожалению, никакого пути не существует!", "defeat");
  }
}

function showResultDialog(title, message, type) {
  const dialog = document.getElementById("resultDialog");
  const messageElement = document.getElementById("resultMessage");

  messageElement.textContent = message;
  dialog.className = type;
  dialog.showModal();
}

function closeDialog() {
  document.getElementById("resultDialog").close();
}

function clearCanvas() {
  const labyrinthInput = document.getElementById('labyrinthInput').value.trim().split('\n');
  const labyrinth = labyrinthInput.map(row => row.split(''));
  drawLabyrinth(labyrinth);
  document.getElementById('output').textContent = '';
}

window.startSearch = startSearch;
window.clearCanvas = clearCanvas;
window.closeDialog = closeDialog;





const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
    sendTelegramNotification('Ошибка загрузки данных в приложении!'); 
  }
};

fetchData();


sendTelegramNotification("🚀 Проект успешно собран и запущен!");