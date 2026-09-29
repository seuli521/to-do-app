/**
 * 나의 할 일 목록 (To-Do List) JavaScript Logic
 * - LocalStorage 자동 저장 & 통계
 * - 중복 방지 기능
 * - 필터링 기능 (전체/진행중/완료)
 * - 완료 항목 일괄 삭제
 */

// LocalStorage 키 명칭
const STORAGE_KEY = 'skypulse_todo_items';

// 1. 메모리 및 LocalStorage 기반 할 일 목록 상태 및 필터 상태
let todos = loadTodos();
let currentFilter = 'all'; // 'all' | 'active' | 'completed'

// 2. DOM 요소 참조
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const allCompletedBanner = document.getElementById('all-completed-banner');
const totalCountElem = document.getElementById('total-count');
const completedCountElem = document.getElementById('completed-count');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

// 3. LocalStorage 데이터 불러오기
function loadTodos() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (e) {
      console.error('LocalStorage 파싱 오류:', e);
      return [];
    }
  }
  return [];
}

// 4. LocalStorage 데이터 저장
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 5. 할 일 개수 통계 업데이트
function updateStats() {
  const totalCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;

  totalCountElem.textContent = totalCount;
  completedCountElem.textContent = completedCount;
}

// 6. 화면 렌더링 함수
function renderTodos() {
  // 기존 목록 초기화
  todoList.innerHTML = '';

  // 1) 전체 할 일이 전혀 없는 경우 빈 상태 안내 표시
  if (todos.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
  }

  // 2) 할 일이 1개 이상 존재하고, 전부 완료된 경우 축하 메시지 배너 표시
  const isAllCompleted = todos.length > 0 && todos.every(todo => todo.completed);
  if (isAllCompleted) {
    allCompletedBanner.classList.remove('hidden');
  } else {
    allCompletedBanner.classList.add('hidden');
  }

  // 3) 현재 필터 상태에 따라 표시할 항목 거르기
  let filteredTodos = todos;
  if (currentFilter === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (currentFilter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  // 필터링된 할 일 목록 순회하며 DOM 생성
  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
      <div class="todo-content">
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text">${escapeHtml(todo.text)}</span>
      </div>
      <button class="delete-btn" title="삭제">✕</button>
    `;

    // 체크박스 클릭 이벤트 (완료/미완료 토글)
    const checkbox = li.querySelector('.todo-checkbox');
    checkbox.addEventListener('change', () => {
      toggleTodo(todo.id);
    });

    // 삭제 버튼 클릭 이벤트 (항목 제거)
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      deleteTodo(todo.id);
    });

    todoList.appendChild(li);
  });

  // 통계 업데이트
  updateStats();
}

// 7. 새로운 할 일 추가 함수 (중복 방지 기능 구현)
function addTodo() {
  const text = todoInput.value.trim();

  // 1) 빈 값 체크
  if (!text) {
    alert('할 일을 입력하세요');
    todoInput.focus();
    return;
  }

  // 2) 중복 체크 (동일한 텍스트가 이미 목록에 존재하는지 검사)
  const isDuplicate = todos.some(todo => todo.text.toLowerCase() === text.toLowerCase());
  if (isDuplicate) {
    alert('이미 등록된 할 일입니다');
    todoInput.focus();
    return;
  }

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(newTodo);
  saveTodos();

  todoInput.value = '';
  todoInput.focus();
  renderTodos();
}

// 8. 할 일 완료 상태 토글 함수
function toggleTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  saveTodos();
  renderTodos();
}

// 9. 할 일 개별 삭제 함수
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  renderTodos();
}

// 10. 완료된 항목 일괄 삭제 함수
function clearCompletedTodos() {
  const completedCount = todos.filter(todo => todo.completed).length;
  if (completedCount === 0) {
    alert('삭제할 완료된 항목이 없습니다.');
    return;
  }

  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  renderTodos();
}

// XSS 예방 텍스트 이스케이프 헬퍼 함수
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 11. 이벤트 리스너 등록

// 추가 버튼 및 Enter 키 이벤트
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

// 필터 버튼 클릭 이벤트 (전체/진행중/완료)
filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.filter;
    renderTodos();
  });
});

// 완료 항목 일괄 삭제 버튼 클릭 이벤트
clearCompletedBtn.addEventListener('click', clearCompletedTodos);

// 12. 앱 초기화 (initApp)
function initApp() {
  renderTodos();
}

document.addEventListener('DOMContentLoaded', initApp);
