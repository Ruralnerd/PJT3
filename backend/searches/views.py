from django.http import response, JsonResponse
from django.shortcuts import  get_object_or_404

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response

from .models import Category
from .serializer import CategorySerializer
from accounts.serializer import StorySmallSerializer, MarketSmallSerializer

@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: CategorySerializer})
@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def categorys(request):
    if request.method == 'GET':
        categories = Category.objects.order_by('name')
        serializers = CategorySerializer(categories, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    else:
        try:
            serializer = CategorySerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method='get', 
    manual_parameters=[
        openapi.Parameter('category_name', openapi.IN_QUERY, description="category_name", type=openapi.TYPE_STRING),
    ],
    responses={status.HTTP_200_OK: StorySmallSerializer, status.HTTP_400_BAD_REQUEST:'HTTP_400_BAD_REQUEST'}
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def storys(request):
    try:
            name = request.GET['category_name']
            cateogry = get_object_or_404(Category, name=name)
            stories = cateogry.storys.all()
            serializer = StorySmallSerializer(stories, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)

    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method='get', 
    manual_parameters=[
        openapi.Parameter('category_name', openapi.IN_QUERY, description="category_name", type=openapi.TYPE_STRING),
    ],
    responses={status.HTTP_200_OK: MarketSmallSerializer, status.HTTP_400_BAD_REQUEST:'HTTP_400_BAD_REQUEST'}
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def markets(request):
    try:
            name = request.GET['category_name']
            cateogry = get_object_or_404(Category, name=name)
            markets = cateogry.markets.all()
            serializer = MarketSmallSerializer(markets, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

def category_process(post, category_names):
    b_category_names = list(post.categorys.values_list('name', flat=True))
    for b_name in b_category_names:
        if not b_name in category_names:
            category = post.categorys.get(name=b_name)
            post.categorys.remove(category)
    if not category_names:
        return

    for name in category_names:
        if post.categorys.filter(name=name).exists():
            continue            
        if not Category.objects.filter(name=name).exists():
            category = Category.objects.create(name=name)
        else:
            category =Category.objects.get(name=name)
        post.categorys.add(category) 