from django.shortcuts import get_object_or_404, render

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response

from .serializer import RequestBuyerSerializer
from .models import Market

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
