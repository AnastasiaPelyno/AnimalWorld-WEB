from django.contrib import admin
from .models import Order, OrderItem

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'price')
    search_fields = ('order__order_id', 'product__name')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'status', 'total_price', 'created_at')
    search_fields = ('user__first_name', 'user__last_name')
    list_filter = ('status',)
    ordering = ('-created_at',)

admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
