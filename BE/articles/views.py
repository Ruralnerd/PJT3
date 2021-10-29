from django.shortcuts import get_object_or_404, render

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response

from .serializer import StorySerializer, StorySmallSerializer
from .models import Story

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def story_inquire_create(request):
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


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([JSONWebTokenAuthentication])
def story_detail(request, story_pk):
    story = get_object_or_404(Story, id=story_pk)
    serializer = StorySerializer(story)
    if request.method == 'GET':
        return Response(serializer.data, status=status.HTTP_200_OK)