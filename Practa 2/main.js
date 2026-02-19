let expenses = [];
function getNextId() { //Генерация ID
    return expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
}
function addExpense(title, amount, category) {

    if (!title || typeof title !== 'string' || title.trim() === '') {
        console.error('❌ Ошибка: название не должно быть пустой строкой.');
        return null;
    }
    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
        console.error('❌ Ошибка: сумма должна быть положительным ЧИСЛОМ.');
        return null;
    }
    if (!category || typeof category !== 'string' || category.trim() === '') {
        console.error('❌ Ошибка: категория не должна быть пустой строкой.');
        return null;
    }

    const newExpense = {
        id: getNextId(),
        title: title.trim(),
        amount: amount,
        category: category.trim()
    };
    expenses.push(newExpense);
    console.log(`✅ Расход добавлен:`, newExpense);
    return newExpense;
}

function printAllExpenses() {
    console.log('📌 Список всех расходов:');
    if (expenses.length === 0) {
        console.log('   (пусто)');
    } else {
        expenses.forEach(exp => {
            console.log(`   [ID: ${exp.id}] ${exp.title} — ${exp.amount}₽ (${exp.category})`);
        });
    }
}

function getTotalAmount() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    console.log(`💰 Общая сумма расходов: ${total}₽`);
    return total;
}

function getExpensesByCategory(category) {
    if (!category || typeof category !== 'string') return [];
    const filtered = expenses.filter(exp => exp.category.toLowerCase() === category.trim().toLowerCase());
    const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);
    console.log(`🔍 Категория "${category}": найдено ${filtered.length} расход(ов), общая сумма: ${total}₽`);
    return filtered;
}

function findExpenseByTitle(searchString) {
    if (!searchString || typeof searchString !== 'string') return null;
    const found = expenses.find(exp => exp.title.toLowerCase().includes(searchString.toLowerCase()));
    if (found) {
        console.log(`🔎 Найден расход:`, found);
    } else {
        console.log(`🔎 Расход с названием, содержащим "${searchString}", не найден.`);
    }
    return found;
}

// Доп. функционал: удаление по id
function deleteExpenseById(id) {
    const index = expenses.findIndex(exp => exp.id === id);
    if (index !== -1) {
        const removed = expenses.splice(index, 1)[0];
        console.log(`🗑️ Расход с ID ${id} удалён:`, removed);
        return true;
    } else {
        console.log(`❌ Расход с ID ${id} не найден.`);
        return false;
    }
}
//статистика по категориям
function printCategoryStats() {
    if (expenses.length === 0) {
        console.log('📊 Нет расходов для статистики.');
        return;
    }
    const stats = {};
    expenses.forEach(exp => {
        if (!stats[exp.category]) {
            stats[exp.category] = { count: 0, total: 0 };
        }
        stats[exp.category].count += 1;
        stats[exp.category].total += exp.amount;
    });
    console.log('📊 Статистика по категориям:');
    Object.keys(stats).forEach(cat => {
        console.log(`   ${cat}: ${stats[cat].count} расход(ов) на сумму ${stats[cat].total}₽`);
    });
}

const expenseTracker = {
//доступ к массиву
    getExpenses: () => expenses,

    // методы
    addExpense: function(title, amount, category) {
        return addExpense(title, amount, category);
    },

    printAllExpenses: function() {
        printAllExpenses();
    },

    getTotalAmount: function() {
        return getTotalAmount();
    },

    getExpensesByCategory: function(category) {
        return getExpensesByCategory(category);
    },

    findExpenseByTitle: function(searchString) {
        return findExpenseByTitle(searchString);
    },

    // доп методы
    deleteExpenseById: function(id) {
        return deleteExpenseById(id);
    },

    printCategoryStats: function() {
        printCategoryStats();
    }
};

//кнопки
window.addExpenseFromInput = function() {
    const title = document.getElementById('titleInput').value;
    const amount = parseFloat(document.getElementById('amountInput').value);
    const category = document.getElementById('categoryInput').value;
    expenseTracker.addExpense(title, amount, category);
};

window.filterByCategory = function() {
    const cat = document.getElementById('filterCategory').value;
    const result = expenseTracker.getExpensesByCategory(cat);
    if (result.length > 0) {
        console.log('   Расходы:', result.map(e => `${e.title} (${e.amount}₽)`).join(', '));
    }
};

window.searchAndLog = function() {
    const search = document.getElementById('searchTitle').value;
    expenseTracker.findExpenseByTitle(search);
};

window.searchAndAdd = function() {
    const search = document.getElementById('searchTitle').value;
    const found = expenseTracker.findExpenseByTitle(search);
    //добавить строку к названию
    if (found) {
        const oldTitle = found.title;
        found.title = found.title + ' (найдено)';
        console.log(`✏️ Название изменено с "${oldTitle}" на "${found.title}"`);
    } else {
        console.log('❌ Не удалось изменить: расход не найден.');
    }
};

window.deleteById = function() {
    const id = parseInt(document.getElementById('deleteId').value);
    expenseTracker.deleteExpenseById(id);
};

//демо-пример
(function initDemo() {
    //пример что то уже есть
    expenseTracker.addExpense('Кофе', 150, 'Еда');
    expenseTracker.addExpense('Такси', 500, 'Транспорт');
    expenseTracker.addExpense('Книга', 400, 'Развлечения');
    console.log('⚡ Тестовые расходы добавлены. Используй кнопки или пиши в консоли expenseTracker.method()');
})();