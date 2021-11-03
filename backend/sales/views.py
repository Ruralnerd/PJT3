from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
import requests

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
def market_request(request, market_pk):
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
            request_data = serializer.save()
            res = request_payment(market, serializer.data)
            if res.ok:
                context = {
                    'tid' : res.json()['tid'],
                    'nexturl' : res.json()['next_redirect_pc_url'],
                    'order_id' : request_data.id
                }
                request_data.tid = context['tid']
                request_data.save()
                return Response(context, status = status.HTTP_201_CREATED)

            return Response(res, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors.as_data(), status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'GET' and seller == user:
        data = market.requests.all().values()
        return Response(data, status = status.HTTP_200_OK)

    return Response({'errors' : '접근권한이 없습니다.'},status=status.HTTP_403_FORBIDDEN)

# 결제 함수
def request_payment(market, data):
    URL = 'https://kapi.kakao.com/v1/payment/ready'
    base_URL = 'http://127.0.0.1:8000/api/v1/'
    headers = {
        "Authorization": "KakaoAK " + "8051c1870d17a9e790ea10d9dbaef386",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
    }
    params = {
        "cid": "TC0ONETIME",                               # 테스트용 코드
        "partner_order_id": data['id'],                    # 주문번호
        "partner_user_id": market.seller,                  # 유저 아이디
        "item_name": market.title,                         # 구매 물품 이름
        "quantity": data['quantity'],                      # 구매 물품 수량
        "total_amount": market.price * data['quantity'],   # 구매 물품 가격
        "tax_free_amount": "0",                            # 구매 물품 비과세
        "approval_url": base_URL + f"sales/{market.id}/request/{data['id']}/approval",           # 결제 성공 시 이동할 url
        "cancel_url": base_URL,                                                                  # 결제 취소 시 이동할 url
        "fail_url": base_URL,                                                                    # 결제 실패 시 이동할 url
    }

    res = requests.post(URL, headers=headers, params=params)

    return res

# 결제승인 함수
def request_approval(request, market_pk, request_pk):
    market = get_object_or_404(Market, pk = market_pk)
    request_data = get_object_or_404(Request, pk =request_pk)
    URL = 'https://kapi.kakao.com/v1/payment/approve'
    headers = {
        "Authorization": "KakaoAK " + "8051c1870d17a9e790ea10d9dbaef386",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    }
    params = {
        "cid": "TC0ONETIME",                     # 테스트용 코드
        "tid": request_data.tid,                 # 결제 요청시 세션에 저장한 tid
        "partner_order_id": request_pk,          # 주문번호
        "partner_user_id": market.seller,        # 유저 아이디
        "pg_token": request.GET.get("pg_token"), # 쿼리 스트링으로 받은 pg토큰
    }

    res = requests.post(URL, headers=headers, params=params)
    if res.ok:
        request_data.state = 2
        request_data.save()
        return HttpResponseRedirect("https://www.naver.com") # 임시설정, Front에 결제완료 페이지
        # return Response(res, status=status.HTTP_200_OK)
    return Response(res, status=status.HTTP_400_BAD_REQUEST)

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