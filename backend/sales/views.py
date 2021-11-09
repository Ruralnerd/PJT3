from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.http import HttpResponseRedirect
from django.db.models import Count
import requests
from datetime import datetime, timedelta

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response

from accounts.serializer import StorySmallSerializer, MarketSmallSerializer, UserSmallSerializer
from .serializer import RequestBuyerSerializer, RequestSerializer, RequestSellerSerializer
from .serializer import MarketCreateSerializer, MarketSerializer, MarketEditSerializer
from .serializer import MarketImgSerializer
from .serializer import MarketCommentCreateSerializer, MarketCommentSerializer
from .models import Market, Request, MarketImg, MarketComment

@swagger_auto_schema(
    method='get', 
    manual_parameters=[
        openapi.Parameter('num', openapi.IN_QUERY, description="list num", type=openapi.TYPE_INTEGER),
        openapi.Parameter('option', openapi.IN_QUERY, description="list option", type=openapi.TYPE_STRING)
    ], 
    responses={status.HTTP_200_OK: MarketSmallSerializer, status.HTTP_400_BAD_REQUEST:'HTTP_400_BAD_REQUEST'}
)
@swagger_auto_schema(method='post', request_body=MarketCreateSerializer, responses={status.HTTP_201_CREATED: MarketSerializer})
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def markets(request):
    if request.method == 'GET':
        try:
            count = int(request.GET['num'])
            option = request.GET['option']
            markets = Market.objects.all()
            if option == 'created_at':
                stories = Market.objects.order_by('-created_at')[:count]
            elif option == 'manyorder':
                stories = markets.annotate(request_count=Count('requests')).order_by('-request_count')[:count]
            elif option == 'popular':
                stories = Market.objects.order_by('-hits')[:count]
            serializer = MarketSmallSerializer(stories, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'POST':
        user = request.user
        serializer = MarketCreateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            market = serializer.save(seller=user)
            new=MarketSerializer(market)
            return Response(new.data, status=status.HTTP_201_CREATED)


@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: MarketSerializer})
@swagger_auto_schema(method='put', request_body=MarketCreateSerializer, responses={status.HTTP_201_CREATED: MarketSerializer, status.HTTP_403_FORBIDDEN:'HTTP_403_FORBIDDEN'})
@swagger_auto_schema(method='delete', responses={status.HTTP_204_NO_CONTENT:'HTTP_204_NO_CONTENT',status.HTTP_403_FORBIDDEN:'HTTP_403_FORBIDDEN'})
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def market_detail(request, market_pk):
    market = get_object_or_404(Market, id=market_pk)
    user = get_object_or_404(get_user_model(), pk=market.seller.pk)
    if request.method == 'GET':
        serializer = MarketSerializer(market)
        responseData = Response(serializer.data, status=status.HTTP_200_OK)

        expire_date, now = datetime.now(), datetime.now()
        expire_date += timedelta(days=1)
        expire_date = expire_date.replace(hour=0, minute=0, second=0, microsecond=0)
        expire_date -= now
        max_age = expire_date.total_seconds()

        cookie_value = request.COOKIES.get('hitboard', '_')

        if f'_{market.id}_' not in cookie_value:
            cookie_value += f'{market.id}_'
            responseData.set_cookie('Markethitboard', value=cookie_value, max_age=max_age, httponly=True)
            market.hits += 1
            market.save()
        return responseData
        
    if market.seller != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'PUT':
        serializer = MarketEditSerializer(market, data=request.data)
        if serializer.is_valid(raise_exception=True):
            market = serializer.save()
            new = MarketSerializer(market)
            return Response(new.data, status=status.HTTP_201_CREATED)
    elif request.method == 'DELETE':
        market.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: MarketImgSerializer, status.HTTP_403_FORBIDDEN:'HTTP_403_FORBIDDEN'})
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def market_img(request, market_pk):
    market = get_object_or_404(Market, id=market_pk)
    if market.seller != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    else:
        img = MarketImg.objects.create(market=market, img=request.data['img'])
        serialzer = MarketImgSerializer(img)
        return Response(serialzer.data, status=status.HTTP_201_CREATED)

@swagger_auto_schema(method='delete', responses={status.HTTP_204_NO_CONTENT:'HTTP_204_NO_CONTENT',status.HTTP_403_FORBIDDEN:'HTTP_403_FORBIDDEN'})
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def market_img_delete(request, market_pk, img_pk):
    market = get_object_or_404(Market, id=market_pk)
    if market.seller != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    else:
        img = get_object_or_404(MarketImg, id=img_pk)
        img.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@swagger_auto_schema(method='get', responses={status.HTTP_200_OK:  MarketCommentSerializer})
@swagger_auto_schema(method='post', request_body= MarketCommentCreateSerializer, responses={status.HTTP_201_CREATED: MarketCommentSerializer})
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def comment(request, market_pk):
    market = get_object_or_404(Market, pk=market_pk)
    if request.method == 'GET':
        comments = market.comments.filter(market=market).order_by('-created_at')
        serializers = MarketCommentSerializer(comments, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        user = request.user
        serializer = MarketCommentCreateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            comment = serializer.save(market=market, user=user)
            new = MarketCommentSerializer(comment)
            return Response(new.data,status=status.HTTP_201_CREATED)

@swagger_auto_schema(method='delete', responses={status.HTTP_204_NO_CONTENT:'HTTP_204_NO_CONTENT',status.HTTP_403_FORBIDDEN:'HTTP_403_FORBIDDEN'})
@api_view(['DELETE'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def comment_delete(request, market_pk, comment_pk):
    comment = get_object_or_404(MarketComment, pk=comment_pk)
    if request.user == comment.user:
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_403_FORBIDDEN)


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
            'address' : request.data['address'],
            'phone' : request.data['phone']
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
    base_URL = 'http://k5d201.p.ssafy.io/api/v1/'
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
        "approval_url": base_URL + f"sales/markets/{market.id}/request/{data['id']}/approval/",           # 결제 성공 시 이동할 url
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


#결제취소 함수
@swagger_auto_schema(method='post', responses={
    status.HTTP_200_OK:'HTTP_200_OK',
    status.HTTP_400_BAD_REQUEST: 'HTTP_400_BAD_REQUEST',
    status.HTTP_403_FORBIDDEN:'HTTP_403_FORBIDDEN'})
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def request_cancel(request, market_pk, request_pk):
    market = get_object_or_404(Market, pk = market_pk)
    request_data = get_object_or_404(Request, pk =request_pk)
    user = request.user
    if user == request_data.buyer:
        url = "https://kapi.kakao.com/v1/payment/cancel"
        headers = {
            "Authorization": "KakaoAK " + "8051c1870d17a9e790ea10d9dbaef386",
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        }
        params = {
            "cid": "TC0ONETIME",                     
            "tid": request_data.tid,                 
            "cancel_amount": market.price * request_data.quantity,
            "cancel_tax_free_amount": "0"
        }
        res = requests.post(url, headers=headers, params=params)

        if res.status_code == 200:
            request_data.state = 6
            request_data.save()
            return Response(status=status.HTTP_200_OK)
        
        return Response(res.json(), status=status.HTTP_400_BAD_REQUEST)

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