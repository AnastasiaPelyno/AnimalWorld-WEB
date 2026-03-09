from django.contrib import admin
from .models import Review

class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'rating', 'created_at')
    search_fields = ('user__first_name', 'user__last_name', 'product__name')
    list_filter = ('rating',)

admin.site.register(Review, ReviewAdmin)
