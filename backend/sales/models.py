from django.db import models
from django.conf import settings

from articles.models import Category

class Market(models.Model):
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='markets')
    title = models.CharField(max_length=100)
    content = models.TextField()
    price = models.IntegerField()
    period = models.DateTimeField()
    unit = models.IntegerField()
    quantity = models.IntegerField()
    thumbnail_img = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    market = models.ForeignKey(Market, on_delete=models.CASCADE, related_name='comments')
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='market_comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'sales_market_comment'


class Img(models.Model):
    story = models.ForeignKey(Market, on_delete=models.CASCADE, related_name='imgs')
    name = models.CharField(max_length=50)
    dir = models.CharField(max_length=200)


class Category_sales(models.Model):
    market = models.ForeignKey(Market, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        db_table = 'sales_category_relation'


class Request(models.Model):
    market = models.ForeignKey(Market, on_delete=models.CASCADE, related_name='requests')
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='requests')
    tid = models.CharField(max_length=200, null=True)
    req_date = models.DateTimeField(auto_now_add=True)
    quantity = models.IntegerField()
    state = models.IntegerField()
    waybill = models.CharField(max_length=200, null=True)
    comp_date = models.DateTimeField(null=True)

