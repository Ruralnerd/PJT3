from django.shortcuts import get_object_or_404, render

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response

from .serializer import RequestBuyerSerializer, RequestSerializer, RequestSellerSerializer
from .models import Market, Request

@swagger_auto_schema(method='post', request_body=openapi.Schema(
    type=openapi.TYPE_OBJECT, 
    properties={
        'quantity': openapi.Schema(type=openapi.TYPE_INTEGER),
    }
))
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def request_inquire_create(request, market_pk):
    market = get_object_or_404(Market, id = market_pk)
    seller = market.seller
    user = request.user
    if request.method == 'POST':
        data = {
            'market' : market_pk,
            'buyer' : user.pk,
            'quantity' : request.data['quantity'],
            'state' : 1,
        }
        serializer = RequestBuyerSerializer(data = data)
        if serializer.is_valid(raise_exception=True):
            market_request = serializer.save()
            return Response(status = status.HTTP_201_CREATED)
        return Response(serializer.errors.as_data(), status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET' and seller == user:
        data = market.requests.all().values()
        return Response(data, status = status.HTTP_200_OK)

    return Response({'errors' : '접근권한이 없습니다.'},status=status.HTTP_403_FORBIDDEN)


@swagger_auto_schema(method='put', request_body=RequestSellerSerializer)
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def request_management(request, market_pk, request_pk):
    market = get_object_or_404(Market, id = market_pk)
    market_request = get_object_or_404(Request, id = request_pk)
    seller = market.seller
    buyer = market_request.buyer
    user = request.user
    
    if request.method == 'GET' and (user == seller or user == buyer):
        serializer = RequestSerializer(market_request)
        return Response(serializer.data, status = status.HTTP_200_OK)

    if request.method == 'PUT' and user == seller:
        serializer = RequestSellerSerializer(market_request, data = request.data)
        if serializer.is_valid(raise_exception=True):
            market_request = serializer.save()
            return Response(status = status.HTTP_201_CREATED)
        return Response(serializer.errors.as_data(), status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE' and user == buyer:
        market_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    return Response({'errors' : '접근권한이 없습니다.'},status=status.HTTP_403_FORBIDDEN)