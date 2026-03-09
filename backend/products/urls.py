from django.urls import path
from .views import ProductListView, CategoryListView, ProductDetailView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('products/<int:product_id>/', ProductDetailView.as_view(), name='product-detail'),  # Додаємо маршрут для детальної інформації
    
]
