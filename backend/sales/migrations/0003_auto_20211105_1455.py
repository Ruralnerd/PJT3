# Generated by Django 3.2.8 on 2021-11-05 05:55

from django.db import migrations, models
import imagekit.models.fields
import sales.models


class Migration(migrations.Migration):

    dependencies = [
        ('sales', '0002_request_tid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='buyer',
            new_name='user',
        ),
        migrations.RenameField(
            model_name='img',
            old_name='story',
            new_name='market',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='img',
            name='dir',
        ),
        migrations.RemoveField(
            model_name='img',
            name='name',
        ),
        migrations.AddField(
            model_name='img',
            name='img',
            field=imagekit.models.fields.ProcessedImageField(blank=True, default='default_profile.jpeg', upload_to=sales.models.market_image_path),
        ),
        migrations.AlterField(
            model_name='market',
            name='thumbnail_img',
            field=imagekit.models.fields.ProcessedImageField(blank=True, default='default_profile.jpeg', upload_to=sales.models.thumbnail_image_path),
        ),
        migrations.AlterField(
            model_name='market',
            name='unit',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterModelTable(
            name='comment',
            table=None,
        ),
    ]