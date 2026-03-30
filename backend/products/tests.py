from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Product, Category

User = get_user_model()

class ProductModelTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Їжа для тварин")
        self.product = Product.objects.create(
            name="Корм для собак",
            description="Дуже смачний корм для великих собак",
            price=500.50,
            quantity=10,
            photo="products/dummy_photo.jpg",
            category=self.category
        )

    def test_product_creation(self):
        """Перевіряємо, чи правильно створюється товар у базі даних"""
        self.assertEqual(self.product.name, "Корм для собак")
        self.assertEqual(self.product.description, "Дуже смачний корм для великих собак")
        self.assertEqual(self.product.price, 500.50)
        self.assertEqual(self.product.quantity, 10)
        self.assertEqual(self.product.category.name, "Їжа для тварин")
        self.assertTrue(isinstance(self.product, Product))

class ProductAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Створюємо користувача без username та авторизуємо
        self.user = User.objects.create_user(
            email='test@example.com',
            first_name='Іван',
            last_name='Франко',
            phone_number='+380991234567',
            password='testpassword123'
        )
        self.client.force_authenticate(user=self.user)

        self.product = Product.objects.create(
            name="Іграшка для кота",
            description="Класна іграшка з м'ятою",
            price=150.00,
            quantity=5,
            photo="products/dummy_toy.jpg"
        )

    def test_get_products_list(self):
        """Перевіряємо, чи API повертає список товарів (статус 200 OK)"""
        url = reverse('product-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_product(self):
        """Перевіряємо, чи можна отримати конкретний товар за його ID"""
        url = reverse('product-detail', kwargs={'product_id': self.product.product_id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

import json

class ProductIntegrationTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # 1. Створюємо категорію (залежність)
        self.category = Category.objects.create(name="Аксесуари")
        
        # 2. Створюємо товар, прив'язаний до цієї категорії
        self.product = Product.objects.create(
            name="Повідець для собак",
            description="Міцний повідець довжиною 3 метри",
            price=250.00,
            quantity=15,
            photo="products/dummy_leash.jpg",
            category=self.category
        )
        
        # 3. Створюємо користувача для доступу
        self.user = User.objects.create_user(
            email='integration@example.com',
            first_name='Тест',
            last_name='Інтеграція',
            phone_number='+380990000000',
            password='strongpassword123'
        )

    def test_full_product_api_flow(self):
        """
        ІНТЕГРАЦІЙНИЙ ТЕСТ: Перевіряє взаємодію БД, Моделі, Серіалізатора та View.
        """
        # Авторизуємось
        self.client.force_authenticate(user=self.user)
        
        # Робимо GET-запит до API
        url = reverse('product-detail', kwargs={'product_id': self.product.product_id})
        response = self.client.get(url)
        
        # 1. Перевіряємо, чи HTTP-статус успішний
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # 2. Розпаковуємо JSON-відповідь сервера
        response_data = response.json()
        
        # 3. Перевіряємо, чи серіалізатор правильно передав дані з БД на фронтенд
        self.assertEqual(response_data['name'], "Повідець для собак")
        # Перетворюємо рядок з ціною у число (float) для порівняння, бо JSON передає ціну як рядок
        self.assertEqual(float(response_data['price']), 250.00)