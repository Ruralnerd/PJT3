from django.db import models
from django.conf import settings
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
import os

from articles.models import Category

def market_image_path(instance, filename):
    return 'sales/markets/{}/{}'.format(instance.market.pk, filename)

def thumbnail_image_path(instance, filename):
    return 'sales/markets/thumbnail/{}/{}'.format(instance.market.pk, filename)

class Market(models.Model):
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='markets')
    title = models.CharField(max_length=100)
    content = models.TextField()
    price = models.IntegerField()
    period = models.DateTimeField()
    unit = models.CharField(max_length=20)
    quantity = models.IntegerField()
    thumbnail_img = ProcessedImageField(
        upload_to=thumbnail_image_path,
        processors=[ResizeToFill(150, 150)],
        format='JPEG',
        blank=True,
        default='default_profile.jpeg'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def delete(self, *args, **kwargs):
        super(Market, self).delete(*args, **kwargs)
        os.remove(os.path.join(settings.MEDIA_ROOT, self.thumbnail_img.path))

class MarketComment(models.Model):
    market = models.ForeignKey(Market, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='market_comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class MarketImg(models.Model):
    market = models.ForeignKey(Market, on_delete=models.CASCADE, related_name='imgs')
    img = ProcessedImageField(
        upload_to=market_image_path,
        processors=[ResizeToFill(150, 150)],
        format='JPEG',
        blank=True,
        default='default_profile.jpeg'
    )
    def delete(self, *args, **kwargs):
        super(MarketImg, self).delete(*args, **kwargs)
        os.remove(os.path.join(settings.MEDIA_ROOT, self.img.path))


class Category_sales(models.Model):
    market = models.ForeignKey(Market, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        db_table = 'sales_category_relation'


class Request(models.Model):
    market = models.ForeignKey(Market, on_delete=models.CASCADE, related_name='requests')
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='requests')
    tid = models.CharField(max_length=200, null=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True) 
    req_date = models.DateTimeField(auto_now_add=True)
    quantity = models.IntegerField()
    state = models.IntegerField()
    waybill = models.CharField(max_length=200, null=True)
    comp_date = models.DateTimeField(null=True)

