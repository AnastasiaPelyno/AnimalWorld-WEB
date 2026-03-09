from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

# Отримуємо модель користувача (якщо використовуєте кастомну модель, то це буде працювати)
User = get_user_model()

@receiver(post_save, sender=User)
def create_auth_token(sender, instance, created, **kwargs):
    """
    Створює токен для нового користувача після того, як він збережений.
    """
    if created:
        Token.objects.create(user=instance)
