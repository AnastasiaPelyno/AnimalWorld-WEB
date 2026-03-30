from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class UserModelTest(TestCase):
    def setUp(self):
        # Прибрали username, залишили тільки те, що є у твоїй моделі
        self.user = User.objects.create_user(
            email='test@example.com',
            first_name='Іван',
            last_name='Франко',
            phone_number='+380991234567',
            password='testpassword123'
        )

    def test_user_creation(self):
        """Перевіряємо, чи створюється користувач"""
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(self.user.first_name, 'Іван')
        self.assertTrue(self.user.check_password('testpassword123'))