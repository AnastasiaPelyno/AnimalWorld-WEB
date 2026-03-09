# 🐾 AnimalWorld - Інтернет-магазин зоотоварів

## Про проєкт
**AnimalWorld** — це сучасний веб-додаток для продажу товарів для тварин. Проєкт складається з бекенду на базі Django REST Framework та фронтенду, створеного за допомогою React. 

**Основний функціонал:**
* Каталог товарів із фотографіями та цінами.
* Кошик користувача (додавання товарів).
* Система авторизації та реєстрації (Token Authentication).
* Зручна адмін-панель для управління товарами.

---

## Технології
* **Бекенд:** Python, Django, Django REST Framework
* **База даних:** PostgreSQL
* **Фронтенд:** JavaScript, React, CSS
* **Документація API:** Swagger

---

## Встановлення та запуск (Локально)

### 1. Клонування репозиторію та налаштування БД
```bash
git clone https://github.com/AnastasiaPelyno/AnimalWorld-WEB.git
cd AnimalWorld-WEB
```

Переконайтеся, що у вас встановлено PostgreSQL, і створіть порожню базу даних для проєкту.

### 2. Запуск бекенду (Django)
Відкрийте термінал у головній папці проєкту:

```bash
# Створіть та активуйте віртуальне середовище
python -m venv venv
venv\Scripts\activate  # Для Windows

# Встановіть необхідні бібліотеки
pip install -r requirements.txt

# Перейдіть у папку бекенду, де знаходиться файл manage.py
cd backend

# Виконайте міграції бази даних
python manage.py migrate
```

### 3. Запуск фронтенду (React)
Відкрийте новий термінал, не закриваючи сервер Django:

```bash
# Перейдіть у папку фронтенду
cd frontend

# Встановіть залежності Node.js
npm install

# Запустіть React-додаток
npm start

# Створіть суперкористувача для доступу в адмінку
python manage.py createsuperuser

# Запустіть сервер
python manage.py runserver
```
##  Документація API
Документація до всіх ендпоінтів бекенду автоматично згенерована за допомогою **Swagger**.
Після успішного запуску бекенд-сервера, зручний інтерфейс для тестування API доступний за посиланням:
 `http://127.0.0.1:8000/swagger/`

###  Як протестувати захищені ендпоінти (Авторизація)
Оскільки API використовує Token Authentication, для тестування кошика або профілю потрібно авторизуватися:

1. У Swagger знайдіть **POST**-запит для входу (наприклад, `/users/login/`).
2. Натисніть **Try it out**, введіть логін та пароль вашого користувача (або створеного суперкористувача) і натисніть **Execute**.
3. У відповіді (Response) ви отримаєте унікальний ключ. Скопіюйте його (без лапок).
4. Підніміться в самий верх сторінки Swagger і натисніть зелену кнопку **Authorize**.
5. У поле введіть слово `Token`, поставте пробіл і вставте ваш скопійований ключ.
6. Натисніть **Authorize** та **Close**.

Тепер ви можете вільно тестувати всі захищені запити, наприклад, додавання товарів до кошика!
<img width="1682" height="874" alt="image" src="https://github.com/user-attachments/assets/2eca2158-0601-43b4-8e70-e9ededaa2601" />
<img width="1541" height="902" alt="image" src="https://github.com/user-attachments/assets/ebb751d5-e589-43a0-93ae-df38df5c1550" />
<img width="1457" height="914" alt="image" src="https://github.com/user-attachments/assets/dd267863-84f8-4a5e-b77e-d7122f6e0d7d" />
<img width="1454" height="800" alt="image" src="https://github.com/user-attachments/assets/f0ff2fc5-f983-4d01-80fd-7fd21b9ad1eb" />
<img width="1451" height="716" alt="image" src="https://github.com/user-attachments/assets/808c1cbf-cf6c-4e32-8840-135a16596739" />





## Управління контентом (Адмін-панель)
Вбудована адмін-панель Django дозволяє повністю керувати магазином без написання додаткового коду.

### Основні можливості адміністратора:
* **Управління товарами:** додавання нових товарів, завантаження фотографій, редагування цін та описів, видалення неактуальних позицій.
* **Обробка замовлень:** перегляд усіх оформлених замовлень, інформації про покупця та **зміна статусу замовлення** (наприклад, з "В обробці" на "Відправлено" або "Виконано").
* **Управління клієнтами:** перегляд списку зареєстрованих користувачів.

### Як працювати в адмінці:
1. Переконайтеся, що сервер бекенду запущено (`python manage.py runserver`).
2. Перейдіть у браузері за посиланням: `http://127.0.0.1:8000/admin/`
3. Увійдіть, використовуючи логін та пароль **суперкористувача**, якого ви створили раніше.
4. **Щоб змінити статус замовлення:** на головній сторінці знайдіть розділ **Orders** (Замовлення), натисніть на потрібне замовлення клієнта, змініть статус у відповідному полі та натисніть **Save** (Зберегти).
5. **Щоб додати товар:** у розділі **Products** (Товари) натисніть кнопку **Add** (Додати), заповніть усі поля, обов'язково завантажте фотографію і збережіть.

<img width="1557" height="688" alt="image" src="https://github.com/user-attachments/assets/6afe2904-7c91-43c6-a565-fd72f2c7c636" />

### Дизайн додатку
<img width="1895" height="909" alt="image" src="https://github.com/user-attachments/assets/cfd9dd9b-67e2-41be-9a96-c307adbbc20d" />
<img width="1344" height="861" alt="image" src="https://github.com/user-attachments/assets/b8614f59-4aa1-4075-9f29-8c553333f53b" />
<img width="998" height="629" alt="image" src="https://github.com/user-attachments/assets/ff598f2c-9b89-4fc7-90fb-704b165b86a2" />
<img width="1907" height="263" alt="image" src="https://github.com/user-attachments/assets/ce2d17eb-5f4c-4863-bf85-d66a087e56d8" />
<img width="643" height="717" alt="image" src="https://github.com/user-attachments/assets/db7cb9e2-c38a-4c5e-bf38-30b5af2a61db" />
<img width="1918" height="903" alt="image" src="https://github.com/user-attachments/assets/f1904c73-a219-488f-8f80-dd06964d9250" />
<img width="797" height="850" alt="image" src="https://github.com/user-attachments/assets/8815db46-eb32-4d91-a6b2-4f6dfa63f630" />
<img width="693" height="860" alt="image" src="https://github.com/user-attachments/assets/0e39253c-0cf2-4d32-85be-2786c289bb6a" />
<img width="1141" height="528" alt="image" src="https://github.com/user-attachments/assets/584a4ed0-ce5e-4944-8e4f-76a8f2e6d864" />
<img width="1162" height="833" alt="image" src="https://github.com/user-attachments/assets/ccc55f13-9ffc-4718-befb-0be6458f26e0" />
<img width="1111" height="319" alt="image" src="https://github.com/user-attachments/assets/5808f599-1642-4493-b065-fc4fb8f31dee" />














