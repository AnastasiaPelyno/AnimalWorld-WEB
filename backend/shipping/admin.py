from django.contrib import admin
from .models import ShippingInfo

class ShippingInfoAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'city', 'postal_office_number')
    search_fields = ('user__first_name', 'user__last_name', 'city')

admin.site.register(ShippingInfo, ShippingInfoAdmin)
