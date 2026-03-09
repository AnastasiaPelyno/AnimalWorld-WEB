from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView,ListAPIView
from django.db.models import Q
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination
import django_filters

class ProductPagination(PageNumberPagination):
    page_size = 6  
    page_size_query_param = 'page_size'
    max_page_size = 100
class ProductFilter(django_filters.FilterSet):
    category = django_filters.ChoiceFilter(
        field_name='category__name',  
        choices=[(category.name, category.name) for category in Category.objects.all()],
        empty_label="Виберіть категорію"
    )

    
    search = django_filters.CharFilter(method='filter_search')

    
    sort_by = django_filters.OrderingFilter(
        fields=(
            ('price', 'price'),
            ('name', 'name'),
        ),
        field_labels={
            'price': 'Ціна',
            'name': 'Назва',
        }
    )

    class Meta:
        model = Product
        fields = ['category', 'search', 'sort_by']

    def filter_search(self, queryset, name, value):
        """
        Фільтрація за назвою та описом одночасно
        """
        return queryset.filter(
            Q(name__icontains=value) | Q(description__icontains=value)
        )
class ProductListView(ListAPIView):
    serializer_class = ProductSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend, filters.OrderingFilter)
    filterset_class = ProductFilter
    search_fields = ['name', 'description']

    pagination_class = ProductPagination

    def get_queryset(self):
        """
        Отримати товари з можливістю фільтрації, сортування та пошуку.
        """
        queryset = Product.objects.all()

        category_name = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        sort_by = self.request.query_params.get('sort_by')
        if category_name:
            queryset = queryset.filter(category__name=category_name)

        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(description__icontains=search)
            )

        if sort_by:
            queryset = queryset.order_by(sort_by)
        return queryset


class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'product_id' 


