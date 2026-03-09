from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import ReviewSerializer
from .models import Review
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from users.models import User
from products.models import Product
# Параметри для документації Swagger
review_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'rating': openapi.Schema(type=openapi.TYPE_INTEGER, description='Product rating (1-5)', example=5),
        'comment': openapi.Schema(type=openapi.TYPE_STRING, description='User comment on the product', example='Great product!'),
    },
)

@swagger_auto_schema(
    method='post',
    request_body=review_request_body,
    responses={201: ReviewSerializer},
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_review(request, product_id):
    # Перевіряємо, чи існує продукт
    try:
        product = Product.objects.get(product_id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    # Отримуємо користувача з токену
    user = request.user  # Користувач вже доступний через request.user, якщо він авторизований

    # Отримуємо дані з запиту
    rating = request.data.get('rating')
    comment = request.data.get('comment')

    if not rating or not comment:
        return Response({'error': 'Rating and comment are required'}, status=status.HTTP_400_BAD_REQUEST)

    # Створюємо відгук
    review = Review.objects.create(
        user=user,
        product=product,
        rating=rating,
        comment=comment
    )
    return Response({'message': 'Review created successfully'}, status=status.HTTP_201_CREATED)

get_reviews_response = openapi.Response(
    description="List of reviews for the product",
    schema=ReviewSerializer(many=True)
)

@swagger_auto_schema(
    method='get',
    responses={200: get_reviews_response},
)
@api_view(['GET'])
def get_reviews(request, product_id):
    # Перевіряємо, чи існує продукт
    try:
        product = Product.objects.get(product_id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    # Отримуємо всі відгуки для цього продукту
    reviews = Review.objects.filter(product=product)

    # Серіалізуємо відгуки
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

