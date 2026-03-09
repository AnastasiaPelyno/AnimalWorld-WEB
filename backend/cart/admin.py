from django.contrib import admin
from .models import Cart, CartItem

class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product', 'quantity')
    search_fields = ('cart__cart_id', 'product__name')

class CartAdmin(admin.ModelAdmin):
    list_display = ('user',)
    search_fields = ('user__first_name', 'user__last_name')

admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
