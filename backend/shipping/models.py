from django.db import models
from users.models import User

class ShippingInfo(models.Model):
    user = models.ForeignKey(User, related_name='shipping_info', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    city = models.CharField(max_length=100)
    postal_office_number = models.CharField(max_length=20)

    def __str__(self):
        return f'Shipping info for {self.user}'
