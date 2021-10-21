from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .products import products
from .models import Product
from .serializers import ProductSerialiser

# Create your views here.

@api_view(['GET'])
def getRoutes(request):

    routes=[
        '/api/products/',
        '/api/products/create/',

        '/api/products/upload',

        '/api/products/<id>/reviews/',

        '/api/products/top/',
        '/api/products/<id>',

        '/api/products/delete/<id>',
        '/api/products/<update>/<id>',

    ]
    return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerialiser(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerialiser(product, many=False)
    return Response(serializer.data)