from django.urls import path

from .views import ProductsAPIView

urlpatterns = [
    path("products/", ProductsAPIView.as_view()),
]
