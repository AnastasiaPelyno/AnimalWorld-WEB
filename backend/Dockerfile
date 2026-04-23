FROM python:3.10-slim

# Встановлюємо системні залежності для psycopg2 (робота з базою)
RUN apt-get update && apt-get install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Обов'язково додаємо gunicorn для продуктивності
RUN pip install gunicorn

COPY . .

# Порт за замовчуванням для Render
EXPOSE 8000

# Команда запуску
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]