from django.urls import path
from . import views

urlpatterns = [
    path('reviews/<int:product_id>/create/', views.create_review, name='create_review'),
    path('reviews/<int:product_id>/', views.get_reviews, name='get_reviews'),
]
