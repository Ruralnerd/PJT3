from django.shortcuts import get_object_or_404, render
from django.contrib.auth import get_user_model

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response

from .serializer import StorySerializer, StorySmallSerializer, StoryCreateSerializer, StoryEditSerializer 
from .serializer import StoryImgSerializer 
from .serializer import StoryCommentSerializer, StoryCommentCreateSerializer
from .models import Story, StoryImg, StoryComment


@swagger_auto_schema(
    method='get', 
    manual_parameters=[
        openapi.Parameter('num', openapi.IN_QUERY, description="list num", type=openapi.TYPE_INTEGER),
        openapi.Parameter('option', openapi.IN_QUERY, description="list option", type=openapi.TYPE_STRING)
    ], 
    responses={status.HTTP_200_OK: StorySmallSerializer, status.HTTP_400_BAD_REQUEST:'HTTP_400_BAD_REQUEST'}
)
@swagger_auto_schema(method='post', request_body=StoryCreateSerializer, responses={status.HTTP_201_CREATED: StorySerializer})
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def storys(request):
    if request.method == 'GET':
        try:
            count = int(request.GET['num'])
            option = request.GET['option']
            if option == 'created_at':
                stories = Story.objects.order_by('-created_at')[:count]
            serializer = StorySmallSerializer(stories, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'POST':
        user = request.user
        serializer = StoryCreateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            story = serializer.save(producer=user)
            new=StorySerializer(story)
            return Response(new.data, status=status.HTTP_201_CREATED)


@swagger_auto_schema(method='get', responses={status.HTTP_200_OK: StorySerializer})
@swagger_auto_schema(method='put', request_body=StoryCreateSerializer, responses={status.HTTP_201_CREATED: StorySerializer, status.HTTP_403_FORBIDDEN:'HTTP_403_FORBIDDEN'})
@swagger_auto_schema(method='delete', responses={status.HTTP_204_NO_CONTENT:'HTTP_204_NO_CONTENT',status.HTTP_403_FORBIDDEN:'HTTP_403_FORBIDDEN'})
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def story_detail(request, story_pk):
    story = get_object_or_404(Story, id=story_pk)
    user = get_object_or_404(get_user_model(), pk=story.producer.pk)
    if request.method == 'GET':
        serializer = StorySerializer(story)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    if story.producer != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    elif request.method == 'PUT':
        serializer = StoryEditSerializer(story, data=request.data)
        if serializer.is_valid(raise_exception=True):
            story = serializer.save()
            new = StorySerializer(story)
            return Response(new.data, status=status.HTTP_201_CREATED)
    elif request.method == 'DELETE':
        story.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@swagger_auto_schema(method='post', responses={status.HTTP_201_CREATED: StoryImgSerializer, status.HTTP_403_FORBIDDEN:'HTTP_403_FORBIDDEN'})
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def story_img(request, story_pk):
    story = get_object_or_404(Story, id=story_pk)
    if story.producer != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    else:
        img = StoryImg.objects.create(story=story, img=request.data['img'])
        serialzer = StoryImgSerializer(img)
        return Response(serialzer.data, status=status.HTTP_201_CREATED)

@swagger_auto_schema(method='delete', responses={status.HTTP_204_NO_CONTENT:'HTTP_204_NO_CONTENT',status.HTTP_403_FORBIDDEN:'HTTP_403_FORBIDDEN'})
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def story_img_delete(request, story_pk, img_pk):
    story = get_object_or_404(Story, id=story_pk)
    if story.producer != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)
    else:
        img = get_object_or_404(StoryImg, id=img_pk)
        img.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@swagger_auto_schema(method='get', responses={status.HTTP_200_OK:  StoryCommentSerializer})
@swagger_auto_schema(method='post', request_body= StoryCommentCreateSerializer, responses={status.HTTP_201_CREATED: StoryCommentSerializer})
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def comment(request, story_pk):
    story = get_object_or_404(Story, pk=story_pk)
    if request.method == 'GET':
        comments = story.comments.filter(story=story).order_by('-created_at')
        serializers = StoryCommentSerializer(comments, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        user = request.user
        serializer = StoryCommentCreateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            comment = serializer.save(story=story,user=user)
            new = StoryCommentSerializer(comment)
            return Response(new.data,status=status.HTTP_201_CREATED)

@swagger_auto_schema(method='delete', responses={status.HTTP_204_NO_CONTENT:'HTTP_204_NO_CONTENT',status.HTTP_403_FORBIDDEN:'HTTP_403_FORBIDDEN'})
@api_view(['DELETE'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def comment_delete(request, story_pk, comment_pk):
    comment = get_object_or_404(StoryComment, pk=comment_pk)
    if request.user == comment.user:
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_403_FORBIDDEN)