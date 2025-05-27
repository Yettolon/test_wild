from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .parser import get_products_wb


class ProductsAPIView(APIView):
    def get(self, request):
        try:
            min_price = int(request.GET.get("min_price", 623))
            max_price = int(request.GET.get("max_price", 5000))
            pages = int(request.GET.get("pages", 4))

            products = get_products_wb(
                min_price=min_price, max_price=max_price, pages=pages
            )

            return Response(products, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
